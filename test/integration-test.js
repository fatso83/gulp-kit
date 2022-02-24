const gulp = require("gulp");

const gulpKit = require("..");

gulp.task("default", function () {
  return gulp
    .src(__dirname + "/fixtures/imports.kit")
    .pipe(gulpKit())
    .pipe(gulp.dest(__dirname + "/dest/"));
});
