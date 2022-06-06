const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'zeyakarim79',
        pass: 'dkzwyceuxompmcqp'
    }
});


// next step we define template
let renderTemplate = (data,relativePath) => {
    // console.log(data);
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template',err);
                return;
            }
            mailHTML = template
        }
    )
    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate: renderTemplate
}

