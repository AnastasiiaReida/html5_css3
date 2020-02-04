const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

function makeCSS(){
    return gulp.src('./css/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./css'));
};

function watch(cb){
    gulp.watch('./css/*.scss', makeCSS);
    cb();
};

exports.makeCSS = makeCSS;
exports.watch = watch;
exports.default = gulp.parallel(makeCSS, watch);