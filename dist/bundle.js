/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _eventHandler = __webpack_require__(1);

var ev = _interopRequireWildcard(_eventHandler);

__webpack_require__(4);

var _radio = __webpack_require__(3);

var radio = _interopRequireWildcard(_radio);

__webpack_require__(5);

__webpack_require__(6);

__webpack_require__(7);

__webpack_require__(8);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//---CSS
ev.init(); //---SCRIPTS

radio.pulsate();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _data = __webpack_require__(2);

var all_events = _interopRequireWildcard(_data);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _exports = module.exports = {};

var map, buttons;
var holder, title, time, place, description;

var zoomer;
var canvas;

var first_floor, ground_floor;
var current_floor = 0;

function isMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}

function handleButton(event) {
  var current_id = event.target.name.replace(' ', '_');
  loadData(current_id);
}

_exports.init = function () {
  canvas = document.getElementById('myCanvas');
  // Create an empty project and a view for the canvas:
  paper.setup(canvas);

  $('#first_floor').on('click', this.switchMap);
  $('#ground_floor').on('click', this.switchMap);
  $('#clear').on('click', clear);

  holder = document.getElementById('info');
  title = document.getElementById('title');
  time = document.getElementById('time');
  place = document.getElementById('place');
  description = document.getElementById('description');

  paper.project.importSVG("dist/svg/ground_floor.svg", function (item, origin) {
    ground_floor = item;
    buttons = ground_floor.children.Layer_2.children.Buttons.children;

    if (!isMobile()) {
      paper.project.view.zoom = 0.75;
      canvas.style.top = '-8%';
      canvas.style.left = '-10%';
    }

    ground_floor.bounds.width = window.innerWidth * 0.8;
    ground_floor.bounds.height = window.innerHeight;

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].onMouseDown = handleButton;
    }

    ground_floor.visible = true;
  });

  paper.project.importSVG("dist/svg/first_floor.svg", function (item, origin) {
    first_floor = item;
    buttons = first_floor.children.Layer_2.children.Buttons.children;

    first_floor.bounds.width = window.innerWidth * 0.8;
    first_floor.bounds.height = window.innerHeight;

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].onMouseDown = handleButton;
    }

    first_floor.visible = false;
  });

  // Set initial position.
  canvas.style.position = 'absolute'; // 'absolute' also works.
  canvas.addEventListener('touchstart', dragStart);
  canvas.addEventListener('touchmove', dragMove);
};

_exports.switchMap = function () {
  canvas.style.opacity = 0;
  setTimeout(toggleVisibility, 500);
  setTimeout(function () {
    canvas.style.opacity = 1;
  }, 525);
};

function loadData(current_id) {
  for (var i = 0; i < all_events.data.length; i++) {

    if (all_events.data[i]._id == current_id) populate(all_events.data[i]);
  }
}

var targetStartX, targetStartY, touchStartX, touchStartY;
function dragStart(e) {
  targetStartX = parseInt(e.target.style.left);
  targetStartY = parseInt(e.target.style.top);
  touchStartX = e.touches[0].pageX;
  touchStartY = e.touches[0].pageY;
}

function dragMove(e) {
  // Calculate touch offsets
  var touchOffsetX = e.touches[0].pageX - touchStartX,
      touchOffsetY = e.touches[0].pageY - touchStartY;
  // Add touch offsets to original target coordinates,
  // then assign them to target element's styles.
  e.target.style.left = targetStartX + touchOffsetX + 'px';
  e.target.style.top = targetStartY + touchOffsetY + 'px';
}

function populate(info) {
  $('#clear').css('opacity', 1);

  if (holder.style.opacity != 1) {
    holder.style.display = "block";
    holder.style.opacity = 1;
  }

  var c = ('rgb(' + info.color.r + ',' + info.color.g + ',' + info.color.b + ');').toString();

  // holder.setAttribute('style', 'color: '+c+'; border-color:'+c);
  // holder.setAttribute('style', 'border-color: '+c);

  hideContent();

  setTimeout(function () {
    holder.setAttribute('style', 'color: ' + c + '; border-color:' + c);
    var hr = document.getElementsByTagName('hr');
    for (var i = 0; i < hr.length; i++) {
      hr[i].setAttribute('style', 'background-color: ' + c);
      hr[i].style.opacity = 0;
    }

    title.innerHTML = info.title;
    time.innerHTML = info.timing;
    place.innerHTML = info.location;
    description.innerHTML = info.description;
  }, 500);

  setTimeout(showContent, 500);
}

function showContent() {
  var hr = document.getElementsByTagName('hr');
  for (var i = 0; i < hr.length; i++) {
    hr[i].style.opacity = 1;
  }

  title.style.opacity = 1;
  time.style.opacity = 1;
  place.style.opacity = 1;
  description.style.opacity = 1;
}

function hideContent() {
  var hr = document.getElementsByTagName('hr');
  for (var i = 0; i < hr.length; i++) {
    hr[i].style.opacity = 0;
  }

  title.style.opacity = 0;
  time.style.opacity = 0;
  place.style.opacity = 0;
  description.style.opacity = 0;
}

function clear() {
  holder.style.opacity = 0;
  $('#clear').css('opacity', 0);
  setTimeout(function () {
    holder.style.display = "none";
  }, 500);
}

function toggleVisibility() {
  if (current_floor == 0) {
    ground_floor.visible = false;
    first_floor.visible = true;
    $('#ground_floor').css('opacity', 0.3);
    $('#first_floor').css('opacity', 1);
    current_floor = 1;
  } else {
    first_floor.visible = false;
    ground_floor.visible = true;
    $('#ground_floor').css('opacity', 1);
    $('#first_floor').css('opacity', 0.3);
    current_floor = 0;
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _exports = module.exports = {};

_exports.data = [
//***** BLUE BUTTONS - EXHIBITIONS & SHOWCASES *****
{
	_id: "blue_1",
	category: "Exhibitions & Showcases",
	number: "1",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Music Technology Fundamentals",
	location: "Rm. 116",
	timing: "6 - 9pm",
	description: "Showcase of interactive audio and visual installations by students in the Music Technology Fundamentals course.",
	program: "Music",
	tags: ["music", "technology"],
	floor: "first"
}, {
	_id: "blue_2",
	category: "Exhibitions & Showcases",
	number: "2",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "IM Lab",
	location: "IM Lab, Rm. 029",
	timing: "6 - 9pm",
	description: "The lab will be alive all evening with projects from all of the IM courses, student assistants, and faculty.Courses participating include Circuit Breakers!, Intro to Interactive Media, Politics of Code, and Mashups - Creating with Web APIs.",
	program: "Interactive Media",
	tags: ["interactive media"],
	floor: "ground"
}, {
	_id: "blue_3",
	category: "Exhibitions & Showcases",
	number: "3",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Yes Logo",
	location: "East Stairwell Corridor (First Floor)",
	timing: "6 - 9pm",
	description: "Works-in-progress of students of Vis Arts’ Yes Logo course. Students have been commissioned from WWF UAE to design the logo for the UAE institution working in association with WWF.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "first"
}, {
	_id: "blue_4",
	category: "Exhibitions & Showcases",
	number: "4",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Collaborative Art",
	location: "Design Studio, Rm. 124",
	timing: "6 - 9pm",
	description: "Current work of students in Theater’s Collaborative Art course.",
	program: "Theater",
	tags: ["theater"],
	floor: "first"
}, {
	_id: "blue_5",
	category: "Exhibitions & Showcases",
	number: "5",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Painting by Seeing: Private Theater, Public Meaning",
	location: "Mixed Media Studio, Rm. 174",
	timing: "6 - 9pm",
	description: "Works-in-progress of students from Vis Arts’ Painting by Seeing course.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "first"
}, {
	_id: "blue_6",
	category: "Exhibitions & Showcases",
	number: "6",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Foundations of 3D",
	location: "Sculpture Studio, Rm. 043, Vis Arts Sculpture Hallway",
	timing: "6 - 9pm",
	description: "Works-in-progress of students from Vis Arts’ Foundations of 3D course.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "blue_7",
	category: "Exhibitions & Showcases",
	number: "7",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Foundations of 2D",
	location: "Vis Arts Mixed Media Hallway",
	timing: "6 - 9pm",
	description: "Works-in-progress of students from Vis Arts’ Foundations of 2D course.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "blue_8",
	category: "Exhibitions & Showcases",
	number: "8",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Photography as Art & Practice",
	location: "Vis Arts Print/Photo Hallway",
	timing: "6 - 9pm",
	description: "Works-in-progress of students from Vis Arts’ Photography as Art & Practice course.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "blue_9",
	category: "Exhibitions & Showcases",
	number: "9",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "The Melanin Project by Ayah Rashid",
	location: "The Cube, Arts Center Lobby, The Cube Annex, Blue Recital Hall Corridor",
	timing: "6 - 9pm",
	description: "Curated by NYUAD student Ayah Rashid, The Melanin Project exhibits the works of nine, African-American photographers from Howard University in Washington, D.C.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "blue_10",
	category: "Exhibitions & Showcases",
	number: "10",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Above below, below below by John Torreano",
	location: "The Project Space, Arts Center Lobby",
	timing: "6 - 9pm",
	description: "Work by NYUAD Vis Arts Prof. John Torreano",
	program: "Visual Arts",
	tags: ["visual arts", "john torreano"],
	floor: "ground"
}, {
	_id: "blue_11_a",
	category: "Exhibitions & Showcases",
	number: "11",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "The Sketchbook Project by Anastasiia Zubareva",
	location: "Vis Arts Collaboratory, Rm. 161, Vis Arts Hallways",
	timing: "6 - 9pm",
	description: "Follow The Sketchbook Project around the Vis Arts hallways to see sketchbooks of various NYUAD student, staff, and faculty.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "blue_11_b",
	category: "Exhibitions & Showcases",
	number: "11",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "The Sketchbook Project by Anastasiia Zubareva",
	location: "Vis Arts Collaboratory, Rm. 161, Vis Arts Hallways",
	timing: "6 - 9pm",
	description: "Follow The Sketchbook Project around the Vis Arts hallways to see sketchbooks of various NYUAD student, staff, and faculty.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "blue_12",
	category: "Exhibitions & Showcases",
	number: "12",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Poetry Chapbooks from NYUAD Students: Out of the Archives",
	location: "West Elevator Atrium (First Floor)",
	timing: "6 - 9pm",
	description: "Several years of student-made chapbooks will come out of the NYUAD library special collections and into the lobby of the Arts Center. Visitors may handle, read, inspect these works--and get inspired to make their own chapbook at the work table next to the display.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "first"
},
//***** GREEN BUTTONS - SCREENINGS *****
{
	_id: "green_1",
	category: "Screenings",
	number: "1",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "JINN",
	location: "In front of Rm. 036",
	timing: "6 - 9pm",
	description: "A choreomusical work conceived and performed by Professor Carlos Guedes, Program Head of Music, Nella Turkki, Cristina Ioan, and Kirk Woolford.",
	tags: ["music", "carlos guedes"],
	floor: "zero"
}, {
	_id: "green_2",
	category: "Screenings",
	number: "2",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "Transwater",
	location: "Rm. 116",
	timing: "6 - 9pm",
	description: "A short film by Instructor Omar Shoukri exploring the topics of identity and existence throuhg the lens of water.",
	program: "Music",
	tags: ["music", "film", "omar shoukri"],
	floor: "first"
}, {
	_id: "green_3",
	category: "Screenings",
	number: "3",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "INWARD",
	location: "Rm. 146",
	timing: "6 - 9pm",
	description: "A short film produced and directed by Instructor Omar Shoukri.",
	program: "Music",
	tags: ["music", "film", "omar shoukri"],
	floor: "first"
}, {
	_id: "green_4",
	category: "Screenings",
	number: "4",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "NYUAD Student Films",
	location: "Rm. 118",
	timing: "6 - 9pm",
	description: "Works from Film Capstone, and Sound, Image & Story courses.",
	program: "Film",
	tags: ["film"],
	floor: "first"
},
//***** YELLOW BUTTONS - PERFORMANCES & EVENTS *****
{
	_id: "yellow_1",
	category: "Performances & Events",
	number: "1",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "Electronic Music DJ Sets",
	location: "Arts Center Plaza",
	timing: "6 - 9pm",
	description: "Ongoing DJ sets by students of Electronic Music Production class with Instructor Omar Shoukri.",
	program: "Music",
	tags: ["music", "omar shoukri"],
	floor: "zero"
}, {
	_id: "yellow_2",
	category: "Performances & Events",
	number: "2",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "Selected Works by John Cage and Kurt Schwitters: NYUAD Vocal Ensemble",
	location: "Arts Center Lobby",
	timing: "6 - 6:15pm, 7 - 7:15pm, 8 - 8:15pm",
	description: "Performances of John Cage’s “ear for EAR Antiphonies” and “William’s Mix,” plus Kurt Schwitters’ “Scherzo” from “Ur Sonate” by Professors Clare and David Lesser and the NYUAD Vocal Ensemble.",
	program: "Music",
	tags: ["music"],
	floor: "zero"
}, {
	_id: "yellow_3",
	category: "Performances & Events",
	number: "3",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "Piano Performances by Professor David Lesser",
	location: "Blue Hall",
	timing: "6:30pm, 7:30pm, 8:30pm",
	description: "Live performance. by Prof. David Lesser",
	program: "Music",
	tags: ["music"],
	floor: "zero"
}, {
	_id: "yellow_4",
	category: "Performances & Events",
	number: "4",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "Live Broadcast: Howler Radio",
	location: "Rm. 155",
	timing: "6 - 9pm",
	description: "Howler Radio will be broadcasting live the whole night at <a target='_blank' href='http://radio.nyuad.im'>radio.nyuad.im</a>.",
	program: "Interactive Media",
	tags: ["interactive media"],
	floor: "first"
}, {
	_id: "yellow_5",
	category: "Performances & Events",
	number: "5",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "First Drafts: Readings of Scenes from 8 new plays by NYUAD playwriting students",
	location: "Rm. 144",
	timing: "7 - 8:30pm",
	description: "Works-in-process by students of Visiting Professor Abhishek Majumdar.",
	program: "Theater",
	tags: ["theater"],
	floor: "first"
}, {
	_id: "yellow_6",
	category: "Performances & Events",
	number: "6",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "Artist talk and Q&A with Vikram Divecha",
	location: "Mixed Media Studio, Rm. 174",
	timing: "7:30 - 8pm",
	description: "Professor Salwa Mikdadi will lead an artist talk and Q&A with UAE-based artist Vikram Divecha.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "first"
}, {
	_id: "yellow_7",
	category: "Performances & Events",
	number: "7",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "Music by Carlos Guedes",
	location: "Rm. 010",
	timing: "6:45pm, 7:45pm",
	description: "Professor Carlos Guedes’, Program Head of Music, “Mimo” for Alto Flute, “1985.2” for Soprano Sax and fixed media electronics. Cristina Ioan on Alto Flute, and Emil Sein on Soprano Saxophone.",
	program: "Music",
	tags: ["music", "carlos guedes"],
	floor: "ground"
}, {
	_id: "yellow_8",
	category: "Performances & Events",
	number: "8",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "Poetry Reading: Advanced Poetry Workshop plus Open Mic",
	location: "West Elevator Atrium (First Floor)",
	timing: "7:30 - 8:30pm",
	description: "Students in Advanced Poetry Workshop will read their works- in-progress: including instant odes to Open Studios! Other willing poets (experienced and new) are welcome to read during the open mic session.",
	program: "Theater",
	tags: ["theater"],
	floor: "first"
},
//***** PINK BUTTONS - INSTALLATIONS *****
{
	_id: "pink_1",
	category: "Installations",
	number: "1",
	color: {
		name: "pink",
		r: 255,
		g: 72,
		b: 152
	},
	title: "Sounds of Sir Bani Yas",
	location: "Rm. 036",
	timing: "6 - 9pm",
	description: "A haptic installation by Mac Davel Kalumbi, Laura Waltje, Professor Carlos Guedes, Program Head of Music, and collaborators.",
	program: "Music",
	tags: ["music", "carlos guedes"],
	floor: "ground"
}, {
	_id: "pink_2",
	category: "Installations",
	number: "2",
	color: {
		name: "pink",
		r: 255,
		g: 72,
		b: 152
	},
	title: "Sym:sis",
	location: "Rm. 112",
	timing: "6 - 9pm",
	description: "Instructor João Menezes’ audio visual installation illustrating the relationship between real time computer graphics and a 4 channel sound composition.",
	program: "Music",
	tags: ["music", "joão menezes"],
	floor: "first"
}, {
	_id: "pink_3",
	category: "Installations",
	number: "3",
	color: {
		name: "pink",
		r: 255,
		g: 72,
		b: 152
	},
	title: "Fractured",
	location: "Outside IM Lab, Rm. 029",
	timing: "6 - 9pm",
	description: "Look into the fractured mirror. An interactive installation piece by James Hosken.",
	program: "Interactive Media",
	tags: ["interactive media", "james hosken"],
	floor: "ground"
}, {
	_id: "pink_4",
	category: "Installations",
	number: "4",
	color: {
		name: "pink",
		r: 255,
		g: 72,
		b: 152
	},
	title: "Drone Dazzle Dance",
	location: "Arts Center Plaza",
	timing: "9pm",
	description: "Don’t miss this interactive drone experience. Bring your phones!",
	program: "Interactive Media",
	tags: ["interactive media", "james hosken"],
	floor: "ground"
}, {
	_id: "pink_5",
	category: "Installations",
	number: "5",
	color: {
		name: "pink",
		r: 255,
		g: 72,
		b: 152
	},
	title: "Video Projection by Harshini Karunaratne",
	location: "Arts Center Lobby",
	timing: "6 - 6:15pm, 7 - 7:15pm, 8-8:15pm",
	description: "A real-time Video Projection by Harshini Karunaratne to accompany John Cage’s 'ear for EAR Antiphonies.'!",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "pink_6",
	category: "Installations",
	number: "6",
	color: {
		name: "pink",
		r: 255,
		g: 72,
		b: 152
	},
	title: "Ei Zwei",
	location: "East Elevator Atrium",
	timing: "6 - 9pm",
	description: "An interactive installation by Jimena Reyes Gonzalez, Sheba Vohra, and Hindi AlTantawi.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
},
//***** RED BUTTONS - OPEN STUDIOS *****
{
	_id: "red_1",
	category: "Open Studios",
	number: "1",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Music Composition Room",
	location: "Rm. 111",
	timing: "6 - 9pm",
	description: "Music on Music on Music",
	program: "Music",
	tags: ["music"],
	floor: "first"
}, {
	_id: "red_2",
	category: "Open Studios",
	number: "2",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Costume Shop",
	location: "Rm. 157",
	timing: "6 - 9pm",
	description: "Tour the shop with Costume Instructor Judi Olson. Get dressed up with costumes and interact with a live video feed.",
	program: "Theater",
	tags: ["theater"],
	floor: "first"
}, {
	_id: "red_3",
	category: "Open Studios",
	number: "3",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Student Black Box Theater",
	location: "Rm. 045",
	timing: "6 - 9pm",
	description: "Tour this unique theater space, and view documentaries from multiple NYUAD Theater Program productions.",
	program: "Theater",
	tags: ["theater"],
	floor: "ground"
}, {
	_id: "red_4",
	category: "Open Studios",
	number: "4",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Equipment Center",
	location: "Rm. 018",
	timing: "6 - 9pm",
	description: "The Equipment Center is the hub of all filmmaking activity. Come by, meet the staff, and get some hands on experience with some of the latest cameras and equipment.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "red_5",
	category: "Open Studios",
	number: "5",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Vis Arts Co-Working Studio",
	location: "Rm. 015",
	timing: "6 - 9pm",
	description: "The Co-Working Studio is a unique mentorship opportunity for a select group of emerging visual artists and curators. Now featured in the Co-Working Studio: 'Venezuela:land of contrasts' by Sara Pan Algarra and Carlos Paez, 'Truck Art' by the Pakistan Student Association, Selected works-in-progress by the Fall 2016 Co-Working Studio Cohort.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "red_6",
	category: "Open Studios",
	number: "6",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Scene Shop",
	location: "Rm. 030",
	timing: "6 - 9pm",
	description: "Join Scene Shop Supervisor Andrew Riedemann for a tour of the Scene Shop: play life-size jenga, take a try at using a wooden catapult, and watch the CNC Router perform air cuts.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "red_7",
	category: "Open Studios",
	number: "7",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Open Studios: Vis Arts Capstones",
	location: "Vis Arts Studios Rm.160 - 171",
	timing: "6 - 9pm",
	description: "Featuring:<ul><li>Sophie Arni - Rm.166</li><li>Shamsa Al Dhaheri - Rm.171</li><li>Sherina Al Sowaidi - Rm.162</li><li>Noor Al Mehairbi - Rm.168</li><li>Souhail Wardi - Rm. 164</li><li>Saber L Williams - Rm.160</li><li>Agustina Zegers - Rm.169</li></ul>",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "first"
}, {
	_id: "red_8_a",
	category: "Open Studios",
	number: "8",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Open Studios: Arts Professors & Instructors",
	location: "Arts Studios Rm.013, 042, 046, 167 - 179",
	timing: "8 - 9pm",
	description: "Featuring:<ul><li>Sandra Peters - Rm.013</li><li>Jonny Farrow - Rm.046</li><li>David Darts - Rm.042</li><li>Tarek Al Ghoussein - Rm.176</li><li>Wendy Bednarz - Rm.178</li><li>Joanne Savio</li><li>Goffredo Puccetti - Rm.179</li><li>Laura Schneider - Rm.167</li><li>Meredith Meer</li></ul>",
	program: "Arts",
	tags: ["arts"],
	floor: "ground"
}, {
	_id: "red_8_b",
	category: "Open Studios",
	number: "8",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Open Studios: Arts Professors & Instructors",
	location: "Arts Studios Rm.013, 042, 046, 167 - 179",
	timing: "8 - 9pm",
	description: "Featuring:<ul><li>Sandra Peters - Rm.013</li><li>Jonny Farrow - Rm.046</li><li>David Darts - Rm.042</li><li>Tarek Al Ghoussein - Rm.176</li><li>Wendy Bednarz - Rm.178</li><li>Joanne Savio</li><li>Goffredo Puccetti - Rm.179</li><li>Laura Schneider - Rm.167</li><li>Meredith Meer</li></ul>",
	program: "Arts",
	tags: ["arts"],
	floor: "ground"
}, {
	_id: "red_8_c",
	category: "Open Studios",
	number: "8",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Open Studios: Arts Professors & Instructors",
	location: "Arts Studios Rm.013, 042, 046, 167 - 179",
	timing: "8 - 9pm",
	description: "Featuring:<ul><li>Sandra Peters - Rm.013</li><li>Jonny Farrow - Rm.046</li><li>David Darts - Rm.042</li><li>Tarek Al Ghoussein - Rm.176</li><li>Wendy Bednarz - Rm.178</li><li>Joanne Savio</li><li>Goffredo Puccetti - Rm.179</li><li>Laura Schneider - Rm.167</li><li>Meredith Meer</li></ul>",
	program: "Arts",
	tags: ["arts"],
	floor: "first"
}, {
	_id: "red_8_d",
	category: "Open Studios",
	number: "8",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Open Studios: Arts Professors & Instructors",
	location: "Arts Studios Rm.013, 042, 046, 167 - 179",
	timing: "8 - 9pm",
	description: "Featuring:<ul><li>Sandra Peters - Rm.013</li><li>Jonny Farrow - Rm.046</li><li>David Darts - Rm.042</li><li>Tarek Al Ghoussein - Rm.176</li><li>Wendy Bednarz - Rm.178</li><li>Joanne Savio</li><li>Goffredo Puccetti - Rm.179</li><li>Laura Schneider - Rm.167</li><li>Meredith Meer</li></ul>",
	program: "Arts",
	tags: ["arts"],
	floor: "first"
}, {
	_id: "red_8_e",
	category: "Open Studios",
	number: "8",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Open Studios: Arts Professors & Instructors",
	location: "Arts Studios Rm.013, 042, 046, 167 - 179",
	timing: "8 - 9pm",
	description: "Featuring:<ul><li>Sandra Peters - Rm.013</li><li>Jonny Farrow - Rm.046</li><li>David Darts - Rm.042</li><li>Tarek Al Ghoussein - Rm.176</li><li>Wendy Bednarz - Rm.178</li><li>Joanne Savio</li><li>Goffredo Puccetti - Rm.179</li><li>Laura Schneider - Rm.167</li><li>Meredith Meer</li></ul>",
	program: "Arts",
	tags: ["arts"],
	floor: "first"
},
//***** TEAL BUTTONS - WORKSHOPS & DEMOS *****
{
	_id: "teal_1",
	category: "Workshops & Demos",
	number: "1",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Tracking",
	location: "Music Studio A & B",
	timing: "6 - 9pm",
	description: "Watch live recordings and learn new producing techniques with Instructor Matteo Marciano.",
	program: "Music",
	tags: ["music"],
	floor: "first"
}, {
	_id: "teal_2",
	category: "Workshops & Demos",
	number: "2",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Electronics Play Station",
	location: "IM Lab, Rm. 029",
	timing: "6 - 9pm",
	description: "Basic electronics and components will be readily available to play with and create experimental circuits.",
	program: "Interactive Media",
	tags: ["interactive media"],
	floor: "ground"
}, {
	_id: "teal_3",
	category: "Workshops & Demos",
	number: "3",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Alternate Realities",
	location: "Rm. 153",
	timing: "6:30 - 8:30pm",
	description: "Get lost in Virtual Reality with Professor Pierre Depaz and the HTC Vive.",
	program: "Interactive Media",
	tags: ["interactive media"],
	floor: "first"
}, {
	_id: "teal_4",
	category: "Workshops & Demos",
	number: "4",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Direct a Scene",
	location: "Sound Stage, Rm. 025",
	timing: "6 - 8pm",
	description: "Watch a real film set in action! Students will set up lights, cameras, and direct actors. Please note: this will be a working set, so please silence your phones, and enjoy the show.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "teal_5",
	category: "Workshops & Demos",
	number: "5",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Video Editing Crash Course: Avid",
	location: "Editing Lab, Rm. 019",
	timing: "6:30 - 7:30pm",
	description: "Tour the Editing Lab, the Arts Center’s state-of-the art editing facility, and meet the University’s Avid-certified trainer, Instructor Maruan Manaja.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "teal_6",
	category: "Workshops & Demos",
	number: "6",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Acting 101",
	location: "Rm. 021",
	timing: "8 - 9pm",
	description: "Professor Scandar Copti, Program Head of Film & New Media, will be conducting a series of acting exercises. No prior experience needed! So please come, and join the short exercises to try acting yourself.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "teal_7",
	category: "Workshops & Demos",
	number: "7",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Silkscreening",
	location: "Print/Photo Studio, Rm. 165",
	timing: "6 - 7:30pm",
	description: "Mixed Media Instructor Laura Schneider demonstrates the art of silkscreen. Practice pulling your own screen to create your own custom t-shirt or tote bag.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "first"
}, {
	_id: "teal_8",
	category: "Workshops & Demos",
	number: "8",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "5-Minute Dovetail Joinery",
	location: "Wood Shop, Rm. 041",
	timing: "6 - 9pm",
	description: "Sculpture Instructor Dan Osleeb demonstrates how to make a dovetail joint in just 5 minutes.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "teal_9",
	category: "Workshops & Demos",
	number: "9",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Make a Chapbook: Fill it with Instant Odes to Open Studios",
	location: "West Elevator Atrium (First Floor)",
	timing: "6 - 7:30pm",
	description: "Make your own chapbook to take around the Arts Center and fill with “instant odes to open studios.” Learn non-adhesive binding techniques and get a mini-lesson on the age-old poetic form, “the ode.”",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "first"
},
//***** FOOD BUTTONS *****
{
	_id: "chicken",
	category: "Food",
	number: "",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Chicken!",
	location: "",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Arts",
	tags: ["food"],
	floor: ""
}, {
	_id: "samosa",
	category: "Food",
	number: "",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Samosas!",
	location: "",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Arts",
	tags: ["food"],
	floor: ""
}, {
	_id: "popcorn",
	category: "Food",
	number: "",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Popcorn!",
	location: "",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Arts",
	tags: ["food"],
	floor: ""
}, {
	_id: "sweets",
	category: "Food",
	number: "",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Sweets!",
	location: "",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Arts",
	tags: ["food"],
	floor: ""
}, {
	_id: "sushi",
	category: "Food",
	number: "",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Sushi!",
	location: "",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Arts",
	tags: ["food"],
	floor: ""
}, {
	_id: "drinks",
	category: "Food",
	number: "",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Drinks!",
	location: "",
	timing: "6 - 9pm",
	description: "Who's thirsty?",
	program: "Arts",
	tags: ["food"],
	floor: ""
}, {
	_id: "veg",
	category: "Food",
	number: "",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Veg!",
	location: "",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Arts",
	tags: ["food"],
	floor: ""
}];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _exports = module.exports = {};

_exports.pulsate = function () {
  setInterval(pulse, 800);
};

function pulse() {
  if (document.getElementById("howler_logo").style.opacity == 0.2) document.getElementById("howler_logo").style.opacity = 1;else document.getElementById("howler_logo").style.opacity = 0.2;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// var ViewZoom = function(){
//
//     var project = paper.project;
//     var factor = 1.25;
//
//     var _minZoom;
//     var _maxZoom;
//     var mouseNativeStart =  paper.Point;
//     var viewCenterStart = paper.Point;
//
//     this.project = project;
//
//     var view = this.project.view;
//
//     ($("#myCanvas")).mousewheel(function(event){
//         var mousePosition = new paper.Point(event.offsetX, event.offsetY);
//         this.changeZoomCentered(event.deltaY, mousePosition);
//     });
//
//     view.on("mousedown", function(ev) {
//         this.viewCenterStart = view.center;
//         // Have to use native mouse offset, because ev.delta
//         //  changes as the view is scrolled.
//         this.mouseNativeStart = new paper.Point(ev.event.offsetX, ev.event.offsetY);
//     });
//
//     view.on("mousedrag", function(ev) {
//         if(this.viewCenterStart){
//             var nativeDelta = new paper.Point(
//                 ev.event.offsetX - this.mouseNativeStart.x,
//                 ev.event.offsetY - this.mouseNativeStart.y
//             );
//             // Move into view coordinates to subract delta,
//             //  then back into project coords.
//             view.center = view.viewToProject(
//                 view.projectToView(this.viewCenterStart)
//                 .subtract(nativeDelta));
//         }
//     });
//
//     view.on("mouseup", function(ev) {
//         if(this.mouseNativeStart){
//             this.mouseNativeStart = null;
//             this.viewCenterStart = null;
//         }
//     });
//
//     this.zoom = function(){
//         return this.project.view.zoom;
//     }
//
//     this.zoomRange = function(){
//         return [this._minZoom, this._maxZoom];
//     }
//
//     /**
//      * Set zoom level.
//      * @returns zoom level that was set, or null if it was not changed
//      */
//     this.setZoomConstrained = function(zoom){
//         if(this._minZoom) {
//             zoom = Math.max(zoom, this._minZoom);
//         }
//         if(this._maxZoom){
//             zoom = Math.min(zoom, this._maxZoom);
//         }
//         var view = this.project.view;
//         if(zoom != view.zoom){
//             view.zoom = zoom;
//             return zoom;
//         }
//         return null;
//     }
//
//     this.setZoomRange = function(range){
//         var view = this.project.view;
//         var aSize = range.shift();
//         var bSize = range.shift();
//         var a = aSize && Math.min(
//             view.bounds.height / aSize.height,
//             view.bounds.width / aSize.width);
//         var b = bSize && Math.min(
//             view.bounds.height / bSize.height,
//             view.bounds.width / bSize.width);
//         var min = Math.min(a,b);
//         if(min){
//             this._minZoom = min;
//         }
//         var max = Math.max(a,b);
//         if(max){
//             this._maxZoom = max;
//         }
//         return [this._minZoom, this._maxZoom];
//     }
//
//     this.changeZoomCentered = function(delta, mousePos) {
//         if (!delta) {
//             return;
//         }
//         var view = this.project.view;
//         var oldZoom = view.zoom;
//         var oldCenter = view.center;
//         var viewPos = view.viewToProject(mousePos);
//
//         var newZoom = delta > 0
//             ? view.zoom * this.factor
//             : view.zoom / this.factor;
//         newZoom = this.setZoomConstrained(newZoom);
//
//         if(!newZoom){
//             return;
//         }
//
//         var zoomScale = oldZoom / newZoom;
//         var centerAdjust = viewPos.subtract(oldCenter);
//         var offset = viewPos.subtract(centerAdjust.multiply(zoomScale))
//             .subtract(oldCenter);
//
//         view.center = view.center.add(offset);
//     };
//
//     this.zoomTo = function(rect){
//         var view = this.project.view;
//         view.center = rect.center;
//         view.zoom = Math.min(
//             view.viewSize.height / rect.height,
//             view.viewSize.width / rect.width);
//     }
// }


//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------

//
// setSizeCanvas = function(){
// 	var ctx = canvas.getContext('2d');
// 	trackTransforms(ctx);
// 	function redraw(){
// 		// Clear the entire canvas
// 		// var p1 = ctx.transformedPoint(0,0);
// 		// var p2 = ctx.transformedPoint(canvas.width,canvas.height);
// 		// ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
//
// 		// Alternatively:
// 		ctx.save();
// 		ctx.setTransform(1,0,0,1,0,0);
// 		ctx.clearRect(0,0,canvas.width,canvas.height);
// 		ctx.restore();
//
//
// 	}
// 	redraw();
//
// 	var lastX=canvas.width/2, lastY=canvas.height/2;
// 	var dragStart,dragged;
// 	canvas.addEventListener('mousedown',function(evt){
// 		document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
// 		lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
// 		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
// 		dragStart = ctx.transformedPoint(lastX,lastY);
// 		dragged = false;
// 	},false);
// 	canvas.addEventListener('mousemove',function(evt){
// 		lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
// 		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
// 		dragged = true;
// 		if (dragStart){
// 			var pt = ctx.transformedPoint(lastX,lastY);
// 			ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
// 			redraw();
// 		}
// 	},false);
// 	canvas.addEventListener('mouseup',function(evt){
// 		dragStart = null;
// 		if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
// 	},false);
//
// 	var scaleFactor = 1.1;
// 	var zoom = function(clicks){
// 		var pt = ctx.transformedPoint(lastX,lastY);
// 		ctx.translate(pt.x,pt.y);
// 		var factor = Math.pow(scaleFactor,clicks);
// 		ctx.scale(factor,factor);
// 		ctx.translate(-pt.x,-pt.y);
// 		redraw();
// 	}
//
// var handleScroll = function(evt){
// 		var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
// 		if (delta) zoom(delta);
// 		return evt.preventDefault() && false;
// 	};
// 	canvas.addEventListener('DOMMouseScroll',handleScroll,false);
// 	canvas.addEventListener('mousewheel',handleScroll,false);
// };
//
// // Adds ctx.getTransform() - returns an SVGMatrix
// // Adds ctx.transformedPoint(x,y) - returns an SVGPoint
// function trackTransforms(ctx){
// 	var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
// 	var xform = svg.createSVGMatrix();
// 	ctx.getTransform = function(){ return xform; };
//
// 	var savedTransforms = [];
// 	var save = ctx.save;
// 	ctx.save = function(){
// 		savedTransforms.push(xform.translate(0,0));
// 		return save.call(ctx);
// 	};
// 	var restore = ctx.restore;
// 	ctx.restore = function(){
// 		xform = savedTransforms.pop();
// 		return restore.call(ctx);
// 	};
//
// 	var scale = ctx.scale;
// 	ctx.scale = function(sx,sy){
// 		xform = xform.scaleNonUniform(sx,sy);
// 		return scale.call(ctx,sx,sy);
// 	};
// 	var rotate = ctx.rotate;
// 	ctx.rotate = function(radians){
// 		xform = xform.rotate(radians*180/Math.PI);
// 		return rotate.call(ctx,radians);
// 	};
// 	var translate = ctx.translate;
// 	ctx.translate = function(dx,dy){
// 		xform = xform.translate(dx,dy);
// 		return translate.call(ctx,dx,dy);
// 	};
// 	var transform = ctx.transform;
// 	ctx.transform = function(a,b,c,d,e,f){
// 		var m2 = svg.createSVGMatrix();
// 		m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
// 		xform = xform.multiply(m2);
// 		return transform.call(ctx,a,b,c,d,e,f);
// 	};
// 	var setTransform = ctx.setTransform;
// 	ctx.setTransform = function(a,b,c,d,e,f){
// 		xform.a = a;
// 		xform.b = b;
// 		xform.c = c;
// 		xform.d = d;
// 		xform.e = e;
// 		xform.f = f;
// 		return setTransform.call(ctx,a,b,c,d,e,f);
// 	};
// 	var pt  = svg.createSVGPoint();
// 	ctx.transformedPoint = function(x,y){
// 		pt.x=x; pt.y=y;
// 		return pt.matrixTransform(xform.inverse());
// 	}
// }


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);