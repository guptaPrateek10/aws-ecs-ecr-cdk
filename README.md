# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template


# How to run this project ?
  * 1: cdk deploy EcrStack
  * 2: cdk deploy ECSStack
  3: cd container
  4: docker build -t cdk-ecs-app-repository .
  5: docker tag cdk-ecs-app-repository:latest 922372995423.dkr.ecr.us-west-2.amazonaws.com/cdk-ecs-app-repository:latest (replace your docker image tag if new image build)
  6: docker push 922372995423.dkr.ecr.us-west-2.amazonaws.com/cdk-ecs-app-repository:latest

  * `This will create 2 infra to your aws and deploy 2 stacks. next?`
    7: Go to ecs cluster and select the service name.
    8: Select task definition from left menu .
    9: Create new provisioning.
    10: Go to tasks and update the service for new code base changes to update into the aws cluster service.
    
