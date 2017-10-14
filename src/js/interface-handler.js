var exports = module.exports = {};

var socket, overlay, countdown, stream;

exports.init = function(){
  overlay = document.getElementById('overlay');
  countdown = document.getElementById('countdown');
  stream = document.getElementById('stream');

  countdown.addEventListener('onend', function(){
    countdown.style.display = "none";
  });

  socket = io.connect("https://enframed.net:9999");

  socket.on('connect', function(){
    console.log('connected to socket server!');
  });

  socket.on('update-status', function(data){
    if(data.countdown){
      overlay.style.display = "block";
      countdown.style.display = "block";
      countdown.play();
    }

    if(data.stream){
      overlay.style.display = "block";
      stream.style.display = "block";
    }else{
      overlay.style.display = "none";
      stream.style.display = "none";
    }
  });

  socket.on('display-countdown', function(){
    if(stream.style.display == "block")
      stream.style.display = "none";

    overlay.style.display = "block";
    countdown.play();
  });

  socket.on('display-stream', function(){
    if(countdown.style.display == "block")
      countdown.style.display = "none";

    overlay.style.display = "block";
    stream.style.display = "block";
  });

  socket.on('hide-stream', function(){

    overlay.style.display = "none";
    stream.style.display = "none";
  });

  socket.on('new-frame', function(data){
    stream.src = data;
  });

};
