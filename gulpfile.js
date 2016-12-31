'use strict';

var gulp = require('gulp'),
    // prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    // compass = require('gulp-compass'),
    // less = require('gulp-less'),
    // sourcemaps = require('gulp-sourcemaps'),
    // cssnano = require('gulp-cssnano'),
    // imagemin = require('gulp-imagemin'),
    // rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    // compass = require('gulp-compass'),
    // spritesmith = require('gulp.spritesmith'),
    // pngquant = require('imagemin-pngquant'),
    // cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    // replace = require('gulp-replace'),
    connect = require('gulp-connect'),
    // watch = require('gulp-watch'),
    livereload = require('gulp-livereload');
// rigger = require('gulp-rigger');

var path = {
    dist: {
        html: {
            main: 'dist/',
            templ: 'dist/templates/',
        },
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    src: {
        html: {
            main: 'src/index.html',
            templ: 'src/templates/**/*.html'
        },
        js: 'src/js/**/*.js',
        style: {
            main: 'src/style/**/*.scss',
            libs: 'src/style/libs.scss'
        },
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: {
            main: 'src/index.html',
            templ: 'src/templates/**/*.html'
        },
        js: {
            main: 'src/js/**/*.js',
            libs: 'src/js/**/*.js'
        },
        style: {
            main: 'src/style/**/*.*',
            libs: 'src/style/libs.scss'
        },
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};
gulp.task('webserver', function() {
    connect.server({
        root: './dist/',
        livereload: true,
        port: 1111
    });
});
// var config = {
//     server: {
//         baseDir: "./dist"
//     },
//     host: 'localhost',
//     port: 9000,
//     logPrefix: "gulp",
//     notify: false
// };

// gulp.task('webserver', function() {
//     browserSync(config);
// });

gulp.task('html:main', function() {
    gulp.src(path.src.html.main)
        .pipe(gulp.dest(path.dist.html.main))
        .pipe(connect.reload());
});

gulp.task('html:templ', function() {
    gulp.src(path.src.html.templ)
        .pipe(gulp.dest(path.dist.html.templ))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src([
            'src/js/app.js',
            'src/js/controllers/mainCtrl.js',
            'src/js/controllers/mainFormCtrl.js',
            'src/js/controllers/timePickerCtrl.js'
        ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js))
        .pipe(connect.reload());
});
// gulp.task('js:libs', function() {
//     gulp.src('src/js/libs.js')
//         .pipe(rigger())
//         .pipe(sourcemaps.init())
//         .pipe(uglify())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(path.build.js))
//         // .pipe(connect.reload());
//         .pipe(connect.reload());
// });

gulp.task('style', function() {
    gulp.src('./src/sass/style.scss')
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sass().on('error', sass.logError))
        .on('error', function(error) {
            console.log(error);
            this.emit('end');
        })
        .pipe(prefixer(['last 15 versions', '> 1%', 'ie 9', 'ie 8'], {
            cascade: true
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        // .pipe(connect.reload());
        .pipe(connect.reload());
});
// gulp.task('style:libs', function() {
//     gulp.src('./src/sass/*.scss')
//         .pipe(sourcemaps.init({
//             loadMaps: true
//         }))
//         .pipe(compass({
//             css: 'build/css',
//             sass: 'src/sass'
//         }))
//         .on('error', function(error) {
//             console.log(error);
//             this.emit('end');
//         })
//         .pipe(prefixer(['last 15 versions', '> 1%', 'ie 9', 'ie 8'], {
//             cascade: true
//         }))
//         .pipe(cssnano())
//         .pipe(sourcemaps.write('../maps'))
//         .pipe(gulp.dest(path.build.css))
//         // .pipe(connect.reload());
//         .pipe(connect.reload());
// });
// gulp.task('bootstrap:buid', function() {
//     return gulp.src('src/bootstrap/less/bootstrap.less')
//         .pipe(sourcemaps.init())
//         .pipe(less())
//         .pipe(concat('_bootstrap.scss'))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('src/sass/'));
// })
// gulp.task('image:build', function() {
//     return gulp.src(path.src.img)
//         // .pipe(cache(imagemin({
//         //  interlaced: true,
//         //  progressive: true,
//         //  svgoPlugins: [{ removeViewBox: false }],
//         //  use: [pngquant()]
//         // })))
//         .pipe(gulp.dest(path.build.img))
//         // .pipe(connect.reload());
//         .pipe(connect.reload());
// });


// gulp.task('fonts:build', function() {
//     gulp.src(path.src.fonts)
//         .pipe(gulp.dest(path.build.fonts))
// });

// gulp.task('sprite', function() {
//     var spriteData = gulp.src('src/img/icons/*.png').pipe(spritesmith({
//         imgName: 'sprite.png',
//         cssName: '_sprite.css',
//         padding: 10
//     }));
//     spriteData.css.pipe(gulp.dest('./src/sass/'));
//     spriteData.img.pipe(gulp.dest('./src/img/'));
// });
// gulp.task('replace', function() {
//     gulp.src(['src/sass/_main_sprite.scss'])
//         .pipe(replace('url(sprite.png)', 'url(../img/sprite.png)'))
//         .pipe(gulp.dest('src/sass'));
// });

// gulp.task('html:buildall', [
//     'html:build',
// ]);

gulp.task('watch', function() {
    // watch(['src/template/*.html'], function(event, cb) {
    //     gulp.start('html:buildall');
    // });
    // watch([path.watch.html], function(event, cb) {
    //     gulp.start('html:build');
    // });
    // watch([path.watch.style.main], function(event, cb) {
    //     gulp.start('style');
    // });
    // watch([path.watch.style.libs], function(event, cb) {
    //     gulp.start('style:libs');
    // });
    // watch(['src/bootstrap/less/**/*.*'], function(event, cb) {
    //     gulp.start('style:libs');
    // });
    // watch([path.watch.js.main], function(event, cb) {
    //     gulp.start('js');
    // });
    // watch([path.watch.js.libs], function(event, cb) {
    //     gulp.start('js:libs');
    // });
    // watch([path.watch.img], function(event, cb) {
    //     gulp.start('image:build');
    // });
    // watch([path.watch.fonts], function(event, cb) {
    //     gulp.start('fonts:build');
    // });
    gulp.watch(path.watch.html.main, ['html:main']);
    gulp.watch(path.watch.html.templ, ['html:templ']);
});

gulp.task('build', [
    'html:main',
    'html:templ',
    // 'bootstrap:buid',
    'js'
    // 'js:libs',
    'style',
    // 'style:libs',
    // 'fonts:build',
    // 'image:build'
]);
gulp.task('default', ['build', 'webserver', 'watch']);
