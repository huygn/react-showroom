// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

import webpack from 'webpack';
import { createWebpackConfig } from '../config/create-webpack-config';

(async function buildStaticSite() {
  const webpackConfig = await createWebpackConfig('production');

  const compiler = webpack(webpackConfig);

  compiler.run((err, stats) => {
    if (err || stats?.hasErrors()) {
      if (err) {
        console.error(err);
      }
      compiler.close(() => {
        console.error('Fix the error and try again.');
      });
      return;
    }

    compiler.close(() => {
      console.log('Done built.');
      console.log('Outputs are generated at:');
    });
  });
})();