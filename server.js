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
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
