/*
 * Variable names that start with jQ are already jQuery objects [ $(element) ]
 * 
 * 
 * Widget Arguments:
 * scrollerContainer 			[string] 	: selector for the container that will hold the widget
 * pageSize 					[int] 		: size of a page
 * listContainer				[string]	: selector for the container that holds the list items
 * listData						[array]		: an array of items data
 * listItemConstructorCallback	[function]	: callback that is used to construct the list item's html
 * listCustomSizeCallback		[function]	: callback that is used to get the number of html item's
 * postCallBack					[function] 	: callback that is used to run a function after populate list
 * 
 */


Application.ScrollerWidget = function(scrollerContainer, listContainer, pageSize, listData, listItemConstructorCallback, listCustomSizeCallback, postCallBack)
{
	this.pageSize 						= pageSize;
	this.listSize 						= (listData == null) ? 0 : listData.length;
	this.listData 						= listData;
	this.scrollerContainer 				= scrollerContainer;
	this.listContainer 					= listContainer;
	this.listItemConstructorCallback 	= listItemConstructorCallback;
	this.currentPage 					= 1;
	this.maxPages 						= Math.ceil(this.listSize / this.pageSize);
	
	this.listCustomSizeCallback 		= listCustomSizeCallback;
	
	this.postCallBack 					= postCallBack;
	
	this.jQUpDirection = null;
	this.jQDownDirection = null;
	this.jQPagesContainer = null;
	this.jQListContainer = null;
	
	this.Init = function()
	{
		this.CustomSize();
		$(this.scrollerContainer).empty();
		
		this.jQUpDirection = $('<div></div>').addClass('widget_scroller_direction_none');
		this.jQUpDirection.bind('click', proxy(this.HandleMoveUp, this));
		
		this.jQUpDirection.bind('mousedown', function()
		{
			$(".widget_scroller_direction_up").addClass('pressed');
		});
		this.jQUpDirection.bind('mouseup', function()
		{
			$(".widget_scroller_direction_up").removeClass('pressed');
		});
		this.jQUpDirection.bind('mouseout', function()
		{
			$(".widget_scroller_direction_up").removeClass('pressed');
		});
		
		$(this.scrollerContainer).append($('<div></div>').addClass('widget_scroller_direction').append(this.jQUpDirection));
		
		var jQPages = $('<div></div>').addClass('widget_scroller_pages');
		this.jQPagesContainer = $('<div></div>').addClass('widget_scroller_pages_container');
		jQPages.append(this.jQPagesContainer);
		$(this.scrollerContainer).append(jQPages);
		
		if(this.maxPages > 1)
		{
			this.jQDownDirection = $('<div></div>').addClass('widget_scroller_direction_down');
		}
		else
		{
			this.jQDownDirection = $('<div></div>').addClass('widget_scroller_direction_none');
		}
		this.jQDownDirection.bind('click', proxy(this.HandleMoveDown, this));
		
		this.jQDownDirection.bind('mousedown', function()
		{
			$(".widget_scroller_direction_down").addClass('pressed');
		});
		this.jQDownDirection.bind('mouseup', function()
		{
			$(".widget_scroller_direction_down").removeClass('pressed');
		});
		this.jQDownDirection.bind('mouseout', function()
		{
			$(".widget_scroller_direction_down").removeClass('pressed');
		});
		
		$(this.scrollerContainer).append($('<div></div>').addClass('widget_scroller_direction').append(this.jQDownDirection));
		
		
		// Resizing the scroller pages container to fit
		
		jQPages.css('height',(parseInt($(this.scrollerContainer).css('height')) - parseInt(this.jQUpDirection.css('height')) - parseInt(this.jQDownDirection.css('height'))));
		
		if(this.maxPages > 0)
		{
			this.jQPagesContainer.html(this.currentPage+"<br />/<br />"+this.maxPages);
		}
		
		this.jQListContainer = $(this.listContainer);
		
		this.PopulateList();
		
	};
	
	
	this.Terminate = function()
	{
		this.jQUpDirection.unbind('click');
		this.jQDownDirection.unbind('click');
		
		$(this.scrollerContainer).empty();
		this.jQListContainer.empty();
		
	};
	
	this.HandleMoveUp = function()
	{
		if(this.currentPage == 1)
		{
			return true;
		}
		
		this.currentPage--;
		this.UpdatePagerInfo();
		this.PopulateList();
	};
	
	this.HandleMoveDown = function()
	{
		if(this.currentPage == this.maxPages)
		{
			return true;
		}
		
		this.currentPage++;
		this.UpdatePagerInfo();
		this.PopulateList();
	};
	
	this.UpdatePagerInfo = function()
	{
		if(this.currentPage == 1)
		{
			if(this.jQUpDirection.hasClass('widget_scroller_direction_up'))
			{
				this.jQUpDirection.removeClass('widget_scroller_direction_up').addClass('widget_scroller_direction_none');
			}
			if(this.jQDownDirection.hasClass('widget_scroller_direction_none'))
			{
				this.jQDownDirection.removeClass('widget_scroller_direction_none').addClass('widget_scroller_direction_down');
			}
		}
		else if(this.currentPage == this.maxPages)
		{
			if(this.jQUpDirection.hasClass('widget_scroller_direction_none'))
			{
				this.jQUpDirection.removeClass('widget_scroller_direction_none').addClass('widget_scroller_direction_up');
			}
			if(this.jQDownDirection.hasClass('widget_scroller_direction_down'))
			{
				this.jQDownDirection.removeClass('widget_scroller_direction_down').addClass('widget_scroller_direction_none');
			}
		}
		else
		{
			if(this.jQUpDirection.hasClass('widget_scroller_direction_none'))
			{
				this.jQUpDirection.removeClass('widget_scroller_direction_none').addClass('widget_scroller_direction_up');
			}
			if(this.jQDownDirection.hasClass('widget_scroller_direction_none'))
			{
				this.jQDownDirection.removeClass('widget_scroller_direction_none').addClass('widget_scroller_direction_down');
			}
		}
		
		if(this.maxPages > 0)
		{
			this.jQPagesContainer.html(this.currentPage+"<br />/<br />"+this.maxPages);
		}
		
		
	};
	
	this.PopulateList = function()
	{
		this.jQListContainer.empty();
		
		if(this.listData == null || this.listData.length == 0) return;
		
		var startIdx = (this.currentPage - 1) * this.pageSize;
		var endIdx = startIdx + this.pageSize;
		if(endIdx >= this.listSize )
		{
			endIdx = this.listSize;
		}
		
		for(i = startIdx; i < endIdx; i++)
		{
			var html = this.listItemConstructorCallback(this.listData[i]);
			if(html == "" && endIdx + 1 < this.listSize)
			{
				endIdx++;
				continue;
			}
			if(html != "")
			{
				this.jQListContainer.append(html);
			}
		}
		if (this.postCallBack != null) this.postCallBack();
	};
	
	this.GetCurrentPage = function()
	{
		return this.currentPage;
	};
	
	this.GetPageSize = function()
	{
		return this.pageSize;
	};
	
	/*
	 * Called when the list(data) has changed
	 */
	this.Reset = function()
	{
		this.currentPage = 1;
		
		this.Init();
	};
	this.CustomSize = function ()
	{
		if (this.listCustomSizeCallback != null)
		{
			this.listSize = this.listCustomSizeCallback(this.listData);
			if ( (this.listSize).NaN )  
			{
				this.listSize = (listData == null) ? 0 : listData.length;
			}
		}
	};
	
	/*
	 * Set new list data. 
	 * You will need to reset the scroller after the list set in order to update the screen 
	 */ 
	this.SetListData = function(listData)
	{		
		this.listSize 						= (listData == null) ? 0 : listData.length;
		this.CustomSize();
		this.listData 						= listData;
		this.maxPages 						= Math.ceil(this.listSize / this.pageSize);
	};
	 
	this.Init();
};