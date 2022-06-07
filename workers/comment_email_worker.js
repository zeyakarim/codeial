const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

// workers will take the task one by one and call newComment
queue.process('emails',function(job,done){
    // console.log('emails workers is processing a job',job.data);

    commentsMailer.newComment(job.data);

    done();
});
