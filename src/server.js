const Hapi = require('@hapi/hapi');

const Routes = require('./handler/routes');
const config = require('./config/config');

class Server {
  constructor() {
    this.port = 1234;
    this.node_env = '';
    this.host = '';
    this.getEnv();
  }

  getEnv() {
    this.port = config.port || 5000;
    this.node_env = config.node_env || 'development';
    this.host = config.node_env !== 'production' ? 'localhost' : '0.0.0.0';
  }

  async init() {
    const server = Hapi.Server({
      port: this.port,
      host: this.host,
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });

    server.route(Routes.routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  }
}

const application = new Server();
application.init();
