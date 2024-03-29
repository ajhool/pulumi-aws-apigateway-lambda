// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "./utilities";

import * as aws from "@pulumi/aws";

export class LambdaApi extends pulumi.ComponentResource {
    /** @internal */
    public static readonly __pulumiType = 'awslambdaapi:index:LambdaApi';

    /**
     * Returns true if the given object is an instance of LambdaApi.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is LambdaApi {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === LambdaApi.__pulumiType;
    }

    /**
     * The bucket resource.
     */
    public /*out*/ readonly bucket!: pulumi.Output<aws.s3.Bucket>;

    /**
     * Create a LambdaApi resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args: LambdaApiArgs, opts?: pulumi.ComponentResourceOptions) {
        let inputs: pulumi.Inputs = {};
        opts = opts || {};
        if (!opts.id) {
            if ((!args || args.lambdaArn === undefined) && !opts.urn) {
                throw new Error("Missing required property 'lambdaArn'");
            }
            inputs["lambdaArn"] = args ? args.lambdaArn : undefined;
            inputs["bucket"] = undefined /*out*/;
        } else {
            inputs["bucket"] = undefined /*out*/;
        }
        if (!opts.version) {
            opts = pulumi.mergeOptions(opts, { version: utilities.getVersion()});
        }
        super(LambdaApi.__pulumiType, name, inputs, opts, true /*remote*/);
    }
}

/**
 * The set of arguments for constructing a LambdaApi resource.
 */
export interface LambdaApiArgs {
    /**
     * The arn of the lambda function
     */
    readonly lambdaArn: pulumi.Input<string>;
}
