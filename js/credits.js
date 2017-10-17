/**
 *@author Vijaykoushik, S. {@link https://svijaykoushik.github.io|Author}
 *@copyright 2017 Vijaykoushik, S.
*/
/**************************/
/*	Credits				 */
/************************/
/**
 *@classdesc
 * Renders the credits screen for the game.
 * Credits state is shown when credits option is chosen in the game menu.
 *@class
 *@description Rolls the game's credits.
 */
Credits.prototype = {
	/**
	 *Defines the navigation style for the credits screen including the credits text.
	 *@property {object} navigatorStyle
	 *@private
	*/
		navigatorStyle:{
		/**
		 *Defines the CSS style font specifications for the forward and backward buttons.
		 *@property {object} navigatorStyle.credits
		 *@private
		 *@property {string} navigatorStyle.credits.font	- CSS style font specification.
		 *@property {string} navigatorStyle.credits.fill	- CSS style fill color specification.
		 *@property {string} navigatorStyle.credits.stroke	- CSS style stroke color specification.
		 *@property {number} navigatorStyle.credits.strokeThickness	- Thickness of brush stroke.
		*/
		credits:{
			font: '150px FontAwesome',
			fill: '#fff',
			stroke:'#000',
			strokeThickness: 2
		},
		/**
		 *Defines the CSS style font specifications for the back to previous screen button.
		 *@property {object} navigatorStyle.backBtn
		 *@private
		 *@property {string} navigatorStyle.backBtn.font	- CSS style font specification.
		 *@property {string} navigatorStyle.backBtn.fill	- CSS style fill color specification.
		 *@property {string} navigatorStyle.backBtn.stroke	- CSS style stroke color specification.
		*/
		backBtn:{
			font: '80px FontAwesome',
			fill: '#fff',
			stroke:'#000',
		},
		/**
		 *Defines the CSS style font specifications for the credits text.
		 *@property {object} navigatorStyle.creditsText
		 *@private
		 *@property {string} navigatorStyle.creditsText.font	- CSS style font specification.
		 *@property {string} navigatorStyle.creditsText.fill	- CSS style fill color specification.
		 *@property {string} navigatorStyle.creditsText.stroke	- CSS style stroke color specification.
		 *@property {number} navigatorStyle.creditsText.strokeThickness	- Thickness of brush stroke.
		*/
		creditsText:{
			font: '100px Lato',
			fill: '#fff',
			stroke:'#000',
			strokeThickness: 1
		}
	},
	/**
	 *@property {object} props				- Credits screen props that specify the amount of text to be renderd.
	 *@private
	 *@default
	 *@property {number} props.pageSize		- total number of lines in a page.
	 *@property {number} props.currentPage	- current page number.
	 *@property {number} props.totalPage	- total number of pages.
	 *@property {object} props.pageContents	- an array that contains the page contents.
	*/
	props:{
		pageSize: 6,
		currentPage: 1,
		totalPage:0,
		pageContents: new Array()
	},
	/**
	 * Gets the current page's contents
	 *@method
	 *@private
	 *@param {number}pageNo - The current page number.
	*/
	getCurrentPage: function(pageNo){
		--pageNo;
		return this.creditScreens.slice(pageNo * this.props.pageSize, (pageNo + 1) * this.props.pageSize)
	},
	/**
	 * Adds the credits text to the current page renders them.
	 *@method
	 *@private
	 *@param {{(string|Array)}creditStrings - An array of credits text to be rendered in the current page.
	*/
	addCreditScreen: function(creditStrings){
		for(var i = 0; i < creditStrings.length; i++){
			var txt = game.add.text(game.world.centerX, i * 100 + 480,creditStrings[i], this.navigatorStyle.creditsText);
			this.props.pageContents.push(txt);
			utils.centerGameObjects([txt]);
		}
	},
	/**
	 * Destroys the current page contents.
	 *@method
	 *@private
	*/
	destroyCreditText: function(){
		while(this.props.pageContents.length){
			var txt = this.props.pageContents.pop();
			txt.destroy();
		}
	},
	/**
	 * Called before the previous page is rendered.
	 *@method
	 *@private
	*/
	onbeforePrevious: function(){
		this.destroyCreditText();
	},
	/**
	 * Event handler that is executed when the previous button is pressed.
	 * Calls {@link onbeforePrevious} method.
	 *@method
	 *@private
	*/
	onPrevious: function(){
		this.onbeforePrevious();
		--this.props.currentPage;
		this.togglePrevious();
		this.toggleNext();
		this.addCreditScreen(this.getCurrentPage(this.props.currentPage));
		this.updatePageNo();
		musicPlayer.SFXPlayer.menudown.play();
	},
	/**
	 * Called before the next page is rendered.
	 *@method
	 *@private
	*/
	onbeforeNext: function(){
		this.destroyCreditText();
	},
	/**
	 * Event handler that is executed when the next button is pressed.
	 * Calls {@link onbeforeNext} method.
	 *@method
	 *@private
	*/
	onNext: function(){
		this.onbeforeNext();
		++this.props.currentPage;
		this.togglePrevious();
		this.toggleNext();
		this.addCreditScreen(this.getCurrentPage(this.props.currentPage));
		this.updatePageNo();
		musicPlayer.SFXPlayer.menudown.play();
	},
	/**
	 * Toggles the previous button's visibility based on the current page number.
	 * Hides the button when on the very first page.
	 *@method
	 *@private
	*/
	togglePrevious: function(){
		if(!this.canPrevious()){
			this.previousScreen.inputEnabled = false;
			if(this.previousScreen.alpha == 1) utils.fadeOut([this.previousScreen],250);
		}
		else{
			this.previousScreen.inputEnabled = true;
			if(this.previousScreen.alpha == 0) utils.fadeIn([this.previousScreen],250);
		}
	},
	/**
	 * Toggles the next button's visibility based on the current page number.
	 * Hides the button when on the very last page.
	 *@method
	 *@private
	*/
	toggleNext: function(){
		if(!this.canNext()){
			this.nextScreen.inputEnabled = false;
			if(this.nextScreen.alpha == 1) utils.fadeOut([this.nextScreen],250);
		}
		else{
			this.nextScreen.inputEnabled = true;
			if(this.nextScreen.alpha == 0) utils.fadeIn([this.nextScreen],250);
		}
	},
	/**
	 * Checks wether switching to previous page is possible.
	 *@returns {boolean}
	 *@method
	 *@private
	*/
	canPrevious: function(){
		return this.props.currentPage > 1;
	},
	/**
	 * Checks wether switching to next page is possible.
	 *@returns {boolean}
	 *@method
	 *@private
	*/
	canNext: function(){
		return this.props.currentPage < this.props.totalPage;
	},
	/**
	 * Updates the page number on the page footer while navigating through the pages.
	 *@method
	 *@private
	*/
	updatePageNo: function(){
		this.pageFooter.text =  this.props.currentPage + " of " + this.props.totalPage;
	},
	/**
	 * Initializes the classes' properties.
	 * Phaser framework method.
	 *@method
	 *@private
	*/
	init: function(){
		this.previousScreen = game.make.text(60, game.world.centerY, "\uf053", this.navigatorStyle.credits);
		this.nextScreen = game.make.text(game.world.width - 60,game.world.centerY, "\uf054",this.navigatorStyle.credits);
		this.backIcon = game.make.text(60, 150,"\uf0a8", this.navigatorStyle.backBtn);
		this.logo = game.make.sprite(game.world.centerX, 120, 'title');
		this.creditScreens = ["SMASH ", " ", "Version: 0.2.1", " ","Game Design, Game Developement"," ", "Vijay Koushik, S.", " ","MUSIC", " ","Awaiting Return","Cool Intro", "Doobly Doo", "by","Kevin MacLeod (incompetech.com)","Licensed under Creative Commons:", "By Attribution 3.0 License", " ", "SPECIAL THANKS"," ", "Phaser.io", "freesound.org", "MDN", "Stackoverflow.com", "html5gamedev.com"," "," "," ","svijaykoushik.github.io", "2017"];
		
		this.props.totalPage = Math.ceil(this.creditScreens.length/this.props.pageSize);
		this.pageFooter = game.make.text(game.world.centerX, game.world.height - 50, this.props.currentPage + " of " + this.props.totalPage, this.navigatorStyle.creditsText);
		utils.centerGameObjects([this.previousScreen, this.nextScreen, this.backIcon, this.logo, this.pageFooter]);
	},
	/**
	 * Adds the created credits screen to the canvas.
	 * Phaser framework method.
	 *@method
	 *@private
	*/	
	create: function(){
		game.add.image(0, 0, 'background');
		game.add.existing(this.logo);
		this.logo.frame = 1;
		game.add.existing(this.previousScreen);
		game.add.existing(this.nextScreen);
		game.add.existing(this.backIcon);
		game.add.existing(this.pageFooter);
		
		this.togglePrevious();
		this.toggleNext();
		this.previousScreen.events.onInputUp.add(this.onPrevious,this);
		this.nextScreen.events.onInputUp.add(this.onNext,this);
		
		this.backIcon.inputEnabled = true;
		this.backIcon.events.onInputUp.add(function(){
			musicPlayer.SFXPlayer.menudown.play();
			game.state.start('Menu');
		});
		this.addCreditScreen(this.getCurrentPage(this.props.currentPage));
	}
}