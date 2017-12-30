/* tslint:disable:variable-name */
import { Injectable } from '@angular/core';
import {
  Headers,
  Http,
  Response,
  ResponseContentType,
  RequestOptions,
  RequestMethod,
  Request,
} from '@angular/http';

import { Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { APP_CONFIG} from '../app-config';
import {DialogService} from './dialog-service';


/**
 * Dashboard API service
 */
@Injectable()
export class ApiService {

  private service_api_url: string;
  private api_url: string;

  public constructor(
    private http: Http,
    private router: Router,
    private dialog: DialogService,
  ) {
  }



   public apiUrl(method: string, service: boolean = false): string {

 //   const auth     = this.loginService.currentuser;
  //  this.api_url = `${APP_CONFIG.apiBaseUrl}${APP_CONFIG.apiVersion}${method}`;
     this.api_url = `${method}`;
    return this.api_url;
  } // end apiUrl()

  /**
   * @deprecated
   */
  public call(
    method: string,
    path: string,
    params: any = null,
    skipHandlingErrors = false,
  ): Promise<any> {
    const res = this[ method.toLowerCase() ](path, params)
      .then((response: Response) => {
        if (method.toLowerCase() !== 'delete' && response.text()) {
          return response.json();
        } else {
          return true;
        }
      });

    return skipHandlingErrors ? res : res.catch((error) => this.handleError(error));
  }

  /**
   * @todo 401 status doesn't processed if skipHandlingErrors === true
   */
  public call2(
    method: string,
    path: string,
    params: any = null,
    skipHandlingErrors = true,
  ): Promise<any> {
    const res = this[ method.toLowerCase() ](path, params)
      .then((response: Response) => response.text() ? response.json() : true);

    return skipHandlingErrors ? res : res.catch((error) => this.handleError(error));
  }

  public serviceCall(
    method: string,
    path: string,
    params: any = null,
    service: boolean = false,
  ): Promise<any> {
    return this[ method.toLowerCase() ](path, params, service) // true
      .then((response: Response) => {
        if (method.toLowerCase() !== 'delete' && response.text()) {
          return response.json();
        } else {
          return true;
        }
      })
      .catch((error) => this.handleError(error));
  } // end serviceCall()

  /**
   * Get data from Dashboard
   */
  public dashboardGet(path: string) {
    return this.http.get(path).toPromise();
  }

  /**
   * Post data to Dashboard
   */
  public dashboardPost(path: string, params: any) {
    return this.http.post(path, JSON.stringify(params)).toPromise();
  }

  private handleError(error: any) {
    let jsonError: object;
    try {
      jsonError = error.json();
    } catch (e) {

        console.warn('Can not parse response json');

    }

    if (error.status === 401) {
      // this.loginService.logOut();
      console.log ('session timeout');
    }

    return Promise.reject(jsonError);
  }



  /**
   * Get data from API
   */
  private get(
    path: string,
    params: [ { key: string, value: string } ] = null,
    service: boolean = false,
  ) {
    let api_url    = this.apiUrl(path, service);
    let url_params = '';
    const headers    = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    if (params && params.length) {
      params.forEach((item: { key: string, value: string }) => {
        url_params += `&${item.key}=${item.value}`;
      });
    }

    api_url += url_params;

    return this.http.get(api_url, { headers })
      .toPromise();

  } // end get()

  /**
   * Add data to API
   */
  private post(path: string, params: any = null, service: boolean = false) {
    const headers = new Headers();
    let request: any;
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    if (params instanceof FormData) {
      headers.delete('Content-Type');

      const requestOptions = new RequestOptions({
        method:  RequestMethod.Post,
        url:     this.apiUrl(path, service),
        headers,
        body:    params,
      });

      request = this.http.request(new Request(requestOptions)).toPromise();
    } else {
      request = this.http.post(
        this.apiUrl(path, service),
        JSON.stringify(params),
        { headers },
      )
        .toPromise();
    }

    return request;
  } // end post()

  /**
   * Update data on API
   */
  private put(path: string, params: any = null, service: boolean = false) {
    const headers = new Headers();
    let request: any;
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    if (params instanceof FormData) {

      params = params;
      headers.delete('Content-Type');

      const requestOptions = new RequestOptions({
        method:  RequestMethod.Put,
        url:     this.apiUrl(path, service),
        headers,
        body:    params,
      });

      request = this.http.request(new Request(requestOptions)).toPromise();
    } else {
      request = this.http.put(
        this.apiUrl(path, service),
        JSON.stringify(params),
        { headers },
      )
        .toPromise();
    }

    return request;
  } // end put()

  /**
   * Delete data from API
   */
  private delete(path: string, params: any = null, service: boolean = false) {
    let api_url    = this.apiUrl(path, service);
    let url_params = '';
    const headers    = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    if (params && params.length) {
      params.forEach((item: { key: string, value: string }) => {
        url_params += `&${item.key}=${item.value}`;
      });
    }

    api_url += url_params;

    return this.http.delete(api_url, { headers })
      .toPromise();
  } // end delete()
}
