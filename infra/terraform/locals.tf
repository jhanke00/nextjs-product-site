locals {
  ecr_repo_name    = lower("${var.project_name}-repo")
  ecs_cluster_name = lower("${var.project_name}-ecs-cluster")
  ecs_service_name = lower("${var.project_name}-ecs-service")

  ecs_task_def = lower("${var.project_name}-task")
  common_tags = {
    Environment = var.env
    Project     = var.project_name
  }
}