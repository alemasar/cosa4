import p from './prova';
import m from './main';



const app = function () {
    console.log("entro")
    return new Proxy({}, {
        get: function (target, name, receiver) {
            const t = new target();
            return t[name];
        }
    });
}

document.addEventListener('DOMContentLoaded', function (e) {
    //    let p = new base(prova);
    //let module = new Proxy(p, prova);
    //module.foo=provaFunc;
    //foo.call(module, 1, 2);
    app();

    //console.log(prova(1,2));
});