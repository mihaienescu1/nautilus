Application.TextScroller = function()
{
	this.scrollerDirection = {};
	this.stopScrollLeft = 100;
	this.stopScrollRight = -70;
	this.currentTimeout = {};
	this.scrollStep = 10;
	this.scrollInterval = 100;
	
	this.Init = function ()
	{
						
	};
	
	// function to start the scroller
	this.StartScroll = function (scrollerContainer)
	{		
		if ($(scrollerContainer).html() != null)
		{
			var containerContent = ($(scrollerContainer).html()).replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, "");			
			var containerWidth = parseInt($(scrollerContainer).css("width"));
			var spanContainerName = scrollerContainer.substr(1, scrollerContainer.length);
			this.scrollerDirection[scrollerContainer] = "left";				
			
			$(scrollerContainer).html("");
			
			var spanContent = "<span id='span_"+spanContainerName+"' style=\"position:relative; left:0;\">"+containerContent+"</span>";
						
			$(scrollerContainer).html(spanContent);
			var spanWidth = {};
			spanWidth[scrollerContainer] = parseInt($("#span_"+spanContainerName).css("width"));
			
			$("#span_"+spanContainerName).css("display", "block");
			$("#span_"+spanContainerName).css("visibility", "visible");	
				
			// check width to see if we scroll
			if ( containerWidth < spanWidth[scrollerContainer] )
			{		
				this.AnimateText(scrollerContainer, spanWidth);	
				this.currentTimeout[scrollerContainer] = setInterval(proxy(function() {proxy(this.AnimateText(scrollerContainer, spanWidth), this);}, this), this.scrollInterval);
								
				return true;					
			}
			else return false;
		}				
	};
	
	//function to animate the text from scrollerContainer
	this.AnimateText = function (scrollerContainer, spanWidth)
	{
		var leftCssValue = {};
		var spanContainerName = scrollerContainer.substr(1, scrollerContainer.length);
								
		if ($("#span_"+spanContainerName).length != 0)
		{		
			leftCssValue[scrollerContainer] = parseInt($("#span_"+spanContainerName).css('left'))*(-1);
							
			if (this.scrollerDirection[scrollerContainer] == "left")
			{ 
				$("#span_"+spanContainerName).css("left",(parseInt($("#span_"+spanContainerName).css('left')) - this.scrollStep)+"px");
				if (leftCssValue[scrollerContainer] > (spanWidth[scrollerContainer]-this.stopScrollLeft)) 
				{
					this.StopScroll(scrollerContainer);
				}
			}
			if (this.scrollerDirection[scrollerContainer] == "right")
			{
				$("#span_"+spanContainerName).css("left",(parseInt($("#span_"+spanContainerName).css('left')) + this.scrollStep)+"px");
				if (leftCssValue[scrollerContainer] == this.stopScrollRight) 
				{
					this.scrollerDirection[scrollerContainer] = "left";
				}
			}
		}
		else
		{
			clearTimeout(this.currentTimeout[scrollerContainer]);
		}
	};
	
	//function to stop the scroller
	this.StopScroll = function (scrollerContainer)
	{	
		if (this.currentTimeout[scrollerContainer])
		{				
			clearTimeout(this.currentTimeout[scrollerContainer]);
			
			this.scrollerDirection[scrollerContainer] = "left";
			
			if ($("span", $(scrollerContainer)).length != 0)
			{
				oldContent = $("span", $(scrollerContainer)).html();
				oldContentWidth = $(scrollerContainer).css("width");
				 			 			
				$(scrollerContainer).html("<span style=\"display: block;width:"+oldContentWidth+"; overflow:hidden;white-space: nowrap;text-overflow: ellipsis;\">"+oldContent+"</span>");
			}			
		}
	};
	
	this.Init();
};