Application.Parameters = function(app)
{    
	this.app = app;
	
	this.scroller = null;

	this.selectedRange = 50;
	this.selectedLanguage = "";
	this.selectedLanguageCode = "${language_code_string}";
	
	this.gasListData = [];
	this.temporaryGasListData = [];
	this.selectedFuel = null;
	
	this.makeListData = [];
	this.tempMakeListData = [];

	// Used to limit query in certain countries daily
	this.queryLimit = {day : '', counter : 0};
	// Maximum count per day
	this.queryLimitMax = 30;
	// The countries where to apply the limit
	this.queryLimitCountries = {'nl':'','gb':''};
	
	/* flag to mark if the storage loading in the class initialization is completed */
	this.intialStorageLoadCompleted = false;
	
	
	this.originScreen = "";
	
	this.rangeListData = [{id: 31, value: 5, name_km: '5Km' ,  name_mi: '3Mls' , selected : false},
	                      {id: 32, value: 10, name_km: '10Km' ,  name_mi: '6Mls' , selected : false},
	                      {id: 33, value: 15, name_km: '15Km' ,  name_mi: '9Mls' , selected : false},
	                      {id: 34, value: 20, name_km: '20Km' ,  name_mi: '12Mls' , selected : false},
	                      {id: 35, value: 25, name_km: '25Km' ,  name_mi: '15Mls' , selected : false},
	                      {id: 36, value: 30, name_km: '30Km' ,  name_mi: '18Mls' , selected : false},
	                      {id: 37, value: 35, name_km: '35Km' ,  name_mi: '21Mls' , selected : false},
	                      {id: 38, value: 40, name_km: '40Km' ,  name_mi: '24Mls' , selected : false},
	                      {id: 39, value: 45, name_km: '45Km' ,  name_mi: '26Mls' , selected : false},
	                      {id: 40, value: 50, name_km: '50Km' ,  name_mi: '29Mls' , selected : true}
	];
	
	this.languageListData = [ {id: 1, name: '${sc15_fuel_translation_be}' , country_code: "be", selected : false},
		                      {id: 2, name: '${sc15_fuel_translation_lu}' , country_code: "lu", selected : false},
		                      {id: 3, name: '${sc15_fuel_translation_nl}' , country_code: "nl", selected : false},
		                      {id: 4, name: '${sc15_fuel_translation_pt}' , country_code: "pt", selected : false},
		                      {id: 5, name: '${sc15_fuel_translation_at}' , country_code: "at", selected : false},		                      
		                      {id: 6, name: '${sc15_fuel_translation_ch}' , country_code: "ch", selected : false},
		                      {id: 7, name: '${sc15_fuel_translation_pl}' , country_code: "pl", selected : false},
		                      {id: 8, name: '${sc15_fuel_translation_dk}' , country_code: "dk", selected : false},
		                      {id: 9, name: '${sc15_fuel_translation_fi}' , country_code: "fi", selected : false},		                      
		                      {id: 10, name: '${sc15_fuel_translation_no}' , country_code: "no", selected : false},
		                      {id: 11, name: '${sc15_fuel_translation_se}' , country_code: "se", selected : false},
		                      {id: 12, name: '${sc15_fuel_translation_tr}' , country_code: "tr", selected : false},
		                      {id: 13, name: '${sc15_fuel_translation_en}' , country_code: "en", selected : false},
			                  {id: 14, name: '${sc15_fuel_translation_es}' , country_code: "es", selected : false},
			                  {id: 15, name: '${sc15_fuel_translation_it}' , country_code: "it", selected : false},
			                  {id: 16, name: '${sc15_fuel_translation_de}' , country_code: "de", selected : false},
			                  {id: 17, name: '${sc15_fuel_translation_fr}' , country_code: "fr", selected : false}			                  
	];
	this.languageListSelectedData = "";	
	
	this.fuelCodeForGasTypes = [
								{country_code: "be", codes: ["be"]},
								{country_code: "lu", codes: ["lu"]},
								{country_code: "nl", codes: ["nl"]},
								{country_code: "pt", codes: ["pt"]},
								{country_code: "at", codes: ["at"]},								
								{country_code: "ch", codes: ["ch"]},
								{country_code: "pl", codes: ["pl"]},
								{country_code: "dk", codes: ["dk"]},
								{country_code: "fi", codes: ["fi"]},
								{country_code: "no", codes: ["no"]},								
								{country_code: "se", codes: ["se"]},								
								{country_code: "tr", codes: ["tr"]},
								{country_code: "en", codes: ["uk"]},
								{country_code: "es", codes: ["sp"]},
								{country_code: "it", codes: ["it"]},
								{country_code: "de", codes: ["de"]},
								{country_code: "fr", codes: ["fr"]}
	];
	
	
	this.helpListHtmlData = [{html: 
					'<div class="legende_list_row">'+
						'<div class="legende_list_box green"></div>'+
						'<div class="legende_list_upper_text policy_help">'+
						'${sc20_green_flag}'+
						'</div>'+
					'</div>'+
					'<div class="legende_list_space"></div>'+
					'<div class="legende_list_row">'+
						'<div class="legende_list_box orange"></div>'+
						'<span class="legende_list_upper_text policy_help">'+
						'${sc20_orange_flag}'+
						'</span>'+
					'</div>'+
					'<div class="legende_list_space"></div>'+
					'<div class="legende_list_row">'+
						'<div class="legende_list_box red"></div>'+
						'<span class="legende_list_upper_text policy_help">'+
						'${sc20_red_flag}'+
						'</span>'+
					'</div>'+
					'<div class="legende_list_space"></div>'+
					'<div class="legende_list_row">'+
						'<div class="legende_list_box grey"></div>'+
						'<span class="legende_list_upper_text policy_help">'+
						'${sc20_grey_flag}'+
						'</span>'+
					'</div>'+
					'<div class="legende_list_space"></div>'
		},
		{html:
			'<div class="legende_list_row">'+				
				'<div class="legende_list_bottom_box help_atm"></div>'+
				'<div class="legende_list_bottom_text policy_help">'+
				'${sc20_srv_atm}'+
				'</div>'+
			'</div>'+
			'<div class="legende_list_space"></div>'+
			'<div class="legende_list_space"></div>'+
			'<div class="legende_list_row">'+				
				'<div class="legende_list_bottom_box help_childrens"></div>'+
				'<div class="legende_list_bottom_text policy_help">'+
				'${sc20_srv_baby_room}'+
				'</div>'+
			'</div>' +
			'<div class="legende_list_space"></div>'+
			'<div class="legende_list_space"></div>'+
			'<div class="legende_list_row">'+				
				'<div class="legende_list_bottom_box help_trailer"></div>'+
				'<div class="legende_list_bottom_text policy_help">'+
				'${sc20_srv_camping_car_area}'+
				'</div>'+
			'</div>'
			
			},
			{html:
			'<div class="legende_list_row">'+				
				'<div class="legende_list_bottom_box help_carservice"></div>'+
				'<div class="legende_list_bottom_text policy_help">'+
				'${sc20_srv_car_repair}'+
				'</div>'+
			'</div>'+
			'<div class="legende_list_space"></div>'+
			'<div class="legende_list_space"></div>'+
			'<div class="legende_list_row">'+				
				'<div class="legende_list_bottom_box help_nonstop"></div>'+
				'<div class="legende_list_bottom_text policy_help">'+
				'${sc20_srv_open_24}'+
				'</div>'+
			'</div>' +
			'<div class="legende_list_space"></div>'+
			'<div class="legende_list_space"></div>'+
			'<div class="legende_list_row">'+				
				'<div class="legende_list_bottom_box help_alldays"></div>'+
				'<div class="legende_list_bottom_text policy_help">'+
				'${sc20_srv_open_7}'+
				'</div>'+
			'</div>'
			
			},
			{html:
			'<div class="legende_list_row">'+				
				'<div class="legende_list_bottom_box help_tires"></div>'+
				'<div class="legende_list_bottom_text policy_help">'+
				'${sc20_srv_tyre_pressure}'+
				'</div>'+
			'</div>'+
			'<div class="legende_list_space"></div>'+
			'<div class="legende_list_space"></div>'+
			'<div class="legende_list_row">'+				
				'<div class="legende_list_bottom_box help_wash"></div>'+
				'<div class="legende_list_bottom_text policy_help">'+
				'${sc20_srv_washing_station}'+
				'</div>'+
			'</div>'
			}];
			
	this.noticeListHtmlData = [{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +	
	 		'<div class="help_left policy_help_title">${sc20_legal_preambul_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_preambul_text1}</div>'+		
	 		'<div class="legende_list_space"></div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +	 		
	 		'<div class="help_left policy_help_text">${sc20_legal_preambul_text2}</div>'+		
	 		'<div class="legende_list_space"></div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +	
	 		'<div class="help_left policy_help_title">${sc20_legal_definition_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_definition_text1}</div>'+		
	 		'<div class="legende_list_space"></div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +	
	 		'<div class="help_left policy_help_text">${sc20_legal_definition_text2}</div>'+		
	 		'<div class="legende_list_space"></div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +	
	 		'<div class="help_left policy_help_title">${sc20_legal_article1_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_article1_text1}</div>'+		
	 		'<div class="legende_list_space"></div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +	
	 		'<div class="help_left policy_help_text">${sc20_legal_article1_text2}</div>'+		
	 		'<div class="legende_list_space"></div>' +
	 		'<div class="legende_list_space"></div>' +
	 		'<div class="help_left policy_help_title">${sc20_legal_article2_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_article2_text1}</div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +
	 		'<div class="help_left policy_help_text">${sc20_legal_article2_text2}</div>'+		
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_title">${sc20_legal_article3_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_article3_text1}</div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +
	 		'<div class="help_left policy_help_text">${sc20_legal_article3_text2}</div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_title">${sc20_legal_article4_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_article4_text1}</div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_article4_text2}</div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_title">${sc20_legal_article5_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_article5_text1}</div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +	 		
	 		'<div class="help_left policy_help_title">${sc20_legal_article6_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_article6_text1}</div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +	 		
	 		'<div class="help_left policy_help_title">${sc20_legal_article7_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_article7_text1}</div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +
	 		'<div class="help_left policy_help_title">${sc20_legal_article8_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_article8_text1}</div>'
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +
	 		'<div class="help_left policy_help_text">${sc20_legal_article8_text2}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +
	 		'<div class="help_left policy_help_title">${sc20_legal_article9_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_article9_text1}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +
	 		'<div class="help_left policy_help_text">${sc20_legal_article9_text2}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +
	 		'<div class="help_left policy_help_text">${sc20_legal_article9_text3}</div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_title">${sc20_legal_article10_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_article10_text1}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +
	 		'<div class="help_left policy_help_text">${sc20_legal_article10_text2}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +
	 		'<div class="help_left policy_help_text">${sc20_legal_article10_text3}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +
	 		'<div class="help_left policy_help_text">${sc20_legal_article10_text4}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +
	 		'<div class="help_left policy_help_text">${sc20_legal_article10_text5}</div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="legende_list_space"></div>'+
	 		'<div class="help_left policy_help_title">${sc20_legal_article11_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_article11_text1}</div>'	 		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +
	 		'<div class="help_left policy_help_text">${sc20_legal_article11_text2}</div>'		
	},
	{html: 
			'<div class="legende_list_space"></div>'+
			'<div class="parameters_choose_help_spacer"></div>' +
	 		'<div class="help_left policy_help_title">${sc20_legal_article12_title} : </div>'+
	 		'<div class="help_left policy_help_text">${sc20_legal_article12_text1}</div>'+
	 		'<div class="legende_list_space"></div>'+
			'<div class="legende_list_space"></div>' +
			'<div class="help_left policy_help_text">' +
			'${widget.name} V${widget.version}' +
			'</div>'	 		
	}];
		
    // SC10 START
	this.ShowPreferenceScreen = function ()
    {
    	$("#settings_modules").show();
    	$("#settings_choose_settings_content").show();
    	
    	$('#settings_choose_settings_button1').bind('click', proxy(this.HandlePreferencesMenuClick, this));
    	$('#settings_choose_settings_button2').bind('click', proxy(this.HandlePreferencesMenuClick, this));
    	$('#settings_choose_settings_button3').bind('click', proxy(this.HandlePreferencesMenuClick, this));
    	$('#settings_choose_settings_button4').bind('click', proxy(this.HandlePreferencesMenuClick, this));
    	
    	this.CheckDrivingStateAndDisableBudgetButton();
    	
    	//preferances button
    	$("#settings_choose_settings_button1").bind('mousedown', function ()
    	{    		
    		$("#settings_choose_settings_button1").addClass('pressed');
    	}).bind('mouseout', function ()
    	{    		
    		$("#settings_choose_settings_button1").removeClass('pressed');
    	}).bind('mouseup', function ()
    	{    		
    		$("#settings_choose_settings_button1").removeClass('pressed');
    	});
    	
    	// budget button
    	$("#settings_choose_settings_button2").bind('mousedown', function ()
    	{    		
    		$("#settings_choose_settings_button2").addClass('pressed');
    	}).bind('mouseout', function ()
    	{    		
    		$("#settings_choose_settings_button2").removeClass('pressed');
    	}).bind('mouseup', function ()
    	{    		
    		$("#settings_choose_settings_button2").removeClass('pressed');
    	});
    	
    	// help button
    	$("#settings_choose_settings_button3").bind('mousedown', function ()
    	{    		
    		$("#settings_choose_settings_button3").addClass('pressed');
    	}).bind('mouseout', function ()
    	{    		
    		$("#settings_choose_settings_button3").removeClass('pressed');
    	}).bind('mouseup', function ()
    	{    		
    		$("#settings_choose_settings_button3").removeClass('pressed');
    	});
    	
    	// autorize button
    	$("#settings_choose_settings_button4").bind('mousedown', function ()
    	{    		
    		$("#settings_choose_settings_button4").addClass('pressed');
    	}).bind('mouseout', function ()
    	{    		
    		$("#settings_choose_settings_button4").removeClass('pressed');
    	}).bind('mouseup', function ()
    	{    		
    		$("#settings_choose_settings_button4").removeClass('pressed');
    	});
    	    	
    	this.app.SetIconBeforeAction(proxy(this.ClosePreferenceScreen, this));
    	this.app.SetParametersBeforeAction(null);
    	this.app.SetBackAction(proxy(this.ClosePreferenceScreenWithBack, this));
    };
    this.CheckDrivingStateAndDisableBudgetButton = function ()
    {    	
    	if (PORTAL.car.drivingState() == true)
		{
			$('#settings_choose_settings_button2').unbind();
			$("#settings_choose_settings_button2").removeClass("pressed");
			$("#settings_choose_settings_button2").addClass('disabled');
		}
		window.drivingStateOn = proxy(this.ShowDisabledBudgetButton, this);				
		window.drivingStateOff = proxy(this.HideDisabledBudgetButton, this);
    };
    this.ShowDisabledBudgetButton = function ()
    {    	
    	$('#settings_choose_settings_button2').unbind();
    	$("#settings_choose_settings_button2").removeClass("pressed");
    	$("#settings_choose_settings_button2").addClass('disabled');
    };
    this.HideDisabledBudgetButton = function ()
    {
    	$('#settings_choose_settings_button2').bind('click', proxy(this.HandlePreferencesMenuClick, this)) ;
    	$("#settings_choose_settings_button2").removeClass('disabled');
    	$("#settings_choose_settings_button2").addClass('settings_choose_settings_button');
    };
    this.ClosePreferenceScreen = function ()
    {
    	$('#settings_choose_settings_button1').unbind();
    	$('#settings_choose_settings_button2').unbind();
    	$('#settings_choose_settings_button3').unbind();
    	$('#settings_choose_settings_button4').unbind();
    	
    	$("#settings_choose_settings_content").hide();
    	$("#settings_modules").hide();
    	
    	this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
    	this.app.SetBackAction(null);
    };   
    
    this.ClosePreferenceScreenWithBack = function()
    {
    	this.ClosePreferenceScreen();
    	this.app.GetStationInfoModule().ShowContentList();
    };
    
    this.HandlePreferencesMenuClick = function (ev)
    {
		var button_id = $(ev.currentTarget).attr('id');
	
		if(button_id == 'settings_choose_settings_button1')
		{			
			this.ClosePreferenceScreen();
			this.ShowSettingsScreen();
		}
		else if(button_id == 'settings_choose_settings_button2')
		{			
			this.ClosePreferenceScreen();
			this.app.GetBudgetModule().ShowEmailScreen();
		}
		else if(button_id == 'settings_choose_settings_button3')
		{			
			this.ClosePreferenceScreen();
			this.ShowLegendeChooseScreen();
		}	
		else if(button_id == 'settings_choose_settings_button4')
		{		
			this.SwitchGpsAutorization();
		}
    };
    
    // SC10 END

    this.SwitchGpsAutorization = function()
    {
    	if(this.app.GetStationInfoModule().canUseGps == true)
    	{    		    		
    		this.app.GetStationInfoModule().canUseGps = "no";
    		this.StorageParametersDataSave();
    		$('#settings_choose_settings_button4 .settings_choose_settings_button_title').html("${sc10_autorize_gps}");
    	}
    	else
    	{    		    		
    		this.app.GetStationInfoModule().canUseGps = true;
    		this.StorageParametersDataSave();    		
    		$('#settings_choose_settings_button4 .settings_choose_settings_button_title').html("${sc10_refuse_gps}");
    	}
    	
    	this.app.GetStationInfoModule().RefreshContentList = true;
    
    };
    
    // SC11 START    
    this.ShowSettingsScreen = function ()
    {    	
    	$("#settings_modules").show();
    	$('#settings_choose_preference_content').show();
    	for (var i=0; i < this.gasListData.length; i++)
    	{
    		if (this.gasListData[i].selected) $("#settings_choose_preference_title_carburant_selected").html(this.gasListData[i].fuel_name[this.selectedLanguageCode]);	
    	}
    	
    	var selectedRange = "";
    	
    	for(var idx = 0; idx < this.rangeListData.length; idx++)
    	{
    		if(this.rangeListData[idx].selected)
    		{
    			unit = "km";
    			unitStr = new String(PORTAL.units.distance());
    			if(unitStr != "") unit = unitStr;
    			if(unit=='miles')
    			{
    				selectedRange = this.rangeListData[idx].name_mi;
    			}
    			else
    			{
    				selectedRange = this.rangeListData[idx].name_km;
    			}
    		}
    	}
    	
    	$("#settings_choose_preference_title_km_selected").html(selectedRange);    	
    	
    	var lang_name = '';
    	
    	if (!this.selectedLanguage)
    	{
    		lang_code = new String(PORTAL.user.getSystemLanguage());
    		lang_length = this.languageListData.length;
    		for (i=0; i < lang_length; i++)
    		{
    			if (this.languageListData[i].country_code == lang_code)
    			{
    				lang_name = this.languageListData[i].name;    				
			    	this.selectedLanguage = this.languageListData[i].name;
			    	this.languageListData[i].selected = true;
			    	this.languageListSelectedData = this.languageListData[i].country_code;
    			}
    		} 
    	}
    	else
    	{
    		lang_name = this.selectedLanguage;
	    }
	    
    	$("#settings_choose_preference_title_language_selected").html(lang_name);
    	
    	$("#settings_choose_preference_button1").bind('mousedown', function ()
    	{    		
    		$("#settings_choose_preference_button1").addClass('pressed');
    	}).bind('mouseout', function ()
    	{    		
    		$("#settings_choose_preference_button1").removeClass('pressed');
    	}).bind('mouseup', function ()
    	{    		
    		$("#settings_choose_preference_button1").removeClass('pressed');
    	});
    	
    	$("#settings_choose_preference_button2").bind('mousedown', function ()
    	{    		
    		$("#settings_choose_preference_button2").addClass('pressed');
    	}).bind('mouseout', function ()
    	{    		
    		$("#settings_choose_preference_button2").removeClass('pressed');
    	}).bind('mouseup', function ()
    	{    		
    		$("#settings_choose_preference_button2").removeClass('pressed');
    	});
    	
    	$("#settings_choose_preference_button3").bind('mousedown', function ()
    	{    		
    		$("#settings_choose_preference_button3").addClass('pressed');
    	}).bind('mouseout', function ()
    	{    		
    		$("#settings_choose_preference_button3").removeClass('pressed');
    	}).bind('mouseup', function ()
    	{    		
    		$("#settings_choose_preference_button3").removeClass('pressed');
    	});
    	
    	$("#settings_choose_preference_button4").bind('mousedown', function ()
    	{    		
    		$("#settings_choose_preference_button4").addClass('pressed');
    	}).bind('mouseout', function ()
    	{    		
    		$("#settings_choose_preference_button4").removeClass('pressed');
    	}).bind('mouseup', function ()
    	{    		
    		$("#settings_choose_preference_button4").removeClass('pressed');
    	});
    	
    	$('#settings_choose_preference_all_buttons').delegate(".settings_choose_preference_button", "click", proxy(this.HandleSettingsPreferenceClick, this));
    	
    	this.app.SetIconBeforeAction(proxy(this.CloseSettingsScreen, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseSettingsScreen, this));
    	this.app.SetBackAction(proxy(this.CloseSettingsScreenWithBack, this));
    };
    
    this.CloseSettingsScreen = function()
    {
    	
    	$('#settings_choose_preference_all_buttons').undelegate();
    	$("settings_choose_preference_button").unbind();
    	
    	$("#settings_choose_preference_title_carburant_selected").html("");
    	$("#settings_choose_preference_title_km_selected").html("");
    	$("#settings_choose_preference_title_language_selected").html("");
    	
    	$('#settings_choose_preference_content').hide();
    	$("#settings_modules").hide();
    	
    	this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
		this.app.SetBackAction(null);
    };
    
    this.CloseSettingsScreenWithBack = function()
    {
    	this.CloseSettingsScreen();
    	this.ShowPreferenceScreen();
    };
    
    this.HandleSettingsPreferenceClick = function(ev)
    {   
    	var button_id = $(ev.currentTarget).attr('id');    	
		
    	if(button_id == 'settings_choose_preference_button1')
		{    
    		this.CloseSettingsScreen();
			this.ShowGasScreen();
		}
		if(button_id == 'settings_choose_preference_button2')
		{	
			this.CloseSettingsScreen();
			this.ShowMakeScreen();
		}
		if(button_id == 'settings_choose_preference_button3')
		{	
			this.CloseSettingsScreen();
			this.ShowRangeScreen();
		}
		if(button_id == 'settings_choose_preference_button4')
		{			
			this.CloseSettingsScreen();
			this.ShowLanguageScreen();
		}
		
    };
    
    // SC11 END
    
    
    // SC12 START
    
    this.ShowGasScreen = function()
    {    		
    	$("#settings_modules").show();
    	$('#settings_choose_carburants_content').show();
    	
    	$('#settings_choose_carburants_all_carburants').delegate(".search_list_item_colored_bar_h66", "click", proxy(this.HandleSettingsGasClick, this));
    	
    	if(this.app.networkStatus == false)
    	{
    		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning">${warning_no_network}</div></div>';
			$("#settings_choose_carburants_all_carburants").html(itm);
    	}
    	else
    	{
    		
	    	var client = Framework.GetWsClient(Framework.CONSTANTS.WS_CONTENT_GET_LIST_OF_FUEL_TYPE);
	    	var fuelType = PORTAL.car.fuelType();
	    	switch(fuelType)
	    	{
		    	case 0: client.data.device_fuel_types = ["Unleaded"]; break;
		    	case 1: client.data.device_fuel_types = ["Unleaded", "LPG"]; break;
		    	case 2: client.data.device_fuel_types = ["Unleaded", "ERDGAS"]; break;
		    	case 3: client.data.device_fuel_types = ["Diesel"]; break;
		    	case 4: client.data.device_fuel_types = ["Unleaded"]; break;
		    	case 5: client.data.device_fuel_types = ["Unleaded"]; break;
		    	case 6: client.data.device_fuel_types = ["Diesel"]; break;
		    	case 7: client.data.device_fuel_types = []; break;
	    		case 8: client.data.device_fuel_types = []; break;
	    		
	    		default: client.data.device_fuel_types = ["Unleaded"];
	    	}	    	
	    	
			client.SetResponseOkCallBack(proxy(this.HandleGasWSResponseOk, this));			
			client.SetResponseErrorCallBack(proxy(this.HandleGasWSResponseError, this));			
			this.app.ShowLoading();			
			client.Send();    	
    	}
    	
	    if(this.originScreen == "introPage")
	    {
	    	this.app.SetParametersBeforeAction(null);
	    	this.app.SetIconBeforeAction(null);
	    	this.app.SetBackAction(null);
	    }
	    else
	    {
	    	this.app.SetParametersBeforeAction(proxy(this.CloseGasScreen, this));
	    	this.app.SetIconBeforeAction(proxy(this.CloseGasScreen, this));
	    	this.app.SetBackAction(proxy(this.CloseGasScreenWithBack, this));
	    }
	    
    };
    
    this.InArray = function in_array(string, array) 
    {
		for(var i=0; i < array.length; i++) 
		{
			if (array[i] == string) return true;		
		}
		return false;
	};
	
    this.HandleGasWSResponseOk = function (data)
    {    	
    	if(data == null || data == "" || data.length == 0)
    	{
    		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning">${warning_no_results_found}</div></div>';
			$("#settings_choose_make_all_makes").html(itm);
    	}
    	else
    	{		
    		tempData = data;
    		var dataLength = tempData.length;
    		var allGasTypesCodes = new Array();
    		
	    	for (i=0; i < dataLength; i++)
	    	{
	    		var gasTypesCount = tempData[i].gas_types.length;
	    		
	    		allGasTypesCodes[i] = new Array();
	    		
	    		for (j=0; j < gasTypesCount; j++)
	    		{
	    			allGasTypesCodes[i].push(tempData[i].gas_types[j].substr(0,2).toLowerCase());	
	    		}
	    	}
	    		    	
    		var tempGasList = new Array();
    		if(this.gasListData != null && this.gasListData.length != null && this.gasListData.length > 0)
    		{
    			tempGasList = this.gasListData;
    		}
	    	this.gasListData = new Array();
			
			var currentCode = null; 
			var tempAux = 0;
	    	for(var idx = 0; idx < dataLength; idx++)
	    	{
	    		for (i=0; i < this.fuelCodeForGasTypes.length; i++)
				{						
	    			var not_found = 0;
					for (j=0; j < this.fuelCodeForGasTypes[i].codes.length; j++)
					{						
						currentCode = this.fuelCodeForGasTypes[i].codes[j];
						if (!this.InArray(currentCode, allGasTypesCodes[idx])) not_found++;
					}
					
					if(not_found == this.fuelCodeForGasTypes[i].codes.length)
					{
						data[idx].fuel_name[this.fuelCodeForGasTypes[i].country_code] = "";
					}
				}    		
	    		this.gasListData[idx] = {id: data[idx].id , gas_types : data[idx].gas_types, fuel_code : data[idx].fuel_code,  fuel_name : data[idx].fuel_name, selected : false};
				
				if (data[idx].fuel_name[this.selectedLanguageCode] != "") 
				{
					this.temporaryGasListData[idx] = {id: data[idx].id , gas_types : data[idx].gas_types, fuel_code : data[idx].fuel_code,  fuel_name : data[idx].fuel_name, selected : false};
					tempAux++;
				}
				 	    			    		
				if(tempGasList[idx] != null && tempGasList[idx].id != null && tempGasList[idx].selected != null && (this.gasListData[idx].id == tempGasList[idx].id) && tempGasList[idx].selected)
				{
					this.gasListData[idx].selected = true;
					this.temporaryGasListData[idx].selected = true;	
				}				
	    	}
			this.scroller = new Application.ScrollerWidget("#settings_choose_carburants_scroller", "#settings_choose_carburants_all_carburants", 4, this.temporaryGasListData, proxy(this.GasListItemConstructorCallback, this), proxy(this.GasListItemConstructorCallbackSize, this));					
    	}
    	
    	this.app.HideLoading();
    };

    this.HandleGasWSResponseError = function (data)
    {
    	var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning">${warning_no_results_found}</div></div>';
			$("#settings_choose_carburants_all_carburants").html(itm);
    	
    	this.app.HideLoading();
    };
    
    this.GasListItemConstructorCallback = function(itemData)
    {    
    	if(itemData.fuel_name[this.selectedLanguageCode] == "")
    	{
    		return "";
    	}
    	var html = '<div class="search_list_item_colored_bar_h66" id="gas_type_'+itemData.id+'">';
			html += '<div class="settings_choose_carburants_single_title policy_list_name">'+itemData.fuel_name[this.selectedLanguageCode]+'</div>';
			html += '<div class="settings_choose_carburants_selected '+(itemData.selected ? "on" : "off" )+'"></div>';
		html += '</div>';
		
		return html;		
    };
    
    this.GasListItemConstructorCallbackSize = function(itemData)
    {    	
    	var size = 0;
    	var itemSize = itemData.length;
    	
    	return itemSize;
    };
    
    this.HandleSettingsGasClick = function(ev)
    {    	
    	item_idx = $(ev.currentTarget).attr('id').split("_");
    	carburantId = item_idx[2];
    	gasIndex = 0;
		
    	for(i = 0; i < this.gasListData.length; i++)
    	{
    		if(this.gasListData[i].id == carburantId)
    		{
    			this.gasListData[i].selected = true;
    			gasIndex = i;
    		}
    		else
    		{
    			this.gasListData[i].selected = false;
    		}
    	}
    	for(i = 0; i < this.temporaryGasListData.length; i++)
    	{
    		if(this.temporaryGasListData[i].id == carburantId)
    		{
    			this.temporaryGasListData[i].selected = true;
    			gasIndex = i;
    		}
    		else
    		{
    			this.temporaryGasListData[i].selected = false;
    		}
    	}
    	this.selectedFuel = this.gasListData[gasIndex];		    	
    	
    	$('.search_list_item_checkbox', $("#settings_choose_carburants_all_carburants")).removeClass('on').removeClass('off').addClass('off');
    	$('.search_list_item_checkbox', $(ev.currentTarget)).removeClass('off').addClass('on');
    	
    	this.StorageParametersDataSave();    	
    	this.app.GetStationInfoModule().RefreshContentList = true;
    	
    	this.CloseGasScreen();    	
    	
    	if(this.originScreen == "introPage")
    	{
    		this.originScreen = "";
    		this.app.GetStationInfoModule().ShowContentList();
    	}
    	else
    	{
    		this.ShowSettingsScreen();
    	}
    };
    
    this.CloseGasScreen = function()
    {    	
    	if(this.scroller != null)
		{
			this.scroller.Terminate();
			this.scroller = null;
		}
    	
    	$('#settings_choose_carburants_all_carburants').undelegate();
    	$("#settings_choose_carburants_content").hide();
    	$("#settings_modules").hide();
    	
    	this.app.HideLoading();
    	this.app.SetIconBeforeAction(null);
    	this.app.SetParametersBeforeAction(null);
		this.app.SetBackAction(null);    	
    };
    
    this.CloseGasScreenWithBack = function()
    {
    	this.CloseGasScreen();
    	if(this.originScreen == "introPage")
    	{
    		this.originScreen = "";
    		this.app.GetStationInfoModule().ShowContentList();
    	}
    	else
    	{
    		this.ShowSettingsScreen();
    	}
    };
    // SC12 END
    
   

    // SC13 START
    
    this.ShowMakeScreen = function()
    {    	
    	$("#settings_modules").show();
    	$('#settings_choose_make_content').show();
    	
    	if(this.app.gpsPosition.latitude == 0 && this.app.gpsPosition.longitude == 0 && this.app.networkStatus == false)
    	{
    		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning">${warning_no_network_gps}</div></div>';
			$("#settings_choose_make_all_makes").html(itm);
    	}
    	else if(this.app.gpsPosition.latitude == 0 && this.app.gpsPosition.longitude ==0)
    	{
    		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning">${warning_no_gps}</div></div>';
			$("#settings_choose_make_all_makes").html(itm);
    	}
    	else if(this.app.networkStatus == false)
    	{
    		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning">${warning_no_network}</div></div>';
			$("#settings_choose_make_all_makes").html(itm);
    	}
    	else
    	{
	    	this.app.ShowLoading();
			var client = Framework.GetWsClient(Framework.CONSTANTS.WS_CONTENT_GET_LIST_OF_BRAND);
	
			client.data.latitude = this.app.gpsPosition.latitude;
			client.data.longitude = this.app.gpsPosition.longitude;
			//client.data.extended_info = true;
			
			client.SetResponseOkCallBack(proxy(this.HandleMakeWSResponseOk, this));
			
			client.SetResponseErrorCallBack(proxy(this.HandleMakeWSResponseError, this));
			
			client.Send();
    	} 	
    	
    	//ok button    	
    	$("#settings_choose_make_ok_button").bind('mousedown', function ()
    	{    		
    		$("#settings_choose_make_ok_button").attr('class','search_services_ok_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#settings_choose_make_ok_button").attr('class','search_services_ok_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#settings_choose_make_ok_button").attr('class','search_services_ok_button_off');
    	}).bind('click', proxy(this.HandleOkSettingsMake, this));
    	
    	// cancel button
    	$("#settings_choose_make_cancel_button").bind('mousedown', function ()
    	{    		
    		$("#settings_choose_make_cancel_button").attr('class','search_services_cancel_button_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#settings_choose_make_cancel_button").attr('class','search_services_cancel_button_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#settings_choose_make_cancel_button").attr('class','search_services_cancel_button_off');
    	}).bind('click', proxy(this.HandleCancelSettingsMake, this));
    	
    	// select all button
    	$("#settings_choose_make_select_all_button").bind('mousedown', function ()
    	{    		
    		$("#settings_choose_make_select_all_button").attr('class','settings_choose_make_select_all_on');
    	}).bind('mouseout', function ()
    	{    		
    		$("#settings_choose_make_select_all_button").attr('class','settings_choose_make_select_all_off');
    	}).bind('mouseup', function ()
    	{    		
    		$("#settings_choose_make_select_all_button").attr('class','settings_choose_make_select_all_off');
    	}).bind('click', proxy(this.HandleSettingsAllMakes, this));
    	    	    	
    	$('#settings_choose_make_all_makes').delegate(".settings_choose_make_single", "click", proxy(this.HandleSettingsMakeClick, this));
    	
    	this.app.SetIconBeforeAction(proxy(this.CloseMakeScreen, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseMakeScreen, this));
    	this.app.SetBackAction(proxy(this.CloseMakeScreenWithBack, this));
    };    
    
    this.HandleMakeWSResponseOk = function (data)
    {
    	
    	if(data == null || data == "" || data.length == 0)
    	{
    		var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning">${warning_no_results_found}</div></div>';
			$("#settings_choose_make_all_makes").html(itm);
    	}
    	else
    	{
	    	this.tempMakeListData = new Array();
					
	    	for(var idx = 0; idx < data.length; idx++)
	    	{
	    		this.tempMakeListData[idx] = {id: data[idx].id , brand : data[idx].brand , selected : false};
	    		for(var idx2 = 0; idx2 < this.makeListData.length; idx2++)
	    		{
	    			if(this.makeListData[idx2].id == this.tempMakeListData[idx].id)
	    			{
	    				this.tempMakeListData[idx].selected = this.makeListData[idx2].selected;
	    				break;
	    			}
	    		}
	    	}	
			this.app.HideLoading();
			this.scroller = new Application.ScrollerWidget("#settings_choose_make_scroller", "#settings_choose_make_all_makes", 3, this.tempMakeListData, proxy(this.MakeListItemConstructorCallback, this));
	    
	    	//check if all services are selected
	    	var size = this.tempMakeListData.length;
			var totalChecked = 0;
			for(i = 0; i < size; i++)
			{			
				if (this.tempMakeListData[i].selected) totalChecked++;
			}
			
			if (size == totalChecked)
			{
				$("#settings_choose_make_select_all_title_make").html("${sc13_deselect_all}");
			}
			else
			{
				$("#settings_choose_make_select_all_title_make").html("${sc13_select_all}");
			}
    	}
    };
    
    this.HandleMakeWSResponseError = function (data)
    {
    	var itm = '<div style="width:100%;height:100%;display:table;"><div style="margin:auto; display:table-cell; vertical-align:middle;text-align:center;" class="list_warning">${warning_no_results_found}</div></div>';
		$("#settings_choose_make_all_makes").html(itm);
    	
		setTimeout(proxy(this.app.HideLoading, this), 100);	
			
    };
    
    this.CloseMakeScreen = function()
    {
    	if(this.scroller != null)
		{
			this.scroller.Terminate();
			this.scroller = null;
		}
    	
    	$('#settings_choose_make_ok_button').unbind();
    	$('#settings_choose_make_cancel_button').unbind();
    	$('#settings_choose_make_select_all_button').unbind();
    	
    	$('#settings_choose_make_all_makes').undelegate();
    	$("#settings_choose_make_content").hide();
		$("#settings_modules").hide();   
		
		this.app.HideLoading();
		this.app.SetBackAction(null);
		this.app.SetParametersBeforeAction(null);
		this.app.SetIconBeforeAction(null);
		this.app.HideLoading();
    };
    
    this.CloseMakeScreenWithBack = function()
    {
    	this.CloseMakeScreen();
    	this.ShowSettingsScreen();
    };
           
    this.MakeListItemConstructorCallback = function(itemData)
    {    
    	var logo = this.app.GetStationInfoModule().GetStationLogo(itemData);
    	
    	var html = '<div class="settings_choose_make_single" id="make_'+itemData.id+'">';
    		html += '<div class="settings_choose_make_single_logo"><img src="'+logo+'" class="img_logo" /></div>';
			html += '<div class="settings_choose_make_single_title policy_list_name">'+itemData.brand+'</div>';
			html += '<div';			
			if(!itemData.selected)
			{
				html += ' class="settings_choose_make_selected off"';
			}
			else
			{
				html += ' class="settings_choose_make_selected on"';
			}
			html += '></div>';
		html += '</div>';
		
		return html;	
    };
    
    this.HandleSettingsMakeClick = function(ev)
    {    	
    	item_idx = $('#settings_choose_make_all_makes').children().index("#"+$(ev.currentTarget).attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
		var size = this.tempMakeListData.length;
		var totalChecked = 0;
		
		if(this.tempMakeListData[item_idx].selected)
		{
			this.tempMakeListData[item_idx].selected = false;
			
			$("#settings_choose_make_select_all_title_make").html("${sc13_select_all}");
			$('.settings_choose_make_selected', $(ev.currentTarget)).removeClass("on");
			$('.settings_choose_make_selected', $(ev.currentTarget)).addClass("off");
		}
		else
		{
			this.tempMakeListData[item_idx].selected = true;
			
			//check if all services are selected
			for(i = 0; i < size; i++)
			{			
				if (this.tempMakeListData[i].selected) totalChecked++;
			}
			
			if (size == totalChecked)
			{
				$("#settings_choose_make_select_all_title_make").html("${sc13_deselect_all}");
			}
			$('.settings_choose_make_selected', $(ev.currentTarget)).removeClass("off");
			$('.settings_choose_make_selected', $(ev.currentTarget)).addClass("on");			
		}		
    };
    
    this.HandleOkSettingsMake = function(ev)
    {
    	this.app.GetStationInfoModule().RefreshContentList = true; 
    	
    	  	    	
    	this.makeListData = this.tempMakeListData;
    	this.StorageParametersDataSave();    	
    	   	
    	this.CloseMakeScreen();
    	this.ShowSettingsScreen();
    };
    
    this.HandleCancelSettingsMake = function(ev)
    {
    	this.CloseMakeScreen();
    	this.ShowSettingsScreen();
    };
    
    this.HandleSettingsAllMakes = function(ev)
    {
    	var size = this.tempMakeListData.length;
		var totalChecked = 0;
		
		//check if all services are selected
		for(i = 0; i < size; i++)
		{			
			if (this.tempMakeListData[i].selected) totalChecked++;
		}
		
		if (size == totalChecked)
		{
			for(i = 0; i < size; i++)
	    	{
	    		this.tempMakeListData[i].selected = false;
	    	}
	    	$("#settings_choose_make_select_all_title_make").html("${sc13_select_all}");    	
    		$('#settings_choose_make_all_makes .settings_choose_make_selected').removeClass("on");
			$('#settings_choose_make_all_makes .settings_choose_make_selected').removeClass("off");
			$('#settings_choose_make_all_makes .settings_choose_make_selected').addClass("off");
		}
		else
		{
	    	for(i = 0; i < size; i++)
	    	{
	    		this.tempMakeListData[i].selected = true;
	    	}
	    	$("#settings_choose_make_select_all_title_make").html("${sc13_deselect_all}");    	
    		$('#settings_choose_make_all_makes .settings_choose_make_selected').removeClass("on");
			$('#settings_choose_make_all_makes .settings_choose_make_selected').removeClass("off");
			$('#settings_choose_make_all_makes .settings_choose_make_selected').addClass("on");
		}
    };
    
    // SC13 END
    
    
    
    // SC14 START
    this.ShowRangeScreen = function()
    {
    	$("#settings_modules").show();
    	$('#settings_choose_zone_content').show();
    	
    	$('#settings_choose_range_all_ranges').delegate(".search_list_item_colored_bar_h66", "click", proxy(this.HandleRangeItemClick, this));
    	
    	this.scroller = new Application.ScrollerWidget("#settings_choose_range_scroller", "#settings_choose_range_all_ranges", 4, this.rangeListData, this.RangeListItemConstructorCallback);
    	
    	this.app.SetIconBeforeAction(proxy(this.CloseRangeScreen, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseRangeScreen, this));
    	this.app.SetBackAction(proxy(this.CloseRangeScreenWithBack, this));
    };
    
    this.CloseRangeScreen = function()
    {
    	if(this.scroller != null)
		{
			this.scroller.Terminate();
			this.scroller = null;
		}
    	
    	$('#settings_choose_range_all_ranges').undelegate();
    	$('#settings_choose_zone_content').hide();
    	$("#settings_modules").hide();
    	
    	this.app.SetBackAction(null);
		this.app.SetParametersBeforeAction(null);
		this.app.SetIconBeforeAction(null);
    };
    
    this.CloseRangeScreenWithBack = function()
    {
    	this.CloseRangeScreen();
    	this.ShowSettingsScreen();
    };
    
    this.RangeListItemConstructorCallback = function(itemData)
    {    
    	unit = "km";
    	unitStr = new String(PORTAL.units.distance());
    	if(unitStr != "") unit = unitStr;
    	
    	var html = '<div class="search_list_item_colored_bar_h66" id="range_'+itemData.id+'">';
			html += '<div class="settings_choose_zone_single_title policy_list_name">';
			if(unit=='miles')
			{
				html += itemData.name_mi;
			}
			else
			{
				html += itemData.name_km;
			}
			html +='</div>';
			html += '<div class="settings_choose_carburants_selected '+(itemData.selected ? "on" : "off" )+'"></div>';
		html += '</div>';	
		
		return html;
    };
    
    this.HandleRangeItemClick = function(ev)
    {
    	item_idx = $('#settings_choose_range_all_ranges').children().index("#"+$(ev.currentTarget).attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
		    	
    	for(i = 0; i < this.rangeListData.length; i++)
    	{
    		if(i == item_idx)
    		{
    			this.rangeListData[i].selected = true;
    		}
    		else
    		{
    			this.rangeListData[i].selected = false;
    		}
    	}
    	
    	$('.settings_choose_zone_selected', $("#settings_choose_range_all_ranges")).removeClass('on').removeClass('off').addClass('off');
    	$('.settings_choose_zone_selected', $(ev.currentTarget)).removeClass('off').addClass('on');
    	
    	this.selectedRange = this.rangeListData[item_idx].value;
    	
    	this.StorageParametersDataSave();
    	    	
    	this.app.GetStationInfoModule().RefreshContentList = true;
    	
    	this.CloseRangeScreen();
    	this.ShowSettingsScreen();
    };
    
    // SC14 END
    
    
    
    // SC15 START
    
    this.ShowLanguageScreen = function()
    {
    	$("#settings_modules").show();
    	$('#settings_choose_language_content').show();
    	
    	$('#settings_choose_language_all_languages').delegate(".search_list_item_colored_bar_h66", "click", proxy(this.HandleLanguageItemClick, this));
    	
    	this.languageListData.sort(sortCountries);
    	this.scroller = new Application.ScrollerWidget("#settings_choose_language_scroller", "#settings_choose_language_all_languages", 4, this.languageListData, this.LanguageListItemConstructorCallback);
    	
    	this.app.SetIconBeforeAction(proxy(this.CloseLanguageScreen, this));
    	this.app.SetParametersBeforeAction(proxy(this.CloseLanguageScreen, this));
    	this.app.SetBackAction(proxy(this.CloseLanguageScreenWithBack, this));
    };
    
    this.LanguageListItemConstructorCallback = function(itemData)
    {
    	var html = '<div class="search_list_item_colored_bar_h66" id="language_'+itemData.id+'">';
			html += '<div class="settings_choose_language_single_title policy_list_name">'+itemData.name+'</div>';
			html += '<div class="settings_choose_carburants_selected '+(itemData.selected ? "on" : "off")+'"></div>';
		html += '</div>';	
		
		return html;
		
    };
    
    this.HandleLanguageItemClick = function(ev)
    {
    	item_idx = $('#settings_choose_language_all_languages').children().index("#"+$(ev.currentTarget).attr('id')) + (this.scroller.GetCurrentPage() - 1) * this.scroller.GetPageSize();
		    	
    	for(i = 0; i < this.languageListData.length; i++)
    	{
    		if(i == item_idx)
    		{
    			this.languageListData[i].selected = true;
    			this.languageListSelectedData = this.languageListData[i].country_code; 
    		}
    		else
    		{
    			this.languageListData[i].selected = false;    			
    		}
    	}
    	
    	$('.settings_choose_carburants_selected', $("#settings_choose_language_all_languages")).removeClass('on').removeClass('off').addClass('off');
    	$('.settings_choose_carburants_selected', $(ev.currentTarget)).removeClass('off').addClass('on');
    	
    	this.selectedLanguage = this.languageListData[item_idx].name;
    	this.selectedLanguageCode = this.languageListData[item_idx].country_code;
    	
    	var changeFuelCode = 0;
    	
    	for (i=0; i < this.gasListData.length; i++)
    	{
	    	if (this.gasListData[i].selected)
	    	{
	    		if (this.gasListData[i].fuel_name[this.selectedLanguageCode] == "")
	    		{
	    			changeFuelCode = 1;
	    			this.gasListData[i].selected = false;
	    		}		    	
			}
		}
		
		/* set default FUEL and put it in STORAGE*/
		if (changeFuelCode == 1)
		{		
			this.gasListData[0].selected = true;
    		this.selectedFuel = this.gasListData[0];
    		
    		this.StorageParametersDataSave();    		
    	}
    	
    	this.StorageParametersDataSave();
    	
    	this.app.GetStationInfoModule().RefreshContentList = true;
    	
    	this.CloseLanguageScreen();
    	this.ShowSettingsScreen();
    };
    
    this.CloseLanguageScreen = function()
    {
    	if(this.scroller != null)
		{
			this.scroller.Terminate();
			this.scroller = null;
		}
    	
    	$('#settings_choose_language_all_languages').undelegate();
    	$('#settings_choose_language_content').hide();
    	$("#settings_modules").hide();
    	
    	this.app.SetBackAction(null);
		this.app.SetParametersBeforeAction(null);
		this.app.SetIconBeforeAction(null);
    };
    
    this.CloseLanguageScreenWithBack = function()
    {
    	this.CloseLanguageScreen();
    	this.ShowSettingsScreen();
    };
    // SC15 END
    
    // SC22 START    
    this.ShowLegendeChooseScreen = function ()
    {
    	$("#settings_modules").show();
    	$("#help_menu_panel").show();
    	
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
    	$("#help_choice_notice").addClass('search_big_btns');
    };
    this.HandleLegendChoiceLegende = function()
	{
		this.CloseLegendeChooseScreen();
		this.ShowLegendeScreen();
		
	};
	this.HandleLegendChoiceNotice = function()
	{
		this.CloseLegendeChooseScreen();
		this.ShowNoticeScreen();
		
	};
	this.CloseLegendeChooseScreen = function ()
	{
		$('#help_choice_legende').unbind();
		$('#help_choice_notice').unbind();		
		$('#help_menu_panel').hide();
		$("#settings_modules").hide();
		
		this.app.SetIconBeforeAction(null);
		this.app.SetParametersBeforeAction(null);
		this.app.SetBackAction(null);
	};
	this.CloseLegendeChooseScreenWithBack = function ()
	{
		this.CloseLegendeChooseScreen();
		this.ShowPreferenceScreen();
	};
	// SC22 END
	
	// SC22a START
	this.ShowLegendeScreen = function()
	{			
		$("#settings_modules").show();
		$('#legende_smeg_content').show();
		
		this.scroller = new Application.ScrollerWidget("#legende_scroller", "#legende_list_container", 1, this.helpListHtmlData, this.HelpListConstructorCallBack);
		
		this.app.SetIconBeforeAction(proxy(this.CloseLegendeScreen, this));
		this.app.SetParametersBeforeAction(proxy(this.CloseLegendeScreen, this));
		this.app.SetBackAction(proxy(this.CloseLegendeScreenWithBack, this));
	};
	
	this.HelpListConstructorCallBack = function (itemData)
	{
		var html  = '<div class="parameters_help_single">';
			html += itemData.html;
			html += '</div>';
			
		return html;
	};
	
	this.CloseLegendeScreen = function()
	{
		$("#settings_modules").hide();
		$('#legende_smeg_content').hide();
		this.app.SetParametersBeforeAction(null);
		this.app.SetIconBeforeAction(null);
		this.app.SetBackAction(null);
	};
	
	this.CloseLegendeScreenWithBack = function()
	{
		this.CloseLegendeScreen();
		this.ShowLegendeChooseScreen();		
	};	
	// SC22a END
	
	// SC22b START
	this.ShowNoticeScreen = function()
	{			
		$("#settings_modules").show();
		$('#legende_notice_content').show();
		
		this.scroller = new Application.ScrollerWidget("#notice_scroller", "#notice_list_container", 1, this.noticeListHtmlData, this.NoticeListConstructorCallBack);
		
		this.app.SetIconBeforeAction(proxy(this.CloseNoticeScreen, this));
		this.app.SetParametersBeforeAction(proxy(this.CloseNoticeScreen, this));
		this.app.SetBackAction(proxy(this.CloseNoticeScreenWithBack, this));
		
		warningWidget = new Application.WarningWidget("#legende_notice_content", proxy(this.CloseNoticeScreenWithBack, this));
	};
	this.NoticeListConstructorCallBack = function (itemData)
	{
		var html  = '<div class="parameters_help_single">';
			html += itemData.html;
			html += '</div>';
			
		return html;
	};
	this.CloseNoticeScreen = function()
	{
		$("#settings_modules").hide();
		$('#legende_notice_content').hide();
		
		warningWidget.TerminateWarning();
		
		this.app.SetParametersBeforeAction(null);
		this.app.SetIconBeforeAction(null);
		this.app.SetBackAction(null);
	};
	
	this.CloseNoticeScreenWithBack = function()
	{
		this.CloseNoticeScreen();
		this.ShowLegendeChooseScreen();		
	};	
	// SC22b END
	
	// Other functions related to the application parameters START

	// This function will check if the limit has been reached and return false if the limit is not reached
	// It also, resets the counter daily
	// increment	[boolean] 	: boolean flag to request counter increment
	this.CheckQueryLimit = function(increment)
	{
		var dateObj = new Date();
		var day = dateObj.getDay();
		
		if(day != this.queryLimit.day)
		{
			this.queryLimit.day = day;
			this.queryLimit.counter = 0;
		}
		
		if(increment == true)
		{
			this.queryLimit.counter++;
		}
		
		this.StorageParametersDataSave();
		
		if(this.queryLimit.counter > this.queryLimitMax)
		{
			return true;
		}
		else
		{
			return false;
		}
		
	};
	
	// Other functions related to the application parameters END
	
	// Storage handle and save START    
    this.StorageParametersDataSave = function ()
	{
		data =  {can_use_gps					: this.app.GetStationInfoModule().canUseGps,
				 parameters_fuel_type			: this.gasListData,
				 parameters_selected_fuel		: this.selectedFuel,
				 parameters_company				: this.makeListData,
				 search_range					: this.rangeListData,
				 parameters_selected_language	: this.languageListSelectedData,
				 query_limit					: this.queryLimit
		};
		
		PORTAL.storage.put(Application.CONSTANTS.STORAGE_PREFIX+Application.CONSTANTS.STORAGE_PARAMETERS, data ,false, function(){}, function(){});
		    	
	};
	this.HandleStorageParameters = function(data)
	{
		if (data != null)
		{
			if (data.can_use_gps != null)
			{
				this.app.GetStationInfoModule().canUseGps = data.can_use_gps;
				var approveMsg = "";
				    	
		    	if (data.can_use_gps == true)
				{
		    		approveMsg = "${sc10_refuse_gps}";
				}
		    	else
		    	{
		    		approveMsg = "${sc10_autorize_gps}";
		    	}
		    	
		    	$('#settings_choose_settings_button4 .settings_choose_settings_button_title').html(approveMsg);
			}
			if (data.parameters_fuel_type != null)
			{
				this.gasListData = data.parameters_fuel_type;
			}
			if (data.parameters_selected_fuel != null)
 			{
    			this.selectedFuel = data.parameters_selected_fuel;
    		}
    		if (data.parameters_company != null && data.parameters_company.length != null && data.parameters_company.length > 0)
	 		{
		 		this.makeListData = data.parameters_company;
		    }
		    if (data.search_range != null && data.search_range.length != null && data.search_range.length > 0)
	 		{
		 		this.rangeListData = data.search_range;
		    	for(var idx = 0; idx < this.rangeListData.length; idx++)
		    	{
		    		if(this.rangeListData[idx].selected == true)
		    		{
		    			this.selectedRange = this.rangeListData[idx].value;
		    			break;
		    		}
		    	}
			}			
			if (data.parameters_selected_language != null)
	 		{	
	 			var languageParameterIsSelected = false;
	 			
		    	if (data.parameters_selected_language.length > 0)
		    	{
		    		this.languageListSelectedData = data.parameters_selected_language;
		    		//this.languageListData = data.parameters_selected_language;
		    		
		    		for(var i=0; i < this.languageListData.length; i++)
					{	
						if (this.languageListData[i].country_code == this.languageListSelectedData)
						{
							languageParameterIsSelected = true;
							this.languageListData[i].selected = true;					
							this.selectedLanguage = this.languageListData[i].name;
							this.selectedLanguageCode = this.languageListData[i].country_code;
						}
					}
		    	}
		    	if (!languageParameterIsSelected)
		    	{
		    		for(var i=0; i < this.languageListData.length; i++)
					{	
						if (this.languageListData[i].country_code == "${language_code_string}")
						{
							this.languageListData[i].selected = true;
							this.languageListSelectedData = this.languageListData[i].country_code;					
							this.selectedLanguage = this.languageListData[i].name;
							this.selectedLanguageCode = this.languageListData[i].country_code;
						}
					}
					this.StorageParametersDataSave();	
		    	}		    	
	    	}
			
			if(data.query_limit != null)
			{
				this.queryLimit = data.query_limit;
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

