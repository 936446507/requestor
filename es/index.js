import RequestCore from './module/core';
import AxiosRequest from './request/axios';
class Api extends RequestCore {
    constructor(apiConfig, params = {}, ajaxHeaders = {}, debug = false, withCredentials = true) {
        super(apiConfig, params, ajaxHeaders, AxiosRequest, debug, withCredentials);
    }
}
export default Api;
