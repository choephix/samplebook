import { createServer } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import getPort from 'get-port';
import { samplebookPlugin } from '../vite-plugin/samplebookPlugin.js';
import react from '@vitejs/plugin-react';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export interface ServeOptions {
  directory: string;
  port?: number;
  host?: string;
}

export async function serve(options: ServeOptions) {
  const { directory, host = 'localhost' } = options;
  
  // Get available port
  const port = await getPort({
    port: options.port ? [options.port] : [3000, 3001, 3002, 3003, 3004, 3005],
  });

  // Resolve paths
  const targetDir = resolve(process.cwd(), directory);
  // In production, __dirname points to dist/cli, so we need to go back to src/app
  const appDir = resolve(__dirname, '../../src/app');

  console.log(`Starting Samplebook for: ${targetDir}`);
  console.log(`App directory: ${appDir}`);
  console.log(`__dirname: ${__dirname}`);
  
  try {
    const server = await createServer({
      root: appDir,
      server: {
        port,
        host,
        open: true,
      },
      plugins: [
        react(),
        samplebookPlugin(targetDir),
      ],
      define: {
        'process.env.NODE_ENV': JSON.stringify('development'),
      },
      optimizeDeps: {
        include: ['react', 'react-dom'],
      },
    });

    await server.listen();
    
    console.log(`🚀 Samplebook running at http://${host}:${port}`);
    console.log(`📁 Serving samples from: ${targetDir}`);
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}
