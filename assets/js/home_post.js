{
    // method to submit the form data for new post using AJAX
    let createPost = function(){

        // FETCH THE POST FORM USING ID
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){

            // SUBMIT BUTTON DEFAULT BEHAVIOUR IS DISABLE
            e.preventDefault();

            // SO SUBMIT THE FORM USING AJAX
            $.ajax({
                type: 'POST',
                url: '/posts/create',

                // WE NEED TO SEND THE DATA,THAT WE ARE CREATING POST AND CONVERT INTO JSON FORMAT
                data: newPostForm.serialize(),

                // if data is successfully send and after that take response from controller & then print the data
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-controller>ul').prepend(newPost);

                    // THIS .delete-post-button INSIDE newPost
                    deletePost($(' .delete-post-button',newPost));

                    new ToggleLike($('.toggle-like-button',newPost));
                    
                    // THEN SHOW THE FLATTY MESSAGE
                    new Noty({
                        theme: 'relax',
                        text: 'Post is Published',
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

    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li class="post-container" id="post-${post._id}" style="margin: 10px 0px;">
                    <div class="dlt-btn-cntnr" style ="display: flex;">
                        <img src="${ post.user.avatar}" alt="${post.user.name}" width="40">
                        <p>${ post.user.name }</p>
                        <small style="margin-top: 14px;">
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                        </small>
                    </div>
                    <p>${ post.content }</p>
                    <div class="like-comment-box" id="${post._id}">
                        <p>
                            ${post.likes.length} Likes
                        </p>
                    </div>

                    <div class="border-lk-cmt">
                      
                        <a class="toggle-like-button" data-likes="${post.likes.length}" href="/likes/toggle/?id=${post._id}&type=Post">
                            <p>
                                <i class="fa-solid fa-thumbs-up"></i>
                            </p>
                            <p style="margin-left: 0;">
                                Likes
                            </p>
                        </a>

                        <p>
                            <i class="fa-solid fa-comment"></i>
                        </p> 
                    </div>     
                    

                    <div class="post-comments">
                        <div style="display: flex;">
                            <div class="img-container">
                                <img src="${post.user.avatar}" alt="${post.user.name}" width="30">
                            </div>
                            <div class="comments-form">
                                <form action="/comments/create" method="POST" id="post-${ post._id }-comments-form">
                                    <input type="text" name="content" placeholder="Type here to add comment..." required>
                                    <input type="hidden" name="post" value="${post._id}">
                                    <input type="submit" value="Comment">
                                </form> 
                            </div>
                        </div>
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                
                            </ul>
                
                        </div>
                    </div> 

                </li>`);
    }

    

    // METHOD TO DELETE A POST FROM DOM
    let deletePost = function(deleteLink){

        // WHEN THIS DELETELINK IS CLICKED THEN THIS FUNCTION IS CALLED
        $(deleteLink).click(function(e){
            e.preventDefault();

            // DELETE  A POST USING AJAX
            $.ajax({
                type: 'get',
                // THIS IS HOW YOU GET THE VALUE OF THE href INSIDE <a> TAG
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                    
                    new Noty({
                        theme: 'relax',
                        text: 'Post and associated comments deleted',
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

    // method to iterate over all post  delete button
    let deletePostButton =$('.delete-post-button');
    for(let i of deletePostButton){
        deletePost(i);
    }
    
    // call this function
    createPost();
}