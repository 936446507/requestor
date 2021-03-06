import BzAxios from './index';

import axios from 'axios';
import {
  ApiType,
  ApiConfig,
  ApiMethodConfig,
  ApiRequestorConfig,
  ApiParams,
  ApiRequestHeaders,
  Request,
} from './types';

const config: ApiConfig = {
  api1: {
    url:
      'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
    type: ['POST', 'PUT', 'DELETE'],
  },
  api2: {
    key: {
      url:
        'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
    },
    key2: {
      key3: {
        url:
          'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
      },
    },
  },
};
class Requestor extends Request {
  protected params: ApiParams;
  protected ajaxHeaders: ApiRequestHeaders;
  constructor(
    params: ApiParams = {},
    ajaxHeaders: ApiRequestHeaders = {},
    debug = false
  ) {
    super();
    this.params = params;
    this.ajaxHeaders = ajaxHeaders;
  }
  _requestProxy(
    url: string,
    type: ApiType = 'get',
    config: ApiMethodConfig = {},
    requestorConfig: ApiRequestorConfig = {}
  ) {
    const res = axios({
      url,
      method: type,
    });
    return res;
  }
}
console.log(Requestor);
const api = new BzAxios(config, {}, {});
api['_defaultError'] = (data: any) => {
  console.log(data);
};

const result = api['api1'].POST();

result
  .then((res: any) => {
    console.log(res);
  })
  .catch((err: any) => {
    console.log(err);
  });
