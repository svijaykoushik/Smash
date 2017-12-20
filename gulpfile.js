var gulp = require('gulp'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
obfuscate = require('gulp-js-obfuscator'),
inject = require('gulp-inject'),
webserver = require('gulp-webserver'),
runSequence = require('run-sequence'),
bump = require('gulp-bump'),
merge = require('merge-stream'),
rename = require('gulp-rename'),
zip = require('gulp-zip'),
gulpversiontag = require("gulp-version-tag"),
clean = require('gulp-clean'),
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
    //return runSequence(['concat','bumpBuild'],'inject');
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
 * The following tasks help to release a stable version of the game.
 * 1. Copy all the assets and libraries to the release folder
 * 2. Copy the Builded app
 * 3. obfuscate the file
 * 4. Rename the app file to "smash.js"
 * 5. Inject the file to the index page
 */
//1 & 2. copy the assets & Copy the Builded app
gulp.task('copyAssets',function(){
    var buildedApp = gulp.src(['./tmp/smashBuild.js','appManifest.json', './index.html'])
    .pipe(gulp.dest('./release/demo/'));
    var assets = gulp.src(["./assets/**/*", "./engine/*", "lib/*"],{base:'.'})
    .pipe(gulp.dest('./release/demo/'));
    return merge(assets,buildedApp);
});
//2. obfuscate the release file
gulp.task('obfuscateRelease', ['copyAssets'],function(){
    return gulp.src('./release/demo/smashBuild.js').pipe(obfuscate({
        keepLinefeeds:false,
        keepIndentations:false
    })).pipe(gulp.dest('./release/demo/'));
});
//4. Rename the app file to "smash.js"
gulp.task('renameRelease',['obfuscateRelease'],function(){
    return gulp.src('./release/demo/smashBuild.js')
    .pipe(rename('smash.js'))
    .pipe(gulp.dest('./release/demo/'));
});
//5. Inject the file to the index page
gulp.task('injectRelease',['renameRelease'], function(){
    var js = gulp.src('./release/demo/smash.js');
    return gulp.src('./release/demo/index.html')
        .pipe(inject(js, { relative:true }))
        .pipe(gulp.dest('./release/demo/'));
});

gulp.task('releaseApp',['injectRelease'],function(){
    //var cleanDir = gulp.src('./release/dist/',{read:false})
    //.pipe(clean());
    var zipaction = gulp.src('./release/demo/*')
    .pipe(zip('smash.zip'))
    .pipe(gulp.dest('./release/dist/'));
    var tagVersion = gulp.src('./release/dist/smash.zip')
    .pipe(gulpversiontag(__dirname,'./package.json'))
    .pipe(gulp.dest('./release/dist/'));
    var cleanSource = gulp.src('./release/dist/smash.zip',{read:false})
    .pipe(clean({force: true}));
    return merge(zipaction,tagVersion,cleanSource);
    //return zipaction;
});

// Serve the release demo
gulp.task('serveRelease',['injectRelease'], function(){
    return gulp.src('./release/demo/')
    .pipe(webserver({
        host: "0.0.0.0",
        port: 3000
    }));
});