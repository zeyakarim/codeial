const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');
const postMailer = require('../mailers/posts_mailer');

// workers will take the task one by one and call newComment
queue.process('emails',function(job,done){
    // console.log('emails workers is processing a job',job.data);

    commentsMailer.newComment(job.data);

    done();
});

// workers will take the task one by one and call newPost
queue.process('posts',function(job, done){
    console.log('posts workers is processing a job',job.data);
    
    postMailer.newPost(job.data);

    done();
})
