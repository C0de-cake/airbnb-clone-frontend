import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Message} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  INIT_STATE = "INIT";

  private send$ = new BehaviorSubject<Message>({summary: this.INIT_STATE});
  sendSub = this.send$.asObservable();

  public send(message: Message): void {
    this.send$.next(message);
  }
}
