Application.Search = function(app)
{
	this.app = app;
	this.sortMode = 'distance';
	
	this.scroller = null;
	this.scrollText = null;
	
	this.listRefresh = true;
	this.listData = [];
	this.currentPage = 1;
	
	this.listHistory = [];
	this.focusedHistory = null;
	this.scrollText = null;
	
	this.listServices = [{name: "srv_electric_recharge", selected: false},
	                     {name: "srv_no_Acc_GPL", selected: false},
	                     {name: "srv_disabled_person_assistance", selected: false},
	                     {name: "srv_elevator", selected: false},
	                     {name: "srv_video_surveillance", selected: false},
	                     {name: "srv_car_wash", selected: false},
	                     {name: "srv_wc", selected: false},
	                     {name: "srv_motorcycle_parking", selected: false}
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
    this.ShowSearchSelectScreen = function ()
    {
    	$("#search_module").show();
    	$("#search_select").show();    	
    	
    	//address buttons
    	$('#search_select_search_by_address_button').bind('click', proxy(this.HandleSelectSearchByAddressClick, this));
    	$("#search_select_search_by_address_button").bind('mousedown', function ()
    	{    		
    		$("#search_select_search_by_address_button").addClass('pressed');
    	}).bind('mouseout', function ()
    	{    		
    		$("#search_select_search_by_address_button").removeClass('pressed');
    	}).bind('mouseup', function ()
    	{    		
    		$("#search_select_search_by_address_button").removeClass('pressed');
    	});
    	
    	//services buttons
    	$('#search_select_search_criteria_button').bind('click', proxy(this.HandleSearchMoreCriteriaButton, this));
    	$("#search_select_search_criteria_button").bind('mousedown', function ()
    	{    		
    		$("#search_select_search_criteria_button").addClass('pressed');
    	}).bind('mouseout', function ()
    	{    		
    		$("#search_select_search_criteria_button").removeClass('pressed');
    	}).bind('mouseup', function ()
    	{    		
    		$("#search_select_search_criteria_button").removeClass('pressed');
    	});
    	
    	for(var idx = 0; idx < this.listServices.length; idx++)
		{
			if(this.listServices[idx].selected)
			{
				this.listServices[idx].selected = false;
			}			
		}
		this.StorageSearchDataSave();
    	    	
    	this.app.SetIconBeforeAction(proxy(this.CloseSearchSelectScreen, this));
    	this.app.SetBackAction(proxy(this.CloseSearchSelectScreenWithBack, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseSearchSelectScreen, this));
    };    
        
    this.HandleSelectSearchByAddressClick = function ()
    {    	    	
    	this.CloseSearchSelectScreen();
    	this.showSearchByAddressScreenBack = "ShowSearchSelectScreen";
		this.ShowSearchByAddressScreen();
    };
    
    this.HandleSearchMoreCriteriaButton = function()
	{
		this.CloseSearchSelectScreen();
		this.ShowSearchServicesScreen();
		
	};
    
    this.CloseSearchSelectScreen = function ()
    {    	
    	$("#search_module").hide();
    	$("#search_select").hide();
    	$('#search_select_search_by_address_button').unbind();
    	$('#search_select_search_criteria_button').unbind();
    	    	
    	this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
    	this.app.SetBackAction(null);    	    	   	
    };
    
    this.CloseSearchSelectScreenWithBack = function ()
    {
    	this.CloseSearchSelectScreen();
    	this.app.GetInfosModule().ShowListScreen();
    };
    //SC4 END
	
    //SC5 START
    this.ShowSearchByAddressScreen = function ()
    {
    	$("#search_module").show();
    	$("#search_byaddress_content").show();
    	
    	$('#search_byaddres_search_text').val('${sc5_search_text_holder}');
    	$('#search_byaddres_search_text').bind('focus', proxy(this.HandleTextSearchFocus, this));
    	$('#search_byaddres_search_text').bind('blur', proxy(this.HandleTextSearchBlur, this));
    	
    	$('.search_byaddress_choose_button').bind('click', proxy(this.HandleSearchByAddressButtonsClick, this)) ;
    	
    	//history
    	$("#search_byaddress_history_button").bind('mousedown', function ()
    	{    		
    		$("#search_byaddress_history_button").attr('class', 'search_byaddress_history_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#search_byaddress_history_button").attr('class', 'search_byaddress_history_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#search_byaddress_history_button").attr('class', 'search_byaddress_history_button_off');
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
    	this.app.SetBackAction(proxy(this.CloseSearchByAddressScreenWithBack, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseSearchByAddressScreen, this));
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
	
    this.HandleSearchOkButton = function(ev)
    {
    	if($('#search_byaddres_search_text').val() == "" || $('#search_byaddres_search_text').val() == "${sc5_search_text_holder}")
    	{
    		new Application.NotificationWidget("#search_byaddress_content", function(){}, "${notification_invalid_input}");
    		return;
    	}
    	
    	this.GeocodeAddressForHistory($('#search_byaddres_search_text').val());    
    };
    
    this.HandleSearchByAddressButtonsClick = function (ev)
    {
    	
    	var action_type = $(ev.currentTarget).attr('action');
    	
		$("#search_byaddress_content").hide();
		
		if(action_type == 'search_byaddress_history')
		{			
			this.CloseSearchByAddressScreen();
			this.ShowSearchByAddressHistoryScreen();
		}
    };
    
    this.GeocodeAddressForHistory = function (data)
    {
    	//check if there is network connection
		if(this.app.networkStatus == false)
    	{
			new Application.NotificationWidget("#search_module", function(){}, "${warning_no_network}");
			
			return false;
    	}
    	var client = Framework.GetWsClient(Framework.CONSTANTS.WS_CONTENT_GET_GEOCODING_BY_ADDRESS);
    	client.data.address = data;
    	
    	client.SetResponseOkCallBack(proxy(this.HandleGeocodeOkResponse, this));
    	
    	client.SetResponseErrorCallBack(proxy(this.HandleGeocodeErrorResponse, this));
    	
    	this.app.ShowLoading();
    	
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
				this.app.HideLoading();				
				return false;
			}
        	this.listHistory.push(resp);
    	}
    	
    	this.listRefresh = true;
    	
    	this.StorageSearchDataSave();
    	
    	$('#search_byaddres_search_text').val('${sc5_search_text_holder}');
    	
    	this.app.HideLoading();
    	
    	this.CloseSearchByAddressScreen();
    	this.punctualListSearchScreenBack = "ShowSearchByAddressScreen";
		this.ShowSearchPunctualScreen();
		
		$("#search_byaddres_search_text").removeAttr("disabled");
    };
    
    this.HandleGeocodeErrorResponse = function(resp)
    {
    	this.notificationWidget = new Application.NotificationWidget("#search_module", proxy(this.HandleOkNotificationClick, this), "${warning_geocoding_error}");
    	this.app.HideLoading();
    };
    
    this.HandleOkNotificationClick = function ()
	{
		$("#search_byaddres_search_text").removeAttr("disabled");		
	};
    
    this.CloseSearchByAddressScreen = function ()
    {
    	$("#search_module").hide();
    	$("#search_byaddress_content").hide();   	    	
    	$('#search_byaddress_history_button').unbind();   	
    	$('.search_byaddress_choose_button').unbind();
    	$('#search_byaddres_search_text').unbind();
    	$('#search_byaddress_ok_button').unbind();
    	
    	this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
    	this.app.SetBackAction(null);
    	
    	if (this.warningWidget != null) this.warningWidget.TerminateWarning(); 
    	if (this.notificationWidget != null) this.notificationWidget.HandleOkButton();   	
    };
    
    this.CloseSearchByAddressScreenWithBack = function ()
    {
    	this.search_mode_selected_data = null;
		if (this.showSearchByAddressScreenBack == "ShowSearchSelectScreen")
		{			
			this.CloseSearchByAddressScreen();
			this.ShowSearchSelectScreen();
		}
		else if (this.showSearchByAddressScreenBack == "ShowSearchServicesGpsAddrScreen")
		{
			this.CloseSearchByAddressScreen();
			this.ShowSearchServicesGpsAddrScreen();
		}
    };
  
    //SC5 END
    
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
		this.ShowSearchPunctualScreen();
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
    this.ShowSearchByAddressHistoryScreen = function ()
    {	
    	$("#search_module").show();    	
    	$('#search_byaddress_history_content').show();
    	
    	this.scrollText = new Application.TextScroller();
    	
    	this.focusedHistory = null;
    	
    	this.scroller = new Application.ScrollerWidget('#search_byaddress_history_scroll', '#search_byaddress_history_all_history', 3, this.listHistory, this.ListHistorySearchConstructorCallback);    	
    	
    	$('#search_byaddress_history_delete_all_button').bind('click', proxy(this.HandleSearchByAddressHistoryDeleteAllClick, this)) ;
    	$('#search_byaddress_history_all_history').delegate(".search_byaddress_choose_address_single", "click", proxy(this.HandleSearchByAddressHistoryAddressClick, this));
    	
    	//delete all
    	$("#search_byaddress_history_delete_all_button").bind('mousedown', function ()
    	{    		
    		$("#search_byaddress_history_delete_all_button").attr('class', 'search_delete_all_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#search_byaddress_history_delete_all_button").attr('class', 'search_delete_all_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#search_byaddress_history_delete_all_button").attr('class', 'search_delete_all_button_off');
    	});
    	
    	this.app.SetIconBeforeAction(proxy(this.CloseSearchByAddressHistoryScreen, this));
    	this.app.SetBackAction(proxy(this.CloseSearchByAddressHistoryScreenWithBack, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseSearchByAddressHistoryScreen, this));
    };
    
    /* Function called by scroller widget to build the list item for history search*/
	this.ListHistorySearchConstructorCallback = function (itemData)
	{
		var html = '';
			html += '<div class="search_byaddress_choose_address_single" id="search_byaddress_choose_address_address'+new String(itemData.latitude).replace(".","")+new String(itemData.longitude).replace(".","")+'">';
				html += '<div class="search_byaddress_history_single_title" id="name_scroll_'+new String(itemData.latitude).replace(".","")+new String(itemData.longitude).replace(".","")+'">';
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
	
    this.HandleSearchByAddressHistoryDeleteAllClick = function ()
    {
    	this.listHistory = new Array();
    	
    	this.StorageSearchDataSave();
    	
		this.scroller.SetListData(this.listHistory);
		this.scroller.Reset();
    };
    
    this.HandleSearchByAddressHistoryAddressClick = function (ev)
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
		    	
		    	this.CloseSearchByAddressHistoryScreen();    	
		    	this.punctualListSearchScreenBack = "ShowSearchByAddressScreen";
		    	this.ShowSearchPunctualScreen();	
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
		    	
		    	this.CloseSearchByAddressHistoryScreen();    	
		    	this.punctualListSearchScreenBack = "ShowSearchByAddressScreen";
		    	this.ShowSearchPunctualScreen();	
			}
			else
			{
				$('#focused_address_'+new String(this.focusedHistory.latitude).replace(".","")+new String(this.focusedHistory.longitude).replace(".","")).show();
			}
		}
		
		
    };
    
    this.CloseSearchByAddressHistoryScreen = function ()
    {
    	if(this.scroller != null)
		{
			this.scroller.Terminate();
			this.scroller = null;
		}
    	$("#search_module").hide();
    	$('#search_byaddress_history_content').hide();
    	$('#search_byaddress_history_delete_all_button').unbind('click');
    	$('#search_byaddress_history_all_history').undelegate(".search_byaddress_choose_address_single", "click");
    	
    	this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
    	this.app.SetBackAction(null);
    };
    
    this.CloseSearchByAddressHistoryScreenWithBack = function ()
    {
    	this.CloseSearchByAddressHistoryScreen();
    	this.ShowSearchByAddressScreen();
    };    
    //SC7 END
    
    //SC8 START
    this.ShowSearchServicesScreen = function()
    {	
    	$("#search_module").show();
    	$('#search_choose_service_content').show();
    	
    	this.tempList = new Array();
    	
    	for(var idx = 0; idx < this.listServices.length; idx++)
    	{
    		this.tempList[idx] = {name: this.listServices[idx].name , selected : this.listServices[idx].selected};
    	}
    	
    	this.scroller = new Application.ScrollerWidget('#search_choose_service_scroll', '#search_choose_service_all_services', 3, this.tempList, proxy(this.ListServicesSearchConstructorCallback,this));
    	    	
    	//check if all services are selected
    	var size = this.tempList.length;
		var totalChecked = 0;
		for(i = 0; i < size; i++)
		{			
			if (this.tempList[i].selected) totalChecked++;
		}
		
		if (size == totalChecked)
		{
			$("#search_choose_service_select_all_title_services").html("${sc8_deselect_all}");
		}
		else
		{
			$("#search_choose_service_select_all_title_services").html("${sc8_select_all}");
		}
			
    	//ok button    	
    	$("#search_choose_service_ok_button").bind('mousedown', function ()
    	{    		
    		$("#search_choose_service_ok_button").attr('class', 'search_choose_service_ok_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#search_choose_service_ok_button").attr('class', 'search_choose_service_ok_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#search_choose_service_ok_button").attr('class', 'search_choose_service_ok_button_off');
    	}).bind('click', proxy(this.HandlepushOkSearchService, this));
    	
    	//cancel button
    	$("#search_choose_service_cancel_button").bind('mousedown', function ()
    	{    		
    		$("#search_choose_service_cancel_button").attr('class', 'search_choose_service_cancel_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#search_choose_service_cancel_button").attr('class', 'search_choose_service_cancel_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#search_choose_service_cancel_button").attr('class', 'search_choose_service_cancel_button_off');
    	}).bind('click', proxy(this.HandlepushCancelSearchService, this));
    	
    	// select all
    	$("#search_choose_service_select_all").bind('mousedown', function ()
    	{    		
    		$("#search_choose_service_select_all").attr('class', 'search_choose_service_select_all_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#search_choose_service_select_all").attr('class', 'search_choose_service_select_all_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#search_choose_service_select_all").attr('class', 'search_choose_service_select_all_off');
    	}).bind('click', proxy(this.HandleSearchAllServices, this));
    	    	
    	$('#search_choose_service_all_services').delegate(".search_choose_service_single", "click", proxy(this.HandleSearchServiceClick, this));
    	
    	this.app.SetIconBeforeAction(proxy(this.CloseSearchServicesScreen, this));
    	this.app.SetBackAction(proxy(this.CloseSearchServicesScreenWithBack, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseSearchServicesScreen, this));    	
    };
    
    /* Function called by scroller widget to build the list item for service choose search*/
	this.ListServicesSearchConstructorCallback = function (itemData)
	{
		var icon = "";
		var name = "";
		
		switch(itemData.name)
		{
			case "srv_wc" : icon = "./images/srv_wc_56.png";
							name = '${srv_wc}';
				break;
			case "srv_video_surveillance" : icon = "./images/srv_video_surveillance_56.png";
											name = '${srv_video_surveillance}';
				break;
			case "srv_no_Acc_GPL" : icon = "./images/srv_no_Acc_GPL_56.png";
									name = '${srv_no_Acc_GPL}';
				break;
			case "srv_motorcycle_parking" : icon = "./images/srv_motorcycle_parking_56.png";
											name = '${srv_motorcycle_parking}';
				break;
			case "srv_elevator" : icon = "./images/srv_elevator_56.png";
								  name = '${srv_elevator}';
				break;
			case "srv_electric_recharge" : icon = "./images/srv_electric_recharge_56.png";
										   name = '${srv_electric_recharge}';
				break;
			case "srv_disabled_person_assistance" : icon = "./images/srv_disabled_person_assistance_56.png";
													name = '${srv_disabled_person_assistance}';
				break;
			case "srv_car_wash" : icon = "./images/srv_car_wash_56.png";
								  name = '${srv_car_wash}';
				break;
			default : icon = "";
					  name = "";
				break;
		}
		
		var html = '<div class="search_choose_service_single" id="search_choose_service_single'+itemData.name+'">';
		html += '<div class="search_choose_service_single_logo"><img src="'+icon+'" /></div>';
		html += '<div class="search_choose_service_single_title policy_list_name">';
		
		

		
		html += name + '</div>';

		html += '<div';
		if(!itemData.selected)
		{
			html += '  class="search_choose_service_selected off"';
		}
		else
		{
			html += ' class="search_choose_service_selected on"';
		}
		html += '></div>';
		html += '</div>';		

		return html;
	};
	
    this.HandleSearchServiceClick = function(ev)
    {
		item_idx = $('#search_choose_service_all_services').children().index("#"+$(ev.currentTarget).attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
		var size = this.tempList.length;
		var totalChecked = 0;
		
		if(this.tempList[item_idx].selected)
		{
			//check if all services are selected
			
			this.tempList[item_idx].selected = false;
			
			$("#search_choose_service_select_all_title_services").html("${sc8_select_all}");									
			$('.search_choose_service_selected', $(ev.currentTarget)).removeClass("on");
			$('.search_choose_service_selected', $(ev.currentTarget)).addClass("off");			
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
				$("#search_choose_service_select_all_title_services").html("${sc8_deselect_all}");
			}
			$('.search_choose_service_selected', $(ev.currentTarget)).removeClass("off");
			$('.search_choose_service_selected', $(ev.currentTarget)).addClass("on");			
		}
    };    
    
    //button select all services
    this.HandleSearchAllServices = function(ev)
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
			$("#search_choose_service_select_all_title_services").html("${sc8_select_all}");
			
			$('#search_choose_service_all_services .search_choose_service_selected').removeClass("on");
			$('#search_choose_service_all_services .search_choose_service_selected').removeClass("off");
			$('#search_choose_service_all_services .search_choose_service_selected').addClass("off");
		}
		else
		{
			for(i = 0; i < size; i++)
			{
				this.tempList[i].selected = true;
			}
			$("#search_choose_service_select_all_title_services").html("${sc8_deselect_all}");
			
			$('#search_choose_service_all_services .search_choose_service_selected').removeClass("on");
			$('#search_choose_service_all_services .search_choose_service_selected').removeClass("off");
			$('#search_choose_service_all_services .search_choose_service_selected').addClass("on");
		}
    };
    
    //ok button services
    this.HandlepushOkSearchService = function(ev)
    {
    	this.listServices = this.tempList;
    	
    	this.listRefresh = true;
    	
    	this.StorageSearchDataSave();
    	
    	this.CloseSearchServicesScreen();
    	this.ShowSearchServicesGpsAddrScreen();    	
    };
    
    //cancel button services
    this.HandlepushCancelSearchService = function(ev)
    {	
    	this.CloseSearchServicesScreen();
    	this.ShowSearchSelectScreen();
    };
    this.CloseSearchServicesScreen = function()
    {
    	
    	this.tempList = null;
    	
    	if(this.scroller != null)
		{
			this.scroller.Terminate();
			this.scroller = null;
		}
    	$("#search_module").hide();
    	$("#search_choose_service_content").hide();
    	
    	$('#search_choose_service_ok_button').unbind();
    	$('#search_choose_service_cancel_button').unbind();
    	$('#search_choose_service_select_all').unbind();    	
    	$('#search_choose_service_all_services').undelegate(".search_choose_service_single", "click");    	
    	
    	this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
    	this.app.SetBackAction(null);
    };
    this.CloseSearchServicesScreenWithBack = function ()
    {
    	this.CloseSearchServicesScreen();
    	this.ShowSearchSelectScreen();
    };
    //SC8 END
    
    //SC9 START
	this.ShowSearchPunctualScreen = function ()
	{	
		this.scrollText = new Application.TextScroller();
		
		$("#search_module").show();
		$("#search_punctual").show();
				
		$("#search_punctual_btn_distance").bind('click', proxy(this.HandleSearchDistanceSortClick, this));		
		$("#search_punctual_btn_status").bind('click', proxy(this.HandleSearchStatusSortClick, this));
				
		$('#search_punctual_all_park_makes').delegate(".search_punctual_choose_park_single", "click", proxy(this.HandleSelectParkingClick, this));
				
		//close button
		$("#search_punctual_btn_close").bind('click', proxy(this.HandleCloseButtonClick, this));
    	$("#search_punctual_btn_close").bind('mousedown', function ()
    	{    
    		$("#search_punctual_btn_close").attr('class', 'search_punctual_btn_close_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#search_punctual_btn_close").attr('class', 'search_punctual_btn_close_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#search_punctual_btn_close").attr('class', 'search_punctual_btn_close_off');
    	});

    	if ((this.app.GetInfosModule().canUseGps == null || this.app.GetInfosModule().canUseGps == "no") && this.search_mode == "gps") 
		{			
    		gpsWarningWidget = new Application.ConfirmationWidget("#search_module", proxy(this.HandleOkConfirmationClick, this), proxy(this.HandleCancelConfirmationClick, this), "${gps_confirmation_message}", "${gps_authorization_accept}", "${gps_authorization_not_accept}");
    		
		}
    	else if(this.app.GetInfosModule().canUseGps == "no" && this.search_mode == "gps")
		{
    		gpsWarningWidget = new Application.ConfirmationWidget("#search_module", proxy(this.HandleOkConfirmationClick, this), proxy(this.HandleCancelConfirmationClick, this), "${gps_confirmation_message}", "${gps_authorization_accept}", "${gps_authorization_not_accept}");
		}
    	else if(this.app.networkStatus == false)
		{
    		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_network}</div></div>';
			$("#search_punctual_all_park_makes").html(itm);
			
			this.app.SetIconBeforeAction(proxy(this.CloseShowSearchPunctualScreen, this));
	    	this.app.SetBackAction(proxy(this.CloseShowSearchPunctualScreenWithBack, this));
	    	this.app.SetParametersBeforeAction(proxy(this.CloseShowSearchPunctualScreen, this));
		}
		else 
		{
			this.SearchPunctualScreenWsCall();		
		}    	
		
	};
	
	this.SearchPunctualScreenWsCall = function ()
	{
		if(this.listRefresh)
		{
			var range = this.app.GetParametersModule().selectedRange;
			
			var client = Framework.GetWsClient(Framework.CONSTANTS.WS_COMMUNITY_SEARCH_PARKING_NEAR_BY);
			
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
			client.data.limit			= 12;
			
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
				client.data.service_labels = services;
			}			
			
			client.SetResponseOkCallBack(proxy(this.HandleWSResponseOk, this));			
			client.SetResponseErrorCallBack(proxy(this.HandleWSResponseError, this));
			
			if(this.search_mode == Application.CONSTANTS.SEARCH_ADDRESS_MODE_GPS && client.data.latitude == 0 && client.data.longitude == 0 && this.app.networkStatus == false)
			{
				var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_network_gps}</div></div>';
				$("#search_punctual_all_park_makes").html(itm);
			}
			else if(this.search_mode == Application.CONSTANTS.SEARCH_ADDRESS_MODE_GPS && client.data.latitude == 0 && client.data.longitude == 0)
			{
				var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_gps}</div></div>';
				$("#search_punctual_all_park_makes").html(itm);
			}
			else if(this.app.networkStatus == false)
			{
				var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_network}</div></div>';
				$("#search_punctual_all_park_makes").html(itm);
			}
			else
			{
				this.app.ShowLoading();
				
				client.Send();
			}
		}		
		else
		{
			this.scroller = new Application.ScrollerWidget('#search_punctual_vertical_scroll', '#search_punctual_all_park_makes', 3, this.listData, proxy(this.ListPunctualSearchConstructorCallback, this));
			//scroll to current page
			while(this.scroller.GetCurrentPage() != this.currentPage && this.scroller.GetCurrentPage() < this.scroller.maxPages)
				this.scroller.HandleMoveDown();
				
			this.ShowSearchDetailsInFooter();
		}
		
		if(this.sortMode == 'distance')
			$("#search_punctual_btn_distance").attr('class', 'search_punctual_btn_distance_on');
		else if(this.sortMode == 'status')
			$("#search_punctual_btn_status").attr('class', 'search_punctual_btn_status_on');
			
		this.app.SetIconBeforeAction(proxy(this.CloseShowSearchPunctualScreen, this));
    	this.app.SetBackAction(proxy(this.CloseShowSearchPunctualScreenWithBack, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseShowSearchPunctualScreen, this));	
	};
	
	this.HandleOkConfirmationClick = function () 
	{
		this.app.GetInfosModule().canUseGps = true;		
		this.app.GetParametersModule().StorageParametersDataSave();
		
		$('#parameters_choose_parameters_button_gpsuse .parameters_choose_parameters_button_title').html("${sc10_refuse_gps}");
		
		this.SearchPunctualScreenWsCall();				
	};
	
	this.HandleCancelConfirmationClick = function () 
	{
		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${gps_confirmation_cancel_button_message}</div></div>';
		$("#search_punctual_all_park_makes").html(itm);
		
		$('#parameters_choose_parameters_button_gpsuse .parameters_choose_parameters_button_title').html("${sc10_autorize_gps}");
				
		this.app.SetIconBeforeAction(proxy(this.CloseShowSearchPunctualScreen, this));
    	this.app.SetBackAction(proxy(this.CloseShowSearchPunctualScreenWithBack, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseShowSearchPunctualScreen, this));
	};
	
	this.HandleWSResponseOk = function(data)
	{
		this.listRefresh = false;
		
		this.listNumRows = data.shift();
		this.listNumRows = this.listNumRows.numrows;
		
		this.listData = data;
		
		if(this.listData.length == 0)
		{
			var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_results_found}</div></div>';
			$("#search_punctual_all_park_makes").html(itm);
		}
		else
		{
			this.scroller = new Application.ScrollerWidget('#search_punctual_vertical_scroll', '#search_punctual_all_park_makes', 3, this.listData, proxy(this.ListPunctualSearchConstructorCallback, this));
		}
		
		this.app.HideLoading();
		this.ShowSearchDetailsInFooter();
	};
	
	this.HandleWSResponseError = function(data)
	{
		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_results_found}</div></div>';
			$("#search_punctual_all_park_makes").html(itm);
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
	
	/*
	 * Function called by scroller widget to build the list item for punctual search
	 */
	this.ListPunctualSearchConstructorCallback = function (itemData)
	{
		var icon = "parking";
		var type = "gray";
		
		icon = this.app.GetInfosModule().getParkingLogo(itemData);
		
		for(var x = 0; x < itemData.extendeds.length; x++)
		{
			if(itemData.extendeds[x].text_id == "parking_status")
			{
				switch(itemData.extendeds[x].extended_data_value)
				{
					case "0":
						type = "gray";
						break;
					case "1":
						type = "orange";
						break;
					case "3":
						type = "gray";
						break;
					case "5":
						type = "green";
						break;
					case "7":
						type = "red";
						break;
					default:
						type = "gray";
						break;
				}
			}
		
		}
		
		var label = "";
		if(itemData.label) label = itemData.label;
		
		var addr = "";
		if(itemData.street_name != null && itemData.street_name != "")
		{
			addr += itemData.street_name;
		}
		if(itemData.city_area != null && itemData.city_area != "")
		{
			if(addr != "")
			{
				addr += ", ";
			}
			addr += itemData.city_area;
		}
		
		
		var html = '';
			html += '<div id="search_punctual_choose_park_park'+itemData.id+'" class="search_punctual_choose_park_single">';			
				html += '<div class="search_punctual_choose_park_single_logo">';
					html +=	'<table cellspacing="0" cellpadding="0" border="0">';
						html += '<tr>';
							html +=	'<td height="100%" width="100%" valign="middle"><img src="'+icon+'" /></td>';
						html += '</tr>';
					html += '</table>';							
				html += '</div>';			
				html += '<div class="search_punctual_choose_park_single_title gray policy_content_list_name" id="name_scroll_'+itemData.uuid+'">'+label+'</div>';
					html += '<div class="search_punctual_choose_park_single_title_address gray" id="address_scroll_'+itemData.uuid+'">'+addr+'</div>';
				html += '<div class="search_punctual_choose_park_single_title_distance gray policy_content_list_distance">'+convertDistance(itemData.distance)+'</div>';
				html += '<div class="search_punctual_choose_park_single_title_bullet search_punctual_bullet_'+type+'"></div>';
				html += '<div id="focused_parking_'+itemData.uuid+'" class="focused_parking"></div>';			
			html += '</div>';
		
		return html;
	};
	
	this.HandleSearchDistanceSortClick = function ()
	{	
		if(this.sortMode == 'distance')
			return true;
		else
		{
			$("#search_punctual_btn_distance").attr('class', 'search_punctual_btn_distance_on');
			$("#search_punctual_btn_status").attr('class', 'search_punctual_btn_status_off');
			this.TriggerSort('distance');
		}
	};
	
	this.HandleSearchStatusSortClick = function ()
	{	
		if(this.sortMode == 'status')
			return true;
		else
		{
			$("#search_punctual_btn_distance").attr('class', 'search_punctual_btn_distance_off');
			$("#search_punctual_btn_status").attr('class', 'search_punctual_btn_status_on');
			this.TriggerSort('status');
		}
	};
	
	//sort the list
    this.TriggerSort = function(mode)
	{
    	this.sortMode = mode;
    	
    	if(this.sortMode == 'distance')
    	{
    		this.listData.sort(sortByDistance);
    	}
    	else
    	{
    		this.listData.sort(sortByStatus);
    	}
    	
    	if(this.scroller != null)
    	{
    		this.scroller.Reset();
    	}
		
	};
	
	this.HandleSelectParkingClick = function (ev)
	{		
		item_idx = $('#search_punctual_all_park_makes').children().index("#"+$(ev.currentTarget).attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
		
		wasClicked = false;
		scrollResultName = false;
		scrollResultAddress = false;
						
		if (this.app.GetInfosModule().focusedParking != null)
		{
			$('#focused_parking_'+this.app.GetInfosModule().focusedParking.uuid).hide();
			this.scrollText.StopScroll("#name_scroll_"+this.app.GetInfosModule().focusedParking.uuid);
			this.scrollText.StopScroll("#address_scroll_"+this.app.GetInfosModule().focusedParking.uuid);
			
			
			if (this.app.GetInfosModule().focusedParking.uuid == this.listData[item_idx].uuid)
			{
				this.app.GetInfosModule().focusedParking = null;
				wasClicked = true;
				
				//close current screen				
				this.app.GetInfosModule().currentParkingFromList = "search";
				this.CloseShowSearchPunctualScreen();		
				this.app.GetInfosModule().ShowParkingInfoModule();				
			}
			else
			{
				this.app.GetInfosModule().focusedParking = null; 
			}			
		}		
		if (this.app.GetInfosModule().focusedParking == null && wasClicked === false)
		{			
			this.app.GetInfosModule().focusedParking = this.listData[item_idx];
			this.app.GetInfosModule().currentParking = this.listData[item_idx];				
		
			scrollResultName = this.scrollText.StartScroll("#name_scroll_"+this.app.GetInfosModule().focusedParking.uuid);				
			scrollResultAddress = this.scrollText.StartScroll("#address_scroll_"+this.app.GetInfosModule().focusedParking.uuid);
			
			
			if(!scrollResultName && !scrollResultAddress)
			{
				//close current screen				
				this.app.GetInfosModule().currentParkingFromList = "search";
				this.CloseShowSearchPunctualScreen();		
				this.app.GetInfosModule().ShowParkingInfoModule();	
			}
			else
			{
				$('#focused_parking_'+this.app.GetInfosModule().focusedParking.uuid).show();
			}
		}
		
	};
	
	this.HandleCloseButtonClick = function ()
	{		
		this.CloseShowSearchPunctualScreen();
		this.app.GetInfosModule().ShowListScreen();
	};
	
	this.CloseShowSearchPunctualScreen = function ()
	{
		if(this.scroller != null)
		{
			this.currentPage = this.scroller.GetCurrentPage();			
			this.scroller.Terminate();
			this.scroller = null;
		}		
		$("#search_module").hide();
		$("#search_punctual").hide();
		$('#search_punctual_btn_distance').unbind();
		$('#search_punctual_btn_status').unbind();		    	
    	$('#search_punctual_btn_close').unbind();
		
		this.CloseShowSearchDetailsInFooter();
		
		$('#search_punctual_all_park_makes').undelegate(".search_punctual_choose_park_single", "click");
		$('#search_punctual_all_park_makes').html('');
		
		this.app.HideLoading();
		this.app.GetInfosModule().focusedParking = null;
		this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
    	this.app.SetBackAction(null);
	};
	
	this.CloseShowSearchPunctualScreenWithBack = function ()
	{
		if (this.punctualListSearchScreenBack == "ShowSearchServicesGpsAddrScreen")
		{
			this.CloseShowSearchPunctualScreen();
			this.ShowSearchServicesGpsAddrScreen();
		}
		else if (this.punctualListSearchScreenBack == "ShowSearchByAddressScreen")
		{
			this.CloseShowSearchPunctualScreen();
			this.ShowSearchByAddressScreen();
		}
	};
	
	//SC9 END
	
	this.Terminate = function()
	{
		this.app = null;
		this.scroller = null;
	};
	
    // Storage handle and save START    
    this.StorageSearchDataSave = function ()
	{
		data =  {search_service_data 		: this.listServices,
				 search_address_mode		: this.search_mode,
				 search_address_history 	: this.listHistory,
				 search_address_mode_data	: this.search_mode_selected_data				 
		};
		
		PORTAL.storage.put(Application.CONSTANTS.STORAGE_PREFIX+Application.CONSTANTS.STORAGE_SEARCH, data ,false, function(){}, function(){});									    	
	};
	this.HandleStorageSearch = function(data)
	{
		if (data != null)
		{
			if(data.search_service_data != null && data.search_service_data.length != null && data.search_service_data.length > 0)
			{
				this.listServices = data.search_service_data;
			}
			if(data.search_address_mode != null && data.search_address_mode.length != null && data.search_address_mode.length > 0)
			{
				this.search_mode = data.search_address_mode;
			}
			if(data.search_address_history != null && data.search_address_history.length != null && data.search_address_history.length > 0)
			{
				this.listHistory = data.search_address_history;
			}
			if(data.search_address_mode_data != null)
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