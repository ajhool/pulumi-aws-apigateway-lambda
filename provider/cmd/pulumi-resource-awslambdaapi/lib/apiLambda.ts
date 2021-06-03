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
//
const STAGE_NAME = 'api';

export interface LambdaApiArgs {
    /**
     * arn of the lambda handler
     */
    handlerArn: pulumi.Input<string>
    /**
     * User props to override default api args
     */
    // Removed until a good way to pass all of these args into the schema
    // api: RestApiArgs;
}

// Create the Swagger spec for a proxy which forwards all HTTP requests through to the Lambda function.
function swaggerSpec(lambdaArn: string): string {
    const swaggerSpec = {
        swagger: "2.0",
        info: { title: "api", version: "1.0" },
        paths: {
            "/{proxy+}": swaggerRouteHandler(lambdaArn),
        },
    };
    return JSON.stringify(swaggerSpec);
}

// Create a single Swagger spec route handler for a Lambda function.
function swaggerRouteHandler(lambdaArn: string) {
    const region = aws.config.requireRegion();
    return {
        "x-amazon-apigateway-any-method": {
            "x-amazon-apigateway-integration": {
                uri: `arn:aws:apigateway:${region}:lambda:path/2015-03-31/functions/${lambdaArn}/invocations`,
                passthroughBehavior: "when_no_match",
                httpMethod: "POST",
                type: "aws_proxy",
            },
        },
    };
}

/**
 * Note: similar to / borrowed from the api gateway crosswalk implementation and aws-ts-serverless-raw
 *  - https://github.com/pulumi/pulumi-awsx/blob/master/nodejs/awsx/apigateway/api.ts
 *  - https://github.com/pulumi/examples/blob/master/aws-ts-serverless-raw/index.ts
 */
export class LambdaApi extends pulumi.ComponentResource {
    public readonly restApi: aws.apigateway.RestApi;
    public readonly deployment: aws.apigateway.Deployment;
    public readonly stage: aws.apigateway.Stage;
    public readonly endpoint: pulumi.Output<string>

    constructor(name: string, args: LambdaApiArgs, opts?: pulumi.ComponentResourceOptions) {
        super("awslambdaapi:index:LambdaApi", name, args, opts);

        this.restApi = new aws.apigateway.RestApi(`${name}-api`, {
            // Uncomment to pass in a lambda handler instead of the arn
            // body: args.handler.arn.apply(lambdaArn => swaggerSpec(lambdaArn)),
            // body: swaggerSpec(args.handlerArn.apply(arn => arn))
            // ...args.api
        });

        // Create a deployment of the Rest API.
        this.deployment = new aws.apigateway.Deployment("api-deployment", {
            restApi: this.restApi,
            // Note: Set to empty to avoid creating an implicit stage, we'll create it explicitly below instead.
            stageName: "",
        });

        // Create a stage, which is an addressable instance of the Rest API. Set it to point at the latest deployment.
        this.stage = new aws.apigateway.Stage("api-stage", {
            restApi: this.restApi,
            deployment: this.deployment,
            stageName: STAGE_NAME,
        });

        const endpoint = pulumi.interpolate `${this.deployment.invokeUrl}${STAGE_NAME}`;
        this.endpoint = endpoint;

        this.registerOutputs({
            endpoint
        });
    }
}
