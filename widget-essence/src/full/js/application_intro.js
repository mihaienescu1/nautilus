Application.Intro = function(app)
{
	this.app = app;
	
	this.cyclesCompleted = 0;
	
	/* Minimum cycles the intro screen should be displayed */
	this.minCycles = 0;
	
	this.interval = null;
	
	this.Init = function()
	{
		this.ShowSplashScreen();
		this.app.ShowLoading();
		this.interval = setInterval(proxy(this.Cycle, this), 500);
	};
	
	// SSL START
	
	this.ShowSplashScreen = function()
	{
		$('#intro_page').show();
		this.app.SetBackAction(null);
		
	};
	
	this.CloseSplashScreen = function()
	{
		$('#intro_page').hide();
	};
	
	this.Cycle = function()
	{
		this.cyclesCompleted++;
		if(this.app.GetBudgetModule().intialStorageLoadCompleted && 
			this.app.GetSearchModule().intialStorageLoadCompleted && 
			this.app.GetStationInfoModule().intialStorageLoadCompleted && 
			this.app.GetParametersModule().intialStorageLoadCompleted && 
			this.cyclesCompleted >= this.minCycles)
		{
			clearInterval(this.interval);
			this.NextStep();
		}
	};
	
	this.NextStep = function()
	{
		this.app.HideLoading();
		this.CloseSplashScreen();
		
		if(this.app.GetParametersModule().selectedFuel == null)
		{
			this.app.GetParametersModule().originScreen = 'introPage';
			this.app.GetParametersModule().ShowGasScreen();	
		}
		else
		{
			this.app.GetStationInfoModule().ShowContentList();
		}
	};
	
	// SSL END
};