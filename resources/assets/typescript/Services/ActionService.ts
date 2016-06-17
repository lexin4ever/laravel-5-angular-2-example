import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import * as responses   from './Responses';

@Injectable()
export class ActionService {
    private actionUrl = "/api/action/";

    constructor (private http: Http) {}

    public doAction(id: number): Observable<responses.APIResponse> {
        return this.http.get(this.actionUrl + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * The better way is to use  response like described here
     * https://www.owasp.org/index.php/OWASP_AJAX_Security_Guidelines#Always_return_JSON_with_an_Object_on_the_outside
     * So, we parse it manually
     */
    private extractData(res: Response) {
        let body = res.json();
        if (!body.status || body.status !== 'ok') {
            return new responses.FailResponse(body.status, "Bad server response");
        } else {
            return new responses.OkResponse(body.status);
        }
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}