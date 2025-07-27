const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");



dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "QuickClinic Backend API", 
    status: "running",
    timestamp: new Date().toISOString()
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/records", require("./routes/record"));
// ✅ Route Registration
app.use('/api/users', require('./routes/user'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/chat', require('./routes/chat')); // ✅ THIS is the missing one!

// ✅ MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quickclinic';

if (!process.env.MONGO_URI) {
  console.warn("⚠️  No MONGO_URI found in environment variables. Using local MongoDB.");
  console.warn("💡 For production, set MONGO_URI to your MongoDB Atlas connection string.");
}

// MongoDB connection options
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

mongoose.connect(mongoURI, mongoOptions)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("💡 Connection string format should be:");
    console.error("   mongodb+srv://username:password@cluster.mongodb.net/database");
    console.error("💡 Make sure to:");
    console.error("   1. Replace special characters in password with URL encoding");
    console.error("   2. Use the correct cluster name");
    console.error("   3. Check if your IP is whitelisted in MongoDB Atlas");
    console.error("   4. Verify username and password are correct");
    process.exit(1);
  });

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
