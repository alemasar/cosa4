import { store, addModule } from './store';
import Utils from '../moto-state/utils';

//let state = state;
/*class prova {
    constructor(disposition) {
        this.disposition = disposition;
        console.log(disposition);
    }
}
const t = new prova('fierce');
const handler1 = {
    construct(target, args) {
        console.log(args);
        // expected output: "monster1 constructor called"

        return new target(...args);
    },
    get: function (target, propKey, receiver) {
        console.log(target);
        if (!(propKey in target.model)) {
            throw new ReferenceError('Unknown property: ' + propKey);
        }
        //            target.model[propKey];
        return Reflect.get(target, propKey, receiver);
        //return obj[prop];
    }

};
*/
//state['hola'] = "hola";
console.log(store)
export const setModule = function (id, module){
    addModule(id, module);
}
export let model = function (instance, values) {
   // console.log('------------------ Valor de instancia: '+instance+' --------------------------');
    let v = {...values};
    let state;

    const func = function () {
        console.log(this)
        state = this;
    }
    Utils.triggerEvent('get-state', { action: func });
    console.log(state)

    if (!state[instance]){
        state[instance] = {};
    }

    const proxy = new Proxy(state[instance], {
        setPrototypeOf: function (target, prototype){
            return Reflect['setPrototypeOf'];
        },
        get: function (target, propKey, receiver) {
           // console.log(target);
            if (!(propKey in target)) {
                throw new ReferenceError('Unknown property: ' + propKey);
            }
            //            target.model[propKey];
            return Reflect.get(target, propKey, receiver);
            //return obj[prop];
        },
        set: function (target, prop, value) {
            //console.log(prop);
           // console.log(target);
            //       console.log(store.modelo);
            //state.push({ ...value });
            //console.log(target)

            //target.model = value;
            return Reflect.set(target, prop, value);
        }
    });
  //  console.log('---------------------- valores --------------------------');
   // console.log(state[instance]);
    
    Reflect.setPrototypeOf(proxy, {})
    return proxy;
}

/*export let model = function (model, instance, args) {
    //   const l = new Language();
    console.log({ ...args })
    const m = new model(instance, { ...args });
    const proxy = new Proxy({}, {
        setPrototypeOf: function (target, prototype) {
            target = { ...prototype }
            console.log(target);
            return target;
        },
        get: function (target, propKey, receiver) {
            console.log(target);
            if (!(propKey in target.model)) {
                throw new ReferenceError('Unknown property: ' + propKey);
            }
            //            target.model[propKey];
            return Reflect.get(target, propKey, receiver);
            //return obj[prop];
        },
        set: function (target, prop, value) {
            console.log(target.instance);
            //       console.log(store.modelo);
            state.push({ ...value });
            console.log(target.instance)

            target.model = value;
            return true;
        }

    });

    Reflect.setPrototypeOf(proxy, m.data);
    console.log(state)
    return proxy;
};
*/