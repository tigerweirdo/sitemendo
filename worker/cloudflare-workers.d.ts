/* 'cloudflare:workers' modülünün yalnız kullandığımız kısmı. Cloudflare'ın tam tip dosyası
   (wrangler types) DOM tipleriyle çakıştığı için tsconfig'e eklenmedi; imzalar onun
   üretiminden alındı (Workflows: WorkflowEntrypoint, WorkflowStep, WorkflowEvent). */
declare module 'cloudflare:workers' {
  type Unit = 'second' | 'minute' | 'hour' | 'day' | 'week';
  export type WorkflowDuration = `${number} ${Unit}${'s' | ''}` | number;

  export type WorkflowEvent<T> = {
    payload: Readonly<T>;
    timestamp: Date;
    instanceId: string;
    workflowName: string;
  };

  export type WorkflowStepConfig = {
    retries?: { limit: number; delay: WorkflowDuration; backoff?: 'constant' | 'linear' | 'exponential' };
    timeout?: WorkflowDuration;
  };

  export abstract class WorkflowStep {
    do<T>(name: string, callback: () => Promise<T>): Promise<T>;
    do<T>(name: string, config: WorkflowStepConfig, callback: () => Promise<T>): Promise<T>;
    sleep(name: string, duration: WorkflowDuration): Promise<void>;
    waitForEvent<T>(name: string, options: { type: string; timeout?: WorkflowDuration }): Promise<{ payload: Readonly<T>; timestamp: Date; type: string }>;
  }

  export abstract class WorkflowEntrypoint<Env = unknown, T = unknown> {
    protected ctx: unknown;
    protected env: Env;
    constructor(ctx: unknown, env: Env);
    abstract run(event: Readonly<WorkflowEvent<T>>, step: WorkflowStep): Promise<unknown>;
  }
}
