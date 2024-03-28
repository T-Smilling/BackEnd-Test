const Chat=require("../../models/chat.model");
const uploadToCloudinary=require("../../helper/cloudDinary");
module.exports=(res)=>{
  const userId=res.locals.user.id;
  const fullName=res.locals.user.fullName;
  //SocketIo
  _io.once('connection',(socket)=>{
    socket.on("CLIENT_SEND_MESSAGE", async (data) =>{
      const images = [];
      for (const image of data.images) {
        const link = await uploadToCloudinary(image);
        images.push(link);
      }
      //Save database
      const chat = new Chat({
        user_id:userId,
        content:data.content,
        images:images
      });
      await chat.save();
      //Return Data to Client
      _io.emit("SERVER_RETURN_MESSAGE" ,{
        userId: userId,
        fullName: fullName,
        content:data.content,
        images:images
      });
    });
    //TYPING
    socket.on("CLIENT_SEND_TYPING",(type) =>{
      socket.broadcast.emit("SERVER_RETURN_TYPING",{
        userId:userId,
        fullName:fullName,
        type:type
      });
    });
  });
  //End SocketIo
}