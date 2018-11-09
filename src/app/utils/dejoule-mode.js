ace.define(
    'ace/mode/dejoule_highlight_rules',
    [
        'require',
        'exports',
        'module',
        'ace/lib/oop',
        'ace/mode/text_highlight_rules'
    ],
    function(acequire, exports, module) {
        'use strict';

        var oop = acequire('../lib/oop');
        var TextHighlightRules = acequire('./text_highlight_rules')
            .TextHighlightRules;

        var DejouleHighlightRules = function() {
            this.setKeywords = function(kwMap) {
                const map = {
                    'invalid.deprecated': 'debugger',
                    'support.function': kwMap.functions
                        ? kwMap.functions
                        : builtinFunctions,
                    'constant.language': kwMap.constants
                        ? kwMap.constants
                        : builtinConstants,
                    keyword: keywords
                };
                this.keywordMapper = this.createKeywordMapper(
                    map,
                    'identifier'
                );
            };

            var keywords = 'and|not|or';

            var builtinConstants = 'True|False';

            var builtinFunctions = 'avg|sum';
            var keywordMapper = this.createKeywordMapper(
                {
                    'invalid.deprecated': 'debugger',
                    'support.function': builtinFunctions,
                    'constant.language': builtinConstants,
                    keyword: keywords
                },
                'identifier'
            );

            var strPre = '(?:r|u|ur|R|U|UR|Ur|uR)?';

            var decimalInteger = '(?:(?:[1-9]\\d*)|(?:0))';
            var octInteger = '(?:0[oO]?[0-7]+)';
            var hexInteger = '(?:0[xX][\\dA-Fa-f]+)';
            var binInteger = '(?:0[bB][01]+)';
            var integer =
                '(?:' +
                decimalInteger +
                '|' +
                octInteger +
                '|' +
                hexInteger +
                '|' +
                binInteger +
                ')';

            var exponent = '(?:[eE][+-]?\\d+)';
            var fraction = '(?:\\.\\d+)';
            var intPart = '(?:\\d+)';
            var pointFloat =
                '(?:(?:' +
                intPart +
                '?' +
                fraction +
                ')|(?:' +
                intPart +
                '\\.))';
            var exponentFloat =
                '(?:(?:' + pointFloat + '|' + intPart + ')' + exponent + ')';
            var floatNumber = '(?:' + exponentFloat + '|' + pointFloat + ')';

            var stringEscape =
                '\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv\'"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})';

            this.$rules = {
                start: [
                    {
                        token: 'comment',
                        regex: '#.*$'
                    },
                    {
                        token: 'string', // multi line """ string start
                        regex: strPre + '"{3}',
                        next: 'qqstring3'
                    },
                    {
                        token: 'string', // " string
                        regex: strPre + '"(?=.)',
                        next: 'qqstring'
                    },
                    {
                        token: 'string', // multi line ''' string start
                        regex: strPre + "'{3}",
                        next: 'qstring3'
                    },
                    {
                        token: 'string', // ' string
                        regex: strPre + "'(?=.)",
                        next: 'qstring'
                    },
                    {
                        token: 'constant.numeric', // imaginary
                        regex: '(?:' + floatNumber + '|\\d+)[jJ]\\b'
                    },
                    {
                        token: 'constant.numeric', // float
                        regex: floatNumber
                    },
                    {
                        token: 'constant.numeric', // long integer
                        regex: integer + '[lL]\\b'
                    },
                    {
                        token: 'constant.numeric', // integer
                        regex: integer + '\\b'
                    },
                    {
                        token: keywordMapper,
                        regex: '[a-zA-Z_$][a-zA-Z0-9_$]*\\b'
                    },
                    {
                        token: 'keyword.operator',
                        regex:
                            '\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|='
                    },
                    {
                        token: 'paren.lparen',
                        regex: '[\\[\\(\\{]'
                    },
                    {
                        token: 'paren.rparen',
                        regex: '[\\]\\)\\}]'
                    },
                    {
                        token: 'text',
                        regex: '\\s+'
                    }
                ],
                qqstring3: [
                    {
                        token: 'constant.language.escape',
                        regex: stringEscape
                    },
                    {
                        token: 'string', // multi line """ string end
                        regex: '"{3}',
                        next: 'start'
                    },
                    {
                        defaultToken: 'string'
                    }
                ],
                qstring3: [
                    {
                        token: 'constant.language.escape',
                        regex: stringEscape
                    },
                    {
                        token: 'string', // multi line ''' string end
                        regex: "'{3}",
                        next: 'start'
                    },
                    {
                        defaultToken: 'string'
                    }
                ],
                qqstring: [
                    {
                        token: 'constant.language.escape',
                        regex: stringEscape
                    },
                    {
                        token: 'string',
                        regex: '\\\\$',
                        next: 'qqstring'
                    },
                    {
                        token: 'string',
                        regex: '"|$',
                        next: 'start'
                    },
                    {
                        defaultToken: 'string'
                    }
                ],
                qstring: [
                    {
                        token: 'constant.language.escape',
                        regex: stringEscape
                    },
                    {
                        token: 'string',
                        regex: '\\\\$',
                        next: 'qstring'
                    },
                    {
                        token: 'string',
                        regex: "'|$",
                        next: 'start'
                    },
                    {
                        defaultToken: 'string'
                    }
                ]
            };
        };

        oop.inherits(DejouleHighlightRules, TextHighlightRules);

        exports.DejouleHighlightRules = DejouleHighlightRules;
    }
);

ace.define(
    'ace/mode/dejoule',
    [
        'require',
        'exports',
        'module',
        'ace/lib/oop',
        'ace/mode/text',
        'ace/mode/dejoule_highlight_rules',
        'ace/mode/folding/pythonic',
        'ace/range'
    ],
    function(acequire, exports, module) {
        'use strict';

        var oop = acequire('../lib/oop');
        var TextMode = acequire('./text').Mode;
        var DejouleHighlightRules = acequire('./dejoule_highlight_rules')
            .DejouleHighlightRules;
        var PythonFoldMode = acequire('./folding/pythonic').FoldMode;
        var Range = acequire('../range').Range;

        var Mode = function() {
            this.HighlightRules = DejouleHighlightRules;
            this.foldingRules = new PythonFoldMode('\\:');
            this.$behaviour = this.$defaultBehaviour;
        };
        oop.inherits(Mode, TextMode);

        (function() {
            this.lineCommentStart = '#';

            this.getNextLineIndent = function(state, line, tab) {
                var indent = this.$getIndent(line);

                var tokenizedLine = this.getTokenizer().getLineTokens(
                    line,
                    state
                );
                var tokens = tokenizedLine.tokens;

                if (
                    tokens.length &&
                    tokens[tokens.length - 1].type == 'comment'
                ) {
                    return indent;
                }

                if (state == 'start') {
                    var match = line.match(/^.*[\{\(\[:]\s*$/);
                    if (match) {
                        indent += tab;
                    }
                }

                return indent;
            };

            var outdents = {
                pass: 1,
                return: 1,
                raise: 1,
                break: 1,
                continue: 1
            };

            this.checkOutdent = function(state, line, input) {
                if (input !== '\r\n' && input !== '\r' && input !== '\n')
                    return false;

                var tokens = this.getTokenizer().getLineTokens(
                    line.trim(),
                    state
                ).tokens;

                if (!tokens) return false;
                do {
                    var last = tokens.pop();
                } while (
                    last &&
                    (last.type == 'comment' ||
                        (last.type == 'text' && last.value.match(/^\s+$/)))
                );

                if (!last) return false;

                return last.type == 'keyword' && outdents[last.value];
            };

            this.autoOutdent = function(state, doc, row) {
                row += 1;
                var indent = this.$getIndent(doc.getLine(row));
                var tab = doc.getTabString();
                if (indent.slice(-tab.length) == tab)
                    doc.remove(
                        new Range(
                            row,
                            indent.length - tab.length,
                            row,
                            indent.length
                        )
                    );
            };

            this.$id = 'ace/mode/dejoule';
        }.call(Mode.prototype));

        exports.Mode = Mode;
    }
);
