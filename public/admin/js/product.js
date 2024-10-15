//  Change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");
  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const idCurrent = button.getAttribute("data-id");

      let changeStatus = statusCurrent == "active" ? "inactive" : "active";

    //   console.log(statusCurrent);
    //   console.log(idCurrent);
    //   console.log(changeStatus);

      const action = path + `/${changeStatus}/${idCurrent}?_method=PATCH`;

      formChangeStatus.action = action;

      formChangeStatus.submit();

    });
  });
}
//End change status

// Delete Item
const buttonDelete=document.querySelectorAll("[button-delete]");

if(buttonDelete.length > 0) {

  const formDelete=document.querySelector("#form-delete-item");

  const path=formDelete.getAttribute("data-path");

  buttonDelete.forEach((button)=>{
    button.addEventListener("click",()=>{

      const isConfirm=confirm("Are you sure that want to delete this item?");
      
      if(isConfirm){
        const dataId = button.getAttribute("data-id");

        const action=`${path}/${dataId}?_method=DELETE`;

        formDelete.action=action;

        formDelete.submit();
      }

    });
  });

}
// End Delete Item

// Restore Item
const buttonRestoreItem=document.querySelectorAll("[button-restore]");

if(buttonRestoreItem.length>0){

  const formRestore=document.querySelector("#form-restore-item");

  const path=formRestore.getAttribute("data-path");

  buttonRestoreItem.forEach(button=>{
    button.addEventListener("click",()=>{

      const dataId=button.getAttribute("data-id");
      
      console.log(dataId);
      const action=`${path}/${dataId}?_method=PATCH`;

      formRestore.action=action;
      formRestore.submit();
    })
  })

}
// End restore item 
