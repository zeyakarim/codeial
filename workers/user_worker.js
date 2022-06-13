const queue = require('../config/kue');

const welcomeUserMailer = require('../mailers/welcome_user_mailer');

queue.process('newuser',function(job,done){

    console.log('new user detail', job.data);

    welcomeUserMailer.newUser(job.data);

    done();
})

