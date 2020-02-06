var gulp = require('gulp');
var connect = require('gulp-connect');
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
      baseDir: "./public/",
      index: "index.html",
      logSnippet: false
    }
  });

  gulp.watch('./public/assets/**/*.scss', gulp.series('sass'));
  gulp.watch('./public/assets/js/scripts.js', gulp.series('js'));
  gulp.watch('./public/*.html').on('change', browserSync.reload);
  cb()
});

// Gulp task to create a web server
gulp.task('serveprod', (cb) => {
  connect.server({
      root: 'public',
      livereload: false
  });
  cb();
});

gulp.task('sass', (cb) => {
  gulp.src('./public/assets/scss/styles.scss')
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
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(browserSync.stream());
  cb();
});

gulp.task('js', (cb) => {
  gulp.src('./public/assets/js/scripts.js')
    .pipe(sourcemaps.init())
    .pipe(include())
    .on('error', console.log)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/assets/js/'))
    .pipe(browserSync.stream());
  cb()
});

gulp.task('default', gulp.series('serveprod'));
