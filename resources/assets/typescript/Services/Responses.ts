
export interface APIResponse {
    status: String
}

export class OkResponse implements APIResponse{
    constructor(public status: String, public message?: String = '') {}
}

export class FailResponse implements APIResponse {
    constructor(public status: String, public error: String, public message?: String = '') { }
}