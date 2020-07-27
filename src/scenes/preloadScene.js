import {STATIC_IMAGES_FOLDER} from '../config';
import {create,userByIdentifier} from '../objects/api';
import { Global } from '../objects/global';
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
   // this.load.image('loaderScr', STATIC_IMAGES_FOLDER+'loader/loaderBG.jpg');
    this.load.image('Logo-Home', STATIC_IMAGES_FOLDER+'title/game_logo.png');
    this.load.image('poweredBy', STATIC_IMAGES_FOLDER+'loader/poweredBy.png?v=1.0');
    
    this.load.atlas('load_anim',STATIC_IMAGES_FOLDER+'loader/load_anim.png',STATIC_IMAGES_FOLDER+'loader/load_anim.json');
    
    // text field plugin
    var url;
    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js';
    this.load.plugin('rexbbcodetextplugin', url, true);
    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js';
    this.load.plugin('rextexteditplugin', url, true);

  }

  create() {  
    Global.identifier=this.getUrlParameter("identifier");//||"5436097a31976bd4aeef946b3e10449b07059fd0b5fa40a479f6299b64d69841";
    Global.redirectUrl=this.getUrlParameter("redirectUrl");
    Global.points=parseFloat(this.getUrlParameter("points")||0);
    userByIdentifier(this.onCheck.bind(this))
    
  }
  onCheck(status,data){
    console.log(arguments)
    if((status&&data)){
      Global.remainingAttempts=data.user.playLimit.remainingAttempts||0;
    }
    if(!status){
      Global.remainingAttempts=1;
    }
    //Global.remainingAttempts=1;
    this.scene.start('Loader');
  }
  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

}
