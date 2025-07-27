# 🗄️ MongoDB Atlas Setup Guide

## Quick Setup for QuickClinic Backend

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project called "QuickClinic"

### 2. Create Database Cluster
1. Click **"Build a Database"**
2. Choose **"FREE"** tier (M0)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region close to you
5. Click **"Create"**

### 3. Set Up Database Access
1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Create a username and password (save these!)
5. Set privileges to **"Read and write to any database"**
6. Click **"Add User"**

### 4. Set Up Network Access
1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. For development: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. For production: Add specific IP addresses
5. Click **"Confirm"**

### 5. Get Connection String
1. Go back to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string

### 6. Create .env File
Create a `.env` file in your backend directory with:

```env
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/quickclinic
JWT_SECRET=your_super_secret_jwt_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=5000
NODE_ENV=development
```

**Replace:**
- `your_username` with your MongoDB Atlas username
- `your_password` with your MongoDB Atlas password
- `your_cluster` with your actual cluster name

### 7. Test Connection
Run your server:
```bash
npm start
```

You should see: `✅ MongoDB connected successfully`

### 8. For Render Deployment
When deploying to Render, set these environment variables:
- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secure random string
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app password
- `NODE_ENV`: production

## Troubleshooting

### Connection Refused Error
- Make sure MongoDB Atlas cluster is running
- Check if IP address is whitelisted
- Verify username and password are correct
- Ensure connection string format is correct

### Authentication Error
- Double-check username and password
- Make sure user has proper permissions
- Verify database name in connection string

### Network Error
- Check if your IP is whitelisted in Network Access
- Try "Allow Access from Anywhere" for testing
- Verify firewall settings 