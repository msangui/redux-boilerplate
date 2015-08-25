import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import requireDir from 'require-dir';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import webpackConfigDev from './webpack/dev.config';
import webpackConfigProd from './webpack/prod.config';
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

const plugins = gulpLoadPlugins();
const tasks = requireDir('./gulp-tasks');
const config = __DEVELOPMENT__ ? webpackConfigDev : webpackConfigProd;

function getTask(task, ...adHocParameters) {
    return require('./gulp-tasks/' + task)(gulp, plugins, ...adHocParameters);
}

gulp.task('browser-sync-init', getTask('browserSync', browserSync));  

gulp.task('webpack-dev', getTask('webpack', config));

gulp.task('server', getTask('server'));

gulp.task('dev', () => {
    runSequence('webpack-dev', 'browser-sync-init', 'server');
})

gulp.task('default', ['dev']);