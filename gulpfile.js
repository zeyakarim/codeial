const gulp = require('gulp');

// gulp-sass convert sass to css
const sass = require('gulp-sass')(require('node-sass'));

// gulp-cssnano compressed the file,like remove the space,do variable name shorter 
//and all code contain one line
const cssnano = require('gulp-cssnano');

// gulp-rev add the hash to file name
const rev = require('gulp-rev');

// gulp-uglify-es compress the js file,like remove the space,do variable name shorter
// and all code contain one line
const uglify = require('gulp-uglify-es').default;

// gulp-imgagemin compress the image file,like remove the space,do variable name shorter
// and all code contain one line
const imagemin = require('gulp-imagemin');

// using del i will previous file
const del = require('del');

// gulp compressed task is css
gulp.task('css',function(done){
    console.log('minifying css...')
    gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

// gulp compressed task is js
gulp.task('js',function(done){
    console.log('minifying js...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// gulp compressed task is images
gulp.task('images',function(done){
    console.log('minifying images..');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

// empty the public/assets diretory
gulp.task('clean:assets',function(done){
    // del.sync('./public/assets');
    del.sync(['./public/assets'], { force:true });
    done();
});

gulp.task('build',gulp.series('clean:assets','css','js','images'),function(done){
    console.log('Building assets');
    done();
})