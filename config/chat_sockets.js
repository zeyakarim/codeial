const MessageSchema = require('../models/user_message');
const User = require('../models/user');

// we will receive the chatServer over here
module.exports.chatSockets = async function(socketServer){

    let io = require('socket.io')(socketServer,{
        cors: {
          origin: '*',
        }
    });

    // in chat_engine file when user says io.connect it will come here and connect to user if connection is successfull then go back chat_engine file and call connectionHandler function
    io.sockets.on('connection', function(socket){
        console.log('new Connection received', socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnected...!')
        });

        socket.on('join_room',function(data){
            console.log('joining request receive', data);

            socket.join(data.chatroom);
           
            io.in(data.chatroom).emit('user_joined',data);
        });
        
        // CHANGE:: detect send_message and broadcast to everyone in the room
        socket.on('send_message', async function(data){
            let msg = await MessageSchema.create({
                message: data.message,
                user: data.user_id
            });
            // console.log(msg)
           
            let user = await User.findById(msg.user);

            user.messages.push(msg);
            user.save();

            io.in(data.chatroom).emit('receive_message',data);
        });
    });
}