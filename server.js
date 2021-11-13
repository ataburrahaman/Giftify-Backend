require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo');;
const mongoose = require('mongoose');

const connectMongoDb = require('./connectDb/connectMongoDb');
const router = require('./src/Router/index')

const PORT = process.env.PORT || 3000;
//Middlewares



connectMongoDb();

app.use(bodyParser.json()); // handle json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


// let store = MongoStore.create({
// 	mongoUrl:  process.env.MONGODB_URL,
// 	autoRemove: 'interval',
//     autoRemoveInterval: 10
//  });

// app.use(session({
// 	secret: process.env.SECRET_KEY,
//     saveUninitialized: false, // don't create session until something stored
//     resave: false, //don't save session if unmodified
// 	store: store,
//     // mongooseConnection: mongoose.connection,
// 	// touchAfter: 24 * 3600,
// 	cookie: { maxAge: 1000 * 60 * 60 * 1 }
// }));

// mongoose.connect('mongodb://localhost:27017/testdev',{useNewUrlParser:true})
// var conn = mongoose.connection;

// conn.on('connected',()=>{
//     console.log('MongoDB connected')
// });

// conn.on('error',(err)=>{
//     if(err)
//     console.log(err)
// });

//use sessions for tracking logins
app.use(session({
  secret: process.env.SECRET_KEY,
  saveUninitialized: true, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: MongoStore.create({
	mongoUrl:  mongoose.connection._connectionString,
	//mongoUrl:  process.env.MONGODB_URL,
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 1, httpOnly: true, secure: false }
}));



app.use('/api', router);

app.listen(PORT, () => {
	console.log('Server running at port : ' + PORT);
});