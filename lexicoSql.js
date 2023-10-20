/* Yuli Adanesne Moreno Sanchez
 * 21760028
 * Lexico para analizar querys de MySQL
 * */
function lexSql(input){
    const words = {
        1: ' ',
        2: '+',
        3: '-',
        4: '*',
        5: '/',
        6: '%',
        7: '&',
        8: '|',
        9: '^',
        10: '=',
        11: '>',
        12: '<',
        13: '>=',
        14: '<=',
        15: '<>',
        16: "'",
        17: '"',
        18: ';',
        19: ',',
        20: '`',
        30: '(',
        31: ')',
        32: '[',
        33: ']',
        34: '{',
        35: '}',
        50: '+=',
        51: '-=',
        52: '*=',
        53: '/=',
        54: '%=',
        55: '&=',
        56: '^-=',
        57: '|*=',
        60: 'ALL',
        61: 'AND',
        62: 'ANY',
        63: 'BETWEEN',
        64: 'EXISTS',
        65: 'IN',
        66: 'LIKE',
        67: 'NOT',
        68: 'OR',
        69: "SELECT",
        100: "ABORT",
        101: "ABSOLUTE",
        102: "ACCESS",
        103: "ACTION",
        104: "ADD",
        105: "AFTER",
        106: "ALL",
        107: "ALLOCATE",
        108: "ALTER",
        109: "AND",
        110: "ANY",
        111: "ARE",
        112: "AS",
        113: "ASC",
        114: "ASSERTION",
        115: "AT",
        116: "AUTHORIZATION",
        117: "AVG",
        118: "BEGIN",
        119: "BETWEEN",
        120: "BIT",
        121: "BOTH",
        122: "BY",
        123: "CALL",
        124: "CASCADE",
        125: "CASCADED",
        126: "CASE",
        127: "CAST",
        128: "CATALOG",
        129: "CHAR",
        130: "CHARACTER",
        131: "CHECK",
        132: "CLOSE",
        133: "COLLATE",
        134: "COLUMN",
        135: "COMMIT",
        136: "CONNECT",
        137: "CONNECTION",
        138: "CONSTRAINT",
        139: "CONTINUE",
        140: "CONVERT",
        141: "CORRESPONDING",
        142: "COUNT",
        143: "CREATE",
        144: "CROSS",
        145: "CURRENT",
        146: "CURRENT_DATE",
        147: "CURRENT_TIME",
        148: "CURRENT_TIMESTAMP",
        149: "CURSOR",
        150: "DATABASE",
        151: "DATE",
        152: "DAY",
        153: "DEALLOCATE",
        154: "DECLARE",
        155: "DEFAULT",
        156: "DEFERRABLE",
        157: "DEFERRED",
        158: "DELETE",
        159: "DESC",
        160: "DESCRIBE",
        161: "DISTINCT",
        162: "DO",
        163: "DOMAIN",
        164: "DOUBLE",
        165: "DROP",
        166: "ELSE",
        167: "END",
        168: "END-EXEC",
        169: "ESCAPE",
        170: "EXCEPT",
        171: "EXEC",
        172: "EXECUTE",
        173: "EXISTS",
        174: "EXTERNAL",
        175: "FETCH",
        176: "FIRST",
        177: "FLOAT",
        178: "FOR",
        179: "FOREIGN",
        180: "FOUND",
        181: "FROM",
        182: "FULL",
        183: "FUNCTION",
        184: "GET",
        185: "GLOBAL",
        186: "GO",
        187: "GRANT",
        188: "GROUP",
        189: "HAVING",
        190: "HOUR",
        191: "IDENTITY",
        192: "IF",
        193: "IMMEDIATE",
        194: "IN",
        195: "INDICATOR",
        196: "INDEX",
        197: "INNER",
        198: "INSERT",
        199: "INT",
        200: "INTEGER",
        202: "WHERE",
        999: "",
    };
    
    let posicionActual = 0;
    const tokens = [];

    while(posicionActual < input.lenght){
        let char = input[posicionActual];
        let token = {type: null, value: ''};

        if (words[char] === ' '){
            posicionActual++;
            continue;
        }

        //comillas simples
        if(char === "'") {
            posicionActual++;// Avanza más despues de la comilla simple de apertura
            char = input[posicionActual];
            token.type = 'COMILLA_SIMPLE';
            while (char !== "'") {
                token.value += char;
                posicionActual++;
                char = input[posicionActual];
            }
            posicionActual++; //avanza despues de la comilla de cierre
            tokens.push(`' : comilla simple`);
            tokens.push(`${token.value} : palabra`);
            tokens.push(`' : comilla simple`);
        }

        //Identificadores
        else if(/[a-zA-Z-Z_]/.test(char)){
            while(/[a-zA-Z0-9_]/.test(char)){
                token.value += char;
                posicionActual++;
                char = input[posicionActual];
            }
            if(words[token.value] !== undefined){
                 tokens.push(`${token.value} : ${words[token.value]}`);
            } else {
                tokens.push(`${token.value} : identificador`);
            }
        }

        //Numeros
        else if (/\d/.test(char)) {
            while (/\d/.test(char)) {
                token.value += char;
                posicionActual++;
                char = input[currentPos];
            }
                tokens.push(`${token.value} : número`);
        } else if (words[char] !== undefined) {
            tokens.push(`${char} : ${words[char]}`);
            posicionActual++;
        } else {
            tokens.push(`${char} : operador inválido`);
             posicionActual++;
        }
        
    return tokens;
}
    //ejemplo
    const query = "SELECT * FROM usuarios WHERE nombre ='Juan'";
    const result = lexSql(query);
    console.log(result)







