
import {STATIC_IMAGES_FOLDER} from '../config';
import { Global } from '../objects/global';

export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: 'Level' })
  }

  init(){}
  create(){
    this.extraTop=Math.abs(parseFloat(document.getElementsByTagName("canvas")[0].style.marginTop))/window.innerWidth*this.game.canvas.width;
    this.extraLeftPer=Math.abs(parseFloat(document.getElementsByTagName("canvas")[0].style.marginLeft))/window.innerWidth*this.game.canvas.width;
    this.extraLeftPer=(this.extraLeftPer==0)?1/window.innerWidth:this.extraLeftPer;
    (!Global.isMobile)&&(this.extraLeftPer=0);
    this.levelGr= this.add.group();
    this.levelBG= this.add.graphics();
    this.levelBG.setPosition(0,0);
    this.levelBG.fillStyle(0xffb844,1);
    this.levelGr.add(this.levelBG);
    this.levelBG.fillRect(0,0,this.game.canvas.width,this.game.canvas.height);
    this.levelLogo= this.add.sprite(580-this.game.canvas.width*this.extraLeftPer*.5,50+this.extraTop,"Logo-Home");
    this.levelLogo.setOrigin(.5,0)
    this.levelLogo.setScale(0.4)
    //this.levelLogo.y+=this.levelLogo.height;//+50
    this.levelHead = this.make.text({
        x: this.game.canvas.width*.5,
        y: this.game.canvas.height*.2+this.extraTop*.8,
        text: "Select Level",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: 'bold 60px CodeProLC',
            fill: '#ffffff',
            wordWrap: {
                width: 700
            }
        }
    });


    // this.cityIcon= this.add.sprite(this.game.canvas.width*.5,550+this.extraTop*.2,"spr_items","city_selected")
    // this.beachIcon= this.add.sprite(this.game.canvas.width*.5,830,"spr_items","beach")
    this.ConcepcionIcon= this.add.sprite(this.game.canvas.width*.5,300+this.extraTop*.2,"envi_type","SeConcepcion")
    this.SantiagoIcon= this.add.sprite(this.game.canvas.width*.5,565,"envi_type","DeSantiago")
    this.ValparaisoIcon= this.add.sprite(this.game.canvas.width*.5,830,"envi_type","DeValparaiso")
    this.continue= this.add.sprite(this.game.canvas.width*.5,1130-this.extraTop*.8,"spr_items","continueBtn")
    this.continueIcon= this.add.sprite(this.game.canvas.width*.7,1130-this.extraTop*.8,"spr_items","arrow")
    /*this.cityIcon.setData('isActive',true);
    this.cityIcon.setData('env_type','city');
    this.beachIcon.setData('isActive',false);
    this.beachIcon.setData('env_type','beach');

    this.cityIcon.setScale(this.game.canvas.width*.0011);
    this.beachIcon.setScale(this.game.canvas.width*.0011);*/
    this.ConcepcionIcon.setData('isActive',true);
    this.ConcepcionIcon.setData('env_type','Concepcion');
    this.SantiagoIcon.setData('isActive',false);
    this.SantiagoIcon.setData('env_type','Santiago');
    this.ValparaisoIcon.setData('isActive',false);
    this.ValparaisoIcon.setData('env_type','Valparaiso');

    this.ConcepcionIcon.setScale(this.game.canvas.width*.0011);
    this.SantiagoIcon.setScale(this.game.canvas.width*.0011);
    this.ValparaisoIcon.setScale(this.game.canvas.width*.0011);

    // this.beachIcon.setInteractive().on('pointerdown', this.onEnvChoose.bind(this,this.beachIcon));
    // this.cityIcon.setInteractive().on('pointerdown', this.onEnvChoose.bind(this,this.cityIcon));
    this.ConcepcionIcon.setInteractive().on('pointerdown', this.onEnvChoose.bind(this,this.ConcepcionIcon));
    this.SantiagoIcon.setInteractive().on('pointerdown', this.onEnvChoose.bind(this,this.SantiagoIcon));
    this.ValparaisoIcon.setInteractive().on('pointerdown', this.onEnvChoose.bind(this,this.ValparaisoIcon));
    this.continue.setInteractive().on('pointerdown', this.gotoGame.bind(this,this.continue));
    

    this.continueTxt = this.make.text({
            x: this.game.canvas.width*.5,
            y: 1135-this.extraTop*.8,
            text: "Continue",
            origin: {
                x: 0.5,
                y: 0.5
            },
            style: {
                font: 'bold 45px CodeProLC',
                fill: '#ffffff',
                wordWrap: {
                    width: 700
                }
            }
        });
    }
    onEnvChoose(Icon){
        Global.buttonAudio.play();
        // this.cityIcon.setFrame('city');
        // this.beachIcon.setFrame('beach');
        this.ConcepcionIcon.setFrame('DeConcepcion');
        this.SantiagoIcon.setFrame('DeSantiago');
        this.ValparaisoIcon.setFrame('DeValparaiso');
        Icon.setData('isActive',true);
        Global.env_type=Icon.getData('env_type');
        console.log((Icon.getData('isActive')?'Se':'')+Icon.getData('env_type'))
        Icon.setFrame((Icon.getData('isActive')?'Se':'')+Icon.getData('env_type'));
    }
  gotoGame(){
    Global.buttonAudio.play();
    ///////////check!!!
    // Global[Global.env_type+"Audio"].play();
    this.scene.start('Game');
  }

}