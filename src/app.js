//---SCRIPTS
import * as ev from './js/event-handler.js'
import './js/view-zoom-handler.js'

//---CSS
import './scss/typography.scss'
import './scss/base.scss'

document.body.addEventListener('onload', ev.init(), true);

function check(){
  console.log('check');
}
