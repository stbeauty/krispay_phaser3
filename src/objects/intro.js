import { Global } from "./global";

export class Intro extends Phaser.GameObjects.Group{
    constructor(scene){
        super(scene);

        this.introStatus=1;

    }
    init(finalCb){
        this.introStatus=1;
        Global.introShown=true;
        this.finalCb=finalCb;
        this.introStatus=1;
        this.extraTop=Math.abs(parseFloat(document.getElementsByTagName("canvas")[0].style.marginTop))/window.innerWidth*this.scene.game.canvas.width;

        this.introGr= this.scene.add.graphics();
        this.introGr.setPosition(0,0);
        this.introGr.fillStyle(0x000000,.5);
        this.add(this.introGr);
        this.introGr.fillRect(0,0,this.scene.game.canvas.width,this.scene.game.canvas.height);
        this.introTxt = this.scene.make.text({
            x: this.scene.game.canvas.width*.5,
            y: this.scene.game.canvas.height*.3+this.extraTop,
            text: "",
            origin: {
                x: 0.5,
                y: 0.5
            },
            style: {
                font: 'bold 35px CodeProLC',
                fill: '#ffffff',
                lineSpacing:15,
                align:"center"
               
            }
        });
        this.add(this.introTxt);
        this.continueBtn= this.scene.add.sprite(this.scene.game.canvas.width*.5,this.scene.game.canvas.height*.84-this.extraTop*.9-20,"spr_items","buttonReplay")

        this.skipBtn= this.scene.add.sprite(this.scene.game.canvas.width*.5,this.scene.game.canvas.height*.93-this.extraTop*.9,"spr_items","btnplay")
       // this.skipIcon= this.scene.add.sprite(this.scene.game.canvas.width*.7,this.scene.game.canvas.height*.91-this.extraTop*.8,"spr_items","arrow")
       
    this.skipTxt = this.scene.make.text({
      x: this.scene.game.canvas.width*.5-45,
      y: this.scene.game.canvas.height*.927-this.extraTop*.9,
      text: "Next       >",
      origin: {
          x: 0.5,
          y: 0.5
      },
      align: 'center',
      style: {
          font: 'bold 45px CodeProLC',
          fill: '#ffffff',
          align:"center"
      }
  });
  this.skipTxt.setOrigin(0,.5);
  this.continueTxt = this.scene.make.text({
    x: this.scene.game.canvas.width*.5,
    y: this.scene.game.canvas.height*.84-this.extraTop*.9-20,
    text: "Skip",
    origin: {
        x: 0.5,
        y: 0.5
    },
    align: 'center',
    style: {
        font: 'bold 45px CodeProLC',
        fill: '#062361',
        align:"center"
    }
});
  this.coin= this.create(this.scene.game.canvas.width*.5,this.scene.game.canvas.height*.5,"items");
  this.con= this.create(this.scene.game.canvas.width*.31,this.scene.game.canvas.height*.55,"items","items22");
  this.barricade= this.create(this.scene.game.canvas.width*.7,this.scene.game.canvas.height*.52,"items","items18");
  this.coin.setActive(false);
  this.coin.setVisible(false);

  this.con.setActive(false);
  this.con.setVisible(false);

  this.barricade.setActive(false);
  this.barricade.setVisible(false);

  /* console.log(this.scene.anims)
  this.introGr.setScrollFactor(0)
  this.skipBtn.setScrollFactor(0)
  this.skipTxt.setScrollFactor(0)
  this.introTxt.setScrollFactor(0)
  this.introGr.setScrollFactor(0) */

  this.skipBtn.setInteractive().on('pointerdown', function (event) {
        this.gotoNext();

    }.bind(this));
    this.continueBtn.setInteractive().on('pointerdown', this.finalCb.bind(this));
  this.add(this.skipBtn)
  this.add(this.skipTxt)
  this.add(this.continueBtn)
  this.add(this.continueTxt)
        this.showIntro1();
    }
    showIntro1(){
        this.introTxt.text="Tap left and right to\nsteer your skateboard" 
    }
    gotoNext(){
        Global.buttonAudio.play();
        this.introStatus++;
        if(this.introStatus==2){
            this.introTxt.text="Pick up the coins for\nbonus points!" 
            this.coin.setActive(true)
            this.coin.setVisible(true);
            this.coin.play("rotate");
        }
        else if(this.introStatus==3){
            this.coin.play("disappear");
            setTimeout(function(){
                this.coin.setActive(false);
                this.coin.setVisible(false);
            }.bind(this),400);
            this.introTxt.text="Avoid obstacles!" ;
            this.con.setActive(true);
            this.con.setVisible(true);

            this.barricade.setActive(true);
            this.barricade.setVisible(true);
        }
        else{
            this.finalCb();
        }
    }

}