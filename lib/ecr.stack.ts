import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { PREFIX } from "./cdk-ecs-sample-stack";
import * as ecr from "aws-cdk-lib/aws-ecr";
// right after the MinimalEcsStack definition
export class EcrStack extends cdk.Stack {
  public readonly repository: ecr.Repository;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.repository = new ecr.Repository(this, "Repository", {
      repositoryName: `${PREFIX}-repository`,
    });
  }
}
