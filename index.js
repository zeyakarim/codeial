const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const User = require('./models/user')

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayout);

//extract style and script from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//use middleware and go express router folder
app.use('/',require('./routes'));

// set up view engine
app.set('view engine', 'ejs');
app.set('views','./views');



app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }
    console.log(`Server is running on port: ${port}`);
});