import Utils from '../moto-state/utils';


const setState = function () {
    let state;
   const funcGet = function (e){
       state = this;
   }
   Utils.triggerEvent('get-state', { action: funcGet });

   const func = function () {
       store = state;
       console.log(store);
   }
   Utils.triggerEvent('get-state', { action: func });
}

export let store = Utils.getProxy(setState);

const getObjHandler = function (e) {
    //    console.log(store)
    e.detail.action.call(this);
}
document.addEventListener('get-state', getObjHandler.bind(store));

window.addEventListener('DOMContentLoaded', (event) => {
    let state;

    const func = function () {
        //        console.log(this)
        state = this;
        //        console.log(state);
    }
    Utils.triggerEvent('get-state', { action: func });
    //    console.log(state)
});
