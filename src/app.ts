import express from 'express';
import cors from 'cors';

class Server {
  private static _app: Server;
  private isInit: boolean = false;
  private port: number = parseInt(process.env.PORT || '8080', 10);
  public applicatipon: express.Application;  

  public static get app(): Server {
    const { _app } = Server;
    if (!_app) return Server._app = new Server();
    return _app;
  }

  private constructor() {
    this.applicatipon = express();
    this.init();
  };

  private init = () => {
    const { isInit, applicatipon, port } = this;

    if (isInit) return;

    applicatipon.use(cors());

    applicatipon.get('/', (req, res, next) => {
      res.send('Hello Express World');
    });
    applicatipon.listen(port, () => console.log('server started!'));

    this.isInit = true;
  }
}

export default Server.app.applicatipon;
