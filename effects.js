// create namespace objects
if (typeof board == 'undefined') { board = {}; }
if (typeof player == 'undefined') { player = {}; }
if (typeof host == 'undefined') { host = {}; }
if (typeof printer == 'undefined') { printer = {}; }
if (typeof game == 'undefined') { game = {}; }
if (typeof cnst == 'undefined') { cnst = {}; }
if (typeof effects == 'undefined') { effects = {}; }
if (typeof explode == 'undefined') { explode = {}; }

	effects.runEffect = function() {
		
			// get effect type from 
			var selectedEffect = "explode";
			
			// most effect types need no options passed by default
			var options = {};
			// some effects have required parameters
			if ( selectedEffect === "scale" ) {
				options = { percent: 0 };
			} else if ( selectedEffect === "size" ) {
				options = { to: { width: 200, height: 60 } };
			}
			
			// run the effect
			$( "#effect" ).toggle( selectedEffect, options, 500 );
		};
		
		// set effect from select menu value
		$( "#button" ).click(function() {
			runEffect();
			return false;
		});
	
	
