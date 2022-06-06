const nodeMailer = require('../config/nodemailer');

exports.newPassword = (password) => {
    // console.log(password);
    let htmlform = nodeMailer.renderTemplate({password: password},'/password/new_reset_password.ejs');
    

    nodeMailer.transporter.sendMail({
        from: 'Codeial.in',
        // user populate in forgot password schema when i create
        to: password.user.email,
        subject: 'Reset Password!',
        html: htmlform
    }, (err,info)=> {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message Sent',info);
        return;
    });
}


