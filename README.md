## Overview
The frontend of the Personal Finance Manager is built with React and uses React Router for navigation. The application allows users to manage their finances efficiently by setting budgets, tracking expenses, and viewing recent transactions.Recently, major backend additions and frontend improvements were made.

## Frontend Enhancements
  - Transaction Form
    - Users can create ,update and delete transactions seamlessly.
    - Form now pre-fills data when editing transactions.
    - Added input validation for a better experience.
  - Transaction Management
    - Edit & Delete functionality for transactions.
    - UI dynamically updates after any change.
    - Color-coded transaction types:
       - Credit → Green border
       - Expense → Red border

## Backend Updates
  - Budget & Transaction APIs
    - REST APIs created for budgets & transactions.
    - Supports full CRUD operations.
    - Optimized API structure for better performance.

  - Real-Time Updates
    - Socket.io integration for instant transaction updates.
    - Ensures live data synchronization across users.

  - Authentication - In Progress
    - User authentication is being implemented using JWT and bcrpyt.
    - Enhancing data security & access control.

## Current Features:
 *  User Authentication: Login and Registration pages are implemented.
 *  Dashboard: Users can define a budget, create expenses, and view recent expenses.
 *  Routing: Navigation is handled using react-router-dom.

## Upcoming Enhancements:
 - Adding UI improvements and interactive elements.
 - Enhancing the dashboard with better insights and analytics.
 - More features for managing budgets efficiently.

![Screenshot 2025-02-24 070632](https://github.com/user-attachments/assets/05ae79bf-4c9a-492b-83d7-a5ee108a8c1e)

Create Transaction and select category from budgets we created.
 
![Screenshot 2025-03-02 174700](https://github.com/user-attachments/assets/ac314db1-2b89-4373-ba20-9e0253c76a07)

Recent Transactions

![Screenshot 2025-03-02 174847](https://github.com/user-attachments/assets/89e54139-dc91-40b0-954e-1b1651aeece6)

Edit/Update Transaction

![Screenshot 2025-03-02 174921](https://github.com/user-attachments/assets/df5e145b-949e-4ef0-b319-5cbac5d9025b)

Transaction Updated

![Screenshot 2025-03-02 174931](https://github.com/user-attachments/assets/b3d9960a-13ab-4b8a-894a-228561c883a2)






