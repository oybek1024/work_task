import axios from 'axios'
import qs from 'qs'


function ErrorHandler(error) {
    console.log('error', error.message)
}

export default {
    request(method, url, params, data) {
        const config = {
            baseURL: process.env.VUE_APP_BASE_URL,
            timeout: 3000,
            url: url,
            method: method,
            onUploadProgress: function (e) {},
        }

        if (data) config.data = data

        if (params) {
            config.params = params
            config.paramsSerializer = function(params) {
                return qs.stringify(params, { encodeValuesOnly: true })
            }
        }

        const result = axios(config)

        return new Promise((resolve, reject) => {
            result
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    ErrorHandler(error)
                    reject(error)
                })
        })
    },
    get(url, params) {
        return this.request('GET', url, params, undefined)
    },
    post(url, data, params) {
        return this.request('POST', url, params, data)
    },
    patch(url, data, params) {
        return this.request('PATCH', url, params, data)
    },
    put(url, data, params) {
        return this.request('PUT', url, params, data)
    },
    remove(url, params) {
        return this.request('DELETE', url, params, undefined)
    }
}