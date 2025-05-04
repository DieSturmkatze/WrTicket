const assumed = "\n\t=> Rosenheim will be assumed as you location for debugging purpuses"
const mapPopupTemplate = document.querySelector("#mapPopupTemplate")

let rosenheim = {
	lat: 47.85,
	long: 12.12,
}

var position = rosenheim
getPosition()

var eventMap = L.map("eventMap").setView([position.lat, position.long], 10);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { //https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.jpg
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(eventMap);
eventMap.invalidateSize();



async function getPosition() {
	if (window.location.protocol !== 'https:') {
		console.warn("Non HTTPS connection", assumed)
		return rosenheim;
	}
	
	
	
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function (position) {
			position = {
				lat: position.coords.latitude,
				long: position.coords.longitude,
			}
		}, function (error) {
			console.warn("Error getting user location:", error, assumed);
			return rosenheim;
		});
	} else {
		console.error("Geolocation is not supported by this browser.", assumed);
		return rosenheim;
	}
}

async function addMapMarkers() {
	data = await getEventsMap();
	for (const event of data.results) {
		var toInsert = mapPopupTemplate.content.cloneNode(true);
		toInsert.getElementById("popupTitle").value = event.title
		toInsert.getElementById("popupLocation").value = event.location.name
		console.log(toInsert.getElementById("mapPopup"))
		L.marker([event.location.lat, event.location.long])
			.addTo(eventMap)
			.bindPopup(toInsert.getElementById("mapPopup").innerHTML); //scuffed but works
	}
}

async function getEventsMap() {
	try {
		const data = await getEventsData()
		if (!data) return
		console.log(data)
		if (data.results.length <= 0) return

		return data
	} catch (error) {
		console.error('Search failed:', error)
	}
}

function updateMap() {
	eventMap.invalidateSize();
	addMapMarkers();
}