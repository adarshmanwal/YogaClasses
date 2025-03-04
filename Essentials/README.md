# Yoga Classes Front-End

Welcome to the Yoga Classes Front-End project! This repository contains the front-end code for the Yoga Classes application.

## Introduction

The Yoga Classes Front-End is a web application that allows users to browse and book yoga classes. It provides an intuitive and user-friendly interface for managing yoga class schedules and bookings.

## Features

- Browse available yoga classes
- View class details and instructor information
- Book and cancel classes
- User authentication and profile management
- Responsive design for mobile and desktop

## Installation

To get started with the Yoga Classes Front-End, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/yoga-classes-front-end.git
    ```
2. Navigate to the project directory:
    ```bash
    cd yoga-classes-front-end
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

To run the application locally, use the following command:
```bash
npm start
```

This will start the development server and you can view the application in your browser at `http://localhost:3000`.

# 🧘 Yoga Classes Website - Requirements  

## 📌 1. User & Role Management  
- [ ] Admin Dashboard → A super admin can manage all users and shops.  
- [ ] Profile Management → Users can update their profile picture, bio, and preferences.  
- [ ] User Reviews & Ratings → Customers can rate the yoga studio and leave reviews.  

---

## 🏪 2. Shop Features  
- [ ] Multiple Instructors per Shop → ShopOwners can add yoga instructors to manage classes.  
- [ ] Yoga Styles & Categories → Shops can specify yoga styles they offer (e.g., Hatha, Vinyasa, Power Yoga).  
- [ ] Shop Subscription Plans → ShopOwners can create membership plans for customers.  

---

## 👥 3. Customer Features  
- [ ] Customer Progress Tracker → Track yoga progress (e.g., number of classes attended).  
- [ ] Wishlist & Favorites → Customers can bookmark favorite yoga classes.  
- [ ] Class Feedback → Customers can provide feedback on attended sessions.  

---

## 📅 4. Yoga Class Scheduling & Booking  
- [ ] Live Class Scheduling → ShopOwners can schedule online Zoom/Google Meet classes.  
- [ ] Booking System → Customers can book yoga classes in advance.  
- [ ] Class Reminders → Email/SMS reminders for upcoming classes.  
- [ ] Waitlist System → If a class is full, customers can join a waitlist.  

---

## 💳 5. Payment & Subscription Plans  
- [ ] Stripe/PayPal Integration → Allow customers to buy memberships or pay per class.  
- [ ] Discount Coupons & Offers → ShopOwners can create promotional discounts.  
- [ ] Wallet System → Customers can pre-load a wallet balance to book classes easily.  

---

## 📊 7. Analytics & Reports  
- [ ] Shop Dashboard → ShopOwners get analytics like number of members, revenue, and class attendance.  
- [ ] Customer Dashboard → Customers see total classes attended & progress reports.  
- [ ] Automated Reports → Weekly/monthly insights sent via email.  

---


## Contributing

We welcome contributions to the Yoga Classes Front-End project! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.


##Things to achive

###EC2 instance
Start the EC2 instance from AWS EC2 and make sure the port 22 is active with custom config
then go to the action runner and run the following command 
./run.sh

OR to create the action instance follow the command provided in git hub action section 





###OBSERVATIONS 

ERROR : permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post "http://%2Fvar%2Frun%2Fdocker.sock/v1.45/images/create?fromImage=adarshmanwal9%2Fyoga-frontend&tag=latest": dial unix /var/run/docker.sock: connect: permission denied

SOlution  : run the following command in EC2 instance to give the permession of docker 
sudo chmod 666 /var/run/docker.sock


