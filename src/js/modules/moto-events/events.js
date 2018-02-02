import Utils from '../moto-state/utils';
//import { EventLaunch } from './modules/events/events';
//import EventHandlers from './modules/events/events-handlers';
import { model } from '../moto-state/model';
console.log('------------------ Events Model ---------------------');
export default class Event {
    constructor(instance, args) {
        //console.log(args)
        const keys = Object.keys(args);
        keys.forEach((key) => {
            this[key] = args[key];
        });
        //this.instance = instance;
    }
}

export let event = function (instance, values) {
    let state = {};

    const func = function (e) {
//        console.log(this)
//        console.log(this.target)
        this.target = this;
//        console.log(state);
    }
    Utils.triggerEvent('get-element', { action: func, target: state });
//    console.log(state)
    let m = {};
    if (!state[instance]) {
        m = model(instance, values);
        console.log(m)
    }else{
        m = state[instance];
    }
  //  console.log(m)
    return m;
}