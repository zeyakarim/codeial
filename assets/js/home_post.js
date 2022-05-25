{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){

            // SUBMIT BUTTON DEFAULT BEHAVIOUR IS DISABLE
            e.preventDefault();

            // SO SUBMIT THE FORM USING AJAX
            $.ajax({
                type: 'POST',
                url: '/posts/create',
                // WE NEED TO SEND THE DATA,THAT WE ARE CREATING POST
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-controller>ul').prepend(newPost);

                    // THIS .delete-post-button INSIDE newPost
                    deletePost($(' .delete-post-button',newPost));


                    // console.log(data);
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
        return $(`<li id="post-${post._id}">
                    <p>
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                        </small>

                        ${ post.content }
                        <br>
                        <small>
                            ${ post.user.name }
                        </small>
                    </p>

                    <div class="post-comments">
                        <form action="/comments/create" method="POST" id="post-${ post._id }-comments-form">
                            <input type="text" name="content" placeholder="Type here to add comment..." required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                        </form> 
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                
                            </ul>
                
                        </div>
                    </div> 

                </li>`)
    }

    

    // METHOD TO DELETE A POST FROM DOM
    let deletePost = function(deleteLink){

        // WHEN THIS DELETELINK IS CLICKED THEN THIS FUNCTION IS CALLED
        $(deleteLink).click(function(e){
            e.preventDefault();

            // DELETE USING AJAX
            $.ajax({
                type: 'get',
                // THIS IS HOW YOU GET THE VALUE OF THE href INSIDE <a> TAG
                url: $(deleteLink).prop('href'),
                success: function(data){
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
            })
        })
    }
     // method to iterate over all post  delete button
    let iterate_post=function(){
        var loop=$(' .delete-post-button');
        for(i of loop){
            deletePost(i);
        }
    }
    // call this function
    createPost();
    iterate_post();

}