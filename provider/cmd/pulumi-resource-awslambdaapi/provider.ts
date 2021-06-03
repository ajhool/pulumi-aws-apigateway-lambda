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
import * as provider from "@pulumi/pulumi/provider";

import { LambdaApi, LambdaApiArgs } from "./lib/apiLambda";
import { CloudfrontS3, CloudfrontS3Args } from "./lib/cloudfrontS3";
import { CronLambda, CronLambdaArgs } from "./lib/cronLambda";
export class Provider implements provider.Provider {
    constructor(readonly version: string) { }

    async construct(name: string, type: string, inputs: pulumi.Inputs,
        options: pulumi.ComponentResourceOptions): Promise<provider.ConstructResult> {

        // TODO: Add support for additional component resources here.
        switch (type) {
            case "awslambdaapi:index:LambdaApi":
                return await constructLambdaApi(name, inputs, options);
            case "awslambdaapi:index:CronLambda":
                return await constructCronLambda(name, inputs, options);
            case "awslambdaapi:index:CloudfrontS3":
                return await constructCloudfrontS3(name, inputs, options);
            default:
                throw new Error(`unknown resource type ${type}`);
        }
    }
}

async function constructLambdaApi(name: string, inputs: pulumi.Inputs,
    options: pulumi.ComponentResourceOptions): Promise<provider.ConstructResult> {

    // Create the component resource.
    const lambdaApi = new LambdaApi(name, inputs as LambdaApiArgs, options);

    // Return the component resource's URN and outputs as its state.
    return {
        urn: lambdaApi.urn,

        // @fixme -- is this correct? What is state?
        state: {
            deployment: lambdaApi.deployment,
            stage: lambdaApi.stage,
            restApi: lambdaApi.restApi,
            endpoint: lambdaApi.endpoint,
        },
    };
}

async function constructCronLambda(name: string, inputs: pulumi.Inputs,
    options: pulumi.ComponentResourceOptions): Promise<provider.ConstructResult> {

    // Create the component resource.
    const cronLambda = new CronLambda(name, inputs as CronLambdaArgs, options);

    // Return the component resource's URN and outputs as its state.
    return {
        urn: cronLambda.urn,

        // @fixme -- is this correct? What is state?
        state: {
            eventRule: cronLambda.eventRule,
            eventTarget: cronLambda.eventTarget
        },
    };
}

async function constructCloudfrontS3(name: string, inputs: pulumi.Inputs,
    options: pulumi.ComponentResourceOptions): Promise<provider.ConstructResult> {

    // Create the component resource.
    const cloudfrontS3 = new CloudfrontS3(name, inputs as CloudfrontS3Args, options);

    // Return the component resource's URN and outputs as its state.
    return {
        urn: cloudfrontS3.urn,

        // @fixme -- is this correct? What is state?
        state: {
            cloudfrontWebDistribution: cloudfrontS3.cloudfrontWebDistribution,
            bucket: cloudfrontS3.bucket,
            // s3LoggingBucket: aws.s3.Bucket;
            originAccessIdentity: cloudfrontS3.originAccessIdentity,
            bucketPolicy: cloudfrontS3.bucketPolicy,
            domainName: cloudfrontS3.domainName
        },
    };
}
