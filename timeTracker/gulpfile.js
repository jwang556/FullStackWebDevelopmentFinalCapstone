var gulp = require('gulp'),

  minifycss = require('gulp-minify-css'),

  jshint = require('gulp-jshint'),

  stylish = require('jshint-stylish'),

  uglify = require('gulp-uglify'),

  usemin = require('gulp-usemin'),

  imageminpngquant = require('imagemin-pngquant'),

  rename = require('gulp-rename'),

  concat = require('gulp-concat'),

  notify = require('gulp-notify'),

  cache = require('gulp-cache'),

  changed = require('gulp-changed'),

  rev = require('gulp-rev'),

  browserSync = require('browser-sync'),

  ngannotate = require('gulp-ng-annotate'),

  del = require('del');

gulp.task('jshint', function() {

  return gulp.src('app/scripts/**/*.js')

  .pipe(jshint())

  .pipe(jshint.reporter(stylish));

});

// Clean

gulp.task('clean', function() {

  return del(['dist', 'json-server/public']);

});

// Default task

gulp.task('default', ['clean'], function() {

  gulp.start('usemin', 'imagemin-pngquant', 'copyfonts');

});

gulp.task('usemin', ['jshint'], function() {

  return gulp.src('./app/**/*.html')

  .pipe(usemin({

    css: [minifycss(), rev()],

    js: [ngannotate(), uglify(), rev()]

  }))

  .pipe(gulp.dest('dist/'))
  .pipe(notify({
    message: 'Copying to dist task complete'
  }))
  .pipe(gulp.dest('json-server/public'))
  .pipe(notify({
    message: 'Copying to public task complete'
  }));

});

// Images

gulp.task('imagemin-pngquant', function() {

  return del(['dist/images']), gulp.src('app/images/**/*')
/*
  .pipe((imageminpngquant({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  })))
*/
  .pipe(gulp.dest('dist/images'))
  .pipe(gulp.dest('json-server/public/images'))
  .pipe(notify({
    message: 'Images task complete'
  }));

});

gulp.task('copyfonts', ['clean'], function() {

  gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')

  .pipe(gulp.dest('./dist/fonts'))
  .pipe(gulp.dest('./json-server/public/fonts'));

  gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')

  .pipe(gulp.dest('./dist/fonts'))
  .pipe(gulp.dest('./json-server/public/fonts'));

});

// Watch

gulp.task('watch', ['browser-sync'], function() {

  // Watch .js files

  gulp.watch(['app/scripts/**/*.js', 'app/styles/**/*.css', 'app/**/*.html'], ['usemin']);



  // Watch image files

  gulp.watch('app/images/**/*', ['imagemin']);

});

gulp.task('browser-sync', ['default'], function() {

  var files = [

    'app/**/*.html',

    'app/styles/**/*.css',

    'app/images/**/*.jpeg',

    'app/scripts/**/*.js',

    'dist/**/*'

  ];

  browserSync.init(files, {

    server: {

      baseDir: "dist",

      index: "index.html"

    },
    port: 8001

  });

  // Watch any files in dist/, reload on change

  gulp.watch(['dist/**']).on('change', browserSync.reload);

});

