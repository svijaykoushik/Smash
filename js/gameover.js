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
		
		this.bgImg = game.make.image(0,0,'background');
		this.titleText = game.make.text(game.world.centerX, 100, "Game Over", this.styles.titleText);
		this.highestLevel = game.make.text(game.world.centerX, game.world.centerY - 100, "Highest level: " + globalData.playerStats.levels.highestLevel, this.styles.statsText);
		this.highScore = game.make.text(game.world.centerX, game.world.centerY + 100, "High score: " + globalData.highScore, this.styles.statsText);
		this.lastScore = game.make.text(game.world.centerX, game.world.centerY + 300, "Score: " + globalData.currentScore, this.styles.statsText);
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
		
		game.time.events.add(Phaser.Timer.SECOND * 5, function(){
			game.state.start('Menu');
		});
	}
};
//# sourceURL=gameover.js