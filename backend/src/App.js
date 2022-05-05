import path from 'path';
import express from 'express';
import session from 'express-session';
import Controller from './Controller';

class App {
    constructor() {
        this._controller = new Controller();
        this._app = express();
        this._app.use(session({
            secret: 'autobidmaster',
            resave: false,
            saveUninitialized: false,
        }));
        this._app.use(express.json());
        this._app.use(express.static(path.resolve(__dirname, '../public')));

        this._app.post('/api/sign-in', this.onSignIn);
        this._app.post('/api/sign-out', this.onSignOut);
        this._app.get('/api/lot', this.onGetLotById);
    }

    onSignIn = (req, res) => {
        const { body } = req;

        if (body.email && body.password) {
            const user = this._controller.signIn(body);

            if (user) {
                req.session.isAuth = true;

                const resData = {
                    success: true,
                    redirectUrl: '/'
                }

                res.json(resData).end();
            } else {
                const resData = {
                    success: false,
                    message: 'Email or password is incorrect!'
                }
                
                res.json(resData).end();
            }

            return;
        }

        const resData = {
            success: false,
            message: 'Email or password is empty!'
        };

        res.status(403).json(resData).end();
    }

    onSignOut = (req, res) => {
        if (req.session.isAuth) {
            req.session.destroy();
        }

        res.end();
    }

    onGetLotById = (req, res) => {
        if (!req.session.isAuth) {
            const resData = {
                success: false,
                redirectUrl: '/sign-in'
            };

            res.json(resData).end();

            return;
        }

        const { query } = req;

        if (query.id) {
            const data = this._controller.getLotById(query.id);

            const resData = {
                lot: data,
                success: true
            };
        
            res.json(resData).end();

            return;
        }

        const resData = {
            success: false,
            message: 'Lot ID does not exist!'
        };

        res.json(resData).end();
    }

    getApp = () => {
        return this._app;
    }
}

export default App;