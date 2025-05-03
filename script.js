const apiUrl = ""
const eventEntryTemplate = document.querySelector("#eventEntryTemplate")



function switchPanel(panel) {
	document.getElementById("panel").innerHTML = panel;

	document.querySelectorAll(".panel1").forEach(function (p) {
		p.classList.add("hidden");
	});
	document.getElementById(panel).classList.remove("hidden");
}

async function getEvents() {
	const query = document.getElementById("search")
	try {
		const data = await getData(query.value)
		if (!data) return
		console.log(data)
		if (data.Results.length <= 0) return

		results = data.Results;

		const eventList = document.getElementById("eventList");
		eventList.innerHTML = ""
		for (const res of results) {
			insertEvent(res)
		}
	} catch (error) {
		console.error('Search failed:', error)
	}
}

async function getEventsJson(query) {
	const params = new URLSearchParams();
	params.append('q', query);

	let url = api + "/events/search?" + params.toString();
	console.log("Request URL:", url);

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const text = await response.text();
		if (!text) {
			throw new Error('Empty response received');
		}
		const json = JSON.parse(text);
		return json;
	} catch (error) {
		console.error(error.message);
		throw error;
	}
}

function insertEvent(event) {
	const toInsert = eventEntryTemplate.content.cloneNode(true);
	eventEntry = toInsert.childNodes[1]
	eventEntry.children[0].innerText = event.title
	eventEntry.children[1].innerText = event.date
	eventEntry.children[2].innerText = event.location.name
	eventEntry.children[3].innerText = event.location.address
	eventEntry.children[4].innerText = event.price

	eventList.appendChild(toInsert)
}

function debug() {
	insertEvent(
		{
			title: "Babymetal",
			date: "e8321",
			location: {
				name: "Olypmiastadion München",
				address: "Idk",
			},
			price: "69€"
		}
	)
}