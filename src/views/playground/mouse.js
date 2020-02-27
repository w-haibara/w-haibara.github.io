let x = 0
let y = 0

function showMouseVals(id) {
  var el = document.getElementById(id);
  el.onmousemove = function (event) {
    event = event || window.event
    //console.log(event.clientX + ", " + event.clientY)
    x = event.offsetX
    y = event.offsetY
  }
  return { x, y }
}

export { showMouseVals }