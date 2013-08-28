module.exports = function(grunt) {
    // Configure Grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/mhLog/',
                        src: ['mhlog.js'],
                        dest: 'src/lib/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/inject/dist/',
                        src: ['inject*.js'],
                        dest: 'src/lib/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/',
                        src: ['css/boot*.css', 'img/*', 'js/bootstrap.*'],
                        dest: 'src/lib/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery-2.0.2.min/',
                        src: ['index.js'],
                        dest: 'src/lib/jquery.min',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/commonPX/jquery.mobile/',
                        src: ['images/*', '*.min.css', '*.min.js'],
                        dest: 'src/lib/jquery.mobile.min',
                        filter: 'isFile'
                    }
                ]
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
				// PUT YOUR FILES HERE!!
                files: {
                    'src/js/pointFinder.min.js': ['src/js/pointFinder.js'],
                    'src/js/pointFinderGPS.min.js': ['src/js/pointFinderGPS.js'],
                    'src/lib/mhlog.min.js': ['src/lib/mhlog.js']
                }
            }
        },
        jshint: {
            // define the files to lint
			// PUT YOUR FILES HERE!!
            files: ['gruntfile.js', "src/js/pointFinderGPS.js", "src/js/pointFinder.js"],
            // configure JSHint (http://www.jshint.com/docs/)
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        shell: {
            bower: {
                command: 'bower update',
                options: {
                    stdout: true
                }
            },
            npm: {
                command: 'npm update',
                options: {
                    stdout: true
                }
            }
        },
        watch: {
            files: ['<%=jshint.files %>'],
            tasks: ['jshint', 'uglify']
        }
    });

    // Load libs
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

    // Register the default tasks
    grunt.registerTask('default', ['jshint', 'uglify']);

    // Register building task
    grunt.registerTask('update', ['shell:bower', 'shell:npm', 'copy', 'jshint', 'uglify']);

};
