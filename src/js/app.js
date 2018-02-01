import Utils from './modules/moto-state/utils';
import { Event, event } from './modules/moto-events/events';
import EventHandlers from './modules/moto-events/events-handlers';

const h = new EventHandlers();


const launch = event({"event":{ "type": 'cuando-yo-digo', "handler": h.launch }});
const goout = event({"event":{ "type": 'cuando-tu-digas',  "handler": h.goout }});

console.log(launch.event)


