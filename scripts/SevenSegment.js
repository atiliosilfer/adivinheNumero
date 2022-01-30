/*******************************************************************************
 * SevenSegment
 * @constructor 
 ******************************************************************************/

function SevenSegment(count, canvas, color, width, height, x, y) {
    this.X = x || 0;
    this.Y = y || 0;

    this.Width = width || canvas.width;
    this.Height = height || canvas.height;

    this.FillLight = color || '#262A34';

    this.Canvas = canvas;
    this.CalcPoints();
    this.ElementArray.SetCount(count);
}

SevenSegment.prototype = new SegmentCanvas();

SevenSegment.prototype.CalcPoints = function() {
    var d = this.CalcElementDimensions(),
        w = d.Width,
        h = d.Height,
        sw = this.SegmentWidth * w,
        si = this.SegmentInterval * w,
        bw = this.BevelWidth * sw,
        br = bw / sw,
        sqrt2 = Math.SQRT2,
        sqrt3 = Math.sqrt(3);

    // Calculate Points[][] for all 7 segments
    var A = 0,
        B = 1,
        C = 2,
        D = 3,
        E = 4,
        F = 5,
        G = 6;
    var points = [];
    points[A] = [
        { x: sw * br * 2 + si / sqrt2, y: 0 },
        { x: w - sw * br * 2 - si / sqrt2, y: 0 },
        { x: w - sw * br - si / sqrt2, y: sw * br },
        { x: w - sw - si / sqrt2, y: sw },
        { x: sw + si / sqrt2, y: sw },
        { x: sw * br + si / sqrt2, y: sw * br }
    ];

    points[B] = [
        { x: w, y: sw * br * 2 + si / sqrt2 },
        { x: w, y: h / 2 - si * .5 },
        { x: w - sw / 2, y: h / 2 - si * .5 },
        { x: w - sw, y: h / 2 - sw / 2 - si * .5 },
        { x: w - sw, y: sw + si / sqrt2 },
        { x: w - sw * br, y: sw * br + si / sqrt2 }
    ];

    points[G] = [
        { x: sw + si / 2 * sqrt3, y: h / 2 - sw / 2 },
        { x: w - sw - si / 2 * sqrt3, y: h / 2 - sw / 2 },
        { x: w - sw / 2 - si / 2 * sqrt3, y: h / 2 },
        { x: w - sw - si / 2 * sqrt3, y: h / 2 + sw / 2 },
        { x: sw + si / 2 * sqrt3, y: h / 2 + sw / 2 },
        { x: sw / 2 + si / 2 * sqrt3, y: h / 2 }
    ];

    points[C] = this.FlipVertical(points[B], h);
    points[D] = this.FlipVertical(points[A], h);
    points[E] = this.FlipHorizontal(points[C], w);
    points[F] = this.FlipHorizontal(points[B], w);
    this.Points = points;
}

SevenSegment.prototype.CharacterMasks = (function() {
    return {
        '0': parseInt("0111111", 2),
        '1': parseInt("0000110", 2),
        '2': parseInt("1011011", 2),
        '3': parseInt("1001111", 2),
        '4': parseInt("1100110", 2),
        '5': parseInt("1101101", 2),
        '6': parseInt("1111101", 2),
        '7': parseInt("0000111", 2),
        '8': parseInt("1111111", 2),
        '9': parseInt("1100111", 2)
    };
}());