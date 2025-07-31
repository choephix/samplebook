import { Plugin } from 'vite';
import { globby } from 'globby';
import { relative, join } from 'path';
import { readFileSync, existsSync } from 'fs';

export interface SampleFunction {
  name: string;
  filePath: string;
  relativePath: string;
}

export function samplebookPlugin(targetDirectory: string): Plugin {
  const virtualModuleId = 'virtual:samplebook-samples';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'samplebook',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
      return null;
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        console.log('Loading virtual module for samples...');
        const result = await generateSamplesList(targetDirectory);
        console.log('Generated samples list:', result.substring(0, 200) + '...');
        return result;
      }
      return null;
    },
    configureServer(server: any) {
      // Watch for changes in sample files
      const watcher = server.watcher;
      watcher.add(join(targetDirectory, '**/*.samples.{ts,js}'));

      watcher.on('change', (file: string) => {
        if (file.includes('.samples.')) {
          // Invalidate the virtual module to regenerate the list
          const module = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
          if (module) {
            server.reloadModule(module);
          }
        }
      });
    },
  };
}

async function loadProcessorFunction(targetDirectory: string): Promise<string | null> {
  const processorPath = join(targetDirectory, '.samplebook', 'process-function.ts');

  if (existsSync(processorPath)) {
    console.log(`Found processor function at: ${processorPath}`);
    return processorPath;
  }

  console.log('No processor function found, using default behavior');
  return null;
}

async function generateSamplesList(targetDirectory: string): Promise<string> {
  try {
    // Find all .samples.ts files (let Vite handle TypeScript compilation)
    const sampleFiles = await globby([
      '**/*.samples.ts',
      '**/*.samples.tsx',
    ], {
      cwd: targetDirectory,
      absolute: true,
      ignore: ['**/dist/**', '**/node_modules/**', '**/build/**'],
    });

    console.log(`Found ${sampleFiles.length} sample files:`, sampleFiles);

    const samples: SampleFunction[] = [];
    
    for (const filePath of sampleFiles) {
      const relativePath = relative(targetDirectory, filePath);
      const fileContent = readFileSync(filePath, 'utf-8');
      
      // Simple regex to find exported functions
      const exportMatches = fileContent.match(/export\s+function\s+(\w+)/g);
      
      if (exportMatches) {
        for (const match of exportMatches) {
          const functionName = match.replace(/export\s+function\s+/, '');
          samples.push({
            name: functionName,
            filePath,
            relativePath,
          });
        }
      }
    }

    console.log(`Found ${samples.length} sample functions:`, samples.map(s => s.name));

    // Check for processor function
    const processorPath = await loadProcessorFunction(targetDirectory);

    // Generate the imports and exports
    let imports = samples.map((sample, index) =>
      `import { ${sample.name} as sample_${index} } from '${sample.filePath}';`
    ).join('\n');

    // Add processor function import if it exists
    if (processorPath) {
      // Convert Windows backslashes to forward slashes for Vite imports
      const normalizedPath = processorPath.replace(/\\/g, '/');
      imports += `\nimport userProcessorFunction from '${normalizedPath}';`;
    }

    const samplesList = samples.map((sample, index) => ({
      name: sample.name,
      func: `sample_${index}`,
      file: sample.relativePath,
    }));

    const exports = `
export const samples = ${JSON.stringify(samplesList, null, 2)};

export const sampleFunctions = {
${samples.map((sample, index) => `  '${sample.name}': sample_${index}`).join(',\n')}
};

export const processorFunction = ${processorPath ? 'userProcessorFunction' : 'undefined'};

export const errorMessage = undefined;
`;

    return imports + '\n' + exports;
    
  } catch (error) {
    console.error('Error generating samples list:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return `
export const samples = [];
export const sampleFunctions = {};
export const errorMessage = ${JSON.stringify(errorMessage)};
`;
  }
}
