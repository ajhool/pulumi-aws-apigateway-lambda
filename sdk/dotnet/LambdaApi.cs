// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Threading.Tasks;
using Pulumi.Serialization;

namespace Pulumi.Lambdaapi
{
    [LambdaapiResourceType("awslambdaapi:index:LambdaApi")]
    public partial class LambdaApi : Pulumi.ComponentResource
    {
        /// <summary>
        /// The bucket resource.
        /// </summary>
        [Output("bucket")]
        public Output<Pulumi.Aws.S3.Bucket> Bucket { get; private set; } = null!;

        /// <summary>
        /// The website URL.
        /// </summary>
        [Output("websiteUrl")]
        public Output<string> WebsiteUrl { get; private set; } = null!;


        /// <summary>
        /// Create a LambdaApi resource with the given unique name, arguments, and options.
        /// </summary>
        ///
        /// <param name="name">The unique name of the resource</param>
        /// <param name="args">The arguments used to populate this resource's properties</param>
        /// <param name="options">A bag of options that control this resource's behavior</param>
        public LambdaApi(string name, LambdaApiArgs args, ComponentResourceOptions? options = null)
            : base("awslambdaapi:index:LambdaApi", name, args ?? new LambdaApiArgs(), MakeResourceOptions(options, ""), remote: true)
        {
        }

        private static ComponentResourceOptions MakeResourceOptions(ComponentResourceOptions? options, Input<string>? id)
        {
            var defaultOptions = new ComponentResourceOptions
            {
                Version = Utilities.Version,
            };
            var merged = ComponentResourceOptions.Merge(defaultOptions, options);
            // Override the ID if one was specified for consistency with other language SDKs.
            merged.Id = id ?? merged.Id;
            return merged;
        }
    }

    public sealed class LambdaApiArgs : Pulumi.ResourceArgs
    {
        /// <summary>
        /// The name of the S3 bucket
        /// </summary>
        [Input("bucketName", required: true)]
        public Input<string> BucketName { get; set; } = null!;

        /// <summary>
        /// Cloudfront args
        /// </summary>
        [Input("distribution", required: true)]
        public Input<Pulumi.Aws.S3.Bucket> Distribution { get; set; } = null!;

        public LambdaApiArgs()
        {
        }
    }
}
