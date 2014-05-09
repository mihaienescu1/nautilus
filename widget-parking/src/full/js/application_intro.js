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
	
	this.ShowSplashScreen = function()
	{
		$('#parking_splash_screen').show();
	};
	
	this.CloseSplashScreen = function()
	{
		$('#parking_splash_screen').hide();
	};
	
	this.Cycle = function()
	{
		this.cyclesCompleted++;
		if(this.app.GetSearchModule().intialStorageLoadCompleted && 
			this.app.GetInfosModule().intialStorageLoadCompleted && 
			this.app.GetParametersModule().intialStorageLoadCompleted && 
			this.cyclesCompleted >= this.minCycles)
		{
			clearInterval(this.interval);
			this.NextStep();
		}
	};
	
	this.NextStep = function()
	{
		this.CloseSplashScreen();
		this.app.HideLoading();
		this.app.GetInfosModule().ShowListScreen();
		
	};
};