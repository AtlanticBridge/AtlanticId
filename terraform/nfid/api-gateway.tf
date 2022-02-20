resource "aws_api_gateway_rest_api" "nfid_api" {
  name        = "nfid_api"
  description = "API for NFID project"
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_deployment" "v1_deployment" {
  rest_api_id = aws_api_gateway_rest_api.nfid_api.id

  triggers = {
    redeployment = sha1(jsonencode(timestamp()))
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "v1" {
  deployment_id = aws_api_gateway_deployment.v1_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.nfid_api.id
  stage_name    = "V1"
}

resource "aws_api_gateway_usage_plan" "nfid_usage_plan" {
  name = "nfid_usage_plan"

  api_stages {
    api_id = aws_api_gateway_rest_api.nfid_api.id
    stage  = aws_api_gateway_stage.v1.stage_name
  }
}

resource "aws_api_gateway_api_key" "nfid_api_key" {
  name = "nfid_api_key"
}

resource "aws_api_gateway_usage_plan_key" "nfid_usage_plan_key" {
  key_id        = aws_api_gateway_api_key.nfid_api_key.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.nfid_usage_plan.id
}

resource "aws_api_gateway_resource" "create_nfid_resource" {
  path_part   = "create_nfid"
  parent_id   = aws_api_gateway_rest_api.nfid_api.root_resource_id
  rest_api_id = aws_api_gateway_rest_api.nfid_api.id
}

resource "aws_api_gateway_method" "nfid_post_method" {
  rest_api_id      = aws_api_gateway_rest_api.nfid_api.id
  resource_id      = aws_api_gateway_resource.create_nfid_resource.id
  http_method      = "POST"
  authorization    = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_integration" "create_nfid_integration" {
  rest_api_id             = aws_api_gateway_rest_api.nfid_api.id
  resource_id             = aws_api_gateway_resource.create_nfid_resource.id
  http_method             = aws_api_gateway_method.nfid_post_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.nfid_sign_in_lambda.invoke_arn
}

resource "aws_lambda_permission" "create_nfid_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.nfid_sign_in_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.nfid_api.execution_arn}/*/*/*"
}
