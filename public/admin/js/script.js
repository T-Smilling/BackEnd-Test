const buttonStatus=document.querySelectorAll("[button-status");
if(buttonStatus.length > 0){
  buttonStatus.forEach(button => {
    let url = new URL(window.location.href);
    button.addEventListener("click", () =>{
      const status=button.getAttribute("button-status");
      if(status){
        url.searchParams.set("status",status);
      }
      else{
        url.searchParams.delete("status");
      }
      window.location.href=url.href;
    });
  });
}
// End Status
const formSearch = document.querySelector("#form-search");
if(formSearch){
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword=e.target.elements.keyword.value;
    console.log(keyword);
    if(keyword){
      url.searchParams.set("keyword",keyword);
    }
    else{
      url.searchParams.delete("keyword");
    }
    window.location.href=url.href;
  });
}
// End Search

const pagination=document.querySelectorAll("[button-pagination]");

if(pagination){
  let url = new URL(window.location.href);
  pagination.forEach(button => {
    button.addEventListener("click", () => {
      const page=button.getAttribute("button-pagination");
      url.searchParams.set("page",page);
      window.location.href=url.href;
    })
  })
}
//End Pagination

const checkboxMulti=document.querySelector("[checkbox-multi]");
if(checkboxMulti){
  const inputCheckAll=checkboxMulti.querySelector("input[name='checkall']");
  const inputId=checkboxMulti.querySelectorAll("input[name='id']");
  inputCheckAll.addEventListener("click",() =>{
    if(inputCheckAll.checked){
      inputId.forEach(input =>{
        input.checked=true;
      });
    } else{
      inputId.forEach(input =>{
        input.checked=false;
      });
    }

    inputId.forEach(input =>{
      input.addEventListener("click", () =>{
        const countChecked=checkboxMulti.querySelectorAll(
          "input[name='id']:checked"
        ).length;
        if(countChecked==inputId.length){
          inputCheckAll.checked=true;
        }
        else{
          inputCheckAll.checked=false;
        }
      });
    });

  });
}

// End CheckBox

const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
  formChangeMulti.addEventListener("submit",(e)=>{
    e.preventDefault();
    const checkboxMulti=document.querySelector("[checkbox-multi]");
    const inputChecked=checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange=e.target.elements.type.value;
    if(typeChange=="delete-all"){
      const isConfirm=confirm("Bạn có muốn xóa sản phẩm");
      if(!isConfirm) return;
    }


    if(inputChecked.length>0){
      let ids=[];
      const inputIds=formChangeMulti.querySelector("input[name='ids']");
      inputChecked.forEach(input =>{
        const id=input.value;
        if(typeChange=="position"){
          const position=input.closest("tr").querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else{
          ids.push(id);
        }
      });
      inputIds.value=ids.join(", ");
      formChangeMulti.submit();
    }else{
      alert("Vui lòng nhập một lựa chọn!");
    }
  })
}

//End Change Multi

const buttonDelete=document.querySelectorAll("[button-delete]");
if(buttonDelete.length>0){
  const formDeleted=document.querySelector("#form-delete");
  const path=formDeleted.getAttribute("data-path");
  buttonDelete.forEach(button =>{
    button.addEventListener("click" , () => {
      console.log(button);
      isConfirm=confirm("Bạn có muốn xóa sản phẩm");
      if(isConfirm){
        const id=button.getAttribute("data-id");
        const action=`${path}/${id}?_method=DELETE`;
        formDeleted.action=action;
        formDeleted.submit();
      }
    });
  });
}

//End Delete

const showAlert =document.querySelector("[show-alert]");
if(showAlert){
  const time=parseInt(showAlert.getAttribute("data-time"));
  const closeAlert=showAlert.querySelector("[close-alert]");
  setTimeout(() =>{
    showAlert.classList.add("alert-hidden");
  },time);
  closeAlert.addEventListener("click" , () =>{
    showAlert.classList.add("alert-hidden");
  });
}
//End ShowAlert

//Upload Picture
const uploadImage=document.querySelector("[upload-image]");
if(uploadImage){
  const uploadImageInput=document.querySelector("[upload-image-input]");
  const uploadImagePreview=document.querySelector("[upload-image-preview]");
  const closeImage=document.querySelector("[close-image]");
  uploadImageInput.addEventListener("change",(e)=>{
    let [file] = e.target.files;
    if(file){
      uploadImagePreview.src=URL.createObjectURL(file);
      closeImage.classList.add("active");
    }
  });
  closeImage.addEventListener("click" ,()=>{
    uploadImageInput.value="";
    uploadImagePreview.src="";
    closeImage.classList.remove("active");
  });
}

//End Upload Picture

const sort=document.querySelector("[sort]");
if(sort){
  let url = new URL(window.location.href);
  const sortSelect=sort.querySelector("[sort-select]");
  const sortClear=sort.querySelector("[sort-clear]");
  if(sortSelect){
    sortSelect.addEventListener("change",(e)=>{
      const value=e.target.value;
      const [sortKey,sortValue]=value.split("-");
      console.log(sortKey);
      console.log(sortValue);
      url.searchParams.set("sortKey",sortKey);
      url.searchParams.set("sortValue",sortValue);
      window.location.href=url.href;
    })
  }
  sortClear.addEventListener("click",()=>{
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href=url.href;
  })

  const sortKey=url.searchParams.get("sortKey");
  const sortValue=url.searchParams.get("sortValue");
  if(sortKey && sortValue){
    const stringSort=`${sortKey}-${sortValue}`;
    console.log(stringSort);
    const optionSelect=sortSelect.querySelector(`option[value="${stringSort}"]`);
    optionSelect.selected=true;
  }
}
//End Sort