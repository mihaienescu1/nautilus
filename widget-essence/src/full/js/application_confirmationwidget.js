/* 
 * 
 * Widget Arguments:
 * coveredScreen 			[string] 	: string with element id to cover
 * okFunction				[function]	: function to execute on pressing ok
 * cancelFunction			[function]	: function to execute on pressing cancel 
 * widgetMessage			[string]	: string with message to print
 * okButtonText				[string]	: string with text for OK button
 * cancelButtonText			[string]	: string with text for CANCEL buttun
 */
Application.ConfirmationWidget = function(coveredScreen, okFunction, cancelFunction, widgetMessage, okButtonText, cancelButtonText)
{
	this.coveredScreen 			= coveredScreen;
	this.okFunction 			= okFunction;
	this.cancelFunction 		= cancelFunction;
	this.warningDivClass		= "confirmation_cover";
	this.widgetMessage			= widgetMessage;
	this.okButtonText			= okButtonText;
	this.cancelButtonText		= cancelButtonText;
	
	this.Init = function ()
	{
		this.ShowOverlay();
	};	
	// build html to add over the current screen
	this.ShowOverlay = function ()
	{		
		html = '<div class="'+this.warningDivClass+'" style="display:none">';			
			html += '<div class="confirmation_center_content">';
				html += '<div class="confirmation_text" id="confirmation_text">';					
					html += '<div class="confirmation_text_content policy_notification">'+this.widgetMessage+'</div>';
				html += '</div>';
				html += '<div class="confirmation_buttons">';
					html += '<div class="confirmation_ok_button_off" id="confirmation_ok_button">';
						html += '<div class="confirmation_ok_text policy_choice_buttons">';
							html += ''+okButtonText;
						html += '</div>';
					html += '</div>';
					html += '<div class="confirmation_cancel_button_off" id ="confirmation_cancel_button">';
						html += '<div class="confirmation_cancel_text policy_choice_buttons">';
							html += ''+cancelButtonText;
						html += '</div>';
					html += '</div>';
				html += '</div>';								
			html += '</div>';	
		html += '</div>';
		
		$(this.coveredScreen).prepend(html);
		
		//ok button
		$('#confirmation_ok_button').bind('click', proxy(this.HandleOkButton, this));
		$("#confirmation_ok_button").bind('mousedown', function ()
    	{    		
    		$("#confirmation_ok_button").attr('class','confirmation_ok_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#confirmation_ok_button").attr('class','confirmation_ok_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#confirmation_ok_button").attr('class','confirmation_ok_button_off');
    	});
    	
    	//cancel button
		$('#confirmation_cancel_button').bind('click', proxy(this.HandleCancelButton, this));
		$("#confirmation_cancel_button").bind('mousedown', function ()
    	{    		
    		$("#confirmation_cancel_button").attr('class','confirmation_cancel_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#confirmation_cancel_button").attr('class','confirmation_cancel_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#confirmation_cancel_button").attr('class','confirmation_cancel_button_off');
    	});
    	
		$("."+this.warningDivClass).show();		
		PORTAL.showBackButton(false);		
	};
	
	this.HandleOkButton = function ()
	{
		this.okFunction();
		this.TerminateWarning();		
	};
	
	this.HandleCancelButton = function ()
	{
		this.cancelFunction();
		this.TerminateWarning();		
	};
		
	this.TerminateWarning = function ()
	{	
		$('#confirmation_ok_button').unbind();	
		$('#confirmation_cancel_button').unbind();
		
		$("."+this.warningDivClass).remove();					
	};
	
	this.Init();
};