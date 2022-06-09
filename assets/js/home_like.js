
{
    let newLIke = function(likeCreate){
        // console.log(likeCreate);
        $(likeCreate).click(function(e){
            // console.log($(likeCreate));
            // console.log($(likeCreate).prop('href'))
            e.preventDefault();

            $.ajax({
                method: 'POST',
                url: $(likeCreate).prop('href'),
                // data: $(likeCreate).serialize(),
                success: function(data){
                    console.log(data);
                    if(data.deleted == true){
                        let countDecrease = parseInt($(likeCreate).text());
                        countDecrease -= 1
                        $(likeCreate).html(`<div>
                                                <p style="padding: 10px 0px; border-bottom: 1px solid gray; border-top: 1px solid gray;">
                                                    <i class="fa-solid fa-thumbs-up"></i>
                                                </p>
                                                <p>${countDecrease} Likes</p>
                                            </div>`);
                        // console.log(countDecrease);
                        
                    }else{
                        let countIncrease = parseInt($(likeCreate).text());
                        countIncrease += 1
                        $(likeCreate).html(`<div>
                                                <p style="padding: 10px 0px; border-bottom: 1px solid gray; border-top: 1px solid gray;">
                                                    <i class="fa-solid fa-thumbs-up"></i>
                                                </p>
                                                
                                                <p>${countIncrease} Likes</p>
                                            </div>`);
                    }
                }
            })
        })

    }

    let likeButton = $('.like-button');

    for (let i of likeButton){
        // console.log(i);
        newLIke(i);
    }
}
