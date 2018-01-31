import Utils from './utils';
import Rx from "rxjs/Rx";

class Component {
    constructor(obj, id) {
        this.listComponentsStream = new Rx.Subject();
        this.listEventsStream = new Rx.Subject();
        this.setListStream = new Rx.Subject();
        this.removeListStream = new Rx.Subject();
        this.components = new Map();
        this.events = new Map();

        this.setListStream.subscribe((object)=>{
            const id = object.id;
            const obj = object.obj;
            this.components.set(id, new obj());

            this.listEventsStream.subscribe(list=>{
                if (list.size===0){
                    document.addEventListener('dispatch-event-list', this.dispatchEvents.bind(this));
                }
            });
            this.getEventsSubjectList();
            this.events.set(id + '-created', { obj: obj, id: id, dispatched: false });
            console.log(this.events);
            console.log(this.components);
        });

        this.removeListStream.subscribe((object)=>{
            const id = object.id;
            this.components.delete(id);
            Utils.triggerEvent(id + '-deleted', { id: id });
        });
    }
    dispatchEvents() {
        for (let v of this.events.keys()) {
            const value = this.events.get(v);
            if (value.dispatched === false) {
                Utils.triggerEvent(value.id + '-created', { obj: value.obj, id: value.id });
                this.events.set(v, { obj: value.obj, id: value.id, dispatched: true });
            }
        }
        Utils.triggerEvent('components-ready', {});
    }
    
    getComponentsSubjectList(){
        this.listComponentsStream.next(this.components);
    }

    getComponentsList(){
        return new Rx.BehaviorSubject(this.components);
    }

    getEventsSubjectList(){
        this.listEventsStream.next(this.events);
    }
    getEventsList(){
        return new Rx.BehaviorSubject(this.events);
    }

}

const onload = function (e) {
    Utils.triggerEvent('dispatch-event-list', {});
}

window.addEventListener('DOMContentLoaded', onload, true);

window.addEventListener('components-ready', function (e) {
    window.removeEventListener('DOMContentLoaded', onload, true);
});
export default Component;