// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("colors_option");
// If There's Color Item In Local Storage
if (mainColors !== null) {
	document.documentElement.style.setProperty("--main-color", mainColors);
	// Remove Active Class From All Colors List Item
	document.querySelectorAll(".colors-list li").forEach((element) => {
		element.classList.remove("active");
		// Add Active Class On Element With Data-Color === Local Storage Item
		if (element.dataset.color === mainColors) {
			// Add Active Class
			element.classList.add("active");
		}
	});
}
////////////////////////////////////////////////////

// Random Background Option
let backgroundOption = true;
// Variable To Control The Background Interval
let backgroundInterval;
// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");
// Check If Random Background Local Storage Is Not EMpty
if (backgroundLocalItem !== null) {
	// Remove Active Class From All Spans
	document.querySelectorAll(".random-backgrounds span").forEach((element) => {
		element.classList.remove("active");
	});
	if (backgroundLocalItem === "true") {
		backgroundOption = true;
		document
			.querySelector(".random-backgrounds .yes")
			.classList.add("active");
	} else {
		backgroundOption = false;
		document
			.querySelector(".random-backgrounds .no")
			.classList.add("active");
	}
}
///////////////////////////////////////////////////

// Toggle Spin Class on Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
	// Toggle class fa-spin For Rotation on self
	this.classList.toggle("fa-spin");
	// Toggle class Open On Main Settings Box
	document.querySelector(".settings-box").classList.toggle("open");
};
////////////////////////////////////////////////////

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
// Loop On All List Items
colorsLi.forEach((li) => {
	// Click On Every List Items
	li.addEventListener("click", (e) => {
		// Set Color On Root
		document.documentElement.style.setProperty(
			"--main-color",
			e.target.dataset.color
		);
		// Set Color On Local Storage
		localStorage.setItem("colors_option", e.target.dataset.color);
		handleActive(e);
	});
});
///////////////////////////////////////////////////

// Reset Button
document.querySelector(".reset-options").onclick = function () {
	localStorage.clear();
	// localStorage.removeItem("color_option");
	// localStorage.removeItem("background_option");
	// localStorage.removeItem("bullets_option");
	// Reload Window
	window.location.reload();
};
/////////////////////////////////////////////

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// Loop On All Spans
randomBackEl.forEach((span) => {
	// Click On Every Span
	span.addEventListener("click", (e) => {
		handleActive(e);
		if (e.target.dataset.bg === "yes") {
			backgroundOption = true;
			randomizeImgs();
			localStorage.setItem("background_option", true);
		} else {
			backgroundOption = false;
			clearInterval(backgroundInterval);
			localStorage.setItem("background_option", false);
		}
	});
});
///////////////////////////////////////////////////

// Select Landing Page Element
let landingPage = document.querySelector(".landing");
// Get Array of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
// Function To Randomize Imgs
function randomizeImgs() {
	if (backgroundOption === true) {
		backgroundInterval = setInterval(() => {
			// Get Random Number
			let randomNumber = Math.floor(Math.random() * imgsArray.length);
			// Change Background Image Url
			landingPage.style.backgroundImage =
				'url("imgs/' + imgsArray[randomNumber] + '")';
		}, 5000);
	}
}
randomizeImgs();
///////////////////////////////////////////////////

// Select All Links
const allLinks = document.querySelectorAll(".links a");
function scrollToSomewhere(elements) {
	elements.forEach((ele) => {
		ele.addEventListener("click", (e) => {
			e.preventDefault();
			document.querySelector(e.target.dataset.section).scrollIntoView({
				behavior: "smooth",
			});
		});
	});
}
scrollToSomewhere(allLinks);
/////////////////////////////////////////

// Animation on Scroll Stats Section And Results Section
let progressSpans = document.querySelectorAll(
	"section.results .container .game-box .progress-bar span"
);
let section = document.querySelector("section.results");
let nums = document.querySelectorAll(".stats .container .box span.number");
let statsSection = document.querySelector(".stats");
let started = false; // Function Started ? No
window.onscroll = function () {
	// Skills Animate Width
	if (window.scrollY >= section.offsetTop - 250) {
		progressSpans.forEach((span) => {
			span.style.width = span.dataset.progress;
		});
	}
	// Stats Increase Number
	if (window.scrollY >= statsSection.offsetTop - 250) {
		if (!started) {
			nums.forEach((num) => startCount(num));
		}
		started = true;
	}
};
function startCount(el) {
	let goal = el.dataset.goal;
	let count = setInterval(() => {
		el.textContent++;
		if (el.textContent == goal) {
			clearInterval(count);
		}
	}, 3000 / goal);
}
///////////////////////////////////////

// Create PopUp With Image Box
let ourNews = document.querySelectorAll(".news .news-boxes .img-box img");
ourNews.forEach((img) => {
	img.addEventListener("click", (e) => {
		// create Overlay Element
		let overlay = document.createElement("div");
		// Add Class To Overlay
		overlay.className = "popup-overlay";
		// Append Overlay To the Body
		document.body.appendChild(overlay);
		// Create The PopUp Box
		let popupBox = document.createElement("div");
		// Add Class To PopUp Box
		popupBox.className = "popup-box";
		// Create The Image
		let PopupImage = document.createElement("img");
		// Set Image Source
		PopupImage.src = img.src;
		// Append Image To popUp Box
		popupBox.appendChild(PopupImage);
		// Append The PopUp Box To The Body
		document.body.appendChild(popupBox);
		// Create The Close Span
		let closeButton = document.createElement("span");
		// Create The Close Button Text
		let closeButtonText = document.createTextNode("X");
		// Append Text To Close Button
		closeButton.appendChild(closeButtonText);
		// Add Class To Close Button
		closeButton.className = "close-button";
		// Add Close Button To The Popup Box
		popupBox.appendChild(closeButton);
	});
});
// Close PopUp & Overlay
document.addEventListener("click", function (e) {
	if (e.target.className == "close-button") {
		// Remove current Popup
		e.target.parentNode.remove();
		// Remove Overlay
		document.querySelector(".popup-overlay").remove();
	}
});
//////////////////////////////////////////

// Toggle Menu
let toggleBtn = document.querySelector(".links-container i");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function (e) {
	// Stop Propagation
	e.stopPropagation();
	// Toggle Class "menu-active" On Button
	this.classList.toggle("menu-active");
	// Toggle Class "open" On Links
	tLinks.classList.toggle("open");
};
// click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
	if (e.target !== toggleBtn && e.target !== tLinks) {
		// Check If Menu Is Open
		if (tLinks.classList.contains("open")) {
			// Toggle Class "menu-active" On Button
			toggleBtn.classList.toggle("menu-active");
			// Toggle Class "open" On Links
			tLinks.classList.toggle("open");
		}
	}
});
// Stop Propagation On Menu
tLinks.onclick = function (e) {
	e.stopPropagation();
};
//////////////////////////////////////////////////////

// Handle Active State
function handleActive(ev) {
	// Remove Active Class From All Childrens
	ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
		element.classList.remove("active");
	});

	// Add Active Class On Self
	ev.target.classList.add("active");
}
///////////////////////////////////////////////////
