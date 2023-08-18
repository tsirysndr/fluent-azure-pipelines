import { AzurePipeline } from "../mod.ts";

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
