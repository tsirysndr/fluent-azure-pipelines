import { assertEquals } from "https://deno.land/std@0.191.0/testing/asserts.ts";
import AzurePipeline from "./config.ts";

Deno.test(function azurePipelineTest() {
  const yaml = Deno.readTextFileSync("./fixtures/azure-pipelines.yml");

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

  assertEquals(azurePipeline.toString(), yaml);
});
