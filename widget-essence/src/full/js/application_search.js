Application.Search = function(app)
{
	this.app = app;
	this.sortMode = 'distance';
	
	this.scroller = null;
	this.scrollText = null;	
	this.currentPage = 1;
	
	this.listData = [];
	
	this.listRefresh = true;
	
	this.RefreshContentList = true;
	
	this.listHistory = [];
	this.focusedHistory = null;
	this.scrollText = null;
		
	this.listServices = [{name: "srv_atm", selected: false},
	                     {name: "srv_baby_room", selected: false},
	                     {name: "srv_camping_car_area", selected: false},
	                     {name: "srv_car_repair", selected: false},
	                     {name: "srv_open_7", selected: false},
	                     {name: "srv_open_24", selected: false},
	                     {name: "srv_tyre_pressure", selected: false},
	                     {name: "srv_washing_station", selected: false}
	];
	
	this.tempList = [];
	
	this.searchList = [];
	this.search_mode = Application.CONSTANTS.SEARCH_ADDRESS_MODE_GPS;
	this.search_mode_selected_data = null;
	this.warningWidget = null;
	this.showSearchByAddressScreenBack = "";
	this.punctualListSearchScreenBack = "";
	this.notificationWidget = null;
	
	/* flag to mark if the storage loading in the class initialization is completed */
	this.intialStorageLoadCompleted = false;

	//SC4 START	
	this.ShowSearchMenu = function()
	{
		$("#search_module").show();
		$('#search_menu_panel').show();
				
		/* Clicks */
		$('#search_choice_address').bind('click', proxy(this.HandleSearchAddressButton, this));
		$('#search_choice_criteria').bind('click', proxy(this.HandleSearchMoreCriteriaButton, this));
						
		$("#search_choice_address").bind('mousedown', function ()
    	{    		
    		$("#search_choice_address").addClass('pressed');
    	}).bind('mouseout', function ()
    	{    		
    		$("#search_choice_address").removeClass('pressed');
    	}).bind('mouseup', function ()
    	{    		
    		$("#search_choice_address").removeClass('pressed');
    	});
				
		$("#search_choice_criteria").bind('mousedown', function ()
		{    		
			$("#search_choice_criteria").addClass('pressed');
		}).bind('mouseout', function ()
		{    		
			$("#search_choice_criteria").removeClass('pressed');
		}).bind('mouseup', function ()
		{    		
			$("#search_choice_criteria").removeClass('pressed');
		});
		
		for(var idx = 0; idx < this.listServices.length; idx++)
		{
			if(this.listServices[idx].selected)
			{
				this.listServices[idx].selected = false;
			}			
		}
		this.StorageSearchDataSave();
				
		this.app.SetIconBeforeAction(proxy(this.CloseSearchMenu, this));
		this.app.SetParametersBeforeAction(proxy(this.CloseSearchMenu, this));
		this.app.SetBackAction(proxy(this.CloseSearchMenuWithBack, this));
	};
	    
	this.CloseSearchMenu = function()
	{
		$('#search_choice_address').unbind();
		$('#search_choice_criteria').unbind();		
		$('#search_menu_panel').hide();
		$("#search_module").hide();
		
		this.app.SetIconBeforeAction(null);
		this.app.SetParametersBeforeAction(null);
		this.app.SetBackAction(null);
	};	
	
	this.HandleSearchMoreCriteriaButton = function()
	{
		this.CloseSearchMenu();
		this.ShowSearchServicesScreen();
		
	};
	
	this.CloseSearchMenuWithBack = function()
	{
		this.CloseSearchMenu();
		this.app.GetStationInfoModule().ShowContentList();
	};
	
	this.HandleSearchAddressButton = function()
	{		
		this.CloseSearchMenu();
		this.showSearchByAddressScreenBack = "ShowSearchMenu";
		this.ShowSearchByAddressScreen();
	};
	// SC4 END
	
	
	// SC5 START	
	this.ShowSearchByAddressScreen = function()
	{	
		$("#search_module").show();
		$("#search_byaddress_content").show();		
		
		$('#search_byaddres_search_text').val('${sc5_search_text_holder}');		
    	$('#search_byaddres_search_text').bind('focus', proxy(this.HandleTextSearchFocus, this));
    	$('#search_byaddres_search_text').bind('blur', proxy(this.HandleTextSearchBlur, this));
    	
    	$('.search_byaddress_choose_button').bind('click', proxy(this.HandleSearchByAddressButtonsClick, this)) ;
    	
    	$("#search_byaddress_history_button").bind('mousedown', function (){    		
    		$("#search_byaddress_history_button").addClass('pressed');
    	}).bind('mouseout', function (){    		
    		$("#search_byaddress_history_button").removeClass('pressed');
    	});
    	
    	//ok button
		$('#search_byaddress_ok_button').bind('click', proxy(this.HandleSearchOkButton, this));
		$("#search_byaddress_ok_button").bind('mousedown', function ()
    	{    		
    		$("#search_byaddress_ok_button").attr('class','search_byaddress_ok_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#search_byaddress_ok_button").attr('class','search_byaddress_ok_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#search_byaddress_ok_button").attr('class','search_byaddress_ok_button_off');
    	});
		
    	this.app.SetIconBeforeAction(proxy(this.CloseSearchByAddressScreen, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseSearchByAddressScreen, this));
		this.app.SetBackAction(proxy(this.CloseSearchByAddressScreenWithBack, this));
	};
	
	this.HandleTextSearchFocus = function (ev)
    {
		if($(ev.currentTarget).val() == '${sc5_search_text_holder}')
		{
			$(ev.currentTarget).val('');
		}
    };
    
    this.HandleTextSearchBlur = function (ev)
    {
		if($(ev.currentTarget).val() == '')
		{
			$(ev.currentTarget).val('${sc5_search_text_holder}');
		}
    };
	
	this.HandleSearchOkButton = function()
    {
		if($('#search_byaddres_search_text').val() == "" || $('#search_byaddres_search_text').val() == "${sc5_search_text_holder}")
    	{
    		new Application.NotificationWidget("#search_byaddress_content", function(){}, "${notification_invalid_input}");
    		return;
    	}
		
    	this.GeocodeAddressForHistory($('#search_byaddres_search_text').val());
    };
	
	this.HandleSearchByAddressButtonsClick = function(ev)
	{
		var button_id = $(ev.currentTarget).removeClass('pressed').attr('id');
    	
    	if(button_id == 'search_byaddress_history_button')
		{			
			this.CloseSearchByAddressScreen();
			this.ShowSearchHistoryScreen();
		}
	};
	
	this.GeocodeAddressForHistory = function (data)
    {
		//check if there is network connection
		if(this.app.networkStatus == false)
    	{
			this.notificationWidget = new Application.NotificationWidget("#search_module", function(){}, "${warning_no_network}");
			
			return false;
    	}
		
    	var client = Framework.GetWsClient(Framework.CONSTANTS.WS_CONTENT_GET_GEOCODING_BY_ADDRESS);
    	client.data.address = data;
    	
    	client.SetResponseOkCallBack(proxy(this.HandleGeocodeOkResponse, this));
    	
    	client.SetResponseErrorCallBack(proxy(this.HandleGeocodeErrorResponse, this));
    	
    	client.Send();
    	
    	$("#search_byaddres_search_text").attr("disabled", "disabled");
    };
    
    this.HandleGeocodeOkResponse = function(resp)
    {
    	this.search_mode_selected_data = resp;
    	this.search_mode = Application.CONSTANTS.SEARCH_ADDRESS_MODE_LOCATION;
    	
    	var found = false;
    	for(var idx = 0; idx < this.listHistory.length; idx++)
    	{
    		if(this.listHistory[idx].latitude == resp.latitude && this.listHistory[idx].longitude == resp.longitude)
    		{	
    			this.search_mode_selected_data = this.listHistory[idx];
    			found = true;
    			break;
    		}
    	}
    	
    	if(!found)
    	{
    		var currentListHistoryLength = this.listHistory.length;
						
			if (currentListHistoryLength >= Application.CONSTANTS.SEARCH_HISTORY_LIMIT)
			{
				this.notificationWidget = new Application.NotificationWidget("#search_module", null, "${sc5_limit_reached}");
				$("#search_byaddres_search_text").removeAttr("disabled");				
				return false;
			}
			
        	this.listHistory.push(resp);
    	}
    	
    	this.listRefresh = true;
    	
    	this.StorageSearchDataSave();
    	    	   	
    	this.CloseSearchByAddressScreen();
    	this.punctualListSearchScreenBack = "ShowSearchByAddressScreen";    	
    	this.ShowSearchPunctualListScreen();
    	
    	$("#search_byaddres_search_text").removeAttr("disabled");
    };
    
    this.HandleGeocodeErrorResponse = function(resp)
    {		
    	this.notificationWidget = new Application.NotificationWidget("#search_module", proxy(this.HandleOkNotificationClick, this), "${warning_geocoding_error}");
    };
    
    this.HandleOkNotificationClick = function ()
	{
		$("#search_byaddres_search_text").removeAttr("disabled");		
	};
	
	this.CloseSearchByAddressScreen = function()
	{		
		$("#search_byaddress_content").hide();
		$("#search_module").hide();
    	
    	$('.search_byaddress_choose_button').unbind();
    	$("#search_byaddress_history_button").unbind();
    	$('#search_byaddres_search_text').unbind();
    	$('#search_byaddress_ok_button').unbind();
    	
    	this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
		this.app.SetBackAction(null);
		
		if (this.warningWidget != null) this.warningWidget.TerminateWarning();
		if (this.notificationWidget != null) this.notificationWidget.HandleOkButton();
	};
	
	this.CloseSearchByAddressScreenWithBack = function()
	{
		this.search_mode_selected_data = null;
		if (this.showSearchByAddressScreenBack == "ShowSearchMenu")
		{			
			this.CloseSearchByAddressScreen();
			this.ShowSearchMenu();
		}
		else if (this.showSearchByAddressScreenBack == "ShowSearchServicesGpsAddrScreen")
		{
			this.CloseSearchByAddressScreen();
			this.ShowSearchServicesGpsAddrScreen();
		} 		
	};
	// SC5 END
	
	// SC5b START	
	this.ShowSearchServicesGpsAddrScreen = function ()
	{
		$("#search_module").show();
		$("#search_services_gps_address").show();
				
		$('#search_choice_gps_address_gps').bind('click', proxy(this.HandleSearchGpsScreen, this));
		$('#search_choice_gps_address_address').bind('click', proxy(this.HandleSearchAddressScreen, this));
		
		$("#search_choice_gps_address_gps").bind('mousedown', function ()
		{    		
			$("#search_choice_gps_address_gps").addClass('pressed');
		}).bind('mouseout', function ()
		{    		
			$("#search_choice_gps_address_gps").removeClass('pressed');
		}).bind('mouseup', function ()
		{    		
			$("#search_choice_gps_address_gps").removeClass('pressed');
		});
		
		$("#search_choice_gps_address_address").bind('mousedown', function ()
		{    		
			$("#search_choice_gps_address_address").addClass('pressed');
		}).bind('mouseout', function ()
		{    		
			$("#search_choice_gps_address_address").removeClass('pressed');
		}).bind('mouseup', function ()
		{    		
			$("#search_choice_gps_address_address").removeClass('pressed');
		});
		
		this.app.SetIconBeforeAction(proxy(this.CloseSearchServicesGpsAddrScreen, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseSearchServicesGpsAddrScreen, this));
		this.app.SetBackAction(proxy(this.CloseSearchServicesGpsAddrScreenWithBack, this));
	};
	
	this.HandleSearchGpsScreen = function ()
	{
		this.listRefresh = true;
		this.search_mode = Application.CONSTANTS.SEARCH_ADDRESS_MODE_GPS;
		this.StorageSearchDataSave();			
		this.CloseSearchServicesGpsAddrScreen();
		this.punctualListSearchScreenBack = "ShowSearchServicesGpsAddrScreen";
		this.ShowSearchPunctualListScreen();
	};
	
	this.HandleSearchAddressScreen = function ()
	{
		this.CloseSearchServicesGpsAddrScreen();
		this.showSearchByAddressScreenBack = "ShowSearchServicesGpsAddrScreen";
		this.ShowSearchByAddressScreen();
	};
	
	this.CloseSearchServicesGpsAddrScreen = function()
	{	
		$("#search_module").hide();
		$("#search_services_gps_address").hide();
    	
    	$("#search_choice_services").unbind();
    	$("#search_choice_gps_address_gps").unbind();
    	$("#search_choice_gps_address_address").unbind();
    	
    	this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
		this.app.SetBackAction(null);		
	};
	this.CloseSearchServicesGpsAddrScreenWithBack = function ()
	{
		this.search_mode = Application.CONSTANTS.SEARCH_ADDRESS_MODE_GPS;
		this.CloseSearchServicesGpsAddrScreen();
		this.ShowSearchServicesScreen();		
	};
	// SC5b END	
	
	//SC7 START	
	this.ShowSearchHistoryScreen = function()
	{
		$("#search_module").show();
		$("#search_byaddress_history_content").show();
		
		this.scrollText = new Application.TextScroller();
    	
    	this.focusedHistory = null;
		
		$("#search_byaddress_history_delete_all_button").bind('mousedown', function ()
		{    		
			$("#search_byaddress_history_delete_all_button").attr('class','delete_all_button_on');
		}).bind('mouseout', function ()
		{    		
			$("#search_byaddress_history_delete_all_button").attr('class','delete_all_button_off');
		}).bind('mouseup', function ()
		{    		
			$("#search_byaddress_history_delete_all_button").attr('class','delete_all_button_off');
		}).bind('click', proxy(this.HandleSearchHistoryDeleteAllClick, this));
		
    	$('#search_byaddress_history_all_history').delegate(".search_list_item_colored_bar_h68", "click", proxy(this.HandleSearchHistoryAddressClick, this));
		
		this.scroller = new Application.ScrollerWidget("#search_history_scroller", "#search_byaddress_history_all_history", 3, this.listHistory, this.SearchHistoryListItemConstructorCallback);
		
		this.app.SetIconBeforeAction(proxy(this.CloseSearchHistoryScreen, this));
		this.app.SetParametersBeforeAction(proxy(this.CloseSearchHistoryScreen, this));
		this.app.SetBackAction(proxy(this.CloseSearchHistoryScreenWithBack, this));
	};
	
	this.SearchHistoryListItemConstructorCallback = function(itemData)
	{		
		var html = '<div class="search_list_item_colored_bar_h68" id="search_byaddress_choose_address_address'+new String(itemData.latitude).replace(".","")+new String(itemData.longitude).replace(".","")+'">';
			html += '<div class="history_list_item_text_span policy_list_name" id="name_scroll_'+new String(itemData.latitude).replace(".","")+new String(itemData.longitude).replace(".","")+'">';
			
				var address = '';
			
				if(itemData.thoroughfare != null)
				{
					address += itemData.thoroughfare;
				}
				else if(itemData.locality != null)
				{
					address += itemData.locality;
				}
				
				if(address != '' && (itemData.country != null || itemData.country_code != null || itemData.zipcode != null))
				{
					address += ',';
				}
				
				if(itemData.zipcode != null)
				{
					address += ' '+itemData.zipcode;
				}
				
				if(itemData.country != null)
				{
					address += ' '+itemData.country;
				}
				else if(itemData.country_code != null)
				{
					address += ' '+itemData.country_code;
				}
			html += address + '</div>';
			html += '<div id="focused_address_'+new String(itemData.latitude).replace(".","")+new String(itemData.longitude).replace(".","")+'" class="focused_address"></div>';
		html += '</div>';
		
		return html;
	};
	
	this.HandleSearchHistoryDeleteAllClick = function(ev)
	{		
		this.listHistory = new Array(); 
		this.StorageSearchDataSave();   	
    	    	
		this.scroller.SetListData(this.listHistory);
		this.scroller.Reset();		
	};
	
	this.HandleSearchHistoryAddressClick = function(ev)
	{
		item_idx = $('#search_byaddress_history_all_history').children().index("#"+$(ev.currentTarget).attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
    	
		wasClicked = false;
		scrollName = false;
		
		if (this.focusedHistory != null)
		{
			$('#focused_address_'+new String(this.focusedHistory.latitude).replace(".","")+new String(this.focusedHistory.longitude).replace(".","")).hide();
			this.scrollText.StopScroll("#name_scroll_"+new String(this.focusedHistory.latitude).replace(".","")+new String(this.focusedHistory.longitude).replace(".",""));
				
			
			if (this.focusedHistory.latitude == this.listHistory[item_idx].latitude && this.focusedHistory.longitude == this.listHistory[item_idx].longitude)
			{
				this.focusedHistory = null;
				wasClicked = true;
				
				this.search_mode_selected_data = this.listHistory[item_idx];
		    	this.search_mode = Application.CONSTANTS.SEARCH_ADDRESS_MODE_LOCATION;
				
				this.listRefresh = true;
				
				this.StorageSearchDataSave();
		    	
				this.CloseSearchHistoryScreen();
				this.punctualListSearchScreenBack = "ShowSearchByAddressScreen";
		    	this.ShowSearchPunctualListScreen();
			}
			else
			{
				this.focusedHistory = null; 
			}			
		}	
		if (this.focusedHistory == null && wasClicked === false)
		{			
			this.focusedHistory = this.listHistory[item_idx];

			scrollName = this.scrollText.StartScroll("#name_scroll_"+new String(this.focusedHistory.latitude).replace(".","")+new String(this.focusedHistory.longitude).replace(".",""));				
			
			if(!scrollName)
			{
				this.search_mode_selected_data = this.listHistory[item_idx];
		    	this.search_mode = Application.CONSTANTS.SEARCH_ADDRESS_MODE_LOCATION;
				
				this.listRefresh = true;
				
				this.StorageSearchDataSave();
		    	
				this.CloseSearchHistoryScreen();
				this.punctualListSearchScreenBack = "ShowSearchByAddressScreen";
		    	this.ShowSearchPunctualListScreen();	
			}
			else
			{
				$('#focused_address_'+new String(this.focusedHistory.latitude).replace(".","")+new String(this.focusedHistory.longitude).replace(".","")).show();
			}
		}
		
	};
	
	this.CloseSearchHistoryScreen = function()
	{
		if(this.scroller != null)
		{
			this.scroller.Terminate();
			this.scroller = null;
		}
		
		$('#search_byaddress_history_all_history').undelegate();
		$('#search_byaddress_history_delete_all_button').unbind();
		$("#search_byaddress_history_content").hide();
		$("#search_module").hide();
		
		this.app.SetIconBeforeAction(null);
		this.app.SetParametersBeforeAction(null);
		this.app.SetBackAction(null);
	};
	
	this.CloseSearchHistoryScreenWithBack = function()
	{
		this.CloseSearchHistoryScreen();
		this.ShowSearchByAddressScreen();
	};
	// SC7 END
	
	// SC8 START	
	this.ShowSearchServicesScreen = function()
	{		
		$("#search_module").show();
		$("#search_services_panel").show();
		
		this.tempList = new Array();
    	
    	for(var idx = 0; idx < this.listServices.length; idx++)
    	{
    		this.tempList[idx] = {name: this.listServices[idx].name , selected : this.listServices[idx].selected};
    	}
    	
    	this.scroller = new Application.ScrollerWidget('#search_services_scroller', '#search_services_main_content', 3, this.tempList, this.SearchServicesListItemConstructorCallback);
		
		//check if all services are selected
    	var size = this.tempList.length;
		var totalChecked = 0;
		for(i = 0; i < size; i++)
		{			
			if (this.tempList[i].selected) totalChecked++;
		}
		
		if (size == totalChecked)
		{
			$("#settings_choose_make_select_all_title_services").html("${sc8_deselect_all}");
		}
		else
		{
			$("#settings_choose_make_select_all_title_services").html("${sc8_select_all}");
		}
		
		$('#search_services_select_all_button').bind('mousedown', function(){
			$('#search_services_select_all_button').addClass("pressed");
		}).bind('mouseout', function(){
			$('#search_services_select_all_button').removeClass("pressed");
		}).bind('mouseup', function(){
			$('#search_services_select_all_button').removeClass("pressed");
		}).bind('click', proxy(this.HandleServicesSelectAll, this));
		
		
		$("#search_services_ok_button").bind('mousedown', function ()
    	{    		
    		$("#search_services_ok_button").attr('class','search_services_only_ok_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#search_services_ok_button").attr('class','search_services_only_ok_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#search_services_ok_button").attr('class','search_services_only_ok_button_off');
    	}).bind('click', proxy(this.HandleServicesSelectOk, this));
							
		$('#search_services_main_content').delegate(".search_list_item_colored_bar_h68", "click", proxy(this.HandleSearchServicesItemClick, this));
		
		this.app.SetIconBeforeAction(proxy(this.CloseSearchServicesScreen, this));
		this.app.SetParametersBeforeAction(proxy(this.CloseSearchServicesScreen, this));
		this.app.SetBackAction(proxy(this.CloseSearchServicesScreenWithBack, this));
	};
	
	this.SearchServicesListItemConstructorCallback = function (itemData)
	{
		var name = "";
		var icon = "";
		switch(itemData.name)
		{
			case "srv_atm":
				name = '${srv_atm}';
				icon = "./images/srv_atm_53.png";
				break;
			case "srv_baby_room":
				name = '${srv_baby_room}';
				icon = "./images/srv_baby_room_53.png";
				break;
			case "srv_camping_car_area":
				name = '${srv_camping_car_area}';
				icon = "./images/srv_camping_car_area_53.png";
				break;
			case "srv_car_repair":
				name = '${srv_car_repair}';
				icon = "./images/srv_car_repair_53.png";
				break;
			case "srv_open_7":
				name = '${srv_open_7}';
				icon = "./images/srv_open_7_53.png";
				break;
			case "srv_open_24":
				name = '${srv_open_24}';
				icon = "./images/srv_open_24_53.png";
				break;
			case "srv_tyre_pressure":
				name = '${srv_tyre_pressure}';
				icon = "./images/srv_tyre_pressure_53.png";
				break;
			case "srv_washing_station":
				name = '${srv_washing_station}';
				icon = "./images/srv_washing_station_53.png";
				break;
		}	
		
		var html = '<div class="search_list_item_colored_bar_h68" id="service_item_'+itemData.name+'">';
			html += '<div class="search_list_item_logo"><img src="'+icon+'" /></div>';
			html += '<div class="search_list_item_text">';
				html += '<div class="search_list_item_text_span policy_list_name">';
					
				html += name + '</div>';
				
			html += '</div>';
			html += '<div';
			if(!itemData.selected)
			{
				html += ' class="search_list_item_checkbox off"';
			}
			else
			{
				html += ' class="search_list_item_checkbox on"';
			}
			html += '></div>';
		html += '</div>';
		
		return html;
	};
	
	this.HandleSearchServicesItemClick = function(ev)
	{		
		item_idx = $('#search_services_main_content').children().index("#"+$(ev.currentTarget).attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
		var size = this.tempList.length;
		var totalChecked = 0;
		
		if(this.tempList[item_idx].selected)
		{
			this.tempList[item_idx].selected = false;
			
			$("#settings_choose_make_select_all_title_services").html("${sc8_select_all}");
			$('.search_list_item_checkbox', $(ev.currentTarget)).removeClass("on");
			$('.search_list_item_checkbox', $(ev.currentTarget)).addClass("off");			
		}
		else
		{
			this.tempList[item_idx].selected = true;
			
			//check if all services are selected
			for(i = 0; i < size; i++)
			{			
				if (this.tempList[i].selected) totalChecked++;
			}
			
			if (size == totalChecked)
			{
				$("#settings_choose_make_select_all_title_services").html("${sc8_deselect_all}");
			}
			$('.search_list_item_checkbox', $(ev.currentTarget)).removeClass("off");
			$('.search_list_item_checkbox', $(ev.currentTarget)).addClass("on");
		}
		
	};
	
	this.HandleServicesSelectAll = function(ev)
	{
		var size = this.tempList.length;
		var totalChecked = 0;
		
		//check if all services are selected
		for(i = 0; i < size; i++)
		{			
			if (this.tempList[i].selected) totalChecked++;
		}
		
		if (size == totalChecked)		
		{
			for(i = 0; i < size; i++)
			{
				this.tempList[i].selected = false;
			}
			$("#settings_choose_make_select_all_title_services").html("${sc8_select_all}");
			$('#search_services_main_content .search_list_item_checkbox').removeClass("on");
			$('#search_services_main_content .search_list_item_checkbox').removeClass("off");
			$('#search_services_main_content .search_list_item_checkbox').addClass("off");
		}
		else
		{		
			for(i = 0; i < size; i++)
			{
				this.tempList[i].selected = true;
			}
			$("#settings_choose_make_select_all_title_services").html("${sc8_deselect_all}");
			$('#search_services_main_content .search_list_item_checkbox').removeClass("on");
			$('#search_services_main_content .search_list_item_checkbox').removeClass("off");
			$('#search_services_main_content .search_list_item_checkbox').addClass("on");
		}		
	};
	
	this.HandleServicesSelectOk = function(ev)
	{
		this.listServices = this.tempList;
		
		this.listRefresh = true;
    	
    	this.StorageSearchDataSave();
    	
		this.CloseSearchServicesScreen();
		this.ShowSearchServicesGpsAddrScreen();
	};
		
	this.CloseSearchServicesScreen = function()
	{
		this.tempList = null;
		
		if(this.scroller != null)
		{
			this.scroller.Terminate();
			this.scroller = null;
		}
		
		$('#search_services_select_all_button').unbind();
		$('#search_services_ok_button').unbind();
		$('#search_services_cancel_button').unbind();
		$('#search_services_main_content').undelegate();
		$("#search_services_panel").hide();
		$("#search_module").hide();
		
		this.app.SetIconBeforeAction(null);
		this.app.SetParametersBeforeAction(null);
		this.app.SetBackAction(null);
	};
	
	this.CloseSearchServicesScreenWithBack = function()
	{
		this.CloseSearchServicesScreen();
		this.ShowSearchMenu();
	};
	// SC8 END
	
	
	//SC9 START	
	this.ShowSearchPunctualListScreen = function()
	{
		if(this.app.GetParametersModule().selectedFuel.fuel_code == "SP95&SP95-E10")
		{
			this.app.GetParametersModule().selectedFuel.gas_types = [];
			for(i=0; i<this.app.GetParametersModule().gasListData.length; i++)
			{
				if(this.app.GetParametersModule().gasListData[i].fuel_code == "SP95" || this.app.GetParametersModule().gasListData[i].fuel_code == "SP95-E10")
				{
					for(j=0; j < this.app.GetParametersModule().gasListData[i].gas_types.length; j++)
					{
						this.app.GetParametersModule().selectedFuel.gas_types.push(this.app.GetParametersModule().gasListData[i].gas_types[j]);
					}
					
				}
			}
			
		}
		
		this.scrollText = new Application.TextScroller();
		
		$('#search_module').show();
		$('#search_punctual_list_search').show();
		
		$(".search_punctual_list_sort_button").removeClass('pressed').bind('click', proxy(this.HandlePunctualListSortButton, this));
							
		//exit button
		$("#search_punctual_list_btn_exit").bind('mousedown', function ()
    	{    		
    		$("#search_punctual_list_btn_exit").attr('class','search_punctual_list_btn_exit_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#search_punctual_list_btn_exit").attr('class','search_punctual_list_btn_exit_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#search_punctual_list_btn_exit").attr('class','search_punctual_list_btn_exit_off');
    	}).bind('click', proxy(this.HandlePunctualListExitButton, this));
		
		$('#search_punctual_list').delegate(".content_list_item", "click", proxy(this.HandlePunctualListStationClick, this));
	
		
		if ((this.app.GetStationInfoModule().canUseGps == null || this.app.GetStationInfoModule().canUseGps == "no") && this.search_mode == "gps") 
		{			
			gpsWarningWidget = new Application.ConfirmationWidget("#search_module", proxy(this.HandleOkConfirmationClick, this), proxy(this.HandleCancelConfirmationClick, this), "${gps_confirmation_message}", "${gps_authorization_accept}", "${gps_authorization_not_accept}");
		}
		else if(this.app.networkStatus == false)
		{
			var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_network}</div></div>';
			$("#search_punctual_list").html(itm);
			this.app.SetIconBeforeAction(proxy(this.CloseSearchPunctualListScreen, this));
			this.app.SetParametersBeforeAction(proxy(this.CloseSearchPunctualListScreen, this));
			this.app.SetBackAction(proxy(this.CloseSearchPunctualListScreenWithBack, this));
		}
		else 
		{
			this.SearchPunctualListScreenWsCall();		
		}		

	};
	
	this.SearchPunctualListScreenWsCall = function ()
	{
		if(this.listRefresh)
		{
			var range = this.app.GetParametersModule().selectedRange;
			
			var client = Framework.GetWsClient(Framework.CONSTANTS.WS_CONTENT_GET_GAS_STATIONS_NEAR_BY);
			var gas = this.app.GetParametersModule().gasListData;
			
			if(this.search_mode == Application.CONSTANTS.SEARCH_ADDRESS_MODE_LOCATION)
			{
				client.data.latitude 	= this.search_mode_selected_data.latitude;
				client.data.longitude 	= this.search_mode_selected_data.longitude;
				
			}
			else
			{
				client.data.latitude 		= this.app.gpsPosition.latitude;
				client.data.longitude 		= this.app.gpsPosition.longitude;
	
			}
			
			client.data.language_id		= "${language_code}";
			client.data.radius			= range;
			client.data.limit			= 30;
			
			var gas_index = 0;		
			for (var i=0; i < gas.length; i++)
			{
				if (gas[i].selected) gas_index = i;
			}
			client.data.gas_kind = gas[gas_index].fuel_code;
			
			var services = new Array();
			for(var idx = 0; idx < this.listServices.length; idx++)
			{
				if(this.listServices[idx].selected)
				{
					services.push(this.listServices[idx].name);
				}
			}
			if(services.length > 0)
			{
				client.data.services_filter = services;
			}
			else
			{
				client.data.services_filter = ['all'];
			}
			
			
			client.SetResponseOkCallBack(proxy(this.HandleWSResponseOk, this));
			
			client.SetResponseErrorCallBack(proxy(this.HandleWSResponseError, this));
			
			this.app.ShowLoading();
			
			client.Send();
		}
		else
		{
			this.scroller = new Application.ScrollerWidget('#search_punctual_list_scroller', '#search_punctual_list', 3, this.listData, proxy(this.PunctualListItemConstructorCallback, this));
			//scroll to current page
			while(this.scroller.GetCurrentPage() != this.currentPage && this.scroller.GetCurrentPage() < this.scroller.maxPages)
				this.scroller.HandleMoveDown();
				
			this.ShowSearchDetailsInFooter();
		}
		if(this.sortMode == 'distance')
			$("#search_punctual_list_btn_distance").addClass('pressed');
		else if(this.sortMode == 'price')
			$("#search_punctual_list_btn_price").addClass('pressed');
			
		this.app.SetIconBeforeAction(proxy(this.CloseSearchPunctualListScreen, this));
		this.app.SetParametersBeforeAction(proxy(this.CloseSearchPunctualListScreen, this));
		this.app.SetBackAction(proxy(this.CloseSearchPunctualListScreenWithBack, this));
	};
	
	this.HandleOkConfirmationClick = function () 
	{
		this.app.GetStationInfoModule().canUseGps = true;
		this.app.GetParametersModule().StorageParametersDataSave();		
				
		this.SearchPunctualListScreenWsCall();				
	};
	
	this.HandleCancelConfirmationClick = function () 
	{	
		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${gps_confirmation_cancel_button_message}</div></div>';
		$("#search_punctual_list").html(itm);
		
		this.app.GetStationInfoModule().canUseGps = true;
		this.app.GetParametersModule().StorageParametersDataSave();
				
		this.app.SetIconBeforeAction(proxy(this.CloseSearchPunctualListScreen, this));
		this.app.SetParametersBeforeAction(proxy(this.CloseSearchPunctualListScreen, this));
		this.app.SetBackAction(proxy(this.CloseSearchPunctualListScreenWithBack, this));
	};
	
	this.HandleWSResponseOk = function(data)
	{	
		this.listRefresh = false;
		
		if (data.length > 0)
		{
			var hasQLimit = false;
			
			for(k = 0; k < data.length; k++)
			{
				for(i = 0; i < data[k].gaz_prices.length; i++)
				{
					if(data[k].gaz_prices[i].age > 30)
					{
						data[k].gaz_prices[i].symbol = "0";
					}
					if(data[k].gaz_prices[i].age > 999)
					{
						data[k].gaz_prices[i].age = 999;
					}
				}
				
				// Now check if the country has a limit enabled
				if(this.app.GetParametersModule().queryLimitCountries[data[k].country_code.toLowerCase()] != null)
				{
					hasQLimit = true;
				}
			}		
			
			if(hasQLimit)
			{
				if(this.app.GetParametersModule().CheckQueryLimit(true))
				{
					this.app.HideLoading();
					var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${maximum_list_refresh_times_reached}</div></div>';
					$("#search_punctual_list").html(itm);
					return;
				}
			}
			
			switch(this.sortMode)
			{
				case "price" : data.sort(proxy(this.app.GetStationInfoModule().SortByPriceComparator, this));
				break;
				
				case "distance" : data.sort(sortByDistance);
				break;
				
				default: data.sort(sortByDistance);
				break;
			}
			this.listData = data;
			this.scroller = new Application.ScrollerWidget('#search_punctual_list_scroller', '#search_punctual_list', 3, this.listData, proxy(this.PunctualListItemConstructorCallback, this));
		}
		else
		{
			this.listData = new Array();
			var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_results_found}</div></div>';
			$("#search_punctual_list").html(itm);
		}
		
		this.app.HideLoading();	
		this.ShowSearchDetailsInFooter();
	};
	
	this.HandleWSResponseError = function(data)
	{
		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_results_found}</div></div>';
			$("#search_punctual_list").html(itm);
		this.app.HideLoading();
		this.ShowSearchDetailsInFooter();
	};
	
	this.ShowSearchDetailsInFooter = function ()
	{
		selectedAddress 		= "";
		selectedServices 		= "";
		servicesLength 			= this.listServices.length;
		numberSelectedServices 	= 0;
		defaultDivWidth 		= 596;
		
		$("footer").append($("#footer_search_details"));
		
		$("#footer_search_details_address").css("width", defaultDivWidth+"px");		
		$("#footer_search_details").show();
		
		if (this.search_mode == "gps") selectedAddress = "${sc9_around_me}";
		else 
		{				
			if(this.search_mode_selected_data.thoroughfare != null)
			{
				selectedAddress += this.search_mode_selected_data.thoroughfare;
			}
			else if(this.search_mode_selected_data.locality != null)
			{
				selectedAddress += this.search_mode_selected_data.locality;
			}
			
			if(selectedAddress != '' && (this.search_mode_selected_data.country != null || this.search_mode_selected_data.country_code != null || this.search_mode_selected_data.zipcode != null))
			{
				selectedAddress += ',';
			}
			
			if(this.search_mode_selected_data.zipcode != null)
			{
				selectedAddress += ' '+this.search_mode_selected_data.zipcode;
			}
			
			if(this.search_mode_selected_data.country != null)
			{
				selectedAddress += ' '+this.search_mode_selected_data.country;
			}
			else if(this.search_mode_selected_data.country_code != null)
			{
				selectedAddress += ' '+this.search_mode_selected_data.country_code;
			}
		}				
		$("#footer_search_details_address").html(selectedAddress);				
		
		this.scrollText.StartScroll("#footer_search_details_address");		
	};
	this.CloseShowSearchDetailsInFooter = function ()
	{
		this.scrollText.StopScroll("#footer_search_details_address");		
			
		$("#footer_search_details").hide();
		$("#search_punctual_list_search").append($("#footer_search_details"));		
	};
	
	this.PunctualListItemConstructorCallback = function (itemData)
	{	
		var distanceFormat = "";
		var gasPrice = itemData.gaz_prices[0];
		var price;
		var symbol;
		var price_age;
		this.app.GetStationInfoModule().focusedStation = null;
		
		
		var m = 9999;
		var idx = 0;
		for(var i = 0; i < itemData.gaz_prices.length; i++)
		{
			for(var j = 0; j < this.app.GetParametersModule().selectedFuel.gas_types.length; j++)
			{
				if(itemData.gaz_prices[i].gaz_kind == this.app.GetParametersModule().selectedFuel.gas_types[j])
				{
					if(itemData.gaz_prices[i].price < m)
					{
						m = itemData.gaz_prices[i].price;
						idx = i;
					}
				}
			}
		}
		
		var selected_price = itemData.gaz_prices[idx];
	
		
		price = selected_price.price;
		price_age = selected_price.age;
		if(price_age > 30)
		{
			symbol = 0;
		}
		else
		{
			symbol = selected_price.symbol;
		}
		
		if(price == undefined || price == "")
		{
			price = 0;
		}
		if(price_age == undefined || price_age == "")
		{
			price_age = 0;
		}
		

		var logo = this.app.GetStationInfoModule().GetStationLogo(itemData);
		var fullAddress;
		
		if(itemData.locality != "" || itemData.locality != null || itemData.locality != undefined)
			fullAddress = itemData.address + " ," + itemData.locality;
		else
			fullAddress = itemData.address;
		
		distanceFormat = convertDistance(itemData.distance);
		
		var html = '<div id="station_'+itemData.uuid+'" class="content_list_item '+GetStationColor(symbol)+'">';
			html += '<div class="content_list_item_station_content">';
				html += '<div class="content_list_item_logo_container"><div class="content_list_item_logo"><img src="'+logo+'" class="img_logo" /></div></div>';
				html += '<div class="content_list_item_info_container"><div class="content_list_item_name policy_content_list_name" id="name_scroll_'+itemData.uuid+'">'+itemData.brand+'</div><div class="content_list_item_address policy_content_list_address" id="address_scroll_'+itemData.uuid+'">'+fullAddress+'</div></div>';
				html += '<div class="content_list_item_distance_container"><div class="content_list_item_distance policy_content_list_distance">'+distanceFormat+'</div></div>';
				html += '<div class="content_list_item_price_container"><div class="content_list_item_price_value policy_content_list_price">'+price+this.app.GetCurrencyByName(itemData.currency,"html_code")+'</div><div class="content_list_item_price_age policy_content_list_age">'+price_age+'${days_symbol}</div></div>';
			html += '</div>';
			html += '<div id="focused_station_'+itemData.uuid+'" class="focused_station"></div>';
		html += '</div>';
		
		return html;
	};
	
	this.CloseSearchPunctualListScreen = function()
	{
		if(this.scroller != null)
		{
			this.currentPage = this.scroller.GetCurrentPage();			
			this.scroller.Terminate();
			this.scroller = null;			
		}
		
		$('#search_punctual_list').empty();
		$('#search_punctual_list').undelegate();
		$(".search_punctual_list_sort_button").unbind();		
		$("#search_punctual_list_btn_exit").unbind();
		$('#search_punctual_list_search').hide();
				
		this.CloseShowSearchDetailsInFooter();	
		
		$('#search_module').hide();
		
		this.app.HideLoading();
		this.app.GetStationInfoModule().focusedStation = null;
		this.app.SetIconBeforeAction(null);
		this.app.SetParametersBeforeAction(null);
		this.app.SetBackAction(null);
	};
	
	this.CloseSearchPunctualListScreenWithBack = function()
	{
		if (this.punctualListSearchScreenBack == "ShowSearchServicesGpsAddrScreen")
		{
			this.CloseSearchPunctualListScreen();
			this.ShowSearchServicesGpsAddrScreen();
		}
		else if (this.punctualListSearchScreenBack == "ShowSearchByAddressScreen")
		{
			this.CloseSearchPunctualListScreen();
			this.ShowSearchByAddressScreen();
		}		
	};
	
	this.HandlePunctualListSortButton = function(ev)
	{
		var button_id = $(ev.currentTarget).attr('id');
		
		if(button_id == "search_punctual_list_btn_distance")
		{
			if(this.sortMode == 'distance')
				return true;
			else
			{
				$(".search_punctual_list_sort_button").removeClass('pressed');
				$("#search_punctual_list_btn_distance").addClass('pressed');
				this.TriggerPunctualListSort('distance');
			}
				
		}
		else if(button_id == "search_punctual_list_btn_price")
		{
			if(this.sortMode == 'price')
				return true;
			else
			{
				$(".search_punctual_list_sort_button").removeClass('pressed');
				$("#search_punctual_list_btn_price").addClass('pressed');
				this.TriggerPunctualListSort('price');
			}
				
		}
		
	};
	
	this.TriggerPunctualListSort = function(mode)
	{	
		switch(mode)
		{
			case "price" : this.listData.sort(proxy(this.app.GetStationInfoModule().SortByPriceComparator, this));
			break;
			
			case "distance" : this.listData.sort(sortByDistance);
			break;
			
			default: this.listData.sort(sortByDistance);
			break;
		}
		this.sortMode = mode;		
		this.scroller.Reset();
	};	
	
	this.HandlePunctualListExitButton = function(ev)
	{
		this.CloseSearchPunctualListScreen();
		this.app.GetStationInfoModule().ShowContentList();
	};
	
	this.HandlePunctualListStationClick = function(ev)
	{
		item_idx = $('#search_punctual_list').children().index("#"+$(ev.currentTarget).attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
		wasClicked = false;
						
		if (this.app.GetStationInfoModule().focusedStation != null)
		{
			$('#focused_station_'+this.app.GetStationInfoModule().focusedStation.uuid).hide();
			this.scrollText.StopScroll("#name_scroll_"+this.app.GetStationInfoModule().focusedStation.uuid);
			this.scrollText.StopScroll("#address_scroll_"+this.app.GetStationInfoModule().focusedStation.uuid);			
			
			if (this.app.GetStationInfoModule().focusedStation.uuid == this.listData[item_idx].uuid)
			{
				this.app.GetStationInfoModule().focusedStation = null;
				wasClicked = true;
				
				//close current screen				
				this.CloseSearchPunctualListScreen();
				this.app.GetStationInfoModule().currentStationFromList = 'search';
				this.app.GetStationInfoModule().ShowStationDetailScreen();				
			}
			else
			{
				this.app.GetStationInfoModule().focusedStation = null; 
			}			
		}		
		if (this.app.GetStationInfoModule().focusedStation == null && wasClicked === false)
		{			
			this.app.GetStationInfoModule().focusedStation = this.listData[item_idx];
			this.app.GetStationInfoModule().currentStation = this.listData[item_idx];				
					
			scrollResultName = this.scrollText.StartScroll("#name_scroll_"+this.app.GetStationInfoModule().focusedStation.uuid);				
			scrollResultAddress = this.scrollText.StartScroll("#address_scroll_"+this.app.GetStationInfoModule().focusedStation.uuid);
			
			if(!scrollResultName && !scrollResultAddress)
			{
				//close current screen				
				this.CloseSearchPunctualListScreen();
				this.app.GetStationInfoModule().currentStationFromList = 'search';
				this.app.GetStationInfoModule().ShowStationDetailScreen();
			}
			else
			{
				$('#focused_station_'+this.app.GetStationInfoModule().focusedStation.uuid).show();
			}
		}		
	};	
	// SC9 END
	
	
	// Storage handle and save START	
	this.StorageSearchDataSave = function ()
	{
		data = {search_service_data			: this.listServices,
				search_address_mode			: this.search_mode,
				search_address_history		: this.listHistory,
				search_address_mode_data	: this.search_mode_selected_data
		};
		
		PORTAL.storage.put(Application.CONSTANTS.STORAGE_PREFIX+Application.CONSTANTS.STORAGE_SEARCH, data, false, function(){}, function(){});		
	};
	this.HandleStorageSearch = function(data)
	{
		if (data != null)
		{
			if (data.search_service_data != null && data.search_service_data.length != null && data.search_service_data.length > 0)
	 		{
				this.listServices = data.search_service_data;
			}
			if (data.search_address_mode != null)
 			{
				this.search_mode = data.search_address_mode;
			}
			if (data.search_address_history != null && data.search_address_history.length != null && data.search_address_history.length > 0)
 			{
				this.listHistory = data.search_address_history;
			}			
			if (data.search_address_mode_data != null)
	 		{
				this.search_mode_selected_data = data.search_address_mode_data;
			}
		}
		
		this.intialStorageLoadCompleted = true;
	};
	this.HandleStorageSearchError = function()
	{
		this.intialStorageLoadCompleted = true;
	};
	// Storage handle and save END
    
    /*function to init*/
    this.Init = function()
    {
    	PORTAL.storage.get(Application.CONSTANTS.STORAGE_PREFIX+Application.CONSTANTS.STORAGE_SEARCH, proxy(this.HandleStorageSearch, this), proxy(this.HandleStorageSearchError, this));    	    	
    };
	
	this.Init();
};

