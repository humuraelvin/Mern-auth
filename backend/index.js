require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./dbconn');
const userRoutes = require('./routes/users.js');
const authRoutes = require('./routes/auth.js');

connection();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 4040;

app.listen(port, () => console.log(`App Listening on PORT ${port}...`));

