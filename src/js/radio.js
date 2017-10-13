var exports = module.exports = {};

var beat;
exports.init = function(){
  document.getElementById("audio-player").volume = 0;

  document.getElementById("howler_logo").onclick = toggleAudio;
  document.getElementById("howler_logo").addEventListener('keypress', function(e){
    if(e.key === " ")
      toggleAudio();
  });
}

function toggleAudio(){
  if(document.getElementById("audio-player").volume == 1){
    document.getElementById("audio-player").volume = 0;
    clearInterval(beat);
  }else{
    document.getElementById("audio-player").volume = 1;
    beat = setInterval(pulse, 800);
  }
}

function pulse(){
  if(document.getElementById("howler_logo").style.opacity == 0.2)
    document.getElementById("howler_logo").style.opacity = 1;
  else
    document.getElementById("howler_logo").style.opacity = 0.2;
}
