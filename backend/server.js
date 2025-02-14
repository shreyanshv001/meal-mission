require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const donorRoutes = require("./routes/donorRoutes.js");
const ngoRoutes = require("./routes/ngoRoutes.js");
const authMiddleware = require("./middlewares/authMiddleware.js");
const path = require("path");

const app = express();
connectDB();

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/donors", donorRoutes);
app.use("/api/ngo", ngoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
