{
    let addFriend = $('.add-friend-btn');

    addFriend.click(function(e){
        e.preventDefault();
        // console.log(addFriend.attr('href'))
        // console.log(addFriend.html())

        $.ajax({
            method: 'POST',
            url: addFriend.attr('href'),
            success: function(data){
                if (data.request == true){
                    addFriend.html('<i class="fa-solid fa-user-plus"><button type="submit">Add Friend</button></i>')
                }else{
                    addFriend.html(`<i class="fa-solid fa-user-xmark"><button type="submit">Remove Friend</button></i>`)
                }
            },error: function(err){
                console.log(err);
            }
            
        })
    })
}