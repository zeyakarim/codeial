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
                    // console.log(data);
                    // console.log($('#new-post-form .inputfield').val(''));
                    // set input value to empty
                    $('#new-post-form .inputfield').val('');

                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-controller>ul').prepend(newPost);

                    // THIS .delete-post-button INSIDE newPost
                    deletePost($(' .delete-post-button',newPost));

                    DeleteMenu($('.menu-button',newPost));

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
                        <div style="display: flex; justify-content: space-between;">
                            <div class="dlt-btn-cntnr" style ="display: flex;">
                                ${post.user.avatar ? 
                                    `<img src="${ post.user.avatar}" alt="${post.user.name}" width="40"></img>`
                                : '<img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="codeial-default-logo" width="40">'}
                                
                                <h4 style='margin: 13px 8px 0px;'>${ post.user.name }</h4>
                            </div>

                            <div class='add-menu'>
                                <div class="menu" id="${post._id}" style="display: none;">
                                    <ul>
                                        <li>
                                            <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                
                                <div class="menu-button" id="${post._id}" data-toggles="false">
                                    <i class="fa-solid fa-ellipsis-h"></i>
                                </div>
                            </div>
                        </div>

                        <p>${ post.content }</p>
                    </div>
                    
                    ${post.postAvatar ?
                        `<p style="width: 100%; margin: 0;">
                            <img src="${ post.postAvatar }" alt="${ post.name}" width="100%">
                        </p>`
                    : ''}
                   
                    
                    <div class="like-comment-box" id="${post._id}">
                        ${post.likes.length ? 
                            `<p>
                                ${post.likes.length} Likes
                            </p>`
                        : ''}
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

    // ADD SIDE MENU FOR DELETE
    let DeleteMenu = function(deletebtn){

        // ADD CLICK EVENT ON MENU
        $(deletebtn).click(function(btn){
            
            // LETS STORE THE TARGET BUTTON ID
            let delBut = $(btn.currentTarget).attr('id');

            // LETS STORE THE TARGET BUTTON data-toggles VALUES
            let dataToggles = $(btn.currentTarget).attr('data-toggles');

            // LET STORE THE ALL MENU
            let menuBtn = $('.menu');

            // RUN FOR LOOP IN MENUBUTTON
            for (let i of menuBtn){

                // LET ONE BY ONE STOE BUTTON ID
                let button = $(i).attr('id');

                // CHECK CLICK BUTTON AND MENUBUTTON ID BOTH ARE SAME
                if(delBut == button){

                    // ALSO CHECK data-toggles VALUES IS FALSE
                    if(dataToggles == 'false'){

                        // SHOWING THE MENU
                        $(i).css('display','block');

                        // SET THE data-toggles VALUES TO BE TRUE
                        $(btn.currentTarget).attr('data-toggles',true);
                    }else{
                        // IF data-toggles VALUE IS TRUE THEN DISPLAY NONE
                        $(i).css('display','none');

                        // SET THE data-toggles VALUES IS TO BE FALSE
                        $(btn.currentTarget).attr('data-toggles',false);
                    }
                }
            }
            
        });
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
    
    let newDeletePostButton = $('.menu-button');
    for(let i of newDeletePostButton){
        // console.log($(i).html());
        DeleteMenu(i);
    }

    // call this function
    createPost();
}