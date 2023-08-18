import { AzurePipeline } from "https://deno.land/x/fluent_azure_pipelines@v0.1.1/mod.ts";

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

console.log(azurePipeline.toString());
