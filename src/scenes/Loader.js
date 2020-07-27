import {STATIC_IMAGES_FOLDER,STATIC_SOUNDS_FOLDER} from '../config';
import Phaser3Swipe from 'phaser3-swipe';
import { Global } from '../objects/global';


export default class Loader extends Phaser.Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  init(){
      this.loaderPercentage=0;
      this.extraTop=Math.abs(parseFloat(document.getElementsByTagName("canvas")[0].style.marginTop))/window.innerWidth*this.game.canvas.width;
      this.extraLeftPer=Math.abs(parseFloat(document.getElementsByTagName("canvas")[0].style.marginLeft))/window.innerWidth;
      this.extraLeftPer=(this.extraLeftPer==0)?1/window.innerWidth:this.extraLeftPer;
      (!Global.isMobile)&&(this.extraLeftPer=0);
      this.loaderPos=0;
      this.bg= this.add.graphics();
      this.bg.fillStyle(0x01276c,1)
      this.homeLogo= this.add.image(this.game.canvas.width*.5,this.game.canvas.height*.17+this.extraTop,"Logo-Home");
      this.homeLogo.setScale(.8);
      this.loaderGr= this.add.group();
    
      this.bg.fillRect(0,0,this.game.canvas.width,this.game.canvas.height);
      this.loaderGr.add(this.bg);

      this.poweredBy= this.loaderGr.create(this.game.canvas.width*.5,this.game.canvas.height*.83-this.extraTop,"poweredBy")
      this.loaderChar= this.loaderGr.create(this.game.canvas.width*.5,this.game.canvas.height*.5,"load_anim")
      this.anims.create({key:'loaderAnim',frames:this.anims.generateFrameNames('load_anim',{ prefix:'loading',start:0,end:88,zeroPad:0 }),repeat:-1,frameRate:30});
      this.loaderChar.play('loaderAnim')
      this.poweredBy.setScale(this.game.canvas.width*.001);


    this.loaderBG = this.add.graphics();
    this.loaderPer = this.add.graphics();

    this.loaderBG.fillStyle(0xffffff, .4);
    this.loaderBG.fillRoundedRect(this.game.canvas.width*.2, this.game.canvas.height*.75-this.extraTop, this.game.canvas.width*.6, 10, 5);
    
   
    this.loaderGr.add(this.loaderBG);
    this.loaderGr.add(this.loaderPer);
      this.load.on('progress', this.onProgress.bind(this))
  }
  onProgress(v){
    this.loaderGr.clear();
    this.loaderPer.fillStyle(0xffffff, 1);
    this.loaderPer.fillRoundedRect(this.game.canvas.width*.2, this.game.canvas.height*.75-this.extraTop, this.game.canvas.width*.6*v, 10, 5);

    
  }
  preload() {
    this.load.plugin("Phaser3Swipe", Phaser3Swipe, true);
    this.load.image('HomeBG', STATIC_IMAGES_FOLDER+'title/bg_1.png');
    
    this.load.image('SeGirl', STATIC_IMAGES_FOLDER+'title/girl.png');
    this.load.image('DeGirl', STATIC_IMAGES_FOLDER+'title/girl_gray.png');
    this.load.image('Girl-Skater', STATIC_IMAGES_FOLDER+'title/girl_skater.png');
    this.load.image('SeName', STATIC_IMAGES_FOLDER+'title/Selected.png');
    this.load.image('Amelia', STATIC_IMAGES_FOLDER+'title/Amelia.png');

    this.load.image('SeBoy', STATIC_IMAGES_FOLDER+'title/boy.png');
    this.load.image('DeBoy', STATIC_IMAGES_FOLDER+'title/boy_gray.png');
    this.load.image('Boy-Skater', STATIC_IMAGES_FOLDER+'title/boy_skater.png');
    this.load.image('DeName', STATIC_IMAGES_FOLDER+'title/DeSelected.png');
    this.load.image('James', STATIC_IMAGES_FOLDER+'title/James.png');
    this.load.image('DeSkater', STATIC_IMAGES_FOLDER+'title/inactive_skater.png');
    this.load.image('BtnPlay', STATIC_IMAGES_FOLDER+'title/play_btn.png');

    this.load.image('cityBG',STATIC_IMAGES_FOLDER+'game/city/cityBG.jpg');
    this.load.image('beachBG',STATIC_IMAGES_FOLDER+'game/beach/bg.jpg');
    this.load.image("sea",STATIC_IMAGES_FOLDER+'game/beach/sea.png')
    this.load.image('game-head',STATIC_IMAGES_FOLDER+'game/game_play.png');
    this.load.image('life',STATIC_IMAGES_FOLDER+'game/heart.png');
    this.load.image('coin',STATIC_IMAGES_FOLDER+'game/waffle.png');
    this.load.audio('beachBG',STATIC_SOUNDS_FOLDER+'beach.mp3');
    this.load.audio('cityBG',STATIC_SOUNDS_FOLDER+'city.mp3');

    this.load.audio('button',STATIC_SOUNDS_FOLDER+'button.mp3');
    this.load.audio('coin',STATIC_SOUNDS_FOLDER+'coin.mp3');
    this.load.audio('energy',STATIC_SOUNDS_FOLDER+'energy.mp3');
    this.load.audio('skate-normal',STATIC_SOUNDS_FOLDER+'skate-normal.mp3');
    this.load.audio('skate-speed',STATIC_SOUNDS_FOLDER+'skate-speed.mp3');
    this.load.audio('crash-car',STATIC_SOUNDS_FOLDER+'crash-car.mp3');
    this.load.audio('crash-obstacle',STATIC_SOUNDS_FOLDER+'crash-obstacle.mp3');
    this.load.audio('background_music',STATIC_SOUNDS_FOLDER+'Vans_MUSIC_1.mp3');

    /* Game Assets loads here */
    this.load.atlas('spr_items',STATIC_IMAGES_FOLDER+'items.png',STATIC_IMAGES_FOLDER+'items.json');
    this.load.atlas('popup',STATIC_IMAGES_FOLDER+'game/popup.png',STATIC_IMAGES_FOLDER+'game/popup.json');
    this.load.image('Character-Message',STATIC_IMAGES_FOLDER+'game/Character-Message.png');
    
    

    this.load.atlas('beach_items',STATIC_IMAGES_FOLDER+'game/beach/beach_items.png',STATIC_IMAGES_FOLDER+'game/beach/beach_items.json')

    this.load.atlasXML('buildings',STATIC_IMAGES_FOLDER+'game/city/buildings.png',STATIC_IMAGES_FOLDER+'game/city/buildings.xml')
    this.load.atlas('concepcions',STATIC_IMAGES_FOLDER+'game/city/concepcions.png',STATIC_IMAGES_FOLDER+'game/city/concepcions.json');
    this.load.atlas('santiagos',STATIC_IMAGES_FOLDER+'game/city/santiagos.png',STATIC_IMAGES_FOLDER+'game/city/santiagos.json');
    this.load.atlas('valparaisos',STATIC_IMAGES_FOLDER+'game/city/valparaisos.png',STATIC_IMAGES_FOLDER+'game/city/valparaisos.json');
    this.load.atlasXML('items',STATIC_IMAGES_FOLDER+'game/items1.png',STATIC_IMAGES_FOLDER+'game/items1.xml')

    // this.load.atlas('character',STATIC_IMAGES_FOLDER+'game/character/character.png',STATIC_IMAGES_FOLDER+'game/character/character.json')
    this.load.atlas('girl_character',STATIC_IMAGES_FOLDER+'game/character/female.png',STATIC_IMAGES_FOLDER+'game/character/female.json')
    this.load.atlas('boy_character',STATIC_IMAGES_FOLDER+'game/character/male.png',STATIC_IMAGES_FOLDER+'game/character/male.json')
    
    this.load.atlasXML('items_on_road',STATIC_IMAGES_FOLDER+'game/items_on_road.png',STATIC_IMAGES_FOLDER+'game/items_on_road.xml')
    // this.load.atlasXML('city_road',STATIC_IMAGES_FOLDER+'game/city_road.png',STATIC_IMAGES_FOLDER+'game/city_road.xml')
    // this.load.atlasXML('beach_road',STATIC_IMAGES_FOLDER+'game/beach_road.png',STATIC_IMAGES_FOLDER+'game/beach_road.xml')
    this.load.atlasXML('Concepcion_road',STATIC_IMAGES_FOLDER+'game/Concepcion_road.png',STATIC_IMAGES_FOLDER+'game/Concepcion_road.xml')
    this.load.atlasXML('Valparaiso_road',STATIC_IMAGES_FOLDER+'game/Valparaiso_road.png',STATIC_IMAGES_FOLDER+'game/Valparaiso_road.xml')
    this.load.atlasXML('Santiago_road',STATIC_IMAGES_FOLDER+'game/Santiago_road.png',STATIC_IMAGES_FOLDER+'game/Santiago_road.xml')
    this.load.atlasXML('city_elements',STATIC_IMAGES_FOLDER+'game/city/elements.png',STATIC_IMAGES_FOLDER+'game/city/elements.xml')
    this.load.image('sign_board',STATIC_IMAGES_FOLDER+'game/city/sign_board.png');
    this.load.image('sign_board_leg',STATIC_IMAGES_FOLDER+'game/city/sign_board_leg.png');
    this.load.image('street_guide_board_Concepcion',STATIC_IMAGES_FOLDER+'game/city/Concepcion.png')
    this.load.image('street_guide_board_Santiago',STATIC_IMAGES_FOLDER+'game/city/Santiago.png')
    this.load.image('street_guide_board_Valparaiso',STATIC_IMAGES_FOLDER+'game/city/Valparaiso.png')
    this.load.atlas('envi_type', STATIC_IMAGES_FOLDER+'game/envi_type.png', STATIC_IMAGES_FOLDER+'game/envi_type.json')
    this.load.atlas('waffle', STATIC_IMAGES_FOLDER+'game/waffle.png', STATIC_IMAGES_FOLDER+'game/waffle.json')
    this.load.image('score_box', STATIC_IMAGES_FOLDER+'game/score_box.png')
    this.load.image('submit_btn', STATIC_IMAGES_FOLDER+'game/submit_btn.png')
    this.load.image('txtfld', STATIC_IMAGES_FOLDER+'game/text_field.png')
  }
  
  create() {
    this.scene.start('Title');
    
  }
}
