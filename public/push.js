var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BDBoNWwgIy0-MBSXqpmWH-F5yQjGZh8N7vZoYGWM3CgH4ipMbd-sLm4C-t6qDgvXvql-zpvQThroi3pQ_U_Xua4",
    "privateKey": "81P-Tv8JO8_1SbHqOXUxNlCwab7EXXPw9UFTfen4N4A"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/clE2-CNcBHA:APA91bG388XOGtwNGYHq_XVKyD5LCAwYSR5RCu-bqaoudqsQb9tU010BUgjFetSfQaxDkHRQGeC82lCVj6eeFAcID_CAYeTtogqDTO1F3P3cUcmpr0XPFNBBoQ2SFmeMp-rOkz_lyAs-",
    "keys": {
        "p256dh": "BI3DAG1Y95WHMO+WfIRakRGLkKIzWkFepVgmNEHdpXz1VLWUy2AJJwQjpAQ3iabkrV/b6XoW1YgTzSbx4m16IsU=",
        "auth": "Pvsv2OWSdwbFUFzj+Aplfw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '503921129857',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);