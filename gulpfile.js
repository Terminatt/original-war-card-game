var gulp = require("gulp");
var browserSync = require("browser-sync");

gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });
  gulp.watch("./app").on("change", browserSync.reload);
});
