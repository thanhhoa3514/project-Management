const Chat= require("../../models/chat-model"); 
const User = require("../../models/user-model");

// [GET] chat/
module.exports.index= async (req, res) => {
    try {
        const userId= res.locals.user.id;
        const fullName= res.locals.user.fullName;
        _io.once('connection', (socket) => {
            
            socket.on("CLIENT_SEND_MESSAGE", async (content) => {
                const chat=new Chat({
                    user_id: userId,
                    content: content
                });
                await chat.save();
                _io.emit("SERVER_RETURN_MESSAGE", {
                    userId: userId,
                    fullName:fullName,
                    content: content
                });
            })

            socket.on("CLIENT_SEND_TYPING", async (type) => {
                socket.broadcast.emit("SERVER_RETURN_TYPING", {
                    userId: userId,
                    fullName: fullName,
                    type: type
                });
            });
        });

        const chats= await Chat.find({
            deleted: false
        });
        // console.log(chats);
        for (const chat of chats) {
            const infoUser = await User.find({
                _id: chat.user_id
            }).select("fullName")
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