//cnst.js
if (typeof board == 'undefined') { board = {}; }
if (typeof player == 'undefined') { player = {}; }
if (typeof host == 'undefined') { host = {}; }
if (typeof printer == 'undefined') { printer = {}; }
if (typeof game == 'undefined') { game = {}; }
if (typeof cnst == 'undefined') { cnst = {}; }

/*
The purpose of this file is to define constants.  Since
the shared state object requires that we store shared values as
strings, it is necessary to define constants for states so that
we do not store invalid states in the state variable.  There is a const
type in JScript that is supported by Chrome and Firefox but not IE.  This
obj.var setup will work no matter what browser, even though it's not a true
constant, the cnst prefix should be a flag to us so that we do not assign 
any value to these vars.
*/
cnst.START = "START";
cnst.SETUP = "SETUP";
cnst.SELECT = "SELECT";
cnst.ANSWER = "ANSWER";

cnst.DAILY = "DAILY";

cnst.SINGLE = "SINGLE";
cnst.DOUBLE = "DOUBLE";
cnst.FINAL = "FINAL";