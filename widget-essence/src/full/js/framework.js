

Framework = function(){};




/*
 * Framework constants definitions
 */
Framework.CONSTANTS = function(){};

Framework.CONSTANTS.SERVER_ADDR = "http://ws.navx.com/";

Framework.CONSTANTS.DISPLAY_KEY = "7ffcd213ac5e00a88a2968c6f3530aeb";

Framework.CONSTANTS.GLUE = "json";

Framework.CONSTANTS.WS_COMMUNITY_SEARCH_PARKING_NEAR_BY 	= "community.searchParkingNearByB";
Framework.CONSTANTS.WS_CONTENT_GET_GAS_STATIONS_NEAR_BY 	= "content.getGasStationsNearbyB";
Framework.CONSTANTS.WS_CONTENT_GET_GEOCODING_BY_ADDRESS 	= "content.getGeocodingByAddress";
Framework.CONSTANTS.WS_CONTENT_ADD_PRICE_SUGGESTION			= "content.addPriceSuggestion";
Framework.CONSTANTS.WS_CONTENT_GET_LIST_OF_BRAND			= "content.getListOfBrandByPosition";
Framework.CONSTANTS.WS_CONTENT_GET_LIST_OF_FUEL_TYPE		= "content.getGasKindInfo";
Framework.CONSTANTS.WS_CONTENT_REGISTER_NAUTILUS_DEVICE		= "content.registerNautilusDevice";
	
	
	
	
Framework.GetWsClient = function(wsName)
{
	var client = new Framework.Client();
	
	client.dk = Framework.CONSTANTS.DISPLAY_KEY;
	
	switch(wsName)
	{
		case Framework.CONSTANTS.WS_COMMUNITY_SEARCH_PARKING_NEAR_BY:
			client.targetUrl = "community.php";
			client.requestedMethod = Framework.CONSTANTS.WS_COMMUNITY_SEARCH_PARKING_NEAR_BY;
			client.ruleMap = new Framework.Wrapper.SearchParkingNearbyRequestMapping();
			client.data = new Framework.Wrapper.SearchParkingNearByRequest();
			
			break;
			
		case Framework.CONSTANTS.WS_CONTENT_GET_GAS_STATIONS_NEAR_BY:
			client.targetUrl = "content.php";
			client.requestedMethod = Framework.CONSTANTS.WS_CONTENT_GET_GAS_STATIONS_NEAR_BY;
			client.ruleMap = new Framework.Wrapper.GetGasStationsNearByRequestMapping();
			client.data = new Framework.Wrapper.GetGasStationsNearByRequest();
			
			break;
		
		case Framework.CONSTANTS.WS_CONTENT_GET_GEOCODING_BY_ADDRESS:
			client.targetUrl = "content.php";
			client.requestedMethod = Framework.CONSTANTS.WS_CONTENT_GET_GEOCODING_BY_ADDRESS;
			client.ruleMap = new Framework.Wrapper.GetGeocodingByAddressRequestMapping();
			client.data = new Framework.Wrapper.GetGeocodingByAddressRequest();
			
			break;
			
		case Framework.CONSTANTS.WS_CONTENT_ADD_PRICE_SUGGESTION:
			client.targetUrl = "content.php";
			client.requestedMethod = Framework.CONSTANTS.WS_CONTENT_ADD_PRICE_SUGGESTION;
			client.ruleMap = new Framework.Wrapper.AddPriceSuggestionRequestMapping();
			client.data = new Framework.Wrapper.AddPriceSuggestionRequest();

			break;
			
		case Framework.CONSTANTS.WS_CONTENT_GET_LIST_OF_BRAND:
			client.targetUrl = "content.php";
			client.requestedMethod = Framework.CONSTANTS.WS_CONTENT_GET_LIST_OF_BRAND;
			client.ruleMap = new Framework.Wrapper.GetListOfBrandRequestMapping();
			client.data = new Framework.Wrapper.GetListOfBrandRequest();
			
			break;
		
		case Framework.CONSTANTS.WS_CONTENT_GET_LIST_OF_FUEL_TYPE:
			client.targetUrl = "content.php";
			client.requestedMethod = Framework.CONSTANTS.WS_CONTENT_GET_LIST_OF_FUEL_TYPE;
			client.ruleMap = new Framework.Wrapper.GetListOfFuelTypeRequestMapping();
			client.data = new Framework.Wrapper.GetListOfFuelTypeRequest();
			
			break;
			
		case Framework.CONSTANTS.WS_CONTENT_REGISTER_NAUTILUS_DEVICE:
			client.targetUrl = "content.php";
			client.requestedMethod = Framework.CONSTANTS.WS_CONTENT_REGISTER_NAUTILUS_DEVICE;
			client.ruleMap = new Framework.Wrapper.RegisterNautilusDeviceTypeRequestMapping();
			client.data = new Framework.Wrapper.RegisterNautilusDeviceTypeRequest();
			
			break;	
			
		default:
			client = null;
			break;
	}

	
	
	return client;

};



Framework.Client = function()
{
	this.data 							= null;
	
	this.ruleMap 						= null;
	
	this.responseOkCallback 			= null;
	
	this.responseErrorCallback 			= null;
	
	this.serverUrl 						= Framework.CONSTANTS.SERVER_ADDR;
	
	this.targetUrl 						= null;
	
	this.requestedMethod 				= null;
	
	this.dk 							= null;
	
	this.xhr 							= null;
	
	this.xhrTimeout						= null;

	
	this.SetResponseOkCallBack = function(callback)
	{
		this.responseOkCallback = callback;
	};
	
	this.SetResponseErrorCallBack = function(callback)
	{
		this.responseErrorCallback = callback;
	};
	
	this.SetData = function(data)
	{
		this.data = data;
	};
	
	this.Send = function()
	{
		this.xhr = new XMLHttpRequest();
		
		if(this.dk == null || this.data == null || this.ruleMap == null || this.targetUrl == null || this.requestedMethod == null)
		{
			if(self.responseErrorCallback != null)
			{
				self.responseErrorCallback(new Framework.Error(Framework.Error.ERROR_REQUEST, "Not all required parameters have been set for the request"));
			}
			else
			{
				throw new Framework.Error(Framework.Error.ERROR_REQUEST, "Not all required parameters have been set for the request");
			}
		}

		var self = this;
		
		this.xhr.open("POST", this.serverUrl+this.targetUrl+"?iglue=json", true);
		this.xhr.setRequestHeader("Content-Type", "application/json");
		this.xhr.onreadystatechange = function()
		{
			if(self.xhr.readyState == 4)
			{
				var output = null;
				
				if(self.xhr.status == 200)
				{					
					clearTimeout(self.xhrTimeout);
					
					var obj = JSON.parse(self.xhr.responseText);
					obj = Framework.ParseResponse(obj);
					
					if(obj.params != null)
					{
						output = obj.params;
						if(self.requestedMethod ==  Framework.CONSTANTS.WS_CONTENT_GET_GAS_STATIONS_NEAR_BY && obj.params.length == null)
						{
							new_out = new Array();
							var idx = 0;
							for(item in output)
							{
								new_out[idx] = output[item];
								idx++;
							}
							
							output = new_out;
						}
					}
					else if(obj.fault != null)
						output = new Framework.Error(Framework.Error.ERROR_WS , obj.fault.faultString);
					else
						output = new Framework.Error(Framework.Error.ERROR_INTERNAL , "Failed to parse response");					
										
				} 
				else
				{
					output = new Framework.Error(Framework.Error.ERROR_HTTP , "HTTP ERROR CODE: "+self.xhr.status);
				}
				
				if(output instanceof Framework.Error)
				{
					if(self.responseErrorCallback != null)
					{
						self.responseErrorCallback(output);
					}
				}
				else
				{
					if(self.responseOkCallback != null)
					{
						self.responseOkCallback(output);
					}
				}
					
			}
			else
			{
				if(self.xhr.status != 200)
				{
					self.xhr.abort();
				}
			}
			
		};
		
		var sendData = new Object();
		sendData.methodName = this.requestedMethod;
		sendData.params = this.data;
		sendData.params.dk = this.dk;
		sendData.params.format = "json";
		
		sendData = Framework.PrepareRequest(sendData, this.ruleMap);
				
		this.xhr.send(JSON.stringify(sendData));
		
		this.xhrTimeout = setTimeout(proxy(this.AjaxTimeout, this), 20000);
				
	};
	
	this.AjaxTimeout = function ()
	{
		if(this.xhr != null)
		{
			this.xhr.abort();
		}
	};	
};


Framework.Wrapper = function(){};

Framework.Wrapper.SearchParkingNearByRequest = function()
{
	this.latitude 		= 0;
	this.longitude 		= 0;
	this.radius 		= 0;
	this.language_id	= 0;

};
Framework.Wrapper.SearchParkingNearbyRequestMapping = function()
{
	this.methodName 	= "string";
	this.params 		= "array";
	this.dk 			= "string";
	this.format 		= "string";
	
	
	this.latitude 		= "double";
	this.longitude 		= "double";
	this.radius 		= "int";
	this.provider_ids 	= "array";
	this.service_labels = "array";
	this.language_id 	= "int";
	this.country_id 	= "int";
	this.limit			= "int";
	this.offset			= "int";
	this.sort_by		= "string";
	
	// Special mapping for numeric keys entries
	this.__numeric		= "int";
};

Framework.Wrapper.GetGasStationsNearByRequest = function()
{
	this.latitude 		= 0;
	this.longitude 		= 0;
	this.radius 		= 0;
	this.active_kml		= false;
	this.client			= "nautilus";

};
Framework.Wrapper.GetGasStationsNearByRequestMapping = function()
{
	this.methodName 	= "string";
	this.params 		= "array";
	this.dk 			= "string";
	this.format 		= "string";
	
	
	this.latitude 		= "double";
	this.longitude 		= "double";
	this.radius 		= "int";
	this.gas_kind		= "string";
	this.brands_name 	= "array";	
	this.active_kml 	= "boolean";
	this.limit			= "int";
	this.catalist_filter= "boolean";
	this.trusted_filter	= "boolean";
	this.status_filter	= "array";
	this.services_filter= "array";
	this.client			= "string";
	
	
	// Special mapping for numeric keys entries
	this.__numeric		= "int";
};

Framework.Wrapper.GetGeocodingByAddressRequest = function()
{
	this.address = "";
	this.origin = "nautilus";
};
Framework.Wrapper.GetGeocodingByAddressRequestMapping = function()
{
	this.methodName 	= "string";
	this.params 		= "array";
	this.dk 			= "string";
	this.format 		= "string";
	
	
	this.address 		= "string";
	this.origin 		= "string";

	// Special mapping for numeric keys entries
	this.__numeric		= "int";
};

Framework.Wrapper.AddPriceSuggestionRequest = function()
{
	this.uuid			= "";
	this.gaz_kind		= "";
	this.old_price		= 0;
	this.new_price 		= 0;
	this.device_uuid	= "";
};
Framework.Wrapper.AddPriceSuggestionRequestMapping = function()
{
	this.methodName 	= "string";
	this.params 		= "array";
	this.dk 			= "string";
	this.format 		= "string";
	
	
	this.uuid 			= "string";
	this.gaz_kind 		= "string";
	this.old_price 		= "double";
	this.new_price 		= "double";
	this.device_uuid	= "string";
	
	// Special mapping for numeric keys entries
	this.__numeric		= "int";
};

Framework.Wrapper.GetListOfBrandRequest = function()
{
	this.latitude	= 0;
	this.longitude	= 0;
	this.extended_info	= true;
};
Framework.Wrapper.GetListOfBrandRequestMapping = function()
{
	this.methodName 	= "string";
	this.params 		= "array";
	this.dk 			= "string";
	this.format 		= "string";
	
	
	this.latitude 	= "double";
	this.longitude	= "double";
	this.extended_info 	= "boolean";
	
	// Special mapping for numeric keys entries
	this.__numeric		= "int";
};

Framework.Wrapper.GetListOfFuelTypeRequest = function()
{
	this.device_fuel_types = new Array();
};
Framework.Wrapper.GetListOfFuelTypeRequestMapping = function()
{
	this.methodName 	= "string";
	this.params 		= "array";
	this.dk 			= "string";
	this.format 		= "string";
	
	this.device_fuel_types = "array";
		
	// Special mapping for numeric keys entries
	this.__numeric		= "int";
};

Framework.Wrapper.RegisterNautilusDeviceTypeRequest = function ()
{
	this.email = "";
	this.device_id = "";
};
Framework.Wrapper.RegisterNautilusDeviceTypeRequestMapping = function ()
{
	this.methodName 	= "string";
	this.params 		= "array";
	this.dk 			= "string";
	this.format 		= "string";	
	
	this.email 	= "string";
	this.device_id	= "string";	
};


Framework.Error = function(code, message)
{
	this.__code = code;
	
	this.__message = message;
	
	
	this.GetCode = function()
	{
		return this.__code;
	};
	
	this.GetMessage = function()
	{
		return this.__message;
	};
	
};

Framework.Error.ERROR_HTTP		= 1;
Framework.Error.ERROR_WS		= 2;
Framework.Error.ERROR_REQUEST	= 3;
Framework.Error.ERROR_INTERNAL	= 4;



/*
 * Prepare and format the data to be sent.
 * obj			- the data that will be sent (including the method name
 * ruleMap		- Key-value pair of request node names and they're associated types
 */
Framework.PrepareRequest = function(obj, ruleMap)
{
	var output = new Object();
	
	output.type = "array";
	output.name = "methodCall";
	output.value = new Array();
	
	output.value = Framework.RequestNodeProcess(obj, ruleMap);
	
	return output;
};


/*
 * Recursive function that will build nodes of the request
 * obj 			- the data node that will be sent
 * ruleMap		- Key-value pair of request node names and they're associated type 
 */
Framework.RequestNodeProcess = function(obj, ruleMap)
{

	var output = null;
	
	if($.isArray(obj))
	{
		
		output = new Array();
		
		for(var idx = 0; idx < obj.length; idx++)
		{
			output.push(Framework.RequestNodeProcess(obj[idx], ruleMap));
		}
	}
	else if(typeof(obj) == "string")
	{
		output = new Object();
		output.name = "";
		output.type = "string";
		output.value = obj;
	}
	else if($.isObject(obj))
	{
		output = new Array();
	
		var idx = 0;
		
		for(key in obj)
		{
			if(ruleMap[key] != null)
			{
				var item = new Object();
				item.name = key;
				item.type = ruleMap[key];
				
				switch(ruleMap[key])
				{
					case "string":
						item.value = String(obj[key]);
						break;
						
					case "int":
						var temp = parseInt(obj[key]);
						if(temp == "NaN")
							item.value = 0;
						else
							item.value = temp;
						break;
						
					case "double":
						var temp = parseFloat(obj[key]);
						if(temp == "NaN")
							item.value = 0;
						else
							item.value = temp;
						break;
						
					case "boolean":
						if(obj[key])
							item.value = 1;
						else
							item.value = 0;
						break;
						
					case "array":
						item.value = Framework.RequestNodeProcess(obj[key], ruleMap);
						break;
						
					default:
						item.value = String(obj[key]);
						break;
				}
				
				output[idx] = item;
				
				idx++;
			}
			else if((typeof(key)=='number') && (key.toString().indexOf('.')==-1) && ruleMap.__numeric != null)
			{
				switch(ruleMap.__numeric)
				{
					case "string":
						item.value = String(obj[key]);
						break;
						
					case "int":
						var temp = parseInt(obj[key]);
						if(temp == "NaN")
							item.value = 0;
						else
							item.value = temp;
						break;
						
					case "double":
						var temp = parseInt(obj[key]);
						if(temp == "NaN")
							item.value = 0;
						else
							item.value = temp;
						break;
						
					case "boolean":
						if(obj[key])
							item.value = 1;
						else
							item.value = 0;
						break;
						
					case "array":
						item.value = Framework.RequestNodeProcess(obj[key], ruleMap);
						break;
						
					default:
						item.value = String(obj[key]);
						break;
				}
				
				output[idx] = item;
				
				idx++;
			}
		}
		
	}
	
	return output;
};

/*
 * Parse the response from the WS
 * obj			- the data object received from the server
 */
Framework.ParseResponse = function(obj)
{
	var output = null;
	
	if(obj != null)
	{
		output = Framework.ProcessResponseNode(obj);
	}

	return output;
};


/*
 * Recursive function that will parse each response node
 * obj 			- the data node
 */
Framework.ProcessResponseNode = function(obj)
{
	if(obj.type == null)
	{
		return null;
	}
	
	var output = new Object();
	

	switch(obj.type)
	{
		case "string":
			output = String(obj.value);
			break;
			
		case "int":
			var temp = parseInt(obj.value);
			if(temp == "NaN")
				output = 0;
			else
				output = temp;
			break;
			
		case "double":
			var temp = parseFloat(obj.value);
			if(temp == "NaN")
				output = 0;
			else
				output = temp;
			break;
			
		case "boolean":
			if(obj.value == "1")
				output= true;
			else
				output = false;
			break;

		case "array":
			
			var assoc = false;
			
			for(var idx = 0; idx < obj.value.length; idx++)
			{
				if(parseInt(obj.value[idx].name) != obj.value[idx].name)
				{
					assoc = true;
					break;
				}
				
			}

			if(assoc)
			{
				output = new Object();
				for(var idx = 0; idx < obj.value.length; idx++)
				{
					var key = obj.value[idx].name;
					output[key] = Framework.ProcessResponseNode(obj.value[idx]);
				}
			}
			else
			{
				output = new Array();
				for(var idx = 0; idx < obj.value.length; idx++)
				{
					var key = parseInt(obj.value[idx].name); 
					output[key] = Framework.ProcessResponseNode(obj.value[idx]);
				}
			}
				
			
			
			break;
		
		default:
			output = obj.value;
			break;
	}
	
	return output;
};

