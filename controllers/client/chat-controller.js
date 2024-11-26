const Chat= require("../../models/chat-model"); 
const User = require("../../models/user-model");

// [GET] chat/
module.exports.index= async (req, res) => {
    try {
        const userId= res.locals.user.id;
        _io.once('connection', (socket) => {
            
            socket.on("CLIENT_SEND_MESSAGE", async (message) => {
                const chat=new Chat({
                    user_id: userId,
                    message: message
                });
                await chat.save();
                // io.emit("SERVER_SEND_MESSAGE", {
                //     user_id: userId,
                //     message: message
                // });
            })
        });

        const chats= await Chat.find({
            deleted: false
        });
        // console.log(chats);
        for (const chat of chats) {
            const infoUser = await User.find({
                _id: chat.user_id
            }).select("fullName avatar")
            chat.infoUser=infoUser
        }
        res.render("client/pages/chat/index",{
            pageTitle:"Chat",
            chats:chats
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};