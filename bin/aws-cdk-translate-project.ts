#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsCdkTranslateProjectStack } from '../lib/aws-cdk-translate-project-stack';

const app = new cdk.App();
new AwsCdkTranslateProjectStack(app, 'AwsCdkTranslateProjectStack', {
  
});