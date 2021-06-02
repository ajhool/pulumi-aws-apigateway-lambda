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
import { DistributionArgs } from "@pulumi/aws/cloudfront";

export interface CloudfrontS3Args {
    bucketName: string;
    // @fixme - couldn't find an easy way to import only certain pieces of this DistributionArgs type.
    //          wanted to provide a scoped down interfacec
    distribution: DistributionArgs;
}

/**
 * Note: similar to / borrowed from the api gateway crosswalk implementation and aws-ts-serverless-raw
 *  - https://github.com/pulumi/pulumi-awsx/blob/master/nodejs/awsx/apigateway/api.ts
 *  - https://github.com/pulumi/examples/blob/master/aws-ts-serverless-raw/index.ts
 */
export class CloudfrontS3 extends pulumi.ComponentResource {
    public readonly cloudfrontWebDistribution: aws.cloudfront.Distribution;
    public readonly cloudfrontLoggingBucket: aws.s3.Bucket;
    public readonly bucket: aws.s3.Bucket;
    public readonly s3LoggingBucket: aws.s3.Bucket;

    constructor(name: string, args: CloudfrontS3Args, opts?: pulumi.ComponentResourceOptions) {
        super("CloudfrontS3:index:CloudfrontS3", name, args, opts);

        // Create the S3 bucket to hold content
        this.bucket = new aws.s3.Bucket(`${name}-bucket`, {
          bucket: args.bucketName,
        }

        this.cloudfrontWebDistribution = new aws.cloudfront.Distribution({
          origins: args.distribution.origins
          enabled: true,
          isIpv6Enabled: true,
          defaultRootObject: 'index.html',
          defaultCacheBehavior: args.distributionArgs.
        });

        const endpoint = pulumi.interpolate `${this.deployment.invokeUrl}${STAGE_NAME}`;
        this.endpoint = endpoint;
        
        this.registerOutputs({
            endpoint
        });
    }
}
