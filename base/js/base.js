const prova = function () {
    console.log('Estoy en func');
    return true;
}
class t { };

const dummy = {};

export const baseClass = function (methods) {
    const vObjecth = {
        get: function (dummyTarget, trapName) {
            return Reflect[trapName];
        }
    }
    const vObjectP = new Proxy(methods, vObjecth);
    return new Proxy(t, vObjectP);
}

export let vWrapper = function (func) {
    //new Proxy(, bh);
    //const baseWrapper = vObject(dummy);
    const vWrapperh = {
        get: function (dummyTarget, trapName, receiver) {
            //        persistFunc();
            if (dummyTarget.hasOwnProperty(trapName)) {
                // return dummyTarget[trapName]();
            } else {
                console.log(dummyTarget)
                //                dummyTarget[trapName] = func;
                return vObject(t[trapName])
            }
            //            console.log(receiver[trapName])
            // return func();
        }
    }
    //const wrapperP = new Proxy(dummy, wrapperh);
    return new Proxy(vObject(t), vWrapperh);
}

export let vObject = function (obj) {
    console.log(obj)
    const vObjecth = {
        get: function (dummyTarget, trapName) {
            //        persistFunc();
            console.log(this);
            console.log(dummyTarget)
            return Reflect[trapName];
        }
    }
    //let objP=new Proxy(obj, vObjecth);
    //const vObjectP = new Proxy(dummy, vObjecth);
    //console.log(objP);
    return new Proxy(t, obj);
}
