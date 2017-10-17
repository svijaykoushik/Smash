/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io|Author}
 *@copyright 2017 Vijaykoushik, S.
*/
/**
 *@classdesc
 * A common class for addig game menu options that can be inherited by other classes.
 * Provides textbased menu rendering with mouse over , inputup and input out functionalities.
 *@class
 *@description Common class for adding menu to the game.
 */
var mixins = {
	/**
	 * Adds text based menuitem option to the screen.
	 *@method
	 *@private
	 *@param {string} text The name of the menu item.
	 *@param {function} callBack The callback method to be executed when the menu item is selected.
	 *@param {string} styleName Name of the style to be applied to the menuitem. It should be a property of style class
	*/
	addMenuOption: function(text, callBack, styleName){
		styleName || (styleName = this.menuConfig.styleName || '_default');
		
		var x = this.menuConfig.startX === 'center'? game.world.centerX: this.menuConfig.startX;
		var y = this.menuConfig.startY;
		
		var txt = game.add.text(x, (this.optionCount*250) + y, text, style.navItem[styleName]);
		txt.anchor.setTo(this.menuConfig.startX === 'center'? 0.5: 0.0);
		txt.inputEnabled = true;
		txt.events.onInputUp.add(function(target){
			musicPlayer.SFXPlayer.menudown.play();
			callBack(target, this);
		},this);
		txt.events.onInputOver.add(function(target){
			target.setStyle(style.navItem._hover);
			musicPlayer.SFXPlayer.menuHover.play();
		},this);
		txt.events.onInputOut.add(function(target){
			target.setStyle(style.navItem[styleName]);
		});
		this.optionCount++;
	}
};
//# sourceURL=mixins.js