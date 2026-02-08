require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
app.use(cors());


// Middleware to parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes/products'));
app.use('/', require('./routes/cartpost'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});