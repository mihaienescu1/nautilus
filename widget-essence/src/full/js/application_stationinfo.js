Application.StationInfo = function(app)
{
	this.app = app;
	this.sortMode = 'distance';
	
	this.scroller = null;
	this.scrollText = null;
	
	this.currentPage = 1;
	this.currentFavoritePage = 1;	
	this.currentTab = '';	
	this.currentStation = null;
	this.currentStationLogo = "default";
	this.focusedStation = null;
	this.particular_types = [];
	
	this.priceInterval = 0;
	this.priceTimeout = 0;
	
	this.logoList = [
				"8_a_huit",
				"agip",
				"apple_green",
				"armorine",
				"as24",
				"asda",
				"atac",
				"auchan",
				"avia",
				"baxter_johnston",
				"bfl",
				"bp",
				"bricomarche",
				"bwoc",
				"calor",
				"carrefour",
				"casino",
				"cepsa",
				"champion",
				"colruyt",
				"coop",
				"coop2",
				"cora",
				"default",
				"dyneff",
				"ecocomarche",
				"ecomarche",
				"ed",
				"elan",
				"elf",
				"esso",
				"favorite",
				"fina",
				"franprix",
				"galp",
				"gb",
				"geant",
				"gleaner",
				"gulf",
				"harvest",
				"highland",
				"intermarche",
				"jet",
				"keltic",
				"keyfuels",
				"leader_price",
				"leaderprice",
				"leclerc",
				"match",
				"maxi_coop",
				"maxi_marche",
				"maxicoop",
				"maximarche",
				"maxol",
				"migros",
				"morrisons",
				"murco",
				"murphy",
				"netto",
				"northern",
				"oil",
				"power",
				"premier_lpg",
				"q8",
				"repsol",
				"rix",
				"safeway",
				"sainsburys",
				"scottish",
				"shell",
				"shopi",
				"simply",
				"simply_market",
				"somerfield",
				"spar",
				"super_u",
				"supercasino",
				"systeme_u",
				"tamoil",
				"tesco",
				"texaco",
				"total",
				"waitrose",
				"wcf"
			];
	
	// specify from what list is the current station selected so that we know where we go back to
	// possible values: list, search, favorites
	this.currentStationFromList = "";
	
	this.favoriteList = [];
	
	this.gasPrice = 0;
	this.gasPriceTemp = 0;
	this.newGasPrice = 0;
	this.station = null;
	this.IMEI = null;
	
	this.listData = null;
	
	this.listFavoriteList = [];
	this.listFavoriteToDelete = [];
	
	this.RefreshContentList = true;
	
	this.originScreen = "";
	this.canUseGps = null;
	this.notificationWidget = null;
	
	/* flag to mark if the storage loading in the class initialization is completed */
	this.intialStorageLoadCompleted = false;
	
	this.GetStationLogo = function(dataArray)
	{
		icon = "";
		if(dataArray.brand != null)
		{
			icon = new String(dataArray.brand).toLowerCase();
		}
		
		// Exception
		switch(icon)
		{
			case "carrefour market" : icon = "carrefour";
				break;
		}
		
		cleanedIconName = icon.replace("-","_").replace(" ", "_").replace("í", "i").replace("ï", "i").replace("ì", "i").replace("î", "i").replace("é", "e").replace("ë", "e").replace("è", "e").replace("ê", "e").replace("ò", "o").replace("ö", "o").replace("ò", "o").replace("ô", "o").replace("á", "a").replace("ä", "a").replace("à", "a").replace("â", "a").replace("œ", "o").replace("?", "").replace("!", "");

		logo = "default";
		
		for(var j = 0; j < this.logoList.length; j++)
		{
			if(cleanedIconName == this.logoList[j])
			{
				logo = this.logoList[j];
				break;
			}
		}
		
		switch(logo)
		{
			case "8_a_huit" : logo = "./images/logo_8_a_huit.png";
				break;
			case "agip" : logo = "./images/logo_agip.png";
				break;
			case "apple_green" : logo = "./images/logo_apple_green.png";
				break;
			case "armorine" : logo = "./images/logo_armorine.png";
				break;
			case "as24" : logo = "./images/logo_as24.png";
				break;
			case "asda" : logo = "./images/logo_asda.png";
				break;
			case "atac" : logo = "./images/logo_atac.png";
				break;
			case "auchan" : logo = "./images/logo_auchan.png";
				break;
			case "avia" : logo = "./images/logo_avia.png";
				break;
			case "baxter_johnston" : logo = "./images/logo_baxter_johnston.png";
				break;
			case "bfl" : logo = "./images/logo_bfl.png";
				break;
			case "bp" : logo = "./images/logo_bp.png";
				break;
			case "bricomarche" : logo = "./images/logo_bricomarche.png";
				break;
			case "bwoc" : logo = "./images/logo_bwoc.png";
				break;
			case "calor" : logo = "./images/logo_calor.png";
				break;
			case "carrefour" : logo = "./images/logo_carrefour.png";
				break;
			case "casino" : logo = "./images/logo_casino.png";
				break;
			case "cepsa" : logo = "./images/logo_cepsa.png";
				break;
			case "champion" : logo = "./images/logo_champion.png";
				break;
			case "colruyt" : logo = "./images/logo_colruyt.png";
				break;
			case "coop" : logo = "./images/logo_coop.png";
				break;
			case "coop2" : logo = "./images/logo_coop2.png";
				break;
			case "cora" : logo = "./images/logo_cora.png";
				break;
			case "default" : logo = "./images/logo_default.png";
				break;
			case "dyneff" : logo = "./images/logo_dyneff.png";
				break;
			case "ecocomarche" : logo = "./images/logo_ecocomarche.png";
				break;
			case "ecomarche" : logo = "./images/logo_ecomarche.png";
				break;
			case "ed" : logo = "./images/logo_ed.png";
				break;
			case "elan" : logo = "./images/logo_elan.png";
				break;
			case "elf" : logo = "./images/logo_elf.png";
				break;
			case "esso" : logo = "./images/logo_esso.png";
				break;
			case "favorite" : logo = "./images/logo_favorite.png";
				break;
			case "fina" : logo = "./images/logo_fina.png";
				break;
			case "franprix" : logo = "./images/logo_franprix.png";
				break;
			case "galp" : logo = "./images/logo_galp.png";
				break;
			case "gb" : logo = "./images/logo_gb.png";
				break;
			case "geant" : logo = "./images/logo_geant.png";
				break;
			case "gleaner" : logo = "./images/logo_gleaner.png";
				break;
			case "gulf" : logo = "./images/logo_gulf.png";
				break;
			case "harvest" : logo = "./images/logo_harvest.png";
				break;
			case "highland" : logo = "./images/logo_highland.png";
				break;
			case "intermarche" : logo = "./images/logo_intermarche.png";
				break;
			case "jet" : logo = "./images/logo_jet.png";
				break;
			case "keltic" : logo = "./images/logo_keltic.png";
				break;
			case "keyfuels" : logo = "./images/logo_keyfuels.png";
				break;
			case "leader_price" : logo = "./images/logo_leader_price.png";
				break;
			case "leaderprice" : logo = "./images/logo_leaderprice.png";
				break;
			case "leclerc" : logo = "./images/logo_leclerc.png";
				break;
			case "match" : logo = "./images/logo_match.png";
				break;
			case "maxi_coop" : logo = "./images/logo_maxi_coop.png";
				break;
			case "maxi_marche" : logo = "./images/logo_maxi_marche.png";
				break;
			case "maxicoop" : logo = "./images/logo_maxicoop.png";
				break;
			case "maximarche" : logo = "./images/logo_maximarche.png";
				break;
			case "maxol" : logo = "./images/logo_maxol.png";
				break;
			case "migros" : logo = "./images/logo_migros.png";
				break;
			case "morrisons" : logo = "./images/logo_morrisons.png";
				break;
			case "murco" : logo = "./images/logo_murco.png";
				break;
			case "murphy" : logo = "./images/logo_murphy.png";
				break;
			case "netto" : logo = "./images/logo_netto.png";
				break;
			case "northern" : logo = "./images/logo_northern.png";
				break;
			case "oil" : logo = "./images/logo_oil.png";
				break;
			case "power" : logo = "./images/logo_power.png";
				break;
			case "premier_lpg" : logo = "./images/logo_premier_lpg.png";
				break;
			case "q8" : logo = "./images/logo_q8.png";
				break;
			case "repsol" : logo = "./images/logo_repsol.png";
				break;
			case "rix" : logo = "./images/logo_rix.png";
				break;
			case "safeway" : logo = "./images/logo_safeway.png";
				break;
			case "sainsburys" : logo = "./images/logo_sainsburys.png";
				break;
			case "scottish" : logo = "./images/logo_scottish.png";
				break;
			case "shell" : logo = "./images/logo_shell.png";
				break;
			case "shopi" : logo = "./images/logo_shopi.png";
				break;
			case "simply" : logo = "./images/logo_simply.png";
				break;
			case "simply_market" : logo = "./images/logo_simply_market.png";
				break;
			case "somerfield" : logo = "./images/logo_somerfield.png";
				break;
			case "spar" : logo = "./images/logo_spar.png";
				break;
			case "super_u" : logo = "./images/logo_super_u.png";
				break;
			case "supercasino" : logo = "./images/logo_supercasino.png";
				break;
			case "systeme_u" : logo = "./images/logo_systeme_u.png";
				break;
			case "tamoil" : logo = "./images/logo_tamoil.png";
				break;
			case "tesco" : logo = "./images/logo_tesco.png";
				break;
			case "texaco" : logo = "./images/logo_texaco.png";
				break;
			case "total" : logo = "./images/logo_total.png";
				break;
			case "waitrose" : logo = "./images/logo_waitrose.png";
				break;
			case "wcf" : logo = "./images/logo_wcf.png";
				break;
			default : logo = "./images/logo_default.png";
				break;
		}
		
		return logo;
	};
	

	// SC1 START
	
	this.ShowContentList = function()
	{
		PORTAL.showConfigButton(true);
		
		this.newGasPrice = 0;
		this.scrollText = new Application.TextScroller();
		$('#content_list_module').show();
				
		$(".content_list_sort_button").removeClass('pressed').bind('click', proxy(this.HandleSortButton, this));
				
		//favorites
		$("#content_list_btn_favorites").bind('mousedown', function ()
    	{    		
    		$("#content_list_btn_favorites").attr('class','content_list_btn_favorites_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#content_list_btn_favorites").attr('class','content_list_btn_favorites_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#content_list_btn_favorites").attr('class','content_list_btn_favorites_off');
    	}).bind('click', proxy(this.HandleFavoritesButton, this));
		
		//search		
		$("#content_list_btn_search").bind('mousedown', function ()
    	{    		
    		$("#content_list_btn_search").attr('class','content_list_btn_search_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#content_list_btn_search").attr('class','content_list_btn_search_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#content_list_btn_search").attr('class','content_list_btn_search_off');
    	}).bind('click', proxy(this.HandleSearchButton, this));
		
		$('#content_list_list').delegate(".content_list_item", "click", proxy(this.HandleContentListStationClick, this));
		
		$('#content_list').show();		
		if (this.canUseGps == null || this.canUseGps == "no") 
		{			
			gpsWarningWidget = new Application.ConfirmationWidget("#content_list_module", proxy(this.HandleOkConfirmationClick, this), proxy(this.HandleCancelConfirmationClick, this), "${gps_confirmation_message}", "${gps_authorization_accept}", "${gps_authorization_not_accept}");
		}
		else 
		{
			this.StationInfoWSCall();
		}
	};
	
	this.StationInfoWSCall = function ()
	{
		if(this.RefreshContentList == true)
		{
			//call WS
			if(this.app.gpsPosition.latitude == 0 && this.app.gpsPosition.longitude == 0 && this.app.networkStatus == false)
			{
				var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_network_gps}</div></div>';
				$("#content_list_list").html(itm);
			}
			else if(this.app.gpsPosition.latitude == 0 && this.app.gpsPosition.longitude ==0)
			{
				var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_gps}</div></div>';
				$("#content_list_list").html(itm);
			}
			else if(this.app.networkStatus == false)
			{
				var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_network}</div></div>';
				$("#content_list_list").html(itm);
			}
			else
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
				
				this.app.ShowLoading();
				this.GetStationsNearby();
			}
			
		}
		else
		{			
			this.scroller = new Application.ScrollerWidget('#content_list_scroller', '#content_list_list', 3, this.listData, proxy(this.ContentListItemConstructorCallback,this));			
			//scroll to current page
			while(this.scroller.GetCurrentPage() != this.currentPage && this.scroller.GetCurrentPage() < this.scroller.maxPages)
				this.scroller.HandleMoveDown();
		}
		if(this.sortMode == 'distance')
			$("#content_list_btn_distance").addClass('pressed');
		else if(this.sortMode == 'price')
			$("#content_list_btn_price").addClass('pressed');		
		this.app.SetIconBeforeAction(proxy(this.CloseContentList, this));
		this.app.SetParametersBeforeAction(proxy(this.CloseContentList, this));
	};
	
	this.HandleOkConfirmationClick = function () 
	{
		this.canUseGps = true;
		this.app.GetParametersModule().StorageParametersDataSave();
				
		$('#settings_choose_settings_button4 .settings_choose_settings_button_title').html("${sc10_refuse_gps}");
		this.StationInfoWSCall();				
	};
	
	this.HandleCancelConfirmationClick = function () 
	{
		this.canUseGps = "no";
		this.app.GetParametersModule().StorageParametersDataSave();
				
		$('#settings_choose_settings_button4 .settings_choose_settings_button_title').html("${sc10_autorize_gps}");
	
		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${gps_confirmation_cancel_button_message}</div></div>';
		$("#content_list_list").html(itm);
				
		this.app.SetIconBeforeAction(proxy(this.CloseContentList, this));
		this.app.SetParametersBeforeAction(proxy(this.CloseContentList, this));
	};
	
	this.CloseContentList = function()
	{
		
		if(this.scroller != null)
		{
			this.currentPage = this.scroller.GetCurrentPage();			
			this.scroller.Terminate();
			this.scroller = null;
		}
		
		$('#content_list_module').hide();
		$('#content_list').hide();
		
		$('#content_list_list').empty();
		$('#content_list_list').undelegate();
		$(".content_list_sort_button").unbind();
		$("#content_list_btn_favorites").unbind();
		$("#content_list_btn_search").unbind();	
		
		this.app.HideLoading();
		this.focusedStation = null;
		this.app.SetIconBeforeAction(null);
		this.app.SetParametersBeforeAction(null);
	};
	
	this.HandleSortButton = function(ev)
	{
		var button_id = $(ev.currentTarget).attr('id');
		
		if(button_id == "content_list_btn_distance")
		{
			if(this.sortMode == 'distance')
				return true;
			else
			{
				$(".content_list_sort_button").removeClass('pressed');
				$("#content_list_btn_distance").addClass('pressed');
				if(this.listData != null)
				{
					this.TriggerSort('distance');
				}
				else
				{
					this.sortMode = 'distance';
				}
				
			}
				
		}
		else if(button_id == "content_list_btn_price")
		{
			if(this.sortMode == 'price')
				return true;
			else
			{
				$(".content_list_sort_button").removeClass('pressed');
				$("#content_list_btn_price").addClass('pressed');

				if(this.listData != null)
				{
					this.TriggerSort('price');
				}
				else
				{
					this.sortMode = 'price';
				}
				
			}
				
		}
	};
	
	this.HandleFavoritesButton = function()
	{
		this.CloseContentList();
		this.ShowFavoriteListScreen();
	};
	
	this.HandleSearchButton = function()
	{
		this.CloseContentList();
		this.app.GetSearchModule().ShowSearchMenu();
		
	};
	
	this.TriggerSort = function(mode)
	{	
		switch(mode)
		{
			case "price" : this.listData.sort(proxy(this.SortByPriceComparator, this));
			break;
			
			case "distance" : this.listData.sort(sortByDistance);
			break;
			
			default: this.listData.sort(sortByDistance);
			break;
		}
		this.sortMode = mode;		
		this.scroller.Reset();
	};
	
	
	this.SortByPriceComparator = function (a,b)
	{	
		var p1 = null;
		var p2 = null;	
	
		if(this.app.GetParametersModule().selectedFuel.fuel_code == "SP95&SP95-E10")
		{
			var m1 = 9999;
			var i1 = 0;
			var m2 = 9999;
			var i2 = 0;
			
			for(var i = 0; i < a.gaz_prices.length; i++)
			{
				for(var j = 0; j < this.app.GetParametersModule().selectedFuel.gas_types.length; j++)
				{
					if(a.gaz_prices[i].gaz_kind == this.app.GetParametersModule().selectedFuel.gas_types[j])
					{
						if(a.gaz_prices[i].price < m1)
						{
							m1 = a.gaz_prices[i].price;
							i1 = i;
						}
					}
				}
			}
			
			p1 = a.gaz_prices[i1];
			
			for(var i = 0; i < b.gaz_prices.length; i++)
			{
				for(var j = 0; j < this.app.GetParametersModule().selectedFuel.gas_types.length; j++)
				{
					if(b.gaz_prices[i].gaz_kind == this.app.GetParametersModule().selectedFuel.gas_types[j])
					{
						if(b.gaz_prices[i].price < m2)
						{
							m2 = b.gaz_prices[i].price;
							i2 = i;
						}
					}
				}
			}
			
			p2 = b.gaz_prices[i2];
		}
		else
		{
			for(var i = 0; i < a.gaz_prices.length; i++)
			{
				for(var j = 0; j < this.app.GetParametersModule().selectedFuel.gas_types.length; j++)
				{
					if(a.gaz_prices[i].gaz_kind == this.app.GetParametersModule().selectedFuel.gas_types[j])
					{
						p1 = a.gaz_prices[i];
						break;
					}
				}
			}
			for(var i = 0; i < b.gaz_prices.length; i++)
			{
				for(var j = 0; j < this.app.GetParametersModule().selectedFuel.gas_types.length; j++)
				{
					if(b.gaz_prices[i].gaz_kind == this.app.GetParametersModule().selectedFuel.gas_types[j])
					{
						p2 = b.gaz_prices[i];
						break;
					}
				}
			}
		}
		
		//compare status 
		if(p1.symbol == "0" && p2.symbol != "0")
			return 1;
		else if(p1.symbol != "0" && p2.symbol == "0")
			return -1;
		
		//else compare prices
		if(p1.price > p2.price) 
	    	return 1;
	    else if(p1.price < p2.price)
	    	return -1;
	    else 
	    	return 0; 
	};
	
	/*
	 * Function called by a scroller widget to build the list item
	 */
	this.ContentListItemConstructorCallback = function (itemData)
	{
		var distanceFormat = "";
		var price = 0;
		var symbol = "";
		var price_age = 0;
		var fullAddress;
		this.focusedStation = null;
		
		fullAddress = (itemData.address != "" || itemData.address != null || itemData.address != undefined) ? itemData.address : "";
		if(fullAddress != "")	
		{
			fullAddress+= (itemData.locality != null || itemData.locality != undefined || itemData.locality != "") ? ", " + itemData.locality : "";
		}
		else
		{
			fullAddress+= (itemData.locality != null || itemData.locality != undefined || itemData.locality != "") ? itemData.locality : "";
		}
		
		var logo = this.GetStationLogo(itemData);
		distanceFormat = convertDistance(itemData.distance);
		
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
		
		
		var html = '<div id="station_'+itemData.uuid+'" class="content_list_item '+GetStationColor(symbol)+'">';
			html += '<div class="content_list_item_station_content">';
				html += '<div class="content_list_item_logo_container"><div class="content_list_item_logo"><img src="'+logo+'" class="img_logo" /></div></div>';
				html += '<div class="content_list_item_info_container"><div class="content_list_item_name policy_content_list_name" id="name_scroll_'+itemData.uuid+'">'+itemData.brand+'</div><div class="content_list_item_address policy_content_list_address" id="address_scroll_'+itemData.uuid+'">'+ fullAddress +'</div></div>';
				html += '<div class="content_list_item_distance_container"><div class="content_list_item_distance policy_content_list_distance">'+distanceFormat+'</div></div>';
				html += '<div class="content_list_item_price_container"><div class="content_list_item_price_value policy_content_list_price">'+price+this.app.GetCurrencyByName(itemData.currency,"html_code")+'</div><div class="content_list_item_price_age policy_content_list_age">'+price_age+'${days_symbol}</div></div>';
			html += '</div>';
			html += '<div id="focused_station_'+itemData.uuid+'" class="focused_station"></div>';
		html += '</div>';
		
		return html;
		
	};
	this.HandleContentListStationClick = function(ev)
	{	
		item_idx = $('#content_list_list').children().index("#"+$(ev.currentTarget).attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
		
		wasClicked = false;
		scrollResultName = false;
		scrollResultAddress = false;
						
		if (this.focusedStation != null)
		{
			$('#focused_station_'+this.focusedStation.uuid).hide();
			this.scrollText.StopScroll("#name_scroll_"+this.focusedStation.uuid);
			this.scrollText.StopScroll("#address_scroll_"+this.focusedStation.uuid);			
			
			if (this.focusedStation.uuid == this.listData[item_idx].uuid)
			{
				this.focusedStation = null;
				wasClicked = true;
				
				//close current screen				
				this.CloseContentList();
				this.ShowStationDetailScreen();				
			}
			else
			{
				this.focusedStation = null; 
			}			
		}		
		if (this.focusedStation == null && wasClicked === false)
		{			
			this.focusedStation = this.listData[item_idx];
			this.currentStation = this.listData[item_idx];				
		
			scrollResultName = this.scrollText.StartScroll("#name_scroll_"+this.focusedStation.uuid);				
			scrollResultAddress = this.scrollText.StartScroll("#address_scroll_"+this.focusedStation.uuid);
			
			if(!scrollResultName && !scrollResultAddress)
			{
				//close current screen				
				this.CloseContentList();
				this.ShowStationDetailScreen();
			}
			else
			{
				$('#focused_station_'+this.focusedStation.uuid).show();
			}
		}		
	};
	
	// SC1 END
		
	// CALL WS
	this.GetStationsNearby = function()
	{		
		this.listData = null;
		
		var range = this.app.GetParametersModule().selectedRange;
		var gas = this.app.GetParametersModule().gasListData;
		var brands = this.app.GetParametersModule().makeListData;
		
		var brands_name = new Array();
		var j = 0;		
		for (var i=0; i < brands.length; i++)
		{	
			if (brands[i].selected)
			{
				brands_name[j] = brands[i].brand;
				j++;
			} 
		}
		
		var gas_index = 0;		
		for (var i=0; i < gas.length; i++)
		{
			if (gas[i].selected) gas_index = i;
		}				

		var client = Framework.GetWsClient(Framework.CONSTANTS.WS_CONTENT_GET_GAS_STATIONS_NEAR_BY);
		client.data.latitude 		= this.app.gpsPosition.latitude;
		client.data.longitude 		= this.app.gpsPosition.longitude;
		client.data.radius			= range;
		client.data.gas_kind		= gas[gas_index].fuel_code;

	
		
		if (brands_name.length != brands.length) client.data.brands_name = brands_name;			

		client.data.services_filter = ['all'];
		
		client.SetResponseOkCallBack(proxy(this.WsOk, this));
		
		client.SetResponseErrorCallBack(proxy(this.WsError, this));
		
		client.Send();

	};	
	
	this.WsOk = function(data)
	{		
		if(data == null || data == "" || data.length == 0)
		{
			
			this.app.HideLoading();
			var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_results_found}</div></div>';
			$("#content_list_list").html(itm);
			
			
		}
		else
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
					$("#content_list_list").html(itm);
					return;
				}
			}
			
			switch(this.sortMode)
			{
				case "price" : data.sort(proxy(this.SortByPriceComparator, this));
				break;
				
				case "distance" : data.sort(sortByDistance);
				break;
				
				default: data.sort(sortByDistance);
				break;
			}
			this.listData = data;	
			
		
			
			this.scroller = new Application.ScrollerWidget('#content_list_scroller', '#content_list_list', 3, this.listData, proxy(this.ContentListItemConstructorCallback,this));
			this.app.HideLoading();
			
			//set flag to false
			this.RefreshContentList = false;
		}
	};
	
	this.WsError = function(data)
	{
		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${warning_no_results_found}</div></div>';
			$("#content_list_list").html(itm);
		this.app.HideLoading();
	};
	
	//SC2 START	
	this.ShowFavoriteListScreen = function ()
	{
		$("#favoritelist_modules").show();
		$("#favoritelist_choose_favorites").show();
		
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
			this.scroller = new Application.ScrollerWidget('#favorite_list_scroller', '#favoritelist_choose_favorits_stations', 3, this.listFavoriteList, proxy(this.FavoriteListItemConstructorCallback, this) );
			//scroll to current page			
			while(this.scroller.GetCurrentPage() != this.currentFavoritePage && this.scroller.GetCurrentPage() < this.scroller.maxPages)
				this.scroller.HandleMoveDown();
    	}
    	else
    	{
    		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning policy_notification">${sc2_no_favorite}</div></div>';
    		$("#favoritelist_choose_favorits_stations").html(itm);
    	}
				
		$("#favoritelist_choose_favorits_stations").delegate(".favoritelist_choose_favorits_details", "click", proxy(this.HandleFavoriteListDetailsClick, this));
		$("#favoritelist_choose_favorits_stations").delegate(".favoritelist_choose_favorits_star", "click", proxy(this.HandleAddToFavoriteListClick, this));

		this.app.SetIconBeforeAction(proxy(this.CloseFavoriteListScreen, this));
		this.app.SetParametersBeforeAction(proxy(this.CloseFavoriteListScreen, this));
		this.app.SetBackAction(proxy(this.CloseFavoriteListScreenWithBack, this));
		
		
	};
	
	this.HandleAddToFavoriteListClick = function(ev)
	{		
		item_idx = $('#favoritelist_choose_favorits_stations').children().index("#"+$(ev.currentTarget).parent().attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
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
			
	/*
	 * Function called by a scroller widget to build the list item
	 */
	this.FavoriteListItemConstructorCallback = function (itemData)
	{	
		var distanceFormat = "";
		var gasPrice = itemData.gaz_prices[0];
		var price = "";
		var symbol = "0";
		var price_age = 0;
		var logo = this.GetStationLogo(itemData);
		var fullAddress = "";
		this.focusedStation = null;		
		
		var m = 9999;
		var idx = -1;
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
		
		if(idx  > -1)
		{
			var selected_price = itemData.gaz_prices[idx];
			
			price = selected_price.price;
			price_age = selected_price.age;
			symbol = selected_price.symbol;
		}
		
		
		if(itemData.locality != "" || itemData.locality != null || itemData.locality != undefined)
			fullAddress = itemData.address + " ," + itemData.locality;
		else
			fullAddress = itemData.address;

		
		var html = '<div class="favoritelist_choose_single" id="station_'+itemData.uuid+'"';
			html += '<div class="favoritelist_choose_favorits_details">';
				html += '<div class="settings_choose_make_single_logo"><img src="'+logo+'" class="img_logo" /></div>';				
				html += '<div class="favoritelist_choose_favorits_station_name policy_content_list_name" id="favorite_list_name_scroll_'+itemData.uuid+'">'+itemData.brand+'</div>';
				if(this.canUseGps == true)
					html += '<div class="favoritelist_choose_favorits_station_distance policy_content_list_distance">'+convertDistance(itemData.distance)+'</div>';
				else html += '<div class="favoritelist_choose_favorits_station_distance policy_content_list_distance">&nbsp;</div>';
				html += '<div class="favoritelist_choose_favorits_station_price policy_content_list_price">';
				if(price > 0)
				{
					html += price+this.app.GetCurrencyByName(itemData.currency,"html_code");
				}
				else html+='&nbsp;';
				html += '</div>';					
				html += '<div class="favoritelist_choose_favorits_station_address policy_content_list_address" id="favorite_list_address_scroll_'+itemData.uuid+'">'+fullAddress+'</div>';
				html += '<div class="favoritelist_choose_favorits_station_days policy_content_list_age">';
				if(price > 0)
				{
					html += price_age+"${days_symbol}";
				}
				html += '</div>';	
			html += '</div>';
			html += '<div class="favoritelist_choose_favorits_star ';
			
			if(!this.FavoriteCheckDeletion(itemData.uuid))
			{
				html += 'on';
			}
			else
			{
				html += 'off';
			}
			html += '" /></div>';
			html += '<div id="focused_station_'+itemData.uuid+'" class="focused_station"></div>';
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
	
	this.HandleAddToFavoriteListClick = function(ev)
	{	
		item_idx = $('#favoritelist_choose_favorits_stations').children().index("#"+$(ev.currentTarget).parent().attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
		
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
	
	this.HandleFavoriteListDetailsClick = function(ev)
	{		
		item_idx = $('#favoritelist_choose_favorits_stations').children().index("#"+$(ev.currentTarget).parent().attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
		
		wasClicked = false;
						
		if (this.focusedStation != null)
		{
			$('#focused_station_'+this.focusedStation.uuid).hide();
			this.scrollText.StopScroll("#favorite_list_name_scroll_"+this.focusedStation.uuid);
			this.scrollText.StopScroll("#favorite_list_address_scroll_"+this.focusedStation.uuid);			
			
			if (this.focusedStation.uuid == this.listFavoriteList[item_idx].uuid)
			{
				this.focusedStation = null;
				wasClicked = true;
				
				//close current screen				
				this.currentStationFromList = "favorites";		    
				this.CloseFavoriteListScreen();
				this.ShowStationDetailScreen();				
			}
			else
			{
				this.focusedStation = null; 
			}			
		}		
		if (this.focusedStation == null && wasClicked === false)
		{			
			this.focusedStation = this.listFavoriteList[item_idx];
			this.currentStation = this.listFavoriteList[item_idx];
			
			scrollResultName = this.scrollText.StartScroll("#favorite_list_name_scroll_"+this.focusedStation.uuid);				
			scrollResultAddress = this.scrollText.StartScroll("#favorite_list_address_scroll_"+this.focusedStation.uuid);
			
			if(!scrollResultName && !scrollResultAddress)
			{
				//close current screen				
				this.currentStationFromList = "favorites";		    
				this.CloseFavoriteListScreen();
				this.ShowStationDetailScreen();
			}
			else
			{
				$('#focused_station_'+this.focusedStation.uuid).show();
			}
		}	
	};

	this.CloseFavoriteListScreen = function ()
	{
		if(this.scroller != null)
		{
			this.currentFavoritePage = this.scroller.GetCurrentPage();			
			this.scroller.Terminate();
			this.scroller = null;
		}
		
		$("#favoritelist_choose_favorits_stations").undelegate();
		$("#favoritelist_choose_favorits_stations").undelegate();
		$("#favoritelist_choose_favorites").hide();
		$("#favoritelist_modules").hide();
		
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
    	
    	this.focusedStation = null;
    	this.listFavoriteToDelete = [];

		this.StorageStationInfoDataSave();
    	
    	this.app.SetIconBeforeAction(null);
		this.app.SetParametersBeforeAction(null);
		this.app.SetBackAction(null);
	};
	
	this.CloseFavoriteListScreenWithBack = function()
	{
		this.CloseFavoriteListScreen();
		this.ShowContentList();
	};
	// SC2 END
	
	// SC3 screens START
	this.IsFavorite = function ()
	{
		for(var idx = 0; idx < this.listFavoriteList.length; idx++)
		{
			if(this.listFavoriteList[idx].uuid == this.currentStation.uuid)
			{
				return true;
			}
		}
		
		return false;
	};	

	this.ShowStationDetailScreen = function()
	{
		this.station = this.currentStation;	
		var price;
		
		//get favorite value
		this.IsFavoriteStation();
		this.HandleServiceIcons();
		
		
		$("#stationdetail_modules").show();
		
		$("#stationdetail_all_content").show();
		
		$("#stationdetail_station_logo").attr("src", this.GetStationLogo(this.station));
		
		//set price tab image
		$("#stationdetail_price_logo").attr("src", this.app.GetCurrencyByName(this.currentStation.currency,"image33"));
		
		$('.stationdetail_all_buttons').bind('click', proxy(this.HandleStationDetailScreenSelectionClick, this));
    	$('#stationdetail_station_gasinfo').bind('click', proxy(this.HandleStationDetailGasPriceModificationClick, this));
    	$('.stationdetail_station_properties_favorit').bind('click', proxy(this.HandleStationDetailAddRemoveFavorite, this));
    	
    	if(this.IsFavorite())
		{
			$(".stationdetail_station_properties_favorit").removeClass('on off');
			$(".stationdetail_station_properties_favorit").addClass('on');
		}
		else
		{
			$(".stationdetail_station_properties_favorit").removeClass('on off');
			$(".stationdetail_station_properties_favorit").addClass('off');
		}
    	
    	this.currentTab = 'stationdetail_properties';
    	this.ShowStationDetailPropertiesScreen();
    	
    	this.app.SetIconBeforeAction(proxy(this.CloseStationDetailScreen, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseStationDetailScreen, this));
		this.app.SetBackAction(proxy(this.CloseStationDetailScreenWithBack, this));
    	
	};
	
	this.HandleStationDetailGasPriceModificationClick = function ()
	{	
		this.CloseStationDetailScreen();
		this.ShowStationDetailGasPriceModification();
	};
	
	this.HideAllServiceIcons = function ()
	{
		$('.car_repair').hide();
		$('.tyre_pressure').hide();
		$('.washing_pressure').hide();
		$('.washing_station').hide();
		$('.shop').hide();
		$('.wc').hide();
		$('.open_7').hide();
		$('.open_24').hide();
	};
	
	this.HandleServiceIcons = function ()
    {    	
    	selectedStation = this.currentStation;
    	this.HideAllServiceIcons();

    	if (selectedStation.services)
    	{    	
	    	for(var x = 0; x < selectedStation.services.length; x++)
	    	{
		    	if(selectedStation.services[x] == 'srv_car_repair')
				{				
					$('.car_repair').show();
				}
		    	else if(selectedStation.services[x] == 'srv_tyre_pressure')
				{
					$('.tyre_pressure').show();
				}
				else if(selectedStation.services[x] == 'srv_camping_car_area')
				{
					$('.camping_car_area').show();
				}			
				else if(selectedStation.services[x] == 'srv_washing_station')
				{
					$('.washing_station').show();
				}
				else if(selectedStation.services[x] == 'srv_baby_room')
				{
					$('.baby_room').show();
				}
				else if(selectedStation.services[x] == 'srv_atm')
				{
					$('.atm').show();
				}
				else if(selectedStation.services[x] == 'srv_open_7')
				{
					$('.open_7').show();
				}
				else if(selectedStation.services[x] == 'srv_open_24')
				{
					$('.open_24').show();
				}
	    	}
    	}
	};
	
	this.CloseStationDetailScreen = function()
	{
		$("#stationdetail_all_content").hide();
		$("#stationdetail_modules").hide();
		
		$('.stationdetail_all_buttons').unbind('click');
    	$('#stationdetail_station_gasinfo').unbind('click');
    	$('.stationdetail_station_properties_favorit').unbind('click');
    	
    	$("#stationdetail_station_properties_content").hide();
		$("#stationdetail_station_info_content").hide();
		$("#stationdetail_station_prices_content").hide();
    	
    	this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
		this.app.SetBackAction(null);
		
	};
	
	this.CloseStationDetailScreenWithBack = function()
	{
		this.CloseStationDetailScreen();
		
		if(this.currentStationFromList == "list")
		{	
			this.currentStationFromList = "";
			this.ShowContentList();
		}
		else if(this.currentStationFromList == "search")
		{
			this.currentStationFromList = "";
			this.app.GetSearchModule().ShowSearchPunctualListScreen();
		}
		else if(this.currentStationFromList == "favorites")
		{
			this.currentStationFromList = "";
			this.ShowFavoriteListScreen();
		}
		else
		{
			this.currentStationFromList = "";
			this.ShowContentList();
		}
		
	};
	
	this.HandleStationDetailScreenSelectionClick = function(ev)
	{
		var action_type = $(ev.currentTarget).attr('action');
		
		if(action_type == this.currentTab)
		{
			return false;
		}
		else
		{
			if(this.currentTab == 'stationdetail_properties')
			{
				$("#stationdetail_station_properties_content").hide();
			}
			else if(this.currentTab == 'stationdetail_info')
			{
				$("#stationdetail_station_info_content").hide();
			}
			else if(this.currentTab == 'stationdetail_prices')
			{
				$("#stationdetail_station_prices_content").hide();
			}
			
		}
		
		this.currentTab = action_type;
		
		if(action_type == 'stationdetail_properties')
		{
			this.ShowStationDetailPropertiesScreen();			
		}
		else if(action_type == 'stationdetail_info')
		{
			this.ShowStationDetailInfoScreen();						
		}
		else if(action_type == 'stationdetail_prices')
		{	
			this.ShowStationDetailPricesScreen();			
		}
		
	};
	
	
	this.HandlepushOkCallButton = function ()
	{
		if(this.station.phone != '')
			PORTAL.launchPhoneCall(this.station.phone);
	};	
	
	this.HandlepushNavigateButton = function ()
	{
		PORTAL.navigation.launchGuidance(this.station.latitude, this.station.longitude);
	};
	
	
	//SC3a START
	this.ShowStationDetailPropertiesScreen = function ()
	{
		$("#stationdetail_station_properties_content").show();
		
		var distance = 0.0;
		
		$("#stationdetail_top").removeClass('pressed_prices');
		$("#stationdetail_top").removeClass('pressed_info');
		
		$("#stationdetail_top").addClass('pressed_properties');
		$("#stationdetail_station_properties_content").show();	
		
		//display values
		//name
		
		$("#stationdetail_station_name").html(this.station.station_name);
		//distance
		if(this.canUseGps != true && this.currentStationFromList == "favorites")
			distanceFormat = "&nbsp;";
		else distanceFormat = convertDistance(this.station.distance);
		$("#stationdetail_station_gpsgo_distance").html(distanceFormat);
		//phone number / call
		$("#stationdetail_station_call").show();
		$("#stationdetail_station_call").unbind();
		if(this.station.phone != "")
		{
			$("#stationdetail_station_call").bind("click", proxy(this.HandlepushOkCallButton, this));
		}
		

    	$("#stationdetail_station_gpsgo").bind('click', proxy(this.HandlepushNavigateButton, this));
    	
		var price = 0;
		var gas_kind = "";
		var symbol = "";
		var price_age = "";
		var name = "";
		
		var m = 9999;
		var idx = -1;
		
		for(var i = 0; i < this.currentStation.gaz_prices.length; i++)
		{
			for(var j = 0; j < this.app.GetParametersModule().selectedFuel.gas_types.length; j++)
			{
				if(this.currentStation.gaz_prices[i].gaz_kind == this.app.GetParametersModule().selectedFuel.gas_types[j])
				{
					if(this.currentStation.gaz_prices[i].price < m)
					{
						m = this.currentStation.gaz_prices[i].price;
						idx = i;
					}
				}
			}
		}
		
		if(idx > -1)
		{
			var selected_price = this.currentStation.gaz_prices[idx];
			
			gas_kind = selected_price.gaz_kind;
			
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
			
			if(this.app.GetParametersModule().selectedFuel.fuel_code == "SP95&SP95-E10")
			{
				l1:
				for(var i = 0; i < this.app.GetParametersModule().gasListData.length; i++)
				{
					var found = false;
					if(this.app.GetParametersModule().gasListData[i].fuel_code == "SP95&SP95-E10")
					{
						continue;
					}
					l2:
					for(var j = 0; j < this.app.GetParametersModule().gasListData[i].gas_types.length; j++)
					{
						if(gas_kind == this.app.GetParametersModule().gasListData[i].gas_types[j])
						{
							name = this.app.GetParametersModule().gasListData[i].fuel_name[this.app.GetParametersModule().selectedLanguageCode];
							break l1;
						}
					}
				}
			}
			else
			{
				name = this.app.GetParametersModule().selectedFuel.fuel_name[this.app.GetParametersModule().selectedLanguageCode];
			}
			
			if(name == "")
			{
				name = selected_price.name;
			}
		}
	
		
	
		
		if(this.newGasPrice != 0)
		{
			price = this.newGasPrice;
		}
		else
		{
			this.gasPrice = price;
		}
		
		var priceNameText = "${sc3d_modify_price_for}";
		var newPriceNameText = priceNameText.replace("##", name);
		
		$("#stationdetail_gas_price_modification_title_info").html(newPriceNameText);

		
		$("#stationdetail_station_gasinfo_gasname").html(name);
		if(price > 0)
		{
			$("#stationdetail_station_gasinfo_nrdays").html(price_age + "${days_symbol}");
		}
		else
		{
			$("#stationdetail_station_gasinfo_nrdays").html("");
		}
		
		if(price == 0)
		{
			$("#stationdetail_station_gasinfo_price").html("");
		}
		else
		{
			$("#stationdetail_station_gasinfo_price").html("" + parseFloat(price).toFixed(3) + " " + this.app.GetCurrencyByName(this.station.currency, "html_code"));
		}
		
		//set color
		$("#stationdetail_station_gasinfo").removeClass("green").removeClass("orange").removeClass("red").removeClass("gray");
		$("#stationdetail_station_gasinfo").addClass(GetStationColor(symbol));
		
	};
	
	this.IsFavoriteStation = function ()
	{
		if (this.isFavorite)		
    	{
			$(".stationdetail_station_properties_favorit").removeClass('on').removeClass('off').addClass('on');
    	}
		else
    	{
    		$(".stationdetail_station_properties_favorit").removeClass('on').removeClass('off').addClass('off');	
    	}
	};
	
	this.HandleStationDetailAddRemoveFavorite = function (ev)
	{
		if(this.IsFavorite())
		{
			for(var idx = 0; idx < this.listFavoriteList.length; idx++)
			{
				if(this.listFavoriteList[idx].uuid == this.currentStation.uuid)
				{
					this.listFavoriteList.splice(idx,1);
					$(".stationdetail_station_properties_favorit").removeClass('on off');
					$(".stationdetail_station_properties_favorit").addClass('off');
					break;
				}
			}
		}
		else
		{
			var currentListFavoriteLength = this.listFavoriteList.length;
						
			if (currentListFavoriteLength >= Application.CONSTANTS.FAVORITE_LIST_LIMIT)
			{
				this.notificationWidget = new Application.NotificationWidget("#stationdetail_modules", null, "${sc2_limit_reached}");				
				return false;
			}			
			$(".stationdetail_station_properties_favorit").removeClass('on off');
			$(".stationdetail_station_properties_favorit").addClass('on');			
			this.listFavoriteList.push(this.currentStation);
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
		this.StorageStationInfoDataSave();
	};
	
	this.HandleCallStation = function()
	{
		this.CloseStationDetailScreen();
		this.ShowCallScreen();
	};
	//SC3a END
	
	//SC3b START
	this.ShowStationDetailInfoScreen = function ()
	{
		stationAddress = null;
		
		stationAddress = (this.station.address != "" || this.station.address != null || this.station.address != undefined) ? this.station.address : "";
		if(stationAddress != "")	
		{
			stationAddress+= (this.station.locality != null || this.station.locality != undefined || this.station.locality != "") ? " " + this.station.zipcode + " " + this.station.locality : "";
		}
		else
		{
			stationAddress+= (this.station.locality != null || this.station.locality != undefined || this.station.locality != "") ? this.station.zipcode + " " + this.station.locality : "";
		}
		
		stationAddress = stationAddress.replace(',', ' ');
		
		$("#stationdetail_top").removeClass('pressed_properties');
		$("#stationdetail_top").removeClass('pressed_prices');
		
		$("#stationdetail_top").addClass('pressed_info');
		$("#stationdetail_station_info_content").show();
		
		//address
		$("#stationdetail_station_info_address").html(stationAddress);
		//phone number
		$("#stationdetail_station_info_phonenumber").html(this.station.phone);
		//opening hours
		if(this.station.opening_hours != "")
		{
			$("#stationdetail_station_info_schedule").show();
			$("#stationdetail_station_info_schedule_openinghours").html(this.station.opening_hours);
		}
		else $("#stationdetail_station_info_schedule").hide();
	};
	//SC3b END
	
	//SC3c START
	this.ShowStationDetailPricesScreen = function ()
	{
		
		$("#stationdetail_top").removeClass('pressed_properties');
		$("#stationdetail_top").removeClass('pressed_info');
		$("#stationdetail_top").addClass('pressed_prices');
		$("#stationdetail_station_prices_content").show();
		
		this.scroller = new Application.ScrollerWidget('#stationdetail_station_price_vertical_scroll', '#stationdetail_station_prices_info', 5, this.station.gaz_prices, proxy(this.DetailPricesConstructorCallback,this));
		
	};	
	
	this.DetailPricesConstructorCallback = function(itemData)
	{
		var html = '';
		var name = itemData.name;
		
		html += '<div class="stationdetail_station_prices_info_line">';
			html += '<div class="stationdetail_station_prices_info_gasname">' + name + '</div>';
			html += '<div class="stationdetail_station_prices_info_age">' + itemData.age + '${days_symbol}</div>';
			html += '<div class="stationdetail_station_prices_info_price">' + itemData.price + ' ' + this.app.GetCurrencyByName(this.station.currency, "html_code")+'</div>';
		html += '</div>';
		
		return html;
	};
	
	
	// SC3D START	
	this.ShowStationDetailGasPriceModification = function ()
	{	
		price = 0;

		if(this.newGasPrice == 0)
		{
			price = this.gasPrice;
		}
		else
		{
			price = this.newGasPrice;
		}

		price = parseFloat(price);
		
		$("#stationdetail_modules").show();
		$("#stationdetail_gas_price_modification").show();
		$("#stationdetail_gas_price_modification_price_value").html(price.toFixed(3)+this.app.GetCurrencyByName(this.station.currency, "html_code"));
						
		var currentObject = this;
		this.gasPriceTemp = price;
		
		$('#stationdetail_gas_price_modification_decrease_button').bind('click', proxy(this.HandleStationDetailGasPriceModificationDecrease, this));
		$('#stationdetail_gas_price_modification_decrease_button').bind('mousedown', function() 
		{
			$("#stationdetail_logo_decrease").addClass('pressed');
			
			clearTimeout(currentObject.priceTimeout);
			clearInterval(currentObject.priceInterval);
		    // set timeout for this element
	        currentObject.priceInterval = 0;
	        currentObject.priceTimeout = setTimeout(function(){		    			
	        	currentObject.priceInterval = setInterval(proxy(currentObject.HandleStationDetailGasPriceModificationDecrease, currentObject), 100);	    		
	    	}, 1000);
		
			return false;
		});
		
		$('#stationdetail_gas_price_modification_decrease_button').bind('mouseup', function() 
		{
			$("#stationdetail_logo_decrease").removeClass('pressed');
			
			// clear timeout and interval for this element
	        clearTimeout(currentObject.priceTimeout);
	        clearInterval(currentObject.priceInterval);
		
			return false;
		});
		
		$('#stationdetail_gas_price_modification_decrease_button').bind('mouseout', function() 
		{
			$("#stationdetail_logo_decrease").removeClass('pressed');
			
			// clear timeout and interval for this element
	        clearTimeout(currentObject.priceTimeout);
	        clearInterval(currentObject.priceInterval);
		
			return false;
		});
		
		    
		$('#stationdetail_gas_price_modification_increase_button').bind('click', proxy(this.HandleStationDetailGasPriceModificationIncrease, this));
		$('#stationdetail_gas_price_modification_increase_button').bind('mousedown', function() 
		{
			$("#stationdetail_logo_increase").addClass('pressed');
			
			clearTimeout(currentObject.priceTimeout);
			clearInterval(currentObject.priceInterval);
		    // set timeout for this element
			currentObject.priceInterval = 0;
	        currentObject.priceTimeout = setTimeout(function(){		    			
	        	currentObject.priceInterval = setInterval(proxy(currentObject.HandleStationDetailGasPriceModificationIncrease, currentObject), 100);	    		
	    	}, 1000);
	        
	        return false;
		});
		
		$('#stationdetail_gas_price_modification_increase_button').bind('mouseup', function() 
		{
			$("#stationdetail_logo_increase").removeClass('pressed');
			
			// clear timeout and interval for this element
	        clearTimeout(currentObject.priceTimeout);
	        clearInterval(currentObject.priceInterval);
	        
	        return false;
		});
		
		$('#stationdetail_gas_price_modification_increase_button').bind('mouseout', function() 
		{
			$("#stationdetail_logo_increase").removeClass('pressed');
			
			// clear timeout and interval for this element
	        clearTimeout(currentObject.priceTimeout);
	        clearInterval(currentObject.priceInterval);
	        
	        return false;
		});
	        
		
		//ok button
		$("#stationdetail_gas_price_modification_ok_button").bind('mousedown', function ()
    	{    		
    		$("#stationdetail_gas_price_modification_ok_button").attr('class','stationdetail_gas_price_modification_ok_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#stationdetail_gas_price_modification_ok_button").attr('class','stationdetail_gas_price_modification_ok_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#stationdetail_gas_price_modification_ok_button").attr('class','stationdetail_gas_price_modification_ok_button_off');
    	}).bind('click', proxy(this.HandleStationDetailGasPriceModificationOk, this));
		
		//cancel button
		$("#stationdetail_gas_price_modification_cancel_button").bind('mousedown', function ()
    	{    		
    		$("#stationdetail_gas_price_modification_cancel_button").attr('class','stationdetail_gas_price_modification_cancel_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#stationdetail_gas_price_modification_cancel_button").attr('class','stationdetail_gas_price_modification_cancel_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#stationdetail_gas_price_modification_cancel_button").attr('class','stationdetail_gas_price_modification_cancel_button_off');
    	}).bind('click', proxy(this.HandleStationDetailGasPriceModificationCancel, this));
		
		this.app.SetIconBeforeAction(proxy(this.CloseStationDetailGasPriceModification, this));
		this.app.SetParametersBeforeAction(proxy(this.CloseStationDetailGasPriceModification, this));
		this.app.SetBackAction(proxy(this.CloseStationDetailGasPriceModificationWithBack, this));
		
		warningWidget = new Application.WarningWidget("#stationdetail_modules", proxy(this.CloseStationDetailGasPriceModificationWithBack, this));
	};
	
	this.CloseStationDetailGasPriceModification = function ()
	{
		$("#stationdetail_gas_price_modification").hide();
		$("#stationdetail_modules").hide();
		$('#stationdetail_gas_price_modification_decrease_button').unbind();
		$('#stationdetail_gas_price_modification_increase_button').unbind();
		
		clearTimeout(this.priceTimeout);
		clearInterval(this.priceInterval);
		
		$('#stationdetail_gas_price_modification_ok_button').unbind('click');
		$('#stationdetail_gas_price_modification_cancel_button').unbind('click');
		
		this.app.SetIconBeforeAction(null);
		this.app.SetParametersBeforeAction(null);
		this.app.SetBackAction(null);
		
		warningWidget.TerminateWarning();
	};
	
	this.CloseStationDetailGasPriceModificationWithBack = function ()
	{
		this.CloseStationDetailGasPriceModification();
		this.ShowStationDetailScreen();
		
	};
	
	//gas price decrease
	this.HandleStationDetailGasPriceModificationDecrease = function (ev)
	{		
		if(this.gasPriceTemp <= 0)
		{
			return;
		}
		this.gasPriceTemp = parseFloat(this.gasPriceTemp) - 0.001;
		this.gasPriceTemp = this.gasPriceTemp.toFixed(3);	
		$("#stationdetail_gas_price_modification_price_value").html(this.gasPriceTemp+this.app.GetCurrencyByName(this.station.currency, "html_code"));
	};
	
	//gas price increase
	this.HandleStationDetailGasPriceModificationIncrease = function (ev)
	{		
		this.gasPriceTemp = parseFloat(this.gasPriceTemp) + 0.001;	
		this.gasPriceTemp = this.gasPriceTemp.toFixed(3);
		$("#stationdetail_gas_price_modification_price_value").html(this.gasPriceTemp+this.app.GetCurrencyByName(this.station.currency, "html_code"));
	};
	
	//ok button handle
	this.HandleStationDetailGasPriceModificationOk = function()
	{		
		var old_price = 0;
		var gaz_kind = "";
		
		for(var i = 0; i < this.currentStation.gaz_prices.length; i++)
		{
			for(var j = 0; j < this.app.GetParametersModule().selectedFuel.gas_types.length; j++)
			{
				if(this.currentStation.gaz_prices[i].gaz_kind == this.app.GetParametersModule().selectedFuel.gas_types[j])
				{
					old_price = this.currentStation.gaz_prices[i].price;
					gaz_kind = this.currentStation.gaz_prices[i].gaz_kind;
					break;
				}
			}
		}
		
		// Means that the modified fuel does not exist in the station so we add the new fuel to the ws
		if(gaz_kind == "")
		{
			var station_country_code = this.currentStation.country_code.toLowerCase();
			for(var x = 0; x < this.app.GetParametersModule().selectedFuel.gas_types.length; x++)
			{
				var gas_type = this.app.GetParametersModule().selectedFuel.gas_types[x];
				if(gas_type.indexOf(station_country_code+"_") >= 0)
				{
					gaz_kind = gas_type;
					break;
				}
			}
		}
		
		if(parseFloat(old_price) != parseFloat(this.gasPriceTemp))
		{		
			//check if there is network connection
			if(this.app.networkStatus == false)
	    	{
				this.notificationWidget = new Application.NotificationWidget("#stationdetail_gas_price_modification", proxy(this.CloseStationDetailGasPriceModificationWithBack, this), "${warning_no_network}");				
				return false;
	    	}
	    	else
	    	{
	    		var addSugestionPrice = Framework.GetWsClient(Framework.CONSTANTS.WS_CONTENT_ADD_PRICE_SUGGESTION);
				addSugestionPrice.data.uuid 	 	= this.station.uuid;
				addSugestionPrice.data.gaz_kind 	= gaz_kind;
				addSugestionPrice.data.old_price	= old_price;
				addSugestionPrice.data.new_price	= this.gasPriceTemp;
				addSugestionPrice.data.device_uuid	= this.IMEI;
				
				
				addSugestionPrice.SetResponseOkCallBack(proxy(this.HandleAddSuggestedPriceResponseOk, this));
				
				addSugestionPrice.SetResponseErrorCallBack(proxy(this.HandleAddSuggestedPriceResponseError, this));
				
				addSugestionPrice.Send();
				
				// Switching back the original price;
				this.gasPriceTemp = old_price;
				
				this.newGasPrice = this.gasPriceTemp;
	    	}
		}
		else
		{
			this.CloseStationDetailGasPriceModification();
			this.ShowStationDetailScreen();
		}
		
	};
	
	this.HandleAddSuggestedPriceResponseOk = function(data)
	{
		new Application.NotificationWidget("#stationdetail_gas_price_modification", proxy(this.CloseStationDetailGasPriceModificationWithBack, this), "${sc3_price_change_notification}");
	};
	
	this.HandleAddSuggestedPriceResponseError = function(data)
	{
		this.newGasPrice = 0;
		this.CloseStationDetailGasPriceModification();
		this.ShowStationDetailScreen();
		
	};
	
	this.GetImei = function(data)
	{
		this.IMEI = data.IMEI;
	};
	// ws call
	
		
	//cancel button handle
	this.HandleStationDetailGasPriceModificationCancel = function ()
	{
		this.CloseStationDetailGasPriceModification();
		this.ShowStationDetailScreen();
	};	
	// SC3D END
	
	// SC3 screens END
	
	this.Terminate = function()
	{
		this.app = null;
		this.scroller = null;
	};
	
	// Storage handle and save START
	this.StorageStationInfoDataSave = function ()
	{
		data = {search_station_favorites	: this.listFavoriteList};
		
		PORTAL.storage.put(Application.CONSTANTS.STORAGE_PREFIX+Application.CONSTANTS.STORAGE_STATIONINFO, data, false, function(){}, function(){});		
	};
	this.HandleStorageStationInfo = function(data)
	{
		if (data != null)
		{
			if (data.search_station_favorites != null && data.search_station_favorites.length != null && data.search_station_favorites.length > 0)
			{
				this.listFavoriteList = data.search_station_favorites;
			}
		}
		
		this.intialStorageLoadCompleted = true;
	};
	this.HandleStorageStationInfoError = function()
	{
		this.intialStorageLoadCompleted = true;
	};
	// Storage handle and save END	
	
	this.Init = function()
	{
		PORTAL.storage.get(Application.CONSTANTS.STORAGE_PREFIX+Application.CONSTANTS.STORAGE_STATIONINFO, proxy(this.HandleStorageStationInfo, this), proxy(this.HandleStorageStationInfoError, this));
		PORTAL.identification.imei(proxy(this.GetImei, this), function(){}); 
	};
	
	this.Init();
};
