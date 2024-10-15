//  Button Status
const buttonStatus = document.querySelectorAll("[button-status]");

// Check if  button status array exists
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      // Check if button status is not empty such as active or inactive
      if (status) {
        url.searchParams.set("status", status);
      } else {
        // Remove status query parameter if it exists
        url.searchParams.delete("status");
      }

      // Update the current URL in the browser address bar by replacing the current URL with the updated one.
      window.location.href = url.href;
    });
  });
}
// End Button Status

// Form Search
const formSearch = document.querySelector("#form-search");

// Check if form search exists
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    // Prevent form submission loading
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    // console.log(e.target.elements.keyword.value);

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      // Remove status query parameter if it exists
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}

// End Form Search

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");

if (buttonPagination) {
  let url = new URL(window.location.href);

  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const pageCurrent = button.getAttribute("button-pagination");
      console.log(pageCurrent);
      if (pageCurrent) {
        url.searchParams.set("page", pageCurrent);
      }
      window.location.href = url.href;
    });
  });
}
// End pagination

// Checkbox Multi

const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputEachCheck = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    console.log(inputCheckAll.checked);
    if (inputCheckAll.checked) {
      inputEachCheck.forEach((input) => {
        input.checked = inputCheckAll.checked;
      });
    } else {
      inputEachCheck.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputEachCheck.forEach((inputCheck) => {
    inputCheck.addEventListener("click", () => {
      const countChecked=document.querySelectorAll("input[name='id']:checked").length;
      
      if(countChecked==inputEachCheck.length){
        inputCheckAll.checked=true;
      }else{
        inputCheckAll.checked=false;
      }

    });
  });
}
// End checkbox multi

// Form change multi
const formChangeMulti=document.querySelector("[form-change-multi]");
if(formChangeMulti){
  formChangeMulti.addEventListener("submit",(e)=>{
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputEachCheck = checkboxMulti.querySelectorAll("input[name='id']:checked");
    if(inputEachCheck.length > 0) {
      let ids=[];
      const inputForm=formChangeMulti.querySelector("input[name='ids']")
      inputEachCheck.forEach((inputCheck) => {
        ids.push(inputCheck.value);
      });
      inputForm.value=ids.join(',');
      formChangeMulti.submit();
    }
  });
}
// End Form change multi

// Form Restore Item


// Form End restore item
