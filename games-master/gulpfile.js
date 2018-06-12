var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    group = require('gulp-group-files');

var path='./Example/base';
gulp.task('webserver', function () {
    connect.server({
        livereload:true,
        port: 8088,
        host: 'play.com',
        root: [path]
    });
});

gulp.task('sass:compile', function () {
    var sassFiles = {
        "xxx": {
            src: path+"/sass/abc.scss",
            dest: path+"/css"
        },
        "yyy": {
            src: path+"/sass/index.scss",
            dest: path+"/css"
        }
    };
    return group(sassFiles, function (key, fileset) {
        return gulp.src(fileset.src)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(fileset.dest));
    })();
});

gulp.task('html', function () {
    gulp.src(path+'/*.html')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src(path+'/**/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(path+'/**/*.scss', ['sass:compile','html']);
    gulp.watch(path+'/*.html', ['html']);
    gulp.watch(path+'/**/*.js', ['html']);
});

gulp.task('default', ['webserver','watch']);