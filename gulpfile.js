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
    return gulp.src('./release/smashBuild.js')
    .pipe(obfuscate({
        keepLinefeeds:false,
        keepIndentations:false
    }))
    .pipe(gulp.dest('./release/'));
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
    return gulp.src(["./appManifest.json", "./package.json"])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});
/**
 * Bump major revison
 */
gulp.task('bumpMajor', function(){
    return gulp.src(["./appManifest.json", "./package.json"])
    .pipe(bump({type:'major'}))
    .pipe(bump())
    .pipe(gulp.dest("./"));
});
/**
 * Bump minor revison
 */
gulp.task('bumpMinor', function(){
    return gulp.src(["./appManifest.json", "./package.json"])
    .pipe(bump({type:'minor'}))
    .pipe(bump())
    .pipe(gulp.dest("./"));
});
//Serve project in webserver
gulp.task('serveBuild',['buildApp'], function(){
    return gulp.src('./')
    .pipe(webserver({
        host: "0.0.0.0",
        port: 3000
    }));
});
/**
 * Copy file
 */
gulp.task('copy',function(){
    return gulp.src(['./tmp/smashBuild.js','appManifest.json'])
    .pipe(gulp.dest('./release/'));
});
/**
 * Release a stable version of the game
 */
gulp.task('releaseApp',function(){
    runSequence('buildApp','copy','obfuscate');
});