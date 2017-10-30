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