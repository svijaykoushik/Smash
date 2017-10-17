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