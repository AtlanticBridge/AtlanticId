resource "aws_dynamodb_table" "nfid_dynamodb" {
  name         = "nfid_dynamodb"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "nfid"
  range_key    = "username"
  attribute {
    name = "nfid"
    type = "S"
  }
  attribute {
    name = "username"
    type = "S"
  }
}
