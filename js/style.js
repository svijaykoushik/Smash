/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io|Author}
 *@copyright 2017 Vijaykoushik, S.
*/
/**************************/
/*	styles				 */
/************************/

(function(){
	/**
	 * The default Css style color specification for the menu item.
	 *@const
	 *@default
	*/
	var defaultColor = "#fff",
		/**
		 * Css style color specification for highlighting the menu item.
		 *@const
		 *@default
		*/
		highlightColor = "#ffff18";
		/**
		 *@classdesc
		 * Initializes the text styles for the texts in the game.
		 *@class
		 *@description Initializes the text styles for the game menus.
		*/
	style = {
		/**
		 *Styles for menu items or navigation items.
		 *@property {object} navItem
		 *@static
		*/
		navItem:{
			/**
			 *The base style for the text to render.
			 *@property {object} _base
			 *@static
			*/
			_base:{
				/**
				 *The base style for the text to render.
				 *@property {string} font				- Css style font specification.
				 *@default
				 *@property {string} align				- Defines the alignment of the text.
				 *@default
				 *@property {number} strokeThickness	- Defines thickness of the brush stroke.
				 *@default
				*/
				font: "100px Alex Brush",
				align:"center",
				strokeThickness:4
			},
			/**
			 *Default color styles to render.
			 *@property {object} _default
			 *@static
			*/
			_default:{
				/**
				 *The base style for the text to render.
				 *@property {string} fill				- Css style color specification for filling the item.
				 *@default
				 *@property {string} stroke				- Css style color specification for brush stroke.
				 *@default
				*/
				fill: defaultColor,
				stroke: "rgba(0,0,0,0)"
			},
			/**
			 *Color styles on mouse over event.
			 *@property {object} _hover
			 *@static
			*/
			_hover:{
				/**
				 *The base style for the text to render.
				 *@property {string} fill				- Css style color specification for filling the item.
				 *@default
				 *@property {string} stroke				- Css style color specification for brush stroke.
				 *@default
				*/
				fill: highlightColor,
				stroke: "rgba(200, 200, 200, 0.5)"
			},
			/**
			 *Invert the default style.
			 *@property {object} _inverse
			 *@static
			*/
			_inverse:{
				/**
				 *The base style for the text to render.
				 *@property {string} fill				- Css style color specification for filling the item.
				 *@default
				 *@property {string} stroke				- Css style color specification for brush stroke.
				 *@default
				*/
				fill: "#fff",
				stroke: "#fff"
			}
		}
	};
	
	for(var key in style.navItem){
		if(key != "_base"){
			Object.assign(style.navItem[key], style.navItem._base);
		}
	}
})();
//# sourceURL=style.js