/* Yuli Adanesne Moreno Sanchez
 * 21760028
 * Lexico para analizar querys de MySQL
 * */

function scanner(input) {
    const palabrasReservadas = [
        "SELECT", "ABORT", "ABSOLUTE", "ACCESS", "ACTION", "ADD", "AFTER", "ALL", "ALLOCATE", "ALTER", "AND", "ANY", "ARE", "AS", "ASC", "ASSERTION", "AT", "AUTHORIZATION", "AVG", "BEGIN", "BETWEEN", "BIT", "BOTH", "BY", "CALL", "CASCADE", "CASCADED", "CASE", "CAST", "CATALOG", "CHAR", "CHARACTER", "CHECK", "CLOSE", "COLLATE", "COLUMN", "COMMIT", "CONNECT", "CONNECTION", "CONSTRAINT", "CONTINUE", "CONVERT", "CORRESPONDING", "COUNT", "CREATE", "CROSS", "CURRENT", "CURRENT_DATE", "CURRENT_TIME", "CURRENT_TIMESTAMP", "CURSOR", "DATABASE", "DATE", "DAY", "DEALLOCATE", "DECLARE", "DEFAULT", "DEFERRABLE", "DEFERRED", "DELETE", "DESC", "DESCRIBE", "DISTINCT", "DO", "DOMAIN", "DOUBLE", "DROP", "ELSE", "END", "END-EXEC", "ESCAPE", "EXCEPT", "EXEC", "EXECUTE", "EXISTS", "EXTERNAL", "FETCH", "FIRST", "FLOAT", "FOR", "FOREIGN", "FOUND", "FROM", "FULL", "FUNCTION", "GET", "GLOBAL", "GO", "GRANT", "GROUP", "HAVING", "HOUR", "IDENTITY", "IF", "IMMEDIATE", "IN", "INDICATOR", "INDEX", "INNER", "INSERT", "INT", "INTEGER", "WHERE"
    ];

    const operadores = [
        ' ', '+', '-', '*', '/', '%', '&', '|', '^', '=', '>', '<', '>=', '<=', '<>', "'", '"', ';', ',', '`', '(', ')', '[', ']', '{', '}', '+=', '-=', '*=', '/=', '%=', '&=', '^-=', '|*=',
        'ALL', 'AND', 'ANY', 'BETWEEN', 'EXISTS', 'IN', 'LIKE', 'NOT', 'OR'
    ];

    const delimitadores = [
        ';', '(', ')', ',', '[', ']', "'", '"', '{', '}', ':', '|', '&', '<', '>', '=', '.'
    ];

    const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const cadenas = ["'Juan'", '"Ejemplo de cadena"'];

    function esAlphaNumeric(char) {
        return (char >= 'a' && char <= 'z') ||
               (char >= 'A' && char <= 'Z') ||
               (char >= '0' && char <= '9') ||
               char === '_';
    }

    function noContieneCaracteresInvalidos(cadena) {
        for (let i = 0; i < cadena.length; i++) {
            const caracter = cadena.charAt(i);
            if (!esAlphaNumeric(caracter)) {
                return false;
            }
        }
        return true;
    }

    function esIdentificadorValido(cadena) {
        if (cadena.length > 64 || esAlphaNumeric(cadena.charAt(0)) || !noContieneCaracteresInvalidos(cadena) || palabrasReservadas.includes(cadena.toUpperCase())) {
            return false;
        }
        return true;
    }

    let posicionActual = 0;
    const tokens = [];

    while (posicionActual < input.length) {
        let char = input[posicionActual];
        let token = { type: null, value: '' };

        if (palabrasReservadas.includes(char)) {
            // palabras reservadas
            token.type = 'PALABRA_RESERVADA';
            token.value = char;
            tokens.push(`${char} : ${token.value}`);
            posicionActual++;
        } else if (operadores.includes(char)) {
            // operadores
            token.type = 'OPERADOR';
            token.value = char;
            tokens.push(`${char} : ${token.value}`);
            posicionActual++;
        } else if (esIdentificadorValido(char)) {
            // identificadores
            while (esIdentificadorValido(char)) {
                token.value += char;
                posicionActual++;
                char = input[posicionActual];
            }
            tokens.push(`${token.value} : IDENTIFICADOR`);
        } else if (numeros.includes(char)) {
            // números
            token.type = 'NUMERO';
            while (numeros.includes(char)) {
                token.value += char;
                posicionActual++;
                char = input[posicionActual];
            }
            tokens.push(`${token.value} : NUMERO`);
        } else if (cadenas.includes(char)) {
            // cadenas
            token.type = 'CADENA';
            token.value += char;
            posicionActual++;
            char = input[posicionActual];
            while (!cadenas.includes(char)) {
                token.value += char;
                posicionActual++;
                char = input[posicionActual];
            }
            token.value += char;
            tokens.push(`${token.value} : CADENA`);
            posicionActual++;
        } else if (delimitadores.includes(char)) {
            // delimitadores
            token.type = 'DELIMITADOR';
            token.value = char;
            tokens.push(`${char} : ${token.value}`);
            posicionActual++;
        } else if (char === ' ') {
            // saltar espacios
            posicionActual++;
        } else {
            // caracteres no reconocidos
            tokens.push(`${char} : Caracter no reconocido`);
            posicionActual++;
        }
    }

    return tokens;
}

// ejemplo
const query = "SELECT * FROM usuarios WHERE nombre = 'Juan'";
const result = scanner(query);
console.log(result);


