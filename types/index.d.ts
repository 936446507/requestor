import RequestCore from './module/core';
import { ApiConfig, ApiParams, ApiRequestHeaders } from './types';
declare class Api extends RequestCore {
    constructor(apiConfig: ApiConfig, params?: ApiParams, ajaxHeaders?: ApiRequestHeaders, debug?: boolean, withCredentials?: boolean);
}
export default Api;
