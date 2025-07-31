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
    <div className="sample-card">
      <div className="sample-header">
        <h3 className="sample-title">{sample.name}</h3>
        <p className="sample-file">{sample.file}</p>
      </div>
      <div className="sample-content">
        {error ? (
          <div className="error-message">Error rendering sample: {error}</div>
        ) : (
          <div id={`sample-${sample.name}`} />
        )}
      </div>
    </div>
  );
}

function LayoutError(props: { message: string }) {
  return (
    <div>
      <div className="header">
        <h1>Samplebook</h1>
      </div>
      <div className="container">
        <div className="error-message">
          <strong>Error loading samples:</strong> {props.message}
        </div>
      </div>
    </div>
  );
}

function LayoutNoSamples() {
  return (
    <div>
      <div className="header">
        <h1>Samplebook</h1>
      </div>
      <div className="container">
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

  if (errorMessage) {
    return <LayoutError message={errorMessage} />;
  }

  if (!samples || samples.length === 0) {
    return <LayoutNoSamples />;
  }

  return (
    <div>
      <div className="header">
        <h1>Samplebook</h1>
        <p style={{ margin: "0.5rem 0 0 0", opacity: 0.9 }}>
          Found {samples.length} sample{samples.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="container">
        <div className="sample-grid">
          {samples.map((sample: Sample) => {
            const sampleFunction = sampleFunctions[sample.name];
            if (!sampleFunction) {
              return (
                <div key={sample.name} className="sample-card">
                  <div className="sample-header">
                    <h3 className="sample-title">{sample.name}</h3>
                    <p className="sample-file">{sample.file}</p>
                  </div>
                  <div className="sample-content">
                    <div className="error-message">
                      Sample function not found
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <SampleCard
                key={sample.name}
                sample={sample}
                sampleFunction={sampleFunction}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
