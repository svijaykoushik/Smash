var game=new Phaser.Game(1920,1200,Phaser.CANVAS),style=null,main=function(){},Splash=function(){},Intro=function(){},Menu=function(){},Options=function(){},Credits=function(){},Play=function(){},LevelComplete=function(){},GameOver=function(){},GameBeat=function(){},gameOptions={playMusic:!0,playSFX:!0},musicPlayer={bgMusic:{introTheme:null,menuMusic:null,gameMusic:null},SFXPlayer:{menuHover:null,menudown:null,paddleHit:null,brickHit:null,wallHit:null},volumeManager:{bgmVolume:.7,sfxVolume:1}},datastore=null,currentLevel=1,levels=null,globalData={currentScore:0,highScore:5e3,playerStats:{progress:0,levels:{highestLevel:currentLevel,levelName:""},score:{highScore:this.highScore,playerScore:this.currentScore}}};main.prototype={preload:function(){game.device.desktop?(game.load.image("splashBg","assets/pc/starfield.png"),game.load.image("progress","assets/pc/progress.png"),game.load.image("gameIcon","assets/pc/logo.png"),game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL):(game.load.image("splashBg","assets/mobile/starfield.png"),game.load.image("progress","assets/mobile/progress.png"),game.load.image("gameIcon","assets/mobile/logo.png"),game.scale.scaleMode=Phaser.ScaleManager.EXACT_FIT),game.scale.pageAlignHorizontally=!0,game.scale.pageAlignVertically=!0},create:function(){game.scale.fullScreenScaleMode=Phaser.ScaleManager.EXACT_FIT,console.log("%cBoot complete","color:white; background:red"),game.state.add("Splash",Splash),game.state.start("Splash")}},game.state.add("Main",main),game.state.start("Main");var utils={centerGameObjects:function(e){e.forEach(function(e){e.anchor.setTo(.5)})},setTransparency:function(e,t){e.forEach(function(e){e.alpha=t})},fadeInOut:function(e){e.forEach(function(e){game.add.tween(e).to({alpha:1},2e3,Phaser.Easing.Linear.None,!0,2e3,0,!0)})},fadeIn:function(e,t){e.forEach(function(e){game.add.tween(e).to({alpha:1},t,Phaser.Easing.Linear.None,!0)})},fadeOut:function(e,t){e.forEach(function(e){game.add.tween(e).to({alpha:0},t,Phaser.Easing.Linear.None,!0)})},addFaicon:function(e){e.forEach(function(e){game.add.text(e.x,e.y,e.text,e.style),e.onInputUp&&null!=e.onInputUp&&e.events.onInputUp.add(onInputUp)})}};Splash.prototype={loadMusic:function(){game.load.audio("bgm","assets/common/audio/background.mp3"),game.load.audio("brickHit","assets/common/audio/brick.mp3"),game.load.audio("paddleHit","assets/common/audio/paddle.mp3"),game.load.audio("menuhover","assets/common/audio/menuHover.ogg"),game.load.audio("menudown","assets/common/audio/menudown.wav"),game.load.audio("wallHit","assets/common/audio/wall.wav"),game.load.audio("introTheme","assets/common/audio/intro.mp3"),game.load.audio("menuMusic","assets/common/audio/menubg.mp3")},loadImages:function(){game.device.desktop?(game.load.image("background","assets/pc/background2.png"),game.load.image("paddle","assets/pc/paddle2.png"),game.load.image("brick","assets/pc/brick2.png"),game.load.spritesheet("title","assets/pc/titlesprite.png",780,159),game.load.image("pauseScreen","assets/pc/pausebackground.png"),game.load.image("creator","assets/pc/creator.png"),game.load.spritesheet("ball","assets/pc/wobble2.png",60,60)):(game.load.image("background","assets/mobile/background2.png"),game.load.image("paddle","assets/mobile/paddle2.png"),game.load.image("brick","assets/mobile/brick2.png"),game.load.spritesheet("title","assets/mobile/titlesprite.png",780,159),game.load.image("pauseScreen","assets/mobile/pausebackground.png"),game.load.image("creator","assets/mobile/creator.png"),game.load.spritesheet("ball","assets/mobile/wobble2.png",60,60))},loadFonts:function(){WebFontConfig={google:{families:["Alex Brush","Lato"]},custom:{families:["FontAwesome"]}}},loadScripts:function(){game.load.script("webfont","//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"),game.load.script("FontAwesome","//use.fontawesome.com/d902360c6f.js")},init:function(){this.progressBar=game.make.sprite(game.world.centerX-225,game.world.centerY+240,"progress"),this.gameIcon=game.make.sprite(game.world.centerX,game.world.centerY,"gameIcon"),this.status=game.make.text(game.world.centerX,game.world.centerY+340,"Initializing...",{fontSize:"80px",fill:"#fff"}),this.splashBg=game.make.sprite(0,0,"splashBg"),utils.centerGameObjects([this.gameIcon,this.status])},preload:function(){game.add.existing(this.splashBg),game.add.existing(this.gameIcon),game.add.existing(this.progressBar),game.add.existing(this.status),this.load.setPreloadSprite(this.progressBar),this.splashBg.width=game.world.width,this.splashBg.height=game.world.height,this.loadScripts(),this.loadImages(),this.loadFonts(),this.loadMusic()},addGameStates:function(){game.state.add("Intro",Intro),game.state.add("Menu",Menu),game.state.add("Play",Play),game.state.add("GameOver",GameOver),game.state.add("LevelComplete",LevelComplete),game.state.add("GameBeat",GameBeat),game.state.add("Credits",Credits),game.state.add("Options",Options)},addGameMusic:function(){musicPlayer.bgMusic.introTheme=game.add.audio("introTheme"),musicPlayer.bgMusic.menuMusic=game.add.audio("menuMusic"),musicPlayer.bgMusic.gameMusic=game.add.audio("bgm"),musicPlayer.SFXPlayer.menuHover=game.add.audio("menuhover"),musicPlayer.SFXPlayer.menudown=game.add.audio("menudown"),musicPlayer.SFXPlayer.paddleHit=game.add.audio("paddleHit"),musicPlayer.SFXPlayer.wallHit=game.add.audio("wallHit"),musicPlayer.SFXPlayer.brickHit=game.add.audio("brickHit");for(var e in musicPlayer.bgMusic)musicPlayer.bgMusic[e].volume=musicPlayer.volumeManager.bgmVolume;for(var e in musicPlayer.SFXPlayer)musicPlayer.SFXPlayer[e].volume=musicPlayer.volumeManager.sfxVolume},create:function(){this.status.setText("All Systems Go!"),this.addGameStates(),this.addGameMusic(),this.state.start("Intro"),console.log("%cAll Systems Go!","color:white; background:green")}};var mixins={addMenuOption:function(e,t,a){a||(a=this.menuConfig.styleName||"_default");var s="center"===this.menuConfig.startX?game.world.centerX:this.menuConfig.startX,i=this.menuConfig.startY,o=game.add.text(s,250*this.optionCount+i,e,style.navItem[a]);o.anchor.setTo("center"===this.menuConfig.startX?.5:0),o.inputEnabled=!0,o.events.onInputUp.add(function(e){musicPlayer.SFXPlayer.menudown.play(),t(e,this)},this),o.events.onInputOver.add(function(e){e.setStyle(style.navItem._hover),musicPlayer.SFXPlayer.menuHover.play()},this),o.events.onInputOut.add(function(e){e.setStyle(style.navItem[a])}),this.optionCount++}};levels={level:[{data:[[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1]],title:"Gotta Smash'm all"},{data:[[0,0,0,0,0,0,0,0,0,0],[1,1,0,0,1,1,0,0,1,1],[1,1,0,1,0,0,1,0,1,1],[1,1,0,1,0,0,1,0,1,1],[1,1,0,1,0,0,1,0,1,1],[1,1,0,1,0,0,1,0,1,1],[1,1,0,0,1,1,0,0,1,1],[0,0,0,0,0,0,0,0,0,0]],title:" Welcome "},{data:[[0,0,0,0,1,1,0,0,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],title:"Pyramid"},{data:[[0,1,0,0,1,0,0,1,0,0],[0,1,0,1,1,1,0,1,0,0],[1,1,1,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],title:"Triangles"},{data:[[0,0,0,1,1,1,1,0,0,0],[0,0,0,1,1,1,1,1,0,0],[0,0,0,1,1,0,1,1,0,0],[0,0,0,1,1,0,1,1,0,0],[0,0,0,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],title:"Saved"},{data:[[0,0,0,1,11,1,0,0,0,0],[0,0,0,0,1,0,0,0,0,0],[0,0,1,0,1,0,1,0,0,0],[0,0,1,0,1,0,0,0,0,0],[0,0,1,0,1,0,1,0,0,0],[0,0,1,1,1,1,1,0,0,0],[0,0,1,0,1,0,1,0,0,0],[0,0,0,1,1,1,1,0,0,0]],title:"Peace"},{data:[[0,0,0,0,1,1,0,0,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,0,0],[1,1,0,1,0,0,1,0,1,1],[1,1,0,1,0,0,1,0,1,1],[0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,0,0,1,1,0,0,0,0]],title:"I'm watching you"},{data:[[1,0,0,1,1,0,0,1,0,0],[0,1,0,0,0,0,1,0,0,0],[0,0,1,0,0,1,0,0,0,0],[0,1,0,1,1,0,0,0,0,0],[0,0,0,1,1,0,1,0,0,0],[0,0,1,0,0,1,0,0,0,0],[0,1,0,0,0,0,1,0,0,0],[1,0,0,0,0,0,0,1,0,0]],title:"X marks the spot"},{data:[[1,1,0,1,1,0,1,1,0,1],[1,1,0,1,1,0,1,1,0,1],[1,1,0,1,1,0,1,1,0,1],[1,1,0,1,1,0,1,1,0,1],[1,1,0,1,1,0,1,1,0,1],[1,1,0,1,1,0,1,1,0,1],[1,1,0,1,1,0,1,1,0,1],[1,1,0,1,1,0,1,1,0,1]],title:"Supporting pillars"}]},function(){style={navItem:{_base:{font:"100px Alex Brush",align:"center",strokeThickness:4},_default:{fill:"#fff",stroke:"rgba(0,0,0,0)"},_hover:{fill:"#ffff18",stroke:"rgba(200, 200, 200, 0.5)"},_inverse:{fill:"#fff",stroke:"#fff"}}};for(var e in style.navItem)"_base"!=e&&Object.assign(style.navItem[e],style.navItem._base)}(),Intro.prototype={init:function(){this.creator=game.make.sprite(game.world.centerX,game.world.centerY-100,"creator"),this.introText=game.make.text(game.world.centerX,game.world.centerY+300,"Presents",{font:"120px Alex Brush",fill:"#fff"}),this.logo=game.make.sprite(game.world.centerX,game.world.centerY,"title"),this.messageText=game.make.text(game.world.centerX,game.world.centerY+300,"- click to start -",{font:"100px Alex Brush",fill:"#fff"}),utils.centerGameObjects([this.creator,this.introText,this.logo,this.messageText])},create:function(){game.add.existing(this.creator),game.add.existing(this.introText),game.add.existing(this.logo),game.add.existing(this.messageText),utils.setTransparency([this.creator,this.introText,this.logo,this.messageText],0),utils.fadeInOut([this.creator,this.introText]),game.time.events.add(5e3,function(){utils.fadeIn([this.logo,this.messageText],2e3),musicPlayer.bgMusic.introTheme.play(),console.log("%c %cIntroduction complete.","background:#02ff00","color:white;background:green"),game.input.onDown.addOnce(function(){game.state.start("Menu"),musicPlayer.bgMusic.introTheme.stop()},this)},this)}},Menu.prototype={init:function(){this.logo=game.make.sprite(game.world.centerX,120,"title"),utils.centerGameObjects([this.logo]),this.bgImg=game.make.image(0,0,"background"),this.fullscreenIcon=game.make.text(game.world.bounds.width-100,game.world.bounds.height-100,"",{font:"80px FontAwesome",fill:"#fff",stroke:"rgba(0,0,0,0)"}),this.optionCount=1},getPlayerStats:function(){var e;if(0!=datastore.length){e=datastore.getItemAsObject("playerStats");for(key in globalData.playerStats)if("object"==typeof key)for(k in key)globalData.playerStats[key][k]=e[key][k];else globalData.playerStats[key]=e[key]?e[key]:0}},create:function(){game.add.existing(this.bgImg),game.add.existing(this.logo),this.logo.frame=1,musicPlayer.bgMusic.menuMusic.isPlaying||musicPlayer.bgMusic.menuMusic.play(),this.getPlayerStats(),this.addMenuOption("Start",function(){console.log("%c %c Start clicked. %c ","background:#192a43","color:white;background:#2d84b6","background:#192a43"),game.state.start("Play")}),this.addMenuOption("Options",function(){console.log("%c %c Options clicked. %c ","background:#192a43","color:white;background:#2d84b6","background:#192a43"),game.state.start("Options")}),this.addMenuOption("Credits",function(){game.state.start("Credits"),console.log("%c %c Credits clicked. %c ","background:#192a43","color:white;background:#2d84b6","background:#192a43")}),this.add.existing(this.fullscreenIcon),this.fullscreenIcon.inputEnabled=!0,this.fullscreenIcon.events.onInputUp.add(function(){musicPlayer.SFXPlayer.menudown.play(),game.scale.isFullScreen?(game.scale.stopFullScreen(),this.fullscreenIcon.text=""):(game.scale.startFullScreen(!1),this.fullscreenIcon.text="")},this)},menuConfig:{startX:192,startY:150}},Phaser.Utils.mixinPrototype(Menu.prototype,mixins),Options.prototype={init:function(){this.logo=game.make.sprite(game.world.centerX,120,"title"),utils.centerGameObjects([this.logo]),this.optionCount=1},muteAudio:function(e){for(var t in e)e[t].volume=0},unmuteAudio:function(e,t){for(var a in e)e[a].volume=t},create:function(){game.add.image(0,0,"background"),game.add.existing(this.logo),this.logo.frame=1,musicPlayer.bgMusic.menuMusic.play(),this.addMenuOption("Music: ".concat(gameOptions.playMusic?"Off ":"On "),function(e,t){gameOptions.playMusic=!gameOptions.playMusic,e.text="Music: ".concat(gameOptions.playMusic?"Off ":"On "),gameOptions.playMusic?t.unmuteAudio(musicPlayer.bgMusic,musicPlayer.volumeManager.bgmVolume):t.muteAudio(musicPlayer.bgMusic),console.log("%c %c Music: ".concat(gameOptions.playMusic?"ON":"OFF")+". %c ","background:grey","color:white;background:black","background:grey")}),this.addMenuOption("SFX: ".concat(gameOptions.playSFX?"Off ":"On "),function(e,t){gameOptions.playSFX=!gameOptions.playSFX,e.text="SFX: ".concat(gameOptions.playSFX?"Off ":"On "),gameOptions.playSFX?t.unmuteAudio(musicPlayer.SFXPlayer,musicPlayer.volumeManager.sfxVolume):t.muteAudio(musicPlayer.SFXPlayer),console.log("%c %c SFX: ".concat(gameOptions.playSFX?"ON":"OFF")+". %c ","background:grey","color:white;background:black","background:grey")}),this.addMenuOption("Back",function(){game.state.start("Menu")})},menuConfig:{style:"_inverse",startX:"center",startY:120}},Phaser.Utils.mixinPrototype(Options.prototype,mixins),Credits.prototype={navigatorStyle:{credits:{font:"150px FontAwesome",fill:"#fff",stroke:"#000",strokeThickness:2},backBtn:{font:"80px FontAwesome",fill:"#fff",stroke:"#000"},creditsText:{font:"100px Lato",fill:"#fff",stroke:"#000",strokeThickness:1}},props:{pageSize:6,currentPage:1,totalPage:0,pageContents:new Array},getCurrentPage:function(e){return--e,this.creditScreens.slice(e*this.props.pageSize,(e+1)*this.props.pageSize)},addCreditScreen:function(e){for(var t=0;t<e.length;t++){var a=game.add.text(game.world.centerX,100*t+480,e[t],this.navigatorStyle.creditsText);this.props.pageContents.push(a),utils.centerGameObjects([a])}},destroyCreditText:function(){for(;this.props.pageContents.length;)this.props.pageContents.pop().destroy()},onbeforePrevious:function(){this.destroyCreditText()},onPrevious:function(){this.onbeforePrevious(),--this.props.currentPage,this.togglePrevious(),this.toggleNext(),this.addCreditScreen(this.getCurrentPage(this.props.currentPage)),this.updatePageNo(),musicPlayer.SFXPlayer.menudown.play()},onbeforeNext:function(){this.destroyCreditText()},onNext:function(){this.onbeforeNext(),++this.props.currentPage,this.togglePrevious(),this.toggleNext(),this.addCreditScreen(this.getCurrentPage(this.props.currentPage)),this.updatePageNo(),musicPlayer.SFXPlayer.menudown.play()},togglePrevious:function(){this.canPrevious()?(this.previousScreen.inputEnabled=!0,0==this.previousScreen.alpha&&utils.fadeIn([this.previousScreen],250)):(this.previousScreen.inputEnabled=!1,1==this.previousScreen.alpha&&utils.fadeOut([this.previousScreen],250))},toggleNext:function(){this.canNext()?(this.nextScreen.inputEnabled=!0,0==this.nextScreen.alpha&&utils.fadeIn([this.nextScreen],250)):(this.nextScreen.inputEnabled=!1,1==this.nextScreen.alpha&&utils.fadeOut([this.nextScreen],250))},canPrevious:function(){return this.props.currentPage>1},canNext:function(){return this.props.currentPage<this.props.totalPage},updatePageNo:function(){this.pageFooter.text=this.props.currentPage+" of "+this.props.totalPage},init:function(){this.previousScreen=game.make.text(60,game.world.centerY,"",this.navigatorStyle.credits),this.nextScreen=game.make.text(game.world.width-60,game.world.centerY,"",this.navigatorStyle.credits),this.backIcon=game.make.text(60,150,"",this.navigatorStyle.backBtn),this.logo=game.make.sprite(game.world.centerX,120,"title"),this.creditScreens=["SMASH "," ","Version: 0.2.1"," ","Game Design, Game Developement"," ","Vijay Koushik, S."," ","MUSIC"," ","Awaiting Return","Cool Intro","Doobly Doo","by","Kevin MacLeod (incompetech.com)","Licensed under Creative Commons:","By Attribution 3.0 License"," ","SPECIAL THANKS"," ","Phaser.io","freesound.org","MDN","Stackoverflow.com","html5gamedev.com"," "," "," ","svijaykoushik.github.io","2017"],this.props.totalPage=Math.ceil(this.creditScreens.length/this.props.pageSize),this.pageFooter=game.make.text(game.world.centerX,game.world.height-50,this.props.currentPage+" of "+this.props.totalPage,this.navigatorStyle.creditsText),utils.centerGameObjects([this.previousScreen,this.nextScreen,this.backIcon,this.logo,this.pageFooter])},create:function(){game.add.image(0,0,"background"),game.add.existing(this.logo),this.logo.frame=1,game.add.existing(this.previousScreen),game.add.existing(this.nextScreen),game.add.existing(this.backIcon),game.add.existing(this.pageFooter),this.togglePrevious(),this.toggleNext(),this.previousScreen.events.onInputUp.add(this.onPrevious,this),this.nextScreen.events.onInputUp.add(this.onNext,this),this.backIcon.inputEnabled=!0,this.backIcon.events.onInputUp.add(function(){musicPlayer.SFXPlayer.menudown.play(),game.state.start("Menu")}),this.addCreditScreen(this.getCurrentPage(this.props.currentPage))}},Play.prototype={textStyle:{font:"54px Lato",fill:"#fff"},init:function(){this.score=globalData.currentScore,this.lives=3,this.playing=!0,this.ballOnPaddle=!0,this.pauseInitialized=!1,this.levelStruct={title:levels.level[currentLevel].title,data:levels.level[currentLevel].data},this.paddle=game.make.sprite(.5*game.world.width,game.world.height-50,"paddle"),this.ball=game.make.sprite(.5*game.world.width,this.paddle.y-45,"ball"),this.pauseScreen=game.make.sprite(game.world.centerX,game.world.centerY,"pauseScreen"),game.physics.enable(this.paddle,Phaser.Physics.ARCADE),this.paddle.body.immovable=!0,this.ball.animations.add("wobble",[0,2,0,1,0,2,0,1,0],60),game.physics.enable(this.ball,Phaser.Physics.ARCADE),this.ball.body.collideWorldBounds=!0,this.ball.body.bounce.set(1),this.ball.checkWorldBounds=!0,this.ball.body.onWorldBounds=new Phaser.Signal,this.ball.body.onWorldBounds.add(this.ballHitWall,this),this.ball.events.onOutOfBounds.add(this.ballLeaveScreen,this),this.startText=game.make.text(game.world.centerX,game.world.centerY,"- "+this.levelStruct.title+" -",this.textStyle),this.pauseText=game.make.text(15,15,"Pause",this.textStyle),this.scoreText=game.make.text(game.world.centerX,45,this.score,this.textStyle),this.livesText=game.make.text(game.world.width-15,15,"Lives: "+this.lives,this.textStyle),this.livesText.anchor.set(1,0),this.lifeLostText=game.make.text(.5*game.world.width,.5*game.world.height,"Life lost, tap to continue",this.textStyle),this.lifeLostText.visible=!1,this.pause_menuitem_resume=game.make.text(this.pauseScreen.x,this.pauseScreen.y-70,"Resume",style.navItem._default),this.pause_menuitem_menu=game.make.text(this.pauseScreen.x,this.pauseScreen.y+120,"Main Menu",style.navItem._default),utils.centerGameObjects([this.paddle,this.ball,this.lifeLostText,this.startText,this.scoreText,this.pauseScreen,this.pause_menuitem_resume,this.pause_menuitem_menu])},startGame:function(){this.startText.destroy(),this.releaseBall(),this.playing=!0},ballHitWall:function(){musicPlayer.SFXPlayer.wallHit.play()},ballLeaveScreen:function(){this.lives--,this.lives?(this.livesText.setText("Lives: "+this.lives),this.lifeLostText.text="Ball lost",this.lifeLostText.visible=!0,this.ballOnPaddle=!0,this.resetBall()):(globalData.currentScore=this.score,globalData.playerStats.score.highScore=globalData.highScore,globalData.playerStats.score.playerScore=globalData.currentScore,globalData.playerStats.progress=parseFloat((currentLevel/(levels.level.length-1)*100).toFixed(2)),globalData.playerStats.levels.highestLevel<currentLevel&&(globalData.playerStats.levels.highestLevel=currentLevel,globalData.playerStats.levels.levelName=levels.level[currentLevel].title),datastore.setItem("playerStats",globalData.playerStats),musicPlayer.bgMusic.gameMusic.stop(),game.state.start("GameOver"))},ballHitPaddle:function(e,t){var a=0;e.animations.play("wobble"),musicPlayer.SFXPlayer.paddleHit.play(),e.x<t.x?(a=t.x-e.x,e.body.velocity.x=-10*a):e.x>t.x?(a=e.x-t.x,e.body.velocity.x=10*a):e.body.velocity.x=2+8*Math.random()},releaseBall:function(){this.ballOnPaddle&&(this.ballOnPaddle=!1,this.lifeLostText.visible=!1,this.ball.body.velocity.set(350,-350))},ballHitBrick:function(e,t){var a=game.add.tween(t.scale);a.to({x:0,y:0},200,Phaser.Easing.Linear.None),a.onComplete.addOnce(function(){t.kill(),0===this.bricks.countLiving()&&(this.score+=10*currentLevel,globalData.currentScore=this.score,game.state.start("LevelComplete"))},this),a.start(),musicPlayer.SFXPlayer.brickHit.play(),this.score+=10,this.score>=globalData.highScore&&(globalData.highScore=this.score),this.scoreText.setText(this.score)},initBricks:function(){this.brickInfo={width:150,height:60,count:{row:10,col:8},offset:{top:150,left:80},padding:30},this.bricks=game.add.group(),this.bricks.enableBody=!0,this.bricks.physicsBodyType=Phaser.Physics.ARCADE;for(var e=0;e<this.brickInfo.count.col;e++)for(var t=0;t<this.brickInfo.count.row;t++)if(1==this.levelStruct.data[e][t]){var a=t*(this.brickInfo.width+this.brickInfo.padding)+this.brickInfo.offset.left,s=e*(this.brickInfo.height+this.brickInfo.padding)+this.brickInfo.offset.top;this.newBrick=this.bricks.create(a,s,"brick"),this.newBrick.body.immovable=!0}},resetBall:function(){this.paddle.reset(.5*game.world.width,game.world.height-50),this.ball.reset(this.paddle.x+60,this.paddle.y-45)},create:function(){game.physics.startSystem(Phaser.Physics.ARCADE),game.physics.arcade.checkCollision.down=!1,game.add.image(0,0,"background"),game.add.existing(this.paddle),game.add.existing(this.ball),this.initBricks(),game.add.existing(this.pauseText),game.add.existing(this.scoreText),game.add.existing(this.livesText),game.add.existing(this.lifeLostText),game.add.existing(this.startText),musicPlayer.bgMusic.menuMusic.isPlaying&&musicPlayer.bgMusic.menuMusic.stop(),musicPlayer.bgMusic.gameMusic.loop=!0,musicPlayer.bgMusic.gameMusic.play(),this.pauseText.inputEnabled=!0,this.pauseText.events.onInputUp.add(this.showPauseScreen,this),game.input.onDown.add(function(){this.playing?(this.lifeLostText.visible=!1,this.startText.visible=!1,this.releaseBall()):this.playing=!0},this),console.log()},update:function(){this.playing&&(this.paddle.x=game.input.x||.5*game.world.width,this.paddle.x<112.5?this.paddle.x=112.5:this.paddle.x>game.width-112.5&&(this.paddle.x=game.width-112.5),this.ballOnPaddle?this.ball.x=this.paddle.x:(game.physics.arcade.collide(this.ball,this.paddle,this.ballHitPaddle),game.physics.arcade.collide(this.ball,this.bricks,this.ballHitBrick,null,this)))},preload:function(){game.time.advancedTiming=!0,game.time.desiredFps=60},render:function(){game.debug.text("SMASH",50,game.world.height-250,"#00ff00","50px Consolas"),game.debug.text("Version: 0.2.1",50,game.world.height-200,"#00ff00","50px Consolas"),game.debug.text("render FPS: "+(game.time.fps||"--"),50,game.world.height-150,"#00ff00","50px Consolas"),null!==game.time.suggestedFps&&(game.debug.text("suggested FPS: "+game.time.suggestedFps,50,game.world.height-100,"#00ff00","50px Consolas"),game.debug.text("desired FPS: "+game.time.desiredFps,50,game.world.height-50,"#00ff00","50px Consolas"))},showPauseScreen:function(){this.playing=!1,game.paused=!0,!1===this.pauseInitialized?(game.add.existing(this.pauseScreen),game.add.existing(this.pause_menuitem_resume),game.add.existing(this.pause_menuitem_menu),this.pause_menuitem_resume.inputEnabled=!0,this.pause_menuitem_resume.events.onInputUp.add(function(){musicPlayer.SFXPlayer.menudown.play(),this.removePauseScreen()},this),this.pause_menuitem_resume.events.onInputOver.add(function(e){e.setStyle(style.navItem._hover),musicPlayer.SFXPlayer.menuHover.play()},this),this.pause_menuitem_resume.events.onInputOut.add(function(e){e.setStyle(style.navItem._default)}),this.pause_menuitem_menu.inputEnabled=!0,this.pause_menuitem_menu.events.onInputUp.add(function(){musicPlayer.SFXPlayer.menudown.play(),game.paused=!1,musicPlayer.bgMusic.gameMusic.stop(),game.state.start("Menu")},this),this.pause_menuitem_menu.events.onInputOver.add(function(e){e.setStyle(style.navItem._hover),musicPlayer.SFXPlayer.menuHover.play()},this),this.pause_menuitem_menu.events.onInputOut.add(function(e){e.setStyle(style.navItem._default)}),this.pauseInitialized=!0):(this.pauseScreen.reset(game.world.centerX,game.world.centerY),this.pause_menuitem_resume.reset(this.pauseScreen.x,this.pauseScreen.y-70),this.pause_menuitem_menu.reset(this.pauseScreen.x,this.pauseScreen.y+120))},removePauseScreen:function(){this.pause_menuitem_resume.kill(),this.pause_menuitem_menu.kill(),this.pauseScreen.kill(),this.playing=!0,game.paused=!1}},LevelComplete.prototype={styles:{titleText:{font:" 160px Alex Brush",fill:"#fff",stroke:"#000"},statsText:{font:" 85px Lato",fill:"#fff",stroke:"#000"}},init:function(){this.title=game.make.text(game.world.centerX,100,"Level "+currentLevel+" clear",this.styles.titleText),this.bgImg=game.make.image(0,0,"background"),this.levelBonus=game.make.text(game.world.centerX,550,"Bonus: x"+10*currentLevel,this.styles.statsText),this.score=game.make.text(game.world.centerX,650,"Score: "+globalData.currentScore,this.styles.statsText),this.highScore=game.make.text(game.world.centerX,800,"Highscore: "+globalData.highScore,this.styles.statsText),globalData.playerStats.progress=parseFloat((currentLevel/(levels.level.length-1)*100).toFixed(2)),this.progress=game.make.text(game.world.centerX,400,"Progress: "+globalData.playerStats.progress+"%",this.styles.statsText),utils.centerGameObjects([this.title,this.levelBonus,this.score,this.highScore,this.progress])},create:function(){game.add.existing(this.bgImg),game.add.existing(this.progress),game.add.existing(this.title),game.add.existing(this.levelBonus),game.add.existing(this.score),game.add.existing(this.highScore),currentLevel<levels.level.length-1&&currentLevel++,globalData.playerStats.levels.highestLevel=currentLevel,globalData.playerStats.levels.levelName=levels.level[currentLevel].title,globalData.playerStats.score.highScore=globalData.highScore,globalData.playerStats.score.playerScore=globalData.currentScore,datastore.setItem("playerStats",globalData.playerStats),game.time.events.add(5*Phaser.Timer.SECOND,function(){currentLevel<levels.level.length-1?game.state.start("Play"):(currentLevel=1,game.state.start("GameBeat"))})}},GameOver.prototype={styles:{titleText:{font:" 159px Alex Brush",fill:"#fff",stroke:"#000"},statsText:{font:" 80px Lato",fill:"#fff",stroke:"#000"}},init:function(){this.bgImg=game.make.image(0,0,"background"),this.titleText=game.make.text(game.world.centerX,100,"Game Over",this.styles.titleText),this.highestLevel=game.make.text(game.world.centerX,game.world.centerY-100,"Highest level: "+globalData.playerStats.levels.highestLevel,this.styles.statsText),this.highScore=game.make.text(game.world.centerX,game.world.centerY+100,"High score: "+globalData.highScore,this.styles.statsText),this.lastScore=game.make.text(game.world.centerX,game.world.centerY+300,"Score: "+globalData.currentScore,this.styles.statsText),this.progress=game.make.text(game.world.centerX,game.world.centerY-250,"Progress: "+globalData.playerStats.progress+"%",this.styles.statsText),utils.centerGameObjects([this.titleText,this.highestLevel,this.highScore,this.lastScore,this.progress])},create:function(){game.add.existing(this.bgImg),game.add.existing(this.titleText),game.add.existing(this.progress),game.add.existing(this.highestLevel),game.add.existing(this.highScore),game.add.existing(this.lastScore),game.time.events.add(5*Phaser.Timer.SECOND,function(){game.state.start("Menu")})}},GameBeat.prototype={styles:{titleText:{font:" 160px Alex Brush",fill:"#fff",stroke:"#000"},statsText:{font:" 85px Lato",fill:"#fff",stroke:"#000"}},init:function(){this.title=game.make.text(game.world.centerX,100,"Congratulations",this.styles.titleText),this.subtitle=game.make.text(game.world.centerX,300,"Game Completed",this.styles.titleText),this.bgImg=game.make.image(0,0,"background"),this.score=game.make.text(game.world.centerX,650,"Final score: "+globalData.currentScore,this.styles.statsText),this.highScore=game.make.text(game.world.centerX,800,"Highscore: "+globalData.highScore,this.styles.statsText),utils.centerGameObjects([this.title,this.subtitle,this.score,this.highScore])},create:function(){game.add.existing(this.bgImg),game.add.existing(this.title),game.add.existing(this.subtitle),game.add.existing(this.score),game.add.existing(this.highScore),currentLevel=0,globalData.playerStats.levels.highestLevel=currentLevel,globalData.playerStats.levels.levelName=levels.level[currentLevel].title,globalData.playerStats.score.highScore=globalData.highScore,globalData.playerStats.score.playerScore=globalData.currentScore,datastore.setItem("playerStats",globalData.playerStats),game.time.events.add(5*Phaser.Timer.SECOND,function(){game.state.start("Play")})}},(datastore={length:0,getItem:function(e){return localStorage?localStorage.getItem(e)||!1:this[e]||!1},getItemAsObject:function(e){return localStorage?JSON.parse(localStorage.getItem(e))||!1:JSON.parse(this[e])||!1},setItem:function(e,t){"object"==typeof t?localStorage?localStorage.setItem(e,JSON.stringify(t)):this[e]=JSON.stringify(t):localStorage?localStorage.setItem(e,t):this[e]=t,this.initLength()},hasLocalStorage:function(){return!!localStorage},initLength:function(){var e=0;if(localStorage)this.length=localStorage.length;else{for(key in this)"function"!=typeof key&&e++;this.length=e}}}).hasLocalStorage()||console.warn("%c\tApplication doesnotsupport local storage\t","background:#FCF8E3; color:#8A6D3B"),datastore.initLength();