import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

// Upload multiple images
const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-image',{
    multiple: true,
    maxFileCount:6
});

// CLIENT_SEND_MESSAGE
const formSentData = document.querySelector(".chat .inner-form");
if (formSentData) {
    formSentData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        const images=upload.cachedFileArray;
        if (content||images.length>0) {
            socket.emit("CLIENT_SEND_MESSAGE", {
                content: content,
                images: images
            });
            e.target.elements.content.value = "";
            upload.resetPreviewPanel();
            socket.emit("CLIENT_SEND_TYPING", "hidden");

        }
        
    });
}
// End CLIENT_SEND_MESSAGE
// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    const boxListTyping = document.querySelector(".chat .inner-list-typing");

    // const chatBox=document.querySelector(".chat.chat-box");
    const div = document.createElement("div");
    let htmlFullName = "";
    let htmlContent = "";
    let htmlImages= "";
    if (myId == data.userId) {
        div.classList.add("inner-outgoing");
    } else {
        htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
        div.classList.add("inner-incoming");
    }
    if(data.content){
        htmlContent=`<div class="inner-content">${data.content}</div>`
    }
    if(data.images.length>0){
        htmlImages+=`
        <div class="inner-images">
        `
            for (const image of data.images) {
                htmlImages+=`
                    <img src="${image}">
                `
            }
        htmlImages+=`</div>`
    }
    // div.classList.add("inner-incoming");
    div.innerHTML = `
        ${htmlFullName}
        ${htmlContent}
        ${htmlImages}
    `;
    body.insertBefore(div,boxListTyping);
    // chatBox.appendChild(div);
    body.scrollTop = body.scrollHeight; // scroll to bottom of chat box when new message arrives
});
// End SERVER_RETURN_MESSAGE

// Scroll to bottom of chat box when new message arrives

const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight; //
}
// End

// Show icon chat
const buttonIcon = document.querySelector(".button-icon");
// console.log(buttonIcon);
if (buttonIcon) {
    const tooltip = document.querySelector(".tooltip");
    Popper.createPopper(buttonIcon, tooltip);

    buttonIcon.onclick = () => {
        tooltip.classList.toggle("shown");
    };
}

var timeOut;
const showTyping=()=>{
    socket.emit("CLIENT_SEND_TYPING", "show");
    clearTimeout(timeOut);
    timeOut=setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    },3000)
}
// Insert icon chat
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
    const inputChat = document.querySelector(
        ".chat .inner-form input[name='content']"
    );
    emojiPicker.addEventListener("emoji-click", (event) => {
        // console.log(event.detail.unicode);
        const icon = event.detail.unicode;

        inputChat.value = inputChat.value + icon;

        const end=inputChat.value.length;
        inputChat.setSelectionRange(end, end);
        inputChat.focus();
        showTyping();
    });


    // Input keyup
        inputChat.addEventListener("keyup", () => {
            showTyping();
        });
    // End input keyup
}
//  End insert icon chat
// End show icon chat



// SERVER_RETURN_TYPING

const elementListTyping = document.querySelector(".chat .inner-list-typing");
// console.log(elementListTyping);
if (elementListTyping) {
    socket.on("SERVER_RETURN_TYPING", (data) => {
        if (data.type == "show") {
            const bodyChat = document.querySelector(".chat .inner-body");
    
            const existTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
            if (!existTyping) {
                const boxTyping = document.createElement("div");
    
                boxTyping.classList.add("box-typing");
                boxTyping.setAttribute("user-id", data.userId);
                boxTyping.innerHTML = `
                    <div class="inner-name">${data.fullName}</div>
                    <div class="inner-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;
                elementListTyping.appendChild(boxTyping);
                bodyChat.scrollTop = bodyChat.scrollHeight;
            }
        } else {
            const boxTypingRemove = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
            if (boxTypingRemove) {
                elementListTyping.removeChild(boxTypingRemove);
            }
        }
    });

}
