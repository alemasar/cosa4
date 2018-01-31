import Utils from '../moto-state/utils';

let modules = new Map();


const dispatchEvents = function (){
    let allModules = new Map();
    const func = function (e) {
        allModules = this;
    }
    Utils.triggerEvent('get-modules', { action: func });

console.log(allModules)
    let allCreated = true;
    for (let v of allModules.keys()) {
        const value = allModules.get(v);
        console.log(v);
        if (!value.created){
            allCreated = false;
            console.log(allCreated)
            Utils.triggerEvent(v + '-created', { obj: value.module, id: v });
            allModules.set(v, {'module': module, 'created': true});
            Utils.triggerEvent('set-modules', { modules: allModules });
        }
        /*if (value.dispatched === false) {
            Utils.triggerEvent(value.id + '-created', { obj: value.obj, id: value.id });
            this.events.set(v, { obj: value.obj, id: value.id, dispatched: true });
        }*/
    }
    console.log(allCreated)
    if (allCreated){
        Utils.triggerEvent('modules-ready', {});
    }
}

export const addModule = function (id, module) {
    let allModules = new Map();
    const func = function (e) {

        //if (this.size===0){
            console.log(dispatchEvents)
        //} 
        allModules = this;
        allModules.set(id, {'module': module, 'created': false});
        console.log(this.size)
        //if (this.size===0){
            Utils.triggerEvent('dispatch-event-list', {});
        //}
    }
    Utils.triggerEvent('get-modules', { action: func });
    Utils.triggerEvent('set-modules', { modules: allModules });
    console.log(allModules)
}

const getObjHandler = function (e) {
    //    console.log(store)
    e.detail.action.call(this);
}
const setObjHandler = function (e) {
    //    console.log(store)

    modules = e.detail.modules;
}

//document.addEventListener('set-modules', getObjHandler.bind(modules));
document.addEventListener('get-modules', getObjHandler.bind(modules));
document.addEventListener('set-modules', setObjHandler.bind(modules));
document.addEventListener('dispatch-event-list', dispatchEvents);
/*const onload = function (e) {
    console.log('ENtro')
    Utils.triggerEvent('dispatch-event-list', {});
}

window.addEventListener('DOMContentLoaded', onload, true);

window.addEventListener('modules-ready', function (e) {
    window.removeEventListener('DOMContentLoaded', onload, true);
});*/
