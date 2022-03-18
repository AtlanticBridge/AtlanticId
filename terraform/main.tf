provider "aws" {
  region = "us-east-1"
}

terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
    random = {
      source = "hashicorp/random"
    }
  }

  cloud {
    organization = "atlantic-labs"

    workspaces {
      name = "nfid-backend"
    }
  }
}

module "nfid" {
  source        = "./nfid"
  client_id     = var.CLIENT_ID
  client_secret = var.CLIENT_SECRET
  redirect_uri  = var.REDIRECT_URI
}
