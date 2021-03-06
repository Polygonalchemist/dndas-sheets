// color presets
var currentSheetStyle = 'wide85';
var currentLevelStyle = "Base";
var currentMarkerSize = "markerOne";

var heroClass = "CLASS";

/* --------------------------
   Change Overall Sheet Style
   --------------------------  */
function changeSheetType( type ) {
	$('#sheet1').removeClass(currentSheetStyle).addClass(type);
	currentSheetStyle = type;
	changeLevelType( currentLevelStyle );
}

/* ----------------------
   Change Level-up System
   ---------------------- */
function changeLevelType( type ) {

	// get values of old fields
	var l1ac = parseInt( $( '.sheet .level1 .AC' ).text() );
	var l1hp = parseInt( $( '.sheet .level1 .HP' ).text() );
	var l1speed = parseInt( $( '.sheet .level1 .speed' ).text() );
	var l1surge = parseInt( $( '.sheet .level1 .SurgeHP' ).text() );
	var l1powerName = $( '.sheet .level1 .specialLabel' ).text();
	var l1powerText = $( '.sheet .level1 .specialText' ).html();
	var l1powerCards = $( '.sheet .level1 .powerCards' ).html();

	var levelFields = {};

	// get rid of old fields
	for ( var key in levelFields ) {
		levelFields[key].destroy();
	}
	if ("AerynB" == type) {
		if ( currentSheetStyle == 'wide85' ) {
			var template = $( '#AerynBLevels85' ).html();
		} else if ( currentSheetStyle == 'wide84' ) {
			var template = $( '#AerynBLevels84' ).html();
		}
	} else {
		var template = $( '#' + type + 'Levels' ).html();
	}
	$( '#levels' ).html( template ).removeClass(currentLevelStyle + 'Levels').addClass( type + 'Levels' );

	// setup 1st level fields
	if ( ! isNaN( l1ac ) ) {
		$( '.sheet .level1 .AC' ).html( l1ac );
		$( '.sheet .level1 .HP' ).html( l1hp );
		$( '.sheet .level1 .SurgeHP' ).html( l1surge );
		$( '.sheet .level1 .l1powerName' ).html( l1surge );
		$( '.sheet .level1 .l1powerText' ).html( l1surge );
		$( '.sheet .level1 .l1powerCards' ).html( l1surge );
	}

	levelFields.l1acField = new Medium( {
		element: $( '.sheet .statRow .AC' )[0],
		mode: Medium.inlineMode,
		maxLength: 2,
		placeholder: '##'
	} );

	levelFields.l1hpField = new Medium( {
		element: $( '.sheet .statRow .HP' )[0],
		mode: Medium.inlineMode,
		maxLength: 2,
		placeholder: '##'
	} );

	levelFields.l1speedField = new Medium( {
		element: $( '.sheet .statRow .Speed' )[0],
		mode: Medium.inlineMode,
		maxLength: 2,
		placeholder: '##'
	} );

	levelFields.l1surgeField = new Medium( {
		element: $( '.sheet .statRow .SurgeHP' )[0],
		mode: Medium.inlineMode,
		maxLength: 2,
		placeholder: '##'
	} );

	levelFields.l1SpecialNameField = new Medium( {
		element: $( '.sheet .powerBox .specialLabel' )[0],
		mode: Medium.inlineMode,
		maxLength: 25,
		placeholder: 'POWER NAME'
	} );

	levelFields.l1SpecialNameField = new Medium( {
		element: $( '.sheet .powerBox .specialText' )[0],
		mode: Medium.inlineMode,
		maxLength: 500,
		placeholder: 'POWER NAME'
	} );
	levelFields.l1SpecialNameField = new Medium( {
		element: $( '.sheet .powerBox .powerCards' )[0],
		mode: Medium.richMode,
		maxLength: 500,
		placeholder: ''
	} );
	$( ".statBox" ).blur( updateStats );

	currentLevelStyle = type;

	updateStats()
}

/* ------------------------
   Change Level Marker Size
   ------------------------  */
function changeMarkerSize( type ) {
	$('#levels').removeClass(currentMarkerSize).addClass(type);
	currentMarkerSize = type;
}

/* ------------------------------------
   Update All Stats From Entered Fields
   ------------------------------------ */
function updateStats() {
	var l1ac = parseInt( $( '.sheet .level1 .AC' ).text() );
	var l1hp = parseInt( $( '.sheet .level1 .HP' ).text() );
	var l1speed = parseInt( $( '.sheet .level1 .Speed' ).text() );
	var l1surge = parseInt( $( '.sheet .level1 .SurgeHP' ).text() );
	for ( var i = 1; i <= 6; i ++ ) {
		$( '.sheet .level' + (
		   i + 1
		   ) + ' .AC' ).html( l1ac + i );
		$( '.sheet .level' + (
		   i + 1
		   ) + ' .HP' ).html( l1hp + (
		                      i * 2
		                      ) );
		$( '.sheet .level' + (
		   i + 1
		   ) + ' .Speed' ).html( l1speed );
		$( '.sheet .level' + (
		   i + 1
		   ) + ' .SurgeHP' ).html( l1surge + i );
	}
}

/* -----------------------------
   Update Hero Class Across Card
   ----------------------------- */
var updateClass = function () {

	// update class fields
	var newClass = $( '#heroClass' ).text();
	$( '.classPH' ).each( function () {
		$( this ).text( newClass );
	} );

	// update Hero's Instinct for AerynBLevels
	var encCard = 'an <strong>Event</strong>';
	if ( $( "#vilHero" ).prop( 'checked' ) == true ) {
		encCard = 'a <strong>Event—Attack</strong>'
	}
	else if ( (
		          newClass.toLowerCase() == 'cleric'
	          ) || (
		          newClass.toLowerCase() == 'paladin'
	          ) ) {
		encCard = 'a <strong>Curse</strong>'
	}
	else if ( (
		          newClass.toLowerCase() == 'ranger'
	          ) || (
		          newClass.toLowerCase() == 'archer'
	          ) ) {
		encCard = 'an <strong>Environment</strong> or <strong>Hazard</strong>'
	}
	else if ( newClass.toLowerCase() == 'rogue' ) {
		encCard = 'a <strong>Trap</strong>'
	}

	$( '.classEvent' ).each( function () {
		$( this ).html( encCard );
	} );

};

/* --------------------
   Output Card Image(s)
   -------------------- */
function saveImg() {
	var node = document.getElementById( 'sheet1' );
	var sheetImage = new Image();

	domtoimage.toPng( node )
		.then( function ( dataUrl ) {
			sheetImage.src = dataUrl;
		} )
		.catch( function ( error ) {
			console.error( 'oops, something went wrong!', error );
		} );

	$( '#previewSheetImg' ).html( sheetImage );

}

/* ----------------------------------
   Open Modal to Display Saved Images
   ---------------------------------- */
var openSaveModel = function () {
	$.when( saveImg() ).then( $( "#saveModal" ).modal( 'show' ) );
};

/* -----------------
   Update Hero Image
   ----------------- */
function previewFile() {
	var file = $( "#heroImageSelect" )[0].files[0];
	var reader = new FileReader();

	reader.addEventListener( "load", function () {
		$( ".charImg" ).each( function () {
			$( this ).css( "background-image", "url(" + reader.result + ")" );
		} );
	}, false );

	if ( file ) {
		reader.readAsDataURL( file );
	}
}

/* ----------------------------------------------------
   Main Function: Anything that needs to run at startup
   ---------------------------------------------------- */
$( document ).ready( function () {

	// Setup global editable fields.
	new Medium( {
		            element: $( '#heroName' )[0],
		            mode: Medium.inlineMode,
		            maxLength: 25,
		            placeholder: 'Hero Name'
	            } );
	new Medium( {
		            element: $( '#heroRace' )[0],
		            mode: Medium.inlineMode,
		            maxLength: 25,
		            placeholder: 'Race'
	            } );
	new Medium( {
		            element: $( '#heroClass' )[0],
		            mode: Medium.inlineMode,
		            maxLength: 25,
		            placeholder: 'Class'
	            } );

	$( '#heroClass' ).blur( updateClass );

	new Medium( {
		            element: $( '#heroBlurb' )[0],
		            mode: Medium.partialMode,
		            placeholder: 'A brief blurb about the hero.'
	            } );

	// Clear settings on reload.
	$( "#heroImageSelect" ).val( "" );
	$( "#vilHero" ).prop( 'checked', false )
		.change( function () {
			updateClass();
		} );

	// Load the levels template.
	changeLevelType( currentLevelStyle );

		/* -----------------------
		   Updates the card colors
		   ----------------------- */
		var updateColorPreview = function () {
			$( '#colorPreview' ).css( 'filter', 'hue-rotate(' + colorHue.getValue() + 'deg) saturate(' + colorSat.getValue() + '%)' );
			$( '.sheet' ).css( 'filter', 'hue-rotate(' + colorHue.getValue() + 'deg) saturate(' + colorSat.getValue() + '%)' );
		};

	// Color Hue Slider
	var colorHue = $( '#colorHue' ).slider()
		.on( 'slide', updateColorPreview )
		.data( 'slider' );

	// Color Saturation Slider
	var colorSat = $( '#colorSat' ).slider()
		.on( 'slide', updateColorPreview )
		.data( 'slider' );

	// Color presets
	$( '#colorPresets .preset' ).on( 'click', function () {
		$( '#colorPreview' ).css( 'filter', 'hue-rotate(' + $( this ).data( 'hue' ) + 'deg) saturate(' + $( this ).data( 'sat' ) + '%)' );
		$( '.sheet' ).css( 'filter', 'hue-rotate(' + $( this ).data( 'hue' ) + 'deg) saturate(' + $( this ).data( 'sat' ) + '%)' );
		colorHue.setValue( $( this ).data( 'hue' ) );
		colorSat.setValue( $( this ).data( 'sat' ) );
	} );

	// Sheet Style Buttons
	$( 'input[type=radio][name=sheetStyle]' ).change( function () {
		changeSheetType( this.value );
	} );

	// Level System Buttons
	$( 'input[type=radio][name=levelType]' ).change( function () {
		changeLevelType( this.value );
	} );

	// Level Marker Buttons
	$( 'input[type=radio][name=levelMarker]' ).change( function () {
		changeMarkerSize( this.value );
	} );

	// Hero Image Alignment
	$( 'input[type=radio][name=heroImageAlign]' ).change( function () {
		var newAlign = this.value;
		$( ".charImg" ).each( function () {
			$( this ).css( "background-position", newAlign );
		} );
	} );
} );

