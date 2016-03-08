

var gulp = require('gulp')
    ,path = require("path")
    ,rename = require('gulp-rename')
    ,deploy= require( "mauk").deploy

gulp.task('app' ,function( ) {
    var soucrce=path.resolve('app')
    var target=path.resolve('public')
    deploy(soucrce,target);
});

gulp.task('public' ,function( ) {
    var soucrce=path.resolve('!public')
    var target=path.resolve('public')
    deploy(soucrce,target);
});

gulp.task('static',function(){
    //gulp.src('vendor/jquery/dist/jquery.js')
    //    .pipe(gulp.dest('public/public'))
    console.log('this is the static task');

});

gulp.task('all', ['static','public','app'] ,function( ) {
    console.log('this is the clean task');
});

gulp.task('default', function() {
    gulp.start('all');
    //gulp.start('static');


    //var soucrce=path.resolve('app')
    //var target=path.resolve('public')
    //deploy(soucrce,target);
});

gulp.task('dev',function(){
    //gulp.src('app/!api.html')
    //    .pipe(rename('api.html'))
     //   .pipe(gulp.dest('public'))
    gulp.src('app/!imagetool.html')
        .pipe(rename('imagetool.html'))
        .pipe(gulp.dest('public'))
    console.log('this is the dev task');

});
