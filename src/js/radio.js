var exports = module.exports = {};

exports.pulsate = function(){
  setInterval(pulse, 800);
}

function pulse(){
  if(document.getElementById("howler_logo").style.opacity == 0.2)
    document.getElementById("howler_logo").style.opacity = 1;
  else
    document.getElementById("howler_logo").style.opacity = 0.2;
}
