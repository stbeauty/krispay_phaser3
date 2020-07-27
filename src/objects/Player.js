import { Global } from "./global";

export class Player extends Phaser.GameObjects.Group{
    constructor(scene){
        super(scene);

        
        this.lastSide=null;
        this.laneNumber=2;
        this.isInvincible=false;
        this.isBlinking=false;
        this.sliding=false;
        this.blinkCount=0;
        this.needtoRemove=false;

        this.resetSlideVal=this.resetSlideVal.bind(this);
        this.removePower= this.removePower.bind(this);
        this.doBlinkLoop= this.doBlinkLoop.bind(this);
        this.moveLeft=this.moveLeft.bind(this);
        this.moveRight= this.moveRight.bind(this);
    }
    init(onPowerLose){
      
        //this.extraTop=Math.abs(parseFloat(document.getElementsByTagName("canvas")[0].style.marginTop))/window.innerWidth*this.scene.game.canvas.width;

        this.onPowerLose=onPowerLose;
        // this.player= this.create(130,855,"character" );
        if(Global.playerGender == "female"){
            this.player= this.create(125,855,"girl_character" );
        }else{
            this.player= this.create(125,855,"boy_character" );
        }
       /*  this.playerWIthEnergy= this.create(130,855,"character","character0022" );
        this.switchPlayer(false); */

/*         this.scene.anims.create({ key: 'moveLeft1', frames: this.scene.anims.generateFrameNames('character', { prefix: 'character', start:0,end: 5, zeroPad: 4 }), repeat: 0,frameRate:30 });
        this.scene.anims.create({ key: 'moveLeft2', frames: this.scene.anims.generateFrameNames('character', { prefix: 'character', start:6,end: 10, zeroPad: 4 }), repeat: 0,frameRate:30 });

        this.scene.anims.create({ key: 'moveRight1', frames: this.scene.anims.generateFrameNames('character', { prefix: 'character', start:11,end: 15, zeroPad: 4 }), repeat: 0,frameRate:30 });
        this.scene.anims.create({ key: 'moveRight2', frames: this.scene.anims.generateFrameNames('character', { prefix: 'character', start:16,end: 20, zeroPad: 4 }), repeat: 0,frameRate:30 });
      
        this.scene.anims.create({ key: 'moveLeft1Energy', frames: this.scene.anims.generateFrameNames('character', { prefix: 'character', start:22,end: 27, zeroPad: 4 }), repeat: 0,frameRate:30 });
        this.scene.anims.create({ key: 'moveLeft2Energy', frames: this.scene.anims.generateFrameNames('character', { prefix: 'character', start:28,end: 32, zeroPad: 4 }), repeat: 0,frameRate:30 });

        this.scene.anims.create({ key: 'moveRight1Energy', frames: this.scene.anims.generateFrameNames('character', { prefix: 'character', start:33,end: 37, zeroPad: 4 }), repeat: 0,frameRate:30 });
        this.scene.anims.create({ key: 'moveRight2Energy', frames: this.scene.anims.generateFrameNames('character', { prefix: 'character', start:38,end: 42, zeroPad: 4 }), repeat: 0,frameRate:30 }); */
        this.player.laneNo=this.laneNumber;
    }
    /* switchPlayer(showEnergy){
        this.player.setActive(!showEnergy);
        this.player.setVisible(!showEnergy);
        this.playerWIthEnergy.setActive(showEnergy);
        this.playerWIthEnergy.setVisible(showEnergy);
    } */
    idleAnim() {
        this.player.play('idle');
        this.player.setDepth(13);
    }
    getPlayer(){
        return this.player;
    }
    makeInvincible(){
        this.isInvincible=true;
       if(!this.player.anims.isPlaying){
        // this.player.setFrame("character0022");
        this.player.play('idle');
       }
       clearTimeout(this.invincibleTimeout);
       this.invincibleTimeout=setTimeout(this.removePower,7000)
    }
    removePower(){
        
        // if(!this.player.anims.isPlaying){
            this.isInvincible=false;
            this.onPowerLose();
            // this.player.setFrame("character0000");
            this.player.play('idle');
        // }else{
        //     this.needtoRemove=true;
        // }
    }
    checkPower(){
        return this.isInvincible;
    }
    checkBlink(){
        return this.isBlinking;
    }
    checkIfNeedMove(side){
        if(this.lastSide=="left"&&this.laneNumber>1){
            this.moveLeft();
            return true;
        }
        else if(this.lastSide=="right"&&this.laneNumber<3){
            this.moveRight();
            return true;
        }
    }
    moveLeft(){
        if(this.laneNumber>1&&!this.sliding){
            this.lastSide=null;
            this.sliding=true;
            this.scene.time.addEvent({delay: 150,callback: function(){this.setDepth(13+(this.laneNumber-2)*2);}.bind(this)})
            this.player.laneNo=-1;
            this.scene.time.addEvent({
                delay: 300, // in ms
                callback: function(){
                    this.sliding=false;
                    if(!this.checkIfNeedMove()){
                        this.player.laneNo=this.laneNumber;
                        this.player.play(!this.isInvincible?'moveLeft2':'moveLeft2Energy');
                    }
        
                }.bind(this)
              });
              this.player.play(!this.isInvincible?'moveLeft1':'moveLeft1Energy');

            this.laneNumber-=1;
            this.scene.tweens.add({
                targets: (this.player.active)?this.player:this.playerWIthEnergy,
                x: (this.laneNumber==1)?55:(this.laneNumber==2)?130:200,
                y: (this.laneNumber==1)?800:(this.laneNumber==2)?855:930,
                duration: 500,
                ease: 'Cubic',
                easeParams: [ 3.5 ],
                delay: 0,
                onComplete:this.resetSlideVal
            });
        }
        else if(this.sliding){
            this.lastSide="left";
        }
        
    }
    blink(){
        if(this.isBlinking){
            return;
        }
        this.isBlinking=true;
        this.doBlinkLoop();

    }
    doBlinkLoop(){
        if(this.blinkCount<8){
            this.blinkCount++;
            this.scene.tweens.add({
                targets: this.player,
                alpha:(this.player.alpha==.1)?1:.1,
                duration: 100,
                ease: 'Cubic',
                easeParams: [ 3.5 ],
                delay: (this.player.alpha==.1)?0:0,
                onComplete:this.doBlinkLoop
            });
        }else{
            this.isBlinking=false;
            this.blinkCount=0;
        }
    }
    moveRight(){
        if(this.laneNumber<3&&!this.sliding){
            this.lastSide=null;
            this.sliding=true;
            this.laneNumber+=1;
            this.player.laneNo=-1;
            this.scene.time.addEvent({delay: 150,callback: function(){this.setDepth(13+(this.laneNumber-2)*2);}.bind(this)})
            this.scene.time.addEvent({
                delay: 300, // in ms
                callback: function(){
                    this.sliding=false;
                    if(!this.checkIfNeedMove()){
                        this.player.laneNo=this.laneNumber;
                        this.player.play((!this.isInvincible?'moveRight2':'moveRight2Energy'));

                    }
                    
                }.bind(this)
              });
              this.player.play((!this.isInvincible?'moveRight1':'moveRight1Energy'));

            this.scene.tweens.add({
                targets: (this.player.active)?this.player:this.playerWIthEnergy,
                x: (this.laneNumber==1)?55:(this.laneNumber==2)?130:200,
                y: (this.laneNumber==1)?55:(this.laneNumber==2)?855:930,
                duration: 500,
                ease: 'Cubic',
                easeParams: [ 3.5 ],
                delay: 0,
                onComplete:this.resetSlideVal
            });
        }
        else if(this.sliding){
            this.lastSide="right";
        }
    }
    /* onPlayerUpdate(){
        if(this.player.active){
            this.playerWIthEnergy.x=this.player.x;
            this.playerWIthEnergy.y=this.player.y;
            
        }else{
            this.player.x=this.playerWIthEnergy.x;
            this.player.y=this.playerWIthEnergy.y;
        }
    } */
    resetSlideVal(){
        this.sliding=false;
        this.player.play('idle');
        
        /*if(this.isInvincible){
            this.player.setFrame("character0022");  
            this.player.play('idle');          
        }
        
        if(this.needtoRemove){
            this.isInvincible=false;
            this.needtoRemove=false;
            this.onPowerLose();
        }*/
    }
    

}