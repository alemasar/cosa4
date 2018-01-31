import Component from './component';
import Utils from './utils';
import Rx from "rxjs/Rx";

export default class ComponentInit {
    constructor() {
        this.cm = new Component();
        this.CMObjStream = new Rx.Subject();
        this.generateObjStream = new Rx.Subject();
        this.removeObjStream = new Rx.Subject();

        this.generateObjStream.subscribe((object) => {
            const id = object.id;
            const obj = object.obj;
            console.log("entro en generate component");
            this.cm.setListStream.next(object);
            //Utils.triggerEvent('set-list', { id: id, obj: obj });
        });

        this.removeObjStream.subscribe((object) => {
            const id = object.id;
            this.cm.removeListStream.next({ id: id });
        });

        const getObjHandler = function (e) {
            e.detail.action.call(this);
        }
        window.addEventListener('get-component-init', getObjHandler.bind(this));
        window.addEventListener('get-generate-stream', getObjHandler.bind(this));
        window.addEventListener('get-remove-stream', getObjHandler.bind(this));
        Utils.triggerEvent('component-created', {});
    }
    static getCMObj() {
        let cm;

        const func = function () {
            cm = this.cm;
        }
        Utils.triggerEvent('get-component-init', { action: func });
        return new Rx.BehaviorSubject(cm);
    }
    static getEventsList() {
        let cm;
        ComponentInit.getCMObj().subscribe(component => {
            cm = component;
        });
        return new Rx.Observable((observer) => cm.getEventsList().subscribe(observer));
    }
    static getList() {
        let cm;
        ComponentInit.getCMObj().subscribe(component => {
            cm = component;
        });
        return new Rx.Observable((observer) => cm.getComponentsList().subscribe(observer));
    }
    static getGenerateObjStream() {
        let generate;

        const func = function () {
            console.log(this.generateObjStream)
            generate = this.generateObjStream;
        }
        Utils.triggerEvent('get-generate-stream', { action: func });
        console.log(generate)
        return new Rx.BehaviorSubject(generate);
    }
    static generate(id, obj) {
        //Utils.triggerEvent("generate-component", { id: id, obj: obj });
        let gn;
        ComponentInit.getGenerateObjStream().subscribe(generate => {
            gn = generate;
        });

        gn.next({ id: id, obj: obj });
    }
    static getRemoveObjStream() {
        let remove;

        const func = function () {
            console.log(this.removeObjStream)
            remove = this.removeObjStream;
        }
        Utils.triggerEvent('get-remove-stream', { action: func });
        console.log(remove)
        return new Rx.BehaviorSubject(remove);
    }

    static remove(id) {
        //Utils.triggerEvent("generate-component", { id: id, obj: obj });
        let rm;
        ComponentInit.getRemoveObjStream().subscribe(remove => {
            rm = remove;
        });
        //this.removeListStream.next(object);
        rm.next({ id: id });
    }
}

const onload = function (e) {
    console.log("entro en DOMCONTENTLOADED")
    new ComponentInit();
    Utils.triggerEvent('component-init-created', {});

}


window.addEventListener('DOMContentLoaded', onload, true);

window.addEventListener('component-init-created', function (e) {
    window.removeEventListener('DOMContentLoaded', onload, true);
});
