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