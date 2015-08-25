(function( $ ) {

    init = function(options,icons) {

    	if($.isArray(options)){
    		icons = options;
    		options = {};
    	}

    	function radian(degree){
    		var rad = degree * (Math.PI/180);
    		return rad;
    	}

    	var rot = 180; // The inital State

    	var settings = $.extend(true, {
    		size 				   : 60,
    		fontSize 			   : 30,
    		buttonBg               : '#009688',	                       //The Button Background Color
    		buttonColor            : '#ffffff',                        //The Button Icon colors
    		transTime              : '0.75s',                          // Transition Timing
    		transTimingFuntion     : 'cubic-bezier(.37,1.25,.95,1.18)',// Transition Timing function , ease, linear and cubic bezier functions
    		fontIcon               : 'fa',                             // fa-font awesome , glyphicon - bootstrap glyphicons
    		primaryIcon			   : 'share-alt',                      //The main Icon
    		closeIcon              : 'times'                           // Icon for close
    	},options);

    	var buttons = typeof icons === 'undefined'?[
    		'facebook',
    		'github',
    		'codepen',
    		'wordpress'
    	]:icons;

    	var size   = parseInt(settings.size);
    	var sizepx = size+'px';
    	var fontsize = parseInt(settings.fontSize);

    	//Start
    	var sb = $("<div id='ferrisWheelButton_menu'></div>");


    	//Adding Each Button

    	var noOfButtons = Object.keys(buttons).length;
    	if(noOfButtons < 2){
    		console.error('Number of buttons must exceed 1');
    		return false;
    	}
    	var radius = ( noOfButtons * size ) / 1.5;
    	var angle = 90/(noOfButtons - 1);

    	$.each(buttons, function(index,key) {
    		var button = $('<div><i></i></div>');

    		$('i',button).addClass(settings.fontIcon).addClass(settings.fontIcon+'-'+key);
    		button.addClass('fwb_buttons');
    		button.attr('data-icon',key);

    		//Button Position
    		buttonAngle = angle * (index);

    		var top = -1*(radius)* Math.sin(radian(buttonAngle));
      		var left = -1*(radius)* Math.cos(radian(buttonAngle));

      		buttonStyle = {
      			'top':top+'px',
      			'left':left+'px',
      			'background-color':settings.buttonBg,
      			'color':settings.buttonColor
      		};
      		button.css(buttonStyle);

      		sb.append(button);
	   	});



    	//Add Main Menu Button
    	var primaryIcon  = settings.fontIcon +' '+settings.fontIcon+'-'+settings.primaryIcon;
    	var closeIcon  = settings.fontIcon +' '+settings.fontIcon+'-'+settings.closeIcon;

    	var sbMenu = $("<div class='fwb_menu'><div class='fwb_share'><i class='"+primaryIcon+"'></i></div><div class='fwb_close'><i class='"+closeIcon+"'></i></div></div>");
    	var sbMenuStyles = {
    		'color':settings.buttonColor,
    		'background-color':settings.buttonBg
    	};
    	sbMenu.css(sbMenuStyles);

    	sb.append(sbMenu);



    	//Attach Transitions

    	var trans = 'all '+settings.transTime + ' ' + settings.transTimingFuntion;
    	sb.css({
    		'transition':trans,
    		'webkit-transition': trans,
    		'width': sizepx,
  			'height': sizepx,
  			'right':(size/2)+'px',
  			'bottom': (size/2)+'px'
    	});
    	$('div',sb).css({
    		'transition':trans,
    		'webkit-transition': trans,
    		'font-size':(fontsize)+'px'
    	});



    	//Attach to body

    	$('body').append(sb);



    	//Rotation

    	sb.on('click',function(event) {
    		event.preventDefault();
    		/* Act on the event */
    		rot = rot - 180;
    		sb.css('transform', 'rotate(' + rot + 'deg)');
    		sb.css('webkitTransform', 'rotate(' + rot + 'deg)');

    		if ((rot / 180) % 2 === 0){
		      //Moving in
		      $('div.fwb_menu',sb).addClass('fwb_active');

		    } else {
		      //Moving Out
		      $('div.fwb_menu',sb).removeClass('fwb_active');

		    }
    	});
    };

    addlink = function(selector,href){
    	var button = $('#ferrisWheelButton_menu div[data-icon="'+selector+'"]');
    	if(!button.length){
    		return;
    	}
    	button.data('href',href);
    	button.on('click', function(event) {
    		event.preventDefault();
    		event.stopImmediatePropagation();
    		href = $(this).data('href');
    		window.open(href,'_blank');
    	});
    };

	getButton = function(selector){
    	var button = $('#ferrisWheelButton_menu div[data-icon="'+selector+'"]');
    	if(!button.length){
    		return [];
    	}else{
    		return button;
    	}
    };

    getButtons = function(){
    	var buttons = $('#ferrisWheelButton_menu div[data-icon]');
    	if(!buttons.length){
    		return [];
    	}else{
    		return buttons;
    	}
    };

    methods = {
    	'init':init,
    	'addLink':addlink,
    	'getButton':getButton,
    	'getButtons':getButtons
    };

    var ferrisWheelButton  = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.ferrisWheelButton' );
        }
    };

    $.extend({ferrisWheelButton:ferrisWheelButton});

}( jQuery ));