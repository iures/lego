var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var series = require('stream-series');
var util = require('../util');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var insert = require('gulp-insert');
var gulpif = require('gulp-if');
var args = util.args;
var IS_DEV = require('../const').IS_DEV;
var debug = require('gulp-debug');

exports.task = function() {
  var modules   = args['modules'],
      overrides = args['override'],
      dest      = args['output-dir'] || config.outputDir,
      filename  = args['filename'] || 'crowdtap-ct',
      paths     = getPaths();
  var streams = [];
  var baseVars = fs.readFileSync('src/core/style/variables.less', 'utf8').toString();
  gutil.log("Building css files...");

  // create less file for distribution
  streams.push(
    gulp.src(paths)
      .pipe(util.filterNonCodeFiles())
      .pipe(filter(['**', '!**/*-theme.less']))
      .pipe(concat('crowdtap-ct.less'))
      .pipe(gulp.dest(dest))
  );

  streams.push(
      gulp.src(paths)
          .pipe(util.filterNonCodeFiles())
          .pipe(filter(['**', '!**/*-theme.less']))
          .pipe(concat('crowdtap-ct.less'))
          .pipe(gulp.dest(dest))
          .pipe(less())
          .pipe(rename({ basename: filename }))
          .pipe(util.autoprefix())
          .pipe(insert.prepend(config.banner))
          .pipe(gulp.dest(dest))
          .pipe(gulpif(!IS_DEV, minifyCss()))
          .pipe(rename({extname: '.min.css'}))
          .pipe(gulp.dest(dest))
  );

  streams.push(
      gulp.src(config.lessStandaloneFiles)
          .pipe(insert.prepend(baseVars))
          .pipe(less())
          .pipe(util.autoprefix())
          .pipe(insert.prepend(config.banner))
          .pipe(rename({prefix: 'crowdtap-ct-'}))
          .pipe(gulp.dest(path.join(dest, 'modules', 'css')))
  );

  return series(streams);
  function getPaths () {
    var paths = config.lessBaseFiles.slice();
    if (modules) {
      paths.push.apply(paths, modules.split(',').map(function (module) {
        return 'src/components/' + module + '/*.less';
      }));
    } else {
      paths.push(path.join(config.paths, '*.less'));
    }
    overrides && paths.unshift(overrides);
    return paths;
  }
};
