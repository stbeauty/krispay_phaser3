import { Global } from '../objects/global'
import { userByIdentifier } from '../objects/api'


export default class Score extends Phaser.Scene {
  constructor() {
    super({ key: 'Score' })
  }

  init() {
  }

  create() {
    Global.background_music.stop()
    Global.cityAudio.play()
    this.redirectTO = null
    this.tryCount = 0
    this.extraTop = Math.abs(parseFloat(document.getElementsByTagName('canvas')[0].style.marginTop)) / window.innerWidth * this.game.canvas.width
    this.extraLeftPer = Math.abs(parseFloat(document.getElementsByTagName('canvas')[0].style.marginLeft)) / window.innerWidth
    this.extraLeftPer = (this.extraLeftPer == 0) ? 1 / window.innerWidth : this.extraLeftPer;
    (!Global.isMobile) && (this.extraLeftPer = 0);
    this.scoreGr = this.add.group()
    this.scoreBG = this.add.graphics()
    this.scoreBG.setPosition(0, 0)
    this.scoreBG.fillStyle(0x1b212d, 1)
    this.scoreBG.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height)
    this.scoreGr.add(this.scoreBG)


    this.logo = this.add.image(this.game.canvas.width * .5, 150 + this.extraTop, 'Logo-Home')
    this.logo.setScale(1 - this.game.canvas.width * this.extraLeftPer * .001)
    this.logo.setVisible(false)
    this.scoreHead1 = this.make.text({
      x: this.game.canvas.width * .5,
      y: 170,//+this.extraTop,
      text: 'Good Job!',
      origin: {
        x: 0.5,
        y: 0.5
      },
      style: {
        font: 'bold ' + String(75 - this.game.canvas.width * this.extraLeftPer * .01) + 'px CodeProLC',
        fill: '#ffffff'
      }
    })    

    /*
    this.scoreHead2 = this.make.text({
      x: this.game.canvas.width * .5,
      y: 270,//+this.extraTop,
      text: 'For each 20 coins you collected,\nyou got 10 KrisPay miles',
      origin: {
        x: 0.5,
        y: 0.5
      },
      style: {
        font: 'bold ' + String(30 - this.game.canvas.width * this.extraLeftPer * .01) + 'px CodeProLC',
        fill: '#ffffff',
        lineSpacing: 10,
        wordWrap: {
          width: 700
        },
        align: 'center'
      }
    })
    */
    this.scoreGr.add(this.scoreHead1)
    // this.scoreGr.add(this.scoreHead2)

    this.holder = this.add.image(this.game.canvas.width * .5, 450 - 45, 'score_box')
    // this.coin = this.add.image(this.game.canvas.width * .5 - 180 + this.game.canvas.width * this.extraLeftPer * .001, 450 - 45, 'coin')
    // this.holder.setScale(.95 - this.game.canvas.width * this.extraLeftPer * .001)

    this.coinHead = this.make.text({
      // x: this.game.canvas.width * .5 - 70 + this.game.canvas.width * this.extraLeftPer * .001,
      x: this.game.canvas.width * .5,
      y: 450 - 80,//+this.extraTop,
      text: 'Your Score',
      origin: {
        x: 0.5,
        y: 0.5
      },
      style: {
        font: 'bold ' + String(40 - this.game.canvas.width * this.extraLeftPer * .01) + 'px CodeProLC',
        fill: '#ffd602',
        wordWrap: {
          width: 700
        }
      }
    })
    this.coinTxt = this.make.text({
      // x: this.holder.x + this.holder.width * .25,
      x: this.game.canvas.width * .5,
      y: 450 - 0,//+this.extraTop,
      text: String(Global.coinsTotal),
      origin: {
        x: 0.5,
        y: 0.5
      },
      style: {
        font: 'bold ' + String(70 - this.game.canvas.width * this.extraLeftPer * .01) + 'px CodeProLC',
        fill: '#ffd602',
        wordWrap: {
          width: 700
        }
      }
    })

    /*
    this.totalCoinHead = this.make.text({
      x: this.game.canvas.width * .55 - 70 + this.game.canvas.width * this.extraLeftPer * .001,
      y: 565 - 45,//+this.extraTop,
      text: 'TOTAL COINS',
      origin: {
        x: 0.5,
        y: 0.5
      },
      style: {
        font: 'bold ' + String(30 - this.game.canvas.width * this.extraLeftPer * .01) + 'px CodeProLC',
        fill: '#ffffff',
        wordWrap: {
          width: 700
        }
      }
    })
    this.totalCoinTxt = this.make.text({
        x: this.holder.x + this.holder.width * .15,
        y: 565 - 45,//+this.extraTop,
        text: String(Global.points + Global.coinsTotal),
        origin: {
          x: 0,
          y: 0.5
        },
        style: {
          font: 'bold ' + String(50 - this.game.canvas.width * this.extraLeftPer * .01) + 'px CodeProLC',
          fill: '#ffffff',
          wordWrap: {
            width: 700
          }
      }});
    */

    this.tiemrHead1= this.make.text({
        x: this.game.canvas.width*.5,
        // y: 575+25-((Global.playedInsession)?0:200),
        y: 575 +35,
        text: "Too redeem your points enter your information:",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: 'bold 40px CodeProLC',
            fill: '#ffffff',
            aglin: 'center',
            lineSpacing: 10,
            wordWrap: {
                width: 500
            }
        }
    });

    this.BG_txtfld_name = this.add.sprite(this.game.canvas.width*.5,this.game.canvas.height*.5+150, "txtfld");
    this.BG_txtfld_email = this.add.sprite(this.game.canvas.width*.5,this.game.canvas.height*.5+265, "txtfld");

    this.placeholder_name = this.make.text({
      x: 250,
      y: this.game.canvas.height*.5+150,
      text: 'Enter full name',
      origin: {
        x: 0.5,
        y: 0.5
      },
      style: {
        font: String(35) + 'px CodeProLC',
        fill: '#aba8a8',
        wordWrap: {
          width: 480
        }
      }
    });

    this.placeholder_email = this.make.text({
      x: 215,
      y: this.game.canvas.height*.5+265,
      text: 'Enter email',
      origin: {
        x: 0.5,
        y: 0.5
      },
      style: {
        font: String(35) + 'px CodeProLC',
        fill: '#aba8a8',
        wordWrap: {
          width: 480
        }
      }
    })
    
    this.scoreGr.add(this.coinHead);

    
    var nameText = this.add.rexBBCodeText(this.game.canvas.width*.5,this.game.canvas.height*.5+150, '', {
      color: '#000000',
      fontSize: '38px',
      fixedWidth: 480,
      fixedHeight: 80,
      backgroundColor: '#ffffff00',
      valign: 'center',
  })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', function () {
          this.plugins.get('rextexteditplugin').edit(nameText, {onTextChanged : (textObject, text) => {
            textObject.text = text;
            this.name = text;
            if(text.length >= 1){
              this.placeholder_name.setVisible(false);
            }else{
              this.placeholder_name.setVisible(true);
            }
        }
      });
      }, this);

    var emailText = this.add.rexBBCodeText(this.game.canvas.width*.5,this.game.canvas.height*.5+265, '', {
      color: '#000000',
      fontSize: '38px',
      fixedWidth: 480,
      fixedHeight: 80,
      backgroundColor: '#ffffff00',
      valign: 'center',
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', function () {
          this.plugins.get('rextexteditplugin').edit(emailText, {onTextChanged : (textObject, text) => {
            textObject.text = text;
            this.email = text;
            if(text.length >= 1){
              this.placeholder_email.setVisible(false);
            }else{
              this.placeholder_email.setVisible(true);
            }
        }
      });
      }, this);

    if(!Global.playedInsession){
        this.totalCoinTxt.setVisible(false);
        this.totalCoinHead.setVisible(false);
        this.coinTxt.setVisible(false);
        this.coinHead.setVisible(false);
        this.holder.setVisible(false);
        this.coin.setVisible(false);
        this.scoreHead1.setVisible(false);
        this.scoreHead2.setVisible(false);
        this.holder.setVisible(false);
        this.holder.setVisible(false);
    }

    /*this.bg = this.add.graphics()

    this.bg.fillStyle(0x465c8b, .5)

    this.bg.fillRoundedRect(this.game.canvas.width * .1, (this.game.canvas.height - this.extraTop) / 2, this.game.canvas.width * .8, this.game.canvas.width * .3, 35)+
    */

    /* this.add(this.bg); */

    /*this.countInfo= this.make.text({
        x: this.game.canvas.width*.5,
        y: (this.game.canvas.height-this.extraTop)/2+this.game.canvas.width*.15,//+this.extraTop,
        text: "",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: 'bold '+String(30-this.game.canvas.width*this.extraLeftPer*.01)+'px CodeProLC',
            fill: '#ffffff',
            lineSpacing:10,
            align:'center',
            wordWrap: {
                width: this.game.canvas.width*.75
            }
        }
    });*/
    
    // this.replayBtn= this.add.sprite(this.game.canvas.width*.71,this.game.canvas.height*.9-this.extraTop+40-70,"spr_items","buttonReplay")
    // this.goBtn= this.add.sprite((Global.playedInsession)?this.game.canvas.width*.28:this.game.canvas.width*.5,this.game.canvas.height*.9-this.extraTop+40-70,"spr_items","btnplay")

    this.submit_btn= this.add.sprite(this.game.canvas.width*.5,this.game.canvas.height*.9-this.extraTop+40-70,"submit_btn")


    /*     this.shareBtn.setVisible(false);
    this.shareBtn.setActive(false); */
    
    /*this.replatTxt = this.make.text({
      x: this.game.canvas.width * .71,
      y: this.game.canvas.height * .9 - this.extraTop + 40 - 70,
      text: 'Replay',
      origin: {
        x: 0.5,
        y: 0.5
      },
      style: {
        font: 'bold 45px CodeProLC',
        fill: '#062361',
        wordWrap: {
          width: 300
        }
      }
  });*/

  if(!Global.playedInsession)
  {
      this.replatTxt.setVisible(false);
      this.replayBtn.setVisible(false);
  }
  /*
  this.goBtn.setScale(.7,1);
  // this.replayBtn.setScale(.7,1)
  this.goBtn.setInteractive().on('pointerdown', this.goHome.bind(this));
  this.goTxt = this.make.text({
    x: (Global.playedInsession)?this.game.canvas.width*.28:this.game.canvas.width*.5,
    y: this.game.canvas.height*.9-this.extraTop+40-70,
    text: "Go Home",
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
    })
    /*

    /* this.shareTxt.setVisible(false);
        this.shareTxt.setActive(false); */
    document.querySelector('.score-wait').classList.add('active')
    userByIdentifier(this.onCheck.bind(this))

  }

  onCheck(status, data) {
    document.querySelector('.score-wait').classList.remove('active')
    Global.remainingAttempts = 0
    if (data) {
      Global.remainingAttempts = data.user.playLimit.remainingAttempts || 0
    }
    /*if(Global.remainingAttempts==0){
       
        this.countInfo.text="Log in to KrisPay or complete a challenge to get more play attempts";
    }else{
        this.countInfo.text="You have "+String(Global.remainingAttempts)+" play attempt (s) left. Refer a friend to the KrisPay app or complete any challenge to get more play attempts";
    }*/

    //this.countInfo.text="You have "+String(Global.remainingAttempts)+"\nremaining attempts"
   /*  this.replayBtn.setVisible((Global.remainingAttempts!=0));
    this.replatTxt.setVisible((Global.remainingAttempts!=0)); */
   
    if(Global.remainingAttempts==0)
    {
        // this.goBtn.y+=((Global.playedInsession)?50:0);
        // this.goTxt.y+=((Global.playedInsession)?50:0);
        // this.replayBtn.y+=((Global.playedInsession)?50:0);
        // this.replatTxt.y+=((Global.playedInsession)?50:0)

        /*
        this.bg.clear();
        this.bg.setPosition(0, 170-((Global.playedInsession)?-30:130));
        this.bg.fillStyle(0x465c8b, .5);
        this.bg.fillRoundedRect(this.game.canvas.width*.1, (this.game.canvas.height-this.extraTop)/2, this.game.canvas.width*.8, this.game.canvas.width*.22,35)
        */

        // this.countInfo.y=(this.game.canvas.height-this.extraTop)/2+this.game.canvas.width*.15+140-((Global.playedInsession)?-30:130);
        // this.replayBtn.setAlpha(.25);
        // this.replatTxt.setAlpha(.25);
        //this.countInfo.setPosition(this.game.canvas.width*.5,(this.game.canvas.height-this.extraTop)/2+this.game.canvas.width*.15+25)
        /*this.tiemrHead1= this.make.text({
            x: this.game.canvas.width*.5,
            y: 575+25-((Global.playedInsession)?0:200),
            text: "Tooredeem your points enter your information:",
            origin: {
                x: 0.5,
                y: 0.5
            },
            style: {
                font: 'bold 40px CodeProLC',
                fill: '#ffffff',
                aglin: 'center',
                wordWrap: {
                    width: 500
                }
            }
        });*/

        /*
        this.tiemrHead1= this.make.text({
            x: this.game.canvas.width*.5,
            y: 690+45-((Global.playedInsession)?0:200),
            text: "Gain more game plays for the day when you Log in to KrisPay or complete a challenge",
            origin: {
                x: 0.5,
                y: 0.5
            },
            style: {
                font: 'bold 23px CodeProLC',
                fill: '#ffffff',
                align:'center',
                wordWrap: {
                    width: 550
                }
            }
        });
        */
 //////////////////       
        // this.timerTxt = this.make.text({
        //     x: this.game.canvas.width*.5,
        //     y: 635+25-((Global.playedInsession)?0:200),
        //     text: "",
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
  ////////////////////////
       /*  this.exhaustInfo = this.make.text({
            x: this.game.canvas.width*.5,
            y: this.game.canvas.height*.71-this.extraTop+115-((Global.playedInsession)?-60:40),
            text: "You will be directed soon",
            origin: {
                x: 0.5,
                y: 0.5
            },
            style: {
                font: 'bold 33px CodeProLC',
                fill: '#ffffff'
            }
        }); */
        
    this.resetOn =data.user.playLimit.resetOn;
    this.resetDate= new Date(this.resetOn);
   
    this.onTick();
    this.timer = this.time.addEvent({
        delay: 1000,
        callback: this.onTick,
        callbackScope: this,
        loop: true
      })
      //this.redirectTO = setTimeout(this.goHome, 10000)
    } 
    /*else {
      this.replayBtn.setInteractive().on('pointerdown', function(event) {
        Global.buttonAudio.play()
        this.scene.start('Game')

      }.bind(this))
    }*/

  }

  onTick() {
    this.nowDate = new Date()
    this.totalSeconds = (this.resetDate.getTime() - this.nowDate.getTime()) / 1000
    this.hours = Math.floor(this.totalSeconds / 60 / 60)
    this.minutes = Math.floor(this.totalSeconds / 60) - (this.hours * 60)
    this.seconds = Math.floor(this.totalSeconds % 60)
    this.timerTxt.text = ((this.hours < 10 ? '0' : '') + String(this.hours)) + ' : ' + (this.minutes < 10 ? '0' : '') + String(this.minutes) + ' : ' + (this.seconds < 10 ? '0' : '') + String(this.seconds)
  }

  share() {
    Global.buttonAudio.play()
    this.shareUrl = 'https://krispay.gamiphy.co/'
    let quote = ''
    let url = 'https://www.facebook.com/sharer/sharer.php?u=' + this.shareUrl + '&quote=' + quote
    window.open(encodeURI(url))
  }

  goHome() {
    clearTimeout(this.redirectTO)
    //Send JS event to notify game done
    window.parent.postMessage({
      origin: 'Gamiphy',
      type: 'gameDone'
    }, '*')
  }

}
