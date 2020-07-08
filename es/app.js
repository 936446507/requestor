import BzAxios from '../dist/bz-axios.esm.js';
import axios from 'axios';
import { Request, } from './types';
const config = {
    api1: {
        url: 'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
        type: ['POST', 'PUT', 'DELETE'],
    },
    api2: {
        key: {
            url: 'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
        },
        key2: {
            key3: {
                url: 'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
            },
        },
    },
};
class Requestor extends Request {
    constructor(params = {}, ajaxHeaders = {}, debug = false) {
        super();
        this.params = params;
        this.ajaxHeaders = ajaxHeaders;
    }
    _requestProxy(url, type = 'get', config = {}, requestorConfig = {}) {
        const res = axios({
            url,
            method: type,
        });
        return res;
    }
}
console.log(Requestor);
const api = new BzAxios(config, {}, {});
api['_defaultError'] = (data) => {
    console.log(data);
};
console.log('api', api, api['api1']);
