/*******************************************************************************
 * SegmentCanvas
 * @constructor 
 * Funcionalidade base para desenhar um segmento de display no canvas.
 * Repetição atraves de cada elemento (this.ElementArray) e desenhe cada corpo do
 * segmento (this.Points[][])
 ******************************************************************************/

function SegmentCanvas() {
    "use strict";
    this.SegmentWidth = 0.16; // Largura do segment (% of Element Width)
    this.SegmentInterval = 0.03; // Espaço entre os segmentos (% of Element Width)
    this.BevelWidth = 0.16; // Tamanho da ponta do segmento (% of Element Width)
    this.FillLight = '#262A34'; // Cor de um segmento ativado
    this.FillDark = "#DDDDDD"; // Cor de um segmento desativado
    this.Padding = 10; // Padding ao redor do display
    this.Spacing = 10; // Espaço entre os elementos
    this.X = 0; // Posição inicial do canvas
    this.Y = 0;
    this.Width = 200; // Tamanho padrão do display
    this.Height = 100;
    this.ElementArray = new ElementArray(1);
}

// Define a saída de exibição do display, calcula os pontos e desenha os segmentos 
SegmentCanvas.prototype.DisplayText = function(value) {
    "use strict";
    // Recalcula os pontos caso necessário
    this.CalcPoints();
    // Define os padrões de exibição e desenha no canvas
    this.ElementArray.SetText(value, this.CharacterMasks);
    this.Draw(this.Canvas, this.ElementArray.Elements);
};

// Desenha os segmentos no canvas
SegmentCanvas.prototype.Draw = function(canvas, elements) {
    "use strict";
    // Obtem o contexto e limpa o canvas
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();

    // Calcula a largura e o espaço entre os segmentos
    var elementWidth = this.CalcElementDimensions().Width;

    // Desloca para ajustar o ponto de partida e preenchimento
    context.translate(this.X, this.Y);
    context.translate(this.Padding, this.Padding);

    // Desenha cada segmento de cada elemento
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        for (var s = 0; s < this.Points.length; s++) {
            // Escolha a cor ativada ou desativada com base na máscara de bits
            var color = (element & 1 << s) ? this.FillLight : this.FillDark;

            context.fillStyle = color;
            context.beginPath();
            context.moveTo(this.Points[s][0].x, this.Points[s][0].y);
            // Crie o caminho do segmento
            for (var p = 1; p < this.Points[s].length; p++) {
                context.lineTo(this.Points[s][p].x, this.Points[s][p].y);
            }
            context.closePath();
            context.fill();
        }
        context.translate(elementWidth + this.Spacing, 0);
    }
    context.restore();
};

// Defina o número de elementos na exibição
SegmentCanvas.prototype.SetCount = function(count) {
    "use strict";
    this.ElementArray.SetCount(count);
};

// Obter o número de elementos na exibição
SegmentCanvas.prototype.GetCount = function() {
    "use strict";
    return this.ElementArray.Elements.length;
};

// Calcula a largura e a altura de um único elemento de exibição com base no 
// número de elementos e no espaço disponível no controle
SegmentCanvas.prototype.CalcElementDimensions = function() {
    "use strict";
    var numberElements = this.ElementArray.Elements.length;
    var height = this.Height;
    height -= this.Padding * 2;

    var width = this.Width;
    width -= this.Spacing * (numberElements - 1);
    width -= this.Padding * 2;
    width /= numberElements;

    return { Width: width, Height: height };
};

// Cria um novo conjunto de pontos invertidos verticalmente
SegmentCanvas.prototype.FlipVertical = function(points, height) {
    "use strict";
    var flipped = [];
    for (var i = 0; i < points.length; i++) {
        flipped[i] = {};
        flipped[i].x = points[i].x;
        flipped[i].y = height - points[i].y;
    }
    return flipped;
};

// Cria um novo conjunto de pontos invertidos horizontalmente
SegmentCanvas.prototype.FlipHorizontal = function(points, width) {
    "use strict";
    var flipped = [];
    for (var i = 0; i < points.length; i++) {
        flipped[i] = {};
        flipped[i].x = width - points[i].x;
        flipped[i].y = points[i].y;
    }
    return flipped;
};