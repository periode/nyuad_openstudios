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

    if(data.stream){
      stream.style.display = "block";
      // stream.setAttribute('class', 'streaming');

      if(!isMobile()){
        stream.style.width = "125%";
        stream.style.height = '105%';
      }else{
        stream.style.marginLeft = '10%';
      }

    }


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
    if(!isMobile()){
      stream.style.width = "125%";
      stream.style.height = '105%';
    }else{
      stream.style.marginLeft = '10%';
    }
  });

  socket.on('hide-stream', function(){
    stream.src = "../dist/loading-darts.gif";
    stream.style.width = "100%";
    stream.style.height = '100%';

    if(isMobile()){
      stream.style.marginLeft = '0%';
    }
  });

  socket.on('new-frame', function(data){
    stream.src = data;
  });
}

function isMobile() {
       if( navigator.userAgent.match(/Android/i)
       || navigator.userAgent.match(/webOS/i)
       || navigator.userAgent.match(/iPhone/i)
       || navigator.userAgent.match(/iPad/i)
       || navigator.userAgent.match(/iPod/i)
       || navigator.userAgent.match(/BlackBerry/i)
       || navigator.userAgent.match(/Windows Phone/i)
       ){
          return true;
        }
       else {
          return false;
        }
      }
