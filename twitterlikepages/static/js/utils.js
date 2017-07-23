function printDateInFormat(date_str){
	var time_formats = [
		[60, 'Just Now'],
		[90, '1m'],
		[3600, 'm', 60],
		[5400, '1h'],
		[86400, 'h', 3600],
		[129600, '1 Day'],
		[604800, 'Days', 86400]
	];

	var time = ('' + date_str).replace(/-/g,"/").replace(/[TZ]/g," "),
		dt = new Date,
		seconds = ((dt - new Date(time) + (dt.getTimezoneOffset() * 60000)) / 1000),
		token = '',
		i = 0,
		format;

	if (seconds < 0) {
		seconds = Math.abs(seconds);
		token = '';
	}
	
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	if (seconds > 604800) {
		var dts = new Date(date_str);
		return dts.getDate() + ' ' + monthNames[dts.getMonth()];
	}
	else {
		while (format = time_formats[i++]) {
			if (seconds < format[0]) {
				if (format.length == 2) {
					return format[1] + (i > 1 ? token : '');
				} else {
					return Math.round(seconds / format[2]) + '' + format[1] + (i > 1 ? token : '');
				}
			}
		}
	}

	return date_str;
};

function printDateInDateAndMonth(date_str) {
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var dts = new Date(date_str);
	return dts.getDate() + ' ' + monthNames[dts.getMonth()];
}