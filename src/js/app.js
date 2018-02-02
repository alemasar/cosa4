import Utils from './modules/moto-state/utils';
import { Event, event } from './modules/moto-events/events';
import EventHandlers from './modules/moto-events/events-handlers';
import { addModule } from './modules/moto-state/module';

const h = new EventHandlers();


export default class AppModule {
    constructor() {
        //        console.log(header)
    }
}


document.addEventListener('app-created', function (e){
    const launch = event("launch",{"event":{ "type": 'cuando-yo-digo', "handler": h.launch }});
    const goout = event("goout",{"event":{ "type": 'cuando-tu-digas',  "handler": h.goout }});
    console.log(launch.launch)
})

document.addEventListener('DOMContentLoaded', function (e) {
    console.log('------------------------ App -------------------------')
    addModule('app', new AppModule());
});

