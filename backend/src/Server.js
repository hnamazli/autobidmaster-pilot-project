import http from 'http';
import App from './App';

class Server {
    constructor(port) {
        this._port = port;

        this._app = new App();
        this._server = http.createServer(this._app.getApp());
    }

    init = () => {
        console.log('SERVER HAS BEEN STARTED ON PORT:', this._port);
        this._server.listen(this._port);
    }
}

export default Server;