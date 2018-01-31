export default class Utils {
    static deepExtend(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            let obj = arguments[i];

            if (!obj){
                continue;
            }

            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object'){
                        out[key] = Utils.deepExtend(out[key], obj[key]);
                    }else{
                        out[key] = obj[key];
                    }
                }
            }
        }

        return out;
    }

    static triggerEvent(which, detail){
        let event;
        if (document.createEvent) {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(which, true, true, detail);
        } else {
            event = new CustomEvent(which, { detail: detail });
        }
        document.dispatchEvent(event);
    }

    static getElement(id){
        let modal;
        const func = function () {
            modal=this;
        }

        if (window.CustomEvent) {
            event = new CustomEvent('get-data-modal', { detail: { modal: this.config.id, callback: func } });
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent('get-data-modal', true, true, { modal: this.config.id, callback: func });
        }
        document.dispatchEvent(event);
        return modal;
    }
    static getProxy(persistFunc){
        let t = [];
        const mh = {
            get: function (dummyTarget, trapName) {
                console.log(dummyTarget);
                persistFunc();
                return Reflect[trapName];
            }
        }
        const dummy = {};
        const bh = new Proxy(dummy, mh);
        return new Proxy(t, bh);
    }
}
