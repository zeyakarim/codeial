{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        $('#new-post-form').submit(function(e) {
            e.preventDefault(); 
            // because i will create new formData that's why i write [0] it gives first form
            let form = $('#new-post-form')[0];

            // pass this previous form inside this new FormData object this will contain all data
            let formData = new FormData(form);
        
            $.ajax({
                url: '/posts/create',
                method: 'POST',
                data: formData,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    console.log(data);
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

                    // $('#new-post-form').val() = '';
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });

    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li class="post-container" id="post-${post._id}" style="margin: 10px 0px; padding: 0px;">
                    <div style="padding:5px 18px;">
                        <div class="dlt-btn-cntnr" style ="display: flex;">
                            <img src="${ post.user.avatar}" alt="${post.user.name}" width="40">
                            
                            <h4>${ post.user.name }</h4>
                            <small style="margin-top: 14px;">
                                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                            </small>
                        </div>
                        <p>${ post.content }</p>
                    </div>
                    
                    ${post.postAvatar ?
                        `<p style="width: 100%; margin: 0;">
                            <img src="${ post.postAvatar }" alt="${ post.name}" width="100%">
                        </p>`
                    : ''}
                   
                    
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
                        
                        <p class="comment-btn" id="${ post._id }" data-toggles="false">
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