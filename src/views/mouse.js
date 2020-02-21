let x = 0
let y = 0
function showMouseVals() {
    var el = document.getElementById("game_vb");
    el.onmousemove = function(event) {
        event = event || window.event // IE対応
        //console.log(event.clientX + ", " + event.clientY)
        x = event.offsetX
        y = event.offsetY
    }
    return {x, y}
}

export { showMouseVals }