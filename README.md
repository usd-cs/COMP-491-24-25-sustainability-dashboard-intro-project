# Sustainability Dashboard

## **Project Overview**
A Vue.js-based web application that integrates a backend built with Node.js and Express to provide a user authentication system. The project includes login functionality, dynamic routing, and a frontend designed for seamless user interactions. The backend connects to a PostgreSQL database to manage user data and authentication, ensuring secure and efficient access. Designed to support a sustainability-focused dashboard for energy data visualization and reporting.

---

## **Software Requirements**

### **Backend Requirements**
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Express.js](https://expressjs.com/) (v4 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- [PM2](https://pm2.keymetrics.io/) (optional, for process management)

### **Frontend Requirements**
- [Vue.js](https://vuejs.org/) (v3 or higher)
- [Vite](https://vitejs.dev/) (v4 or higher)

### **Package Manager**
- [npm](https://www.npmjs.com/) (bundled with Node.js) or [yarn](https://yarnpkg.com/) (optional)

### **Development Tools**
- A modern code editor like [Visual Studio Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/) (optional, for API testing) 

---

## **Environment Configuration**
Ensure you have the following environment variables configured:

1. **PostgreSQL Database Connection:**
   - `DB_USER` - PostgreSQL username
   - `DB_PASSWORD` - PostgreSQL password
   - `DB_HOST` - PostgreSQL host
   - `DB_PORT` - PostgreSQL port (default: 5432)
   - `DB_NAME` - PostgreSQL database name

2. **Backend API URL:**
   - `API_URL` - The base URL for the backend API (default: `http://localhost:3000`)

---

## **How to Run**
1. Clone the repository.
2. Install dependencies for both frontend and backend:
   ```bash
   # Navigate to the backend folder
   cd backend
   npm install

   # Navigate to the frontend folder
   cd ../frontend
   npm install
