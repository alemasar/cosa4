/*import Ajax from './common/ajax';
import { addModule } from './modules/moto-state/module';
import { language } from './models/language.model';
import { header } from './models/header.model';*/
import { event } from './modules/events/events';
import { Methods } from './modules/prova';

export const module = new Proxy(Methods, {
    get: function (target, name, receiver) {
        const t = new target();
        return t[name];
    }
});

document.addEventListener('DOMContentLoaded', function (e) {
    console.log('DOMContentLoaded')
    //    let p = new base(prova);
    //let module = new Proxy(p, prova);
    //module.foo=provaFunc;
    //foo.call(module, 1, 2);
    console.log(module.yoqueser(1, 2))
    console.log(module.bar(2, 1))
    //    window.document.dispatchEvent(DOMContentLoaded_event)
    //console.log(prova(1,2));
});

document.addEventListener('cuando-yo-digo', function (e) {
    console.log("cuando yo digo main")
    const test = event();
//    console.log(test.hola)
//    console.log(test.hola);
//    console.log(test.type)
    /*let DOMContentLoaded_event = document.createEvent("Event")
    DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
    window.document.dispatchEvent(DOMContentLoaded_event)*/
    //console.log(DOMContentLoaded_event);
});
