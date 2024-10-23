import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import * as apigw2 from "aws-cdk-lib/aws-apigatewayv2";
import { HttpAlbIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";

export const PREFIX = "cdk-ecs-app";
interface ECSStackProps extends cdk.StackProps {
  repository: ecr.Repository;
}
export class ECSStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ECSStackProps) {
    super(scope, id, props);
    const { repository } = props;
    // 1.
    const vpc = new ec2.Vpc(this, "Vpc", {
      ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"),
      maxAzs: 2, // each will have 1 public + 1 private subnets
      vpcName: `${PREFIX}-vpc`,
      restrictDefaultSecurityGroup: false,
    });

    // 2.
    const cluster: ecs.Cluster = new ecs.Cluster(this, "Cluster", {
      vpc,
      clusterName: `${PREFIX}-cluster`,
    });

    // 3.
    const { service, targetGroup, listener, loadBalancer } =
      new ApplicationLoadBalancedFargateService(this, "Service", {
        serviceName: `${PREFIX}-service`,
        loadBalancerName: `${PREFIX}-private-alb`,
        cluster,
        memoryLimitMiB: 512,
        cpu: 256, // 0.25 vCPU
        taskImageOptions: {
          image: ecs.ContainerImage.fromEcrRepository(repository),
          environment: {
            ENV_VAR_1: "value1",
            ENV_VAR_2: "value2",
          },
          containerPort: 80,
        },
        desiredCount: 1,
        publicLoadBalancer: false,
      });

    // 5.
    targetGroup.configureHealthCheck({
      path: "/health",
    });

    const httpApi = new apigw2.HttpApi(this, "HttpApi", {
      apiName: `${PREFIX}-api`,
    });

    httpApi.addRoutes({
      path: "/",
      methods: [apigw2.HttpMethod.GET],
      integration: new HttpAlbIntegration("AlbIntegration", listener),
    });
    // right after the service definition in the MinimalEcsStack
    const scaling = service.autoScaleTaskCount({
      maxCapacity: 5,
      minCapacity: 1,
    });
    scaling.scaleOnCpuUtilization("CpuScaling", {
      targetUtilizationPercent: 70,
    }); // default cooldown of 5 min
    scaling.scaleOnMemoryUtilization("RamScaling", {
      targetUtilizationPercent: 70,
    }); // default cooldown of 5 min

    new cdk.CfnOutput(this, "api-gateway-url", {
      value: httpApi.url!,
      description: "API Gateway URL",
    });
  }
}
