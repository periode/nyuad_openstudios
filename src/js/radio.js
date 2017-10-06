var exports = module.exports = {};

var beat;
exports.pulsate = function(){
  beat = setInterval(pulse, 800);
  document.getElementById("howler_logo").onclick = function(){
    if(document.getElementById("audio-player").volume == 1){
      document.getElementById("audio-player").volume = 0;
      clearInterval(beat);
    }else{
      document.getElementById("audio-player").volume = 1;
      beat = setInterval(pulse, 800);
    }
  };
}

function pulse(){
  if(document.getElementById("howler_logo").style.opacity == 0.2)
    document.getElementById("howler_logo").style.opacity = 1;
  else
    document.getElementById("howler_logo").style.opacity = 0.2;
}
