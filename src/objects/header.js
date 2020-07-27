import {chunk} from './api';
import { Global } from './global';

export class Head extends Phaser.GameObjects.Group{
    constructor(scene){
        super(scene);

        this.coinTotal=0;
        this.health=3.5;
    }
    init(){
        this.coinTotal=0;
        this.health=3.5;
        this.extraTop=Math.abs(parseFloat(document.getElementsByTagName("canvas")[0].style.marginTop))/window.innerWidth*this.scene.game.canvas.width;

        this.header=this.create(this.scene.game.canvas.width*.5,80+this.extraTop,"game-head");
        this.life3= this.create(310,80+this.extraTop,"life");
        this.life2= this.create(230,80+this.extraTop,"life");
        this.life1= this.create(150,80+this.extraTop,"life");
        this.coinHead=this.create(450,80+this.extraTop,"coin");

        this.header.setScale(this.scene.game.canvas.width*.0012);
        this.life3.setScale(this.scene.game.canvas.width*.0012);
        this.life2.setScale(this.scene.game.canvas.width*.0012);
        this.life1.setScale(this.scene.game.canvas.width*.0012);
        this.coinHead.setScale(this.scene.game.canvas.width*.0012);

        this.coinTxt = this.scene.make.text({
            x: 550,
            y: 80+this.extraTop,
            text: "",
            origin: {
                x: 0.5,
                y: 0.5
            },
            style: {
                font: 'bold 45px CodeProLC',
                fill: '#ffffff',
                wordWrap: {
                    width: 300
                }
            }
        });
        this.add(this.coinTxt)
        this.updateScore(0);
    }
    updateScore(coin){
       /*  if(!Global.isTransmiting&&Global.sessionStarted){
            Global.coinsToSend=coin;
        }else{
           
        } */
        Global.coinsToSend+=coin;
        if(Global.sessionStarted)
            chunk(Global.coinsToSend)
        this.coinTotal+=coin;
        this.coinTxt.setText(String(this.coinTotal));
    }
    getScore(){
        return this.coinTotal;
    }
    getHealth(){
        return this.health;
    }
    updateHealth(_val){
        
        this.health-=_val;
        if(this.health%1!=0){
            this["life"+String(Math.ceil(this.health))].setVisible(false)
        }
    }
    
}