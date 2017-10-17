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
		currentLevel = 0;
		
		
		globalData.playerStats.levels.highestLevel = currentLevel;
		globalData.playerStats.levels.levelName = levels.level[currentLevel].title;
		globalData.playerStats.score.highScore = globalData.highScore;
		globalData.playerStats.score.playerScore = globalData.currentScore;
		datastore.setItem('playerStats', globalData.playerStats);
		
		game.time.events.add(Phaser.Timer.SECOND * 5, function(){
			
			game.state.start('Play');
		});
	}
};