import { Global } from "./global";

export class MessageInfo extends Phaser.GameObjects.Group{
    constructor(scene){
        super(scene);

     

    }
    init(finalCb){
        this.extraTop=Math.abs(parseFloat(document.getElementsByTagName("canvas")[0].style.marginTop))/window.innerWidth*this.scene.game.canvas.width;

        this.messageCharacter= this.create(this.scene.game.canvas.width,this.scene.game.canvas.height*.93-this.extraTop,"Character-Message");
        this.messageBox=this.create(this.scene.game.canvas.width*.4,this.scene.game.canvas.height*.82-this.extraTop,"popup")
        this.messageCharacter.setScale(this.scene.game.canvas.width*.0013);
        this.messageBox.setScale(this.scene.game.canvas.width*.0013);
        this.showOrHideInfo(true);
       
        
    }
    showOrHideInfo(){
        this.messageCharacter.x=this.scene.game.canvas.width+this.messageCharacter.width*.5;
        this.messageBox.y= this.scene.game.canvas.height*.85-this.extraTop;
        this.messageCharacter.setAlpha(0)
        this.messageBox.setAlpha(0)
    }
    hideInfo(){
        this.scene.tweens.add({
            targets: this.messageCharacter,
            x: this.scene.game.canvas.width+this.messageCharacter.width*.5,
            alpha:0,
            duration: 500,
            ease: 'Back',
            easeParams: [ .5 ],
            delay: 250
        });
        this.scene.tweens.add({
            targets: this.messageBox,
            y: this.scene.game.canvas.height*.85-this.extraTop,
            alpha:0,
            duration: 500,
            ease: 'Back',
            easeParams: [ .5 ],
            delay: 0
        });
    }
    showInfo(type){
        this.messageBox.setFrame(type);
        this.scene.tweens.add({
            targets: this.messageCharacter,
            x: this.scene.game.canvas.width,
            alpha:1,
            duration: 500,
            ease: 'Back',
            easeParams: [ .5 ],
            delay: 0,
            onComplete:function(){
                setTimeout(this.hideInfo.bind(this),1000)
            }.bind(this)
        });
        this.scene.tweens.add({
            targets: this.messageBox,
            y: this.scene.game.canvas.height*.82-this.extraTop,
            alpha:1,
            duration: 500,
            ease: 'Back',
            easeParams: [ .5 ],
            delay: 250
        });
    }

}