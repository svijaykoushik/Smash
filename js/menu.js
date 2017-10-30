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
		
		this.addMenuOption('Start', function(){
			console.log("%c %c Start clicked. %c ","background:#192a43","color:white;background:#2d84b6","background:#192a43");
			game.state.start('Play');
		});
		this.addMenuOption('Options', function(){
			console.log("%c %c Options clicked. %c ","background:#192a43","color:white;background:#2d84b6","background:#192a43");
			game.state.start("Options");
		});
		this.addMenuOption('Credits', function(){
			game.state.start('Credits');
			console.log("%c %c Credits clicked. %c ","background:#192a43","color:white;background:#2d84b6","background:#192a43");
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