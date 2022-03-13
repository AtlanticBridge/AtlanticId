import json
import logging
import requests
import os
import boto3
import uuid
import hashlib

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    
    headers = {
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Methods": "OPTIONS, POST",
        "Access-Control-Allow-Credentials" : True,
        "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
    }

    logging.info(event)

    try:
        client_id = os.environ.get("CLIENT_ID")
        client_secret = os.environ.get("CLIENT_SECRET")
        redirect_uri = os.environ.get("REDIRECT_URI")

        code = event["queryStringParameters"]["code"]

        auth_response = requests.post(
            "https://api.coinbase.com/oauth/token",
            params={
                "grant_type": "authorization_code",
                "code": code,
                "client_id": client_id,
                "client_secret": client_secret,
                "redirect_uri": redirect_uri,
            },
        )

        if auth_response.status_code != 200:
            logging.error(auth_response.reason)
            return {
                "statusCode": auth_response.status_code,
                "headers": headers,
                "body": json.dumps("Authorization failed"),
            }

        auth_json = auth_response.json()
        access_token = auth_json["access_token"]

        logging.info(access_token)

        user_response = requests.get(
            url="https://api.coinbase.com/v2/user",
            headers={"Authorization": "Bearer " + access_token},
        )

        if user_response.status_code != 200:
            logging.error(user_response.reason)
            return {
                "statusCode": user_response.status_code,
                "headers": headers,
                "body": json.dumps("Failed to retrieve use information"),
            }

        user_json = user_response.json()
        user_data = user_json["data"]

        uid = user_data.get("id", "")
        email = user_data.get("name", "")

        salt = uuid.uuid4().hex
        nfid = hashlib.sha512((uid + salt).encode("utf-8")).hexdigest()

        logging.info(nfid)

        dynamodb = boto3.client("dynamodb")

        put_response = dynamodb.put_item(
            TableName="nfid_dynamodb",
            Item={
                "nfid": {"S": nfid},
                "email": {"S": email},
                "salt": {"S": salt},
            },
        )
        
        logging.info(put_response)
        
    except Exception as e:
        logging.error(e)
        return {"statusCode": 500, "headers": headers, "body": json.dumps("Internal server error")}

    return {"statusCode": 200, "headers": headers, "body": json.dumps(nfid)}
