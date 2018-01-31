import { model, setModule } from '../modules/moto-state/model';
import Utils from '../modules/moto-state/utils';
console.log('------------------ Language Model ---------------------');
export default class Language {
    constructor(instance, args) {
        //console.log(args)
        const keys = Object.keys(args);
        keys.forEach((key) => {
            this[key] = args[key];
        });
        //this.instance = instance;
    }
}

export let language = function (instance, values) {
    let state;

    const func = function () {
        console.log(this)
        state = this;
        console.log(state);
    }
    Utils.triggerEvent('get-state', { action: func });
    console.log(state)
    let m = {};
    if (!state[instance]) {
        m = model(instance, values);
    }else{
        m = state[instance];
    }

    return m;
}


