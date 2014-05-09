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

function GetStationColor(symbol)
{
	if(symbol == "+") return "red";
	else if(symbol == "-") return "green";
	else if(symbol == "=") return "orange";
	else return "gray";
};

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
};

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

function sortCountries(a,b) 
{
  if (a.name < b.name)
     return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}


function GetDistanceBetweenCoordinates(lat1, lon1, lat2, lon2)
{
	//simplified distance calculation
	var R = 6371; // earth radius in km
	var diffLat = Math.abs(lat1 - lat2);
	var diffLng = Math.abs(lon1 - lon2);

	var d = R * Math.sqrt(diffLat*diffLat + diffLng*diffLng) / 100;

	
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
