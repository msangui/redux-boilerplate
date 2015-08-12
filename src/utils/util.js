var path = require('path');

const readStats = () => {
  // don't cache the `webpack-stats.json` on dev so we read the file on each request.
  // on production, use simple `require` to cache the file
  const stats = require('../../webpack-stats.json');
  if (__DEVELOPMENT__) {
    delete require.cache[require.resolve('../../webpack-stats.json')];
  }
  return stats;
};

export function requireServerCss(cssPath) {
  var dirname = path.resolve(__dirname, '..');
  if (__CLIENT__) {
    throw new Error('server-side only css resolver called on client');
  }
  console.log('dirname', __dirname, 'css', cssPath)
  return readStats().css.modules[cssPath.slice(dirname.length)];
}

export function requireServerImage(imagePath) {
  if (!imagePath) {
    return '';
  }
  if (__CLIENT__) {
    throw new Error('server-side only image resolver called on client');
  }
  const images = readStats().images;
  if (!images) {
    return '';
  }

  // Find the correct image
  const regex = new RegExp(`${imagePath}$`);
  const image = images.find(img => regex.test(img.original));

  // Serve image.
  if (image) return image.compiled;

  // Serve a not-found asset maybe?
  return '';
}
