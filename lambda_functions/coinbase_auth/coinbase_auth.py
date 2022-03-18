import os
import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):

    logging.info(event)

    try:
        
        redirectURL = 'http://localhost:4200/redirect'
        scope = 'wallet:user:read'

        # --- PARAMS ---
        baseUrl = 'https://coinbase.com'
        authorizePath = '/oauth/authorize'
        client_id = os.environ.get("COINBASE_CLIENT_ID")
        redirect_uri = os.environ.get("COINBASE_REDIRECT_URI")
        state = os.urandom(20).hex()
        scope = 'wallet:user:read'
        '''
        response_type=code
        client_id=${client_id}
        redirect_uri=${redirect_uri}
        state=${state}
        scope=${scope}
        
        authorizationUrl = "{}{}?response_type=code&client_id={}&redirect_uri={}&state={}&scope={}".format(baseUrl,authorizePath,client_id,redirect_uri,state,scope)

        '''
        authorizationUrl = "{}{}?response_type=code&client_id={}&redirect_uri={}&state={}&scope={}".format(
            baseUrl,        # URI base
            authorizePath,  # URI extension
            client_id,      # Coinbase Client ID
            redirect_uri,   # The redirect URI location
            state,          # Random string
            scope           # Request scope for reading user information
        )
    except Exception as e:
        logging.error(e)
        return {"statusCode": 500, "body": json.dumps("Internal server error")}


    return {
        'statusCode': 302,
        'headers': {
            'Location': authorizationUrl
        },
        'body': json.dumps('Initiate Coinbase OAuth login.')
    }
