// Gửi yêu cầu kết bạn
const btnAddFriend=document.querySelectorAll("[btn-add-friend]");
if(btnAddFriend.length>0){
  btnAddFriend.forEach(button =>{
    button.addEventListener("click" , () =>{
      button.closest(".box-user").classList.add("add");
      const userId=button.getAttribute("btn-add-friend");
      socket.emit("CLIENT_ADD_FRIEND" ,userId);
    });
  });
}
// Hết Gửi yêu cầu kết bạn

// Hủy yêu cầu kết bạn
const btnCancelFriend=document.querySelectorAll("[btn-cancel-friend]");
if(btnCancelFriend.length>0){
  btnCancelFriend.forEach(button =>{
    button.addEventListener("click" , () =>{
      button.closest(".box-user").classList.remove("add");
      const userId=button.getAttribute("btn-cancel-friend");
      socket.emit("CLIENT_CANCEL_FRIEND" ,userId);
    });
  });
}
// End Hủy Gửi yêu cầu kết bạn

// Từ chối yêu cầu kết bạn
const btnRefuseFriend=document.querySelectorAll("[btn-refuse-friend]");
if(btnRefuseFriend.length>0){
  btnRefuseFriend.forEach(button =>{
    button.addEventListener("click" , () =>{
      button.closest(".box-user").classList.add("refuse");
      const userId=button.getAttribute("btn-refuse-friend");
      socket.emit("CLIENT_REFUSE_FRIEND" ,userId);
    });
  });
}
// End Từ chối yêu cầu kết bạn

// Chấp nhận yêu cầu kết bạn
const btnAcceptFriend=document.querySelectorAll("[btn-accept-friend]");
if(btnAcceptFriend.length>0){
  btnAcceptFriend.forEach(button =>{
    button.addEventListener("click" , () =>{
      button.closest(".box-user").classList.add("accepted");
      const userId=button.getAttribute("btn-accept-friend");
      socket.emit("CLIENT_ACCEPT_FRIEND" ,userId);
    });
  });
}
// End Chấp nhận yêu cầu kết bạn

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",(data) => {
  const badgeUsersAccept =document.querySelector(`[badge-users-accept="${data.userId}"]`);
  if(badgeUsersAccept){
    badgeUsersAccept.innerHTML=data.lengthAcceptFriends;
  }
});
// End SERVER_RETURN_LENGTH_ACCEPT_FRIEND

// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND",(data)=>{
  const dataUserAccept=document.querySelector(`[data-users-accept="${data.userIdB}"]`);
  if(dataUserAccept){
    const boxUser=document.createElement("div");
    boxUser.classList.add("col-6");
    boxUser.setAttribute("user-id",data.infoUserA._id);
    boxUser.innerHTML=`
      <div class="box-user">
        <div class="inner-avatar">
          <img src="data:image/jpeg;base64,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" alt="${data.infoUserA.fullName}" />
        </div>
        <div class="inner-info">
          <div class="inner-name">
            ${data.infoUserA.fullName}
          </div>
          <div class="inner-buttons">
            <button
              class="btn btn-sm btn-primary mr-1"
              btn-accept-friend="${data.infoUserA._id}"
            >
              Chấp nhận
            </button>
            <button
              class="btn btn-sm btn-secondary mr-1"
              btn-refuse-friend="${data.infoUserA._id}"
            >
              Từ chối
            </button>
            <button
              class="btn btn-sm btn-secondary mr-1"
              btn-deleted-friend=""
              disabled=""
            >
              Đã từ chối
            </button>
            <button
              class="btn btn-sm btn-primary mr-1"
              btn-accepted-friend=""
              disabled=""
            >
              Đã chấp nhận
            </button>
          </div>
        </div>
      </div>
    `;
    dataUserAccept.appendChild(boxUser);
    // Từ chối yêu cầu kết bạn
    const btnRefuse=boxUser.querySelector("[btn-refuse-friend]");
    btnRefuse.addEventListener("click" , () =>{
      btnRefuse.closest(".box-user").classList.add("refuse");
      const userId=btnRefuse.getAttribute("btn-refuse-friend");
      socket.emit("CLIENT_REFUSE_FRIEND" ,userId);
    });
    // End Từ chối yêu cầu kết bạn
    // Chấp nhận yêu cầu kết bạn
    const btnAccept=document.querySelector("[btn-accept-friend]");
    btnAccept.addEventListener("click" , () =>{
      btnAccept.closest(".box-user").classList.add("accepted");
      const userId=btnAccept.getAttribute("btn-accept-friend");
      socket.emit("CLIENT_ACCEPT_FRIEND" ,userId);
    });
    // End Chấp nhận yêu cầu kết bạn
  }
  // Khi A gửi kết bạn cho B, danh sách người dùng của B xóa đi A
  const dataUserNotFriend=document.querySelector(`[data-users-not-friend="${data.userIdB}"]`);
  if(dataUserNotFriend){
    const boxUserDelete=dataUserNotFriend.querySelector(`[user-id="${data.infoUserA._id}"]`);
    dataUserNotFriend.removeChild(boxUserDelete);
  }
});
// END ERVER_RETURN_INFO_ACCEPT_FRIEND

//SERVER_RETURN_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_ID_CANCEL_FRIEND",(data)=>{
  const dataUserAccept=document.querySelector(`[data-users-accept="${data.userIdB}"]`);
  if(dataUserAccept){
    const boxUserA=document.querySelector(`[user-id="${data.userIdA}"]`);
    if(boxUserA){
      dataUserAccept.removeChild(boxUserA);
    }
  }
});
//END SERVER_RETURN_ID_CANCEL_FRIEND

// SERVER_RETURN_USER_STATUS
socket.on("SERVER_RETURN_USER_STATUS",(data)=>{
  const dataUsersFriend=document.querySelector("[data-users-friend]");
  if(dataUsersFriend){
    const boxUser=dataUsersFriend.querySelector(`[user-id="${data.userId}"]`);
    if(boxUser){
      const boxStatus=boxUser.querySelector("[status]");
      boxStatus.setAttribute("status",data.status);
    }
  }
});
//END SERVER_RETURN_USER_STATUS