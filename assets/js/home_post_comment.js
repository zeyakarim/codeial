{
    // method to submit the form data for new post using AJAX
    let createComment = function(newCommentForm){

        $(newCommentForm).submit(function(e){

            // SUBMIT BUTTON DEFAULT BEHAVIOUR IS DISABLE
            e.preventDefault();
    
            // SO SUBMIT THE FORM USING AJAX
            $.ajax({
                type: 'POST',
                url: '/comments/create',
                // WE NEED TO SEND THE DATA,THAT WE ARE CREATING POST
                data: $(newCommentForm).serialize(),
                success: function(data){
                    let newComment = newCommentDom(data.data.comment);
                    
                    // IT WILL APPEND THE COMMENT INSIDE THE POST 
                    $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                    deleteComment($(' .delete-comment-button',newComment));

                    new Noty({
                        theme: 'relax',
                        text: 'Comment Published',
                        type: 'success',
                        layout: 'topRight',
                        timeout: '1500'  
                    }).show();

                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });

    }

    let newCommentDom = function(comment){
        
        return $(`<li id="comment-${comment._id}">
                    <small>
                        <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                    </small>


                    <div>
                        <h4 style="margin: 0;">
                        ${comment.user.name}
                        </h4>
                        <p style="margin: 0;">
                        ${comment.content}
                        </p>
                    </div>
                </li>`);
    }
        



    let deleteComment = function(deleteLink){
        // console.log($(deleteLink));
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){

                    // IT WILL REMOVE COMMENT WITH LI
                    $(`#comment-${data.data.comment_Id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: 'Comment Deleted',
                        type : 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
       

    let newPostForm1 = $('.post_comments');
    for (let i of newPostForm1){
        createComment(i);
    }

    let deleteCommentbutton = $('.delete-comment-button');
    for (let i of deleteCommentbutton){
        deleteComment(i);
    }
}