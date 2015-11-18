'use strict';

module.exports = function (grunt) {

    /* Initiate configuration. */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
            }
        },
        jasmine: {
            src : 'src/*.js',
            options: {
                specs: 'test/js/spec/*Spec.js',
                host: 'http://127.0.0.1:8000/',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                        baseUrl: './src',
                        paths: {
                            'jquery': ['../test/js/libs/jquery.min'],
                            'q': ['../test/js/libs/q'],
                            'jasmine': ['../test/js/libs/jasmine'],
                            'jasmine-html': ['../test/js/libs/jasmine-html'],
                            'jasmine-boot': ['../test/js/libs/boot'],
                            'faostat-api-client': ['../src/js/FAOSTATAPIClient'],
                            'faostat-api-spec': ['../test/js/spec/FAOSTATAPISpec'],
                            'abbreviations-spec': ['../test/js/spec/AbbreviationsSpec'],
                            'data-spec': ['../test/js/spec/DataSpec'],
                            'rankings-spec': ['../test/js/spec/RankingsSpec'],
                            'bulk-downloads-spec': ['../test/js/spec/BulkDownloadsSpec']
                        },
                        shim: {
                            'jasmine-html': {
                                deps: ['jasmine']
                            },
                            'jasmine-boot': {
                                deps: ['jasmine', 'jasmine-html']
                            }
                        }
                    }
                }
            }
        },
        jsonschema_amd_restclient_generator: {
            custom_options: {
                options: {
                    base_url: 'http://fenixapps2.fao.org/api/v1.0/',
                    output_name: 'FAOSTATAPIClient',
                    output_folder: 'src/js',
                    useQ: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-jsonschema-amd-restclient-generator');

    /* Register tasks. */
    grunt.registerTask('test', ['connect', 'jasmine']);
    grunt.registerTask('build', ['jsonschema_amd_restclient_generator']);
    grunt.registerTask('default', ['test']);

};