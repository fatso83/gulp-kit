# gulp-kit
Integrates node-kit with gulp.

## Usage
    
    var kit = require('gulp-kit');

    gulp.task('default', function(){
        return gulp.src('src/kit/*.kit')
        .pipe(kit())
        .pipe(gulp.dest('dest/'));
    });