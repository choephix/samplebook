import { useEffect, useState } from 'react';
import { Router, Link, useSampleRoute, buildSampleRoute } from './lib/routing';

// Import the virtual module that contains our samples
// @ts-ignore
import { samples, sampleFunctions, processorFunction, errorMessage } from 'virtual:samplebook-samples';

interface Sample {
  name: string;
  func: string;
  file: string;
}

// Group samples by file
function groupSamplesByFile(samples: Sample[]) {
  const groups: Record<string, Sample[]> = {};

  samples.forEach(sample => {
    // Strip extension and .samples/.sample suffix
    const fileKey = sample.file
      .replace(/\.(ts|js|tsx|jsx)$/, '') // Strip extension
      .replace(/\.samples?$/, ''); // Strip .samples or .sample
    if (!groups[fileKey]) {
      groups[fileKey] = [];
    }
    groups[fileKey].push(sample);
  });

  return groups;
}

// Sidebar component
function Sidebar({ samples }: { samples: Sample[] }) {
  const { filePath, functionName } = useSampleRoute();
  const groupedSamples = groupSamplesByFile(samples);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Samplebook</h2>
        <p>{samples.length} sample{samples.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="sidebar-content">
        {Object.entries(groupedSamples).map(([fileKey, fileSamples]) => (
          <div key={fileKey} className="file-group">
            <h3 className="file-title">{fileKey}</h3>
            <ul className="sample-list">
              {fileSamples.map(sample => {
                const route = buildSampleRoute(sample.file, sample.name);
                const isActive = filePath === fileKey && functionName === sample.name;

                return (
                  <li key={sample.name}>
                    <Link
                      to={route}
                      className={`sample-link ${isActive ? 'active' : ''}`}
                    >
                      {sample.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sample preview component
function SamplePreview({ sample, sampleFunction }: { sample: Sample; sampleFunction: () => unknown }) {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      let domElement: HTMLElement;

      if (processorFunction) {
        // Use the processor function if available
        domElement = processorFunction(sampleFunction);
      } else {
        // Default behavior: assume the function returns an HTMLElement
        const result = sampleFunction();
        if (result instanceof HTMLElement) {
          domElement = result;
        } else {
          throw new Error('Sample function must return an HTMLElement when no processor is provided');
        }
      }

      setElement(domElement);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setElement(null);
    }
  }, [sampleFunction]);

  useEffect(() => {
    if (element) {
      const container = document.getElementById('sample-preview-container');
      if (container) {
        // Clear previous content
        container.innerHTML = '';
        // Append the new element
        container.appendChild(element);
      }
    }
  }, [element]);

  return (
    <div className="sample-preview">
      <div className="preview-header">
        <h1>{sample.name}</h1>
        <p className="preview-file">{sample.file}</p>
      </div>
      <div className="preview-content">
        {error ? (
          <div className="error-message">
            Error rendering sample: {error}
          </div>
        ) : (
          <div id="sample-preview-container" />
        )}
      </div>
    </div>
  );
}

// Main content component
function MainContent() {
  const { filePath, functionName, isValid } = useSampleRoute();

  if (!isValid || !filePath || !functionName) {
    return (
      <div className="main-content">
        <div className="welcome">
          <h1>Welcome to Samplebook</h1>
          <p>Select a sample from the sidebar to preview it.</p>
        </div>
      </div>
    );
  }

  // Find the sample
  const sample = samples.find((s: Sample) => {
    const sampleFileKey = s.file
      .replace(/\.(ts|js|tsx|jsx)$/, '') // Strip extension
      .replace(/\.samples?$/, ''); // Strip .samples or .sample
    return sampleFileKey === filePath && s.name === functionName;
  });

  if (!sample) {
    return (
      <div className="main-content">
        <div className="error-message">
          Sample not found: {filePath}/{functionName}
        </div>
      </div>
    );
  }

  const sampleFunction = sampleFunctions[sample.name];
  if (!sampleFunction) {
    return (
      <div className="main-content">
        <div className="error-message">
          Sample function not found: {sample.name}
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <SamplePreview sample={sample} sampleFunction={sampleFunction} />
    </div>
  );
}

export function App() {
  console.log('Samples:', samples);
  console.log('Sample functions:', sampleFunctions);
  console.log('Error message:', errorMessage);

  if (errorMessage) {
    return (
      <div className="app-error">
        <h1>🥄 Samplebook</h1>
        <div className="error-message">
          <strong>Error loading samples:</strong> {errorMessage}
        </div>
      </div>
    );
  }

  if (!samples || samples.length === 0) {
    return (
      <div className="app-error">
        <h1>🥄 Samplebook</h1>
        <div className="no-samples">
          <h2>No samples found</h2>
          <p>Create <code>*.samples.ts</code> files with exported functions that return HTMLElement.</p>
          <p>Example:</p>
          <pre style={{ textAlign: 'left', background: '#f8f8f8', padding: '1rem', borderRadius: '4px' }}>
{`export function mySample(): HTMLElement {
  const div = document.createElement('div');
  div.textContent = 'Hello World!';
  return div;
}`}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Sidebar samples={samples} />
        <MainContent />
      </div>
    </Router>
  );
}
