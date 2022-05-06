import Server from './Server';

const init = () => {
    const port = process.env.PORT || 3001;
    const server = new Server(port);

    server.init();
};

init();