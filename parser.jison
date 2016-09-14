
/* description: lexical and syntactical rules for the music language. */

/* lexical grammar */
%lex

%{
  if (!('instructions' in yy)) {
    yy.instructions = [];
    yy.chars = 0;
    yy.words = 0;
    yy.lines = 1;
    yy.prev = 'none'
  }
%}

%%

\s+                         /* skip whitespace */
"play"                        return 'PLAY'
"bpm"                         return 'BPM'
"sequence"                    return 'SEQUENCE'
"transport"                   return 'TRANSPORT'
"start"                       return 'START'
[a-g]|[A-G]                   return 'NOTE'
[0-9]+                        return 'NUMBER'
\"[^"]+\"                     yytext = yytext.slice(1,-1); return 'STRING'
.                             return 'ERROR'
<<EOF>>                       return 'EOF'

/lex

%start expressions

%% /* language grammar */

expressions
    : instructions eof
      {
        typeof console !== 'undefined' ? console.log($1) : print($1);
        return $1;
      }
    | error
    ;

eof : EOF {
        const instructions = yy.instructions;
        yy.instructions = new Array();
        return instructions
      }
    ;

instructions
    : instruction instructions
    |
    ;

instruction
    : play
    | bpm
    | sequence
    | transport
    ;

sequence
    : SEQUENCE STRING NUMBER {
      yy.prev = 'sequence';
      yy.instructions.push({
        action: $1,
        time: $2,
        start: $3,
        instructions: new Array()
      });
    }
    ;

play
    : PLAY NOTE NUMBER {
        console.log("BEFORE", $$);
        if ( yy.prev == 'sequence'){
          var index = yy.instructions.length - 1;
          yy.instructions[index].instructions.push({
            action: $1,
            note:$2,
            number: $3
          });
          yy.prev = 'play';
        }else{
          yy.instructions.push({
            action: $1,
            note:$2,
            number: $3
          });
        }
      }
    ;

bpm
    : BPM NUMBER{
        yy.instructions.push({
          action: $1,
          number: $2
        });
      }
    ;

transport
    : TRANSPORT START {
        yy.instructions.push({
          action: $1,
          command: $2
        });
      }
    ;

error
    : ERROR {return {error: "fuck police"};}
    ;
