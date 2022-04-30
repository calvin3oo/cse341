//allows to use environment variables in .env file
require('dotenv').config()

// express framework
const express = require('express');
const app = express();

//mongo connection
// const mongo = require('./controllers/mongo.js');
// mongo.connectToMongoDB().catch(console.error);


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));  //static files

//http://expressjs.com/en/starter/static-files.html
app.use(express.static('.'));

// Listen for requests
app.set("port", process.env.PORT ); 
app.listen(app.get("port"), () => {
	console.log("Now listening for connection on port: " + app.get("port"));
});



//ROUTES
app.use('/contacts', require('./routes/contacts.js'));


app.get('/', (req, res) => {
    res.render('../views/index.ejs');
});

app.get('/get-name', (req, res) => {
    res.send('Calvin Olson');
})

