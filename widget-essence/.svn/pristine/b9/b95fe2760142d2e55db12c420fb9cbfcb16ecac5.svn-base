/* 
 * 
 * Widget Arguments:
 * coveredScreen 			[string] 	: string with element id to cover
 * okFunction				[function]	: function to execute on pressing ok  
 * widgetMessage			[string]	: string with message to print
 */
Application.NotificationWidget = function(coveredScreen, okFunction, widgetMessage)
{
	this.coveredScreen 			= coveredScreen;
	this.okFunction 			= okFunction;
	this.warningDivClass		= "notification_cover";
	this.widgetMessage			= widgetMessage;	
	
	this.Init = function ()
	{
		this.ShowOverlay();
	};	
	// build html to add over the current screen
	this.ShowOverlay = function ()
	{		
		html = '<div class="'+this.warningDivClass+'" style="display:none">';			
			html += '<div class="notification_center_content">';
				html += '<div class="notification_text" id="notification_text">';					
					html += '<div class="notification_text_content policy_notification">'+this.widgetMessage+'</div>';
				html += '</div>';
				html += '<div class="notification_buttons">';
					html += '<div class="notification_ok_button_off" id="notification_ok_button">';
						html += '<div class="notification_ok_text policy_choice_buttons">';
							html += '${widget_notification_ok}';
						html += '</div>';
					html += '</div>';					
				html += '</div>';								
			html += '</div>';		
		html += '</div>';
		
		$(this.coveredScreen).prepend(html);
		
		//ok button
		$('#notification_ok_button').bind('click', proxy(this.HandleOkButton, this));
		$("#notification_ok_button").bind('mousedown', function ()
    	{    		
    		$("#notification_ok_button").attr('class','notification_ok_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#notification_ok_button").attr('class','notification_ok_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#notification_ok_button").attr('class','notification_ok_button_off');
    	});
    	
		$("."+this.warningDivClass).show();		
		PORTAL.showBackButton(false);		
	};
	
	this.HandleOkButton = function ()
	{
		this.TerminateNotification();
		if (this.okFunction != null) this.okFunction();				
	};	
		
	this.TerminateNotification = function ()
	{	
		PORTAL.showBackButton(true);		
		$('#notification_ok_button').unbind();		
		$("."+this.warningDivClass).remove();					
	};
	
	this.Init();
}