import { Methods } from './modules/otra';
import Utils from './modules/moto-state/utils';

const module = new Proxy(Methods, {
    get: function (target, name, receiver) {
        const t = new target();
        return t[name];
    }
});

const event = function () {
    return new Proxy(new Event("DOMContentLoaded"), {
        get: function (target, name, receiver) {
            console.log(target[name])
            console.log(name)
            return t[name];
        }
    })
}

document.addEventListener('DOMContentLoaded', function (e) {
    //    let p = new base(prova);
    //let module = new Proxy(p, prova);
    //module.foo=provaFunc;
    //foo.call(module, 1, 2);
    console.log(module.yoqueser(1, 2))
    console.log(module.bar(2, 1))

    //console.log(prova(1,2));
});
