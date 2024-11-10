// Permission
const tablePermissions = document.querySelector("[table-permissions]");

if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");

  buttonSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    let permissions = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");

      // console.log(name);

        if (name == "id") {
            inputs.forEach((input) => {
            const id = input.value;
            permissions.push({
                id: id,
                permissions: [],
            });
            });
        }else{
            inputs.forEach((input,index) => {
            const checked=input.checked;
            // console.log(checked);
            // console.log(name);
            // console.log(index);
            if(checked){
                permissions[index].permissions.push(name);
            }

            });
        }
        
    });
    console.log(permissions);
    
    if(permissions.length>0){
        const idForm=document.querySelector("#form-change-permissions");
        const inputPermissions=idForm.querySelector("input[name='permissions']");
        inputPermissions.value=JSON.stringify(permissions);

        idForm.submit();
    }
  });
}
// End of the permission

// Permission Default Table

const dataRecords=document.querySelector("[data-records]");
if(dataRecords){
  const records=JSON.parse(dataRecords.getAttribute("data-records"));
  const tablePermissions = document.querySelector("[table-permissions]");

  //console.log(records);
  records.forEach((record,index) =>{
    const permissions=record.Permission_groups;
    console.log(permissions);

    permissions.forEach(permission =>{
      const row=tablePermissions.querySelector(`[data-name="${permission}"]`);
      const inputs=row.querySelectorAll("input")[index];
      inputs.checked=true;
    });


  });
}
// End Permission Default Table


