import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodeJs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkTranslateProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunc = new lambdaNodeJs.NodejsFunction(this, "timeOfDay", {
      entry: "./lambda/timeOfDay.js",
      handler: "index",
      runtime:lambda.Runtime.NODEJS_20_X
    });

    const restApi = new apigateway.RestApi(this, "timeOfDayApi");
    restApi.root.addMethod("GET", new apigateway.LambdaIntegration(lambdaFunc));
  }
}
