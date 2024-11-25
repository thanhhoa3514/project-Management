const mongoose = require("mongoose");

const generalSchema = new mongoose.Schema({
    siteName: {
        type: String,
        required: true,
        trim: true,
    },
    siteDescription: {
        type: String,
        required: true,
        trim: true,
    },
    timezone: {
        type: String,
        default: "Asia/Ho_Chi_Minh",
    },

    dateFormat: {
        type: String,
        default: "DD/MM/YYYY",
    },
});

const emailSchema = new mongoose.Schema({

    smtp: {
        host: String,
        port: Number,
        secure: Boolean,
        auth: {
            user: String,
            pass: String,
        },
    },
    fromEmail: {
        type: String,
        trim: true,
    },
    fromName: {
        type: String,
        trim: true,
    },

});
const websiteSchema = new mongoose.Schema({
    websiteName:{
        type: String,
        trim: true,
    },
    logo: {
        type: String,
        trim: true,
    },
    favicon: {
        type: String,
        trim: true,
    },
    address:{
        type: String,
        trim: true,
    },
    copyright:{
        type: String,
        trim: true,
    },
    metaKeywords: {
        type: String,
        trim: true,
    },
    metaDescription: {
        type: String,
        trim: true,
    },
});
const socialMediaSchema = new mongoose.Schema({

    facebook: {
        type: String,
        trim: true,
    },
    twitter: {
        type: String,
        trim: true,
    },
    instagram: {
        type: String,
        trim: true,
    },
    linkedLn: {
        type: String,
        trim: true,
    },


});


const securitySchema = new mongoose.Schema({

    twoFactorAuth: {
        type: Boolean,
        default: false,
    },
    sessionTimeout: {
        type: Number,
        default: 3600, // 1 hour in seconds
    },
    passwordPolicy: {
        minLength: {
            type: Number,
            default: 8,
        },
        requireUppercase: {
            type: Boolean,
            default: true,
        },
        requireNumbers: {
            type: Boolean,
            default: true,
        },
        requireSpecialChars: {
            type: Boolean,
            default: true,
        },
    },

});
const backupSchema = new mongoose.Schema({

    autoBackup: {
        type: Boolean,
        default: true,
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
        default: "daily",
    },
    lastBackup: {
        type: Date,
    },
    backupHistory: [
        {
            filename: String,
            createdAt: Date,
            size: Number,
            path: String,
        },
    ],



});



const notificationsSchema = new mongoose.Schema({

    email: {
        enabled: {
            type: Boolean,
            default: true,
        },
        events: {
            newUser: Boolean,
            newOrder: Boolean,
            systemAlert: Boolean,
        },
    },
    browser: {
        enabled: {
            type: Boolean,
            default: true,
        },
        events: {
            newMessage: Boolean,
            newComment: Boolean,
        },
    },

});




const analyticsSchema = new mongoose.Schema({

    googleAnalytics: {
        trackingId: {
            type: String,
            trim: true,
        },
        enabled: {
            type: Boolean,
            default: false,
        },
    },
    facebookPixel: {
        pixelId: {
            type: String,
            trim: true,
        },
        enabled: {
            type: Boolean,
            default: false,
        },
    },

});
const settingsSchema = new mongoose.Schema(
    {

        general: generalSchema,
        website: websiteSchema,
        email: emailSchema,
        socialMedia: socialMediaSchema,
        security: securitySchema,
        backup: backupSchema,
        notifications: notificationsSchema,
        analytics: analyticsSchema

    },
    {
        timestamps: true,

    }
);

settingsSchema.static={
    async getSection(section) {
        const settings = await this.findOne().select(section);
        return settings?.[section];
    },

    async updateSection(section, data) {
        const settings = await this.findOneAndUpdate(
            {},
            { $set: { [section]: data } },
            { upsert: true, new: true }
        );
        return settings[section];
    },

    async getGeneral() {
        return this.getSection('general');
    },
    
    async updateGeneral(data) {
        return this.updateSection('general', data);
    },

    async getWebsite() {
        return this.getSection('website');
    },
    
    async updateWebsite(data) {
        return this.updateSection('website', data);
    },
    async getEmail() {
        return this.getSection('email');
    },
    
    async updateEmail(data) {
        return this.updateSection('email', data);
    },
    async getSocialMedia() {
        return this.getSection('socialMedia');
    },
    
    async updateSocialMedia(data) {
        return this.updateSection('socialMedia', data);
    },
    async getSecurity() {
        return this.getSection('security');
    },
    
    async updateSecurity(data) {
        return this.updateSection('security', data);
    },
    async getBackup() {
        return this.getSection('backup');
    },
    
    async updateBackup(data) {
        return this.updateSection('backup', data);
    },

    async getNotifications() {
        return this.getSection('notifications');
    },
    
    async updateNotifications(data) {
        return this.updateSection('notifications', data);
    },

    async getAnalytics() {
        return this.getSection('analytics');
    },
    
    async updateAnalytics(data) {
        return this.updateSection('analytics', data);
    },


}


// Tạo model từ schema
const Settings = mongoose.model("Settings", settingsSchema, "settings");

module.exports = Settings;
