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
                    addFriend.html('<button type="submit">Add Friend</button>')
                }else{
                    addFriend.html(`<button type="submit">Remove Friend</button>`)
                }
            },error: function(err){
                console.log(err);
            }
            
        })
    })
}