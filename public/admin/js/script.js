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
      }else{
        
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
if (formSearch){
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e)=>{
    
    // Prevent form submission loading 
    e.preventDefault();
    const keyword=e.target.elements.keyword.value
    // console.log(e.target.elements.keyword.value);

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    }else{
      
      // Remove status query parameter if it exists
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;

  });
}

// End Form Search