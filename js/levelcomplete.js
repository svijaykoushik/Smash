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
		this.highScore = game.make.text(game.world.centerX, 800, "Highscore: " + globalData.highScore,this.styles.statsText);
		// Game progress calculation
		globalData.playerStats.progress = parseFloat((currentLevel / (levels.level.length - 1) * 100).toFixed(2));
		this.progress = game.make.text(game.world.centerX, 400, "Progress: " + globalData.playerStats.progress + "%",this.styles.statsText);
		utils.centerGameObjects([this.title, this.levelBonus,this.score,this.highScore, this.progress]);
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