import Twig from 'twig';
import Ajax from './ajax.js';
import OnLoads from './onloads';
import config from '../config/config';

let viewsDir = 'src/tpls/wsbk/';
let jsPath = "./vendor/js/";
let jsFiles = [];
let jsFilesNum = 0;
let properties = ["id", "template", "data", "data_name"];


function loadFile(files) {
    var script = document.createElement('script');
    script.onload = function () {
        //do stuff with the script
        let DOMContentLoaded_event = document.createEvent("Event")
        DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
        window.document.dispatchEvent(DOMContentLoaded_event)
    };
    script.src = file;
    document.head.appendChild(script);
}

function loadScript(locations) {
    // Check for existing script element and delete it if it exists
    locations.forEach((location, index)=>{
        let js = document.getElementById("sandboxScript");
        if (js !== null) {
            document.body.removeChild(js);
            console.info("---------- Script refreshed ----------");
        }
        console.log(location)
        // Create new script element and load a script into it
        js = document.createElement("script");
        js.src = location;
        js.id = "sandboxScript";
        console.log(index+'   '+locations.length);
        if (index === 0){
            js.onload = function () {
                //do stuff with the script
                console.info("---------- Script loaded ----------");
                let DOMContentLoaded_event = document.createEvent("Event")
                DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
                window.document.dispatchEvent(DOMContentLoaded_event)
            };
        }
        document.body.appendChild(js);
    })

}

Twig.extend(function (Twig) {
    Twig.exports.extendFunction("array", (source, params) => {
        const a = [];
        a[source] = params;
        return a;
    });

    Twig.exports.extendFunction("t", (source, params) => {
        console.log(params)
        let result='';
        if (params){
            const keys = Object.keys(params);
            keys.forEach((param)=>{
                result = source.replace(param, params[param], 'gi');
            })
        }
        return result;
    });

    Twig.exports.extendFunction("add_js", (jsFile) => {
        if (jsFiles.indexOf(jsFile) === -1) {
            let scripts_div = document.createElement("DIV");
            scripts_div.setAttribute('data-scripts-src', jsFile);
            scripts_div.id = 'sandboxScript';
            document.body.appendChild(scripts_div);
            jsFiles.push(jsFile);
        }
    });
})

export default class Page {
    constructor() {
        this.routeData = [];
        const menuDiv = document.getElementById("workspace_container");
//        this.shadowRoot = menuDiv.attachShadow({ mode: 'open' }).appendChild(menuDiv.cloneNode(true));
        this.loadRoutes()
    }

    loadTemplate(tplObj) {
        console.log(tplObj)
        Ajax.getUrl("http://localhost:3005/" + tplObj.data, {}).subscribe((data) => {
            const loadTpl = function (template) {
                let objData = {};
                objData[tplObj.data_name] = data;

                const newlink = document.createElement("LINK");
                newlink.setAttribute("rel", "stylesheet");
                newlink.setAttribute("type", "text/css");
                newlink.setAttribute("href", tplObj.css);
                const t = document.createElement("TEMPLATE");
                document.head.appendChild(newlink);
                const childs = Array.from(new DOMParser().parseFromString(template.render(objData), "text/html").body.childNodes);
                childs.forEach((child) => {
                    document.getElementById("page").appendChild(child);
                });
                loadScript(jsFiles);
            }
            let template = Twig.twig({
                id: tplObj.id,
                namespaces: {
                    'views_dir': './src/tpls'
                },
                href: tplObj.template,
                async: false,
                load: loadTpl.bind(this)
            });
        });
    }

    loadRoutes() {
        Ajax.getUrl("http://localhost:3004/routes", {})
            .subscribe((route) => {
                let routes = [];
                let defaultRoute = {};
                const url = new URL(window.location.href);
                const page = url.searchParams.get("page");
                route.forEach((rs) => {
                    rs.children.forEach((r, index) => {
                        let obj = {}
                        obj.label = r.label;
                        obj.template = r.path + '/' + r.template;
                        obj.id = r.id;
                        obj.data = r.data;
                        obj.css = r.css;
                        obj.data_name = r.data_name;
                        if (page !== '' && page === obj.id) {
                            obj.default = r.default;
                            defaultRoute = obj;
                        } else if (page === '' || page === null) {
                            if (r.default) {
                                obj.default = r.default;
                                defaultRoute = obj;
                            } else if (index === 0) {
                                obj.default = r.default;
                                defaultRoute = obj;
                            }
                        }
                        routes.push(obj);
                    });
                })

                if (defaultRoute) {
                    this.loadTemplate(defaultRoute);
                }

                Twig.cache();

                const load = function (template) {
                    const parsedTemplate = new DOMParser().parseFromString(template.render({ "routes": routes }), "text/html").body.firstChild;
                    const linkRef = function () {
                        const links = Array.from(document.getElementById("menu").querySelectorAll("ul li a"));
                        links.forEach((link) => {
                            const clickRef = function (e) {
                                let tplObj = {}
                                Array.from(e.target.attributes).forEach((attr) => {
                                    if (attr.name.indexOf("data-route") != -1) {
                                        tplObj[attr.name.replace("data-route-", "")] = e.target.getAttribute(attr.name);
                                    }
                                });
                                // this.loadTemplate(tplObj);
                                document.location.href = window.location.origin + '?page=' + tplObj.id;
                            }
                            link.addEventListener("click", clickRef.bind(this))
                        });
                    }
                    document.getElementById("menu").appendChild(parsedTemplate);
                    linkRef();
                    const links = Array.from(document.getElementById("menu").querySelectorAll("ul li a"));
                    properties.forEach((prop) => {
                        links.forEach((link, index) => {
                            link.setAttribute("data-route-" + prop, routes[index][prop]);
                        });
                    });
                }

                let template = Twig.twig({
                    id: 'menu',
                    namespaces: {
                        'views_dir': './dev/src/tpls'
                    },
                    href: './dev/src/tpls/route_menu.html',
                    async: false,
                    load: load.bind(this)
                });
            })
    }

}

const handler = function () {
    window.base_url = './';
    window.lang = 'es';
    new Page();
    document.removeEventListener('DOMContentLoaded', handler);
}

document.addEventListener('DOMContentLoaded', handler);