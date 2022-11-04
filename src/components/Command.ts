export interface Command {
  /**
   * Command aliases
   */
  readonly aliases: string[];

  /**
   * Help message
   */
  getHelpMessage(prefix: string): string;

  /**
   * Execute command
   */
  run(): Promise<void>;

  /**
   * Check user permissions
   */
  checkUserPerms(): boolean;

}
