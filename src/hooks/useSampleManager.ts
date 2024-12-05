import { useState, useEffect } from "react";

import { toTitleCase } from "@/utils/toTitleCase";
import type { Sample } from "@/types/sample";

export function useSampleManager() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [activeSample, setActiveSample] = useState<string | null>(null);

  useEffect(() => {
    loadSamples();
    setupHotReload();
  }, []);

  async function loadSamples() {
    const modules = import.meta.glob("/example-samples/**/*.sample.ts");
    const loadedSamples: Sample[] = [];

    for (const path in modules) {
      const module = await modules[path]();
      const group = path.split("/").pop()?.replace(".sample.ts", "") || "misc";
      const groupDisplayName = toTitleCase(group);

      Object.entries(module as any).forEach(([exportName, fn]) => {
        if (typeof fn === "function") {
          const sampleDisplayName = toTitleCase(exportName);
          loadedSamples.push({
            meta: {
              title: sampleDisplayName,
              group: groupDisplayName,
            },
            fn: fn as () => HTMLElement | string,
          });
        }
      });
    }

    setSamples(loadedSamples);
  }

  function setupHotReload() {
    if (import.meta.hot) {
      import.meta.hot.accept(() => {
        loadSamples();
      });
    }
  }

  return {
    samples,
    activeSample,
    setActiveSample,
  };
}
