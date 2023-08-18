# Fluent Azure Pipelines

[![deno module](https://shield.deno.dev/x/fluent_azure_pipelines)](https://deno.land/x/fluent_azure_pipelines)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/tsirysndr/fluent-azure-pipelines)](https://codecov.io/gh/tsirysndr/fluent-azure-pipelines)

Fluent Azure Pipelines is a deno module for generating Azure Pipelines configuration (`azure-pipelines.yml`) files easily and fluently.

## 🚀 Usage

```typescript
import { AzurePipeline } from "https://deno.land/x/fluent_azure_pipelines/mod.ts";

const azurePipeline = new AzurePipeline();

azurePipeline
  .trigger(["master"])
  .pool({
    name: "Default",
    vmImage: "ubuntu-latest",
  })
  .step({
    task: "NodeTool@0",
    inputs: {
      versionSpec: "18.x",
    },
  })
  .step({
    script: "npm ci",
    displayName: "Install dependencies",
  })
  .step({
    script: "node index.mjs",
    displayName: "Run Dagger",
  });

azurePipeline.save("azure-pipelines.yml");
```
