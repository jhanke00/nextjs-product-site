
resource "aws_security_group_rule" "allow_http" {
  type              = "ingress"
  from_port         = 3000
  to_port           = 3000
  protocol          = "tcp"
  security_group_id = data.aws_security_group.default.id
  cidr_blocks       = ["0.0.0.0/0"]