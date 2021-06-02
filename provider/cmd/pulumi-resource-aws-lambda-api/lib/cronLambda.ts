// Copyright 2016-2021, Pulumi Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export interface CronLambdaArgs {
    rateInMinutes: number;
    eventPattern: string;
    handler: aws.lambda.Function;
}

/**
 * Note: similar to / borrowed from the api gateway crosswalk implementation and aws-ts-serverless-raw
 *  - https://github.com/pulumi/pulumi-awsx/blob/master/nodejs/awsx/apigateway/api.ts
 *  - https://github.com/pulumi/examples/blob/master/aws-ts-serverless-raw/index.ts
 */
export class CronLambda extends pulumi.ComponentResource {
    public readonly eventRule: aws.cloudwatch.EventRule;
    public readonly eventTarget: aws.cloudwatch.EventTarget;
    public readonly executeLambdaPermission: aws.lambda.Permission;

    constructor(name: string, args: CronLambdaArgs, opts?: pulumi.ComponentResourceOptions) {
        super("CloudfrontS3:index:CloudfrontS3", name, args, opts);

        this.eventRule = new aws.cloudwatch.EventRule(`${name}-cron-rule`, {
          description: `Scheduled lambda for ${name}`,
          scheduleExpression: `${args.rateInMinutes} minutes`
        })

        // Create the S3 bucket to hold content
        this.eventTarget = new aws.cloudwatch.EventTarget(`${name}-event-target`, {
          rule: this.eventRule.name,
          // @fixme - is a conversion needed from outputstring to inputstring?
          arn: args.handler.arn
        });

        //@fixme - iam permissions might be needed
        
        //   this.executeLambdaPermission = new aws.lambda.Permission(`${name}-execute-lambda-permission`, {
        //     action: "lambda:InvokeFunction",
        //     principal: "cloudwatch.amazonaws.com",
        //     sourceArn: pulumi.interpolate`${logGroup.arn}:*`,
        //     function: logcollector,
        // }, providerOpts);
    }
}
