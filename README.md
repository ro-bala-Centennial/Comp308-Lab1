▶️ How to Run the Application Locally
Prerequisites

Make sure the following are installed on your system:

Node.js (v18 or higher)

MongoDB (running locally)

npm (comes with Node.js)

1. Clone the Repository
git clone <your-repo-url>
cd <project-root>

2. Start MongoDB

Ensure MongoDB is running locally on the default port:

mongodb://127.0.0.1:27017


You can verify by running:

mongosh

3. Run the Backend (Server)
a. Navigate to the server folder
cd server

b. Install dependencies
npm install

c. Create environment variables

Create a .env file inside the server/ directory with the following content:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/comp308_lab1
JWT_SECRET=your_secret_key_here
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173

d. Seed the admin user (run once)
node seedAdmin.js


This creates the initial admin account:

Student Number: admin001
Password: Admin123!

e. Start the backend server
npm run dev


The server will run at:

http://localhost:5000

4. Run the Frontend (Client)
a. Open a new terminal and navigate to the client folder
cd client

b. Install dependencies
npm install

c. Start the React application
npm run dev


The frontend will run at:

http://localhost:5173

5. Using the Application

Login using the admin credentials provided by the seed script.

Admin users can:

Create students

Create courses

View students per course

Students can:

Log in

Enroll in courses

Update or drop courses
