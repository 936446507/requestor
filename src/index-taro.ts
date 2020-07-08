import RequestCore from './module/core';
import TaroRequest from './request/taro';

import { ApiConfig, ApiParams, ApiRequestHeaders } from './types';

class Api extends RequestCore {
  constructor(
    apiConfig: ApiConfig,
    params: ApiParams = {},
    ajaxHeaders: ApiRequestHeaders = {},
    debug = false
  ) {
    super(apiConfig, params, ajaxHeaders, TaroRequest, debug);
  }
}

export default Api;
