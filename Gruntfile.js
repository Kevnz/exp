module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                  {src: ['img/*'], dest: 'public/', filter: 'isFile'}, // includes files in path
                ]
            }
        },
        watch: {
            files: ['public/js/*', 'public/js/**.js','sass/*.scss', 'app.js','lib/*', 'views/*.*', 'views/layouts/*.*'],
            tasks: [ 'jshint', 'sass', 'yuiConfig', 'copy', 'bower'],
            options: {
                livereload: true,
            }
        },
        jshint: {
            options: {
                expr: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: false,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    YUI: true,
                    console: true,
                    exports: true,
                    require: true
                },
 
                ignores: ['public/js/lib/*.js']
            }, 
            lib_test: {
                src: ['public/js/**.js','lib/*.js', 'routes/*.js']
            }
        },
        yuiConfig: {
            app: {
                options: {
                    dest: 'public/yui_config.js',
                    root: '/yui/build/',
                    combine: true, 
                    comboBase: 'http://localhost:3000/combo?', 
                    groups: {
                        losingApp: {
                            combine: true,  
                            root: '',
                            modules: ['public/js/**.js'],
                            processPath: function (p) {
                                return p.replace('public', '');
                            },
                            excludeFiles: ['public/js/lib/**.js']
                        }
                    }
                }
            }
        },
        sass: {
            dist: {
                options: {
                    includePaths: ['sass/'],
                    outputStyle: 'nested'
                },
                files: {
                    'sass/style.css': 'sass/style.scss'
                }
            }
        },
        bower: {
            dev: {
                dest: 'public/components'
            }
        },
        sprite:{
            all: {
                src: 'images/sprites/*.png',
                destImg: 'public/img/spritesheet.png',
                destCSS: 'sass/_sprites.scss',
                
                cssOpts: {
                    functions: true,
                    cssClass: function (item) {
                            return '.sprite-' + item.name;
                    }
                },
                engine: 'gm',
                padding: 5
            }
        }
    });
 

  // Load in `grunt-spritesmith`
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-yui-config');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower');

    grunt.registerTask('default',  ['jshint','sprite','sass','yuiConfig','copy', 'bower']);
};
