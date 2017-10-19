var gulp = require('gulp'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
obfuscate = require('gulp-js-obfuscator'),
inject = require('gulp-inject'),
webserver = require('gulp-webserver')
fileOrder = ['js/main.js', 'js/utils.js', 'js/splash.js','js/mixins.js', 'js/levels.js', 'js/style.js', 'js/intro.js', 'js/menu.js', 'js/options.js', 'js/credits.js', 'js/play.js', 'js/levelcomplete.js', 'js/gameover.js', 'js/gamecomplete.js', 'js/datastore.js'];
//concat files into a single file
gulp.task('concat',function(){
    return gulp.src(fileOrder)
    .pipe(concat('smashBuild.js'))
    .pipe(gulp.dest('./tmp/'));
});
//obfuscate the file
gulp.task('obfuscate', ['concat'], function(){
    return gulp.src('tmp/smashBuild.js')
    .pipe(obfuscate({
        keepLinefeeds:true,
        keepIndentations:true
    }))
    .pipe(gulp.dest('./tmp/'));
})
//minify task
gulp.task('minify', ['obfuscate'],function(){
    return gulp.src('tmp/smashBuild.js')
        .pipe(uglify())
        .pipe(gulp.dest('./tmp/'));
});
//Inject js into index.html
gulp.task('inject', ['minify'], function(){
    var js = gulp.src('./tmp/smashBuild.js');
    return gulp.src('index.html')
        .pipe(inject(js, { relative:true }))
        .pipe(gulp.dest('./'));
});
//Serve project in webserver
gulp.task('serve', ['inject'], function(){
    return gulp.src('./')
    .pipe(webserver({
        port: 3000,
        liveReload: true
    }));
});