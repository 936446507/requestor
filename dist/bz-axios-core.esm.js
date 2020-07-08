function checkType(data, type) {
    return Object.prototype.toString.call(data).indexOf(type) >= 0;
}
function isArray(data) {
    return checkType(data, 'Array');
}

function CheckUrlProperty(config) {
    return config.url !== undefined;
}
var RequestCore = function RequestCore(apiConfig, params, ajaxHeaders, requestor, debug, withCredentials) {
    if ( params === void 0 ) params = {};
    if ( ajaxHeaders === void 0 ) ajaxHeaders = {};
    if ( debug === void 0 ) debug = false;

    this.params = {};
    this.ajaxHeaders = {};
    this.debug = false;
    this.withCredentials = true;
    var _this = Object.create(RequestCore.prototype);
    this.params = params;
    this.ajaxHeaders = ajaxHeaders;
    this.debug = debug;
    this.withCredentials = withCredentials;
    this.handleRequestor(requestor, _this);
    return this.createMethods(apiConfig, _this);
};
RequestCore.prototype.createMethods = function createMethods (config, _this) {
        var this$1 = this;

    var scoop = function (config, parent) {
        for (var key in config) {
            var value = config[key];
            if (typeof value === 'string') {
                this$1.createRequest(_this, parent, key, value);
            }
            else {
                if (!CheckUrlProperty(value)) {
                    if (!parent[key])
                        { parent[key] = {}; }
                    scoop(value, parent[key]);
                }
                else {
                    this$1.createRequest(_this, parent, key, value.url, value.type);
                }
            }
        }
    };
    scoop(config, _this);
    return _this;
};
RequestCore.prototype.createRequest = function createRequest (_this, obj, key, url, type) {
        if ( type === void 0 ) type = 'get';

    var requestMethod = function (method) {
        return function (config, requestorConfig) {
            return _this['_requestProxy'](url, method, config, requestorConfig);
        };
    };
    var types = [];
    if (isArray(type)) {
        types.push.apply(types, type);
    }
    else {
        types.push(type);
    }
    var isHadGetMethod = types.some(function (method) { return /get/gi.test(method); });
    if (isHadGetMethod)
        { obj[key] = requestMethod('get'); }
    if (!isHadGetMethod && !obj[key])
        { obj[key] = {}; }
    types.forEach(function (method) {
        obj[key][method.toUpperCase()] = requestMethod(method);
    });
};
RequestCore.prototype.handleRequestor = function handleRequestor (requestor, _this) {
    var methodKeys = [
        '_requestProxy',
        '_res',
        '_defaultError',
        '_networkError' ];
    var ref = this;
        var params = ref.params;
        var ajaxHeaders = ref.ajaxHeaders;
        var debug = ref.debug;
        var withCredentials = ref.withCredentials;
    var request;
    switch (requestor.name) {
        case 'AxiosRequest':
            request = new requestor(params, ajaxHeaders, debug, withCredentials);
            break;
        case 'TaroRequest':
            request = new requestor(params, ajaxHeaders, debug);
            break;
        default:
            request = new requestor(params, ajaxHeaders, debug);
    }
    methodKeys.forEach(function (method) {
        Object.defineProperty(request, method, {
            get: function () { return requestor.prototype[method]; },
            enumerable: true,
        });
    });
    for (var key in request) {
        if (key !== 'constructor') {
            _this[key] = request[key];
        }
    }
    return _this;
};

export default RequestCore;
