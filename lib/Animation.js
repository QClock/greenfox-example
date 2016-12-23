"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Animation(frame_count, fps, outerIterator, innerIterator) {
        var _this = this;

        var stubPixels = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 6;

        _classCallCheck(this, Animation);

        this.stubPixels = stubPixels;
        this.frame_count = frame_count;
        this.fps = fps;
        this.outerIterator = outerIterator;
        this.innerIterator = innerIterator;

        this.frames = new Array(frame_count).fill([]);
        this.frames = this.frames.map(function (frameArray, frameIndex) {
            return _this.renderFrame(frameArray, frameIndex);
        });
    }

    _createClass(Animation, [{
        key: "getStubPixels",
        value: function getStubPixels() {
            return new Array(this.stubPixels * 3).fill(0);
        }
    }, {
        key: "renderFrame",
        value: function renderFrame(frameArray, frameIndex) {
            var _this2 = this;

            var outer = new Array(58).fill([0, 0, 0]);
            var inner = new Array(56).fill([0, 0, 0]);

            outer = outer.map(function (pixel, pixelIndex, pixels) {
                return _this2.outerIterator(frameIndex, pixel, pixelIndex, pixels);
            });
            inner = inner.map(function (pixel, pixelIndex, pixels) {
                return _this2.innerIterator(frameIndex, pixel, pixelIndex, pixels);
            });

            outer = outer.reduce(function (collector, item) {
                return collector.concat(item);
            }, []);
            inner = inner.reduce(function (collector, item) {
                return collector.concat(item);
            }, []);

            return outer.concat(this.getStubPixels(), inner);
        }
    }, {
        key: "render",
        value: function render() {
            return {
                frames: this.frames,
                fps: this.fps
            };
        }
    }]);

    return Animation;
}();