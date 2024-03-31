const User=require("../../models/user.model");
const RoomChat=require("../../models/roomChat.model");

//[GET] /rooms-chat
module.exports.index=async(req,res) =>{
  const userId=res.locals.user.id;
  const listRoomChat=await RoomChat.find({
    "users.user_id":userId,
    typeRoom:"group",
    deleted:false
  });
  res.render("client/pages/rooms-chat/index",{
    pageTitle: "Danh sách phòng",
    listRoomChat:listRoomChat
  });
}
//[GET] /rooms-chat/create
module.exports.createRoom=async(req,res) =>{
  const friendList=res.locals.user.friendList;
  for (const friend of friendList) {
    const infoUser=await User.findOne({
      _id:friend.user_id,
    }).select("fullName");
    friend.infoFriend=infoUser;
  }
  res.render("client/pages/rooms-chat/create",{
    pageTitle: "Tạo phòng",
    friendsList:friendList
  });
}
//[POST] /rooms-chat/create
module.exports.createRoomPost=async(req,res) =>{
  const title=req.body.title;
  const usersId=req.body.usersId;
  const dataRoom={
    title:title,
    typeRoom:"group",
    users: []
  };
  dataRoom.users.push({
    user_id:res.locals.user.id,
    role:"superAdmin"
  });
  usersId.forEach(userId => {
    dataRoom.users.push({
      user_id:userId,
      role:"user"
    })
  });
  const roomChat=new RoomChat(dataRoom);
  await roomChat.save();
  res.redirect(`/chat/${roomChat.id}`);
}