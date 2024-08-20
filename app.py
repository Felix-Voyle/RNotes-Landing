from flask import Flask, render_template, request, jsonify

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

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


def check_not_subscribed(email):
    """Check if the email is already subscribed across all contacts."""
    headers = {
        'Authorization': f'Bearer {api_key}'
    }
    
    url = 'https://api.sendgrid.com/v3/marketing/contacts'
    contacts = []

    try:
        while url:
            response = requests.get(url, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                
                contacts.extend(data.get('result', []))
                
                if any(contact['email'] == email for contact in contacts):
                    return True
                
                pagination = data.get('pagination', {})
                next_url = pagination.get('next', None)
                
                if next_url:
                    print(f"Next page URL: {next_url}")
                else:
                    print("No more pages.")
                
                url = next_url
            else:
                print(f"Error fetching contacts: Status Code {response.status_code}")
                print(f"Response Text: {response.text}")
                break

    except requests.exceptions.RequestException as e:
        # Catch requests-specific exceptions
        print(f"Request exception: {str(e)}")
    except Exception as e:
        # Catch other exceptions
        print(f"Error checking subscribed users: {str(e)}")

    return False



def send_email(email):
    message = Mail(
        from_email='noreply@roll.global',
        to_emails=email,
        subject='Sending with Twilio SendGrid is Fun',
        html_content=render_template('subscription_template.html')
    )

    try:
        sg = SendGridAPIClient(os.getenv('EMAIL_API'))
        response = sg.send(message)
        print(f"Response Status: {response.status_code}")
        print(f"Response Body: {response.body}")
        print(f"Response Headers: {response.headers}")

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        traceback.print_exc()


@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.form.get('email')

    if check_not_subscribed(email):
        return jsonify({'message': 'already signed up'}), 400

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

        # Check for success or error in response
        if response.status_code == 202:
            send_email(email)
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
