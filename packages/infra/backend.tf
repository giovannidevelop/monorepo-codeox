provider "aws" {
  region = "us-east-2"
}

resource "aws_elastic_beanstalk_application" "backend_app" {
  name = "ClienteService"
}

resource "aws_elastic_beanstalk_environment" "backend_env" {
  name                = "ClienteService-env"
  application         = aws_elastic_beanstalk_application.backend_app.name
  solution_stack_name = "64bit Amazon Linux 2 v3.4.14 running Corretto 17"

  setting {
    namespace = "aws:rds:dbinstance"
    name      = "DBUser"
    value     = "your-db-user"
  }
}