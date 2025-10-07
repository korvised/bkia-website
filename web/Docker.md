## Build Docker Image
```shell
docker build -t bkia-website:v0.0.1 .
```
# Install AWS CLI
```shell
# 1. install
install aws-cli
# 2. configure
# set access key and secret key
aws configure
# 3. test
aws s3 ls
# 4. login to ecr
aws ecr get-login-password --region ap-southeast-7 `
| docker login --username AWS --password-stdin 718942601704.dkr.ecr.ap-southeast-7.amazonaws.com

```

## Deploy to ECS
```shell
# 1. Login to ECR
aws ecr get-login-password --region ap-southeast-7 |
docker login --username AWS --password-stdin 718942601704.dkr.ecr.ap-southeast-7.amazonaws.com

# 2. Build Docker image (latest only)
docker build -t 718942601704.dkr.ecr.ap-southeast-7.amazonaws.com/bkia-website-uat:latest .

# 3. Push image to ECR
docker push 718942601704.dkr.ecr.ap-southeast-7.amazonaws.com/bkia-website-uat:latest

# 4. Force ECS service to pull and redeploy new image
aws ecs update-service `
  --cluster bkia-website-client-cluster `
  --service bkia-website-client-task-service-demo `
  --force-new-deployment `
  --region ap-southeast-7
```
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
