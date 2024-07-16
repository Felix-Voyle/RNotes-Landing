from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Route to render the index.html template
@app.route('/')
def index():
    return render_template('index.html')

# Example route to handle form submission
@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.form.get('email')
    # Process email subscription logic here
    return jsonify({'message': 'Subscription successful'})

if __name__ == '__main__':
    app.run(debug=True)
