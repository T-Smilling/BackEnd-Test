const User = require("../../models/user.model");
const userSocket=require("../../socket/client/users.socket")
//[GET] users/not-friend
module.exports.notFriend=async(req,res) =>{
  //Socket
  userSocket(res);
  //End Socket

  const userId = res.locals.user.id;
  const acceptFriends=res.locals.user.acceptFriends;
  const requestFriends=res.locals.user.requestFriends;
  const listFriends = res.locals.user.friendList.map(item => item.user_id);
  const users = await User.find({
    $and:[
      {_id:{$ne:userId}},
      {_id:{$nin:listFriends}},
      {_id:{$nin:acceptFriends}},
      {_id:{$nin:requestFriends}}
    ],
    status: "active",
    deleted: false
  }).select("id fullName");
  res.render("client/pages/users/not-friend",{
    pageTitle:"Danh sách người dùng",
    users:users
  })
}
//[GET] users/request
module.exports.requestFriend=async(req,res) =>{
  //Socket
  userSocket(res);
  //End Socket

  const requestFriends = res.locals.user.requestFriends;
  const users = await User.find({
    _id: {$in: requestFriends },
    status: "active",
    deleted: false
  }).select("id fullName");
  res.render("client/pages/users/request",{
    pageTitle:"Lời mời đã gửi",
    users:users
  })
}
//[GET] users/accept
module.exports.acceptFriend=async(req,res) =>{
  //Socket
  userSocket(res);
  //End Socket

  const acceptFriends = res.locals.user.acceptFriends;
  const users = await User.find({
    _id: {$in: acceptFriends },
    status: "active",
    deleted: false
  }).select("id fullName");
  res.render("client/pages/users/accept",{
    pageTitle:"Lời mời kết bạn",
    users:users
  })
}
//[GET] users/friends
module.exports.friendsFriend=async(req,res) =>{
  //Socket
  userSocket(res);
  //End Socket
  const listFriend = res.locals.user.friendList;
  const listFriendsId = res.locals.user.friendList.map(item => item.user_id);

  const users = await User.find({
    _id: {$in: listFriendsId },
    status: "active",
    deleted: false
  }).select("id fullName statusOnline");
  for(const user of users){
    const infoUser=listFriend.find(item => item.user_id==user.id);
    user.roomChatId=infoUser.room_chat_id;
  }
  res.render("client/pages/users/friend",{
    pageTitle:"Danh sách bạn bè",
    users:users
  })
}