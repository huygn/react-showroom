import type { NormalizedReactShowroomConfiguration } from '@showroomjs/core/react';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import { createClientWebpackConfig } from '../config/create-webpack-config';
import {
  RspackDevServer,
  Configuration as DevServerConfig,
} from '@rspack/dev-server';
import { createCompiler } from '@rspack/core';
import { createClientRspackConfig } from '../config/create-rspack-config';

export const createDevServer = (
  config: NormalizedReactShowroomConfiguration,
  options: { measure?: boolean; host: string; port: number; rspack?: boolean }
) => {
  const { assetDir, basePath } = config;

  const devServerOptions = Object.assign<DevServerConfig, DevServerConfig>(
    {
      port: options.port,
      host: options.host,
      client: {
        logging: 'none',
      },
      hot: true,
      historyApiFallback: {
        rewrites: [
          {
            from: new RegExp(`^\\${basePath}/_preview/`),
            to: `${basePath}/_preview.html`,
          },
          { from: /./, to: `${basePath}/index.html` },
        ],
      },
    },
    assetDir
      ? {
          static: {
            directory: assetDir,
            watch: true,
            publicPath: `${config.basePath}/`,
          },
        }
      : {}
  );

  if (options.rspack) {
    const rspackConfig = createClientRspackConfig('development', config, {
      measure: options.measure,
      operation: 'serve',
    });
    const compiler = createCompiler(rspackConfig);
    return new RspackDevServer(devServerOptions, compiler);
  }

  const webpackConfig = createClientWebpackConfig('development', config, {
    measure: options.measure,
    operation: 'serve',
  });
  const compiler = webpack(webpackConfig);
  return new webpackDevServer(devServerOptions, compiler);
};
