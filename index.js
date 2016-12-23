var RemoteAnimation = require('./lib/RemoteAnimation')
var hsl2rgb = require('./hsl-to-rgb')

var REMOTE_URL = 'ws://192.168.1.101:8899'
//const REMOTE_URL = 'ws://127.0.0.1:8899'

var frame_count = 60
var fps = 30

var anim = new RemoteAnimation(
    frame_count,
    fps,
    function outer (frameIndex, pixel, index) {
        var hue = Math.round((index / 58) * 360)
        var step = hue + frameIndex

        if (step > 360){
            step = step - 360
        }

        return hsl2rgb(step, 1, 0.5)
    },
    function inner (frameIndex, pixel, index) {
        return hsl2rgb(0,0,0)
    }
)
anim.render(REMOTE_URL)