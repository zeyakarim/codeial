class ChatEngine{
    // This will take two arguments chatboxId,userEmail,userName,userId
    constructor(chatBoxId,userEmail,userName,userId){
        this.chatBox = (`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName = userName;
        this.userId = userId;
        //console.log(this);

        // then initiate the connection on which port socket.io server will run & call the chat_socket file connect subscriber & observer
        this.socket = io.connect('http://34.203.40.85:5000');

        // if userEmail exist then call the connectionHandler function
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        // if the connection is successfull then call this callback function
        this.socket.on('connect',function(){
            console.log('connection established using sockets...!');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log('a user joined!',data);
            });

        });

        $('#chat-message-input').keypress(function(e){
            if(e.keyCode == 13){
                let msg = $('#chat-message-input').val();

                if(msg != " "){
                    self.socket.emit('send_message', {
                        message: msg,
                        user_email : self.userEmail,
                        user_name: self.userName,
                        user_id : self.userId,
                        chatroom: 'codeial'
                    });
                }
            }
        });

        $('#send-message').click(function(){
            
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email : self.userEmail,
                    user_name: self.userName,
                    user_id : self.userId,
                    chatroom: 'codeial'
                });
            }
        });


        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';

            // user sent a message
            if(data.user_email == self.userEmail){
                messageType = 'self-message'
            }

            newMessage.append(`<div> 
                                    <span>${data.message}</span>
                                    <p style="margin: 4px; color: gray; font-size: 13px;">
                                        <small>${data.user_name}</small>
                                    </p>
                                </div>`);

            // newMessage.append($('<sub>',{
            //     'html': data.user_email
            // }));

            // add class
            newMessage.addClass(messageType);

            // Finally i append it
            $('#chat-message-list').append(newMessage);
        });


        $('#hide-chatbox').click(function(){
            $('#user-chat-box').css('display','none');
            $('#hide-chatbox').css('display', 'none');
            $('#show-chatbox').css({
                display: 'block',
                zIndex: '1'
            });
        });

        $('#show-chatbox').click(function(){
            $('#show-chatbox').css('display','none');
            $('#user-chat-box').css('display', 'block');
            $('#hide-chatbox').css('display', 'block'); 
        })
    }

   
}