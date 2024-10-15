resource "aws_ecr_repository" "nextjs" {
  name                 = local.ecr_repo_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
  tags = merge(
    { Name = local.ecr_repo_name },
    local.common_tags
  )
  force_delete = true
}

resource "null_resource" "ecr_login" {
  depends_on = [aws_ecr_repository.nextjs]
  provisioner "local-exec" {
    environment = {
      AWS_ACCESS_KEY_ID     = var.aws_access_key
      AWS_SECRET_ACCESS_KEY = var.aws_secret_key
      AWS_DEFAULT_REGION    = var.aws_region
    }
    command = "aws ecr get-login-password --region ${var.aws_region} | docker login --username AWS --password-stdin ${aws_ecr_repository.nextjs.repository_url}"
  }
}

resource "null_resource" "docker_push" {
  depends_on = [null_resource.ecr_login]

  provisioner "local-exec" {
    environment = {
      AWS_ACCESS_KEY_ID     = var.aws_access_key
      AWS_SECRET_ACCESS_KEY = var.aws_secret_key
      AWS_DEFAULT_REGION    = var.aws_region
    }
    command = <<EOT
    docker build -t nextjs:latest ../../
    docker tag nextjs:latest ${aws_ecr_repository.nextjs.repository_url}:latest
    docker push ${aws_ecr_repository.nextjs.repository_url}:latest
    EOT
  }
}

resource "aws_ecs_cluster" "nextjs" {
  name = local.ecs_cluster_name

}


resource "aws_ecs_task_definition" "nextjs" {
  family                   = local.ecs_task_def
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([{
    name      = local.ecs_task_def
    image     = "${aws_ecr_repository.nextjs.repository_url}:latest"
    cpu       = 512
    memory    = 1024
    essential = true
    portMappings = [{
      containerPort = 3000
      hostPort      = 3000
    }]
  }])
  depends_on = [null_resource.docker_push]
}

resource "aws_ecs_service" "my_service" {
  name            = local.ecs_service_name
  cluster         = aws_ecs_cluster.nextjs.id
  task_definition = aws_ecs_task_definition.nextjs.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [data.aws_security_group.default.id]
    assign_public_ip = true
  }
}


