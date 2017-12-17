import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';




@Injectable()
export class DialogService {
  /* tslint:disable-next-line:max-line-length */
  public defaultErrorMessage = '\nPlease, try again later or contact the support service, if the error will repeat again.';

  public alerts: any[] = [];

  public constructor(public toastr: ToastsManager) {
  }
   /**
   * Ask user to confirm an action. `message` explains the action and choices.
   * Returns promise resolving to `true`=confirm or `false`=cancel
   * @deprecated
   */
  public confirm(message?: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      return resolve(window.confirm(message || 'Is it OK?'));
    });
  }

  /**
   * @todo: rename it to just `confirm` and remove current `confirm` method
   */
  public confirmAsStream(message?: string): Observable<boolean> {
    return Observable.fromPromise(this.confirm(message));
  }

  public alert(message?: string) {
    this.toastr.error(message || 'Error!');
  }

  public warning(message?: string) {
    this.toastr.warning(message || 'Warning!');
  }

  public success(message?: string) {
    this.toastr.success(message || 'Done!');
  }
}
