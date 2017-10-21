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
		this.scoreText = game.make.text(game.world.centerX, 45, this.score, this.textStyle);
		this.livesText = game.make.text(game.world.width - 15, 15, 'Lives: '+ this.lives, this.textStyle);
		this.livesText.anchor.set(1,0);
		this.lifeLostText = game.make.text(game.world.width*0.5, game.world.height*0.5, 'Life lost, tap to continue', this.textStyle);
		this.lifeLostText.visible = false;
		this.pause_menuitem_resume = game.make.text(this.pauseScreen.x, this.pauseScreen.y - 70, 'Resume', style.navItem._default);
		this.pause_menuitem_menu = game.make.text(this.pauseScreen.x, this.pauseScreen.y + 120, 'Main Menu', style.navItem._default);
		utils.centerGameObjects([this.paddle, this.ball, this.lifeLostText, this.startText, this.scoreText, this.pauseScreen, this.pause_menuitem_resume, this.pause_menuitem_menu]);
		
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
		ball.animations.play('wobble');
		musicPlayer.SFXPlayer.paddleHit.play();
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
			this.ball.body.velocity.set(350, -350);
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
				globalData.currentScore = this.score;
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
		this.score += 10;
		if(this.score >= globalData.highScore) globalData.highScore = this.score;
		this.scoreText.setText(this.score);
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
		
		console.log();
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
			this.paddle.x = game.input.x || game.world.width*0.5;
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
				game.physics.arcade.collide(this.ball, this.paddle, this.ballHitPaddle);
				game.physics.arcade.collide(this.ball, this.bricks, this.ballHitBrick, null, this);
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
	}
};