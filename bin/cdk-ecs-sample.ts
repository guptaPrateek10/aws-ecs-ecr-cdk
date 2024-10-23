#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ECSStack } from "../lib/cdk-ecs-sample-stack";
import { EcrStack } from "../lib/ecr.stack";
const app = new cdk.App();
const { repository } = new EcrStack(app, "EcrStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-west-2",
  },
});
new ECSStack(app, "ECSStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-west-2",
  },
  repository,
});
