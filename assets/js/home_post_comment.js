{
    // method to submit the form data for new comment using AJAX
    let createComment = function(newCommentForm){

        $(newCommentForm).submit(function(e){

            // SUBMIT BUTTON DEFAULT BEHAVIOUR IS DISABLE
            e.preventDefault();
    
            // SO SUBMIT THE FORM USING AJAX
            $.ajax({
                type: 'POST',
                url: '/comments/create',
                // WE NEED TO SEND THE DATA,THAT WE ARE CREATING COMMENT
                data: $(newCommentForm).serialize(),
                success: function(data){
                    let newComment = newCommentDom(data.data.comment);
                    
                    // IT WILL APPEND THE COMMENT INSIDE THE POST 
                    $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                    deleteComment($(' .delete-comment-button',newComment));

                    new ToggleLike($('.toggle-like-button',newComment));


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

                    <div style="display: flex;">
                        <p>
                            <img src="${comment.user.avatar}" alt="${comment.user.name}" width="30">
                        </p>
                        <div class="comment-details">
                            <h4 style="margin: 0;">
                            ${comment.user.name}
                            </h4>
                            <p style="margin: 0;">
                            ${comment.content}
                            </p>
                        </div>

                        <div>
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">
                                    <p>X</p>
                                </a>
                            </small>

                        </div>
                    </div>
                    <a class="toggle-like-button" data-likes="${comment.likes.length}" href="/likes/toggle/?id=${comment._id}&type=Comment">
                        <span style="margin-left:56;">Like</span>
                    </a>
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
    
    let showComment = function(commentForm){
        // console.log(commentForm);
        $(commentForm).click(function(e){
            console.log($('.post-comments'));
            $('.post-comments').css('display','block');
        })
    }

    let newPostForm1 = $('.post_comments');
    for (let i of newPostForm1){
        createComment(i);
        // console.log(i);
    }

    let deleteCommentbutton = $('.delete-comment-button');
    for (let i of deleteCommentbutton){
        deleteComment(i);
    }

    let commentBtn = $('.comment-btn i');
    for (let i of commentBtn){
        // console.log(i);
        showComment(i);
    }
}