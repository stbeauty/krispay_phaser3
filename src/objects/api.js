import  {Global} from './global';
const crypto = require('crypto');
import {GAME_ID, GAME_ENGINE_SERVICE} from "../config";

var isTransmiting=false;
var chunkURL=null;

function create(cb){
    const EMAIL_URL = `${GAME_ENGINE_SERVICE}/gameEngine/api/v1/game/${GAME_ID}/session`
    var request = new XMLHttpRequest();
    request.open('POST', EMAIL_URL, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {    
        if (request.status >= 200 && request.status < 400) {
            cb(request.response,true)         
        } else {
            cb(request.response,false)  
        }
    }.bind(this);
    request.onerror = function() {
        cb(request.response,false)
    }.bind(this);
    var data = JSON.stringify({identifier: Global.identifier});
    request.send(data);
}
/* function verify(cb){
    const EMAIL_URL = `${GAME_ENGINE_SERVICE}/gameEngine/api/v1/session/${Global.session_id}/verify`
    var request = new XMLHttpRequest();
    request.open('PUT', EMAIL_URL, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {   
        if (request.status >= 200 && request.status < 400) {
            if(JSON.parse(request.response)["session"]["status"]=="verified"){
                cb(true);
            }
        } else {
            cb(false);
        }
    }.bind(this);
    request.onerror = function() {
    }.bind(this);
    var data = JSON.stringify({verificationCode: Global.verifyCode});
    request.send(data);
} */
/* function activate(cb){
    const EMAIL_URL = `${GAME_ENGINE_SERVICE}/gameEngine/api/v1/session/${Global.session_id}/activate`;
    var request = new XMLHttpRequest();
    request.open('PUT', EMAIL_URL, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {   
        if (request.status >= 200 && request.status < 400) {
            cb(true,JSON.parse(request.response)["session"]["status"]);
            trackEvent(AnalyticsEvents.ACTIVATION);
        } else {
            cb(false);
        }
    }.bind(this);
    request.onerror = function() {
    }.bind(this);
    var data = JSON.stringify({verificationCode: Global.verifyCode});
    request.send(data);
} */
function userByIdentifier(cb){
    const EMAIL_URL =`${GAME_ENGINE_SERVICE}/gameEngine/api/v1/game/${GAME_ID}/users/identifier/${Global.identifier}`
    var request = new XMLHttpRequest();
    request.open('GET', EMAIL_URL, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {   
        if (request.status >= 200 && request.status < 400) {
           
            cb(true,JSON.parse(request.response));
        } else {
            cb(false);
        }
    }.bind(this);
    request.onerror = function() {
        cb(false);
    }.bind(this);

    request.send();
}
function start(cb){
    const EMAIL_URL = `${GAME_ENGINE_SERVICE}/gameEngine/api/v1/session/${Global.session_id}/start`
    var request = new XMLHttpRequest();
    request.open('PUT', EMAIL_URL, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {   
        if (request.status >= 200 && request.status < 400) {
        
            if(JSON.parse(request.response)["session"]["status"]=="playing"){
                Global.key = JSON.parse(request.response)["session"]["key"];
                Global.iv = JSON.parse(request.response)["session"]["iv"];
                cb(true,"playing");

                //trackEvent(AnalyticsEvents.PLAY_START);
            }else{
                cb(false)
            }
        } else {
            cb(false);
            
        }
    }.bind(this);
    request.onerror = function() {
    }.bind(this);
    //var data = JSON.stringify({verificationCode: Global.verifyCode});
    request.send();
}
function chunk(score) {
    if (Global.isTransmiting) {
        return;
    }
    let time = Date.now();
    let string = score + "|" + time;
    Global.coinsToSend=0;
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(Global.key, 'binary'),  Buffer.from(Global.iv, 'binary'));
    let encrypted = cipher.update(string);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    encrypted = encrypted.toString('hex');
    let data = {data: encrypted};
    data = JSON.stringify(data);
    Global.isTransmiting=true;
    chunkURL = `${GAME_ENGINE_SERVICE}/gameEngine/api/v1/session/${Global.session_id}/chunk`
    var request = new XMLHttpRequest();
    request.open('POST', chunkURL, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() { 
        Global.isTransmiting=false;
    }.bind(this);
    request.onerror = function() {
        Global.isTransmiting=false;
    }.bind(this);
    request.send(data);
}

function finish(time){
    const EMAIL_URL = `${GAME_ENGINE_SERVICE}/gameEngine/api/v1/session/${Global.session_id}/finish`
    var request = new XMLHttpRequest();
    request.open('PUT', EMAIL_URL, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {}.bind(this);
    request.onerror = function() {
    }.bind(this);
   // trackEvent(AnalyticsEvents.PLAY_END);
    var data = JSON.stringify({
        session: {
            playTime: time
        }
    });
    request.send(data);

}
function retry(cb){
    const EMAIL_URL = `${GAME_ENGINE_SERVICE}/gameEngine/api/v1/session/${Global.session_id}/retry`
    var request = new XMLHttpRequest();
    request.open('PUT', EMAIL_URL, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {   
        if (request.status >= 200 && request.status < 400) {
            Global.session_id=JSON.parse(request.response)["session"]["_id"];
            //trackEvent(AnalyticsEvents.REACTIVATION);
            cb(true,JSON.parse(request.response)["session"]["status"]);
        } else {
            cb(false);
        }
    }.bind(this);
    request.onerror = function() {
        cb(false);
    }.bind(this);
   /*  var data = JSON.stringify({
        session: {
            playTime: time
        }
    }); */
    request.send();
}

export {
    create,
    userByIdentifier,
    start,
    chunk,
    finish,
    retry
}