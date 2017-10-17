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