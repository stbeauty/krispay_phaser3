import { Global } from "./global";
import {shuffle} from './array-util';

export class Road extends Phaser.GameObjects.Group{
    constructor(scene){
        super(scene);
        scene.add.existing(this);
        this.roadSlitIndex=0;
        this.speed=0;
        this.obstaclesAvoided=0;
        this.obstacleMin=0;
        this.obstacleMax=0;

        this.itemsList={
            "Concepcion":{
                "left":{
                    "parallel":
                    [
                        [{key:"buildings",frame:"building3",position:{x:-985.4,y:-1087.75}},{key:"buildings",frame:"building1",position:{x:-646.6,y:-1269.3}},{key:"buildings",frame:"building1",position:{x:-477,y: -1450.1}},{key:"buildings",frame:"building1",position:{x:-307.2,y:-1630.1 }},{key:"buildings",frame:"building1",position:{x:-137.6,y: -1810.9}},{key:"buildings",frame:"building1",position:{x:31.2,y:-1990.9 }},{key:"buildings",frame:"building1",position:{x:200.8,y:-2171.7 }}]
                       ],
                    "cross":
                    [
                        [{key:"building3",position:{x:0,y:0}},{key:"building2",position:{x:0,y:0}}],
                        [{key:"building4",position:{x:0,y:0}},{key:"building2",position:{x:0,y:0}}],
                        [{key:"building5",position:{x:0,y:0}},{key:"building2",position:{x:0,y:0}}],
                    ]
                },
                "right":[
                    [{key:"concepcions",frame:"Concepcion_building1",position:{x:1300,y:400}}]
                ]
            },
            /*"Santiago":{
                "left":{
                    "parallel"://trees_chair
                    [
                        [{key:"beach_items",frame:"chair",position:{x:-350,y:-850}},{key:"beach_items",frame:"tree",position:{x:-80,y:-1100 }},{key:"beach_items",frame:"tree",position:{x:140,y:-1300 }},{key:"beach_items",frame:"chair",position:{x:330,y:-1500 }},{key:"beach_items",frame:"tree",position:{x:550,y:-1700 }}]//,

                    ]
                },
                "right":[
                    [{key:"beach_items",frame:"item6",position:{x:1250,y:270}}],
                    [{key:"beach_items",frame:"human2",position:{x:1200,y:400}},{key:"beach_items",frame:"human3",position:{x:1180,y:270}}],
                    [{key:"beach_items",frame:"human1",position:{x:1150,y:250}},{key:"beach_items",frame:"human2",position:{x:1270,y:280}},{key:"beach_items",frame:"human3",position:{x:1280,y:360}}],
                    [{key:"beach_items",frame:"item6",position:{x:1250,y:270}}],

                ]
            },*/
            "Santiago":{
                "left":{
                    "parallel":
                    [
                        [{key:"buildings",frame:"building3",position:{x:-985.4,y:-1087.75}},{key:"buildings",frame:"building1",position:{x:-646.6,y:-1269.3}},{key:"buildings",frame:"building1",position:{x:-477,y: -1450.1}},{key:"buildings",frame:"building1",position:{x:-307.2,y:-1630.1 }},{key:"buildings",frame:"building1",position:{x:-137.6,y: -1810.9}},{key:"buildings",frame:"building1",position:{x:31.2,y:-1990.9 }},{key:"buildings",frame:"building1",position:{x:200.8,y:-2171.7 }}]
                       ],
                    "cross":
                    [
                        [{key:"building3",position:{x:0,y:0}},{key:"building2",position:{x:0,y:0}}],
                        [{key:"building4",position:{x:0,y:0}},{key:"building2",position:{x:0,y:0}}],
                        [{key:"building5",position:{x:0,y:0}},{key:"building2",position:{x:0,y:0}}],
                    ]
                },
                "right":[
                    [{key:"santiagos",frame:"Santiago_building1",position:{x:1300,y:250}}]
                ]
            },
            "Valparaiso":{
                "left":{
                    "parallel":
                    [
                        [{key:"buildings",frame:"building3",position:{x:-985.4,y:-1087.75}},{key:"buildings",frame:"building1",position:{x:-646.6,y:-1269.3}},{key:"buildings",frame:"building1",position:{x:-477,y: -1450.1}},{key:"buildings",frame:"building1",position:{x:-307.2,y:-1630.1 }},{key:"buildings",frame:"building1",position:{x:-137.6,y: -1810.9}},{key:"buildings",frame:"building1",position:{x:31.2,y:-1990.9 }},{key:"buildings",frame:"building1",position:{x:200.8,y:-2171.7 }}]
                       ],
                    "cross":
                    [
                        [{key:"building3",position:{x:0,y:0}},{key:"building2",position:{x:0,y:0}}],
                        [{key:"building4",position:{x:0,y:0}},{key:"building2",position:{x:0,y:0}}],
                        [{key:"building5",position:{x:0,y:0}},{key:"building2",position:{x:0,y:0}}],
                    ]
                },
                "right":[
                    [{key:"valparaisos",frame:"Valparaiso_building1",position:{x:1300,y:100}}],
                ]
            },
        }
      //  this.laneArr=[1,2,3]
        this.laneArr=[{laneNo:1,yFact:.25},{laneNo:2,yFact:.17},{laneNo:3,yFact:.085}];
        this.Concepcion_obstacles=[{origin:{x:.5,y:1},key:"items",frame:"items18",isStatic:true,speed:1,collideFact:.8,animated:false,shouldRotate:true},{origin:{x:.21,y:1},key:"items",frame:"items19",isStatic:false,speed:1.4,collideFact:.65,animated:false,shouldRotate:false},{origin:{x:.21,y:1},key:"items",frame:"items22",isStatic:true,speed:1,collideFact:.65,animated:true,shouldRotate:true,animDetail:[{isDefault:false,key:"items",animKey:"fall"}]}]//,{origin:{x:.21,y:1},frame:"obstacle3",isStatic:false,speed:1.4}
        this.Santiago_obstacles=[{origin:{x:.5,y:1},key:"items",frame:"items18",isStatic:true,speed:1,collideFact:.8,animated:false,shouldRotate:true},{origin:{x:.21,y:1},key:"items",frame:"items19",isStatic:false,speed:1.4,collideFact:.65,animated:false,shouldRotate:false},{origin:{x:.21,y:1},key:"items",frame:"items22",isStatic:true,speed:1,collideFact:.65,animated:true,shouldRotate:true,animDetail:[{isDefault:false,key:"items",animKey:"fall"}]}]//,{origin:{x:.21,y:1},frame:"obstacle3",isStatic:false,speed:1.4}
        this.Valparaiso_obstacles=[{origin:{x:.5,y:1},key:"items",frame:"items18",isStatic:true,speed:1,collideFact:.8,animated:false,shouldRotate:true},{origin:{x:.21,y:1},key:"items",frame:"items19",isStatic:false,speed:1.4,collideFact:.65,animated:false,shouldRotate:false},{origin:{x:.21,y:1},key:"items",frame:"items22",isStatic:true,speed:1,collideFact:.65,animated:true,shouldRotate:true,animDetail:[{isDefault:false,key:"items",animKey:"fall"}]}]//,{origin:{x:.21,y:1},frame:"obstacle3",isStatic:false,speed:1.4}
        
        this.collectables=[
            {origin:{x:.5,y:1},key:"items",frame:"items00",isStatic:true,speed:1,score:1,strength:0,collideFact:.85,shouldRotate:false,animated:true,animDetail:[{isDefault:true,key:"items",animKey:"rotate",prefix:"items",start:0,end:7,zeroPad:2,fps:15,repeat:-1},{isDefault:false,key:"items",animKey:"disappear"}]},
            {origin:{x:.5,y:1},key:"items",frame:"items20",isStatic:true,speed:1,score:0,strength:5,collideFact:.85,shouldRotate:false,animated:false}
        ]
    }
    init(infoCb){
        this.infoCb= infoCb;
        this.sideLaneGr=this.scene.add.group();
        this.buildingGr=this.scene.add.group();
        this.mainLaneGr= this.scene.add.group();
        this.signboardGr= this.scene.add.group();
        this.rightGr= this.scene.add.group();
        this.itemsGr= this.scene.add.group();
        this.obstaclesAvoided=0;
        this.addSlit(0,0,false);//-270,this.scene.game.canvas.height*1.1+270,false);
        this.obstacleMin=2;
        this.obstacleMax=5;
        this.obstacleMathFreq=20;
    }

    addSlit(x,y,addItems=true){
       // x=200
        this.roadSlitIndex++;
        this.roadFound=false;
        this.roadFrameName="road"+String((this.roadSlitIndex<2)?1:2)
        this.mainLaneGr.children.entries.forEach(function(_road){
            if(!_road.active&&_road.frame.name==this.roadFrameName&&!this.roadFound){
                this.roadFound=true;
                this.roadToReUse=_road;
            }
        }.bind(this));
        if(this.roadFound){
            this.road=this.roadToReUse;
            this.road.setPosition(x||0,y||this.scene.game.canvas.height*1.1)
        }else{
            this.road= this.mainLaneGr.create(x||0,y||this.scene.game.canvas.height*1.1,Global.env_type+"_road",this.roadFrameName)
            console.log(Global.env_type, "Global.env_type");
            //*1.1
            
        }


        // if(Global.env_type=="beach"){
        //     this.roadFound=false;
        //     this.roadFrameName="sea";
        //     this.mainLaneGr.children.entries.forEach(function(_road){
        //         if(!_road.active&&_road.texture.key==this.roadFrameName&&!this.roadFound){
        //             this.roadFound=true;
        //             this.roadToReUse=_road;
        //         }
        //     }.bind(this));
        //     if(this.roadFound){
        //         this.sea=this.roadToReUse;
        //         this.sea.setPosition(this.road.x+150*1,this.road.y+311*1.5)
        //     }else{
        //         this.sea= this.mainLaneGr.create(this.road.x+150*1,this.road.y+311*1.5,"sea");
        //         this.sea.setScale(1.33)
        //         this.sea.setOrigin(0,1)

        //     }
        //     this.sea.setActive(true);
        //     this.sea.setVisible(true);
        // }
        
        // this.road.setDepth((Global.env_type=="Concepcion"?9:3))
        this.road.setDepth(9);
        this.road.setActive(true);
        this.road.setVisible(true);

        this.road.setOrigin(0,1);
        this.road.processed=false;
        
        this.road.isParallel=true;
    //    / this.road.setVisible(false)
          
        if(this.roadSlitIndex>=2){
            this.roadSlitIndex=0;
            /*if(Global.env_type=="Concepcion"||Global.env_type=="Santiago"||Global.env_type=="Valparaiso"){
                this.roadFound=false;
                this.roadToReUse=false;
                this.roadFrameName="road3";
                this.sideLaneGr.children.entries.forEach(function(_road){
                    if(!_road.active&&_road.frame.name==this.roadFrameName&&!this.roadFound){
                        this.roadFound=true;
                        this.roadToReUse=_road;
                    }
                }.bind(this));
                if(this.roadFound){
                    this.road2=this.roadToReUse;
                    this.road2.setPosition(this.road.x+this.road.width*.04,this.road.y-this.road.height*.61)
                }else{
                    this.road2= this.sideLaneGr.create(this.road.x+this.road.width*.04,this.road.y-this.road.height*.61,Global.env_type+"_road",this.roadFrameName);
                   
                }
                //this.road.setDepth(0)
                this.road2.setActive(true);
                this.road2.setVisible(true);
              
            }*/
            this.roadFound=false;
            this.roadToReUse=false;
            this.roadFrameName="road3";
            this.sideLaneGr.children.entries.forEach(function(_road){
                if(!_road.active&&_road.frame.name==this.roadFrameName&&!this.roadFound){
                    this.roadFound=true;
                    this.roadToReUse=_road;
                }
            }.bind(this));
            if(this.roadFound){
                this.road2=this.roadToReUse;
                this.road2.setPosition(this.road.x+this.road.width*.04,this.road.y-this.road.height*.61)
            }else{
                this.road2= this.sideLaneGr.create(this.road.x+this.road.width*.04,this.road.y-this.road.height*.61,Global.env_type+"_road",this.roadFrameName);                
            }
            this.road2.setActive(true);
            this.road2.setVisible(true);
            this.addLeftItems(this.road,"parallel",2);
        }else{
            
            this.addLeftItems(this.road,"parallel",0);
            this.addElementsOnRight(1)
        }
        /*if(this.roadSlitIndex%2==0&&Global.env_type=="Concepcion"){
            this.addSignBoard();            
        } */
        if(this.roadSlitIndex%2==0){
            this.addSignBoard();
        }   
        (addItems)&&(this.addObstacle(this.road),this.addCollectables(this.road),this.addElementsOnRight(1));
    }
    getItems(){
        return this.itemsGr.children.entries;
    }
    addObstacle(_roadSlit){
        this.itemAnimating=false
        this.laneArr=shuffle(this.laneArr);
        this.obstacles=this[Global.env_type+"_obstacles"];
        this.obstacles= shuffle(this.obstacles);
        this.obstaclesLimit= Phaser.Math.Between(Math.floor(this.obstacleMin),Math.floor(this.obstacleMax));

        for(var i=1;i<=this.obstaclesLimit;i++){
            this.xVal=_roadSlit.width*.75/this.obstaclesLimit*i
            this.itemFound=false;
            this.itemsGr.children.entries.forEach(function(_item){
                if(!_item.active&&_item.frame.name==this.obstacles[i%this.obstacles.length].frame&&!this.itemFound){
                    this.itemFound=true;
                    this.itemToReUse=_item;
                }
            }.bind(this));
            if(this.itemFound){
                this.obstacle=this.itemToReUse;
                this.obstacle.setActive(true);
                this.obstacle.setVisible(true);
                this.obstacle.setPosition(_roadSlit.x+this.xVal,_roadSlit.y-_roadSlit.height*this.laneArr[i%3].yFact-this.xVal/_roadSlit.width*_roadSlit.height*.7)
            }else{
                this.obstacle= this.itemsGr.create(_roadSlit.x+this.xVal,_roadSlit.y-_roadSlit.height*this.laneArr[i%3].yFact-this.xVal/_roadSlit.width*_roadSlit.height*.7,this.obstacles[i%this.obstacles.length].key,this.obstacles[i%this.obstacles.length].frame)
               // console.log(this.obstacles[i%this.obstacles.length])
                if(this.obstacles[i%this.obstacles.length].animated){
                    this.itemAnimating=true;
                    //console.log("Obstacle Animate")
                    this.animData=this.obstacles[i%this.obstacles.length].animDetail;
                    this.animData.forEach(function(obj){
                        //console.log(obj.animKey,"animKey")
                        if(obj.isDefault){
                            this.obstacle.animatingKey=obj.animKey;
                        }else{
                            this.obstacle.finalAnimKey=obj.animKey;
                           // this.obstacle.setFrame(this.obstacle.finishFrame)
                        }
                    }.bind(this))
                }
            }
            if(this.itemAnimating){
                //this.obstacle.play("fall")
            }
            this.obstacle.item_type="obstacle";
            this.obstacle.collisionProcessed=false;
            this.obstacle.setAngle(0);
            this.obstacle.shouldRotate=this.obstacles[i%this.obstacles.length].shouldRotate
            this.obstacle.collideFact=this.obstacles[i%this.obstacles.length].collideFact;
            this.obstacle.isStatic=this.obstacles[i%this.obstacles.length].isStatic;
            this.obstacle.speed=this.obstacles[i%this.obstacles.length].speed;
            this.obstacle.setOrigin(this.obstacles[i%this.obstacles.length].origin.x,this.obstacles[i%this.obstacles.length].origin.y)
            this.obstacle.laneNo=this.laneArr[i%3].laneNo;
            this.obstacle.setDepth(14+(this.obstacle.laneNo-2)*2);         
  
        }
    }
    addCollectables(_roadSlit){
        this.laneArr=shuffle(this.laneArr);
        this.itemAnimating=false;
        this.animatingKey=null;
        this.collectablesLimit= Phaser.Math.Between(3,4);
        for(var i=1;i<=this.collectablesLimit;i++){
            this.energyChance=(Phaser.Math.Between(1,20)==5)?1:0;
            this.xVal=_roadSlit.width*(i/this.collectablesLimit)
            this.itemFound=false;
            this.itemsGr.children.entries.forEach(function(_item){
                if(!_item.active&&_item.frame.name==this.collectables[this.energyChance].frame&&!this.itemFound){
                    this.itemFound=true;
                    this.itemToReUse=_item;
                }
            }.bind(this));
            if(this.itemFound){
                //console.log("Obstacle re-use >>>")
                this.collectable=this.itemToReUse;
                this.collectable.setActive(true);
                this.collectable.setVisible(true);
                this.collectable.setPosition(_roadSlit.x+this.xVal,_roadSlit.y-_roadSlit.height*this.laneArr[i%3].yFact-this.xVal/_roadSlit.width*_roadSlit.height*.7)
            }else{
                this.collectable= this.itemsGr.create(_roadSlit.x+this.xVal,_roadSlit.y-_roadSlit.height*this.laneArr[i%3].yFact-this.xVal/_roadSlit.width*_roadSlit.height*.7,this.collectables[this.energyChance].key,this.collectables[this.energyChance].frame)
                if(this.collectables[this.energyChance].animated){
                    this.itemAnimating=true;
                    this.animData=this.collectables[this.energyChance].animDetail;
                    this.animData.forEach(function(obj){
                        if(obj.isDefault){
                            this.collectable.animatingKey=obj.animKey;
                        }else{
                            this.collectable.finalAnimKey=obj.animKey;
                        }
                        //console.log(obj.animKey,"animKey")
                       // this.scene.anims.create({key:obj.animKey,frames:this.scene.anims.generateFrameNames(obj.key,{ prefix:obj.prefix,start:obj.start,end:obj.end,zeroPad:obj.zeroPad }),repeat:obj.repeat,frameRate:obj.fps})
                    }.bind(this))
                }
            }
            if(this.collectable.animatingKey){
                this.collectable.play(this.collectable.animatingKey)
            }
            this.collectable.collisionProcessed=false;
            this.collectable.shouldRotate=this.collectables[this.energyChance].shouldRotate

            this.collectable.item_type=(this.energyChance==0)?"collectable":"invincible";
           // this.obstacle= this.itemsGr.create(_roadSlit.x+this.xVal,_roadSlit.y-_roadSlit.height*this.laneArr[i%3].yFact-this.xVal/_roadSlit.width*_roadSlit.height*.7,"items_on_road",this.collectables[this.energyChance].frame)
           this.collectable.collideFact=this.collectables[this.energyChance].collideFact;
           this.collectable.setDepth(13+(this.laneArr[i%3].laneNo-2)*2);
            this.collectable.laneNo=this.laneArr[i%3].laneNo;
            this.collectable.isStatic=this.collectables[this.energyChance].isStatic;
            this.collectable.speed=this.collectables[this.energyChance].speed;
            this.collectable.setOrigin(this.collectables[this.energyChance].origin.x,this.collectables[this.energyChance].origin.y);
            this.collectBound=this.collectable.getBounds();
           

            this.collectable.collisionChecked=false;
            this.collectable.setAlpha(1);
            this.collectable.collideObstacle=null;
            this.itemsGr.children.entries.forEach(function(_item){
                if(_item.laneNo==this.collectable.laneNo&&_item.item_type=="obstacle"&&_item.isStatic&&!this.collectable.collisionChecked&&(Phaser.Geom.Intersects.GetRectangleIntersection(this.collectBound,_item.getBounds()).width>this.collectable.width*.5||Phaser.Geom.Intersects.GetRectangleIntersection(this.collectBound,_item.getBounds()).height>this.collectable.height*.5)){
                    this.collectable.collisionChecked=true;
                    this.collectable.collideObstacle=_item;
                    this.collectable.setActive(false);
                    this.collectable.setVisible(false);
                }

            }.bind(this));
            if(this.collectable.collisionChecked){
        
               /*  while(Phaser.Geom.Intersects.GetRectangleIntersection(this.collectBound,this.collectable.collideObstacle.getBounds()).width>0||Phaser.Geom.Intersects.GetRectangleIntersection(this.collectBound,this.collectable.collideObstacle.getBounds()).height>0){
                    console.log("Moving apart")
                    this.itrSpeed=(this.speed!=0)?this.speed*3:3
                    this.collectable.y-=(this.itrSpeed*this.collectable.width*.5*1.072)*(this.itrSpeed);
                    this.collectable.x+=(this.itrSpeed*this.collectable.width*.5)*(this.itrSpeed);
                    this.collectBound=this.collectable.getBounds();
          
                } */
            }
          
        
        }

    }
    addSignBoard(){

                this.boardFound=false;
                this.boardToReUse=false;
                this.signboardGr.children.entries.forEach(function(_board){
                    if(!_board.active&&_board.texture.key=="sign_board"&&!this.boardFound){
                        this.boardFound=true;
                        this.boardToReUse=_board;
                    }
                }.bind(this));
                if(this.boardFound){
                    //console.log("Re-use board");
                    this.signBoard=this.boardToReUse;
         
                    this.signBoard.setActive(true);
                    this.signBoard.setVisible(true);
                    this.signBoard.leg.setActive(true);
                    this.signBoard.leg.setVisible(true);
                    this.street_guide_board.setActive(true);
                    this.street_guide_board.setVisible(true);
                    this.signBoard.setPosition(1500,-670);
                    this.street_guide_board.setPosition(1110,50);
                    this.signBoardLeg.setPosition(1278,-620);

                }else{
                    this.signBoard= this.signboardGr.create(1500,-670,"sign_board");
                    if(Global.env_type == "Concepcion"){
                        this.street_guide_board= this.signboardGr.create(1110,50,"street_guide_board_Concepcion");
                    }else if(Global.env_type == "Santiago"){
                        this.street_guide_board= this.signboardGr.create(1110,50,"street_guide_board_Santiago");
                    }else{
                        this.street_guide_board= this.signboardGr.create(1110,50,"street_guide_board_Valparaiso");
                    }
                    // this.street_guide_board= this.signboardGr.create(1110,50,"street_guide_board");
                    this.signBoardLeg = this.sideLaneGr.create(1278, -620, 'sign_board_leg');
                }


        this.signBoard.setDepth(20);
        this.signBoardLeg.setDepth(10);
        this.street_guide_board.setDepth(20);
        this.signBoard.leg=this.signBoardLeg;
    }
    addLeftItems(_roadSplit,_direction,_limit){
        this.list=this.itemsList[Global.env_type]["left"][_direction];
        this.combination=this.itemsList[Global.env_type]["left"][_direction][Phaser.Math.Between(0,this.list.length-1)];
        //console.log(this.combination)
       /*  if(this.building){
            console.log("Set")
            this.building.setDepth(-1)
        } */
        for(var i=0;i<this.combination.length-_limit;i++){
            if((i+1)<=_limit||true){
                this.buildingFound=false;
                this.buildingGr.children.entries.forEach(function(_building,index){
                    //console.log(this.buildingGr.children.entries.length-index)
                    if(!_building.active&&_building.frame.name==this.combination[i].frame&&!this.buildingFound){
                        this.buildingFound=true;
                        this.buildingToReUse=_building;
                    }
                }.bind(this));
                if(this.buildingFound){
                    //console.log("Re-use buildiong");
                    this.building=this.buildingToReUse;
                    this.building.setActive(true);
                    this.building.setVisible(true);
                    this.building.setPosition(_roadSplit.x+this.combination[i].position.x,_roadSplit.y+this.combination[i].position.y)
                    //this.building.setDepth(-1);
                    this.buildingGr.remove(this.building)
                    this.buildingGr.add(this.building)
                    
                }else{
                    //console.log("Adding new");
                    //_roadSplit.x+this.combination[i].position.x,_roadSplit.y+this.combination[i].position.y
                    this.building=this.buildingGr.create(_roadSplit.x+this.combination[i].position.x,_roadSplit.y+this.combination[i].position.y,this.combination[i].key,this.combination[i].frame);
                    this.building.setOrigin(0);
                }
                
                //_roadSplit.add(this.building,0)
               
                //this.building.despth=10;
            }
            this.buildingGr.children.entries.forEach(function(_building,index){
                _building.setDepth(this.buildingGr.children.entries.length-index)
            }.bind(this))
        }
        
    }
    updateSpeed(speed){
        this.speed=speed;
    }
    addElementsOnRight(_limit){
        this.rightItem=this.itemsList[Global.env_type]["right"];
        this.combination=this.rightItem[Phaser.Math.Between(0,this.rightItem.length-1)];
        // (Global.env_type=="Santiago")&&(_limit=this.combination.length);
        //console.log(this.combination,_limit,"_limit")
        for(var i=this.combination.length-1;i>=0;i--){
            if((i+1)<=_limit){
                this.itemFound=false;
                this.rightGr.children.entries.forEach(function(_item){
                    if(!_item.active&&_item.frame.name==this.combination[i].frame&&!this.itemFound){
                        this.itemFound=true;
                        this.itemToReUse=_item;
                    }
                }.bind(this));
                if(this.itemFound){
                    this.item=this.itemToReUse;
                    this.item.setActive(true);
                    this.item.setVisible(true);
                    this.item.setPosition(this.combination[i].position.x,this.combination[i].position.y)
                    
                    
                }else{
                    this.item=this.rightGr.create(this.combination[i].position.x,this.combination[i].position.y,this.combination[i].key,this.combination[i].frame);
                    //this.building.setOrigin(0);
                }
                this.item.setDepth(30-this.combination.length-i);
            }
           
        }
    }
    moveRoad(Gr){
        Gr.children.entries.forEach(function (_item) {
            // _item.y+=(this.speed*(Global.env_type=="Concepcion"?1.072:1.0725))*(_item.speed||1);
            _item.y+=(this.speed*1.072)*(_item.speed||1);           
            _item.x-=(this.speed)*(_item.speed||1);
            if(!_item.processed&&_item.x<=200&&_item.isParallel){
                _item.processed=true;
                this.addSlit(_item.x+_item.width*.9899,_item.y-_item.height*.701);
                //this.addElementsOnRight();
            }
            if(_item.x<=-_item.width&&_item.active){
                _item.setActive(false);
                _item.setVisible(false);
                if(_item.item_type=="obstacle"&&!_item.collisionProcessed){
                    this.obstaclesAvoided++;
                    if(this.obstaclesAvoided>0&&this.obstaclesAvoided%this.obstacleMathFreq==0){
                        this.obstacleMathFreq+=40;
                        this.infoCb("obstacle_info");
                        this.obstacleMin+=.5;
                        this.obstacleMax+=.5;
                    }
                }
                if(_item.leg){
                    _item.leg.setActive(false);
                    _item.leg.setVisible(false);
                }
            }
        }.bind(this));
    }
    update(){
        if(this.speed>0){
            this.moveRoad(this.mainLaneGr);
            this.moveRoad(this.sideLaneGr);
            this.moveRoad(this.buildingGr);
            this.moveRoad(this.signboardGr);
            this.moveRoad(this.rightGr);
            this.moveRoad(this.itemsGr);
        }
        
    }
}


/* 
54,200
*/