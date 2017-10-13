var exports = module.exports = {};

var socket, overlay, countdown, stream;

exports.init = function(){
  overlay = document.getElementById('overlay');
  countdown = document.getElementById('countdown');
  stream = document.getElementById('stream');

  countdown.addEventListener('onend', function(){
    countdown.style.display = "none";
  });

  socket = io.connect("localhost:9999");

  socket.on('connect', function(){
    console.log('connected to socket server!');
  });

  socket.on('update-status', function(data){
    if(data.overlay)
      overlay.style.display = "block";

    if(data.countdown){
      countdown.style.display = "block";
      countdown.play();
    }

    if(data.stream)
      stream.style.display = "block";
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

    stream.style.display = "block";
  });

  socket.on('hide-stream', function(){
    stream.style.display = "none";
  });

  socket.on('new-frame', function(data){
    stream.src = data;
  });

};
