const Settings= require("../../models/setting.model");

module.exports.settingGeneral=async (req, res, next) => {

    const settingGeneral =await Settings.findOne({});
    
    res.locals.settingGeneral=settingGeneral;
    next();

}