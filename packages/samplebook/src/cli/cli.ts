#!/usr/bin/env node

import { Command } from 'commander';
import { serve } from './serve.js';

const program = new Command('samplebook');
program.showHelpAfterError().showSuggestionAfterError();

program
  .command('serve [directory]')
  .alias('dev')
  .description('start developing')
  .option('-p, --port [number]', 'port to serve the application', parseInt)
  .option('-h, --host [string]', 'host to serve the application')
  .action(async (directory: string, options: any) => {
    const targetDir = directory || process.cwd();
    await serve({
      directory: targetDir,
      port: options.port,
      host: options.host,
    });
  });

// Default command when no subcommand is provided
program
  .argument('[directory]', 'directory to serve')
  .option('-p, --port [number]', 'port to serve the application', parseInt)
  .option('-h, --host [string]', 'host to serve the application')
  .action(async (directory: string, options: any) => {
    const targetDir = directory || process.cwd();
    await serve({
      directory: targetDir,
      port: options.port,
      host: options.host,
    });
  });

program.parse(process.argv);
