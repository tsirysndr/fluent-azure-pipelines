import { stringify } from "https://esm.sh/v131/yaml@2.3.1";
import {
  AzurePipelineYaml,
  Pool,
  PoolSchema,
  Step,
  StepSchema,
} from "./spec.ts";

class AzurePipeline {
  private yaml: AzurePipelineYaml;

  constructor() {
    this.yaml = {
      trigger: [],
      pool: {
        vmImage: "ubuntu-latest",
      },
      steps: [],
    };
  }

  trigger(values: string[]): AzurePipeline {
    this.yaml.trigger = values;
    return this;
  }

  pool(values: Pool): AzurePipeline {
    PoolSchema.parse(values);
    this.yaml.pool = values;
    return this;
  }

  steps(values: Step[]): AzurePipeline {
    for (const value of values) {
      StepSchema.parse(value);
    }
    this.yaml.steps = values;
    return this;
  }

  step(value: Step): AzurePipeline {
    StepSchema.parse(value);
    this.yaml.steps.push(value);
    return this;
  }

  toString(): string {
    return `# Do not edit this file directly. It is generated by https://deno.land/x/fluent_azure_pipelines\n\n${stringify(
      this.yaml,
      { lineWidth: 0 }
    )}`;
  }

  save(path = "azure-pipelines.yml") {
    const config = this.toString();
    Deno.writeTextFileSync(path, config);
  }
}

export default AzurePipeline;
