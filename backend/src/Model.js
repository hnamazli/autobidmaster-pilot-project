import lots from './db/lots.json';

class Model {
    constructor() {
        this._users = [
            {
                id: 1,
                email: 'user@test.az',
                password: '123456',
            },
            {
                id: 2,
                email: 'test@autobidmaster.com',
                password: 'Aa12345',
            }
        ];
        this._lots = lots;
    }

    getUsers = () => {
        return [...this._users];
    }

    getLots = () => {
        return [...this._lots];
    }
}

export default Model;