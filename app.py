from flask import Flask, request, jsonify, render_template, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from authlib.integrations.flask_client import OAuth

app = Flask(__name__)
app.secret_key = 'mysecretkey'  # Change this to a random string
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///finance.db'  # Set via environment variable externally
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define the Transaction model
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    transaction_type = db.Column(db.String(50), nullable=False)

# Initialize OAuth extension
oauth = OAuth(app)

# Configuration for Google OAuth
CLIENT_ID = '850393402516-sb33m39rfhs2sssa889s35gj0u3jpblj.apps.googleusercontent.com'
CLIENT_SECRET = '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'
REDIRECT_URI = 'https://www.nasdaq.com/'  # Update the redirect URI

oauth.register(p
    name='google',
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    refresh_token_url=None,
    refresh_token_params=None,
    redirect_uri=REDIRECT_URI,
    client_kwargs={'scope': 'openid profile email'}
)

# Define routes for Google OAuth
@app.route('/login')
def login():
    return oauth.google.authorize_redirect(redirect_uri=REDIRECT_URI)

@app.route('/google-callback')
def auth():
    token = oauth.google.authorize_access_token()
    resp = oauth.google.get('userinfo')
    resp.raise_for_status()
    profile = resp.json()
    session['profile'] = profile
    return redirect(url_for('home'))

# Define routes for transaction management
@app.route('/get-transactions')
def get_transactions():
    transactions = Transaction.query.all()
    transactions_data = [{'id': tx.id, 'description': tx.description, 'amount': tx.amount, 'type': tx.transaction_type} for tx in transactions]
    return jsonify({'transactions': transactions_data})

@app.route('/add-transaction', methods=['POST'])
def add_transaction():
    data = request.get_json()
    if not data or 'description' not in data or 'amount' not in data or 'type' not in data:
        return jsonify({'status': 'error', 'message': 'Missing data'}), 400
    try:
        amount = float(data['amount'])
        if amount <= 0:
            raise ValueError('Amount must be positive')
        new_transaction = Transaction(description=data['description'], amount=amount, transaction_type=data['type'])
        db.session.add(new_transaction)
        db.session.commit()
        return jsonify({'status': 'success', 'message': 'Transaction added', 'transactionId': new_transaction.id})
    except (ValueError, TypeError) as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/delete-transaction/<int:id>', methods=['DELETE'])
def delete_transaction(id):
    transaction = Transaction.query.get(id)
    if not transaction:
        return jsonify({'status': 'error', 'message': 'Transaction not found'}), 404
    db.session.delete(transaction)
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'Transaction deleted', 'transactionId': id})

# Define the home route
@app.route('/')
def home():
    transactions = Transaction.query.all()
    return render_template('index.html', transactions=transactions)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=False)  # Ensure debug is off for production
