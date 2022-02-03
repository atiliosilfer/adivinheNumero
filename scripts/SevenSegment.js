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
    var dimensions = this.CalcElementDimensions(),
        width = dimensions.Width,
        height = dimensions.Height,
        segmentWidth = this.SegmentWidth * width,
        segmentInterval = this.SegmentInterval * width,
        bevelWidth = this.BevelWidth * segmentWidth,
        border = bevelWidth / segmentWidth,
        sqrt2 = Math.SQRT2,
        sqrt3 = Math.sqrt(3);

    // Calcular pontos para os 7 segmentos
    var A = 0,
        B = 1,
        C = 2,
        D = 3,
        E = 4,
        F = 5,
        G = 6;
    var points = [];
    points[A] = [
        { x: segmentWidth * border * 2 + segmentInterval / sqrt2, y: 0 },
        { x: width - segmentWidth * border * 2 - segmentInterval / sqrt2, y: 0 },
        { x: width - segmentWidth * border - segmentInterval / sqrt2, y: segmentWidth * border },
        { x: width - segmentWidth - segmentInterval / sqrt2, y: segmentWidth },
        { x: segmentWidth + segmentInterval / sqrt2, y: segmentWidth },
        { x: segmentWidth * border + segmentInterval / sqrt2, y: segmentWidth * border }
    ];

    points[B] = [
        { x: width, y: segmentWidth * border * 2 + segmentInterval / sqrt2 },
        { x: width, y: height / 2 - segmentInterval * .5 },
        { x: width - segmentWidth / 2, y: height / 2 - segmentInterval * .5 },
        { x: width - segmentWidth, y: height / 2 - segmentWidth / 2 - segmentInterval * .5 },
        { x: width - segmentWidth, y: segmentWidth + segmentInterval / sqrt2 },
        { x: width - segmentWidth * border, y: segmentWidth * border + segmentInterval / sqrt2 }
    ];

    points[G] = [
        { x: segmentWidth + segmentInterval / 2 * sqrt3, y: height / 2 - segmentWidth / 2 },
        { x: width - segmentWidth - segmentInterval / 2 * sqrt3, y: height / 2 - segmentWidth / 2 },
        { x: width - segmentWidth / 2 - segmentInterval / 2 * sqrt3, y: height / 2 },
        { x: width - segmentWidth - segmentInterval / 2 * sqrt3, y: height / 2 + segmentWidth / 2 },
        { x: segmentWidth + segmentInterval / 2 * sqrt3, y: height / 2 + segmentWidth / 2 },
        { x: segmentWidth / 2 + segmentInterval / 2 * sqrt3, y: height / 2 }
    ];

    points[C] = this.FlipVertical(points[B], height);
    points[D] = this.FlipVertical(points[A], height);
    points[E] = this.FlipHorizontal(points[C], width);
    points[F] = this.FlipHorizontal(points[B], width);
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