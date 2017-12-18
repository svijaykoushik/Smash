/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io|Author}
 *@copyright 2017 Vijaykoushik, S.
*/

/**
 * The main module is the entry point of the game.
 * It contains all the global variable declarations for the game.
 *@module Main module
*/
var game = new Phaser.Game(1920, 1200, Phaser.CANVAS),
	style = null,
	main = function(){},
	Splash = function(){},
	Intro = function(){},
	Menu = function(){},
	Options = function(){},
	Credits = function(){},
	Play = function(){},
	LevelComplete = function(){},
	GameOver = function(){},
	GameBeat = function(){},
	gameOptions = {
		playMusic: true,
		playSFX: true
	},
	musicPlayer = {
		bgMusic:{
			introTheme:null,
			menuMusic:null,
			gameMusic:null
		},
		SFXPlayer:{
			menuHover: null,
			menudown: null,
			paddleHit: null,
			brickHit: null,
			wallHit: null
		},
		volumeManager:{
			bgmVolume:0.7,
			sfxVolume:1.0
		}
	},
	datastore = null,
	currentLevel = 1,
	levels= null,
	globalData={
		currentScore: 0,
		highScore: 5000,
		playerLives: 3,
		hitStreak: 0,
		playerStats:{
			progress: 0,
			levels:{
				highestLevel: currentLevel,
				levelName: ""
			},
			score :{
				highScore: this.highScore,
				playerScore: this.currentScore
			}
		}
	};
/**************************/
/*	Bootstraping		 */
/************************/
/**
 * @classdesc
 * Boots up the game via phaser framework.
 * It's the first or the starting state of the game.
 * @class
 * @description Boots up the game and shows the splash screen.
 */
main.prototype = {
	preload:function(){
		if(game.device.desktop){
			game.load.image('splashBg', 'assets/pc/starfield.png');
			game.load.image('progress', 'assets/pc/progress.png');
			game.load.image('gameIcon', 'assets/pc/logo.png');
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		}
		else{
			game.load.image('splashBg', 'assets/mobile/starfield.png');
			game.load.image('progress', 'assets/mobile/progress.png');
			game.load.image('gameIcon', 'assets/mobile/logo.png');
			game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		}
		/*game.load.script('utils','js/utils.js');
		game.load.script('Splash','js/splash.js');*/
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
	},
	create: function(){
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		console.log("%cBoot complete", "color:white; background:red");
		game.state.add('Splash',Splash);
		game.state.start('Splash');
		
	}
};

game.state.add('Main',main);
game.state.start('Main');
/**************************/
/*	utility				 */
/************************/
var utils = {
	/* centers array of game objects */
	centerGameObjects: function(Objects){
		Objects.forEach(function(object){
			object.anchor.setTo(0.5);
		});
	},
	/* set game objects' Transparency. Transparency from 0 to 1*/
	setTransparency: function(Objects, transparency){
		Objects.forEach(function(object){
			object.alpha = transparency;
		});
	},
	fadeInOut: function(Objects){
		Objects.forEach(function(object){
			game.add.tween(object).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true,2000,0,true);
		});
	},
	fadeIn: function(Objects, interval){
		Objects.forEach(function(object){
			game.add.tween(object).to({alpha: 1}, interval, Phaser.Easing.Linear.None, true);
		});
	},
	fadeOut: function(Objects, interval){
		Objects.forEach(function(object){
			game.add.tween(object).to({alpha: 0}, interval, Phaser.Easing.Linear.None, true);
		});
	},
	addFaicon: function(Objects){
		Objects.forEach(function(object){
			game.add.text(object.x, object.y, object.text, object.style);
			if(object.onInputUp && object.onInputUp != null) object.events.onInputUp.add(onInputUp);
		});
	}
};
/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io|Author}
 *@copyright 2017 Vijaykoushik, S.
*/
/**************************/
/*	Splash screen		 */
/************************/
/**
 *@classdesc
 * Loads all the assets of the game.
 * Chooses the appropriate assets for mobile and desktop devices.
 *@class
 *@description Shows splash screen and loads all the assets.
 */
Splash.prototype = {
	/**
	 * Loads all the common music (or) audio assets.
	 *@method
	 *@private
	*/
	loadMusic:function(){
		game.load.audio('bgm', 'assets/common/audio/background.mp3');
		game.load.audio('brickHit', 'assets/common/audio/brick.mp3');
		game.load.audio('paddleHit', 'assets/common/audio/paddle.mp3');
		game.load.audio('menuhover', 'assets/common/audio/menuHover.ogg');
		game.load.audio('menudown', 'assets/common/audio/menudown.wav');
		game.load.audio('wallHit', 'assets/common/audio/wall.wav');
		game.load.audio('introTheme', 'assets/common/audio/intro.mp3');
		game.load.audio('menuMusic', 'assets/common/audio/menubg.mp3');
	},
	/**
	 * Loads the image assets corresponding to either desktop or mobile device.
	 *@method
	 *@private
	*/
	loadImages: function(){
		if(game.device.desktop){
			game.load.image('background', 'assets/pc/background2.png');
			game.load.image('paddle', 'assets/pc/paddle2.png');
			game.load.image('brick', 'assets/pc/brick2.png');
			game.load.spritesheet('title', 'assets/pc/titlesprite.png',780,159);
			game.load.image('pauseScreen', 'assets/pc/pausebackground.png');
			game.load.image('creator', 'assets/pc/creator.png');
			game.load.spritesheet('ball', 'assets/pc/wobble2.png', 60, 60);
		}
		else{
			game.load.image('background', 'assets/mobile/background2.png');
			game.load.image('paddle', 'assets/mobile/paddle2.png');
			game.load.image('brick', 'assets/mobile/brick2.png');
			game.load.spritesheet('title', 'assets/mobile/titlesprite.png',780,159);
			game.load.image('pauseScreen', 'assets/mobile/pausebackground.png');
			game.load.image('creator', 'assets/mobile/creator.png');
			game.load.spritesheet('ball', 'assets/mobile/wobble2.png', 60, 60);
		}
		/**
		 * TouchControl plugin Assets.
		 * These are common to both devices.
		 * The key names shoudn't be modified.
		 */
		game.load.image('compass', 'assets/common/image/compass_rose.png');
		game.load.image('touch_segment', 'assets/common/image/touch_segment.png');
		game.load.image('touch', 'assets/common/image/touch.png');
	},	
	/**
	 * Loads google fonts and FontAwesome fonts assets asyncronously.
	 *@method
	 *@private
	*/
	loadFonts: function(){
		WebFontConfig ={
			google: {
				families:['Alex Brush', 'Lato']
			},
			custom:{
				families: ['FontAwesome']
			}
		};
	},
	
	/**
	 * Loads all the other classes and 3rd party scripts asyncronously.
	 *@method
	 *@private
	*/
	loadScripts: function(){
		game.load.script('webfont','//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		game.load.script('FontAwesome','//use.fontawesome.com/d902360c6f.js');
		game.load.script('TouchControl','lib/phaser-touch-control.min.js');
		game.load.script('VirtualFireworks','lib/VirtualFireworks.js');
		game.load.json('appManifest','appManifest.json');
		/*game.load.script('mixins','js/mixins.js');
		game.load.script('levels','js/levels.js');
		game.load.script('style','js/style.js');
		game.load.script('Intro','js/intro.js');
		game.load.script('Menu','js/menu.js');
		game.load.script('Options','js/options.js');
		game.load.script('Credits','js/credits.js');
		game.load.script('Play','js/play.js');
		game.load.script('LevelComplete','js/levelcomplete.js');
		game.load.script('GameOver','js/gameover.js');
		game.load.script('GameBeat','js/gamecomplete.js');
		game.load.script('datastore','js/datastore.js');*/
	},
	/**
	 * Initializes the classes' properties.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	init: function(){
		this.progressBar = game.make.sprite(game.world.centerX - 450/2, game.world.centerY + 240, 'progress');
		this.gameIcon = game.make.sprite(game.world.centerX , game.world.centerY, 'gameIcon');
		this.status = game.make.text(game.world.centerX, game.world.centerY + 340, 'Initializing...',{fontSize:"80px", fill:'#fff'});
		this.splashBg = game.make.sprite(0,0,'splashBg');
		utils.centerGameObjects([this.gameIcon, this.status]);
	},
	/**
	 * Loads the assests and prepares them to render in the canvas.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	preload: function(){
		game.add.existing(this.splashBg);
		game.add.existing(this.gameIcon);
		game.add.existing(this.progressBar);
		game.add.existing(this.status);
		this.load.setPreloadSprite(this.progressBar);
		
		this.splashBg.width = game.world.width;
		this.splashBg.height = game.world.height;
		
		this.loadScripts();
		this.loadImages();
		this.loadFonts();
		this.loadMusic();
	},
	/**
	 * Adds the necessary Phaser game states of the game.
	 *@method
	 *@private
	*/
	addGameStates: function(){
		game.state.add("Intro", Intro);
		game.state.add("Menu", Menu);
		game.state.add("Play",Play);
		game.state.add("GameOver", GameOver);
		game.state.add("LevelComplete", LevelComplete);
		game.state.add("GameBeat", GameBeat);
		game.state.add("Credits", Credits);
		game.state.add("Options", Options);
	},
	/**
	 * creates the music objects for in-game sound experience.
	 *@method
	 *@private
	*/
	addGameMusic: function(){
		musicPlayer.bgMusic.introTheme = game.add.audio('introTheme');
		musicPlayer.bgMusic.menuMusic = game.add.audio('menuMusic');
		musicPlayer.bgMusic.gameMusic = game.add.audio('bgm');
		musicPlayer.SFXPlayer.menuHover = game.add.audio('menuhover');
		musicPlayer.SFXPlayer.menudown = game.add.audio('menudown');
		musicPlayer.SFXPlayer.paddleHit = game.add.audio('paddleHit');
		musicPlayer.SFXPlayer.wallHit = game.add.audio('wallHit');
		musicPlayer.SFXPlayer.brickHit = game.add.audio('brickHit');
		
		for(var players in musicPlayer.bgMusic){
			musicPlayer.bgMusic[players].volume = musicPlayer.volumeManager.bgmVolume;
		}
		
		for(var players in musicPlayer.SFXPlayer){
			musicPlayer.SFXPlayer[players].volume = musicPlayer.volumeManager.sfxVolume;
		}
	},	
	/**
	 * Adds the created assets to the canvas and loads all the assets.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	create: function(){
		this.status.setText("All Systems Go!");
		
		this.addGameStates();
		this.addGameMusic();
		
		
		this.state.start("Intro");
		
		console.log("%cAll Systems Go!", "color:white; background:green");
	}
};
/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io|Author}
 *@copyright 2017 Vijaykoushik, S.
*/
/**
 *@classdesc
 * A common class for addig game menu options that can be inherited by other classes.
 * Provides textbased menu rendering with mouse over , inputup and input out functionalities.
 *@class
 *@description Common class for adding menu to the game.
 */
var mixins = {
	/**
	 * Adds text based menuitem option to the screen.
	 *@method
	 *@private
	 *@param {string} text The name of the menu item.
	 *@param {function} callBack The callback method to be executed when the menu item is selected.
	 *@param {string} styleName Name of the style to be applied to the menuitem. It should be a property of style class
	*/
	addMenuOption: function(text, callBack, styleName){
		styleName || (styleName = this.menuConfig.styleName || '_default');
		
		var x = this.menuConfig.startX === 'center'? game.world.centerX: this.menuConfig.startX;
		var y = this.menuConfig.startY;
		
		var txt = game.add.text(x, (this.optionCount*250) + y, text, style.navItem[styleName]);
		txt.anchor.setTo(this.menuConfig.startX === 'center'? 0.5: 0.0);
		txt.inputEnabled = true;
		txt.events.onInputUp.add(function(target){
			musicPlayer.SFXPlayer.menudown.play();
			callBack(target, this);
		},this);
		txt.events.onInputOver.add(function(target){
			target.setStyle(style.navItem._hover);
			musicPlayer.SFXPlayer.menuHover.play();
		},this);
		txt.events.onInputOut.add(function(target){
			target.setStyle(style.navItem[styleName]);
		});
		this.optionCount++;
	}
};
//console.log("%c %c Levels loaded. %c ","background:#192a43","color:white;background:#2d84b6","background:#192a43");
;(function(){
	levels = {
		"level":[
					{
						"data":[
								[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
								[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
								[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
								[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
								[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
								[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
								[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
								[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
							],
					
						"title": "Gotta Smash'm all"
					},
					{
						"data":[
								[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
								[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
								[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
								[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
								[0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
								[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
								[1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
								[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
							],
					
						"title": "Vanakam"
					},
					{
						"data":[
									[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									[1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
									[1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
									[1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
									[1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
									[1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
									[1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
									[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
								],
						"title": " Smash 101 "
					},
					{
						"data":[
									[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
									[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
									[0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
									[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
									[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
									[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
								],
						"title": "Pyramid"
					},
					{
						"data":[
								[0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
								[0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
								[1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
								[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
								[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
								[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
								[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
								[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
							],
					
						"title": "Triangles"
					},
					{
						"data":[
								[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
								[0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
								[0, 0, 0, 1, 1, 0, 1, 1, 0, 0],
								[0, 0, 0, 1, 1, 0, 1, 1, 0, 0],
								[0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
								[0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
								[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
								[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
							],
					
						"title": "Saved"
					},
					{
						"data":[
								[0, 0, 0, 1, 11, 1, 0, 0, 0, 0],
								[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
								[0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
								[0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
								[0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
								[0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
								[0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
								[0, 0, 0, 1, 1, 1, 1, 0, 0, 0]
							],
					
						"title": "Peace"
					},
					{
						"data":[
								[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
								[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
								[0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
								[1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
								[1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
								[0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
								[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
								[0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
							],
					
						"title": "I'm watching you"
					},					
					{
						"data":[
								[0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
								[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
								[0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
								[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
								[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
								[0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
								[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
								[0, 1, 0, 0, 0, 0, 0, 0, 1, 0]
							],
					
						"title": "X marks the spot"
					},
					{
						"data":[
								[1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
								[1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
								[1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
								[1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
								[1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
								[1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
								[1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
								[1, 1, 0, 1, 1, 0, 1, 1, 0, 1]
							],
					
						"title": "Supporting pillars"
					}
		]
	};
})();
/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io|Author}
 *@copyright 2017 Vijaykoushik, S.
*/
/**************************/
/*	styles				 */
/************************/

(function(){
	/**
	 * The default Css style color specification for the menu item.
	 *@const
	 *@default
	*/
	var defaultColor = "#fff",
		/**
		 * Css style color specification for highlighting the menu item.
		 *@const
		 *@default
		*/
		highlightColor = "#ffff18";
		/**
		 *@classdesc
		 * Initializes the text styles for the texts in the game.
		 *@class
		 *@description Initializes the text styles for the game menus.
		*/
	style = {
		/**
		 *Styles for menu items or navigation items.
		 *@property {object} navItem
		 *@static
		*/
		navItem:{
			/**
			 *The base style for the text to render.
			 *@property {object} _base
			 *@static
			*/
			_base:{
				/**
				 *The base style for the text to render.
				 *@property {string} font				- Css style font specification.
				 *@default
				 *@property {string} align				- Defines the alignment of the text.
				 *@default
				 *@property {number} strokeThickness	- Defines thickness of the brush stroke.
				 *@default
				*/
				font: "100px Alex Brush",
				align:"center",
				strokeThickness:4
			},
			/**
			 *Default color styles to render.
			 *@property {object} _default
			 *@static
			*/
			_default:{
				/**
				 *The base style for the text to render.
				 *@property {string} fill				- Css style color specification for filling the item.
				 *@default
				 *@property {string} stroke				- Css style color specification for brush stroke.
				 *@default
				*/
				fill: defaultColor,
				stroke: "rgba(0,0,0,0)"
			},
			/**
			 *Color styles on mouse over event.
			 *@property {object} _hover
			 *@static
			*/
			_hover:{
				/**
				 *The base style for the text to render.
				 *@property {string} fill				- Css style color specification for filling the item.
				 *@default
				 *@property {string} stroke				- Css style color specification for brush stroke.
				 *@default
				*/
				fill: highlightColor,
				stroke: "rgba(200, 200, 200, 0.5)"
			},
			/**
			 *Invert the default style.
			 *@property {object} _inverse
			 *@static
			*/
			_inverse:{
				/**
				 *The base style for the text to render.
				 *@property {string} fill				- Css style color specification for filling the item.
				 *@default
				 *@property {string} stroke				- Css style color specification for brush stroke.
				 *@default
				*/
				fill: "#fff",
				stroke: "#fff"
			}
		}
	};
	
	for(var key in style.navItem){
		if(key != "_base"){
			Object.assign(style.navItem[key], style.navItem._base);
		}
	}
})();
/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io|Author}
 *@copyright 2017 Vijaykoushik, S.
*/
/**************************/
/*	Intro screen		 */
/************************/
/**
 *@classdesc
 * Renders the title card of the game.
 * The intro state comes after the splash state.
 *@class
 *@description Shows the title card.
 */
Intro.prototype = {
	/**
	 * Initializes the classes' properties.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	init: function(){
		this.creator = game.make.sprite(game.world.centerX, game.world.centerY - 100, 'creator');
		this.introText = game.make.text(game.world.centerX, game.world.centerY + 300, 'Presents', {font: '120px Alex Brush', fill:'#fff'});
		this.logo = game.make.sprite(game.world.centerX, game.world.centerY, 'title');
		this.messageText = game.make.text(game.world.centerX, game.world.centerY + 300, '- click to start -', {font: '100px Alex Brush', fill:'#fff'});
		//this.introTheme = game.make.audio('introTheme');
		utils.centerGameObjects([this.creator, this.introText, this.logo, this.messageText]);
	},	
	/**
	 * Adds the created assets to the canvas.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	create: function(){
		game.add.existing(this.creator);
		game.add.existing(this.introText);
		game.add.existing(this.logo);
		game.add.existing(this.messageText);
		
		utils.setTransparency([this.creator, this.introText, this.logo, this.messageText],0);
		utils.fadeInOut([this.creator, this.introText]);
		game.time.events.add(5000, function(){
			utils.fadeIn([this.logo, this.messageText],2000);
			musicPlayer.bgMusic.introTheme.play();
			console.log("%c %cIntroduction complete.","background:#02ff00","color:white;background:green");
			game.input.onDown.addOnce(function(){
				game.state.start('Menu');
				musicPlayer.bgMusic.introTheme.stop();
			},this);
		},this);
	}
};
/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io|Author}
 *@copyright 2017 Vijaykoushik, S.
*/
/**************************/
/*	Game Menu		 	 */
/************************/
/**
 *@classdesc
 * Renders the main menu for the game.
 * The menu state comes after the intro state.
 *@class
 *@description Shows the game's main menu.
 */
Menu.prototype = {
	/**
	 * Initializes the classes' properties.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	init: function(){
		this.logo = game.make.sprite(game.world.centerX, 120, 'title');
		utils.centerGameObjects([this.logo]);
		this.bgImg = game.make.image(0,0,'background');
		//this.menuMusic = game.make.audio('menuMusic');
		//this.menuHover = game.make.audio('menuhover');
		//this.menudown = game.make.audio('menudown');
		this.fullscreenIcon = game.make.text(game.world.bounds.width - 100, game.world.bounds.height - 100,"\uf065", {font: "80px FontAwesome", fill:"#fff",stroke: "rgba(0,0,0,0)"});
		this.optionCount = 1;
		this.virtualFireworks = this.game.plugins.add(Phaser.Plugin.VirtualFireworks);
		//this.virtualFireworks.active = false;
	},
	
	/**
	 * Reads the player stats from the game's datastore.
	 *@method
	 *@private
	*/	
	getPlayerStats: function(){
		var tempStats;
		if(datastore.length!=0){
			tempStats = datastore.getItemAsObject('playerStats');
			for(key in globalData.playerStats){
				if(typeof(key) == 'object'){
					for(k in key){
						globalData.playerStats[key][k] = tempStats[key][k];
					}
				}
				else{
					globalData.playerStats[key] = tempStats[key]?tempStats[key]:0;
				}
			}
		}
	},
	
	/**
	 * Adds the created menu to the canvas.
	 * Phaser framework method.
	 *@method
	 *@private
	*/	
	create: function(){
		//game.add.tileSprite(0, 0, 480, 320, 'background');
		game.add.existing(this.bgImg);
		
		this.virtualFireworks.draw();
		
		game.add.existing(this.logo);
		this.logo.frame = 1;
		
		//musicPlayer.bgMusic.menuMusic.volume = musicPlayer.bgmVolume;
		//musicPlayer.bgMusic.menuMusic.loop =true;
		if(!musicPlayer.bgMusic.menuMusic.isPlaying) musicPlayer.bgMusic.menuMusic.play();
		
		this.getPlayerStats();
		
		this.addMenuOption('Start', function(menu, context){
			console.log("%c %c Start clicked. %c ","background:#192a43","color:white;background:#2d84b6","background:#192a43");
			context.game.plugins.remove(context.virtualFireworks);
			game.state.start('Play');
		});
		this.addMenuOption('Options', function(menu, context){
			console.log("%c %c Options clicked. %c ","background:#192a43","color:white;background:#2d84b6","background:#192a43");
			context.game.plugins.remove(context.virtualFireworks);
			game.state.start("Options");
		});
		this.addMenuOption('Credits', function(menu, context){
			game.state.start('Credits');
			console.log("%c %c Credits clicked. %c ","background:#192a43","color:white;background:#2d84b6","background:#192a43");
			context.game.plugins.remove(context.virtualFireworks);
		});
		
		this.add.existing(this.fullscreenIcon);
		this.fullscreenIcon.inputEnabled = true;
		this.fullscreenIcon.events.onInputUp.add(function(){
			musicPlayer.SFXPlayer.menudown.play();
			if (game.scale.isFullScreen)
			{
				game.scale.stopFullScreen();
				this.fullscreenIcon.text = "\uf065";
			}
			else
			{
				game.scale.startFullScreen(false);
				this.fullscreenIcon.text = "\uf066";
			}
		},this);
	},
	
	/**
	 *It contains the properties for configuring the menu's rendering.
	 *@property {object} menuConfig
	 *@property {number} menuConfig.startX	- X Coordinate for the menu
	 *@property {number} menuConfig.startY	- Y Coordinate for the menu
	*/
	menuConfig:{
		startX: 192,
		startY: 150
	},
	/**
	* Updates the game every frame.
	* Phaser framework method.
	*@method
	*@private
   */
	update: function(){
		this.virtualFireworks.update();
	}
};
/*Mixes the mixins' properties with Menu.prototype's properties*/
Phaser.Utils.mixinPrototype(Menu.prototype, mixins);
/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io|Author}
 *@copyright 2017 Vijaykoushik, S.
*/
/**************************/
/*	Options				 */
/************************/
/**
 *@classdesc
 * Renders the option (or) settings menu for the game.
 * The menu state comes after the intro state.
 *@class
 *@description Shows the game's option menu.
 */
Options.prototype = {
	/**
	 * Initializes the classes' properties.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	init:function(){
		this.logo = game.make.sprite(game.world.centerX, 120, 'title');
		utils.centerGameObjects([this.logo]);
		this.optionCount = 1;
	},
	
	/**
	 * Mutes the audio of the specified phaser audio player.
	 *@method
	 *@private
	 *@param {object} player	- musicPlayer object that needs to be muted.
	*/	
	muteAudio: function(player){
		for(var players in player){
			player[players].volume = 0;
		}
	},
	
	/**
	 * Unmutes the audio of the specified phaser audio player.
	 *@method
	 *@private
	 *@param {object} player	- musicPlayer object that needs to be unmuted.
	 *@param {number} player	- level of volume to be set to the musicPlayer that is unmuted. The value is between 0.1 and 1
	*/	
	unmuteAudio: function(player, volume){
		for(var players in player){
			player[players].volume = volume;
		}
	},
	
	/**
	 * Adds the created menu to the canvas.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	create:function(){
		game.add.image(0, 0, 'background');
		game.add.existing(this.logo);
		this.logo.frame = 1;
		
		if(!musicPlayer.bgMusic.menuMusic.isPlaying) musicPlayer.bgMusic.menuMusic.play();
		
		this.addMenuOption("Music: ".concat(gameOptions.playMusic?'Off ': 'On '), function(target, evenArg){
			gameOptions.playMusic = !gameOptions.playMusic;
			target.text = "Music: ".concat(gameOptions.playMusic?'Off ': 'On ');
			gameOptions.playMusic? evenArg.unmuteAudio(musicPlayer.bgMusic, musicPlayer.volumeManager.bgmVolume): evenArg.muteAudio(musicPlayer.bgMusic);
			console.log("%c %c Music: ".concat(gameOptions.playMusic?'ON': 'OFF') + ". %c ","background:grey","color:white;background:black","background:grey");
		});
		this.addMenuOption('SFX: '.concat(gameOptions.playSFX?'Off ': 'On '), function(target, evenArg){
			gameOptions.playSFX = !gameOptions.playSFX;
			target.text = 'SFX: '.concat(gameOptions.playSFX?'Off ': 'On ');
			gameOptions.playSFX? evenArg.unmuteAudio(musicPlayer.SFXPlayer, musicPlayer.volumeManager.sfxVolume): evenArg.muteAudio(musicPlayer.SFXPlayer);
			console.log("%c %c SFX: ".concat(gameOptions.playSFX?'ON': 'OFF') + ". %c ","background:grey","color:white;background:black","background:grey");
		});
		this.addMenuOption('Back', function(){
			game.state.start("Menu");
		});
	},
	
	/**
	 *It contains the properties for configuring the menu's rendering.
	 *@property {object} menuConfig
	 *@property {string} menuConfig.style	- Text rendering style for the menu.
	 *@property {string} menuConfig.startX	- choose the midpoint of the canvas as the X coordinate.
	 *@property {number} menuConfig.startY	- Y Coordinate for the menu.
	*/
	menuConfig:{
		style: '_inverse',
		startX: 'center',
		startY: 120
	}
};

/*Mixes the mixins' properties with Options.prototype's properties*/
Phaser.Utils.mixinPrototype(Options.prototype, mixins);
/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io|Author}
 *@copyright 2017 Vijaykoushik, S.
*/
/**************************/
/*	Credits				 */
/************************/
/**
 *@classdesc
 * Renders the credits screen for the game.
 * Credits state is shown when credits option is chosen in the game menu.
 *@class
 *@description Rolls the game's credits.
 */
Credits.prototype = {
	/**
	 *Defines the navigation style for the credits screen including the credits text.
	 *@property {object} navigatorStyle
	 *@private
	*/
		navigatorStyle:{
		/**
		 *Defines the CSS style font specifications for the forward and backward buttons.
		 *@property {object} navigatorStyle.credits
		 *@private
		 *@property {string} navigatorStyle.credits.font	- CSS style font specification.
		 *@property {string} navigatorStyle.credits.fill	- CSS style fill color specification.
		 *@property {string} navigatorStyle.credits.stroke	- CSS style stroke color specification.
		 *@property {number} navigatorStyle.credits.strokeThickness	- Thickness of brush stroke.
		*/
		credits:{
			font: '150px FontAwesome',
			fill: '#fff',
			stroke:'#000',
			strokeThickness: 2
		},
		/**
		 *Defines the CSS style font specifications for the back to previous screen button.
		 *@property {object} navigatorStyle.backBtn
		 *@private
		 *@property {string} navigatorStyle.backBtn.font	- CSS style font specification.
		 *@property {string} navigatorStyle.backBtn.fill	- CSS style fill color specification.
		 *@property {string} navigatorStyle.backBtn.stroke	- CSS style stroke color specification.
		*/
		backBtn:{
			font: '80px FontAwesome',
			fill: '#fff',
			stroke:'#000',
		},
		/**
		 *Defines the CSS style font specifications for the credits text.
		 *@property {object} navigatorStyle.creditsText
		 *@private
		 *@property {string} navigatorStyle.creditsText.font	- CSS style font specification.
		 *@property {string} navigatorStyle.creditsText.fill	- CSS style fill color specification.
		 *@property {string} navigatorStyle.creditsText.stroke	- CSS style stroke color specification.
		 *@property {number} navigatorStyle.creditsText.strokeThickness	- Thickness of brush stroke.
		*/
		creditsText:{
			font: '100px Lato',
			fill: '#fff',
			stroke:'#000',
			strokeThickness: 1
		}
	},
	/**
	 *@property {object} props				- Credits screen props that specify the amount of text to be renderd.
	 *@private
	 *@default
	 *@property {number} props.pageSize		- total number of lines in a page.
	 *@property {number} props.currentPage	- current page number.
	 *@property {number} props.totalPage	- total number of pages.
	 *@property {object} props.pageContents	- an array that contains the page contents.
	*/
	props:{
		pageSize: 6,
		currentPage: 1,
		totalPage:0,
		pageContents: new Array()
	},
	/**
	 * Gets the current page's contents
	 *@method
	 *@private
	 *@param {number}pageNo - The current page number.
	*/
	getCurrentPage: function(pageNo){
		--pageNo;
		return this.creditScreens.slice(pageNo * this.props.pageSize, (pageNo + 1) * this.props.pageSize)
	},
	/**
	 * Adds the credits text to the current page renders them.
	 *@method
	 *@private
	 *@param {{(string|Array)}creditStrings - An array of credits text to be rendered in the current page.
	*/
	addCreditScreen: function(creditStrings){
		for(var i = 0; i < creditStrings.length; i++){
			var txt = game.add.text(game.world.centerX, i * 100 + 480,creditStrings[i], this.navigatorStyle.creditsText);
			this.props.pageContents.push(txt);
			utils.centerGameObjects([txt]);
		}
	},
	/**
	 * Destroys the current page contents.
	 *@method
	 *@private
	*/
	destroyCreditText: function(){
		while(this.props.pageContents.length){
			var txt = this.props.pageContents.pop();
			txt.destroy();
		}
	},
	/**
	 * Called before the previous page is rendered.
	 *@method
	 *@private
	*/
	onbeforePrevious: function(){
		this.destroyCreditText();
	},
	/**
	 * Event handler that is executed when the previous button is pressed.
	 * Calls {@link onbeforePrevious} method.
	 *@method
	 *@private
	*/
	onPrevious: function(){
		this.onbeforePrevious();
		--this.props.currentPage;
		this.togglePrevious();
		this.toggleNext();
		this.addCreditScreen(this.getCurrentPage(this.props.currentPage));
		this.updatePageNo();
		musicPlayer.SFXPlayer.menudown.play();
	},
	/**
	 * Called before the next page is rendered.
	 *@method
	 *@private
	*/
	onbeforeNext: function(){
		this.destroyCreditText();
	},
	/**
	 * Event handler that is executed when the next button is pressed.
	 * Calls {@link onbeforeNext} method.
	 *@method
	 *@private
	*/
	onNext: function(){
		this.onbeforeNext();
		++this.props.currentPage;
		this.togglePrevious();
		this.toggleNext();
		this.addCreditScreen(this.getCurrentPage(this.props.currentPage));
		this.updatePageNo();
		musicPlayer.SFXPlayer.menudown.play();
	},
	/**
	 * Toggles the previous button's visibility based on the current page number.
	 * Hides the button when on the very first page.
	 *@method
	 *@private
	*/
	togglePrevious: function(){
		if(!this.canPrevious()){
			this.previousScreen.inputEnabled = false;
			if(this.previousScreen.alpha == 1) utils.fadeOut([this.previousScreen],250);
		}
		else{
			this.previousScreen.inputEnabled = true;
			if(this.previousScreen.alpha == 0) utils.fadeIn([this.previousScreen],250);
		}
	},
	/**
	 * Toggles the next button's visibility based on the current page number.
	 * Hides the button when on the very last page.
	 *@method
	 *@private
	*/
	toggleNext: function(){
		if(!this.canNext()){
			this.nextScreen.inputEnabled = false;
			if(this.nextScreen.alpha == 1) utils.fadeOut([this.nextScreen],250);
		}
		else{
			this.nextScreen.inputEnabled = true;
			if(this.nextScreen.alpha == 0) utils.fadeIn([this.nextScreen],250);
		}
	},
	/**
	 * Checks wether switching to previous page is possible.
	 *@returns {boolean}
	 *@method
	 *@private
	*/
	canPrevious: function(){
		return this.props.currentPage > 1;
	},
	/**
	 * Checks wether switching to next page is possible.
	 *@returns {boolean}
	 *@method
	 *@private
	*/
	canNext: function(){
		return this.props.currentPage < this.props.totalPage;
	},
	/**
	 * Updates the page number on the page footer while navigating through the pages.
	 *@method
	 *@private
	*/
	updatePageNo: function(){
		this.pageFooter.text =  this.props.currentPage + " of " + this.props.totalPage;
	},
	/**
	 * Initializes the classes' properties.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	init: function(){
		this.previousScreen = game.make.text(60, game.world.centerY, "\uf053", this.navigatorStyle.credits);
		this.nextScreen = game.make.text(game.world.width - 60,game.world.centerY, "\uf054",this.navigatorStyle.credits);
		this.backIcon = game.make.text(60, 150,"\uf0a8", this.navigatorStyle.backBtn);
		this.logo = game.make.sprite(game.world.centerX, 120, 'title');
		this.manifest = game.cache.getJSON('appManifest');
		this.creditScreens = [this.manifest.name.toUpperCase(), " ", "Version: " + this.manifest.version, " ","Game Design, Game Developement"," ", "Vijay Koushik, S.", " ","MUSIC", " ","Awaiting Return","Cool Intro", "Doobly Doo", "by","Kevin MacLeod (incompetech.com)","Licensed under Creative Commons:", "By Attribution 3.0 License", " ", "SPECIAL THANKS"," ", "Phaser.io", "freesound.org", "MDN", "Stackoverflow.com", "html5gamedev.com"," "," "," ","svijaykoushik.github.io", "2017"];
		
		this.props.totalPage = Math.ceil(this.creditScreens.length/this.props.pageSize);
		this.pageFooter = game.make.text(game.world.centerX, game.world.height - 50, this.props.currentPage + " of " + this.props.totalPage, this.navigatorStyle.creditsText);
		utils.centerGameObjects([this.previousScreen, this.nextScreen, this.backIcon, this.logo, this.pageFooter]);
	},
	/**
	 * Adds the created credits screen to the canvas.
	 * Phaser framework method.
	 *@method
	 *@private
	*/	
	create: function(){
		game.add.image(0, 0, 'background');
		game.add.existing(this.logo);
		this.logo.frame = 1;
		game.add.existing(this.previousScreen);
		game.add.existing(this.nextScreen);
		game.add.existing(this.backIcon);
		game.add.existing(this.pageFooter);
		
		this.togglePrevious();
		this.toggleNext();
		this.previousScreen.events.onInputUp.add(this.onPrevious,this);
		this.nextScreen.events.onInputUp.add(this.onNext,this);
		
		this.backIcon.inputEnabled = true;
		this.backIcon.events.onInputUp.add(function(){
			musicPlayer.SFXPlayer.menudown.play();
			game.state.start('Menu');
		});
		this.addCreditScreen(this.getCurrentPage(this.props.currentPage));
	}
}
/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io |Author}
 *@copyright 2017 Vijaykoushik, S.
*/
/**************************/
/*	Play gmae			 */
/************************/
/**
 *@classdesc
 * Renders the actual game.
 * Defines and handles the physics for the game.
 * Performs score calculation.
 *@class
 *@description Shows the game's main menu.
 */
Play.prototype ={
	
	/**
	 *It contains the properties for font style for rendering the text.
	 *@property {object} textStyle
	 *@property {string} textStyle.font	- CSS style font style specification.
	 *@property {fill} textStyle.fill	- CSS style color specification for fill color.
	*/
	textStyle:{
		font: '54px Lato',
		fill: '#fff'
	},
	
	/**
	 * Initializes the classes' properties.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	init:function(){
		this.score = globalData.currentScore;
		this.lives = globalData.playerLives;
		this.playing = true;
		this.ballOnPaddle = true;
		this.pauseInitialized = false;
		this.levelStruct = {
			"title": levels.level[currentLevel].title,
			"data":levels.level[currentLevel].data
		};
		this.hitStreak = 0;
		globalData.hitStreak = 0;
		this.scoreBuffer = globalData.currentScore;
		/**
		 * Touch control plugin.
		 * Added if device supports touch
		 */
		if(game.device.touch){
			this.touchControl = game.plugins.add(Phaser.Plugin.TouchControl);
			this.touchControl.inputEnable();
			this.touchControl.settings.singleDirection = true;
			this.touchControl.settings.maxDistanceInPixels = 100;
		}

		this.manifest = game.cache.getJSON('appManifest');
		this.paddle = game.make.sprite(game.world.width*0.5, game.world.height-50, 'paddle');
		this.ball = game.make.sprite(game.world.width*0.5, this.paddle.y - 45, 'ball');
		this.pauseScreen = game.make.sprite(game.world.centerX, game.world.centerY, 'pauseScreen');
		
		game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
		this.paddle.body.immovable = true;
		
		
		this.ball.animations.add('wobble', [0,2,0,1,0,2,0,1,0], 60);
		game.physics.enable(this.ball, Phaser.Physics.ARCADE);
		this.ball.body.collideWorldBounds = true;
		this.ball.body.bounce.set(1);
		this.ball.checkWorldBounds = true;
		this.ball.body.onWorldBounds = new Phaser.Signal();
		this.ball.body.onWorldBounds.add(this.ballHitWall,this);
		this.ball.events.onOutOfBounds.add(this.ballLeaveScreen, this);
		
		
		//this.startText = game.make.text(game.world.centerX, game.world.centerY, '- click to start -', this.textStyle);
		this.startText = game.make.text(game.world.centerX, game.world.centerY, '- ' + this.levelStruct.title + ' -', this.textStyle);
		this.pauseText = game.make.text(15, 15, 'Pause', this.textStyle);
		this.scoreText = game.make.text(game.world.centerX, 45, this.scoreBuffer, this.textStyle);
		this.livesText = game.make.text(game.world.width - 15, 15, 'Lives: '+ this.lives, this.textStyle);
		this.livesText.anchor.set(1,0);
		this.lifeLostText = game.make.text(game.world.width*0.5, game.world.height*0.5, 'Life lost, tap to continue', this.textStyle);
		this.hitStreakText = game.make.text(Math.abs(game.world.centerX - (game.world.width - 15))/2, 45, "x" + this.hitStreak, this.textStyle);
		this.lifeLostText.visible = false;
		this.pause_menuitem_resume = game.make.text(this.pauseScreen.x, this.pauseScreen.y - 70, 'Resume', style.navItem._default);
		this.pause_menuitem_menu = game.make.text(this.pauseScreen.x, this.pauseScreen.y + 120, 'Main Menu', style.navItem._default);
		utils.centerGameObjects([this.paddle, this.ball, this.lifeLostText, this.startText, this.scoreText, this.pauseScreen, this.pause_menuitem_resume, this.pause_menuitem_menu, this.hitStreakText]);
		
	},
	
	/**
	 * input down Event handler for start text element that initiates the game level.
	 *@method
	 *@private
	 *@depricated
	*/	
	startGame: function(){
		this.startText.destroy();
		this.releaseBall();
		this.playing = true;
	},
	
	/**
	 * Event handler to perform sfx action when ball hits the walls.
	 *@method
	 *@private
	*/	
	ballHitWall:function(){
		musicPlayer.SFXPlayer.wallHit.play();
	},
	
	/**
	 * Event handler to perform life deduction and game over state management.
	 *@method
	 *@private
	*/
	ballLeaveScreen: function(){
		this.lives--;
		this.hitStreak = 0;
		this.setHitStreak();	
		if(this.lives) {
			this.livesText.setText('Lives: '+ this.lives);
			this.lifeLostText.text = 'Ball lost';
			this.lifeLostText.visible = true;
			this.ballOnPaddle = true;
			this.resetBall();
			/*game.input.onDown.addOnce(function(){
				this.lifeLostText.visible = false;
				this.releaseBall();
			}, this);*/
		}
		else {
			/*alert('You lost, game over!');
			location.reload();*/
			globalData.currentScore = this.score;
			globalData.playerStats.score.highScore = globalData.highScore;
			globalData.playerStats.score.playerScore = globalData.currentScore;
			globalData.playerStats.progress = parseFloat((currentLevel / (levels.level.length - 1) * 100).toFixed(2));
			if(globalData.playerStats.levels.highestLevel <= currentLevel){				
				globalData.playerStats.levels.highestLevel = currentLevel;
				globalData.playerStats.levels.levelName = levels.level[currentLevel].title;
			}
			datastore.setItem('playerStats', globalData.playerStats);
			/*if(datastore != null){
				datastore.setItem('player',JSON.stringify({
					highestLevel: currentLevel,
					highscore: globalData.highScore,
					lastscore: globalData.currentScore
				}));
			}*/
			musicPlayer.bgMusic.gameMusic.stop();
			game.state.start('GameOver');
		}
	},
	
	/**
	 * Event handler that is executed when ball hits the paddle.
	 * Plays wobble animation of the ball.
	 * Determines the rebound direction of the ball.
	 *@method
	 *@private
	 *@param {object} ball		- Phaser sprite object for the ball.
	 *@param {object} paddle	- Phaser sprite object for the paddle.
	*/
	ballHitPaddle: function(ball, paddle){
		var diff = 0;
		this.hitStreak = 0;
		ball.animations.play('wobble');
		musicPlayer.SFXPlayer.paddleHit.play();
		this.setHitStreak();
		//ball.body.velocity.x = -1*10*(paddle.x - ball.x);
		if(ball.x < paddle.x){
			diff = paddle.x - ball.x;
			ball.body.velocity.x = (-10 * diff);
		}
		else if(ball.x > paddle.x){
			diff = ball.x - paddle.x;
			ball.body.velocity.x = (10 * diff);
		}
		else{
			ball.body.velocity.x = 2 + Math.random() * 8;
		}
	},
	
	/**
	 * Releases the ball when the player is ready.
	 *@method
	 *@private
	*/
	releaseBall: function(){
		if(this.ballOnPaddle){
			this.ballOnPaddle = false;
			this.lifeLostText.visible = false;
			this.ball.body.velocity.set(350 + (currentLevel * 15), -(350 + (currentLevel * 15)));
		}
	},
	
	/**
	 * Event handler that is executed when ball hits any of the bricks.
	 * Destroys the brick that the ball hits.
	 * Plays tweening animation when the brick is destroyed.
	 * Performs score calculation.
	 * Determines the level complete state.
	 *@method
	 *@private
	 *@param {object} ball	- Phaser sprite object for the ball.
	 *@param {object} brick	- Phaser sprite object for the brick.
	*/
	ballHitBrick: function(ball, brick){
		var killTween = game.add.tween(brick.scale);
		killTween.to({x:0,y:0}, 200, Phaser.Easing.Linear.None);
		killTween.onComplete.addOnce(function(){
			brick.kill();
			if(this.bricks.countLiving() === 0) {
				this.score += currentLevel*10;
				this.score *= globalData.hitStreak;
				this.hitStreak = 0;
				globalData.currentScore = this.score;
				if(this.isGreaterThanOrEqual(this.score, globalData.highScore)) globalData.highScore = this.score;
				globalData.playerLives = this.lives;
				game.state.start('LevelComplete');
				/*this.level++;
				this.scoreText.text= this.score;
				this.lifeLostText.text = '- Level ' + this.level + '-';
				this.lifeLostText.visible = true;
				this.ballOnPaddle = true;
				this.ball.body.velocity.set(0);
				this.resetBall();
				this.bricks.callAll('revive');
				this.bricks.forEachAlive(function(revivedBrick){
					var reviveTween = game.add.tween(revivedBrick.scale);
					reviveTween.to({x:1,y:1}, 100, Phaser.Easing.Linear.None,true);
				},this);*/
			}
		}, this);
		killTween.start();
		musicPlayer.SFXPlayer.brickHit.play();
		this.hitStreak += 1;
		this.score += (10 * this.hitStreak);
		//if(this.score >= globalData.highScore) globalData.highScore = this.score;
		if(this.isGreaterThanOrEqual(this.score, globalData.highScore)) globalData.highScore = this.score;
		//this.scoreText.setText(this.score);		
		//if(this.hitStreak >= globalData.hitStreak) globalData.hitStreak = this.hitStreak;
		if(this.isGreaterThanOrEqual(this.hitStreak, globalData.hitStreak)) globalData.hitStreak = this.hitStreak;
		//this.hitStreakText.setText("x" + this.hitStreak);
		//this.animateText(this.scoreText);
		this.setHitStreak();	
	},
	
	/**
	 * Initializes the bricks according to the current level.
	 *@method
	 *@private
	*/	
	initBricks: function(){
		this.brickInfo = {
			width: 150,
			height: 60,
			count: {
				row: 10,
				col: 8
			},
			offset: {
				top: 150,
				left: 80
			},
			padding: 30
		};
		this.bricks = game.add.group();
		this.bricks.enableBody = true;
		this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
		/*for(var c=0; c<this.brickInfo.count.col; c++) {
			for(var r=0; r<this.brickInfo.count.row; r++) {
				var brickX = (r*(this.brickInfo.width + this.brickInfo.padding)) + this.brickInfo.offset.left;
				var brickY = (c*(this.brickInfo.height + this.brickInfo.padding)) + this.brickInfo.offset.top;
				//this.newBrick = game.add.sprite(brickX, brickY, 'brick');
				this.newBrick = this.bricks.create(brickX, brickY, 'brick');
				//game.physics.enable(this.newBrick, Phaser.Physics.ARCADE);
				this.newBrick.body.immovable = true;
				//this.newBrick.anchor.set(0.5);
				//this.bricks.add(this.newBrick);
			}
		}*/
		for(var c=0; c<this.brickInfo.count.col; c++) {
			for(var r=0; r<this.brickInfo.count.row; r++) {
				if(this.levelStruct.data[c][r] == 1){
					var brickX = (r*(this.brickInfo.width + this.brickInfo.padding)) + this.brickInfo.offset.left;
					var brickY = (c*(this.brickInfo.height + this.brickInfo.padding)) + this.brickInfo.offset.top;
					this.newBrick = this.bricks.create(brickX, brickY, 'brick');
					this.newBrick.body.immovable = true;
				}
			}
		}
	},
	
	/**
	 * Resets the ball and paddle to the default position.
	 * Called when a life is lost.
	 *@method
	 *@private
	*/	
	resetBall: function(){
		this.paddle.reset(game.world.width*0.5, game.world.height- 50);
		this.ball.reset(this.paddle.x + 60, this.paddle.y - 45);
	},
	
	/**
	 * Adds all the assets to the game world.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	create:function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.checkCollision.down = false;
		game.add.image(0, 0, 'background');
		game.add.existing(this.paddle);
		game.add.existing(this.ball);

		this.initBricks();
		
		game.add.existing(this.pauseText);
		game.add.existing(this.scoreText);
		game.add.existing(this.livesText);
		game.add.existing(this.lifeLostText);
		game.add.existing(this.startText);
		game.add.existing(this.hitStreakText);
		
		if(musicPlayer.bgMusic.menuMusic.isPlaying) musicPlayer.bgMusic.menuMusic.stop();
		//musicPlayer.bgMusic.gameMusic.volume = musicPlayer.bgmVolume;
		musicPlayer.bgMusic.gameMusic.loop = true;
		musicPlayer.bgMusic.gameMusic.play();
		
		//this.startText.inputEnabled = true;
		//this.startText.events.onInputUp.add(this.startGame, this);
		this.pauseText.inputEnabled = true;
		this.pauseText.events.onInputUp.add(this.showPauseScreen, this);
		
		game.input.onDown.add(function(){
			if(this.playing){
				this.lifeLostText.visible = false;
				this.startText.visible = false;
				this.releaseBall();
			}
			else{
				this.playing = true;
			}
		}, this);
		
		/*game.time.events.add(Phaser.Timer.SECOND * 4, function(){
			this.bricks.callAll('kill');
		},this);
		game.time.events.add(Phaser.Timer.SECOND * 8, function(){
			this.bricks.callAll('revive');
		},this);*/
	},
	
	/**
	 * Updates the game world every frame.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	update: function(){
		if(this.playing) {
			if(game.device.touch && !!this.touchControl){
				this.paddle.x += this.linearSpeed(this.touchControl.speed.x);
			} 
			else this.paddle.x = game.input.x || game.world.width*0.5;
			if(this.paddle.x < 112.5) {
				this.paddle.x = 112.5;
			}
			else if(this.paddle.x > game.width - 112.5) {
				this.paddle.x = game.width - 112.5;
			}
			if(this.ballOnPaddle) {
				this.ball.x = this.paddle.x;
			}
			else{
				game.physics.arcade.collide(this.ball, this.paddle, this.ballHitPaddle, null, this);
				game.physics.arcade.collide(this.ball, this.bricks, this.ballHitBrick, null, this);
			}
					
			if(this.hitStreak < 1){
				this.removeHitStreak();
			}
			else{
				this.addHitStreak();
			}

			if(this.scoreBuffer < this.score){
				this.scoreBuffer++;
				this.scoreText.setText(this.scoreBuffer);
			}
		}
	},
	
	/**
	 * Loads the assests and prepares them to render in the canvas.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	preload:function(){
		game.time.advancedTiming  = true;
		game.time.desiredFps = 60;
	},
	
	/**
	 * Debugging method that adds extra info on the screen.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	render: function(){
		//game.debug.text('render FPS: ' + (game.time.fps || '--') , 2, 14, "#00ff00");
		game.debug.text(this.manifest.name.toUpperCase(), 50, game.world.height - 250, "#00ff00", "50px Consolas");
		game.debug.text('Alpha', 250, game.world.height - 250, "#00ff00", "50px Consolas");
		game.debug.text('Version: '+this.manifest.version , 50, game.world.height - 200, "#00ff00", "50px Consolas");
		game.debug.text('render FPS: ' + (game.time.fps || '--') , 50, game.world.height - 150, "#00ff00", "50px Consolas");

		if (game.time.suggestedFps !== null)
		{
			game.debug.text('suggested FPS: ' + game.time.suggestedFps, 50, game.world.height - 100, "#00ff00", "50px Consolas");
			game.debug.text('desired FPS: ' + game.time.desiredFps, 50, game.world.height - 50, "#00ff00", "50px Consolas");
		}
	},
	
	/**
	 * Displays the pause screen.
	 * Pauses the entire game.
	 *@method
	 *@private
	*/
	showPauseScreen: function(){
		this.playing = false;
		game.paused = true;
		if(this.pauseInitialized === false){
			game.add.existing(this.pauseScreen);
			game.add.existing(this.pause_menuitem_resume);
			game.add.existing(this.pause_menuitem_menu);
			
			this.pause_menuitem_resume.inputEnabled = true;
			this.pause_menuitem_resume.events.onInputUp.add(function(){
				musicPlayer.SFXPlayer.menudown.play();
				this.removePauseScreen();
			},this);
			this.pause_menuitem_resume.events.onInputOver.add(function(target){
				target.setStyle(style.navItem._hover);
				musicPlayer.SFXPlayer.menuHover.play();
			},this);
			this.pause_menuitem_resume.events.onInputOut.add(function(target){
				target.setStyle(style.navItem._default);
			});
			
			this.pause_menuitem_menu.inputEnabled = true;
			this.pause_menuitem_menu.events.onInputUp.add(function(){
				musicPlayer.SFXPlayer.menudown.play();
				game.paused = false;
				musicPlayer.bgMusic.gameMusic.stop();
				game.state.start('Menu');
			},this);
			this.pause_menuitem_menu.events.onInputOver.add(function(target){
				target.setStyle(style.navItem._hover);
				musicPlayer.SFXPlayer.menuHover.play();
			},this);
			this.pause_menuitem_menu.events.onInputOut.add(function(target){
				target.setStyle(style.navItem._default);
			});
			this.pauseInitialized = true;
		}
		else{
			this.pauseScreen.reset(game.world.centerX, game.world.centerY);
			this.pause_menuitem_resume.reset(this.pauseScreen.x, this.pauseScreen.y - 70);
			this.pause_menuitem_menu.reset(this.pauseScreen.x, this.pauseScreen.y + 120);
		}
	},
	
	/**
	 * Removes the pause screen.
	 * Resumes the entire game.
	 *@method
	 *@private
	*/
	removePauseScreen: function(){
		this.pause_menuitem_resume.kill();
		this.pause_menuitem_menu.kill();
		this.pauseScreen.kill();
		this.playing = true;
		game.paused = false;
	},
	/**
	 * EaseIn the speed of the paddle.
	 * @method
	 * @private
	 * @param {number} x - ease in speed
	 */
	easeInSpeed: function(x){
		return x * Math.abs(x) / 2000;
	},
	/**
	 * Linear function for the speed of the paddle.
	 * @method
	 * @private
	 * @param {number} x - linear speed
	 */
	linearSpeed: function(x){
		return x / 2.5;
	},
	/**
	 * Remove hit streak text when it's zero
	 * @method
	 * @private
	 */
	removeHitStreak: function(){		
		/*var killTween = game.add.tween(this.hitStreakText.scale);
		killTween.to({x:0,y:0}, 200, Phaser.Easing.Linear.None);
		killTween.onComplete.addOnce(function(){
			this.hitStreakText.visible = false;
		}, this);
		killTween.start();*/
		utils.fadeOut([this.hitStreakText],200)
	},
	/**
	 * Add hit streak text when it's not zero
	 * @method
	 * @private
	 */
	addHitStreak: function(){
		/*var ressuructTween = game.add.tween(this.hitStreakText.scale);
		ressuructTween.to({x:1,y:1}, 200, Phaser.Easing.Linear.None);
		ressuructTween.onComplete.addOnce(function(){
			this.hitStreakText.visible = true;
		}, this);
		ressuructTween.start();*/
		utils.fadeIn([this.hitStreakText],200)
	},
	/**
	 * Scale hitstreak when ever a hit streak occurs
	 * @method
	 * @private
	 * @param {Object} Object - objects that need to be animated.
	 */
	animateText: function(Object){
		var animateTween = game.add.tween(Object.scale);
		animateTween.to({x:1.5,y:1.5}, 100, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 100, Phaser.Easing.Linear.In);
		animateTween.start();
	},
	/**
	 * Set Hitstreak text and animate it
	 * @method
	 * @private
	 */
	setHitStreak: function(){
		this.hitStreakText.setText("x" + this.hitStreak);
		this.animateText(this.hitStreakText);
	},
	/**
	 * Check if parameter 1 is greater than or equal to parameter 2
	 * @method
	 * @private
	 * @param {number} number1 - The first parameter that is compared with second parameter.
	 * @param {number} number2 - The second parameter that is compared to first parameter.
	 * @returns {boolean}
	 */
	isGreaterThanOrEqual: function(number1, number2){
		return number1 >= number2
	}
};
/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io|Author}
 *@copyright 2017 Vijaykoushik, S.
*/
/**************************/
/*	Level Complete		 */
/************************/
/**
 *@classdesc
 * Renders the level complete for the game.
 * LevelComplete state is shown when all the bricks are destroyed.
 *@class
 *@description Switches to the next level of the game.
 */
LevelComplete.prototype = {
	/**
	 *Defines the style for the level complete screen including the credits text.
	 *@property {object} styles
	 *@private
	*/
	styles:{
		/**
		 *Defines the CSS style font specifications for the title text.
		 *@property {object} styles.titleText
		 *@private
		 *@property {string} styles.titleText.font	 - CSS style font specification.
		 *@property {string} styles.titleText.fill	 - CSS style fill color specification.
		 *@property {string} styles.titleText.stroke - CSS style stroke color specification.
		*/
		titleText:{
			font: ' 160px Alex Brush',
			fill: "#fff",
			stroke: "#000"
		},
		/**
		 *Defines the CSS style font specifications for stats.
		 *@property {object} styles.statsText
		 *@private
		 *@property {string} styles.statsText.font	 - CSS style font specification.
		 *@property {string} styles.statsText.fill	 - CSS style fill color specification.
		 *@property {string} styles.statsText.stroke - CSS style stroke color specification.
		*/
		statsText:{
			font: ' 85px Lato',
			fill: "#fff",
			stroke: "#000"			
		}
	},
	/**
	 * Initializes the classes' properties.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	init: function(){
		this.title = game.make.text(game.world.centerX, 100, 'Level ' + currentLevel +' clear', this.styles.titleText);
		this.bgImg = game.make.image(0,0,'background');
		this.levelBonus = game.make.text(game.world.centerX, 550, "Bonus: x" + currentLevel*10,this.styles.statsText);
		this.score = game.make.text(game.world.centerX, 650, "Score: " + globalData.currentScore,this.styles.statsText);
		this.hitStreak = game.make.text(game.world.centerX, 750, "Continous Streak: x" + globalData.hitStreak,this.styles.statsText);
		this.highScore = game.make.text(game.world.centerX, 900, "Highscore: " + globalData.highScore,this.styles.statsText);
		// Game progress calculation
		globalData.playerStats.progress = parseFloat((currentLevel / (levels.level.length - 1) * 100).toFixed(2));
		this.progress = game.make.text(game.world.centerX, 400, "Progress: " + globalData.playerStats.progress + "%",this.styles.statsText);
		utils.centerGameObjects([this.title, this.levelBonus,this.score,this.highScore, this.progress,this.hitStreak]);
	},
	/**
	 * Adds the created credits screen to the canvas.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	create:function(){
		game.add.existing(this.bgImg);
		game.add.existing(this.progress);
		game.add.existing(this.title);
		game.add.existing(this.levelBonus);
		game.add.existing(this.score);
		game.add.existing(this.hitStreak);
		game.add.existing(this.highScore);
		
		/* Increment Level */
		currentLevel++;
		
		if(currentLevel <= levels.level.length - 1)
		{
			globalData.playerStats.levels.highestLevel = currentLevel;
			globalData.playerStats.levels.levelName = levels.level[currentLevel].title;
			globalData.playerStats.score.highScore = globalData.highScore;
			globalData.playerStats.score.playerScore = globalData.currentScore;
			datastore.setItem('playerStats', globalData.playerStats);
		}
		
		game.time.events.add(Phaser.Timer.SECOND * 5, function(){
			if(currentLevel <=  levels.level.length - 1){
				game.state.start('Play');
			}
			else{
				currentLevel = 1;
				game.state.start('GameBeat');
			}
		});
	}
};
/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io|Author}
 *@copyright 2017 Vijaykoushik, S.
*/
/**************************/
/*	Game over			 */
/************************/
/**
 *@classdesc
 * Renders the game over screen for the game.
 * GameOver state is shown when all lives are lost.
 *@class
 *@description Ends the game when player looses the game.
 */
GameOver.prototype = {
	/**
	 *Defines the style for the level complete screen.
	 *@property {object} styles
	 *@private
	*/
	styles:{
		/**
		 *Defines the CSS style font specifications for the title text.
		 *@property {object} styles.titleText
		 *@private
		 *@property {string} styles.titleText.font	 - CSS style font specification.
		 *@property {string} styles.titleText.fill	 - CSS style fill color specification.
		 *@property {string} styles.titleText.stroke - CSS style stroke color specification.
		*/
		titleText:{
			font: ' 159px Alex Brush',
			fill: "#fff",
			stroke: "#000"
		},
		/**
		 *Defines the CSS style font specifications for stats.
		 *@property {object} styles.statsText
		 *@private
		 *@property {string} styles.statsText.font	 - CSS style font specification.
		 *@property {string} styles.statsText.fill	 - CSS style fill color specification.
		 *@property {string} styles.statsText.stroke - CSS style stroke color specification.
		*/
		statsText:{
			font: ' 80px Lato',
			fill: "#fff",
			stroke: "#000"			
		}
	},
	/**
	 * Initializes the classes' properties.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	init:function(){
		this.score = globalData.currentScore;
		globalData.currentScore = 0;
		this.bgImg = game.make.image(0,0,'background');
		this.titleText = game.make.text(game.world.centerX, 100, "Game Over", this.styles.titleText);
		this.highestLevel = game.make.text(game.world.centerX, game.world.centerY - 100, "Highest level: " + globalData.playerStats.levels.highestLevel, this.styles.statsText);
		this.highScore = game.make.text(game.world.centerX, game.world.centerY + 100, "High score: " + globalData.playerStats.score.highScore, this.styles.statsText);
		this.lastScore = game.make.text(game.world.centerX, game.world.centerY + 300, "Score: " + this.score, this.styles.statsText);
		this.progress = game.make.text(game.world.centerX, game.world.centerY - 250, "Progress: " + globalData.playerStats.progress + "%",this.styles.statsText);
		utils.centerGameObjects([this.titleText, this.highestLevel, this.highScore, this.lastScore, this.progress]);
	},
	/**
	 * Adds the created screen to the canvas.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	create: function(){
		game.add.existing(this.bgImg);
		game.add.existing(this.titleText);
		game.add.existing(this.progress);
		game.add.existing(this.highestLevel);
		game.add.existing(this.highScore);
		game.add.existing(this.lastScore);
		/**
		 * REset level
		 */
		currentLevel = 1;
		/**
		 * Reset Lives
		 */
		globalData.playerLives = 3;
		game.time.events.add(Phaser.Timer.SECOND * 5, function(){
			musicPlayer.bgMusic.gameMusic.stop();
			game.state.start('Menu');
		});
	}
};
/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io|Author}
 *@copyright 2017 Vijaykoushik, S.
*/
/**************************/
/*	Game Beat			 */
/************************/
/**
 *@classdesc
 * Renders the game complete screen for the game.
 * GameBeat state is shown when player completes all the levels.
 *@class
 *@description Ends the game when player ompletes all the levels.
 */
GameBeat.prototype = {
	/**
	 *Defines the style for the game complete screen.
	 *@property {object} styles
	 *@private
	*/
	styles:{
		/**
		 *Defines the CSS style font specifications for the title text.
		 *@property {object} styles.titleText
		 *@private
		 *@property {string} styles.titleText.font	 - CSS style font specification.
		 *@property {string} styles.titleText.fill	 - CSS style fill color specification.
		 *@property {string} styles.titleText.stroke - CSS style stroke color specification.
		*/
		titleText:{
			font: ' 160px Alex Brush',
			fill: "#fff",
			stroke: "#000"
		},
		/**
		 *Defines the CSS style font specifications for stats.
		 *@property {object} styles.statsText
		 *@private
		 *@property {string} styles.statsText.font	 - CSS style font specification.
		 *@property {string} styles.statsText.fill	 - CSS style fill color specification.
		 *@property {string} styles.statsText.stroke - CSS style stroke color specification.
		*/
		statsText:{
			font: ' 85px Lato',
			fill: "#fff",
			stroke: "#000"			
		}
	},
	/**
	 * Initializes the classes' properties.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	init: function(){
		this.title = game.make.text(game.world.centerX, 100, 'Congratulations', this.styles.titleText);
		this.subtitle = game.make.text(game.world.centerX, 300, 'Game Completed', this.styles.titleText);
		this.bgImg = game.make.image(0,0,'background');
		this.score = game.make.text(game.world.centerX, 650, "Final score: " + globalData.currentScore,this.styles.statsText);
		this.highScore = game.make.text(game.world.centerX, 800, "Highscore: " + globalData.highScore,this.styles.statsText);
		utils.centerGameObjects([this.title, this.subtitle,this.score,this.highScore]);
	},
	/**
	 * Adds the created screen to the canvas.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	create:function(){
		game.add.existing(this.bgImg);
		game.add.existing(this.title);
		game.add.existing(this.subtitle);
		game.add.existing(this.score);
		game.add.existing(this.highScore);
		
		/* Reset Level */
		currentLevel = 1;
				
		game.time.events.add(Phaser.Timer.SECOND * 5, function(){
			musicPlayer.bgMusic.gameMusic.stop();
			game.state.start('Menu');
		});
	}
};
 ;(function(){
	 datastore = {
		 length: 0,
		getItem: function(key){
			if(localStorage) return localStorage.getItem(key) || false;
			return this[key] || false;
		},
		getItemAsObject: function(key){
			if(localStorage) return JSON.parse(localStorage.getItem(key)) || false;
			return JSON.parse(this[key]) || false;
		},		
		setItem: function(key, value){
			if(typeof(value) == 'object'){
				if(localStorage) localStorage.setItem(key,JSON.stringify(value));
				else this[key] = JSON.stringify(value);
			}
			else{
				if(localStorage) localStorage.setItem(key,value);
				else this[key] = value;
			}
			this.initLength();
		},
		hasLocalStorage: function(){
			if(localStorage) return true;
			return false;
		},
		initLength: function(){
			var temp = 0;
			if(localStorage){
				this.length = localStorage.length;
			}
			else{
				for(key in this){
					if(typeof(key) != 'function') temp++;
				}
				this.length = temp;
			}
		}
	 }
	if(!datastore.hasLocalStorage()) console.warn("%c	Application doesnotsupport local storage	","background:#FCF8E3; color:#8A6D3B");
	datastore.initLength();
 })();