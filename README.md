# gulp-kit
Integrates [`node-kit`](https://github.com/jeremyworboys/node-kit) with [`gulp`](http://gulpjs.com/) to compile [`.kit`](http://incident57.com/codekit/help.html#kit) templates with your own build system.

## Usage
    
    var kit = require('gulp-kit');

    gulp.task('default', function(){
        return gulp.src('src/kit/*.kit')
        .pipe(kit())
        .pipe(gulp.dest('dest/'));
    });
