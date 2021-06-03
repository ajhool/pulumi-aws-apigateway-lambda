import * as lambdaapi from "@pulumi/awslambdaapi";
import * as aws from "@pulumi/aws";
import * as pulumi from '@pulumi/pulumi';
import { CloudfrontS3, LambdaApi } from "@pulumi/awslambdaapi";

const NAMESPACE = `examples-simple`;

/*******************************************************
 * CronLambda
 *  - Create a lambda function
 *  - Pass the lambda function into CronLambda with an execution schedule
 *******************************************************/

// Give our Lambda access to CloudWatch Logs and Metrics.
const role = new aws.iam.Role(`${NAMESPACE}-role`, {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({ Service: "lambda.amazonaws.com" }),
});

const policy = new aws.iam.RolePolicy(`${NAMESPACE}-policy`, {
    role,
    policy: pulumi.output({
        Version: "2012-10-17",
        Statement: [{
            Action: ["logs:*", "cloudwatch:*"],
            Resource: "*",
            Effect: "Allow",
        }],
    }),
});

// Create a Lambda function, using code from the `./app` folder.
const lambda = new aws.lambda.Function(`${NAMESPACE}-lambda`, {
    role: role.arn,
    runtime: aws.lambda.NodeJS12dXRuntime,
    timeout: 300,
    code: new pulumi.asset.AssetArchive({
        ".": new pulumi.asset.FileArchive('./bin'),
    }),
    handler: 'handler.handler',
}, { dependsOn: [policy] });


// Pass the lambda function into the CronLambda Component

const cronLambda = new lambdaapi.CronLambda("cron-lambda", {
    handlerArn: lambda.arn,
    rateInMinutes: 1
});

export const eventRule = cronLambda.eventRule;
export const eventTarget = cronLambda.eventTarget

/**********************************
 * Cloudwatch + S3 Bucket
 **********************************/

const cloudfrontS3 = new CloudfrontS3(`${NAMESPACE}-lambda-api`, {
    bucketName: 'pulumi-multilang-cloudfronts3-2021-06-03'
})
