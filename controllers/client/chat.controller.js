const Chat=require("../../models/chat.model");
const User=require("../../models/user.model");

const chatSocket=require("../../socket/client/chat.socket");
//[GET] /chat
module.exports.index=async (req,res) =>{

  chatSocket(res);

  // Give Data
  const chats=await Chat.find({
    deleted:false
  });
  for (const chat of chats) {
    const infoUser=await User.findOne({
      _id: chat.user_id
    }).select("fullName");
    chat.infoUser=infoUser;
  }
  //End give Data
  res.render("client/pages/chat/index",{
    pageTitle:"Chat",
    chats:chats
  });
}