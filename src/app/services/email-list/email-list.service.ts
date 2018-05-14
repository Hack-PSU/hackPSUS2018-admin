import { Injectable } from '@angular/core';

@Injectable()
export class EmailListService {

  public emailList: any[];

  constructor() {
    this.emailList = [];
  }

}
