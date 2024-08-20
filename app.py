from flask import Flask, render_template, request, jsonify

import os
import json
import traceback
import requests

app = Flask(__name__)

api_key = os.getenv('SENDGRID_API_KEY')
list_id = os.getenv('LIST_ID')


# Route to render the index.html template
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.form.get('email')

    # Define the new contact
    data = {
        "list_ids": [list_id],
        "contacts": [
            {
                "email": email,
                "custom_fields": {
                    "feedback_sent": "FALSE"
                }
            }
        ]
    }

    # Convert the dictionary to a JSON string
    json_data = json.dumps(data)

    # Set headers
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }

    try:
        # Make the request
        response = requests.put(
            'https://api.sendgrid.com/v3/marketing/contacts',
            headers=headers,
            data=json_data
        )

        # Print response for debugging
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        print(f"Response Headers: {response.headers}")

        # Check for success or error in response
        if response.status_code == 202:
            return jsonify({'message': 'Subscription successful'}), 202
        else:
            return jsonify({'error': response.text, 'message': 'An error occurred please try again later.'}), response.status_code

    except Exception as e:
        # Prepare exception details for debugging
        error_details = {
            'error': str(e),
            'traceback': traceback.format_exc()
        }

        # Return detailed error response
        return jsonify({'message': 'An error occurred please try again later.', **error_details}), 500


if __name__ == '__main__':
    app.run(debug=True)
