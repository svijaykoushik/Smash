 ;(function(){
	 datastore = {
		 length: 0,
		getItem: function(key){
			if(localStorage) return localStorage.getItem(key) || false;
			return this[key] || false;
		},
		getItemAsObject: function(key){
			if(localStorage) return JSON.parse(localStorage.getItem(key)) || false;
			return JSON.parse(this[key]) || false;
		},		
		setItem: function(key, value){
			if(typeof(value) == 'object'){
				if(localStorage) localStorage.setItem(key,JSON.stringify(value));
				else this[key] = JSON.stringify(value);
			}
			else{
				if(localStorage) localStorage.setItem(key,value);
				else this[key] = value;
			}
			this.initLength();
		},
		hasLocalStorage: function(){
			if(localStorage) return true;
			return false;
		},
		initLength: function(){
			var temp = 0;
			if(localStorage){
				this.length = localStorage.length;
			}
			else{
				for(key in this){
					if(typeof(key) != 'function') temp++;
				}
				this.length = temp;
			}
		}
	 }
	if(!datastore.hasLocalStorage()) console.warn("%c	Application doesnotsupport local storage	","background:#FCF8E3; color:#8A6D3B");
	datastore.initLength();
 })();