Application = function()
{
	this._introModule = null;
	this._infosModule = null;
	this._parametersModule = null;
	this._searchModule = null;
	
	this.parametersBeforeAction = null;
	this.backAction = null;
	this.iconBeforeAction = null;
	
	this.gpsPosition = {latitude : 0, longitude: 0};
	this.networkStatus = false;
	
	this.currencies = {
						"fr":{"name":"eur", "html_code":"&#128;", "image33":"./images/parkinginfo_icon_euro.png"},
						"es":{"name":"eur", "html_code":"&#128;", "image33":"./images/parkinginfo_icon_euro.png"},
						"de":{"name":"eur", "html_code":"&#128;", "image33":"./images/parkinginfo_icon_euro.png"},
						"it":{"name":"eur", "html_code":"&#128;", "image33":"./images/parkinginfo_icon_euro.png"},
						"ch":{"name":"chf", "html_code":"S&#8355;", "image33":"./images/currency_33_chf.png"},
						"pt":{"name":"eur", "html_code":"&#128;", "image33":"./images/parkinginfo_icon_euro.png"},
						"be":{"name":"eur", "html_code":"&#128;", "image33":"./images/parkinginfo_icon_euro.png"},
						"nl":{"name":"eur", "html_code":"&#128;", "image33":"./images/parkinginfo_icon_euro.png"},
						"lux":{"name":"eur", "html_code":"&#128;", "image33":"./images/parkinginfo_icon_euro.png"},
						"uk":{"name":"gbp", "html_code":"&#163;", "image33":"./images/currency_33_gbp.png"},
						"at":{"name":"eur", "html_code":"&#128;", "image33":"./images/parkinginfo_icon_euro.png"},
						"fn":{"name":"eur", "html_code":"&#128;", "image33":"./images/parkinginfo_icon_euro.png"},
						"se":{"name":"sek", "html_code":"kr", "image33":"./images/currency_33_sek.png"},
						"no":{"name":"nok", "html_code":"kr", "image33":"./images/currency_33_nok.png"},
						"tr":{"name":"try", "html_code":"TL", "image33":"./images/currency_33_try.png"},
						"pl":{"name":"pln", "html_code":"z&#322;", "image33":"./images/currency_33_pln.png"}			
						};

	//Currency methods
	this.GetCurrencyByCountry = function(country, key)
	{
		return this.currencies[country.toLowerCase()][key];
	};
	
	this.GetCurrencyByName = function(name, key)
	{
		var record = null;
		name = name.toLowerCase();
		
		for(record in this.currencies)
		{
			if(this.currencies[record]["name"] == name) 
			{
				return this.currencies[record][key];
			}
		}
					
	};
	
	this.Start = function()
	{
		PORTAL.showConfigButton(false);
		
		window.backButtonClick = proxy(this.HandleBackButtonClick, this);
		window.configButtonClick = proxy(this.HandleConfigButtonClick, this);
		
		$("#application_icon").bind('click', proxy(this.HandleIconAction, this));
		
		this.RefreshGps();
		this.RefreshNetworkStatus();
		
		setInterval(proxy(this.RefreshGps, this), 60000);		
		
		this.GetIntroModule().Init();
		
		this._infosModule = new Application.Infos(this);
		
		this._parametersModule = new Application.Parameters(this);
		
		this._searchModule = new Application.Search(this);
	};
	
	this.RefreshGps = function()
	{
		PORTAL.geolocation.getCurrentPosition(proxy(this.HandleGpsRefreshOk, this), proxy(this.HandleGpsRefreshError, this));
	};
	
	this.HandleGpsRefreshOk = function(data)
	{
		if(data != null && data.lat != null && data.lon != null)
		{
			this.gpsPosition.latitude = data.lat;
			this.gpsPosition.longitude = data.lon;
		}
	};
	
	this.HandleGpsRefreshError = function()
	{		
	};
	
	this.RefreshNetworkStatus = function()
	{
		PORTAL.network.status(proxy(this.HandleNetworkStatusUp, this), proxy(this.HandleNetworkStatusDown, this));
		
		window.networkStatusOn = proxy(this.HandleNetworkStatusUp, this);
		window.networkStatusOff = proxy(this.HandleNetworkStatusDown, this);
	};
	
	this.HandleNetworkStatusUp = function(data)
	{
		this.networkStatus = true;
		this.GetInfosModule().listRefresh = true;
	};
	
	this.HandleNetworkStatusDown = function()
	{
		this.networkStatus = false;
		this.GetInfosModule().listRefresh = true;
	};

	this.HandleBackButtonClick = function()
	{
		if(this.backAction != null)
		{
			var tmp_action = this.backAction;
			this.backAction = null;
			
			tmp_action();
			
			tmp_action = null;
		}
	};
	
	this.HandleConfigButtonClick = function()
	{	
		if(this.parametersBeforeAction != null)
		{
			this.parametersBeforeAction();	
			this.parametersBeforeAction = null;			
			this.GetParametersModule().ShowParametersScreen();
		}
	};	
	
	this.SetIconBeforeAction = function(action)
	{
		this.iconBeforeAction = action;
	};
	
	this.HandleIconAction = function()
	{
		if(this.iconBeforeAction != null)
		{
			var tmp_action = this.iconBeforeAction;
			this.iconBeforeAction = null;
			
			tmp_action();
			
			tmp_action = null;
		}
		
		this.GetInfosModule().ShowListScreen();
	};
	
	this.ShowLoading = function()
	{
		PORTAL.showSpinner(true);
	};
	
	this.HideLoading = function()
	{
		PORTAL.showSpinner(false);
	};
	
	this.GetIntroModule = function()
	{
		if(this._introModule == null)
		{
			this._introModule = new Application.Intro(this);
		}
		
		return this._introModule;
	};
	
	this.GetInfosModule = function ()
	{
		if(this._infosModule == null)
		{
			this._infosModule = new Application.Infos(this);
		}
		
		return this._infosModule;
	};
	
	this.GetParametersModule = function()
	{
		if(this._parametersModule == null)
		{
			this._parametersModule = new Application.Parameters(this);
		}
		
		return this._parametersModule;
	};
	
	this.GetSearchModule = function()
	{
		if(this._searchModule == null)
		{
			this._searchModule = new Application.Search(this);
		}
		
		return this._searchModule;
	};
	
	this.SetParametersBeforeAction = function(callbackExecutedBefore)
	{
		this.parametersBeforeAction = callbackExecutedBefore;
	};
	
	this.SetBackAction = function(backActionCallback)
	{
		this.backAction = backActionCallback;
		
		if(this.backAction != null)
		{
			PORTAL.showBackButton(true);
		}
		else
		{
			PORTAL.showBackButton(false);
		}
	};
	
	
	
	this.Start();

};

Application.CONSTANTS = function(){};

Application.CONSTANTS.STORAGE_PREFIX = "navx.parking.";

Application.CONSTANTS.SEARCH_ADDRESS_MODE_GPS = "gps";
Application.CONSTANTS.SEARCH_ADDRESS_MODE_LOCATION = "location";

Application.CONSTANTS.STORAGE_PARKINGINFO = "parkinginfo";
Application.CONSTANTS.STORAGE_SEARCH = "search";
Application.CONSTANTS.STORAGE_PARAMETERS = "parameters";

Application.CONSTANTS.FAVORITE_LIST_LIMIT = 15;
Application.CONSTANTS.SEARCH_HISTORY_LIMIT = 30;