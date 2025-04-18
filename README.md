# PawsNearby

**PawsNearby** is a web application that connects pet owners with local caregivers for services such as boarding, sitting, walking, and daycare. The platform ensures ease of booking, transparency of caregiver profiles, and a streamlined experience for both pet owners and service providers.

---

## Overview

PawsNearby aims to simplify the process of finding reliable pet care by offering a dedicated digital space where users can search for caregivers based on location, availability, and service type. The system is designed to be user-friendly, scalable, and secure, catering to both pet owners and caregivers through distinct features and roles.

---

## Features

### User Roles

- **Pet Owners**: Can browse caregiver profiles, send service requests, manage pets, and receive notifications.
- **Caregivers**: Can register to offer services, receive and respond to requests, and manage their availability and profile.
- **Hybrid Support**: Users can act as both pet owner and caregiver with seamless role handling in the dashboard.

### Core Functionality

- **Authentication**: Secure user login using JSON Web Tokens and cookies.
- **Search & Filter**: Dynamic search bar with real-time location suggestions.
- **Caregiver Directory**: Filterable list of caregivers with profile previews and service details.
- **Profile Pages**: Individual pages for each caregiver with contact information, service offered, and reviews section.
- **Multi-step Booking Form**: Interactive modal form with validation, schedule input, and service type selection.
- **Dashboard Interface**:
  - Request management (sent and received)
  - Notification center
  - Pet profile management (add/edit pets)
- **Community Page**:
  - Users can view and create posts (image and text)
  - Feed of static and user-submitted updates

---

## Backend Stack

- **Node.js & Express.js**: RESTful API for user management, caregiver registration, request handling, and pet data.
- **PostgreSQL**: Relational database to manage users, pets, requests, and caregivers.
- **Authentication**: JWT-based user authentication with secure cookie handling.
- **Validation**: Input sanitization and backend validation for all forms and endpoints.

---

## Frontend Stack

- **React with Vite**: Component-based architecture for a responsive and modular UI.
- **React Router**: Client-side routing for multi-page navigation and dynamic profiles.
- **Plain CSS**: Custom styling for a lightweight and personalized design experience.

---


## Planned Improvements

- Ratings and reviews for caregivers
- Real-time chat between users
- Payment gateway integration
- Request calendar view
- Booking confirmation and status updates

---

## Project Status

PawsNearby is in active development. The MVP includes all essential features for user management, booking, and profile viewing. Further enhancements are underway to improve UX, data flow, and scalability.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Acknowledgements

Built as a full-stack academic project with focus on modular design, usability, and functional integration.