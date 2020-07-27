import 'phaser'
import '@babel/polyfill'
import PreloadScene from './scenes/preloadScene';
import Loader from './scenes/Loader';
import Title from './scenes/Title';
import Level from './scenes/Level';
import Game from './scenes/Game';
import Score from './scenes/Score';
import Analytics from './analytics'

import {STATIC_FONTS_FOLDER,STATIC_IMAGES_FOLDER} from './config';
import { Global } from './objects/global';
import './style.scss';

const DEFAULT_WIDTH = 720
const DEFAULT_HEIGHT = 1280

const deviceDetector = function () {
  var b = navigator.userAgent.toLowerCase(),
      a = function (a) {
          void 0 !== a && (b = a.toLowerCase());
          return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(b) ? "tablet" : /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(b) ? "phone" : "desktop"
      };
  return {
      device: a(),
      detect: a,
      isMobile: "desktop" != a() ? !0 : !1,
      userAgent: b
  }
}();
Global.isMobile=!(deviceDetector.device == "desktop");

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'game-sec',
    mode: (Global.isMobile)?Phaser.Scale.ENVELOP:Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,//CENTER_HORIZONTALLY,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  dom: {
    createContainer: true
  },
  scene: [PreloadScene,Loader,Title,Level,Game,Score],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}
document.body.innerHTML += "<style>@font-face{font-family:'CodeProLC';src:url('" + STATIC_FONTS_FOLDER + "Roboto-Bold.ttf');}</style><div class='dummy'>SS</div><div class='game-form'><div class='form-logo'></div></div><div id='game-sec'></div><div class='score-wait'></div>"
window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
Analytics.page()
