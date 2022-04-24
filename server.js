// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));  //static files

//http://expressjs.com/en/starter/static-files.html
app.use(express.static('.'));

// Listen for requests
app.set("port", (process.env.PORT || 5000)); // sets the port to 5000
app.listen(app.get("port"), () => {
	console.log("Now listening for connection on port: " + app.get("port"));
});



//request defining stuff:
app.get('/', (req, res) => {
    res.render('../views/index.ejs');
});

app.get('/get-name', (req, res) => {
    res.send('Calvin Olson');
})

