import RequestCore from './module/core';
import TaroRequest from './request/taro';
class Api extends RequestCore {
    constructor(apiConfig, params = {}, ajaxHeaders = {}, debug = false) {
        super(apiConfig, params, ajaxHeaders, TaroRequest, debug);
    }
}
export default Api;
