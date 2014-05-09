Application.Infos = function(app)
{
	this.app = app;
	this.sortMode = 'distance';
	this.currentTab = '';

	this.listRefresh = true;
	this.listData = new Array();
	this.listNumRows = 0;
	this.currentPage = 1;
	this.currentFavoritePage = 1;
	
	this.currentParking = null;
	this.currentParkingDataList = new Array();
	this.currentParkingLogo = "parking";
	this.currentCurrency = "";

	// possible values: list, search, favorites
	this.currentParkingFromList = "";
	
	this.listFavoriteList = [];
	this.listFavoriteToDelete = [];
	
	this.scrollText = null;
	this.focusedParking = null;
	
	this.canUseGps = null;	

	this.LogoList = [
	         		"adp",
	         		"adp_lyon",
	         		"bouygues_construction",
	         		"cpa",
	         		"effia",
	         		"epolia",
	         		"favorite",
	         		"interparking",
	         		"lpa",
	         		"montreuil_stationnement_service",
	         		"nge",
	         		"parcus",
	         		"parking",
	         		"parkingalizes",
	         		"q_park",
	         		"rouen_park",
	         		"saemes",
	         		"sags",
	         		"sara",
	         		"semepa",
	         		"semiacs",
	         		"semna",
	         		"sopac",
	         		"spieautocite",
	         		"troyes_parc_auto",
	         		"urbis",
	         		"vincipark",
	         		"warning"
	         	];
	
	/* flag to mark if the storage loading in the class initialization is completed */
	this.intialStorageLoadCompleted = false;
	         	
	this.getParkingLogo = function(dataArray)
	{
		icon = "parking";
		for(var x = 0; x < dataArray.extendeds.length; x++)
		{
			
			if(dataArray.extendeds[x].text_id == "parking_brand")
			{
				if(dataArray.extendeds[x].extended_data_value != null)
				{
					icon = new String(dataArray.extendeds[x].extended_data_value).toLowerCase();
				}
			}
			
		}
		cleanedIconName = icon.replace("-","_");
	
		logo = "parking";
		
		for(var j = 0; j < this.LogoList.length; j++)
		{
			if(cleanedIconName == this.LogoList[j])
			{
				logo = this.LogoList[j];
			}
		}
		
		switch(logo)
		{	
			case "adp" : logo = "./images/logo_adp.png";
					break;
			case "adp_lyon" : logo = "./images/logo_adp_lyon.png";
					break;
			case "bouygues_construction" : logo = "./images/logo_bouygues_construction.png";
					break;
			case "cpa" : logo = "./images/logo_cpa.png";
					break;
			case "effia" : logo = "./images/logo_effia.png";
					break;
			case "epolia" : logo = "./images/logo_epolia.png";
					break;
			case "favorite" : logo = "./images/logo_favorite.png";
					break;
			case "interparking" : logo = "./images/logo_interparking.png";
					break;
			case "lpa" : logo = "./images/logo_lpa.png";
					break;
			case "montreuil_stationnement_service" : logo = "./images/logo_montreuil_stationnement_service.png";
					break;
			case "nge" : logo = "./images/logo_nge.png";
					break;
			case "parcus" : logo = "./images/logo_parcus.png";
					break;
			case "parking" : logo = "./images/logo_parking.png";
					break;
			case "parkingalizes" : logo = "./images/logo_parkingalizes.png";
					break;
			case "q_park" : logo = "./images/logo_q_park.png";
					break;
			case "rouen_park" : logo = "./images/logo_rouen_park.png";
					break;
			case "saemes" : logo = "./images/logo_saemes.png";
					break;
			case "sags" : logo = "./images/logo_sags.png";
					break;
			case "sara" : logo = "./images/logo_sara.png";
					break;
			case "semepa" : logo = "./images/logo_semepa.png";
					break;
			case "semiacs" : logo = "./images/logo_semiacs.png";
					break;
			case "semna" : logo = "./images/logo_semna.png";
					break;
			case "sopac" : logo = "./images/logo_sopac.png";
					break;
			case "spieautocite" : logo = "./images/logo_spieautocite.png";
					break;
			case "troyes_parc_auto" : logo = "./images/logo_troyes_parc_auto.png";
					break;
			case "urbis" : logo = "./images/logo_urbis.png";
					break;
			case "vincipark" : logo = "./images/logo_vincipark.png";
					break;
			default : logo="./images/logo_parking.png";
				break;
		}
		
		return logo;
	};
	
	this.getParkingTypeColor = function(dataArray)
	{
		for(var x = 0; x < dataArray.extendeds.length; x++)
		{
			if(dataArray.extendeds[x].text_id == "parking_status")
			{
				if(dataArray.extendeds[x].extended_data_value || dataArray.extendeds[x].extended_data_value !=null)
				{
					switch(dataArray.extendeds[x].extended_data_value)
					{
						case "0":
							return "gray";
							break;
						case "1":
							return "orange";
							break;
						case "3":
							return "gray";
							break;
						case "5":
							return "green";
							break;
						case "7":
							return "red";
							break;
						default:
							return "gray";
							break;
					}
				}
				else
				{
					return "gray";
				}
			}
		}
	};
	
	//SC1 START
	this.ShowListScreen = function ()
	{	
		PORTAL.showConfigButton(true);
		
		this.scrollText = new Application.TextScroller();
		
		$("#parking_info_module").show();
		$("#list_content").show();
		
		$("#list_btn_distance").bind('click', proxy(this.HandleListDistanceSortClick, this));		
		$("#list_btn_status").bind('click', proxy(this.HandleListStatusSortClick, this));
		
		$('#list_all_park_makes').delegate(".list_choose_park_single", "click", proxy(this.HandleSelectParkingClick, this));
		
		// search button
		$("#list_btn_search").bind('mousedown', function ()
    	{    
    		$("#list_btn_search").attr('class', 'list_btn_search_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#list_btn_search").attr('class', 'list_btn_search_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#list_btn_search").attr('class', 'list_btn_search_off');
    	}).bind('click', proxy(this.HandleSearchButtonClick, this));
		
		//close button
    	$("#list_btn_favorites").bind('mousedown', function ()
    	{    
    		$("#list_btn_favorites").attr('class', 'list_btn_favorites_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#list_btn_favorites").attr('class', 'list_btn_favorites_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#list_btn_favorites").attr('class', 'list_btn_favorites_off');
    	}).bind('click', proxy(this.HandleFavoritesButtonClick, this));
    	
    	if (this.canUseGps == null || this.canUseGps == "no") 
		{			
			gpsWarningWidget = new Application.ConfirmationWidget("#parking_info_module", proxy(this.HandleOkConfirmationClick, this), proxy(this.HandleCancelConfirmationClick, this), "${gps_confirmation_message}", "${gps_authorization_accept}", "${gps_authorization_not_accept}");
		}
		else 
		{
			this.ListScreenWsCall();		
		}    	
	};
	
	this.ListScreenWsCall = function ()
	{
		if(this.listRefresh == true)
		{
			var range = this.app.GetParametersModule().selectedRange;
			
			var client = Framework.GetWsClient(Framework.CONSTANTS.WS_COMMUNITY_SEARCH_PARKING_NEAR_BY);
			client.data.latitude 		= this.app.gpsPosition.latitude;
			client.data.longitude 		= this.app.gpsPosition.longitude;
			client.data.language_id		= "${language_code}";
			client.data.radius			= range;
			client.data.limit			= 12;
			
			
			client.SetResponseOkCallBack(proxy(this.HandleWSResponseOk, this));
			
			client.SetResponseErrorCallBack(proxy(this.HandleWSResponseError, this));
			
			if(client.data.latitude == 0 && client.data.longitude == 0 && this.app.networkStatus == false)
			{
				var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_network_gps}</div></div>';
				$("#list_all_park_makes").html(itm);
			}
			else if(client.data.latitude == 0 && client.data.longitude == 0)
			{
				var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_gps}</div></div>';
				$("#list_all_park_makes").html(itm);
			}
			else if(this.app.networkStatus == false)
			{
				var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_network}</div></div>';
				$("#list_all_park_makes").html(itm);
			}
			else
			{
				this.app.ShowLoading();
				
				client.Send();
			}
			
			// Reset the sort mode to default
			this.sortMode = 'distance';
			
		}
		else
		{
			this.scroller = new Application.ScrollerWidget('#list_vertical_scroll', '#list_all_park_makes', 3, this.listData, proxy(this.ListConstructorCallback, this));
			//scroll to current page
			while(this.scroller.GetCurrentPage() != this.currentPage && this.scroller.GetCurrentPage() < this.scroller.maxPages)
				this.scroller.HandleMoveDown();
		}
    	
    	if(this.sortMode == 'distance')
    	{
    		$("#list_btn_distance").attr('class', 'list_btn_distance_on');
    		$("#list_btn_status").attr('class', 'list_btn_status_off');
    		
    	}
    	else
    	{
    		$("#list_btn_distance").attr('class', 'list_btn_distance_off');
    		$("#list_btn_status").attr('class', 'list_btn_status_on');
    	}
			
    	this.app.SetIconBeforeAction(proxy(this.CloseListScreen, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseListScreen, this));
	};
	
	this.HandleOkConfirmationClick = function () 
	{
		this.canUseGps = true;
		this.app.GetParametersModule().StorageParametersDataSave();		
		
		$('#parameters_choose_parameters_button_gpsuse .parameters_choose_parameters_button_title').html("${sc10_refuse_gps}");
		
		this.ListScreenWsCall();				
	};
	
	this.HandleCancelConfirmationClick = function () 
	{
		this.canUseGps = "no";		
		this.app.GetParametersModule().StorageParametersDataSave();
		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${gps_confirmation_cancel_button_message}</div></div>';
		$("#list_all_park_makes").html(itm);
				
		$('#parameters_choose_parameters_button_gpsuse .parameters_choose_parameters_button_title').html("${sc10_autorize_gps}");
				
		this.app.SetIconBeforeAction(proxy(this.CloseListScreen, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseListScreen, this));
	};
	
	/*
	 * Function called by scroller widget to build the list item for punctual search
	 */
	this.ListConstructorCallback = function (itemData)
	{	
		logo = this.getParkingLogo(itemData);
		type = this.getParkingTypeColor(itemData);
		parkingname = "";
		
		if(itemData.label) parkingname = itemData.label;
		
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
			html += '<div id="list_choose_park_park'+itemData.id+'" class="list_choose_park_single">';			
				html += '<div class="list_choose_park_single_logo">';
					html +=	'<table cellspacing="0" cellpadding="0" border="0">';
						html += '<tr>';
							html +=	'<td height="100%" width="100%" valign="middle"><img src="'+logo+'" /></td>';
						html += '</tr>';
					html += '</table>';							
				html += '</div>';			
				html += '<div class="list_choose_park_single_title policy_content_list_name" id="name_scroll_'+itemData.uuid+'">'+parkingname+'</div>';
				html += '<div class="list_choose_park_single_title_address policy_content_list_address" id="address_scroll_'+itemData.uuid+'">'+addr+'</div>';
				html += '<div class="list_choose_park_single_title_distance policy_content_list_distance">'+convertDistance(itemData.distance)+'</div>';
				html += '<div class="list_choose_park_single_title_bullet list_bullet_'+type+'"></div>';				
				html += '<div id="focused_parking_'+itemData.uuid+'" class="focused_parking"></div>';			
			html += '</div>';
		
		return html;
	};
	
	this.HandleListDistanceSortClick = function ()
	{	
		if(this.sortMode == 'distance')
			return true;
		else
		{
			$("#list_btn_distance").attr('class', 'list_btn_distance_on');
			$("#list_btn_status").attr('class', 'list_btn_status_off');
			this.TriggerSort('distance');
		}
	};
	
	this.HandleListStatusSortClick = function ()
	{	
		if(this.sortMode == 'status')
			return true;
		else
		{
			$("#list_btn_distance").attr('class', 'list_btn_distance_off');
			$("#list_btn_status").attr('class', 'list_btn_status_on');
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
	
	this.HandleSearchButtonClick = function ()
	{		
		this.CloseListScreen();
		this.app.GetSearchModule().ShowSearchSelectScreen();		
	};
	
	this.HandleSelectParkingClick = function (ev)
	{
		
		item_idx = $('#list_all_park_makes').children().index("#"+$(ev.currentTarget).attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
	
		wasClicked = false;
		scrollResultName = false;
		scrollResultAddress = false;
		
						
		if (this.focusedParking != null)
		{
			$('#focused_parking_'+this.focusedParking.uuid).hide();
			this.scrollText.StopScroll("#name_scroll_"+this.focusedParking.uuid);
			this.scrollText.StopScroll("#address_scroll_"+this.focusedParking.uuid);
				
			
			if (this.focusedParking.uuid == this.listData[item_idx].uuid)
			{
				this.focusedParking = null;
				wasClicked = true;
				
				//close current screen				
				this.CloseListScreen();		
				this.ShowParkingInfoModule();				
			}
			else
			{
				this.focusedParking = null; 
			}			
		}		
		if (this.focusedParking == null && wasClicked === false)
		{			
			this.focusedParking = this.listData[item_idx];
			this.currentParking = this.listData[item_idx];
			
			this.currentParkingFromList = "list";				
		
			scrollResultName = this.scrollText.StartScroll("#name_scroll_"+this.focusedParking.uuid);				
			scrollResultAddress = this.scrollText.StartScroll("#address_scroll_"+this.focusedParking.uuid);
			
			if(!scrollResultName && !scrollResultAddress)
			{
				this.CloseListScreen();		
				this.ShowParkingInfoModule();
			}
			else
			{
				$('#focused_parking_'+this.focusedParking.uuid).show();
			}
		}
	};
	
	this.HandleFavoritesButtonClick = function ()
	{		
		this.CloseListScreen();
		this.ShowFavoritesListScreen();
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
			$("#list_all_park_makes").html(itm);
		}
		else
		{
			this.scroller = new Application.ScrollerWidget('#list_vertical_scroll', '#list_all_park_makes', 3, this.listData, proxy(this.ListConstructorCallback, this));
		}	
		
		this.app.HideLoading();		
	};
	
	this.HandleWSResponseError = function(data)
	{
		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_results_found}</div></div>';
			$("#list_all_park_makes").html(itm);
		this.app.HideLoading();
	};
	
	this.CloseListScreen = function ()
	{
		if(this.scroller != null)
		{
			this.currentPage = this.scroller.GetCurrentPage();			
			this.scroller.Terminate();
			this.scroller = null;
		}
		this.focusedParking = null;
		$("#parking_info_module").hide();
		$("#list_content").hide();
		$('#list_btn_distance').unbind();
		$('#list_btn_status').unbind();
		$('#list_btn_search').unbind();    	
    	$('#list_btn_favorites').unbind();
		
		$('#list_all_park_makes').undelegate(".list_choose_park_single", "click");
		$("#list_all_park_makes").html('');
		
		this.app.HideLoading();
		this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);    	
	};	
	//SC1 END
	
	//SC2 START
    this.ShowFavoritesListScreen = function ()
    {    	
    	$("#parking_info_module").show();    	
    	$('#favorite_list_content').show();
    	
    	if(this.canUseGps == true && (this.app.gpsPosition.latitude != 0 || this.app.gpsPosition.longitude != 0))
		{
			var lat = this.app.gpsPosition.latitude;
			var lng = this.app.gpsPosition.longitude;
			
			//calculate current distance
			for(var i = 0; i < this.listFavoriteList.length; i++)
				this.listFavoriteList[i].distance = GetDistanceBetweenCoordinates(lat, lng, this.listFavoriteList[i].latitude, this.listFavoriteList[i].longitude);
			
			//sort list by distance
			this.listFavoriteList.sort(sortByDistance);
		}
		else
		{
			//sort list by history
			this.listFavoriteList.sort(sortByHistory);
		}
    	
    	if(this.listFavoriteList.length > 0)
    	{
    		this.scroller = new Application.ScrollerWidget('#favorite_list_scroll', '#favorite_list_all_destinations', 3, this.listFavoriteList, proxy(this.FavoriteListConstructorCallback, this));
    		//scroll to current page
			while(this.scroller.GetCurrentPage() != this.currentFavoritePage && this.scroller.GetCurrentPage() < this.scroller.maxPages)
				this.scroller.HandleMoveDown();
    	}
    	else
    	{
    		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${sc2_no_favorite}</div></div>';
    		$("#favorite_list_all_destinations").html(itm);
    	}
    	
    	$("#favorite_list_all_destinations").delegate(".favorite_list_choose_favorits_star", "click", proxy(this.HandleAddToFavoriteListClick, this));
    	$("#favorite_list_all_destinations").delegate(".favorite_list_details", "click", proxy(this.HandleFavoritesListAddressClick, this));
    	
    	this.app.SetIconBeforeAction(proxy(this.CloseFavoritesListScreen, this));
    	this.app.SetBackAction(proxy(this.CloseFavoritesListScreenWithBack, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseFavoritesListScreen, this));    	
    };
    
    this.HandleAddToFavoriteListClick = function(ev)
	{	
		item_idx = $('#favorite_list_all_destinations').children().index("#"+$(ev.currentTarget).parent().attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
		
		if(this.listFavoriteToDelete[item_idx] == null)
		{
			this.listFavoriteToDelete[item_idx] = this.listFavoriteList[item_idx].uuid;
			$(ev.currentTarget).removeClass('on off');
			$(ev.currentTarget).addClass('off');
		}
		else
		{
			this.listFavoriteToDelete[item_idx] = null;
			$(ev.currentTarget).removeClass('on off');
			$(ev.currentTarget).addClass('on');
		}
	};
	
    /* Function called by scroller widget to build the list item for favorites*/
	this.FavoriteListConstructorCallback = function (itemData)
	{
		logo = this.getParkingLogo(itemData);
		type = this.getParkingTypeColor(itemData);
		
		var name = "";		
		if(itemData.label) name = itemData.label;
		
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
		html += '<div class="favorite_list_single" id="list_choose_favorite_favorite'+itemData.id+'" >';	
			html += '<div class="favorite_list_details" >';
				html += '<div class="favorite_list_single_logo">';
					html +=	'<table cellspacing="0" cellpadding="0" border="0">';
						html += '<tr>';
							html +=	'<td height="100%" width="100%" valign="middle"><img src="'+logo+'" /></td>';
						html += '</tr>';
					html += '</table>';							
				html += '</div>';	
				html += '<div class="favorite_list_single_title policy_content_list_name" id="favorite_list_name_scroll_'+itemData.uuid+'">'+name+'</div>';
				if(this.canUseGps == true)
					html += '<div class="favorite_list_single_title_distance policy_content_list_distance">'+convertDistance(itemData.distance)+'</div>';
				else html += '<div class="favorite_list_single_title_distance policy_content_list_distance">&nbsp;</div>';
				html += '<div class="favorite_list_single_address_city">';
					html += '<div class="favorite_list_single_title_address policy_content_list_address" id="favorite_list_address_scroll_'+itemData.uuid+'">'+addr+'</div>';
				html += '</div>';
				
				html += '<div class="favorite_list_single_title_bullet list_bullet_'+type+'"></div>';
				html += '<div id="focused_parking_'+itemData.uuid+'" class="focused_parking"></div>';
			html += '</div>';
			html += '<div class="favorite_list_choose_favorits_star ';
			if(!this.FavoriteCheckDeletion(itemData.uuid))
			{
				html += 'on';
			}
			else
			{
				html += 'off';
			}
			html += '" ></div>';
			
		html += '</div>';	
		
		
		return html;
	};
	
	
	this.FavoriteCheckDeletion = function(uuid)
	{
		for(var idx = 0; idx < this.listFavoriteToDelete.length; idx++)
		{
			if(this.listFavoriteToDelete[idx] != null && this.listFavoriteToDelete[idx] == uuid)
			{
				return true;
			}
		}
		
		return false;
	};
	
    this.HandleFavoritesListAddressClick = function (ev)
    {
    	item_idx = $('#favorite_list_all_destinations').children().index("#"+$(ev.currentTarget).parent().attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
 
    	
    	wasClicked = false;
    	scrollResultName = false;
		scrollResultAddress = false;
		
		if (this.focusedParking != null)
		{
			$('#focused_parking_'+this.focusedParking.uuid).hide();
			this.scrollText.StopScroll("#favorite_list_name_scroll_"+this.focusedParking.uuid);
			this.scrollText.StopScroll("#favorite_list_address_scroll_"+this.focusedParking.uuid);			
			
			if (this.focusedParking.uuid == this.listFavoriteList[item_idx].uuid)
			{				
				this.focusedParking = null;
				wasClicked = true;
				
				//close current screen				
				this.CloseFavoritesListScreen();
				this.ShowParkingInfoModule();		
			}
			else
			{
				this.focusedParking = null; 
			}			
			
		}
		
		if (this.focusedParking == null && wasClicked === false)
		{	
			
			this.focusedParking = this.listFavoriteList[item_idx];
			this.currentParking = this.listFavoriteList[item_idx];
			
			this.currentParkingFromList = "favorites";			
			
			scrollResultName = this.scrollText.StartScroll("#favorite_list_name_scroll_"+this.focusedParking.uuid);				
			scrollResultAddress = this.scrollText.StartScroll("#favorite_list_address_scroll_"+this.focusedParking.uuid);
			
			if(!scrollResultName && !scrollResultAddress)
			{
				//close current screen				
				this.CloseFavoritesListScreen();
    			this.ShowParkingInfoModule();
			}
			else
			{
				$('#focused_parking_'+this.focusedParking.uuid).show();
			}
		}
	
    };
    
    this.CloseFavoritesListScreen = function ()
    {
    	if(this.scroller != null)
		{
			this.currentFavoritePage = this.scroller.GetCurrentPage();			
			this.scroller.Terminate();
			this.scroller = null;
		}		
		
    	$("#parking_info_module").hide();
    	$('#favorite_list_content').hide();
    	$('#favorite_list_all_destinations').undelegate(".favorite_list_details", "click");
    	$('#favorite_list_all_destinations').undelegate(".favorite_list_choose_favorits_star", "click");
    	
    	this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
    	this.app.SetBackAction(null);    	

    	// removing parkings from favorites that are marked
    	for(var idx = 0; idx < this.listFavoriteList.length; idx++)
		{
			for(var idx2 = 0; idx2 < this.listFavoriteToDelete.length; idx2++)
			{
				if(this.listFavoriteToDelete[idx2] != null && this.listFavoriteList[idx].uuid == this.listFavoriteToDelete[idx2])
				{
					this.listFavoriteList.splice(idx,1);
					idx--;
					break;
				}
			}
		}
    	
    	this.listFavoriteToDelete = [];
    	this.focusedParking = null;
		
		this.StorageParkingInfoDataSave();    	
    };
    
    this.CloseFavoritesListScreenWithBack = function ()
    {
    	this.CloseFavoritesListScreen();
    	this.ShowListScreen();
    };    
    //SC2 END
    
    //SC3 START
	this.ShowParkingInfoModule = function()
	{	
		selectedParking = this.currentParking;
		selectedParkingId = this.currentParking.id;
		currentLogo = this.getCurrentParkingLogo();
		var infos = 0;
		var prices = 0;
		var arrInfos = null;
		var addr = "";
		
		$('.parking_logo_info_page').attr('src', currentLogo);
		
		if (selectedParking.label)
		{ 
			$('.parkinginfo_location_text_span').html(selectedParking.label);
			$('#parkinginfo_text_title_info').html(selectedParking.label);
		}
		else
		{
			$('.parkinginfo_location_text_span').html("");
			$('#parkinginfo_text_title_info').html("");
		}
		
		if(selectedParking.phone_number) 
			$('#parkinginfo_phone_no_text').html(selectedParking.phone_number);
		else
			$('#parkinginfo_phone_no_text').html("");
		
		
		if(this.canUseGps != true && this.currentParkingFromList == "favorites")
			$('#parkinginfo_aller_distinance').html("&nbsp;");
		else 
			$('#parkinginfo_aller_distinance').html(convertDistance(selectedParking.distance));		
		
		
		if(selectedParking.street_name != null && selectedParking.street_name != "")
		{
			addr += selectedParking.street_name;
		}
		if(addr != "")
		{
			addr += '<br />';
		}
		if(selectedParking.zipcode != null && selectedParking.zipcode != "")
		{
			addr += selectedParking.zipcode;
		}
		if(selectedParking.city_area != null && selectedParking.city_area != "")
		{
			if(addr != "")
			{
				addr += " ";
			}
			addr += selectedParking.city_area;
		}
		$('#parkinginfo_address_text').html(addr);

		this.HandleServiceIcons();
				
		arrInfos = this.InfoServiceTableRowsConstruct();				
		this.scroller = new Application.ScrollerWidget('#parkinginfo_info_vertical_scroll', '#parkinginfo_infobox_list_infos', 4, arrInfos, proxy(this.ParkingInfoListConstructorCallback, this), null, null);		
		
		/* listData */		
		$('#parking_info_module').show();
		$('#parkinginfo_content_panels').show();				
			
		$('.icons').bind('click', proxy(this.HandleParkingInfoScreenSelectionClick, this));
		
		$('.parkinginfo_favorite_button').bind('click', proxy(this.HandleParkingInfoAddRemoveFavorite, this));
		
		infos = this.CheckIfWeHaveInfos();
		prices = this.CheckIfWeHavePrices();
				
		//set price tab image
		$(".parkinginfo_detail_price_logo").attr("src", this.app.GetCurrencyByName(this.currentCurrency,"image33"));
		
		if (infos > 0 && prices > 0)
		{
			$('#parkinginfo_header_buttons').show();
		} 
		else if (infos > 0 && prices == 0)
		{
			$('#parkinginfo_header_3_buttons_info').show();			
		}
		else if (infos == 0 && prices > 0)
		{
			$('#parkinginfo_header_3_buttons_price').show();			
		}
		else
		{
			$('#parkinginfo_header_2_buttons').show();
		}
		
		if(this.IsFavorite())
		{
			$(".parkinginfo_favorite_button").removeClass('on off');
			$(".parkinginfo_favorite_button").addClass('on');
		}
		else
		{
			$(".parkinginfo_favorite_button").removeClass('on off');
			$(".parkinginfo_favorite_button").addClass('off');
		}		
		this.currentTab = 'parkinginfo_menu_button_details';
    	this.ShowParkingInfoDetailScreen();
    	
    	this.app.SetIconBeforeAction(proxy(this.CloseParkingInfoModule, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseParkingInfoModule, this));
		this.app.SetBackAction(proxy(this.CloseParkingInfoModuleWithBack, this));
	};
		
	this.ParkingInfoListConstructorCallback = function (itemData)
    {    	
    	var name = "";
    	   	
    	if (itemData.label == "Capacity") name = "${sc3c_capacity}";
    	if (itemData.label == "Haut_Max") name = "${sc3c_max_height}";
    	if (itemData.label == "Bus") name = "${sc3c_bus}";
    	if (itemData.label == "Type_Parc") name = "${sc3c_type}";
    	if (itemData.label == "Gare") name = "${sc3c_station}";
    	if (itemData.label == "Paiement") name = "${sc3c_payment}";
    	if (itemData.label == "jours_7_7") name = "${sc3c_7}";
    	if (itemData.label == "hours_24_24") name = "${sc3c_24}";
    	 
    	var html = '<div class="info_table_content">';    			
	    		html += '<div class="info_table_label_callback policy_content_list_distance">'+name+':&nbsp;&nbsp;</div>';
	    		html += '<div class="info_table_value_callback policy_content_list_distance" id="scrolltext_'+itemData.label+'">'+itemData.value+'</div>';	    			    			
    		html += '</div>';
    	
		return html;    	
    };
	this.CheckIfWeHaveInfos = function ()
    {
    	var infos_number = 0;
    	for(var k =0; k < this.currentParking.extendeds.length; k++)
		{
			switch(this.currentParking.extendeds[k].text_id)
			{
				case "Capacity" : 
					infos_number++;
					break;
					
				case "Haut_Max" : 
					infos_number++;
					break;
				case "Bus" :
					infos_number++;
					break;
				case "Type_Parc" :
					infos_number++;
					break;
				case "Gare" :
					infos_number++;
					break;
				case "Paiement" :
					infos_number++;
					break;
				case "jours_7_7" :
					infos_number++;
					break;
				case "hours_24_24" :
					infos_number++;
					break;															
			}
		}
		return infos_number;
    };
    
    this.CheckIfWeHavePrices = function ()
    {
    	var rate1 = "";
		var rate2 = "";
		var rate3 = "";
		var rate24 = "";		
		var arrExpl = [];
		
				
    	for(var idx =0; idx < this.currentParking.extendeds.length; idx++)
		{
			switch(this.currentParking.extendeds[idx].text_id)
			{
				case "rate_tranche_1":
					if (!this.currentParking.extendeds[idx].extended_data_value.NaN)
					{
						arrExpl = this.currentParking.extendeds[idx].extended_data_value.split(' ');
						if (arrExpl[0] > 0)
						{
							rate1 = this.currentParking.extendeds[idx].extended_data_value;
							this.currentCurrency = arrExpl[1];
						}
					}		
					break;
				case "rate_tranche_2":
					if (!this.currentParking.extendeds[idx].extended_data_value.NaN)
					{
						arrExpl = this.currentParking.extendeds[idx].extended_data_value.split(' ');
						if (arrExpl[0] > 0)
						{
							rate2 = this.currentParking.extendeds[idx].extended_data_value;
							this.currentCurrency = arrExpl[1];
						}
					}
					break;
				case "rate_tranche_3":
					if (!this.currentParking.extendeds[idx].extended_data_value.NaN)
					{
						arrExpl = this.currentParking.extendeds[idx].extended_data_value.split(' ');
						if (arrExpl[0] > 0)
						{
							rate3 = this.currentParking.extendeds[idx].extended_data_value;
							this.currentCurrency = arrExpl[1];
						}
					}
					break;
				case "rate_24h":
					if (!this.currentParking.extendeds[idx].extended_data_value.NaN)
					{
						arrExpl = this.currentParking.extendeds[idx].extended_data_value.split(' ');
						if (arrExpl[0] > 0)
						{
							rate24 = this.currentParking.extendeds[idx].extended_data_value;
							this.currentCurrency = arrExpl[1];
						}
					}
					break;
				default:
					break;
			}
		}
		if (rate1 != "" || rate2 != "" || rate3 !="" || rate24 !="")
		{
			return 1;
		}
		else return 0;
    };
    
	this.InfoServiceTableRowsConstruct = function ()
    {
		var arrInfos = [];
		var capacity = "";
		var haut_max = "";
		var bus = "";
		var type_parc = "";
		var gare = "";
		var paiement = "";
		var time7 = "";
		var time24 = "";
		
		for(var k =0; k < this.currentParking.extendeds.length; k++)
		{
			switch(this.currentParking.extendeds[k].text_id)
			{
				case "Capacity" : 
					if(capacity.length > 0)
						capacity += ", ";
					capacity += this.currentParking.extendeds[k].extended_data_value;
					break;
					
				case "Haut_Max" : 
					if(haut_max.length > 0)
						haut_max += ", ";
					haut_max += this.currentParking.extendeds[k].extended_data_value;
					break;
				case "Bus" :
					if(bus.length > 0)
						bus += ", ";
					bus += this.currentParking.extendeds[k].extended_data_value;
					break;
				case "Type_Parc" :
					if(type_parc.length > 0)
						type_parc += ", ";
					type_parc += this.currentParking.extendeds[k].extended_data_value;
					break;
				case "Gare" :
					if(gare.length > 0)
						gare += ", ";
					gare += this.currentParking.extendeds[k].extended_data_value;
					break;
				case "Paiement" :
					if(paiement.length > 0)
						paiement += ", ";
					paiement += this.currentParking.extendeds[k].extended_data_value;
					break;
				case "jours_7_7" :
					if(time7.length > 0)
						time7 += ", ";
					time7 += this.currentParking.extendeds[k].extended_data_value;
					if(time7 == 'Oui' || time7 == true || time7 == 1 || time7 == 'Yes' || time7 == 'yes' || time7 == 'oui' || time7 == 'true' || time7 == 'TRUE' || time7 == 'YES' || time7 == 'OUI')
						time7 = '${yes}';
					else
						time7 = '${no}';
					break;
				case "hours_24_24" :
					if(time24.length > 0)
						time24 += ", ";
					time24 += this.currentParking.extendeds[k].extended_data_value;
					if(time24 == 'Oui' || time24 == true || time24 == 1 || time24 == 'Yes' || time24 == 'yes' || time24 == 'oui' || time24 == 'true' || time24 == 'TRUE' || time24 == 'YES' || time24 == 'OUI')
							time24 = '${yes}';
					else
							time24 = '${no}';
					break;															
			}
		}
		
		if (capacity.length > 0) arrInfos.push({label: "Capacity", value: capacity});
		if (haut_max.length > 0) arrInfos.push({label: "Haut_Max", value: haut_max});
		if (bus.length > 0) arrInfos.push({label: "Bus", value: bus});
		if (type_parc.length > 0) arrInfos.push({label: "Type_Parc", value: type_parc});
		if (gare.length > 0) arrInfos.push({label: "Gare", value: gare});
		if (paiement.length > 0) arrInfos.push({label: "Paiement", value: paiement});
		if (time7.length > 0) arrInfos.push({label: "jours_7_7", value: time7});
		if (time24.length > 0) arrInfos.push({label: "hours_24_24", value: time24});
		
		return arrInfos;
    };
  
    this.HandleServiceIcons = function ()
    {
    	$("#parkinginfo_icons").children().css('display', 'none');
    	$('#parkinginfo_horarires_text').html('');
    	$('.parkinginfo_clock_icon').hide();
    	
    	selectedParking = this.currentParking;
    	
    	for(var x = 0; x < selectedParking.extendeds.length; x++)
    	{
	    	if(selectedParking.extendeds[x].text_id == 'srv_elevator' && (selectedParking.extendeds[x].extended_data_value == 'true' || selectedParking.extendeds[x].extended_data_value == '1'))
			{
				$('.elevator').css('display', 'block');
			}
	    	else if(selectedParking.extendeds[x].text_id == 'horaires')
			{
				$('.parkinginfo_clock_icon').show();
				$('#parkinginfo_horarires_text').html(selectedParking.extendeds[x].extended_data_value);
			}
			else if(selectedParking.extendeds[x].text_id == 'srv_no_Acc_GPL' && (selectedParking.extendeds[x].extended_data_value == 'true' || selectedParking.extendeds[x].extended_data_value == '1'))
			{
				$('.nogpl').css('display', 'block');
			}
			else if(selectedParking.extendeds[x].text_id == 'Acc_Hand' && (selectedParking.extendeds[x].extended_data_value == 'true' || selectedParking.extendeds[x].extended_data_value == '1'))
			{
				$('.invalides').css('display', 'block');
			}
			else if(selectedParking.extendeds[x].text_id == 'srv_electric_recharge' && (selectedParking.extendeds[x].extended_data_value == 'true' || selectedParking.extendeds[x].extended_data_value == '1'))
			{
				$('.electric').css('display', 'block');
			}
			else if(selectedParking.extendeds[x].text_id == 'Video' && (selectedParking.extendeds[x].extended_data_value == 'true' || selectedParking.extendeds[x].extended_data_value == '1'))
			{
				$('.camera').css('display', 'block');
			}
			else if(selectedParking.extendeds[x].text_id == 'srv_car_wash' && (selectedParking.extendeds[x].extended_data_value == 'true' || selectedParking.extendeds[x].extended_data_value == '1'))
			{
				$('.carwash').css('display', 'block');
			}
			else if(selectedParking.extendeds[x].text_id == 'srv_wc' && (selectedParking.extendeds[x].extended_data_value == 'true' || selectedParking.extendeds[x].extended_data_value == '1'))
			{
				$('.toilet').css('display', 'block');
			}
			else if(selectedParking.extendeds[x].text_id == 'srv_motorcycle_parking' && (selectedParking.extendeds[x].extended_data_value == 'true' || selectedParking.extendeds[x].extended_data_value == '1'))
			{
				$('.motor').css('display', 'block');
			}
    	}
	};
	
	this.getCurrentParkingLogo = function()
	{	
		
		var logo = this.getParkingLogo(this.currentParking);
		
		return logo;
		
	};	
	
	this.HandleParkingInfoScreenSelectionClick = function (ev)
	{
		var action_type = $(ev.currentTarget).attr('tab');
		
		if(action_type == this.currentTab)
		{
			return false;
		}
		else
		{
			if(this.currentTab == 'parkinginfo_menu_button_details')
			{
				$("#parkinginfo_content_panel_details").hide();
			}
			else if(this.currentTab == 'parkinginfo_menu_button_address')
			{
				$("#parkinginfo_content_panel_address").hide();
			}
			else if(this.currentTab == 'parkinginfo_menu_button_info')
			{
				$("#parkinginfo_content_panel_info").hide();
			}
			else if(this.currentTab == 'parkinginfo_menu_button_euro')
			{
				$("#parkinginfo_content_panel_euro").hide();
			}			
		}

		this.currentTab = action_type;
		
		if(action_type == 'parkinginfo_menu_button_details')
		{
			this.StopParkingInfoScreenScroll();
			this.ShowParkingInfoDetailScreen();			
		}
		else if(action_type == 'parkinginfo_menu_button_address')
		{
			this.StopParkingInfoScreenScroll();
			this.ShowParkingInfoAddressScreen();						
		}
		else if(action_type == 'parkinginfo_menu_button_info')
		{
			this.StopParkingInfoScreenScroll();
			this.ShowParkingInfoInfoScreen();			
		}
		else if(action_type == 'parkinginfo_menu_button_euro')
		{
			this.StopParkingInfoScreenScroll();
			this.ShowParkingInfoEuroScreen();			
		}
	};
	
	/* add or remove from favorites  */	
	this.HandleParkingInfoAddRemoveFavorite = function ()
	{
		if(this.IsFavorite())
		{
			for(var idx = 0; idx < this.listFavoriteList.length; idx++)
			{
				if(this.listFavoriteList[idx].uuid == this.currentParking.uuid)
				{
					this.listFavoriteList.splice(idx,1);
					$(".parkinginfo_favorite_button").removeClass('on off');
					$(".parkinginfo_favorite_button").addClass('off');
					break;
				}
			}
		}
		else
		{
			var currentListFavoriteLength = this.listFavoriteList.length;
						
			if (currentListFavoriteLength >= Application.CONSTANTS.FAVORITE_LIST_LIMIT)
			{
				this.notificationWidget = new Application.NotificationWidget("#parking_info_module", null, "${sc2_limit_reached}");				
				return false;
			}			
			$(".parkinginfo_favorite_button").removeClass('on off');
			$(".parkinginfo_favorite_button").addClass('on');
			this.listFavoriteList.push(this.currentParking);
			//set history order
			if(this.listFavoriteList.length == 1) this.listFavoriteList[0].history = 1;
			else 
			{
				var maxHistory = 0;
				for(var i = 0; i < this.listFavoriteList.length - 1; i++)
					if(maxHistory < this.listFavoriteList[i].history) maxHistory = this.listFavoriteList[i].history;
				
				this.listFavoriteList[this.listFavoriteList.length - 1].history = maxHistory + 1;
			}
		}
		
		this.StorageParkingInfoDataSave();	
	};
	
	this.IsFavorite = function ()
	{
		for(var idx = 0; idx < this.listFavoriteList.length; idx++)
		{
			if(this.listFavoriteList[idx].uuid == this.currentParking.uuid)
			{
				return true;
			}
		}
		
		return false;
	};
	
	this.StopParkingInfoScreenScroll = function ()
	{			
		this.scrollText.StopScroll("#scrolltext_Capacity");
		this.scrollText.StopScroll("#scrolltext_Haut_Max");		
		this.scrollText.StopScroll("#scrolltext_Bus");
		this.scrollText.StopScroll("#scrolltext_Type_Parc");		
		this.scrollText.StopScroll("#scrolltext_Gare");
		this.scrollText.StopScroll("#scrolltext_Paiement");
		this.scrollText.StopScroll("#scrolltext_jours_7_7");
		this.scrollText.StopScroll("#scrolltext_hours_24_24");
		
		this.scrollText.StopScroll("#parkinginfo_text_title_details");
		this.scrollText.StopScroll("#parkinginfo_text_title_address");
		this.scrollText.StopScroll("#parkinginfo_text_title_info");
		this.scrollText.StopScroll("#parkinginfo_text_title_euro");
	};
	
	this.CloseParkingInfoModule = function()
	{
		$('#parking_info_module').hide();
		$('#parkinginfo_content_panels').hide();
		
		$('#parkinginfo_header_buttons').hide();
		$('#parkinginfo_header_3_buttons_info').hide();
		$('#parkinginfo_header_3_buttons_price').hide();
		$('#parkinginfo_header_2_buttons').hide();
		
		$("#parkinginfo_content_panel_details").hide();
		$("#parkinginfo_content_panel_address").hide();
		$("#parkinginfo_content_panel_info").hide();
		$("#parkinginfo_content_panel_euro").hide();
		
		$('.icons').unbind();
		$('.parkinginfo_location_text_span').unbind();
		$('.parkinginfo_favorite_button').unbind();
		$('#parkinginfo_apeller_btn').unbind();
		
		this.StopParkingInfoScreenScroll();
		
		this.app.SetIconBeforeAction(null);
		this.app.SetParametersBeforeAction(null);
		this.app.SetBackAction(null);
	};
	
	this.CloseParkingInfoModuleWithBack = function ()
	{
		this.CloseParkingInfoModule();
		
		if(this.currentParkingFromList == "list")
		{
			this.currentParkingFromList = "";
			this.ShowListScreen();
		}
		else if(this.currentParkingFromList == "search")
		{
			this.currentParkingFromList = "";
			this.app.GetSearchModule().ShowSearchPunctualScreen();
		}
		else if(this.currentParkingFromList == "favorites")
		{
			this.currentParkingFromList = "";
			this.ShowFavoritesListScreen();
		}
		else
		{
			this.currentParkingFromList = "";
			this.ShowListScreen();
		}			
	};	
	/* SC3 screens handle end */	
		
	/* SC3a start */
	this.ShowParkingInfoDetailScreen = function()
	{		
		$('#parkinginfo_text_title_details').bind('click', proxy(this.ParkingInfoDetailScreenScroll, this));
		$("#parkinginfo_content_panels").addClass('details');
		
		$('div[tab=parkinginfo_menu_button_details]').removeClass("closed");		
		
		$(".parkinginfo_select_button").removeClass('pressed_address');
		$(".parkinginfo_select_button").removeClass('pressed_info');
		$(".parkinginfo_select_button").removeClass('pressed_prices');
		
		$(".parkinginfo_select_button").addClass('pressed_properties');
		
		$("#parkinginfo_content_panel_details").show();		
		
		$('#parkinginfo_content_panel_details').show();
		$('#parkinginfo_apeller_btn').bind('click', proxy(this.HandlepushOkCallButton, this));		
		$('#parkinginfo_aller_btn').bind('click', proxy(this.HandleParkingNavigateButtonClick, this));
	};
	this.ParkingInfoDetailScreenScroll = function ()
	{
		this.StopParkingInfoScreenScroll();
		scrollTitle = this.scrollText.StartScroll('#parkinginfo_text_title_details');
	};
	
	this.HandlepushOkCallButton = function ()
	{
		if(this.currentParking.phone_number != '')
			PORTAL.launchPhoneCall(this.currentParking.phone_number);
	};
	
	this.HandleParkingNavigateButtonClick = function()
	{
		PORTAL.navigation.launchGuidance(this.currentParking.latitude, this.currentParking.longitude);
	};
	
	this.CloseParkingInfoDetailScreen = function()
	{
		$('#parkinginfo_content_panel_details').hide();		
	};
	/* SC3a end */
	
		
	/* SC3b start */	
	this.ShowParkingInfoAddressScreen = function()
	{
		$('#parkinginfo_text_title_address').bind('click', proxy(this.ParkingInfoAddressScreenScroll, this));
		$('div[tab=parkinginfo_menu_button_details]').addClass("closed");
		
		$(".parkinginfo_select_button").removeClass('pressed_properties');
		$(".parkinginfo_select_button").removeClass('pressed_info');
		$(".parkinginfo_select_button").removeClass('pressed_prices');
		
		$(".parkinginfo_select_button").addClass('pressed_address');
		
		$('#parkinginfo_content_panel_address').show();
	};
	this.ParkingInfoAddressScreenScroll = function ()
	{
		this.StopParkingInfoScreenScroll();
		scrollTitle = this.scrollText.StartScroll('#parkinginfo_text_title_address');
	};	
	this.CloseParkingInfoAddressScreen = function()
	{
		$('#parkinginfo_content_panel_address').hide();
	};
	/* SC3b end */
	
	/* SC3c start */	
	this.ShowParkingInfoInfoScreen = function()
	{
		$('#parkinginfo_infobox_list_infos').bind('click', proxy(this.ParkingInfoInfoDetailsScroll, this));
		$('#parkinginfo_text_title_info').bind('click', proxy(this.ParkingInfoInfoDetailsScroll, this));
		$('div[tab=parkinginfo_menu_button_details]').addClass("closed");
		
		$(".parkinginfo_select_button").removeClass('pressed_properties');
		$(".parkinginfo_select_button").removeClass('pressed_address');
		$(".parkinginfo_select_button").removeClass('pressed_prices');
		
		$(".parkinginfo_select_button").addClass('pressed_info');
		
		$('#parkinginfo_content_panel_info').show();
	};	
	this.ParkingInfoInfoDetailsScroll = function ()
	{	
		this.StopParkingInfoScreenScroll();
		
		scrollTitle = this.scrollText.StartScroll('#parkinginfo_text_title_info');		
		scrollCapacity = this.scrollText.StartScroll("#scrolltext_Capacity");
		scrollHaut_Max = this.scrollText.StartScroll("#scrolltext_Haut_Max");		
		scrollBus = this.scrollText.StartScroll("#scrolltext_Bus");
		scrollType_Parc = this.scrollText.StartScroll("#scrolltext_Type_Parc");		
		scrollGare = this.scrollText.StartScroll("#scrolltext_Gare");
		scrollPaiement = this.scrollText.StartScroll("#scrolltext_Paiement");
		scrolljours_7_7 = this.scrollText.StartScroll("#scrolltext_jours_7_7");
		scrollhours_24_24 = this.scrollText.StartScroll("#scrolltext_hours_24_24");
	};

	this.CloseParkingInfoInfoScreen = function()
	{
		$('#parkinginfo_content_panel_info').hide();
		$('#parkinginfo_infobox_list_infos').unbind();
		$('#parkinginfo_text_title_info').unbind();
	};
	/* SC3c end */
	
	/* SC3d start */	
	this.ShowParkingInfoEuroScreen = function()
	{
		$('#parkinginfo_text_title_euro').bind('click', proxy(this.ParkingInfoEuroScreenScroll, this));
		$('div[tab=parkinginfo_menu_button_details]').addClass("closed");
		
		$(".parkinginfo_select_button").removeClass('pressed_properties');
		$(".parkinginfo_select_button").removeClass('pressed_address');
		$(".parkinginfo_select_button").removeClass('pressed_info');
		
		$(".parkinginfo_select_button").addClass('pressed_prices');
		
		$('#parkinginfo_content_panel_euro').show();
		
		var rate1 = "";
		var rate2 = "";
		var rate3 = "";
		var rate24 = "";
		var arrExpl = new Array();
		var arrRate = new Array();
		arrRate[0] = "-";
		arrRate[1] = "-";
		arrRate[2] = "-";
		arrRate[3] = "-";
		
		for(var idx =0; idx < this.currentParking.extendeds.length; idx++)
		{
			switch(this.currentParking.extendeds[idx].text_id)
			{
				case "rate_tranche_1":
					arrExpl = this.currentParking.extendeds[idx].extended_data_value.split(' ');
					if(arrExpl.length > 1)
					{
						rate1 = arrExpl[0]+"&nbsp;"+this.app.GetCurrencyByName(arrExpl[1],"html_code");
					}
					else
					{
						rate1 = this.currentParking.extendeds[idx].extended_data_value;
					}
					arrRate[0] = rate1;
					break;
				case "rate_tranche_2":
					arrExpl = this.currentParking.extendeds[idx].extended_data_value.split(' ');
					if(arrExpl.length > 1)
					{
						rate2 = arrExpl[0]+"&nbsp;"+this.app.GetCurrencyByName(arrExpl[1],"html_code");
					}
					else
					{
						rate2 = this.currentParking.extendeds[idx].extended_data_value;
					}
					arrRate[1] = rate2;
					break;
				case "rate_tranche_3":
					arrExpl = this.currentParking.extendeds[idx].extended_data_value.split(' ');
					if(arrExpl.length > 1)
					{
						rate3 = arrExpl[0]+"&nbsp;"+this.app.GetCurrencyByName(arrExpl[1],"html_code");
					}
					else
					{
						rate3 = this.currentParking.extendeds[idx].extended_data_value;
					}
					arrRate[2] = rate3;
					break;
				case "rate_24h":
					arrExpl = this.currentParking.extendeds[idx].extended_data_value.split(' ');
					if(arrExpl.length > 1)
					{
						rate24 = arrExpl[0]+"&nbsp;"+this.app.GetCurrencyByName(arrExpl[1],"html_code");
					}
					else
					{
						rate24 = this.currentParking.extendeds[idx].extended_data_value;
					}
					arrRate[3] = rate24;
					break;
				default:
					break;
			}
		}
		
		var arrLength = arrRate.length;
		var index = 1;
		var htmlString = '<table id="parkinginfo_tarrifs_table" border="0" cellpadding="0" cellspacing="0">';
				htmlString += '<tr>';
					htmlString += '<td class="parkinginfoListLeft"><span>${sc3d_rates}</span></td>';
					htmlString += '<td class="parkinginfoListRight"><span>&nbsp;</span></td>';
				htmlString += '</tr>';
				htmlString += '<tr><td colspan="2" height="36"></td></tr>';								
		var nrHours = "";
		
		var nonStopHours = "${sc3d_hours}";
		
		for (var i = 0; i < arrLength; i++)
		{
			if (i == 0) nrHours = "01H00";
			if (i == 1) nrHours = "02H00";
			if (i == 2) nrHours = "03H00";
			if (i == 3) nrHours = "24 "+nonStopHours;
			
			if (index % 2 != 0) 
			{
				htmlString += "<tr>";
				htmlString += '<td class="parkinginfoListLeft"><div class="parkinginfo_rate_label">'+nrHours+' :&nbsp;</div><div class="parkinginfo_rate_value">'+arrRate[i]+'</div></td>';
			}
			if (index % 2 == 0) 
			{
				htmlString += '<td class="parkinginfoListLeft"><div class="parkinginfo_rate_label2">'+nrHours+' :&nbsp;</div><div class="parkinginfo_rate_value">'+arrRate[i]+'</div></td>';
				htmlString += "</tr>";
				htmlString += '<tr><td colspan="2" height="36"></td></tr>';
			}
			
			index++;
		}
		htmlString += '</table>';
		
		$(".parking_infobox_html_rates").html(htmlString);
	};
	this.ParkingInfoEuroScreenScroll = function ()
	{
		this.StopParkingInfoScreenScroll();
		scrollTitle = this.scrollText.StartScroll('#parkinginfo_text_title_euro');
	};
	this.CloseParkingInfoEurosScreen = function()
	{
		$('#parkinginfo_content_panel_euro').hide();
	};	
	/* SC3d end */	
	
	this.Terminate = function()
	{
		this.app = null;
		this.scroller = null;
	};
		
	// Storage handle and save START    
    this.StorageParkingInfoDataSave = function ()
	{
		data =  {favorite_parkings : this.listFavoriteList};
		
		PORTAL.storage.put(Application.CONSTANTS.STORAGE_PREFIX+Application.CONSTANTS.STORAGE_PARKINGINFO, data ,false, function(){}, function(){});								    	
	};
	this.HandleStorageParkingInfo = function(data)
	{
		if (data != null)
		{
			if(data.favorite_parkings != null && data.favorite_parkings.length != null && data.favorite_parkings.length >0)
			{
				this.listFavoriteList = data.favorite_parkings;
			}
		}
		
		this.intialStorageLoadCompleted = true;
	};  
	this.HandleStorageParkingInfoError = function()
	{
		this.intialStorageLoadCompleted = true;
	};
    // Storage handle and save END
    
	/*function to init*/
	this.Init = function()
	{
		PORTAL.storage.get(Application.CONSTANTS.STORAGE_PREFIX+Application.CONSTANTS.STORAGE_PARKINGINFO, proxy(this.HandleStorageParkingInfo, this), proxy(this.HandleStorageParkingInfoError, this));		
	};
	this.Init();
};