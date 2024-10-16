class UploadAdapter {
    constructor(pt_idx, loader) {
        this.pt_idx = pt_idx
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then( (file) => new Promise(((resolve, reject) => {
            this._initRequest();
            this._initListeners( resolve, reject, file );
            this._sendRequest( this.pt_idx, file );
        })))
    }

    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/user/summernote/ck', true);
        xhr.setRequestHeader('X-CSRFToken', $('#csrf_token').val()); 
        xhr.responseType = 'json';
    }

    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Unable to upload file.'

        xhr.addEventListener('error', () => {reject(genericErrorText)})
        xhr.addEventListener('abort', () => reject())
        xhr.addEventListener('load', () => {
            const response = xhr.response
            if(!response || response.error) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            resolve({
                default: response.url
            })
        })
    }

    _sendRequest(pt_idx, file) {
        const data = new FormData()
        data.append('pt_idx',pt_idx)
        data.append('file',file)
        this.xhr.send(data)
    }
}