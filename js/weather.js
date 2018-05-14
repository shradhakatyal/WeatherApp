$(document).ready(function(){
	var lat, lon;
	var tempCel;
	var isCelsius = true;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			var cur = "lat="+lat+"&"+"lon="+lon;
			$.ajax ({
				url: "https://fcc-weather-api.glitch.me/api/current?"+cur,
				dataType: 'json',
				success: function(data){
					$("p#location").text(data.name+", "+data.sys.country);
					$("p#weather").text(data.weather[0].main);
					$("p#temp").text(data.main.temp+"\xB0"+"C");
					tempCel = data.main.temp;
					$("img#icon").attr("src", data.weather[0].icon)
				}
			});
			$("p#temp").on("click", function(){
				if(isCelsius) {
					let temp = toFahr(tempCel);
					$("p#temp").text(temp+"\xB0"+"F");
				}
				else {
					$("p#temp").text(tempCel+"\xB0"+"C");

				}
				isCelsius = !isCelsius;
			})
		});
	}
	else {
		console.log("Location not available!");
	}
});
function toFahr(tempCel) {
	var tem = (tempCel*9/5) + 32;
	return tem;
}