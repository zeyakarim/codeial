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
                    console.log(data);
                    // console.log($(newCommentForm));
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
                        ${comment.user.avatar ? 
                            `<p>
                                <img src="${comment.user.avatar}" alt="${comment.user.name}" width="30">
                            </p>`
                        : `<p>
                                <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="codeial-default-logo" width="30"> 
                            </p>`}
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
                    <div style="margin-left: 56px; font-size: 14px;"> 
                        <a class="toggle-like-button cmt-clr" data-likes="${comment.likes.length}" href="/likes/toggle/?id=${comment._id}&type=Comment">
                            <span>Like</span>
                        </a>
                        
                        <span class="comment-like" id="${comment._id}">
                            ${comment.likes.length ? 
                            `<i class="fa-solid fa-thumbs-up color"></i> ${comment.likes.length}`
                            : ''}
                        </span>
                        
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
        // console.log(i);
    }

    let deleteCommentbutton = $('.delete-comment-button');
    for (let i of deleteCommentbutton){
        deleteComment(i);
    }

}