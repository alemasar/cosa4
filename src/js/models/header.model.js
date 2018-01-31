import { model } from '../modules/moto-state/model';
console.log('------------------ Header Model ---------------------');
console.log(model)
/*import StoreLoader from '../modules/moto-state/store-loader';
import { modelGettersSetters } from '../modules/moto-state/model';
import { Model } from '../modules/moto-state/model';
import Utils from '../modules/moto-state/utils';
// export let header = {};
export let header = Model.setData('header', ['Internet Explorer', 'Netscape']);

header = Model.getModel(header);
console.log(header)

document.addEventListener('dispatch-store-created', (event) => {
    console.log('Init actions');
    //header = new Header();
    console.log(header)
    StoreLoader.setModel(header);
    Utils.triggerEvent('dispatch-model-created', {});
});*/
/*export default class Header {
    constructor(args) {
        console.log(args)
        const keys = Object.keys(args);
        keys.forEach((key)=>{
            this[key]=args[key];
        });
        console.log(this);
    }
}*/

export let header = function (instance, args){
    const m = model(instance, values);
 //console.log(l);
     return m;
 }
