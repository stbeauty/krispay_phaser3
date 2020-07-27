import {STATIC_IMAGES_FOLDER} from '../config';
import { Global } from '../objects/global';

export default class Title extends Phaser.Scene {
  constructor() {
    super({ key: 'Title' })
  }

  init(){}
  create(){
    Global.buttonAudio= this.sound.add("button");
    Global.coinAudio= this.sound.add("coin");
    Global.energyAudio= this.sound.add("energy");
    Global.obstcleCrashAudio= this.sound.add("crash-obstacle");
    Global.carCrashAudio= this.sound.add("crash-car");
    Global.skateNormalAudio= this.sound.add("skate-normal",{
      mute: false,
      volume: .08,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
  });
  Global.background_music= this.sound.add("background_music",{
    mute: false,
    volume: .5,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
});
  Global.beachAudio= this.sound.add("beachBG",{
    mute: false,
    volume: .5,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
});
Global.cityAudio= this.sound.add("cityBG",{
  mute: false,
  volume: .2,
  rate: 1,
  detune: 0,
  seek: 0,
  loop: true,
  delay: 0
});
    Global.skateSpeedAudio= this.sound.add("skate-speed",{
      mute: false,
      volume: .08,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
  });


    this.extraTop=Math.abs(parseFloat(document.getElementsByTagName("canvas")[0].style.marginTop))/window.innerWidth*this.game.canvas.width;

    this.homeBG= this.add.sprite(this.game.canvas.width*.5,this.game.canvas.height*.5,"HomeBG");
    this.homeLogo= this.add.sprite(this.game.canvas.width*.5,150,"Logo-Home")
    // this.homeCharacter= this.add.sprite(this.game.canvas.width*.56,this.game.canvas.height*.57,"spr_items","HomeCharacter");
    this.SeHomeGirl= this.add.sprite(190,415,"SeGirl");
    this.DeHomeGirl = this.add.sprite(190, 415, "DeGirl");    
    this.SeHomeBoy = this.add.sprite(530, 410, "SeBoy");
    this.DeHomeBoy= this.add.sprite(530,410,"DeBoy");
    
    this.SeGirlNameBG = this.add.sprite(190, 605, "SeName");
    this.DeGirlNameBG = this.add.sprite(190, 605, "DeName");
    this.SeBoyNameBG = this.add.sprite(530, 605, "SeName");
    this.DeBoyNameBG = this.add.sprite(530, 605, "DeName");
    this.GirlName = this.add.sprite(240, 605, "Amelia");
    this.BoyName = this.add.sprite(570, 605,"James");
    this.GirlSkater = this.add.sprite(117, 587, "Girl-Skater");
    this.BoySkater = this.add.sprite(455, 587, "Boy-Skater");
    this.DeGirlSkater = this.add.sprite(117, 587, "DeSkater");
    this.DeBoySkater = this.add.sprite(455, 587, "DeSkater");

    // this.playBtn= this.add.sprite(this.game.canvas.width*.5,this.game.canvas.height*.91-this.extraTop*.9,"spr_items","btnplay")
    this.BtnPlay= this.add.sprite(this.game.canvas.width*.5, 1120, "BtnPlay");
  //   this.platTxt = this.make.text({
  //     x: this.game.canvas.width*.5,
  //     y: this.game.canvas.height*.912-this.extraTop*.9,
  //     text: "Play",
  //     origin: {
  //         x: 0.5,
  //         y: 0.5
  //     },
  //     style: {
  //         font: 'bold 45px CodeProLC',
  //         fill: '#ffffff',
  //         wordWrap: {
  //             width: 300
  //         }
  //     }
  // });
  // this.homeCharacter.setScale(.85);

    this.DeHomeGirl.setVisible(false)
    this.DeGirlNameBG.setVisible(false)
    this.DeGirlSkater.setVisible(false)
    this.SeHomeBoy.setVisible(false)
    this.SeBoyNameBG.setVisible(false)
    this.BoySkater.setVisible(false)
 

  if(Global.remainingAttempts==0){
    this.scene.start('Score');
  }
/*   this.playBtn.setVisible(Global.remainingAttempts!=0);
  this.platTxt.setVisible(Global.remainingAttempts!=0); */
  /*  this.playBtn.setInteractive().on('pointerdown', function (event) {
      Global.buttonAudio.play();
      this.gotoMenu();

  }.bind(this));  */


  this.BtnPlay.setInteractive().on('pointerdown', function (event) {
    Global.buttonAudio.play();
    this.gotoMenu();

  }.bind(this));

  this.DeHomeBoy.setInteractive().on('pointerdown', this.onGenderChoose.bind(this,this.DeHomeBoy));
  this.DeBoyNameBG.setInteractive().on('pointerdown', this.onGenderChoose.bind(this));
  this.DeGirlNameBG.setInteractive().on('pointerdown', this.onGenderChoose.bind(this));
  this.DeHomeGirl.setInteractive().on('pointerdown', this.onGenderChoose.bind(this));
  }

  onGenderChoose(){
    if(Global.playerGender == "female"){
      this.SeHomeGirl.setVisible(false)
      this.SeGirlNameBG.setVisible(false)
      this.GirlSkater.setVisible(false)
      this.DeHomeGirl.setVisible(true)
      this.DeGirlNameBG.setVisible(true)
      this.DeGirlSkater.setVisible(true)
      this.SeHomeBoy.setVisible(true)
      this.SeBoyNameBG.setVisible(true)
      this.BoySkater.setVisible(true)
      this.DeHomeBoy.setVisible(false)
      this.DeBoyNameBG.setVisible(false)
      this.DeBoySkater.setVisible(false)
      Global.playerGender = "male";
    }
    else{
      this.SeHomeGirl.setVisible(true)
      this.SeGirlNameBG.setVisible(true)
      this.GirlSkater.setVisible(true)
      this.DeHomeGirl.setVisible(false)
      this.DeGirlNameBG.setVisible(false)
      this.DeGirlSkater.setVisible(false)
      this.SeHomeBoy.setVisible(false)
      this.SeBoyNameBG.setVisible(false)
      this.BoySkater.setVisible(false)
      this.DeHomeBoy.setVisible(true)
      this.DeBoyNameBG.setVisible(true)
      this.DeBoySkater.setVisible(true)
      Global.playerGender = "female";
    }
    
  }
  gotoMenu(){
    this.scene.start('Level');
  }

}