const fs = require('fs')
let algo = []
let splited_line;
const keywords = {
    1 : '.',
    2 : '_',
    3 : ',',
    4 : '-',
    5 : ' ',
    6 : ';',
    7 : '*',
    8 : '+',
    9 : '/',
    10: '=',
    11: '(',
    12: ')',
    13: '<',
	14: '>',
	15: '!',
	16: '%',
	17: '$',
	18: '@',
	19: '&',
	20: '|',
	21: '^',
	22: '`',
	23: '~',
	24: '?',
	25: '?',
	26: '"',
	27: "'",
	28: '[',
	29: ']',
    30: "\n",
	100 : "ACCESSIBLE",
	101 : "ACCOUNT",
	102 : "ACTION",
	103 : "ACTIVE",
	104 : "ADD",
	105 : "ADMIN",
	106 : "AFTER",
	107 : "AGAINST",
	108 : "AGGREGATE",
	109 : "ALGORITHM",
	110 : "ALL",
	111 : "ALTER",
	112 : "ALWAYS",
	113 : "ANALYSE",
	114 : "ANALYZE",
	115 : "AND",
	116 : "ANY",
	117 : "ARRAY",
	118 : "AS",
	119 : "ASC",
	120 : "ASCII",
	121 : "ASENSITIVE",
	122 : "AT",
	123 : "ATTRIBUTE",
	124 : "AUTHENTICATION",
	125 : "AUTOEXTEND_SIZE",
	126 : "AUTO_INCREMENT",
	127 : "AVG",
	128 : "AVG_ROW_LENGTH",
	129 : "BACKUP",
	130 : "BEFORE",
	131 : "BEGIN",
	132 : "BETWEEN",
	133 : "BIGINT",
	134 : "BINARY",
	135 : "BINLOG",
	136 : "BIT",
	137 : "BLOB",
	138 : "BLOCK",
	139 : "BOOL",
	140 : "BOOLEAN",
	141 : "BOTH",
	142 : "BTREE",
	143 : "BUCKETS",
	144 : "BULK",
	145 : "BY",
	146 : "BYTE",
	147 : "CACHE",
	148 : "CALL",
	149 : "CASCADE",
	150 : "CASCADED",
	151 : "CASE",
	152 : "CATALOG_NAME",
	153 : "CHAIN",
	154 : "CHALLENGE_RESPONSE",
	155 : "CHANGE",
	156 : "CHANGED",
	157 : "CHANNEL",
	158 : "CHAR",
	159 : "CHARACTER",
	160 : "CHARSET",
	161 : "CHECK",
	162 : "CHECKSUM",
	163 : "CIPHER",
	164 : "CLASS_ORIGIN",
	165 : "CLIENT",
	166 : "CLONE",
	167 : "CLOSE",
	168 : "COALESCE",
	169 : "CODE",
	170 : "COLLATE",
	171 : "COLLATION",
	172 : "COLUMN",
	173 : "COLUMNS",
	174 : "COLUMN_FORMAT",
	175 : "COLUMN_NAME",
	176 : "COMMENT",
	177 : "COMMIT",
	178 : "COMMITTED",
	179 : "COMPACT",
	180 : "COMPLETION",
	181 : "COMPONENT",
	182 : "COMPRESSED",
	183 : "COMPRESSION",
	184 : "CONCURRENT",
	185 : "CONDITION",
	186 : "CONNECTION",
	187 : "CONSISTENT",
	188 : "CONSTRAINT",
	189 : "CONSTRAINT_CATALOG",
	190 : "CONSTRAINT_NAME",
	191 : "CONSTRAINT_SCHEMA",
	192 : "CONTAINS",
	193 : "CONTEXT",
	194 : "CONTINUE",
	195 : "CONVERT",
	196 : "CPU",
	197 : "CREATE",
	198 : "CROSS",
	199 : "CUBE",
	200 : "CUME_DIST",
	201 : "CURRENT",
	202 : "CURRENT_DATE",
	203 : "CURRENT_TIME",
	204 : "CURRENT_TIMESTAMP",
	205 : "CURRENT_USER",
	206 : "CURSOR",
	207 : "CURSOR_NAME",
	208 : "DATA",
	209 : "DATABASE",
	210 : "DATABASES",
	211 : "DATAFILE",
	212 : "DATE",
	213 : "DATETIME",
	214 : "DAY",
	215 : "DAY_HOUR",
	216 : "DAY_MICROSECOND",
	217 : "DAY_MINUTE",
	218 : "DAY_SECOND",
	219 : "DEALLOCATE",
	220 : "DEC",
	221 : "DECIMAL",
	222 : "DECLARE",
	223 : "DEFAULT",
	224 : "DEFAULT_AUTH",
	225 : "DEFINER",
	226 : "DEFINITION",
	227 : "DELAYED",
	228 : "DELAY_KEY_WRITE",
	229 : "DELETE",
	230 : "DENSE_RANK",
	231 : "DESC",
	232 : "DESCRIBE",
	233 : "DESCRIPTION",
	234 : "DES_KEY_FILE",
	235 : "DETERMINISTIC",
	236 : "DIAGNOSTICS",
	237 : "DIRECTORY",
	238 : "DISABLE",
	239 : "DISCARD",
	240 : "DISK",
	241 : "DISTINCT",
	242 : "DISTINCTROW",
	243 : "DIV",
	244 : "DO",
	245 : "DOUBLE",
	246 : "DROP",
	247 : "DUAL",
	248 : "DUMPFILE",
	249 : "DUPLICATE",
	250 : "DYNAMIC",
	251 : "EACH",
	252 : "ELSE",
	253 : "ELSEIF",
	254 : "EMPTY",
	255 : "ENABLE",
	256 : "ENCLOSED",
	257 : "ENCRYPTION",
	258 : "END",
	259 : "ENDS",
	260 : "ENFORCED",
	261 : "ENGINE",
	262 : "ENGINES",
	263 : "ENGINE_ATTRIBUTE",
	264 : "ENUM",
	265 : "ERROR",
	266 : "ERRORS",
	267 : "ESCAPE",
	268 : "ESCAPED",
	269 : "EVENT",
	270 : "EVENTS",
	271 : "EVERY",
	272 : "EXCEPT",
	273 : "EXCHANGE",
	274 : "EXCLUDE",
	275 : "EXECUTE",
	276 : "EXISTS",
	277 : "EXIT",
	278 : "EXPANSION",
	279 : "EXPIRE",
	280 : "EXPLAIN",
	281 : "EXPORT",
	282 : "EXTENDED",
	283 : "EXTENT_SIZE",
	284 : "FACTOR",
	285 : "FAILED_LOGIN_ATTEMPTS",
	286 : "FALSE",
	287 : "FAST",
	288 : "FAULTS",
	289 : "FETCH",
	290 : "FIELDS",
	291 : "FILE",
	292 : "FILE_BLOCK_SIZE",
	293 : "FILTER",
	294 : "FINISH",
	295 : "FIRST",
	296 : "FIRST_VALUE",
	297 : "FIXED",
	298 : "FLOAT",
	299 : "FLOA4",
	300 : "FLOAT8",
	301 : "FLUSH",
	302 : "FOLLOWING",
	303 : "FOLLOWS",
	304 : "FOR",
	305 : "FORCE",
	306 : "FOREIGN",
	307 : "FORMAT",
	308 : "FOUND",
	309 : "FROM",
	310 : "FULL",
	311 : "FULLTEXT",
	312 : "FUNCTION",
	313 : "GENERAL",
	314 : "GENERATE",
	315 : "GENERATED",
	316 : "GEOMCOLLECTION",
	317 : "GEOMETRY",
	318 : "GEOMETRYCOLLECTION",
	319 : "GET",
	320 : "GET_FORMAT",
	321 : "GET_MASTER_PUBLIC_KEY",
	322 : "GET_SOURCE_PUBLIC_KEY",
	323 : "GLOBAL",
	324 : "GRANT",
	325 : "GRANTS",
	326 : "GROUP",
	327 : "GROUPING",
	328 : "GROUPS",
	329 : "GROUP_REPLICATION",
	330 : "GTID_ONLY",
	331 : "HANDLER",
	332 : "HASH",
	333 : "HAVING",
	334 : "HELP",
	335 : "HIGH_PRIORITY",
	336 : "HISTOGRAM",
	337 : "HISTORY",
	338 : "HOST",
	339 : "HOSTS",
	340 : "HOUR",
	341 : "HOUR_MICROSECOND",
	342 : "HOUR_MINUTE",
	343 : "HOUR_SECOND",
	344 : "IDENTIFIED",
	345 : "IF",
	346 : "IGNORE",
	347 : "IGNORE_SERVER_IDS",
	348 : "IMPORT",
	349 : "IN",
	350 : "INACTIVE",
	351 : "INDEX",
	352 : "INDEXES",
	353 : "INFILE",
	354 : "INITIAL",
	355 : "INITIAL_SIZE",
	356 : "INITIATE",
	357 : "INNER",
	358 : "INOUT",
	359 : "INSENSITIVE",
	360 : "INSERT",
	361 : "INSERT_METHOD",
	362 : "INSTALL",
	363 : "INSTANCE",
	364 : "INT",
	365 : "INT1",
	366 : "INT2",
	367 : "INT3",
	368 : "INT4",
	369 : "INT8",
	370 : "INTEGER",
	371 : "INTERSECT",
	372 : "INTERVAL",
	373 : "INTO",
	374 : "INVISIBLE",
	375 : "INVOKER",
	376 : "IO",
	377 : "IO_AFTER_GTIDS",
	378 : "IO_BEFORE_GTIDS",
	379 : "IO_THREAD",
	380 : "IPC",
	381 : "IS",
	382 : "ISOLATION",
	383 : "ISSUER",
	384 : "ITERATE",
	385 : "JOIN",
	386 : "JSON",
	387 : "JSON_TABLE",
	388 : "JSON_VALUE",
	389 : "KEY",
	390 : "KEYRING",
	391 : "KEYS",
	392 : "KEY_BLOCK_SIZE",
	393 : "KILL",
	394 : "LAG",
	395 : "LANGUAGE",
	396 : "LAST",
	397 : "LAST_VALUE",
	398 : "LATERAL",
	399 : "LEAD",
	400 : "LEADING",
	401 : "LEAVE",
	402 : "LEAVES",
	403 : "LEFT",
	404 : "LESS",
	405 : "LEVEL",
	406 : "LIKE",
	407 : "LIMIT",
	408 : "LINEAR",
	409 : "LINES",
	410 : "LINESTRING",
	411 : "LIST",
	412 : "LOAD",
	413 : "LOCAL",
	414 : "LOCALTIME",
	415 : "LOCALTIMESTAMP",
	416 : "LOCK",
	417 : "LOCKED",
	418 : "LOCKS",
	419 : "LOGFILE",
	420 : "LOGS",
	421 : "LONG",
	422 : "LONGBLOB",
	423 : "LONGTEXT",
	424 : "LOOP",
	425 : "LOW_PRIORITY",
	426 : "MASTER",
	427 : "MASTER_AUTO_POSITION",
	428 : "MASTER_BIND",
	429 : "MASTER_COMPRESSION_ALGORITHMS",
	430 : "MASTER_CONNECT_RETRY",
	431 : "MASTER_DELAY",
	432 : "MASTER_HEARTBEAT_PERIOD",
	433 : "MASTER_HOST",
	434 : "MASTER_LOG_FILE",
	435 : "MASTER_LOG_POS",
	436 : "MASTER_PASSWORD",
	437 : "MASTER_PORT",
	438 : "MASTER_PUBLIC_KEY_PATH",
	439 : "MASTER_RETRY_COUNT",
	440 : "MASTER_SERVER_ID",
	441 : "MASTER_SSL",
	442 : "MASTER_SSL_CA",
	443 : "MASTER_SSL_CAPATH",
	444 : "MASTER_SSL_CERT",
	445 : "MASTER_SSL_CIPHER",
	446 : "MASTER_SSL_CRL",
	447 : "MASTER_SSL_CRLPATH",
	448 : "MASTER_SSL_KEY",
	449 : "MASTER_SSL_VERIFY_SERVER_CERT",
	450 : "MASTER_TLS_CIPHERSUITES",
	451 : "MASTER_TLS_VERSION",
	452 : "MASTER_USER",
	453 : "MASTER_ZSTD_COMPRESSION_LEVEL",
	454 : "MATCH",
	455 : "MAXVALUE",
	456 : "MAX_CONNECTIONS_PER_HOUR",
	457 : "MAX_QUERIES_PER_HOUR",
	458 : "MAX_ROWS",
	459 : "MAX_SIZE",
	460 : "MAX_UPDATES_PER_HOUR",
	461 : "MAX_USER_CONNECTIONS",
	462 : "MEDIUM",
	463 : "MEDIUMBLOB",
	464 : "MEDIUMINT",
	465 : "MEDIUMTEXT",
	466 : "MEMBER",
	467 : "MEMORY",
	468 : "MERGE",
	469 : "MESSAGE_TEXT",
	470 : "MICROSECOND",
	471 : "MIDDLEINT",
	472 : "MIGRATE",
	473 : "MINUTE",
	474 : "MINUTE_MICROSECOND",
	475 : "MINUTE_SECOND",
	476 : "MIN_ROWS",
	477 : "MOD",
	478 : "MODE",
	479 : "MODIFIES",
	480 : "MODIFY",
	481 : "MONTH",
	482 : "MULTILINESTRING",
	483 : "MULTIPOINT",
	484 : "MULTIPOLYGON",
	485 : "MUTEX",
	486 : "MYSQL_ERRNO",
	487 : "NAME",
	488 : "NAMES",
	489 : "NATIONAL",
	490 : "NATURAL",
	491 : "NCHAR",
	492 : "NDB",
	493 : "NDBCLUSTER",
	494 : "NESTED",
	495 : "NETWORK_NAMESPACE",
	496 : "NEVER",
	497 : "NEW",
	498 : "NEXT",
	499 : "NO",
	500 : "NODEGROUP",
	501 : "NONE",
	502 : "NOT",
	503 : "NOWAIT",
	504 : "NO_WAIT",
	505 : "NO_WRITE_TO_BINLOG",
	506 : "NTH_VALUE",
	507 : "NTILE",
	508 : "NULL",
	509 : "NULLS",
	510 : "NUMBER",
	511 : "NUMERIC",
	512 : "NVARCHAR",
	513 : "OF",
	514 : "OFF",
	515 : "OFFSET",
	516 : "OJ",
	517 : "OLD",
	518 : "ON",
	519 : "ONE",
	520 : "ONLY",
	521 : "OPEN",
	522 : "OPTIMIZE",
	523 : "OPTIMIZER_COSTS",
	524 : "OPTION",
	525 : "OPTIONAL",
	526 : "OPTIONS",
	527 : "OR",
	528 : "ORDER",
	529 : "ORDINALITY",
	530 : "ORGANIZATION",
	531 : "OTHERS",
	532 : "OUT",
	533 : "OUTER",
	534 : "OUTFILE",
	535 : "OVER",
	536 : "OWNERSHIP",
	537 : "PACK_KEYS",
	538 : "PAGE",
	539 : "PARSER",
	540 : "PARTIAL",
	541 : "PARTITION",
	542 : "PARTITIONING",
	543 : "PARTITIONS",
	544 : "PASSWORD",
	545 : "PATH",
	546 : "PERCENT_RANK",
	547 : "PERSIST",
	548 : "PERSIST_ONLY",
	549 : "PHASE",
	550 : "PLUGIN",
	551 : "PLUGINS",
	552 : "PLUGIN_DIR",
	553 : "POINT",
	554 : "POLYGON",
	555 : "PORT",
	556 : "PRECEDES",
	557 : "PRECEDING",
	558 : "PRECISION",
	559 : "PREPARE",
	560 : "PRESERVE",
	561 : "PREV",
	562 : "PRIMARY",
	563 : "PRIVILEGES",
	564 : "PROCEDURE",
	565 : "PROCESSLIST",
	566 : "PROFILE",
	567 : "PROFILES",
	568 : "PROXY",
	569 : "PURGE",
	570 : "QUARTER",
	571 : "QUERY",
	572 : "QUICK",
	573 : "RANGE",
	574 : "RANK",
	575 : "READ",
	576 : "READS",
	577 : "READ_ONLY",
	578 : "READ_WRITE",
	579 : "REAL",
	580 : "REBUILD",
	581 : "RECOVER",
	582 : "RECURSIVE",
	583 : "REDO_BUFFER_SIZE",
	584 : "REDOFILE",
	585 : "REDUNDANT",
	586 : "REFERENCES",
	587 : "REGEXP",
	588 : "REGR_AVGX",
	589 : "REGR_AVGY",
	590 : "REGR_COUNT",
	591 : "REGR_INTERCEPT",
	592 : "REGR_R2",
	593 : "REGR_SLOPE",
	594 : "REGR_SXX",
	595 : "REGR_SXY",
	596 : "REGR_SYY",
	597 : "RELAY",
	598 : "RELAYLOG",
	599 : "RELAY_LOG_FILE",
	600 : "RELAY_LOG_POS",
	601 : "RELAY_THREAD",
	602 : "RELEASE",
	603 : "RELOAD",
	604 : "REMOVE",
	605 : "RENAME",
	606 : "REORGANIZE",
	607 : "REPAIR",
	608 : "REPEAT",
	609 : "REPEATABLE",
	610 : "REPLACE",
	611 : "REPLICATE_DO_DB",
	612 : "REPLICATE_DO_TABLE",
	613 : "REPLICATE_IGNORE_DB",
	614 : "REPLICATE_IGNORE_TABLE",
	615 : "REPLICATE_REWRITE_DB",
	616 : "REPLICATE_WILD_DO_TABLE",
	617 : "REPLICATE_WILD_IGNORE_TABLE",
	618 : "REPLICATION",
	619 : "REQUIRE",
	620 : "RESET",
	621 : "RESIGNAL",
	622 : "RESOURCE",
	623 : "RESPECT",
	624 : "RESTART",
	625 : "RESTORE",
	626 : "RESTRICT",
	627 : "RESUME",
	628 : "RETAIN",
	629 : "RETURN",
	630 : "RETURNED_SQLSTATE",
	631 : "RETURNS",
	632 : "REUSE",
	633 : "REVERSE",
	634 : "REVOKE",
	635 : "RIGHT",
	636 : "RLIKE",
	637 : "ROLLBACK",
	638 : "ROLLUP",
	639 : "ROTATE",
	640 : "ROUTINE",
	641 : "ROW",
	642 : "ROWS",
	643 : "ROW_COUNT",
	644 : "ROW_FORMAT",
	645 : "ROW_NUMBER",
	646 : "RTREE",
	647 : "SAVEPOINT",
	648 : "SCHEDULE",
	649 : "SCHEMA",
	650 : "SCHEMAS",
	651 : "SCHEMA_NAME",
	652 : "SECOND",
	653 : "SECOND_MICROSECOND",
	654 : "SECURITY",
	655 : "SELECT",
	656 : "SENSITIVE",
	657 : "SEPARATOR",
	658 : "SERIAL",
	659 : "SERIALIZABLE",
	660 : "SERVER",
	661 : "SESSION",
	662 : "SET",
	663 : "SHARE",
	664 : "SHOW",
	665 : "SHUTDOWN",
	666 : "SIGNAL",
	667 : "SIGNED",
	668 : "SIMPLE",
	669 : "SKIP",
	670 : "SLAVE",
	671 : "SLOW",
	672 : "SMALLINT",
	673 : "SNAPSHOT",
	674 : "SOCKET",
	675 : "SOME",
	676 : "SONAME",
	677 : "SOUNDS",
	678 : "SOURCE",
	679 : "SPATIAL",
	680 : "SPECIFIC",
	681 : "SQL",
	682 : "SQLEXCEPTION",
	683 : "SQLSTATE",
	684 : "SQLWARNING",
	685 : "SQL_AFTER_GTIDS",
	686 : "SQL_AFTER_MTS_GAPS",
	687 : "SQL_BEFORE_GTIDS",
	688 : "SQL_BIG_RESULT",
	689 : "SQL_BUFFER_RESULT",
	690 : "SQL_CACHE",
	691 : "SQL_CALC_FOUND_ROWS",
	692 : "SQL_NO_CACHE",
	693 : "SQL_SMALL_RESULT",
	694 : "SQL_THREAD",
	695 : "SQL_TSI_DAY",
	696 : "SQL_TSI_FRAC_SECOND",
	697 : "SQL_TSI_HOUR",
	698 : "SQL_TSI_MINUTE",
	699 : "SQL_TSI_MONTH",
	700 : "SQL_TSI_QUARTER",
	701 : "SQL_TSI_SECOND",
	702 : "SQL_TSI_WEEK",
	703 : "SQL_TSI_YEAR",
	704 : "SRID",
	705 : "SSL",
	706 : "STACKED",
	707 : "START",
	708 : "STARTING",
	709 : "STARTS",
	710 : "STATS_AUTO_RECALC",
	711 : "STATS_PERSISTENT",
	712 : "STATS_SAMPLE_PAGES",
	713 : "STATUS",
	714 : "STOP",
	715 : "STORAGE",
	716 : "STORED",
	717 : "STRAIGHT_JOIN",
	718 : "STRING",
	719 : "SUBCLASS_ORIGIN",
	720 : "SUBJECT",
	721 : "SUBPARTITION",
	722 : "SUBPARTITIONS",
	723 : "SUPER",
	724 : "SUSPEND",
	725 : "SWAPS",
	726 : "SWITCHES",
	727 : "SYSTEM",
	728 : "TABLE",
	729 : "TABLES",
	730 : "TABLESPACE",
	731 : "TABLE_CHECKSUM",
	732 : "TABLE_NAME",
	733 : "TEMPORARY",
	734 : "TEMPTABLE",
	735 : "TERMINATED",
	736 : "TEXT",
	737 : "THAN",
	738 : "THEN",
	739 : "THREAD_PRIORITY",
	740 : "TIES",
	741 : "TIME",
	742 : "TIMESTAMP",
	743 : "TIMESTAMPADD",
	744 : "TIMESTAMPDIFF",
	745 : "TINYBLOB",
	746 : "TINYINT",
	747 : "TINYTEXT",
	748 : "TLS",
	749 : "TO",
	750 : "TRAILING",
	751 : "TRANSACTION",
	752 : "TRIGGER",
	753 : "TRIGGERS",
	754 : "TRUE",
	755 : "TRUNCATE",
	756 : "TYPE",
	757 : "TYPES",
	758 : "UNBOUNDED",
	759 : "UNCOMMITTED",
	760 : "UNDEFINED",
	761 : "UNDO",
	762 : "UNDOFILE",
	763 : "UNDO_BUFFER_SIZE",
	764 : "UNICODE",
	765 : "UNINSTALL",
	766 : "UNION",
	767 : "UNIQUE",
	768 : "UNKNOWN",
	769 : "UNLOCK",
	770 : "UNSIGNED",
	771 : "UNTIL",
	772 : "UPDATE",
	773 : "UPGRADE",
	774 : "USAGE",
	775 : "USE",
	776 : "USER",
	777 : "USER_RESOURCES",
	778 : "USE_FRM",
	779 : "USING",
	780 : "UTC_DATE",
	781 : "UTC_TIME",
	782 : "UTC_TIMESTAMP",
	783 : "VALIDATION",
	784 : "VALUE",
	785 : "VALUES",
	786 : "VARBINARY",
	787 : "VARCHAR",
	788 : "VARCHARACTER",
	789 : "VARIABLES",
	790 : "VARYING",
	791 : "VCPU",
	792 : "VIEW",
	793 : "VIRTUAL",
	794 : "VISIBLE",
	795 : "WAIT",
	796 : "WARNINGS",
	797 : "WEEK",
	798 : "WEIGHT_STRING",
	799 : "WHEN",
	800 : "WHERE",
	801 : "WHILE",
	802 : "WINDOW",
	803 : "WITH",
	804 : "WITHOUT",
	805 : "WORK",
	806 : "WRAPPER",
	807 : "WRITE",
	808 : "X509",
	809 : "XA",
	810 : "XID",
	811 : "XML",
	812 : "XOR",
	813 : "YEAR",
	814 : "YEAR_MONTH",
	815 : "ZEROFILL",
	816 : "ZONE",
	999 : "", 
}
let unarray;
function la_validation(palabrasss){
    let tokens = []
    for(let i = 0; i < splited_line.length; i++){
        for(const [key, value] of Object.entries(keywords)){
            if(splited_line[i] == keywords[key]){
                console.log(`${key}: ${value}`)
                for(a = 0; a < unarray.length; a++){
                    if(splited_line[i] == unarray[a]){
                        unarray.splice(i, 1)
                    }
                }
            }
        }
        if(unarray.some(palabra => palabra == splited_line[i]) == true)
            console.log(`999: ${splited_line[i]}`)
    }
}
function query_validation(){
    fs.readFile('query.txt', 'utf8', (err,data) => {
        if(err){
            console.log(err)
            return
        }
        var splited_string = data.split('\n')
        splited_string.pop()
        for(let i = 0; i < splited_string.length; i++){
            splited_line = splited_string[i].split(" ")
            unarray = splited_line
            console.log(splited_line)
            console.log(unarray)
            la_validation(splited_line)
        }
        
    });
}

query_validation()
