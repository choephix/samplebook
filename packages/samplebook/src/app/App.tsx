import { useEffect, useState } from "react";

// Import the virtual module that contains our samples
import {
  samples,
  sampleFunctions,
  processorFunction,
  errorMessage,
  type Sample,
} from "virtual:samplebook-samples";

function SampleCard({
  sample,
  sampleFunction,
}: {
  sample: Sample;
  sampleFunction: () => unknown;
}) {
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
          throw new Error(
            "Sample function must return an HTMLElement when no processor is provided"
          );
        }
      }

      setElement(domElement);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setElement(null);
    }
  }, [sampleFunction]);

  useEffect(() => {
    if (element) {
      const container = document.getElementById(`sample-${sample.name}`);
      if (container) {
        // Clear previous content
        container.innerHTML = "";
        // Append the new element
        container.appendChild(element);
      }
    }
  }, [element, sample.name]);

  return (
    <div className="sample-preview">
      {error ? (
        <div className="error-message">Error rendering sample: {error}</div>
      ) : (
        <div id={`sample-${sample.name}`} />
      )}
    </div>
  );
}

function Sidebar({
  samples,
  selectedSample,
  onSampleSelect,
}: {
  samples: Sample[];
  selectedSample: Sample | null;
  onSampleSelect: (sample: Sample) => void;
}) {
  // Group samples by file path
  const groupedSamples = samples.reduce((groups, sample) => {
    const filePath = sample.file;
    if (!groups[filePath]) {
      groups[filePath] = [];
    }
    groups[filePath].push(sample);
    return groups;
  }, {} as Record<string, Sample[]>);

  return (
    <div className="sidebar">
      <div className="sample-list">
        {Object.entries(groupedSamples).map(([filePath, fileSamples]) => (
          <div key={filePath} className="sample-group">
            <div className="sample-group-header">
              <span className="sample-group-title">{filePath}</span>
            </div>
            <div className="sample-group-items">
              {fileSamples.map((sample) => (
                <button
                  key={sample.name}
                  className={`sample-item ${selectedSample?.name === sample.name ? 'active' : ''}`}
                  onClick={() => onSampleSelect(sample)}
                >
                  <div className="sample-item-name">{sample.name}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LayoutError(props: { message: string }) {
  return (
    <div className="app">
      <div className="header">
        <h1>Samplebook</h1>
      </div>
      <div className="main-content">
        <div className="error-message">
          <strong>Error loading samples:</strong> {props.message}
        </div>
      </div>
    </div>
  );
}

function LayoutNoSamples() {
  return (
    <div className="app">
      <div className="header">
        <h1>Samplebook</h1>
      </div>
      <div className="main-content">
        <div className="no-samples">
          <h2>No samples found</h2>
          <p>
            Create <code>*.samples.ts</code> files with exported functions that
            return HTMLElement.
          </p>
          <p>Example:</p>
          <pre
            style={{
              textAlign: "left",
              background: "#f8f8f8",
              padding: "1rem",
              borderRadius: "4px",
            }}
          >
            {`export function mySample(): HTMLElement {
  const div = document.createElement('div');
  div.textContent = 'Hello World!';
  return div;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export function App() {
  console.log("Samples:", samples);
  console.log("Sample functions:", sampleFunctions);
  console.log("Error message:", errorMessage);

  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  // Set the first sample as selected when samples load
  useEffect(() => {
    if (samples && samples.length > 0 && !selectedSample) {
      setSelectedSample(samples[0]);
    }
  }, [samples, selectedSample]);

  if (errorMessage) {
    return <LayoutError message={errorMessage} />;
  }

  if (!samples || samples.length === 0) {
    return <LayoutNoSamples />;
  }

  const selectedSampleFunction = selectedSample ? sampleFunctions[selectedSample.name] : null;

  return (
    <div className="app">
      <div className="header">
        <div className="header-content">
          <h1>Samplebook</h1>
          {selectedSample && (
            <div className="header-sample-info">
              <span className="header-separator">›</span>
              <span className="header-sample-name">{selectedSample.name}</span>
              <span className="header-sample-file">{selectedSample.file}</span>
            </div>
          )}
        </div>

      </div>
      <div className="main-content">
        <Sidebar
          samples={samples}
          selectedSample={selectedSample}
          onSampleSelect={setSelectedSample}
        />
        <div className="preview-pane">
          {selectedSample && selectedSampleFunction ? (
            <SampleCard
              sample={selectedSample}
              sampleFunction={selectedSampleFunction}
            />
          ) : selectedSample ? (
            <div className="sample-preview">
              <div className="sample-header">
                <h3 className="sample-title">{selectedSample.name}</h3>
                <p className="sample-file">{selectedSample.file}</p>
              </div>
              <div className="sample-content">
                <div className="error-message">
                  Sample function not found
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <h2>Select a sample</h2>
              <p>Choose a sample from the sidebar to preview it here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
