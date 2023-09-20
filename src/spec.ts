import { z } from "../deps.ts";

export const PoolSchema = z.object({
  name: z.string().optional(),
  vmImage: z.string(),
});

export const StepSchema = z.object({
  task: z.string().optional(),
  script: z.string().optional(),
  displayName: z.string().optional(),
  inputs: z.record(z.string()).optional(),
});

// azure pipeline yaml schema
export const Schema = z.object({
  trigger: z.array(z.string()),
  variables: z.record(z.string()).optional(),
  pool: PoolSchema,
  steps: z.array(StepSchema),
});

export type Pool = z.infer<typeof PoolSchema>;

export type Step = z.infer<typeof StepSchema>;

export type AzurePipelineYaml = z.infer<typeof Schema>;
