// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

package awslambdaapi

import (
	"context"
	"reflect"

	"github.com/pkg/errors"
	"github.com/pulumi/pulumi-aws/sdk/v4/go/aws/cloudwatch"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

type CronLambda struct {
	pulumi.ResourceState

	// Specifies the cron schedule.
	EventRule cloudwatch.EventRuleOutput `pulumi:"eventRule"`
	// The website URL.
	EventTarget cloudwatch.EventTargetOutput `pulumi:"eventTarget"`
}

// NewCronLambda registers a new resource with the given unique name, arguments, and options.
func NewCronLambda(ctx *pulumi.Context,
	name string, args *CronLambdaArgs, opts ...pulumi.ResourceOption) (*CronLambda, error) {
	if args == nil {
		return nil, errors.New("missing one or more required arguments")
	}

	if args.HandlerArn == nil {
		return nil, errors.New("invalid value for required argument 'HandlerArn'")
	}
	if args.RateInMinutes == nil {
		return nil, errors.New("invalid value for required argument 'RateInMinutes'")
	}
	var resource CronLambda
	err := ctx.RegisterRemoteComponentResource("awslambdaapi:index:CronLambda", name, args, &resource, opts...)
	if err != nil {
		return nil, err
	}
	return &resource, nil
}

type cronLambdaArgs struct {
	// Lambda function to execute as a cron job
	HandlerArn string `pulumi:"handlerArn"`
	// Rate that the cron lambda will execute.
	RateInMinutes float64 `pulumi:"rateInMinutes"`
}

// The set of arguments for constructing a CronLambda resource.
type CronLambdaArgs struct {
	// Lambda function to execute as a cron job
	HandlerArn pulumi.StringInput
	// Rate that the cron lambda will execute.
	RateInMinutes pulumi.Float64Input
}

func (CronLambdaArgs) ElementType() reflect.Type {
	return reflect.TypeOf((*cronLambdaArgs)(nil)).Elem()
}

type CronLambdaInput interface {
	pulumi.Input

	ToCronLambdaOutput() CronLambdaOutput
	ToCronLambdaOutputWithContext(ctx context.Context) CronLambdaOutput
}

func (*CronLambda) ElementType() reflect.Type {
	return reflect.TypeOf((*CronLambda)(nil))
}

func (i *CronLambda) ToCronLambdaOutput() CronLambdaOutput {
	return i.ToCronLambdaOutputWithContext(context.Background())
}

func (i *CronLambda) ToCronLambdaOutputWithContext(ctx context.Context) CronLambdaOutput {
	return pulumi.ToOutputWithContext(ctx, i).(CronLambdaOutput)
}

func (i *CronLambda) ToCronLambdaPtrOutput() CronLambdaPtrOutput {
	return i.ToCronLambdaPtrOutputWithContext(context.Background())
}

func (i *CronLambda) ToCronLambdaPtrOutputWithContext(ctx context.Context) CronLambdaPtrOutput {
	return pulumi.ToOutputWithContext(ctx, i).(CronLambdaPtrOutput)
}

type CronLambdaPtrInput interface {
	pulumi.Input

	ToCronLambdaPtrOutput() CronLambdaPtrOutput
	ToCronLambdaPtrOutputWithContext(ctx context.Context) CronLambdaPtrOutput
}

type cronLambdaPtrType CronLambdaArgs

func (*cronLambdaPtrType) ElementType() reflect.Type {
	return reflect.TypeOf((**CronLambda)(nil))
}

func (i *cronLambdaPtrType) ToCronLambdaPtrOutput() CronLambdaPtrOutput {
	return i.ToCronLambdaPtrOutputWithContext(context.Background())
}

func (i *cronLambdaPtrType) ToCronLambdaPtrOutputWithContext(ctx context.Context) CronLambdaPtrOutput {
	return pulumi.ToOutputWithContext(ctx, i).(CronLambdaPtrOutput)
}

// CronLambdaArrayInput is an input type that accepts CronLambdaArray and CronLambdaArrayOutput values.
// You can construct a concrete instance of `CronLambdaArrayInput` via:
//
//          CronLambdaArray{ CronLambdaArgs{...} }
type CronLambdaArrayInput interface {
	pulumi.Input

	ToCronLambdaArrayOutput() CronLambdaArrayOutput
	ToCronLambdaArrayOutputWithContext(context.Context) CronLambdaArrayOutput
}

type CronLambdaArray []CronLambdaInput

func (CronLambdaArray) ElementType() reflect.Type {
	return reflect.TypeOf(([]*CronLambda)(nil))
}

func (i CronLambdaArray) ToCronLambdaArrayOutput() CronLambdaArrayOutput {
	return i.ToCronLambdaArrayOutputWithContext(context.Background())
}

func (i CronLambdaArray) ToCronLambdaArrayOutputWithContext(ctx context.Context) CronLambdaArrayOutput {
	return pulumi.ToOutputWithContext(ctx, i).(CronLambdaArrayOutput)
}

// CronLambdaMapInput is an input type that accepts CronLambdaMap and CronLambdaMapOutput values.
// You can construct a concrete instance of `CronLambdaMapInput` via:
//
//          CronLambdaMap{ "key": CronLambdaArgs{...} }
type CronLambdaMapInput interface {
	pulumi.Input

	ToCronLambdaMapOutput() CronLambdaMapOutput
	ToCronLambdaMapOutputWithContext(context.Context) CronLambdaMapOutput
}

type CronLambdaMap map[string]CronLambdaInput

func (CronLambdaMap) ElementType() reflect.Type {
	return reflect.TypeOf((map[string]*CronLambda)(nil))
}

func (i CronLambdaMap) ToCronLambdaMapOutput() CronLambdaMapOutput {
	return i.ToCronLambdaMapOutputWithContext(context.Background())
}

func (i CronLambdaMap) ToCronLambdaMapOutputWithContext(ctx context.Context) CronLambdaMapOutput {
	return pulumi.ToOutputWithContext(ctx, i).(CronLambdaMapOutput)
}

type CronLambdaOutput struct {
	*pulumi.OutputState
}

func (CronLambdaOutput) ElementType() reflect.Type {
	return reflect.TypeOf((*CronLambda)(nil))
}

func (o CronLambdaOutput) ToCronLambdaOutput() CronLambdaOutput {
	return o
}

func (o CronLambdaOutput) ToCronLambdaOutputWithContext(ctx context.Context) CronLambdaOutput {
	return o
}

func (o CronLambdaOutput) ToCronLambdaPtrOutput() CronLambdaPtrOutput {
	return o.ToCronLambdaPtrOutputWithContext(context.Background())
}

func (o CronLambdaOutput) ToCronLambdaPtrOutputWithContext(ctx context.Context) CronLambdaPtrOutput {
	return o.ApplyT(func(v CronLambda) *CronLambda {
		return &v
	}).(CronLambdaPtrOutput)
}

type CronLambdaPtrOutput struct {
	*pulumi.OutputState
}

func (CronLambdaPtrOutput) ElementType() reflect.Type {
	return reflect.TypeOf((**CronLambda)(nil))
}

func (o CronLambdaPtrOutput) ToCronLambdaPtrOutput() CronLambdaPtrOutput {
	return o
}

func (o CronLambdaPtrOutput) ToCronLambdaPtrOutputWithContext(ctx context.Context) CronLambdaPtrOutput {
	return o
}

type CronLambdaArrayOutput struct{ *pulumi.OutputState }

func (CronLambdaArrayOutput) ElementType() reflect.Type {
	return reflect.TypeOf((*[]CronLambda)(nil))
}

func (o CronLambdaArrayOutput) ToCronLambdaArrayOutput() CronLambdaArrayOutput {
	return o
}

func (o CronLambdaArrayOutput) ToCronLambdaArrayOutputWithContext(ctx context.Context) CronLambdaArrayOutput {
	return o
}

func (o CronLambdaArrayOutput) Index(i pulumi.IntInput) CronLambdaOutput {
	return pulumi.All(o, i).ApplyT(func(vs []interface{}) CronLambda {
		return vs[0].([]CronLambda)[vs[1].(int)]
	}).(CronLambdaOutput)
}

type CronLambdaMapOutput struct{ *pulumi.OutputState }

func (CronLambdaMapOutput) ElementType() reflect.Type {
	return reflect.TypeOf((*map[string]CronLambda)(nil))
}

func (o CronLambdaMapOutput) ToCronLambdaMapOutput() CronLambdaMapOutput {
	return o
}

func (o CronLambdaMapOutput) ToCronLambdaMapOutputWithContext(ctx context.Context) CronLambdaMapOutput {
	return o
}

func (o CronLambdaMapOutput) MapIndex(k pulumi.StringInput) CronLambdaOutput {
	return pulumi.All(o, k).ApplyT(func(vs []interface{}) CronLambda {
		return vs[0].(map[string]CronLambda)[vs[1].(string)]
	}).(CronLambdaOutput)
}

func init() {
	pulumi.RegisterOutputType(CronLambdaOutput{})
	pulumi.RegisterOutputType(CronLambdaPtrOutput{})
	pulumi.RegisterOutputType(CronLambdaArrayOutput{})
	pulumi.RegisterOutputType(CronLambdaMapOutput{})
}