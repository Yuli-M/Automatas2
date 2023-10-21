
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

    let posicionActual = 0;
    const tokens = [];

    function esPalabraReservada(palabra) {
        return palabrasReservadas.includes(palabra.toUpperCase());
    }

    function esOperador(oper) {
        return operadores.includes(oper);
    }

    function esDelimitador(delim) {
        return delimitadores.includes(delim);
    }

    function esNumero(num) {
        return num.split('').every(digito => numeros.includes(digito));
    }

    while (posicionActual < input.length) {
        let char = input[posicionActual];
        let token = { type: null, value: '' };

        if (char === ' ') {
            // Saltar espacios en blanco
            posicionActual++;
        } else if (esDelimitador(char)) {
            // Delimitadores
            token.type = 'DELIMITADOR';
            token.value = char;
            tokens.push(`${char} : delimitador`);
            posicionActual++;
        } else if (esOperador(char)) {
            // Operadores
            token.type = 'OPERADOR';
            token.value = char;
            tokens.push(`${char} : operador`);
            posicionActual++;
        } else if (char === "'" || char === '"') {
            // Cadenas
            const cadenaDelimitador = char;
            token.type = 'CADENA';
            token.value += char;
            posicionActual++;
            char = input[posicionActual];
            while (posicionActual < input.length && char !== cadenaDelimitador) {
                token.value += char;
                posicionActual++;
                char = input[posicionActual];
            }
            if (char === cadenaDelimitador) {
                token.value += char;
                tokens.push(`${token.value} : cadena`);
                posicionActual++;
            } else {
                tokens.push(`'${token.value} : cadena no cerrada`);
            }
        } else {
            // Identificadores, palabras reservadas, o números
            while (posicionActual < input.length && (/[a-zA-Z_]/.test(char) || numeros.includes(char))) {
                token.value += char;
                posicionActual++;
                char = input[posicionActual];
            }
            if (esPalabraReservada(token.value)) {
                token.type = 'PALABRA_RESERVADA';
                tokens.push(`${token.value} : palabra reservada`);
            } else if (esNumero(token.value)) {
                token.type = 'NUMERO';
                tokens.push(`${token.value} : numero`);
            } else {
                token.type = 'IDENTIFICADOR';
                tokens.push(`${token.value} : identificador`);
            }
        }
    }

    return tokens;
}
// Ejemplo
const query = "SELECT * FROM usuarios WHERE nombre = 'Juan' "+
"CREATE TABLE Persons ("+
    "PersonID int,"+
    "LastName varchar(255),"+
    "FirstName varchar(255),"+
    "Address varchar(255),"+
    "City varchar(255)"+
");";
const result = scanner(query);
result.forEach(token => console.log(token));
