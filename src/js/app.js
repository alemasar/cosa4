import Utils from './modules/moto-state/utils';
import EventObj from './modules/events/events';
import EventHandlers from './modules/events/events-handlers';
/*const app = function (module) {
    console.log("entro")
    return new Proxy(module, {
        get: function (target, name, receiver) {
            console.log(target);
            console.log(name)
            //const t = new target();
            return target[name];
        }
    });
}
*/
/*document.addEventListener('DOMContentLoaded', function (e) {
    console.log("hola desde app")
    //    let p = new base(prova);
    //let module = new Proxy(p, prova);
    //module.foo=provaFunc;
    //foo.call(module, 1, 2);
    //const test = new Autorenewal();
    console.log(document.body)
    //console.log(prova(1,2));
    //console.log(Autorenewal)
});*/
/*triggerEvent(which, detail){
    let event;
    if (document.createEvent) {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(which, true, true, detail);
    } else {
        event = new CustomEvent(which, { detail: detail });
    }
    document.dispatchEvent(event);
}*/
class Dummy{}

export const eventHandlers = new Proxy(EventHandlers, {
    get: function (target, name, receiver) {
        //const t = new target();
        console.log(target)
        console.log(name)
        //return new target();
    }
});


export const eventEmit = new Proxy(EventObj, {
    get: function (target, name, receiver) {
        //const t = new target();
        console.log(target)
        console.log(name)
        return new target();
    }
});

const emit = function (event, args){
    
}


document.addEventListener('cuando-yo-digo', function (e) {
    console.log("cuando yo digo app")
    const test = new Proxy(new eventEmit(), {
        get: function (target, name, receiver) {
            //const t = new target();
            console.log(target)
            console.log(name)

            return target[name];
        }
    });
    const handler = function (e){
        console.log(this);
    }
    console.log(test.load(handler.bind(this)))
   // window.document.dispatchEvent(test.event)
//    let DOMContentLoaded_event = document.createEvent("Event")
    //DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
    //console.log(DOMContentLoaded_event);

})
Utils.triggerEvent('cuando-yo-digo', {});

/*const addEvent = function (){
    return new Proxy(document.addEventListener, {
        get: function (target, name, receiver) {
            console.log(target);
            console.log(receiver);
            return target(name, {});
        }
    })
}*/

/*const ae = addEvent();
console.log(ae.DOMContentLoaded(function (e) {
    console.log("hola desde app")
    //    let p = new base(prova);
    //let module = new Proxy(p, prova);
    //module.foo=provaFunc;
    //foo.call(module, 1, 2);
    //const test = new Autorenewal();
    console.log(document.body)
    //console.log(prova(1,2));
    //console.log(Autorenewal)
}))
console.log(ae)*/
