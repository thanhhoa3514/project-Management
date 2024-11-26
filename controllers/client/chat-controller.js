// [GET] chat/
module.exports.index= async (req, res) => {
    try {
        res.render("client/pages/chat/index",{
            pageTitle:"Chat"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};