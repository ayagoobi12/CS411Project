# CS411Project 
Team Members: Aidan Yagoobi, Owen Reilly, Shangwei Liu, and Ruyue Xiao 
A group project for CS411 that creates a financial budget tracker 

1.) Project Description
The Personal Finance Tracker is a web application aimed at helping users manage their finances efficiently. Built using Python and Flask for the backend, with a basic understanding of JavaScript for frontend interactions, this project integrates Open Auth authentication for secure user access and API integration for enhanced functionality.

2.) Project Requirements 
Goal: Develop a user-friendly web interface for managing personal finances efficiently, including income and expense tracking, financial summaries, and budget management.
Non-Goal: Dynamically analyze financial data to provide automated budget recommendations or financial advice.

Non-functional requirement 1: Security
Functional requirements:
i. Implement OAuth authentication for secure user login via platforms like Google or Facebook.
ii. Ensure OpenWeatherMap API keys are securely stored in local files, preventing exposure on GitHub or the web.

Non-functional requirement 2: Repeatability
Functional requirements:
i. Store previous financial data and search results locally to ensure repeatability and consistency.
ii. Guarantee that identical financial circumstances produce the same results every time.

3.) Product Management 
Theme:
Provide an approachable enviornment for a user to seamlessely conduct finances such as currency exchange. 

Epic:
Website Beta 

User Stories 1:
As a user, I want to ensure that my personal finances are secure on the platform I use. 

Task 1:
Implement OAuth for User Authentication
Ticket 1: Configure Flask application to integrate OAuth authentication.
Ticket 2: Implement OAuth login functionality using Flask-OAuthlib.


User Stories 2:
As a user, I want to be able to see what the value of my account is in different currencies. 

Task 2: 
Integrate Currency Conversion API
Ticket 1: Set up API connection for retrieving currency conversion rates.
Ticket 2: Implement functionality to convert financial data into different currencies based on user preferences.






# Personal Finance Tracker Application

## 1. Introduction

This Personal Finance Tracker is a web-based tool built using Flask and JavaScript. It's designed to help you manage your finances by allowing you to track your income and expenses. The application currently includes features only adding transactions and visualizing your financial data with a pie chart.

## 2. Prerequisites

To run this project, you'll need:
- Python 3.6 or later
- pip
- A modern web browser

## 3. Setup

### Downloading the Project

Start by downloading the project to your computer:
- Move into the project directory: `cd path to /Client`

### Installing Dependencies

The project requires Flask and Flask-SQLAlchemy. Install these using pip:
pip install Flask Flask-SQLAlchemy
pip install authlib


### Installing Dependencies

Starting the Server
To start the server, run:
python app.py
The server will run on `http://127.0.0.1:5000` by default. (modify it in the app.py)

## 4. Using the Application:

Open your web browser and go to `http://127.0.0.1:5000` to use the application. You can add, view, and delete transactions through the user interface.

## 5. Features:

Adding Transactions: Input descriptions and amounts, and specify the type (income or expense).
Viewing Transactions: See a list of all your transactions with options to delete them.
Data Visualization: View your financial data in a pie chart that updates dynamically with each transaction.

## 6. Technologies Used

Flask: A lightweight web framework in Python.
JavaScript: For dynamic interactions on the web page.
HTML/CSS: For layout and styling.
Chart.js: For creating interactive charts.
