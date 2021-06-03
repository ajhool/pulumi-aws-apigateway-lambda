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
    /**
     * Name for the S3 bucket. Must be globally unique.
     */
    bucketName: pulumi.Input<string>;
    // // @fixme - couldn't find an easy way to import only certain pieces of this DistributionArgs type.
    // //          wanted to provide a scoped down interfacec
    // distribution: pulumi.Input<DistributionArgs>;
    // distribution: DistributionArgs
}

/**
 * Creates an S3 bucket with a cloudfront distribution in front.
 * Allows users to read objects from the S3 bucket. A common
 * use case would be hosting and serving dynamic static images.
 * 
 * Note: the S3 bucket isn't configured as a static website
 */
export class CloudfrontS3 extends pulumi.ComponentResource {
    public readonly cloudfrontWebDistribution: aws.cloudfront.Distribution;
    // public readonly cloudfrontLoggingBucket: aws.s3.Bucket;
    public readonly bucket: aws.s3.Bucket;
    // public readonly s3LoggingBucket: aws.s3.Bucket;
    public readonly originAccessIdentity: aws.cloudfront.OriginAccessIdentity;
    public readonly bucketPolicy: aws.s3.BucketPolicy;
    public readonly domainName: pulumi.Output<string>;

    constructor(name: string, args: CloudfrontS3Args, opts?: pulumi.ComponentResourceOptions) {
        super("CloudfrontS3:index:CloudfrontS3", name, args, opts);

        // Create the S3 bucket to hold content
        this.bucket = new aws.s3.Bucket(`${name}-bucket`, {
          bucket: args.bucketName,
        });

        this.originAccessIdentity = new aws.cloudfront.OriginAccessIdentity(`${name}-originAccessIdentity`, {
          comment: `${name} origin access identity for ${this.bucket.bucket}`
        })

        // Arbitrary identifier for the main S3 Origin. Must be uniqe for this distribution.
        const s3OriginId = `${name}`;
        this.cloudfrontWebDistribution = new aws.cloudfront.Distribution(`${name}-distribution`, {
            //@fixme - restrictions is required, which is suprising!
            restrictions: {
                geoRestriction: {
                    restrictionType: "whitelist",
                    locations: [
                        "US",
                        "CA",
                        "GB",
                        "DE",
                    ],
                },
            },
            defaultCacheBehavior: {
              allowedMethods: [
                  "DELETE",
                  "GET",
                  "HEAD",
                  "OPTIONS",
                  "PATCH",
                  "POST",
                  "PUT",
              ],
              cachedMethods: [
                  "GET",
                  "HEAD",
              ],
              targetOriginId: s3OriginId,
              forwardedValues: {
                  queryString: false,
                  cookies: {
                      forward: "none",
                  },
              },
              viewerProtocolPolicy: "allow-all",
              minTtl: 0,
              defaultTtl: 3600,
              maxTtl: 86400,
          },
          enabled: true,
          viewerCertificate: {
            cloudfrontDefaultCertificate: true
          },
          origins: [
            {
              domainName: this.bucket.bucketDomainName,
              // Name is somewhat arbitrary, just needs to be unique for this distribution
              originId: `S3-${this.bucket.id}`,
              s3OriginConfig: {
                originAccessIdentity: this.originAccessIdentity.id
              }
            }
          ]
        });


        // @fixme - the policy prinicpal might not be correct. There's some funny business w.r.t s3CanonincalUserId
        this.bucketPolicy = new aws.s3.BucketPolicy(`${name}-bucketPolicy`, {
          bucket: args.bucketName,
          policy: 
            `{
              "Version": "2012-10-17",
              "Id": "PolicyForCloudFrontPrivateContent",
              "Statement": [
                  {
                      "Effect": "Allow",
                      "Principal": {
                          "AWS": ${this.originAccessIdentity.s3CanonicalUserId}
                      },
                      "Action": "s3:GetObject",
                      "Resource": ${this.bucket.arn}
                  }
              ]
          }`
        })

        this.domainName = this.cloudfrontWebDistribution.domainName;
    }
}
