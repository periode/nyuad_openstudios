var exports = module.exports = {};

var socket, overlay, countdown, stream;

exports.init = function(){
  overlay = document.getElementById('overlay');
  countdown = document.getElementById('countdown');
  stream = document.getElementById('stream');

  if(SOCKET_SERVER != undefined)
    initSocket();
};

function initSocket(){
  //TODO check if the 'onend' event actually exists 
  // countdown.addEventListener('onend', function(){
  //   countdown.style.display = "none";
  //   stream.style.display = "block";
  // });

  socket = io.connect(SOCKET_SERVER);

  socket.on('connect', function(){
    console.log('connected to socket server!');
  });

  socket.on('update-status', function(data){
    if(data.countdown){
      countdown.style.display = "block";
      countdown.play();
    }else{
      countdown.style.display = "none";
    }

    if(data.stream)
      stream.style.display = "block";

    stream.src = "../dist/loading-darts.gif";
  });

  socket.on('display-countdown', function(){
    if(stream.style.display == "block")
      stream.style.display = "none";

    countdown.style.display = "block";
    countdown.play();
  });

  socket.on('hide-countdown', function(){
    countdown.style.display = "none";
    countdown.pause();
    countdown.currentTime = 0;

    stream.style.display = "block";
    stream.src = "../dist/loading-darts.gif";
  });

  socket.on('display-stream', function(){
    if(countdown.style.display == "block")
      countdown.style.display = "none";

    stream.style.display = "block";
    stream.setAttribute('class', 'offset');
  });

  socket.on('hide-stream', function(){
    stream.src = "../dist/loading-darts.gif";
    stream.removeAttribute('class');
  });

  socket.on('new-frame', function(data){
    stream.src = data;
  });
}
