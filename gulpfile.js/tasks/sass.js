var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');

var paths = require('../lib/paths');
var config = {
    autoprefixer: {
        browsers: ['last 2 version']
    },
    main: path.resolve(path.join(paths.sourceDirectory, 'main.scss')),
    src: paths.sourceDirectory + "/**/*.{sass,scss}",
    dest: paths.publicDirectory + '/css',

    settings: {
        includePaths: [path.resolve('node_modules/')],
        imagePath: '/images' // Used by the image-url helper
    }
};

gulp.task('sass', function() {
    return gulp.src(config.main)
        .pipe(sass(config.settings))
        .on('error', handleErrors)
        .pipe(sourcemaps.write())
        // Load existing internal sourcemap
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(autoprefixer(config.autoprefixer))
        // Write final .map file
        // Why did we just do that TWICE?
        // See here: https://github.com/sindresorhus/gulp-autoprefixer/issues/1
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

module.exports = config;
