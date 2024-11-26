// CLIENT_SEND_MESSAGE
const formSentData=document.querySelector(".chat .inner-form");
if (formSentData){
    formSentData.addEventListener("submit",(e)=>{
        e.preventDefault();
        const content=e.target.elements.content.value;
        if(content){
            socket.emit("CLIENT_SEND_MESSAGE",content);
            e.target.elements.content.value="";
        }
        // if(messageInput.value){
        //     const message=messageInput.value;
        //     messageInput.value="";
        //     socket.emit("client_send_message",message);
        // }
    });
}
// End CLIENT_SEND_MESSAGE


// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE",(data)=>{
    const myId= document.querySelector("[my-id]").getAttribute("my-id");
    const body= document.querySelector(".chat .inner-body");
    // const chatBox=document.querySelector(".chat.chat-box");
    const div=document.createElement("div");
    let htmlFullName="";
    if(myId==data.userId){
        div.classList.add("inner-outgoing");
    }else{
        htmlFullName=`<div class="inner-name">${data.fullName}</div>`
        div.classList.add("inner-incoming");
    }
    div.classList.add("inner-incoming");
    div.innerHTML=`
        ${htmlFullName}
        <div class="inner-content">${data.content}</div>

    `;
    body.appendChild(div);
    // chatBox.appendChild(div);
    body.scrollTop=body.scrollHeight; // scroll to bottom of chat box when new message arrives
})
// End SERVER_RETURN_MESSAGE

// Scroll to bottom of chat box when new message arrives

const bodyChat= document.querySelector(".chat .inner-body");
if(bodyChat){
    bodyChat.scrollTop=bodyChat.scrollHeight; //
}
// End 
