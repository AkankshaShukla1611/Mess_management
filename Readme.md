# Mess Management System – Backend

## Overview
A role-based backend system for managing mess menus, complaints, and feedback.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Render (Deployment)

## Features
- User authentication (Admin / Student)
- Role-based authorization
- Daily menu management
- Complaint management system
- Feedback system
- Admin dashboard APIs

## API Endpoints
### Auth
- POST /api/auth/signup
- POST /api/auth/login

### Menu
- POST /api/menu (Admin)
- GET /api/menu?date=YYYY-MM-DD

### Complaints
- POST /api/complaints
- GET /api/complaints/my
- GET /api/complaints (Admin)
- GET /api/complaints/summary (Admin)

### Feedback
- POST /api/feedback
- GET /api/feedback (Admin)

## Deployment
Backend deployed on Render:
https://mess-management-rsh0.onrender.com
