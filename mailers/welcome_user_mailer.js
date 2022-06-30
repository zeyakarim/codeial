const nodeMailer =require('../config/nodemailer');

exports.newUser = (user) => {
    // console.log('Inside new post mailer',user);

    let htmlString = nodeMailer.renderTemplate({user: user},'/users/new_user.ejs');

    nodeMailer.transporter.sendMail({
        from: 'Codeial.in',
        to: user.email,
        subject: 'Welcome To Codeial!',
        html: htmlString
    },(err,info) => {
        if (err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message Sent',info);

        return;
    });
}