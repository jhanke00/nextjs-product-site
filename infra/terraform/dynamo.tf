resource "aws_dynamodb_table" "products" {
  name           = "${var.project_name}-Products"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "id"
  range_key      = "name"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "name"
    type = "S"
  }
  tags = merge(
    { Name = "${var.project_name}-Products" },
    local.common_tags
  )

}

resource "null_resource" "load_data" {
  provisioner "local-exec" {
    environment = {
      AWS_ACCESS_KEY_ID     = var.aws_access_key
      AWS_SECRET_ACCESS_KEY = var.aws_secret_key
      AWS_DEFAULT_REGION    = var.aws_region
    }
    command = "aws dynamodb batch-write-item --request-items file://../../src/mock/small/products-dynamodb.json"
  }

  depends_on = [aws_dynamodb_table.products]
}