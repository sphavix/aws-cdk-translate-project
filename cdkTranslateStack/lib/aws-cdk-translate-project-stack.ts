import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodeJs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as Iam from 'aws-cdk-lib/aws-iam';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkTranslateProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // a policy that gets the attached to the lambda function
    // allowing it to access the tranlate service
    const translateAccessPolicy = new Iam.PolicyStatement({
      actions: ["translate:TranslateText"],
      resources: ["*"]
    });

    // the lambda of the time of day construct
    const lambdaFunc = new lambdaNodeJs.NodejsFunction(this, "timeOfDay", {
      entry: "./lambda/timeOfDay.ts",
      handler: "index",
      runtime:lambda.Runtime.NODEJS_20_X,
      initialPolicy: [translateAccessPolicy]
    });

    const restApi = new apigateway.RestApi(this, "timeOfDayApi", {
      restApiName: "Time of Day Service",
      description: "This service serves a time of day message.",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS, // Allow all origins
        allowMethods: apigateway.Cors.ALL_METHODS, // Allow all HTTP methods
        allowHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
      },
    });
    restApi.root.addMethod("POST", new apigateway.LambdaIntegration(lambdaFunc));
  }
}
