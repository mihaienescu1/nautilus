function proxy(func, context)
{
	return function(){ return func.apply(context, arguments); };
};

function convertDistance(num)
{
	unit = "km";
	unitStr = new String(PORTAL.units.distance());
	if(unitStr != "") unit = unitStr;
	
	meters = num * 1000;
	kilometers = num;
	
	miles = kilometers * 0.621;
	feet = meters * 3.280;
	output = null;
	
	if(unit=='miles')
	{
		if(parseInt(feet) < 1000)
		{
			output = parseInt(feet) + ' ft';
		}
		else
		{
			n = (feet*0.000189393939).toPrecision(3);
			
			if(n<10)
				n = new Number(n+'').toFixed(2);
			else
				n = new Number(n+'').toFixed(1);
			
			output = n + ' mi';
		}
	}
	else if(unit =='km')
	{
		output = kilometers<1 ? parseInt(meters) + ' m' : kilometers.toPrecision(3) + ' km';
	}
	
	return output;
}

function sortByDistance(a, b)
{
	   	var x = a.distance;
	    var y = b.distance;
	    
	    if(x > y) 
	    	return 1;
	    else if(x < y)
	    	return -1;
	    else 
	    	return 0;
}

function sortByStatus(a, b)
{
	var x = 0;
	var y = 0;
	
	for(var idx = 0; idx < a.extendeds.length; idx++)
	{
		if(a.extendeds[idx].text_id == "parking_status")
		{
			x = a.extendeds[idx].extended_data_value;
			break;
		}
	}
	
	for(var idx = 0; idx < b.extendeds.length; idx++)
	{
		if(b.extendeds[idx].text_id == "parking_status")
		{
			y = b.extendeds[idx].extended_data_value;
			break;
		}
	}
	
	if(x == 7)
		x = 0;
	if(y == 7)
		y = 0;
	
	if(x > y)
		return -1;
	else if(x < y)
		return 1;
	else 
		return 0;
}


function sortByPriority(a, b) {
	
    var x = a.priority;
    var y = b.priority;
    
    if(x > y) {
    	return -1;
    }
    else if(x == y)
    {
    	var x1 = a.label.toLowerCase();
    	var y1 = b.label.toLowerCase();
    	if(x1 > y1)
    		return -1;
    	else if(x1 == y1)
    		return 0;
    	else 
    		return 1;
    }
    else 
    	return 1;
}

function sortByHistory(a, b)
{
	var x = a.history;
    var y = b.history;
    
    if(x > y) 
    	return 1;
    else if(x < y)
    	return -1;
    else 
    	return 0;
}

function GetDistanceBetweenCoordinates(lat1, lon1, lat2, lon2)
{
	// Original distance calculation
	var R = 6371; // Radius of the earth in km
	var dLat = toRadians(lat2-lat1); 
	var dLon = toRadians(lon2-lon1); 
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	
	return d;
};

function toRadians(degrees)
{
	return degrees * (Math.PI/180);
};

function toDegrees(radians)
{
	return radians * (180/Math.PI);
};
