export type TaskHandler = (data: any) => Promise<void>;

export class TaskQueue {
  private queueName: string;
  private handler: TaskHandler | null = null;

  constructor(queueName: string) {
    this.queueName = queueName;
  }

  public process(handler: TaskHandler) {
    this.handler = handler;
  }

  public async add(jobName: string, data: any) {
    console.log(`[TaskQueue:${this.queueName}] Job added: ${jobName}`);

    // Simulating background execution
    if (this.handler) {
      setImmediate(async () => {
        try {
          await this.handler!(data);
          console.log(`[TaskQueue:${this.queueName}] Job completed: ${jobName}`);
        } catch (error: any) {
          console.error(`[TaskQueue:${this.queueName}] Job failed: ${jobName} - ${error.message}`);
        }
      });
    }
  }
}
