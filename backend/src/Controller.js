import Model from './Model';

class Controller {
    constructor() {
        this._model = new Model();
    }

    signIn = ({ email, password }) => {
        const users = this._model.getUsers();

        const foundUser = users.find((user) => user.email === email && user.password === password);

        return foundUser;
    };

    getLotById = (id) => {
        const lots = this._model.getLots();

        const foundLot = lots.find((lot) => lot.id === +id);

        return foundLot || {};
    };
}

export default Controller;