var gulp = require('gulp'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
obfuscate = require('gulp-js-obfuscator'),
inject = require('gulp-inject'),
webserver = require('gulp-webserver'),
runSequence = require('run-sequence'),
bump = require('gulp-bump'),
fileOrder = ['js/main.js', 'js/utils.js', 'js/splash.js','js/mixins.js', 'js/levels.js', 'js/style.js', 'js/intro.js', 'js/menu.js', 'js/options.js', 'js/credits.js', 'js/play.js', 'js/levelcomplete.js', 'js/gameover.js', 'js/gamecomplete.js', 'js/datastore.js'];
//concat files into a single file
gulp.task('concat',function(){
    return gulp.src(fileOrder)
    .pipe(concat('smashBuild.js'))
    .pipe(gulp.dest('./tmp/'));
});
//obfuscate the file
gulp.task('obfuscate', function(){
    return gulp.src('tmp/smashBuild.js')
    .pipe(obfuscate({
        keepLinefeeds:true,
        keepIndentations:true
    }))
    .pipe(gulp.dest('./tmp/'));
})
//minify task
gulp.task('minify',function(){
    return gulp.src('tmp/smashBuild.js')
        .pipe(uglify())
        .pipe(gulp.dest('./tmp/'));
});
//Inject js into index.html
gulp.task('inject', function(){
    var js = gulp.src('./tmp/smashBuild.js');
    return gulp.src('index.html')
        .pipe(inject(js, { relative:true }))
        .pipe(gulp.dest('./'));
});
/**
 * Build the application without obfucation
 */
gulp.task('buildApp',function(){
    return runSequence(['concat','bumpBuild'], 'minify','inject');
});
/**
 * Bump the build revison
 */
gulp.task('bumpBuild',function(){
    return gulp.src("./appManifest.json")
    .pipe(bump())
    .pipe(gulp.dest('./'))
});
//Serve project in webserver
gulp.task('serveBuild',['buildApp'], function(){
    return gulp.src('./')
    .pipe(webserver({
        port: 3000,
        liveReload: true
    }));
});