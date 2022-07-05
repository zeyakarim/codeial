// const { count } = require("../../models/user");

// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
        // console.log(this.toggler);
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                // let likesCount = parseInt($(self).attr('data-likes'));
                // console.log(data);
                if (data.deleted == true){
                    // store all like-comment-box in likeComment
                    if(data.type == 'Post'){
                        let likeComment = $('.like-comment-box');

                        // run for loop of likeComment
                        for (let i of likeComment){

                            // store the all id in likeDecrement
                            let likeDecrement =  $(i).attr('id');

                            // check likeDecrement.id == data.likeable //data.likeable comes likes_contorller
                            if (data.likeable == likeDecrement){

                                // if both are match then store the in countDecrease
                                let countDecrease = parseInt($(i).text());
                                // console.log(countDecrease);
                                if(countDecrease == 1){
                                    $(i).html('');
                                }
                                else{
                                    countDecrease -= 1;

                                    // change the html value inside i.html
                                    $(i).html(`<p style="margin: 13px 8px">
                                            <i class="fa-solid fa-thumbs-up color"></i> <span class="post-like">${countDecrease}</span>
                                        </p>`);
                                }
                                
                            }
                        }
                        // likesCount -= 1;
                        $(self).css('color','gray');
                    }else{
                        // data type is comment
                        let commentLike = $('.comment-like');
                        // console.log($(self));
                        // console.log(commentLike);
                        for (let i of commentLike){
                            // console.log($(i).attr('id'));
                            let commentLikeDecrement =$(i).attr('id');
                            // console.log(commentLikeDecrement);
                            if(commentLikeDecrement == data.likeable){

                                let countLikeDecrease = parseInt($(i).text());
                                // console.log(countLikeDecrease);
                                if(countLikeDecrease == 1){
                                    $(i).html('');
                                }
                                else{
                                    countLikeDecrease -= 1;
                                    $(i).html(`<span>
                                                    <i class="fa-solid fa-thumbs-up color"></i> ${countLikeDecrease} 
                                            </span>`);
                                }
                            }
                        }
                        $(self).css('color','gray');
                    }
                    
                    
                    
                }else{
                    // store all like-comment-box in likeComment
                    if(data.type == 'Post'){
                        let likeComment = $('.like-comment-box');

                        // run for loop of likeComment
                        for (let i of likeComment){

                            // store the all id in likeDecrement
                            let likeIncrement =  $(i).attr('id');

                            // check likeDecrement.id == data.likeable //data.likeable comes likes_contorller
                            if (data.likeable == likeIncrement){

                                // if both are match then store the in countDecrease
                                let countIncrease = parseInt($(i).text());

                                if(isNaN(countIncrease)){

                                    $(i).html(`<p style="margin: 13px 8px">
                                                    <i class="fa-solid fa-thumbs-up color"></i> <span class="post-like"> ${1} </span>
                                                </p>`)
                                }else{
                                    countIncrease += 1;

                                    // change the html value inside i.html
                                    $(i).html(`<p style="margin: 13px 8px">
                                            <i class="fa-solid fa-thumbs-up color"></i> <span class="post-like"> ${countIncrease} </span>
                                        </p>`);
                                }
                            }
                        }

                        $(self).css('color','midnightblue');
                    }else{
                        // data type is comment
                        let commentLike = $('.comment-like');

                        for (let i of commentLike){

                            // console.log($(i).attr('id'));
                            let commentLikeIncrement =$(i).attr('id');
   
                            if(commentLikeIncrement == data.likeable){  

                                let countLikeIncrease = parseInt($(i).text());
                                // console.log(countLikeIncrease);
                                if(isNaN(countLikeIncrease)){
                                    $(i).html(`<span>
                                        <i class="fa-solid fa-thumbs-up color"></i> ${1} 
                                    </span>`);
                                }else{
                                    countLikeIncrease += 1;
                                    $(i).html(`<span>
                                                <i class="fa-solid fa-thumbs-up color"></i> ${countLikeIncrease} 
                                        </span>`);
                                }
                            }
                        }
                        $(self).css({color: 'midnightblue',fontWeight: '700'});
                    }
                    
                }

            })
            .fail(function(errData) {
                console.log('error in completing the request',errData);
            });
            

        });
    }
}

// all button come inside showComment
let commentbtnloop = function(showComment){

    // add click event to all showComment button if any btn click
    $(showComment).click(function(comment){

        // only store one btn id which was click 
        let click = $(comment.currentTarget).attr('id');

        // let store the data toggle value
        let showhidebtn = $(comment.currentTarget).attr('data-toggles');
        // console.log(click);
        // console.log(showhidebtn);

        // let store all postComments div
        let postComments = $('.post-comments');

        // run for loop of all postComments div
        for(let post of postComments){

            // let store postComment div id
            let show = $(post).attr('id');
            
            // check postComment id and click button post id both are same
            if(show == click){
                // also check data-toggle value is false
                if(showhidebtn == 'false'){
                    // console.log(show);
                    // then show the postComment click div display block
                    $(post).css('display','block');
                    // set the data-toggles value to be true
                    $(comment.currentTarget).attr('data-toggles',true);
                }else{

                    // if data-toggle value is true then postComment click display none
                    $(post).css('display','none');
                    // set the data-toggles value to be false
                    $(comment.currentTarget).attr('data-toggles',false)
                }
            }
        }  
    });
}

// store the comment btn 
let commentbtn = $('.comment-btn');

// then run the for loop
for(let btn of commentbtn){
    // pass this btn and call this commentbtnloop
    commentbtnloop(btn);
}

