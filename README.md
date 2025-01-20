## Doctor Appointment Booking System

Project Overview
The Doctor Appointment Booking System is a web application designed to streamline the process of booking, managing, and tracking appointments between doctors and patients. The platform offers separate interfaces for administrators, doctors, and patients, ensuring efficient and user-friendly interactions.

# Key Features

For Patients:
User Registration and Login: Patients can sign up and securely log in using JWT-based authentication.

Browse Doctors: View a directory of available doctors, including their specialization, experience, and availability.

Book Appointments: Easily schedule appointments by selecting a preferred doctor, date, and time.

Appointment Status: Track the status of your appointments (e.g., Pending, Approved, Completed).

Profile Management: Update personal details, view appointment history, and manage account settings.

For Doctors:
Doctor Dashboard: View and manage appointments in a streamlined interface.
Set Availability: Configure available slots for patient appointments.

Manage Appointments: Approve, reschedule, or cancel appointments.

Patient Interaction: View patient details and provide consultation notes.

For Admin:
Admin Panel: Oversee and manage the entire system, including users and appointments.

User Management: Approve or block users (doctors/patients) as needed.
Doctor Onboarding: Verify and approve new doctor registrations.

System Analytics: Monitor platform usage with statistical insights.

# Technologies Used

Backend:
Node.js: Server-side runtime for handling API requests.
Express.js: Backend framework for building RESTful APIs.
MongoDB: Database for storing users, doctors, and appointment data.
Mongoose: ORM for MongoDB to simplify database interactions.

Frontend:
React.js: For building the user interface.
Redux: For state management across components.
Tailwind CSS: For responsive and modern UI styling.
Middleware & Other Tools:
JWT Authentication: Secure login and token-based authentication.
Morgan: HTTP request logger for debugging.
dotenv: Manage environment variables securely.
Development Tools:
Concurrently: To run the frontend and backend servers simultaneously during development.
Axios: For making HTTP requests from the frontend to the backend.
Installation
Clone the repository:

git clone https://github.com/vikasdhyani72/doctor-appointment.git

Configure environment variables in the .env file (e.g., MONGO_URI, JWT_SECRET, PORT).

Run the application using Concurrently:
npm run dev

Build the frontend:

cd client
npm run build

Deploy the backend and serve the frontend's static files using Node.js and Express.
