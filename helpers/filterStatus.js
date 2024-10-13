module.exports=(query)=>{
    let filterStatus=[
        {
            name:"All",
            status:"",
            class:""
        },
        {
            name:"Active",
            status:"active",
            class:""
        },
        {
            name:"Inactive",
            status:"inactive",
            class:""
        }
    ];

    if(query.status){
        const index=filterStatus.findIndex(item=>item.status==query.status);

        if(index!=-1){
            // Make the current status active by adding the class
            filterStatus[index].class="active";
        }

    }else {

        const index=filterStatus.findIndex(item=>item.status=="");
        filterStatus[index].class="active";
    }
    return filterStatus;
}