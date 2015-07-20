// var notify = require("gulp-notify");
var gutil = require("gulp-util");

module.exports = function(err, callback) {
  // notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
  if (err) throw new gutil.PluginError("webpack", err);

  // Keep gulp from hanging on this task
  if (typeof this.emit === 'function') this.emit('end');
};
