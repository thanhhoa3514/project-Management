const Settings= require("../../models/setting.model");

module.exports.index=async(req,res)=>{

    const settingsGeneral= await Settings.findOne({}); // Take the first document
    res.render("admin/pages/setting/index", {
        pageTitle: "Setting",
        settings:settingsGeneral
    });
};


// [PATCH] admin/settings
module.exports.indexPatch= async (req, res) => {
    try {
        const settingsData = {
            general: {
                siteName: req.body.siteName,
                siteDescription: req.body.siteDescription,
                timezone: req.body.timezone,
                dateFormat: req.body.dateFormat
            },
            website:{
                websiteName:req.body.websiteName,
                logo: req.body.logo,
                favicon:req.body.favicon ,
                address:req.body.address,
                copyright:req.body.copyright,
                metaKeywords:req.body.metaKeywords ,
                metaDescription: req.body.metaDescription,
            },
            email:{
                smtp: req.body.smtp,
                fromEmail: req.body.fromEmail,
                fromName: req.body.fromName,
            },
            socialMedia:{
                facebook: req.body.facebook,
                twitter: req.body.twitter,
                instagram: req.body.instagram,
                linkedLn: req.body.linkedLn
            },
            security:{
                twoFactorAuth: req.body.twoFactorAuth,
                sessionTimeout: req.body.sessionTimeout,
                passwordPolicy: req.body.passwordPolicy,
                
            },
            backup:{
                autoBackup: req.body.autoBackup,
                frequency: req.body.frequency,
                lastBackup: req.body.lastBackup,
                backupHistory: req.body.backupHistory,
            },
            notifications:{
                email: req.body.email,
                browser: req.body.frequency,
                
            },
            analytics:{
                googleAnalytics: req.body.googleAnalytics,
                facebookPixel: req.body.facebookPixel,
            }
        };

        
        const settings = await Settings.findOneAndUpdate(
            {},  // Find first document
            settingsData,
            {
                upsert: true, // Create a new document if it not existing
                new: true,    // trả về document sau khi update
                runValidators: true //run validators
            }
        );

        req.flash('success', 'Settings updated successfully');
        res.redirect('/admin/settings');

    } catch (error) {
        req.flash('error', 'Error updating settings');
        res.redirect('/admin/settings');
    }

};