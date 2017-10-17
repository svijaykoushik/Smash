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
		
		musicPlayer.bgMusic.menuMusic.play();
		
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
//# sourceURL=options.js