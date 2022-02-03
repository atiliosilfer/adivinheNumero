/*******************************************************************************
 * Segment Array
 * @constructor 
 * Contém uma matriz de bitmask que armazena o padrão de exibição para um segmento
 * exibição. Fornece funções para definir o padrão para exibir texto
 ******************************************************************************/
function ElementArray(count) {
    "use strict";
    this.SetCount(count || 0);
}

// Bitmask padrão
ElementArray.prototype.NullMask = 0x10;

// Define o número de elementos no display
ElementArray.prototype.SetCount = function(count) {
    "use strict";
    var elementCounter = parseInt(count, 10);
    if (isNaN(elementCounter)) {
        throw "Invalid element count: " + count;
    }
    this.Elements = [elementCounter];
    for (var i = 0; i < elementCounter; i++) {
        this.Elements[i] = 0;
    }
};

// Define o padrão de exibição para mostrar o texto fornecido
ElementArray.prototype.SetText = function(value, charMaps) {
    "use strict";
    // Obtem a string do valor passado
    if (value === null) { value = ""; }
    value = value.toString();

    // Limpa os elementos
    for (var i = 0; i < this.Elements.length; i++) {
        this.SetElementValue(i, 0);
    }
    if (value.length === 0) { return; }

    // Define a máscara de bits para exibir o caractere apropriado para cada elemento
    for (var e = 0; e < this.Elements.length && e < value.length; e++) {
        var elementCounter = value[e];
        var mask = charMaps[elementCounter];
        // Use em branco ou não há bitmask para este caractere
        if (!mask) {
            mask = this.NullMask;
        }
        this.SetElementValue(e, mask);
    }
};

// Define o padrão de máscara de bits para um elemento específico na exibição
ElementArray.prototype.SetElementValue = function(i, value) {
    "use strict";
    if (i >= 0 && i < this.Elements.length) {
        this.Elements[i] = parseInt(value, 10);
    }
};