Application.Parameters = function(app)
{
	this.app = app;
	this.currentList = new Array();	
	this.scroller = null;
	this.selectedRange = '';
	
	this.zoneListData = [ {id: 5, value:5, name_km: '5Km' , name_mi: '3Mls' , selected : false},
	                      {id: 10, value:10, name_km: '10Km' , name_mi: '6Mls' , selected : false},
	                      {id: 15, value:15, name_km: '15Km' , name_mi: '9Mls' , selected : false},
	                      {id: 8, value:20, name_km: '20Km' , name_mi: '12Mls' , selected : false},
	                      {id: 9, value:25, name_km: '25Km' , name_mi: '15Mls' , selected : false},
	                      {id: 10, value:30, name_km: '30Km' , name_mi: '18Mls' , selected : false},
	                      {id: 11, value:35, name_km: '35Km' , name_mi: '21Mls' , selected : false},
	                      {id: 12, value:40, name_km: '40Km' , name_mi: '24Mls' , selected : false},
	                      {id: 13, value:45, name_km: '45Km' , name_mi: '26Mls' , selected : false},
	                      {id: 14, value:50, name_km: '50Km' , name_mi: '29Mls' , selected : true}
	];
	
	this.selectedRange = 50;
	
	/* flag to mark if the storage loading in the class initialization is completed */
	this.intialStorageLoadCompleted = false;
	
	
	this.helpListHtmlData = [{html: 
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_spacer"></div>' +	
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_info">' +
			'<div class="parameters_choose_help_img_green"></div>' +
			'<div class="parameters_choose_help_text policy_help">' +
			'${sc12_parking_disponibile}' +
			'</div>' +
		'</div>' +
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_info">' +
			'<div class="parameters_choose_help_img_orange"></div>' +
			'<div class="parameters_choose_help_text policy_help">' +
			'${sc12_parking_complet}' +
			'</div>' +
		'</div>' +
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_info">' +
			'<div class="parameters_choose_help_img_red"></div>' +
			'<div class="parameters_choose_help_text policy_help">' +
			'${sc12_parking_ferme}' +
			'</div>' +		 			
		'</div>' +
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_info">' +
			'<div class="parameters_choose_help_img_black"></div>' +
			'<div class="parameters_choose_help_text policy_help">' +
			'${sc12_aucune_information}' +
			'</div>' +
		'</div>'
	},
	{html :
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_img_electric help_icons_def"></div>' +
		'<div class="parameters_choose_help_table">' +
			'<div class="parameters_choose_help_services_text policy_help">' +
			'${sc12_srv_electric_recharge}' +
			'</div>' +
		'</div>' +
		'<div class="parameters_choose_help_spacer"></div>' +
			'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_img_no_gpl help_icons_def"></div>' +
		'<div class="parameters_choose_help_table">' +
			'<div class="parameters_choose_help_services_text policy_help">' +
			'${sc12_srv_no_Acc_GPL}' +
			'</div>' +
		'</div>' +
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_img_handicapates help_icons_def"></div>' +
		'<div class="parameters_choose_help_table">' +
			'<div class="parameters_choose_help_services_text policy_help">' +
			'${sc12_srv_disabled_person_assistance}' +
			'</div>' +
		'</div>'
	}
	,
	{html : '<div class="parameters_choose_help_spacer"></div>' +
			'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_img_video help_icons_def"></div>' +
		'<div class="parameters_choose_help_table">' +
			'<div class="parameters_choose_help_services_text policy_help">' +
			'${sc12_srv_video_surveillance}' +
			'</div>' +
		'</div>' +
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_img_ascenseur help_icons_def"></div>' +
		'<div class="parameters_choose_help_table">' +
			'<div class="parameters_choose_help_services_text policy_help">' +
			'${sc12_srv_elevator}' +
			'</div>' +
		'</div>' +
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_spacer"></div>' +
		'<div class="parameters_choose_help_img_carwash help_icons_def"></div>' +
		'<div class="parameters_choose_help_table">' +
			'<div class="parameters_choose_help_services_text policy_help">' +
			'${sc12_srv_car_wash}' +
			'</div>'+
		'</div>'
	},
	{html : '<div class="parameters_choose_help_spacer"></div>' +
			'<div class="parameters_choose_help_spacer"></div>' +
			'<div class="parameters_choose_help_img_moto help_icons_def"></div>' +
			'<div class="parameters_choose_help_table">' +
				'<div class="parameters_choose_help_services_text policy_help">' +
				'${sc12_srv_motorcycle_parking}' +
				'</div>' +
			'</div>' +
			'<div class="parameters_choose_help_spacer"></div>' +
			'<div class="parameters_choose_help_spacer"></div>' +
			'<div class="parameters_choose_help_img_wc help_icons_def"></div>' +
			'<div class="parameters_choose_help_table">' +
				'<div class="parameters_choose_help_services_text policy_help">' +
				'${sc12_srv_wc}' +
				'</div>' +
			'</div>'
 	}];
 	
	this.noticeListHtmlData = [{html: 
			'<div class="legende_list_space"></div>'+	
	 		'<div class="help_left policy_help_title">${sc12_legal_preambul_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_preambul_text1}</div>'+		
	 		'<div class="legende_list_space"></div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+	 		
	 		'<div class="help_left policy_help_text">${sc12_legal_preambul_text2}</div>'+		
	 		'<div class="legende_list_space"></div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+	
	 		'<div class="help_left policy_help_title">${sc12_legal_definition_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_definition_text1}</div>'+		
	 		'<div class="legende_list_space"></div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+	
	 		'<div class="help_left policy_help_text">${sc12_legal_definition_text2}</div>'+		
	 		'<div class="legende_list_space"></div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+	
	 		'<div class="help_left policy_help_title">${sc12_legal_article1_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article1_text1}</div>'+		
	 		'<div class="legende_list_space"></div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+	
	 		'<div class="help_left policy_help_text">${sc12_legal_article1_text2}</div>'+		
	 		'<div class="legende_list_space"></div>' +
	 		'<div class="legende_list_space"></div>' +
	 		'<div class="help_left policy_help_title">${sc12_legal_article2_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article2_text1}</div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article2_text2}</div>'+		
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_title">${sc12_legal_article3_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article3_text1}</div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article3_text2}</div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_title">${sc12_legal_article4_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article4_text1}</div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article4_text2}</div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_title">${sc12_legal_article5_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article5_text1}</div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+	 		
	 		'<div class="help_left policy_help_title">${sc12_legal_article6_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article6_text1}</div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+ 		
	 		'<div class="help_left policy_help_title">${sc12_legal_article7_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article7_text1}</div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_title">${sc12_legal_article8_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article8_text1}</div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article8_text2}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_title">${sc12_legal_article9_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article9_text1}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article9_text2}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article9_text3}</div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_title">${sc12_legal_article10_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article10_text1}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article10_text2}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article10_text3}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article10_text4}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article10_text5}</div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_title">${sc12_legal_article11_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article11_text1}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article11_text2}</div>'		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_title">${sc12_legal_article12_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc12_legal_article12_text1}</div>'+
	 		'<div class="legende_list_space"></div>'+
			'<div class="legende_list_space"></div>' +
			'<div class="help_left policy_help_text">' +
			'${widget.name} V${widget.version}' +
			'</div>'	 		
	}];
	
	/*SC10 START*/
	this.ShowParametersScreen = function ()
	{
		$('#parameters_module').show();
		$('#parameters_choose_parameters_content').show();
		
		//zone buttons
    	$('#parameters_choose_parameters_button_zone').bind('click', proxy(this.HandleParametersZoneButtonClick, this));
    	$("#parameters_choose_parameters_button_zone").bind('mousedown', function ()
    	{    		
    		$("#parameters_choose_parameters_button_zone").attr('class','parameters_choose_parameters_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#parameters_choose_parameters_button_zone").attr('class','parameters_choose_parameters_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#parameters_choose_parameters_button_zone").attr('class','parameters_choose_parameters_button_off');
    	});
    	
    	var selectedRange = "";
    	
    	for(var idx = 0; idx < this.zoneListData.length; idx++)
    	{
    		if(this.zoneListData[idx].selected)
    		{
    			unit = "km";
    			unitStr = new String(PORTAL.units.distance());
    			if(unitStr != "") unit = unitStr;
    			if(unit=='miles')
    			{
    				selectedRange = this.zoneListData[idx].name_mi;
    			}
    			else
    			{
    				selectedRange = this.zoneListData[idx].name_km;
    			}
    		}
    	}
    	
    	$("#parameters_choose_parameters_zone_distance").html(selectedRange);
    	
    	//help buttons
    	$('#parameters_choose_parameters_button_help').bind('click', proxy(this.HandleParametersHelpButtonClick, this));
    	$("#parameters_choose_parameters_button_help").bind('mousedown', function ()
    	{    		
    		$("#parameters_choose_parameters_button_help").attr('class','parameters_choose_parameters_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#parameters_choose_parameters_button_help").attr('class','parameters_choose_parameters_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#parameters_choose_parameters_button_help").attr('class','parameters_choose_parameters_button_off');
    	});
    	
    	//gps autorize buttons
    	$('#parameters_choose_parameters_button_gpsuse').bind('click', proxy(this.HandleGpsSwitchButtonClick, this));
    	$("#parameters_choose_parameters_button_gpsuse").bind('mousedown', function ()
    	{    		
    		$("#parameters_choose_parameters_button_gpsuse").attr('class','parameters_choose_parameters_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#parameters_choose_parameters_button_gpsuse").attr('class','parameters_choose_parameters_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#parameters_choose_parameters_button_gpsuse").attr('class','parameters_choose_parameters_button_off');
    	});

    	this.BuildParametersScreen();
    	
    	
    	this.app.SetIconBeforeAction(proxy(this.CloseParametersScreen, this));
    	this.app.SetBackAction(proxy(this.CloseParametersScreenWithBack, this));
    	this.app.SetParametersBeforeAction(null);
	};	
	
	
	this.HandleGpsSwitchButtonClick = function ()
	{
		if(this.app.GetInfosModule().canUseGps == true)
    	{
    		this.app.GetInfosModule().canUseGps = "no";
    		this.StorageParametersDataSave();
    		$('#parameters_choose_parameters_button_gpsuse .parameters_choose_parameters_button_title').html("${sc10_autorize_gps}");
    	}
    	else
    	{
    		this.app.GetInfosModule().canUseGps = true;
    		this.StorageParametersDataSave();
    		$('#parameters_choose_parameters_button_gpsuse .parameters_choose_parameters_button_title').html("${sc10_refuse_gps}");
    	}
    	
    	this.app.GetInfosModule().listRefresh = true;
	};
	
	this.BuildParametersScreen = function ()
	{
		zoneSize = this.zoneListData.length;
		for (i=0; i < zoneSize; i++)
		{
			if (this.zoneListData[i]['selected'])
			{
				$("#parameters_choose_parameters_zone_distance").html(this.zoneListData[i]['name']);
			}
		}		
	};
	
	this.HandleParametersZoneButtonClick = function ()
	{
		this.CloseParametersScreen();
		this.ShowParametersZoneScreen();
	};
	
	this.HandleParametersHelpButtonClick = function ()
	{
		this.CloseParametersScreen();
		this.ShowLegendeChooseScreen();
	};
	
	this.CloseParametersScreen = function ()
	{
		$("#parameters_choose_parameters_button_zone").unbind();
		$('#parameters_choose_parameters_button_help').unbind();		
		$('#parameters_choose_parameters_button_gpsuse').unbind();
		$('#parameters_choose_parameters_content').hide();
		
		this.app.SetIconBeforeAction(null);
		this.app.SetParametersBeforeAction(null);
    	this.app.SetBackAction(null);
	};
	
	this.CloseParametersScreenWithBack = function ()
	{
		this.CloseParametersScreen();
		this.app.GetInfosModule().ShowListScreen();
	};
	//SC10 END
	
	//SC11 START
	this.ShowParametersZoneScreen = function ()
	{	
		$('#parameters_module').show();		
    	$("#parameters_choose_zone_content").show();
 	
    	this.scroller = new Application.ScrollerWidget("#parameters_vertical_scroll", "#parameters_choose_zone_all_zones", 4, this.zoneListData, this.ZoneListItemConstructorCallback);
    	$('#parameters_choose_zone_all_zones').delegate(".parameters_choose_zone_single", "click", proxy(this.HandleParametersZoneClick, this));
    	
    	this.app.SetIconBeforeAction(proxy(this.CloseParametersZoneScreen, this));
    	this.app.SetBackAction(proxy(this.CloseParametersZoneScreenWithBack, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseParametersZoneScreen, this));
	};
	
	this.ZoneListItemConstructorCallback = function (itemData)
	{	
		unit = "km";
    	unitStr = new String(PORTAL.units.distance());
    	if(unitStr != "") unit = unitStr;
    	
    	var html = '<div class="parameters_choose_zone_single" id="parameters_choose_zone_single'+itemData.id+'">';
			html += '<div class="parameters_choose_zone_single_title">';
			if(unit=='miles')
			{
				html += itemData.name_mi;
			}
			else
			{
				html += itemData.name_km;
			}
			html += '</div>';
			html += '<div class="parameters_choose_zone_selected '+(itemData.selected ? "on" : "off" )+'"></div>';
		html += '</div>';
		
		return html;	    
	};
		
    this.HandleParametersZoneClick = function(ev)
    {	
    	item_idx = $('#parameters_choose_zone_all_zones').children().index("#"+$(ev.currentTarget).attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
    	for(i = 0; i < this.zoneListData.length; i++)
    	{
    		if(i == item_idx)
    		{
    			this.zoneListData[i].selected = true;
    		}
    		else
    		{
    			this.zoneListData[i].selected = false;
    		}
    	}
    	
    	$('.parameters_choose_zone_selected', $("#parameters_choose_zone_all_zones")).removeClass('on').removeClass('off').addClass('off');
    	$('.parameters_choose_zone_selected', $(ev.currentTarget)).removeClass('off').addClass('on');
    	
    	this.selectedRange = this.zoneListData[item_idx].value;
    	this.app.GetInfosModule().listRefresh = true;
    	this.app.GetSearchModule().listRefresh = true;
    	
    	this.StorageParametersDataSave();
    	
    	setTimeout(proxy(this.CloseParametersZoneScreenWithTimeout, this), 500);    	
    };
    
    this.CloseParametersZoneScreenWithTimeout = function ()
    {
    	this.CloseParametersZoneScreen();
    	this.app.GetInfosModule().ShowListScreen();
    };
    
    this.CloseParametersZoneScreen = function()
    {    	
    	if(this.scroller != null)
		{
			this.scroller.Terminate();
			this.scroller = null;
		}
    	$('#parameters_choose_zone_all_zones').undelegate(".parameters_choose_zone_single", "click");
    	$("#parameters_choose_zone_content").hide();
    	
    	this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
    	this.app.SetBackAction(null);    	
    };
    
    this.CloseParametersZoneScreenWithBack = function ()
    {
    	this.CloseParametersZoneScreen();
    	this.ShowParametersScreen();
    };
    //SC11 END
    
    //SC12 START
    this.ShowLegendeChooseScreen = function ()
    {
    	$("#parameters_module").show();
    	$("#help_select").show();
    	
    	/* Clicks */
		$('#help_choice_legende').bind('click', proxy(this.HandleLegendChoiceLegende, this));
		$('#help_choice_notice').bind('click', proxy(this.HandleLegendChoiceNotice, this));
		
		this.CheckDrivingStateAndDisableNoticeButton();
						
		$("#help_choice_legende").bind('mousedown', function ()
    	{    		
    		$("#help_choice_legende").addClass('pressed');
    	}).bind('mouseout', function ()
    	{    		
    		$("#help_choice_legende").removeClass('pressed');
    	}).bind('mouseup', function ()
    	{    		
    		$("#help_choice_legende").removeClass('pressed');
    	});
				
		$("#help_choice_notice").bind('mousedown', function ()
		{    		
			$("#help_choice_notice").addClass('pressed');
		}).bind('mouseout', function ()
		{    		
			$("#help_choice_notice").removeClass('pressed');
		}).bind('mouseup', function ()
		{    		
			$("#help_choice_notice").removeClass('pressed');
		});
						
		this.app.SetIconBeforeAction(proxy(this.CloseLegendeChooseScreen, this));
		this.app.SetParametersBeforeAction(proxy(this.CloseLegendeChooseScreen, this));
		this.app.SetBackAction(proxy(this.CloseLegendeChooseScreenWithBack, this));
    };
    this.CheckDrivingStateAndDisableNoticeButton = function ()
    {    	
    	if (PORTAL.car.drivingState() == true)
		{
			$('#help_choice_notice').unbind();
			$("#help_choice_notice").removeClass("pressed");
			$("#help_choice_notice").addClass('disabled');
		}
		window.drivingStateOn = proxy(this.ShowDisabledNoticeButton, this);				
		window.drivingStateOff = proxy(this.HideDisabledNoticeButton, this);
    };
    this.ShowDisabledNoticeButton = function ()
    {    	
    	$('#help_choice_notice').unbind();
    	$("#help_choice_notice").removeClass("pressed");
    	$("#help_choice_notice").addClass('disabled');
    };
    this.HideDisabledNoticeButton = function ()
    {
    	$('#help_choice_notice').bind('click', proxy(this.HandleLegendChoiceNotice, this)) ;
    	$("#help_choice_notice").removeClass('disabled');
    	$("#help_choice_notice").addClass('search_select_buttons_search_byaddress');
    };
    this.HandleLegendChoiceLegende = function()
	{
		this.CloseLegendeChooseScreen();
		this.ShowParametersHelpScreen();
		
	};
	this.HandleLegendChoiceNotice = function()
	{
		this.CloseLegendeChooseScreen();
		this.ShowParametersNoticeScreen();
		
	};
	this.CloseLegendeChooseScreen = function ()
	{
		$('#help_choice_legende').unbind();
		$('#help_choice_notice').unbind();		
		$('#help_select').hide();
		$("#parameters_module").hide();
		
		this.app.SetIconBeforeAction(null);
		this.app.SetParametersBeforeAction(null);
		this.app.SetBackAction(null);
	};
	this.CloseLegendeChooseScreenWithBack = function ()
	{
		this.CloseLegendeChooseScreen();
		this.ShowParametersScreen();
	};
    //SC12 END
    
    //SC12a START
    this.ShowParametersHelpScreen = function ()
	{
    	$('#parameters_module').show();
    	$("#parameters_choose_help_content").show();    	    	    	
    	
    	this.scroller = new Application.ScrollerWidget("#parameters_help_vertical_scroll", "#parameters_choose_help_all_helps", 1, this.helpListHtmlData, this.HelpListConstructorCallBack);
    	
    	this.app.SetIconBeforeAction(proxy(this.CloseParametersHelpScreen, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseParametersNoticeScreen, this));
    	this.app.SetBackAction(proxy(this.CloseParametersHelpScreenWithBack, this));    	
	};
	this.HelpListConstructorCallBack = function (itemData)
	{
		var html  = '<div class="parameters_help_single">';
			html += itemData.html;
			html += '</div>';
			
		return html;
	};
    this.CloseParametersHelpScreen = function ()
    {
    	if(this.scroller != null)
		{
			this.scroller.Terminate();
			this.scroller = null;
		}
    	$('#parameters_module').hide();
    	$("#parameters_choose_help_content").hide();
    	
    	this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
    	this.app.SetBackAction(null);
    };
    
    this.CloseParametersHelpScreenWithBack = function ()
    {
    	this.CloseParametersHelpScreen();
    	this.ShowLegendeChooseScreen();
    };    
    //SC12a END
    
    //SC12b START
    this.ShowParametersNoticeScreen = function ()
	{
    	$('#parameters_module').show();
    	$("#parameters_choose_notice_content").show();    	    	    	
    	
    	this.scroller = new Application.ScrollerWidget("#parameters_notice_vertical_scroll", "#parameters_choose_notice_all_helps", 1, this.noticeListHtmlData, this.NoticeListConstructorCallBack);
    	
    	this.app.SetIconBeforeAction(proxy(this.CloseParametersNoticeScreen, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseParametersNoticeScreen, this));
    	this.app.SetBackAction(proxy(this.CloseParametersNoticeScreenWithBack, this));
    	
    	warningWidget = new Application.WarningWidget("#parameters_choose_notice_content", proxy(this.CloseParametersNoticeScreenWithBack, this));
	};
	this.NoticeListConstructorCallBack = function (itemData)
	{
		var html  = '<div class="parameters_help_single">';
			html += itemData.html;
			html += '</div>';
			
		return html;
	};
    this.CloseParametersNoticeScreen = function ()
    {
    	if(this.scroller != null)
		{
			this.scroller.Terminate();
			this.scroller = null;
		}
    	$('#parameters_choose_zone_all_zones').undelegate(".parameters_choose_zone_single", "click");
    	$("#parameters_choose_notice_content").hide();
    	
    	warningWidget.TerminateWarning();
    	
    	this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
    	this.app.SetBackAction(null);
    };
    
    this.CloseParametersNoticeScreenWithBack = function ()
    {
    	this.CloseParametersNoticeScreen();
    	this.ShowLegendeChooseScreen();
    };    
    //SC12b END
        
    // Storage handle and save START    
    this.StorageParametersDataSave = function ()
	{
		data =  {can_use_gps		: this.app.GetInfosModule().canUseGps,
				 parameters_area	: this.zoneListData
		};
		
		PORTAL.storage.put(Application.CONSTANTS.STORAGE_PREFIX+Application.CONSTANTS.STORAGE_PARAMETERS, data ,false, function(){}, function(){});						    	
	};
	this.HandleStorageParameters = function(data)
	{
		if (data != null)
		{
			if (data.can_use_gps != null)
			{
				this.app.GetInfosModule().canUseGps = data.can_use_gps;
				var approveMsg = "";
				    	
		    	if (data.can_use_gps == true)
				{
		    		approveMsg = "${sc10_refuse_gps}";
				}
		    	else
		    	{
		    		approveMsg = "${sc10_autorize_gps}";
		    	}
		    	
		    	$('#parameters_choose_parameters_button_gpsuse .parameters_choose_parameters_button_title').html(approveMsg);
			}
			
			if(data.parameters_area != null && data.parameters_area.length != null && data.parameters_area.length > 0)
	    	{
	    		this.zoneListData = data.parameters_area;
	    	}
	    	
	    	for(var idx = 0; idx < this.zoneListData.length; idx++)
	    	{
	    		if(this.zoneListData[idx].selected)
	    		{
	    			this.selectedRange = this.zoneListData[idx].value;
	    			break;
	    		}
	    	}
		}
		
		this.intialStorageLoadCompleted = true;
	};   
	this.HandleStorageParametersError = function()
	{
		this.intialStorageLoadCompleted = true;
	};
    // Storage handle and save END
    
    /*function to init*/
    this.Init = function()
    {
    	PORTAL.storage.get(Application.CONSTANTS.STORAGE_PREFIX+Application.CONSTANTS.STORAGE_PARAMETERS, proxy(this.HandleStorageParameters, this), proxy(this.HandleStorageParametersError, this));
    };
    
    this.Init();
};