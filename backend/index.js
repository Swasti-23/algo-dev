const express = require('express');
const app = express();
const {DBConnection} = require('./database/db.js');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.js')
const problemRoutes = require('./routes/problemsList.js')
const cors = require('cors');

app.use(cors());
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

DBConnection();

app.use('/', authRoutes);
app.use('/problems', problemRoutes);
app.listen(8000, () => {
    console.log("Server is listening at port 8000");
});