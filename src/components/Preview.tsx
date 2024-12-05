import { useEffect, useRef } from "react";

import type { Sample } from "@/types/sample";
import { PreviewStyles } from "@/components/styles/PreviewStyles";

interface PreviewProps {
  sample: Sample | null;
}

export function Preview({ sample }: PreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sample) return;

    // Clear previous content
    containerRef.current.innerHTML = "";

    try {
      const result = sample.fn();

      if (Array.isArray(result)) {
        result.forEach((element) => {
          if (typeof element === "string") {
            const div = document.createElement("div");
            div.innerHTML = element;
            containerRef.current!.appendChild(div);
          } else {
            containerRef.current!.appendChild(element);
          }
        });
      } else if (typeof result === "string") {
        containerRef.current.innerHTML = result;
      } else {
        containerRef.current.appendChild(result);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      containerRef.current.innerHTML = `<div class="error">Error: ${msg}</div>`;
    }
  }, [sample]);

  return (
    <div className="preview">
      <div className="preview-header">
        {sample ? sample.meta.title : "Select a sample"}
      </div>
      <div className="preview-content" ref={containerRef}>
        {!sample && (
          <div className="empty">Select a sample from the sidebar</div>
        )}
      </div>
      <PreviewStyles />
    </div>
  );
}
