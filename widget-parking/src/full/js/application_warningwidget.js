/* 
 * 
 * Widget Arguments:
 * coveredScreen 			[string] 	: string with element id to cover
 * backFunction				[string]	: function to execute on back button 
 * 
 */
Application.WarningWidget = function(coveredScreen, backFunction)
{
	this.coveredScreen 			= coveredScreen;
	this.backFunction 			= backFunction;
	this.drivingStateTimeout 	= null;
	this.warningDivClass		= "warning_cover";
	this.timeoutTime			= 100; 
	
	this.Init = function ()
	{
		setTimeout(proxy(this.CheckDrivingState, this), this.timeoutTime);
	};
	
	//check car driving state and launch the repeated function CheckDrivingStateInterval
	this.CheckDrivingState = function ()
	{
		if (PORTAL.car.drivingState() == true)
		{
			this.ShowOverlay();			
		}
		window.drivingStateOn = proxy(this.ShowOverlay, this);				
		window.drivingStateOff = proxy(this.HideOverlay, this);
	};
	
	// build html to add over the current screen
	this.ShowOverlay = function ()
	{		
		html = '<div class="'+this.warningDivClass+'" style="display:none">';
			html += '<div class="warning_left_corner"></div>';
			html += '<div class="warning_center_content">';
				html += '<div class="warning_back_button" id="warning_back_button"></div>';
				html += '<div class="warning_clear"></div>';
				html += '<div class="warning_text policy_notification" id="warning_text">';
						html += '${widget_warning_message}';
				html += '</div>';
			html += '</div>';
			html += '<div class="warning_right_corner"></div>';
		html += '</div>';
		
		$(coveredScreen).prepend(html);
		$('#warning_back_button').bind('click', proxy(this.backFunction, this));
		$("."+this.warningDivClass).show();
		PORTAL.showBackButton(false);		
	};	
	
	// screen overlay hide	
	this.HideOverlay = function ()
	{
		$('#warning_back_button').unbind();						
		$("."+this.warningDivClass).hide();
		PORTAL.showBackButton(true);
	};
	
	//timeout clear, html remove and reset variables
	this.TerminateWarning = function ()
	{
		$('#warning_back_button').unbind();
		$("."+this.warningDivClass).remove();		
		
		window.drivingStateOn = null;				
		window.drivingStateOff = null;		
	};
	
	this.Init();
};