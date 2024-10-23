import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  logging(msg: any) {
    console.log(new Date() + ':' + msg);
    
  }
}
