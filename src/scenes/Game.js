
import {STATIC_IMAGES_FOLDER} from '../config';
import { Road } from '../objects/road';
import { Player } from '../objects/Player';
import {Head} from '../objects/header';
import { Global } from '../objects/global';
import { Intro } from '../objects/intro';
import {create,start,finish,retry} from '../objects/api';
import { MessageInfo } from '../objects/message-info';
export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });

    this.road=null;
    this.player=null;
    this.intro=null;
    this.gameFinish=false;
    this.collectedCount=0;
    this.collectedMathFreq=0;
    this.gameStarted=false;
    this.timer=this.timer2=null;
    this.speedObj={
      speed:0
    };
    this.speed=6;
    this.invincibleSpeed=8;

    this.onPowerLose= this.onPowerLose.bind(this);
  }

  init(){
    this.leftKey=this.input.keyboard.addKey('LEFT');
    this.upKey=this.input.keyboard.addKey('UP');
    this.rightKey=this.input.keyboard.addKey('RIGHT');
    this.downKey=this.input.keyboard.addKey('DOWN');
  }
  create(){
    this.collectedMathFreq=20;
    this.road=null;
    this.player=null;
    this.speedObj={
      speed:0
    };
    this.speed=6;
    this.invincibleSpeed=8;
    this.collectedCount=0;
    Global.coinsToSend=0;
    Global.sessionStarted=false;
    Global.gameTime=0;
    Global.playCount++;
    this.gameFinish=false;
    this.gameStarted=false;
    if(Global.playerGender == "female"){
      this.animDetails=[
        {key:"items",animKey:"fall",prefix:"items",start:22,end:25,zeroPad:2,fps:15,repeat:0},
        {key:"items",animKey:"rotate",prefix:"items",start:0,end:7,zeroPad:2,fps:15,repeat:-1},
        {key:"items",animKey:"disappear",prefix:"items",start:8,end:17,zeroPad:2,fps:25,repeat:0},
        // {key:"character",animKey:"moveLeft1",prefix:"character",start:0,end:5,zeroPad:4,fps:30,repeat:0},
        // {key:"character",animKey:"moveLeft2",prefix:"character",start:6,end:10,zeroPad:4,fps:30,repeat:0},
        // {key:"character",animKey:"moveRight1",prefix:"character",start:11,end:15,zeroPad:4,fps:30,repeat:0},
        // {key:"character",animKey:"moveRight2",prefix:"character",start:16,end:20,zeroPad:4,fps:30,repeat:0},
        // {key:"character",animKey:"moveLeft1Energy",prefix:"character",start:22,end:27,zeroPad:4,fps:30,repeat:0},
        // {key:"character",animKey:"moveLeft2Energy",prefix:"character",start:28,end:32,zeroPad:4,fps:30,repeat:0},
        // {key:"character",animKey:"moveRight1Energy",prefix:"character",start:33,end:37,zeroPad:4,fps:30,repeat:0},
        // {key:"character",animKey:"moveRight2Energy",prefix:"character",start:38,end:42,zeroPad:4,fps:30,repeat:0},

        {key:"girl_character",animKey:"idle",prefix:"character",start:0,end:9,zeroPad:4,fps:30,repeat:-1},
        {key:"girl_character",animKey:"moveLeft1",prefix:"character",start:10,end:14,zeroPad:4,fps:30,repeat:0},
        {key:"girl_character",animKey:"moveLeft2",prefix:"character",start:15,end:19,zeroPad:4,fps:30,repeat:0},
        {key:"girl_character",animKey:"moveRight1",prefix:"character",start:20,end:24,zeroPad:4,fps:30,repeat:0},
        {key:"girl_character",animKey:"moveRight2",prefix:"character",start:25,end:29,zeroPad:4,fps:30,repeat:0},
        {key:"girl_character",animKey:"moveLeft1Energy",prefix:"character",start:10,end:14,zeroPad:4,fps:30,repeat:0},
        {key:"girl_character",animKey:"moveLeft2Energy",prefix:"character",start:15,end:19,zeroPad:4,fps:30,repeat:0},
        {key:"girl_character",animKey:"moveRight1Energy",prefix:"character",start:20,end:24,zeroPad:4,fps:30,repeat:0},
        {key:"girl_character",animKey:"moveRight2Energy",prefix:"character",start:25,end:29,zeroPad:4,fps:30,repeat:0},
      ];
    }
    else{
      this.animDetails=[
        {key:"items",animKey:"fall",prefix:"items",start:22,end:25,zeroPad:2,fps:15,repeat:0},
        {key:"items",animKey:"rotate",prefix:"items",start:0,end:7,zeroPad:2,fps:15,repeat:-1},
        {key:"items",animKey:"disappear",prefix:"items",start:8,end:17,zeroPad:2,fps:25,repeat:0},  
        {key:"boy_character",animKey:"idle",prefix:"character",start:0,end:9,zeroPad:4,fps:30,repeat:-1},
        {key:"boy_character",animKey:"moveLeft1",prefix:"character",start:10,end:14,zeroPad:4,fps:30,repeat:0},
        {key:"boy_character",animKey:"moveLeft2",prefix:"character",start:15,end:19,zeroPad:4,fps:30,repeat:0},
        {key:"boy_character",animKey:"moveRight1",prefix:"character",start:20,end:24,zeroPad:4,fps:30,repeat:0},
        {key:"boy_character",animKey:"moveRight2",prefix:"character",start:25,end:29,zeroPad:4,fps:30,repeat:0},
        {key:"boy_character",animKey:"moveLeft1Energy",prefix:"character",start:10,end:14,zeroPad:4,fps:30,repeat:0},
        {key:"boy_character",animKey:"moveLeft2Energy",prefix:"character",start:15,end:19,zeroPad:4,fps:30,repeat:0},
        {key:"boy_character",animKey:"moveRight1Energy",prefix:"character",start:20,end:24,zeroPad:4,fps:30,repeat:0},
        {key:"boy_character",animKey:"moveRight2Energy",prefix:"character",start:25,end:29,zeroPad:4,fps:30,repeat:0},
      ];
    }
    


      // this.bg= this.add.sprite(this.game.canvas.width*.5,this.game.canvas.height*.5,(Global.env_type=="Concepcion")?"cityBG":"beachBG");
      this.bg= this.add.sprite(this.game.canvas.width*.5,this.game.canvas.height*.5,"cityBG");
      this.road= new Road(this);
      this.player= new Player(this);
      this.head= new Head(this);
      this.messageInfo= new MessageInfo(this);
      this.messageInfo.init();
      this.bg.setScrollFactor(0)
      


      this.road.init(this.messageInfo.showInfo.bind(this.messageInfo));
      this.player.init(this.onPowerLose);
      this.head.init();

      this.road.setDepth(0);
      this.player.setDepth(12);
      this.head.setDepth(30);
      this.messageInfo.setDepth(31);

      this.initAnims();
      this.initControl();
      this.mainCamera = this.cameras.main;
      
      this.player.idleAnim();

      
      
      if(!Global.introShown){

        this.showIntro();
      }else{
        this.startGame();
      }
      create(this.onCreate.bind(this))
     
  }
  
  onCreate(data,status){

    this._data=JSON.parse(data);
    Global.first_session_id=Global.session_id=this._data["session"]["_id"];
    start(this.onStart.bind(this));
  }

  onStart(){
    Global.sessionStarted=true;
  }
  initAnims(){
    this.animDetails.forEach(function(_animData){
      this.anims.create({key:_animData.animKey,frames:this.anims.generateFrameNames(_animData.key,{ prefix:_animData.prefix,start:_animData.start,end:_animData.end,zeroPad:_animData.zeroPad }),repeat:_animData.repeat,frameRate:_animData.fps});
    }.bind(this))
  }
  showIntro(){
    
  //  this.mainCamera.startFollow(this.player.player,false,.1,.1,-200,200);
    //this.mainCamera.stopFollow();
    //this.mainCamera.setScroll(0.5)
   //this.mainCamera.zoomTo(1.2,500)
    this.intro= new Intro(this);
    this.intro.init(this.startGame.bind(this));
    this.intro.setDepth(11)
    //this.startGame();
  }
  startGame(){
    this.playSkateBoardSAudio(Global.skateNormalAudio)
    Global.background_music.play()
    if(this.intro){
      this.intro.destroy(true);
    }
    setTimeout(function(){this.gameStarted=true;}.bind(this),500)
    this.setSpeed(this.speed,1000);
    this.initSpeedIncrement();
  }
  initSpeedIncrement(){
      this.timer = this.time.addEvent({
          delay: 2000,                
          callback: this.updateGameSpeed,
          //args: [],
          callbackScope: this,
          repeat: -1
      });
      this.timer2 = this.time.addEvent({
        delay: 1000,                
        callback: this.updateGameTime,
        //args: [],
        callbackScope: this,
        repeat: -1
    });
  }
  updateGameTime(){
    Global.gameTime++;
  }
  updateGameSpeed(){
    console.log("Update Speed")
    this.speed+=.3;//.01;
    this.invincibleSpeed+=.3;//.01;
    if(!this.player.checkBlink()&&!this.player.checkPower()&&!this.gameFinish)
      this.setSpeed(this.speed,400);
  }
  update(){
    this.road.update();
    this.checkPlayerCollision();
  }
  setSpeed(_speed,_time,_ease='Linear'){
    this.tweens.add({
      targets: this.speedObj,
      speed: _speed,
      duration: _time,
      ease: _ease,
      delay: 0,
      onUpdate:function(){this.road.updateSpeed(this.speedObj.speed)}.bind(this)
  });
  //this.road.updateSpeed(this.gameSpeed);
  }
  playSkateBoardSAudio(obj){
    Global.skateNormalAudio.stop();
    Global.skateSpeedAudio.stop();
    obj.play();
  }
  checkPlayerCollision(){
    this.items=this.road.getItems();
    this.playerSpr= this.player.getPlayer();
    this.playerBound=this.playerSpr.getBounds();
    this.items.forEach(function(_item){
      if(_item.laneNo==this.playerSpr.laneNo){
        if(Phaser.Geom.Intersects.GetRectangleIntersection(this.playerBound,_item.getBounds()).width>_item.width*_item.collideFact&&!_item.collisionProcessed&&(_item.y)>=this.playerSpr.y&&(_item.y-this.playerSpr.width*(_item.item_type=="obstacle"?.5:.75))<=this.playerSpr.y){//
          _item.collisionProcessed=true;
         
          if(_item.shouldRotate){
              this.tweens.add({
                  targets: _item,
                  angle:60,
                  x:_item.x-150,
                  y:_item.y+130,
                  duration: 500,
                  ease: 'Linear'
              });
          }
          if(_item.finalAnimKey){
            _item.play(_item.finalAnimKey);
          }
          if(_item.item_type=="collectable"){
            
            if(!this.gameFinish){
              Global.coinAudio.play();
              this.head.updateScore(1);
              this.collectedCount++;
              if(this.collectedCount>0&&this.collectedCount%this.collectedMathFreq==0){
                this.collectedMathFreq+=40;
                this.messageInfo.showInfo("coin_info");
              }
            }
           
          }
          else if(_item.item_type=="obstacle"&&!this.player.checkPower()){
             
              if(!this.gameFinish){
                if(_item.isStatic){
                    Global.obstcleCrashAudio.play();
                }else{
                  Global.carCrashAudio.play();
                }
                this.head.updateHealth(1);
                this.player.blink();
                this.setSpeed(this.speed*.75,500,'Linear');
                clearTimeout(this.speedTimeout)
                this.speedTimeout= setTimeout(this.setSpeed.bind(this,this.speed,500,'Linear'),1000)
              }

              if(this.head.getHealth()<1&&!this.gameFinish){
                this.finishGame();
              }
          }else if(_item.item_type=="invincible"){
            if(!this.gameFinish){
              Global.energyAudio.play();
              this.playSkateBoardSAudio(Global.skateSpeedAudio)
              this.player.makeInvincible();
              console.log("speedupdate/speedup")
              clearTimeout(this.speedTimeout)
              this.setSpeed(this.invincibleSpeed,500,'Linear');
            }
          
            _item.setVisible(false);
            _item.setActive(false);
          }
      }
    }
    }.bind(this))

  }
  finishGame(){

    this.gameFinish=true;
    Global.coinsTotal=this.head.getScore();
    
    clearTimeout(this.speedTimeout)
    setTimeout(this.setSpeed.bind(this,0,1000),1000);
    setTimeout(this.showScore.bind(this),1800)
   // alert("Finsih")
  }
  showScore(){
    this.timer.paused = true;
    this.timer2.paused = true;
    finish(Global.gameTime);
    Global.playedInsession=true;
    Global.skateNormalAudio.stop();
    this.scene.start('Score');
  }
  initControl(){
    this.input.on('pointerdown', function(pointer){
      var touchX = pointer.x;
      var touchY = pointer.y;
      if(this.gameStarted){
        if(touchX<=this.game.canvas.width*.5){
          this.player.moveLeft();
        }else{
          this.player.moveRight();
        }
      }
      
    
   }.bind(this));
    this.swipe = this.plugins.get('Phaser3Swipe');
    this.swipe.cargar(this);
    this.input.keyboard.on('keydown_LEFT', this.player.moveLeft);
    this.input.keyboard.on('keydown_UP', this.player.moveLeft);
    this.input.keyboard.on('keydown_RIGHT', this.player.moveRight);
    this.input.keyboard.on('keydown_DOWN', this.player.moveRight);
 
  /*   this.events.on("swipe", function(e){
      if((e.right||e.down)&&!this.gameFinish&&this.gameStarted) {
          this.player.moveRight();
      }
      else if((e.left||e.up)&&!this.gameFinish&&this.gameStarted) {
        this.player.moveLeft();
      }
  }.bind(this))   */
  }
  onPowerLose(){
    this.playSkateBoardSAudio(Global.skateNormalAudio)
    this.setSpeed(this.speed,500,'Linear');
  }
}