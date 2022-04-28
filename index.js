const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');

app.use(expressLayout);

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