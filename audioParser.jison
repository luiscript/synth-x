
/* description: lexical and syntactical rules for the music language. */

/* lexical grammar */
%lex

%{
  if (!('instructions' in yy)) {
    yy.instructions = [];
    yy.chars = 0;
    yy.words = 0;
    yy.lines = 1;
  }
%}

%%

\s+                         /* skip whitespace */
"play"                        return 'PLAY'
[a-g]|[A-G]                   return 'NOTE'
[0-6]                         return 'NUMBER'
([a-g][A-G][0-9])+            return 'ERROR'
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
    ;

play
    : PLAY NOTE NUMBER {
        yy.instructions.push({
          action: $1,
          note:$2,
          number: $3
        });
      }
    ;

error
    : ERROR {return {error: 'Some error catching message.'};}
    ;
