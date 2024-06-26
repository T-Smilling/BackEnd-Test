const User=require("../../models/user.model");
const RoomChat=require("../../models/roomChat.model");
module.exports=(res)=>{
  //SocketIo
  _io.once('connection',(socket)=>{
    //Khi A gửi yêu cầu cho B
    //accept: list nguoi nhan loi moi
    //reques: list nhung nguoi ket ban trang thai cho
    socket.on("CLIENT_ADD_FRIEND", async (data) =>{
      const userIdA=res.locals.user.id;
      const userIdB=data;
      // Thêm id của A vào acceptFriends của B
      const existUserAinB= await User.findOne({
        _id:userIdB,
        acceptFriends:userIdA
      });
      if(!existUserAinB){
        await User.updateOne({
          _id:userIdB
        },{
          $push: {acceptFriends: userIdA}
        });
      }
      // Thêm id của B vào requestFriends của A
      const existUserBinA= await User.findOne({
        _id:userIdA,
        requestFriends:userIdB
      });
      if(!existUserAinB){
        await User.updateOne({
          _id:userIdA
        },{
          $push: {requestFriends: userIdB}
        });
      }
      // Lấy độ dài acceptFriends của B để trả về cho B
      const infoUser=await User.findOne({
        _id:userIdB
      }).select("acceptFriends");
      const lengthAcceptFriendsB = infoUser.acceptFriends.length;
      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",{
        userId:userIdB,
        lengthAcceptFriends:lengthAcceptFriendsB
      });
      // Lấy thông tin của A để trả về cho B
      const infoUserA=await User.findOne({
        _id:userIdA
      }).select("id fullName");
      socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND",{
        userIdB:userIdB,
        infoUserA:infoUserA
      })
    });
    // Chức năng hủy gửi yêu cầu
    socket.on("CLIENT_CANCEL_FRIEND",async (data) =>{
      const userIdA=res.locals.user.id;
      const userIdB=data;
      // Xóa id của A trong acceptFriends của B
      await User.updateOne({
        _id:userIdB
      },{
        $pull:{acceptFriends:userIdA}
      });
      // Xóa id của B trong requestFriends của A
      await User.updateOne({
        _id:userIdA
      },{
        $pull:{requestFriends:userIdB}
      });
      // Lấy độ dài acceptFriends của B để trả về cho B
      const infoUser=await User.findOne({
        _id:userIdB
      }).select("acceptFriends");
      const lengthAcceptFriendsB = infoUser.acceptFriends.length;
      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",{
        userId:userIdB,
        lengthAcceptFriends:lengthAcceptFriendsB
      })
      // Lấy userId của A trả về cho B
      socket.broadcast.emit("SERVER_RETURN_ID_CANCEL_FRIEND",{
        userIdB:userIdB,
        userIdA:userIdA
      })
    });
    // Khi B từ chối kết bạn của A
    socket.on("CLIENT_REFUSE_FRIEND",async (data) =>{
      const userIdB=res.locals.user.id;
      const userIdA=data;
      // Xóa id của A trong acceptFriends của B
      await User.updateOne({
        _id:userIdB
      },{
        $pull:{acceptFriends:userIdA}
      });
      // Xóa id của B trong requestFriends của A
      await User.updateOne({
        _id:userIdA
      },{
        $pull:{requestFriends:userIdB}
      });
    });
    // Khi B chấp nhận kết bạn của A
    socket.on("CLIENT_ACCEPT_FRIEND",async (data) =>{
      const userIdB=res.locals.user.id;
      const userIdA=data;


      //Tạo phòng chat mới
      const roomChat= new RoomChat({
        typeRoom: "friend",
        users: [
          {
            user_id: userIdA,
            role: "superAdmin"
          },
          {
            user_id: userIdB,
            role: "superAdmin"
          }
        ],
      });
      await roomChat.save();

      // Thêm {user_id, room_chat_id} của A vào friendsList của B
      // Xóa id của A trong acceptFriends của B
      await User.updateOne({
        _id:userIdB
      },{
        $push:{
          friendList:{
            user_id:userIdA,
            room_chat_id:roomChat.id
          }
        },
        $pull:{acceptFriends:userIdA}
      });
       // Thêm {user_id, room_chat_id} của B vào friendsList của A
      // Xóa id của B trong requestFriends của A
      await User.updateOne({
        _id:userIdA
      },{
        $push:{
          friendList:{
            user_id:userIdB,
            room_chat_id:roomChat.id
          }
        },
        $pull:{requestFriends:userIdB}
      });
    });
  });
  //End SocketIo
}