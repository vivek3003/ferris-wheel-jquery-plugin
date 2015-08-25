module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
		    dist: {
		      files: [{
		      	'dist/ferrisWheelButton.css': 'src/ferrisWheelButton.scss'
		      }]
		    }
		  },
		uglify: {
			options:{
				  	mangle: {toplevel: true},
				    squeeze: {dead_code: false},
				    codegen: {quote_keys: true},
				    banner: '/*! <%= pkg.name %> by <%= pkg.author %> ' +
          			'<%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
		    js: {
		        src: [
		            'src/ferrisWheelButton.js'
		        ],
		        dest: 'dist/jquery.ferriswheelbutton.min.js'
		    }

		},
		cssmin: {
			options:{
				banner: '/*! <%= pkg.name %> by <%= pkg.author %> ' +
          			'<%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			main:{
				src:['dist/ferrisWheelButton.css'],
				dest: 'dist/ferriswheelbutton.min.css'
			}
		},
		watch: {
		    scripts: {
		        files:  [
		            'src/**/*.js', // All JS in the libs folder

					'src/**/*.scss'	//All SCSS
		        ],
		        tasks: ['sass','uglify','cssmin'],
		        options: {
		            spawn: false,
		        },
		    }
		}

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass','cssmin','uglify','watch']);

};
