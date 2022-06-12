
// {   
//     let newLIke = function(likeCreate){
//         // console.log(likeCreate);
        
//         $(likeCreate).click(function(e){
//             // console.log($(likeCreate));
//             // console.log($(likeCreate).prop('href'))
//             e.preventDefault();

//             $.ajax({
//                 method: 'post',
//                 url: $(likeCreate).prop('href'),
//                 success: function(data){
//                     console.log(data);
//                     // if like are already done then come here
//                     if(data.deleted == true){
//                         // store all like-comment-box in likeComment
//                         let likeComment = $('.like-comment-box');

//                         // run for loop of likeComment
//                         for (let i of likeComment){

//                             // store the all id in likeDecrement
//                             let likeDecrement =  $(i).attr('id');

//                             // check likeDecrement.id == data.likeable //data.likeable comes likes_contorller
//                             if (data.likeable == likeDecrement){
//                                 // if both are match then store the in countDecrease
//                                 let countDecrease = parseInt($(i).text());
//                                 countDecrease -= 1;

//                                 // change the html value inside i.html
//                                 $(i).html(`<p>
//                                                 <i class="fa-solid fa-thumbs-up"></i> ${countDecrease} 
//                                             </p>`);
//                             }
//                         }
//                         $(likeCreate).html(`<div class="like-button">
//                                                 <p>
//                                                     <i class="fa-solid fa-thumbs-up"></i> 
//                                                 </p>
//                                                 <p style="margin-left: 0;">
//                                                     Like
//                                                 </p>
//                                             </div>`);                       
//                     }else{
//                         // store all like-comment-box in likeComment
//                         let likeComment = $('.like-comment-box');

//                         // run for loop of likeComment
//                         for(let i of likeComment){

//                             // store the all id in likeDecrement 
//                             let likeIncrement =  $(i).attr('id');

//                             // check likeDecrement.id == data.likeable //data.likeable comes likes_contorller
//                             if (data.likeable == likeIncrement){
//                                 // if both are match then store the in countIncrease
//                                 let countIncrease = parseInt($(i).text());
//                                 countIncrease += 1;
//                                 // change the html value inside i.html
//                                 $(i).html(`<p>
//                                                 <i class="fa-solid fa-thumbs-up  color"></i> <span>${countIncrease} </span>
//                                             </p>`)
//                             }
//                         }
                        
//                         $(likeCreate).html(`<div class="like-button color">
//                                                 <p>
//                                                     <i class="fa-solid fa-thumbs-up"></i>
//                                                 </p>
//                                                 <p style="margin-left: 0;">
//                                                     Like
//                                                 </p>
//                                             </div>`);
//                     }
//                 },error: function(error){
//                     console.log(error.responseText);
//                 }
//             });
//         });

//     }

//     let likeButton = $('.like-button');

//     for (let i of likeButton){
//         // console.log(i);
//         newLIke(i);
//     }

    
// }

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
            // $(self).css('color','blue');

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                // let likesCount = parseInt($(self).attr('data-likes'));
                console.log(data);
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
                                countDecrease -= 1;

                                // change the html value inside i.html
                                $(i).html(`<p>
                                            <i class="fa-solid fa-thumbs-up color"></i> <span class="post-like">${countDecrease}</span>
                                        </p>`);
                            }
                        }
                        // likesCount -= 1;
                        $(self).css('color','gray');
                    }else{
                        // data type is comment
                        let commentLike = $('.comment-like');
                        // console.log(commentLike);
                        for (let i of commentLike){
                            // console.log($(i).attr('id'));
                            let commentLikeDecrement =$(i).attr('id');
                            // console.log(commentLikeDecrement);
                            if(commentLikeDecrement == data.likeable){

                                let countLikeDecrease = parseInt($(i).text());
                                console.log(countLikeDecrease);
                                countLikeDecrease -= 1;
                                $(i).html(`<span>
                                                <i class="fa-solid fa-thumbs-up color"></i> ${countLikeDecrease} 
                                        </span>`);
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
                                countIncrease += 1;

                                // change the html value inside i.html
                                $(i).html(`<p>
                                            <i class="fa-solid fa-thumbs-up color"></i> <span class="post-like"> ${countIncrease} </span>
                                        </p>`);
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
                                // console.log(countLikeDecrease);
                                countLikeIncrease += 1;
                                $(i).html(`<span>
                                                <i class="fa-solid fa-thumbs-up color"></i> ${countLikeIncrease} 
                                        </span>`);
                            }
                        }
                        $(self).css({color: 'midnightblue',fontWeight: '700'});
                    }
                    
                }

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}


