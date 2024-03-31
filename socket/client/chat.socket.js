const Chat=require("../../models/chat.model");
const uploadToCloudinary=require("../../helper/cloudDinary");
module.exports=(req,res)=>{
  const userId=res.locals.user.id;
  const fullName=res.locals.user.fullName;
  const roomChatId=req.params.roomChatId;
  //SocketIo
  _io.once('connection',(socket)=>{
    socket.on("CLIENT_SEND_MESSAGE", async (data) =>{
      socket.join(roomChatId);
      const images = [];
      for (const image of data.images) {
        const link = await uploadToCloudinary(image);
        images.push(link);
      }
      //Save database
      const chat = new Chat({
        user_id:userId,
        room_chat_id:roomChatId,
        content:data.content,
        images:images
      });
      await chat.save();
      //Return Data to Client
      _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE" ,{
        userId: userId,
        fullName: fullName,
        content:data.content,
        images:images
      });
    });
    //TYPING
    socket.on("CLIENT_SEND_TYPING",(type) =>{
      socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING",{
        userId:userId,
        fullName:fullName,
        type:type
      });
    });
  });
  //End SocketIo
}