resource "aws_iam_role" "nfid_sign_in_lambda_role" {
  name = "nfid_sign_in_lambda_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "nfid_sign_in_lambda_policy" {
  name   = "nfid_sign_in_lambda_policy"
  role   = aws_iam_role.nfid_sign_in_lambda_role.id
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem",
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
              "${aws_dynamodb_table.nfid_dynamodb.arn}",
              "arn:aws:logs:*:*:*"
            ]
        }
    ]
}
EOF
}

data "archive_file" "nfid_lambda_archive" {
  type        = "zip"
  source_file = "${path.module}/init.tpl"
  output_path = "${path.module}/files/init.zip"
}

resource "aws_lambda_function" "nfid_sign_in_lambda" {
  filename         = data.archive_file.nfid_lambda_archive.output_path
  source_code_hash = data.archive_file.nfid_lambda_archive.output_base64sha256
  publish          = true
  function_name    = "nfid_sign_in_lambda"
  role             = aws_iam_role.nfid_sign_in_lambda_role.arn
  handler          = "nfid_sign_in.lambda_handler"
  runtime          = "python3.8"
  timeout          = 15

  environment {
    variables = {
      CLIENT_ID     = var.CLIENT_ID
      CLIENT_SECRET = var.CLIENT_SECRET
      REDIRECT_URI  = var.REDIRECT_URI
    }
  }
}
