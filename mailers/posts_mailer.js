const nodeMailer =require('../config/nodemailer');

exports.newPost = (post) => {
    // console.log('Inside new post mailer',post);

    let htmlString = nodeMailer.renderTemplate({post: post},'/posts/new_post.ejs');

    nodeMailer.transporter.sendMail({
        from: 'Codeial.in',
        to: post.user.email,
        subject: 'New Post Published!',
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