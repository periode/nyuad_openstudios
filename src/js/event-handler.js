var exports = module.exports = {};

import * as all_events from './data.js'

console.log(all_events);

var map, buttons;

var current_floor = 0;

var holder, title, time, place, description;

var targetStartX, targetStartY, touchStartX, touchStartY;

var zoomer;
var canvas;

var first_floor, ground_floor;

function isMobile(){
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    return true;
	}else{
		return false;
	}
}

function handleButton (event){
  var current_id = event.target.name.replace(' ', '_');
  loadData(current_id);
}

exports.init = function() {
  canvas = document.getElementById('myCanvas');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);

  $('#switch').on('click', this.switchMap);
  $('#clear').on('click', this.clear);

  holder = document.getElementById('info');
  title = document.getElementById('title');
  time = document.getElementById('time');
  place = document.getElementById('place');
  description = document.getElementById('description');

  paper.project.importSVG("dist/svg/ground_floor.svg", function(item, origin){
    ground_floor = item;
    buttons = ground_floor.children.Layer_2.children.Buttons.children;

    if(!isMobile()){
      paper.project.view.zoom = 0.75;
      canvas.style.top = '-12%';
      canvas.style.left = '8%';
    }

    ground_floor.bounds.width = 980;
    ground_floor.bounds.height = 677;

    for(var i = 0; i < buttons.length; i++){
      buttons[i].onMouseDown =  handleButton;
    }

    ground_floor.visible = true;
  });

  paper.project.importSVG("dist/svg/first_floor.svg", function(item, origin){
    first_floor = item;
    buttons = first_floor.children.Layer_2.children.Buttons.children;

    first_floor.bounds.width = 980;
    first_floor.bounds.height = 677;

    for(var i = 0; i < buttons.length; i++){
      buttons[i].onMouseDown =  handleButton;
    }

    first_floor.visible = false;
  });

  // Set initial position.
  canvas.style.position = 'absolute'; // 'absolute' also works.
  canvas.addEventListener('touchstart', this.dragStart);
  canvas.addEventListener('touchmove',  this.dragMove);
}

exports.switchMap = function (){
  canvas.style.opacity = 0;
  setTimeout(toggleVisibility, 500);
  setTimeout(function(){canvas.style.opacity = 1;}, 525);
}

function loadData(current_id){
  for(var i = 0; i < all_events.data.length; i++){

    if(all_events.data[i]._id == current_id)
      populate(all_events.data[i]);
  }
}

exports.dragStart = function(e) {
  targetStartX = parseInt(e.target.style.left);
  targetStartY = parseInt(e.target.style.top);
  touchStartX  = e.touches[0].pageX;
  touchStartY  = e.touches[0].pageY;
}

exports.dragMove = function(e) {
  // Calculate touch offsets
  var touchOffsetX = e.touches[0].pageX - touchStartX,
      touchOffsetY = e.touches[0].pageY - touchStartY;
  // Add touch offsets to original target coordinates,
  // then assign them to target element's styles.
  e.target.style.left = targetStartX + touchOffsetX + 'px';
  e.target.style.top  = targetStartY + touchOffsetY + 'px';
}

function populate(info){

  console.log('populate', info);
  if(holder.style.opacity != 1){
    holder.style.display = "block";
    holder.style.opacity = 1;
  }


  var c = ('rgb('+info.color.r+','+info.color.g+','+info.color.b+');').toString();

  // holder.setAttribute('style', 'color: '+c+'; border-color:'+c);
  // holder.setAttribute('style', 'border-color: '+c);

  hideContent();

  setTimeout(function(){
    holder.setAttribute('style', 'color: '+c+'; border-color:'+c);
    var hr = document.getElementsByTagName('hr');
    for(var i = 0; i < hr.length; i++){
      hr[i].setAttribute('style', 'background-color: '+c);
      hr[i].style.opacity = 0;
    }

    title.innerHTML = info.title;
    time.innerHTML = info.timing;
    place.innerHTML = info.location;
    description.innerHTML = info.description;
  }, 250);

  setTimeout(showContent, 500);
}

function showContent(){
  var hr = document.getElementsByTagName('hr');
  for(var i = 0; i < hr.length; i++){
    hr[i].style.opacity = 1;
  }

  title.style.opacity = 1;
  time.style.opacity = 1;
  place.style.opacity = 1;
  description.style.opacity = 1;
}

function hideContent(){
  var hr = document.getElementsByTagName('hr');
  for(var i = 0; i < hr.length; i++){
    hr[i].style.opacity = 0;
  }

  title.style.opacity = 0;
  time.style.opacity = 0;
  place.style.opacity = 0;
  description.style.opacity = 0;
}

function clear(){
  holder.style.opacity = 0;
  setTimeout(function(){holder.style.display = "none"}, 500);
}

function toggleVisibility(){
  if(current_floor == 0){
    ground_floor.visible = false;
    first_floor.visible = true;
    current_floor = 1;
  }else{
    first_floor.visible = false;
    ground_floor.visible = true;
    current_floor = 0;
  }
}
