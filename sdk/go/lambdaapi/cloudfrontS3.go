// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

package lambdaapi

import (
	"context"
	"reflect"

	"github.com/pkg/errors"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

type CloudfrontS3 struct {
	pulumi.ResourceState
}

// NewCloudfrontS3 registers a new resource with the given unique name, arguments, and options.
func NewCloudfrontS3(ctx *pulumi.Context,
	name string, args *CloudfrontS3Args, opts ...pulumi.ResourceOption) (*CloudfrontS3, error) {
	if args == nil {
		return nil, errors.New("missing one or more required arguments")
	}

	if args.BucketName == nil {
		return nil, errors.New("invalid value for required argument 'BucketName'")
	}
	var resource CloudfrontS3
	err := ctx.RegisterRemoteComponentResource("awslambdaapi:index:CloudfrontS3", name, args, &resource, opts...)
	if err != nil {
		return nil, err
	}
	return &resource, nil
}

type cloudfrontS3Args struct {
	// Name to give the S3 bucket which this Component will create.
	BucketName string `pulumi:"bucketName"`
}

// The set of arguments for constructing a CloudfrontS3 resource.
type CloudfrontS3Args struct {
	// Name to give the S3 bucket which this Component will create.
	BucketName pulumi.StringInput
}

func (CloudfrontS3Args) ElementType() reflect.Type {
	return reflect.TypeOf((*cloudfrontS3Args)(nil)).Elem()
}

type CloudfrontS3Input interface {
	pulumi.Input

	ToCloudfrontS3Output() CloudfrontS3Output
	ToCloudfrontS3OutputWithContext(ctx context.Context) CloudfrontS3Output
}

func (*CloudfrontS3) ElementType() reflect.Type {
	return reflect.TypeOf((*CloudfrontS3)(nil))
}

func (i *CloudfrontS3) ToCloudfrontS3Output() CloudfrontS3Output {
	return i.ToCloudfrontS3OutputWithContext(context.Background())
}

func (i *CloudfrontS3) ToCloudfrontS3OutputWithContext(ctx context.Context) CloudfrontS3Output {
	return pulumi.ToOutputWithContext(ctx, i).(CloudfrontS3Output)
}

func (i *CloudfrontS3) ToCloudfrontS3PtrOutput() CloudfrontS3PtrOutput {
	return i.ToCloudfrontS3PtrOutputWithContext(context.Background())
}

func (i *CloudfrontS3) ToCloudfrontS3PtrOutputWithContext(ctx context.Context) CloudfrontS3PtrOutput {
	return pulumi.ToOutputWithContext(ctx, i).(CloudfrontS3PtrOutput)
}

type CloudfrontS3PtrInput interface {
	pulumi.Input

	ToCloudfrontS3PtrOutput() CloudfrontS3PtrOutput
	ToCloudfrontS3PtrOutputWithContext(ctx context.Context) CloudfrontS3PtrOutput
}

type cloudfrontS3PtrType CloudfrontS3Args

func (*cloudfrontS3PtrType) ElementType() reflect.Type {
	return reflect.TypeOf((**CloudfrontS3)(nil))
}

func (i *cloudfrontS3PtrType) ToCloudfrontS3PtrOutput() CloudfrontS3PtrOutput {
	return i.ToCloudfrontS3PtrOutputWithContext(context.Background())
}

func (i *cloudfrontS3PtrType) ToCloudfrontS3PtrOutputWithContext(ctx context.Context) CloudfrontS3PtrOutput {
	return pulumi.ToOutputWithContext(ctx, i).(CloudfrontS3PtrOutput)
}

// CloudfrontS3ArrayInput is an input type that accepts CloudfrontS3Array and CloudfrontS3ArrayOutput values.
// You can construct a concrete instance of `CloudfrontS3ArrayInput` via:
//
//          CloudfrontS3Array{ CloudfrontS3Args{...} }
type CloudfrontS3ArrayInput interface {
	pulumi.Input

	ToCloudfrontS3ArrayOutput() CloudfrontS3ArrayOutput
	ToCloudfrontS3ArrayOutputWithContext(context.Context) CloudfrontS3ArrayOutput
}

type CloudfrontS3Array []CloudfrontS3Input

func (CloudfrontS3Array) ElementType() reflect.Type {
	return reflect.TypeOf(([]*CloudfrontS3)(nil))
}

func (i CloudfrontS3Array) ToCloudfrontS3ArrayOutput() CloudfrontS3ArrayOutput {
	return i.ToCloudfrontS3ArrayOutputWithContext(context.Background())
}

func (i CloudfrontS3Array) ToCloudfrontS3ArrayOutputWithContext(ctx context.Context) CloudfrontS3ArrayOutput {
	return pulumi.ToOutputWithContext(ctx, i).(CloudfrontS3ArrayOutput)
}

// CloudfrontS3MapInput is an input type that accepts CloudfrontS3Map and CloudfrontS3MapOutput values.
// You can construct a concrete instance of `CloudfrontS3MapInput` via:
//
//          CloudfrontS3Map{ "key": CloudfrontS3Args{...} }
type CloudfrontS3MapInput interface {
	pulumi.Input

	ToCloudfrontS3MapOutput() CloudfrontS3MapOutput
	ToCloudfrontS3MapOutputWithContext(context.Context) CloudfrontS3MapOutput
}

type CloudfrontS3Map map[string]CloudfrontS3Input

func (CloudfrontS3Map) ElementType() reflect.Type {
	return reflect.TypeOf((map[string]*CloudfrontS3)(nil))
}

func (i CloudfrontS3Map) ToCloudfrontS3MapOutput() CloudfrontS3MapOutput {
	return i.ToCloudfrontS3MapOutputWithContext(context.Background())
}

func (i CloudfrontS3Map) ToCloudfrontS3MapOutputWithContext(ctx context.Context) CloudfrontS3MapOutput {
	return pulumi.ToOutputWithContext(ctx, i).(CloudfrontS3MapOutput)
}

type CloudfrontS3Output struct {
	*pulumi.OutputState
}

func (CloudfrontS3Output) ElementType() reflect.Type {
	return reflect.TypeOf((*CloudfrontS3)(nil))
}

func (o CloudfrontS3Output) ToCloudfrontS3Output() CloudfrontS3Output {
	return o
}

func (o CloudfrontS3Output) ToCloudfrontS3OutputWithContext(ctx context.Context) CloudfrontS3Output {
	return o
}

func (o CloudfrontS3Output) ToCloudfrontS3PtrOutput() CloudfrontS3PtrOutput {
	return o.ToCloudfrontS3PtrOutputWithContext(context.Background())
}

func (o CloudfrontS3Output) ToCloudfrontS3PtrOutputWithContext(ctx context.Context) CloudfrontS3PtrOutput {
	return o.ApplyT(func(v CloudfrontS3) *CloudfrontS3 {
		return &v
	}).(CloudfrontS3PtrOutput)
}

type CloudfrontS3PtrOutput struct {
	*pulumi.OutputState
}

func (CloudfrontS3PtrOutput) ElementType() reflect.Type {
	return reflect.TypeOf((**CloudfrontS3)(nil))
}

func (o CloudfrontS3PtrOutput) ToCloudfrontS3PtrOutput() CloudfrontS3PtrOutput {
	return o
}

func (o CloudfrontS3PtrOutput) ToCloudfrontS3PtrOutputWithContext(ctx context.Context) CloudfrontS3PtrOutput {
	return o
}

type CloudfrontS3ArrayOutput struct{ *pulumi.OutputState }

func (CloudfrontS3ArrayOutput) ElementType() reflect.Type {
	return reflect.TypeOf((*[]CloudfrontS3)(nil))
}

func (o CloudfrontS3ArrayOutput) ToCloudfrontS3ArrayOutput() CloudfrontS3ArrayOutput {
	return o
}

func (o CloudfrontS3ArrayOutput) ToCloudfrontS3ArrayOutputWithContext(ctx context.Context) CloudfrontS3ArrayOutput {
	return o
}

func (o CloudfrontS3ArrayOutput) Index(i pulumi.IntInput) CloudfrontS3Output {
	return pulumi.All(o, i).ApplyT(func(vs []interface{}) CloudfrontS3 {
		return vs[0].([]CloudfrontS3)[vs[1].(int)]
	}).(CloudfrontS3Output)
}

type CloudfrontS3MapOutput struct{ *pulumi.OutputState }

func (CloudfrontS3MapOutput) ElementType() reflect.Type {
	return reflect.TypeOf((*map[string]CloudfrontS3)(nil))
}

func (o CloudfrontS3MapOutput) ToCloudfrontS3MapOutput() CloudfrontS3MapOutput {
	return o
}

func (o CloudfrontS3MapOutput) ToCloudfrontS3MapOutputWithContext(ctx context.Context) CloudfrontS3MapOutput {
	return o
}

func (o CloudfrontS3MapOutput) MapIndex(k pulumi.StringInput) CloudfrontS3Output {
	return pulumi.All(o, k).ApplyT(func(vs []interface{}) CloudfrontS3 {
		return vs[0].(map[string]CloudfrontS3)[vs[1].(string)]
	}).(CloudfrontS3Output)
}

func init() {
	pulumi.RegisterOutputType(CloudfrontS3Output{})
	pulumi.RegisterOutputType(CloudfrontS3PtrOutput{})
	pulumi.RegisterOutputType(CloudfrontS3ArrayOutput{})
	pulumi.RegisterOutputType(CloudfrontS3MapOutput{})
}
