var websiteIP_status, setPosition = "right";
var url = window.location.host;

const ipInfo = (ip) => {
	const geoIpKey = 'f81691b20f724578b369647acc878cb2';
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", `https://api.ipgeolocation.io/ipgeo?apiKey=${geoIpKey}&ip=${ip}`, false);
	xmlhttp.send(null);
	return JSON.parse(xmlhttp.responseText);
}

$(document).ready(function () {
	chrome.extension.sendMessage({ data: "getIP" }, function (response) {
		var ip = response.ip;
		ipDetails = ipInfo(ip);
		$("body").append(`<div id="chrome_websiteIP" class="chrome_websiteIP_${setPosition}">${ipDetails.continent_code}, ${ipDetails.country_name}, ${ipDetails.city}, ${ip}</div>`);
	});

	$("#chrome_websiteIP").live('mouseover', function () {
		if ($(this).hasClass('chrome_websiteIP_right')) {
			$(this).removeClass("chrome_websiteIP_right");
			$(this).addClass("chrome_websiteIP_left");
		}
		else {
			$(this).removeClass("chrome_websiteIP_left");
			$(this).addClass("chrome_websiteIP_right");
		}
	});
});
