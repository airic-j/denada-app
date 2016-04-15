// Problem: Want to display specific bars based on user input (district, day)
// Solution: Create inputs that dynamically change a list of available bars

// define variables
var doc = document;

var revealButton = doc.getElementById("revealButton");
var listOfDeals = doc.getElementById("listOfDeals");
var options = doc.getElementsByTagName("span");

var districts = doc.getElementsByClassName("districts")[0]
var days = doc.getElementsByClassName("days")[0];

var _select = 'selected';

var saveItems = doc.getElementsByClassName("saveClass");
var revealSaved = doc.getElementById('revealSaved');


// keep page state
var lastState = {
	districtSelected: '',
	daySelected: '',
	deals: ''
}

// create array for deals

var dealsArray = [];
var savedDealsArray = [];

// Create a dealList object contructor with criteria 1. 2. ...

function Deal(dealName, location, district, day, img, num) {
	this.dealName = dealName;
	this.location = location;
	this.district = district;
	this.day = day;
	this.img = img;
	this.num = num;
};

// Populate deal list with bars and deal details
var deal00 = new Deal('Sunday Happy Hour', 'Jakes Grill', 'SW', 'Sunday', 'jakes.png', '0');
var deal01 = new Deal('$2 Happy Hour', 'Aalto', 'SE', 'Every day', 'aalto.png', '1');
var deal02 = new Deal('TBD', 'Jakes Grill', 'SW', 'Sunday', 'jakes.png', '2');
var deal03 = new Deal('$10 Food + Drink', 'Leaky Roof', 'SW', 'Every day', 'rontoms.png', '3');
var deal04 = new Deal('$5 Wimpy Burger', 'Dark Horse', 'NW', 'Every day', 'rontoms.png', '4');
var deal05 = new Deal('Tightwad Tuesday Pints', '5th Quadrant', 'NE', 'Tuesday', '5thquadrant.png', '5');
var deal06 = new Deal('Miser Monday Pints', 'Lompoc Tavern', 'NW', 'Monday', 'lompoc.png', '6');
var deal07 = new Deal('$6 Pitchers', 'The Conquistador', 'SE', 'Every day', 'conquistador.png', '7');
var deal08 = new Deal('$3 Micro Pints', 'Star Bar', 'SE', 'Every day', 'rontoms.png', '8');
var deal09 = new Deal('$2.50 Micro Pints', 'Marathon Taverna', 'NW', 'Tuesday', 'marathon.png', '9');
var deal10 = new Deal('$3 Micro Pints', 'My Fathers Place', 'SE', 'Every day', 'myfathersplace.png', '10');
var deal11 = new Deal('$2 Wings and Beer', 'Cheerful Bullpen', 'SW', 'Tuesdays', 'cheerfulbullpen.png', '11');
var deal12 = new Deal('$3 Biscuits & Gravy', 'Raes Lakeview Lounge', 'NW', 'Every day', 'raes.png', '12');
var deal13 = new Deal('TBD', 'Side Door', 'SE', 'Wednesday', 'sidedoor.png', '13');
var deal14 = new Deal('TBD', 'Pints', 'NW', 'Wednesday', 'pints.png', '14');
var deal15 = new Deal('TBD', 'Kellys Olympian', 'SW', 'Thursday', 'kellysolympian.png', '15');
var deal16 = new Deal('TBD', 'Roadside Attraction', 'SE', 'Sunday', 'roadsideattraction.png', '22');
var deal17 = new Deal('TBD', '21st Ave Bar', 'NW', 'Friday', '21stavebar.png', '17');
var deal18 = new Deal('TBD', 'Wimpys', 'NW', 'Friday', 'rontoms.png', '18');
var deal19 = new Deal('TBD', 'B Side Tavern', 'SE', 'Saturday', 'bside.png', '19');
var deal20 = new Deal('TBD', 'Basement Pub', 'SE', 'Saturday', 'basementpub.png', '20');
var deal21 = new Deal('TBD', 'East Burn', 'SE', 'Sunday', 'eastburn.png', '21');

// put deals in array

dealsArray.push(deal00, deal01, deal02, deal03, deal04, deal05, deal06, deal07, deal08, 
								deal09, deal10, deal11, deal12, deal13, deal14, deal16, deal16, deal17, 
								deal18, deal19, deal20, deal21);


function isInArray(array, value) {
	return array.indexOf(value) > -1;
}

// populate deals lists

var populateDeals = function(obj) {
	var dealDiv = document.createElement("div")
	var dealItem = document.createElement("ul");
	var dealName = document.createElement("li")
	var dealLocation = document.createElement("li");
	var dealDistrict = document.createElement("li");
	var dealDay = document.createElement("li");
	var dealSave = document.createElement("li");

	dealDiv.classList.add("deal-background");

	dealDiv.style.backgroundImage = "url('./img/" + obj.img + "')";
	dealName.innerHTML = obj.dealName;
	dealLocation.innerHTML = obj.location;	
	dealDistrict.innerHTML = obj.district;
	dealNum = obj.num;
	dealDay.innerHTML = obj.day;
	dealSave.innerHTML = "Save deal";
	
	dealDiv.appendChild(dealItem);
	dealDiv.setAttribute('id', dealNum);
	dealItem.appendChild(dealName);
	dealItem.appendChild(dealLocation);
	dealItem.appendChild(dealDistrict);
	dealItem.appendChild(dealDay);
	dealItem.appendChild(dealSave);
	dealSave.classList.add("saveClass")
	dealItem.classList.add("color-black")

// change color of saved deals
	if (isInArray(savedDealsArray,dealNum)) {
		dealItem.classList.remove("color-black");
		dealItem.classList.add('dealSelected');
		dealItem.lastChild.innerHTML = "Remove deal";
		console.log('we should color this deal ' + dealNum);
	}

	console.log("populateDeals");
	listOfDeals.appendChild(dealDiv);
	return dealItem;

};


// reveal the list to show the filtered results

var showList = function() {
	listOfDeals.innerHTML= "";
	console.log("showList");

	var districtSelected = districts.getElementsByClassName(_select)[0].id;
	var daySelected = days.getElementsByClassName(_select)[0].id;
	
	dealsArray.filter(function (el) {
		if (el.district === districtSelected && el.day === daySelected) {
			return true;
		} else if (el.district === districtSelected && 'Every day' === daySelected) {
			return true;
		}
	}).forEach(populateDeals);
	
	console.log("reveal the list!");

	bindSaveClick();
};


// go through array
// if the day and district values match the selected district and selected day, return true

//show saved deals only

var showSavedDeals = function() {
	console.log('showSavedDeals')
	listOfDeals.innerHTML= "";

	for (i = 0; i < savedDealsArray.length; i++) {
		populateDeals(dealsArray[savedDealsArray[i]]);
	}
	bindSaveClick();
}

// bind clicks to each day and district span

var bindClick = function(ev) {
	console.log('bindClick');
	var span = ev.target;
	var parent = span.parentNode;
	var siblings = parent.children;

	// var cls = parent.classList.contains("days") ? "daySelected" : "districtSelected";

	for (var i = 0; i < siblings.length; i++) {
		siblings[i].classList.remove(_select);
	}

	span.classList.add(_select);
	saveState();

}


// bind click event to each deal in the list of saved deals

var bindSaveClick = function() {
	console.log('bindSaveClick')
	for(var li = 0; li < saveItems.length; li ++) {
		saveItems[li].addEventListener("click", saveClick)
	}
}

// add or remove deal on click

var saveClick = function(ev) {
	var li = ev.target;
	var parent = li.parentNode;
	console.log("saveClick clicked");

	if (parent.classList.contains('dealSelected')) {
		parent.classList.add("color-black");
		parent.classList.remove("dealSelected");
		li.innerHTML = "Save deal";
		console.log('remove a selected deal');
		storeSaved(parent,'remove');
	} else {
		console.log("save this deal " + li + parent);
		parent.classList.remove("color-black");
		parent.classList.add("dealSelected");
		li.innerHTML = "Remove deal";
		console.log('add a selected deal');
		storeSaved(parent,'add');
	}
}	

// add or remove deal when saveClick runs

var storeSaved = function(div,action) {
		console.log('storeSaved');
		if (action == 'add') {
		console.log('the saved action will add id ' + div.parentNode.id);
		savedDealsArray.push(div.parentNode.id);
	} else if (action == 'remove') {
		console.log('the saved action will remove this' + div.parentNode.id);
		savedDealsArray.splice(savedDealsArray.indexOf(div.parentNode.id,1));
	}
	saveState();
}

// save the state of deals and districts selected

var saveState =function() {

	lastState.daySelected = days.getElementsByClassName(_select)[0].id;
	lastState.districtSelected = districts.getElementsByClassName(_select)[0].id;
	lastState.deals = savedDealsArray;

	localStorage.setItem('dayState', lastState.daySelected);
	localStorage.setItem('districtState', lastState.districtSelected);
	localStorage.setItem('deals', JSON.stringify(lastState.deals));

	console.log("saved state");
	showSavedButton();
}

// load the saved page state if anything is saved

function loadState() {
	if (localStorage.getItem('dayState') != null && localStorage.getItem('districtState') != null) {
		console.log('theres a state to get');
		doc.getElementById(localStorage.getItem('dayState')).classList.add("selected");
		doc.getElementById(localStorage.getItem('districtState')).classList.add("selected");
		savedDealsArray = JSON.parse(localStorage.getItem('deals'));
	}
	showSavedButton();
}

// clear local storage for debugging if needed

function clearState() {

	localStorage.removeItem('dayState');
	localStorage.removeItem('districtState');
	localStorage.removeItem('deals');
}

// if deals are saved, show the text with the number of saved deals

function showSavedButton() {
	var numberSavedDeals = savedDealsArray.length;
	if (numberSavedDeals > 0) {
		revealSaved.style.display="block";
		revealSaved.innerHTML= "View " + numberSavedDeals + " saved deals";
	} else {revealSaved.style.display="none";}
}

// add click event elisteners
revealButton.addEventListener("click", showList);

revealSaved.addEventListener("click", showSavedDeals);

for(var span = 0; span < options.length; span++) {
       options[span].addEventListener("click", bindClick);
}


loadState();























