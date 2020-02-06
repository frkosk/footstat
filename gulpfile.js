var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var include = require("gulp-include");
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var notify = require("gulp-notify");

gulp.task('serve', (cb) => {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html",
      logSnippet: false
    }
  });

  gulp.watch('./assets/**/*.scss', gulp.series('sass'));
  gulp.watch('./assets/js/scripts.js', gulp.series('js'));
  gulp.watch('./*.html').on('change', browserSync.reload);
  cb()
});

gulp.task('serveprod', (cb) => {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html",
      logSnippet: false
    }
  });
  cb()
});

gulp.task('sass', (cb) => {
  gulp.src('./assets/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ errLogToConsole: false, }))
    .on('error', function(err) {
        notify({
          "sound": "Morse"
        }).write(err);
        this.emit('end');
    })
    .pipe(autoprefixer({
      browsers: [
        "Explorer >= 10",
        "iOS >= 9.3", // Apple iPhone 5
        "Android >= 5"
      ]
    }))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
  cb();
});

gulp.task('js', (cb) => {
  gulp.src('./assets/js/scripts.js')
    .pipe(sourcemaps.init())
    .pipe(include())
    .on('error', console.log)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/js/'))
    .pipe(browserSync.stream());
  cb()
});

gulp.task('default', gulp.series('serve'));
