import { App } from './app';

class Server {
  private appInstance: App;
  private port: number | string;

  constructor() {
    this.port = process.env.API_PORT ?? 3001;
    this.appInstance = new App(this.port);
  }

  // Method to start the server
  public start(): void {
    this.appInstance.listen();
  }

  // Additional method for handling initialization logic, if needed
  public async init(): Promise<void> {
    console.log('Initializing resources...');
    // Add additional logic here like connecting to databases, or loading configurations.
    console.log('Initialization completed.');
  }
}

// Instantiate and run the server
(async () => {
  const server = new Server();
  await server.init(); // Optional: run any initialization logic
  server.start(); // Start the server
})();
