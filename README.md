# CS411-Project
Team Members: Aidan Yagoobi, Owen Reilly, Shangwei Liu, and Ruyue Xiao A group project for CS411 that creates a financial budget tracker
## 1. Project Description
The Personal Finance Tracker is a web application aimed at helping users manage their finances efficiently. Built using Python and Flask for the backend, with a basic understanding of JavaScript for frontend interactions, this project integrates Open Auth authentication for secure user access and API integration for enhanced functionality.

## 2. Project Requirements
**Goal**: Develop a user-friendly web interface for managing personal finances efficiently, including income and expense tracking, financial summaries, and budget management.

**Non-Goal**: Dynamically analyze financial data to provide automated budget recommendations or financial advice.

**Non-functional requirement 1: Security**
Functional requirements:
- Implement OAuth authentication for secure user login via platforms like Google or Facebook.
- Ensure OpenWeatherMap API keys are securely stored in local files, preventing exposure on GitHub or the web.

**Non-functional requirement 2: Repeatability**
Functional requirements:
- Store previous financial data and search results locally to ensure repeatability and consistency.
- Guarantee that identical financial circumstances produce the same results every time.

## 3. Product Management
**Theme**: Provide an approachable environment for a user to seamlessly conduct finances such as currency exchange.

**Associated Epic**: Development of a Secure and User-Friendly Finance Tracker

**Associated User Stories**:
- User Story: As a new user, I need secure access to manage my finances.
  - Task: Implement Secure Authentication
    - Ticket 1: Research and choose an appropriate OAuth library for Flask.
    - Ticket 2: Implement user authentication using the chosen OAuth library.
- User Story: As a frequent user, I want to view my financial data in different currencies for a global perspective.
  - Task: Integrate Currency Conversion Functionality
    - Ticket 1: Research and select a reliable currency conversion API.
    - Ticket 2: Implement functionality to convert and display financial data in different currencies.
