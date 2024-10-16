variable "aws_access_key" {
  description = "AWS Access Key"
}

variable "aws_secret_key" {
  description = "AWS Secret Key"
}

variable "aws_region" {
  description = "AWS Region"
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  default     = ""
}

variable "env" {
  description = "environment"
  default     = ""
}