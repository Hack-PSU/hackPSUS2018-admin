import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { PreRegistrationModel } from './pre-registration-model';

@Pipe({
  name: 'searchFilterPipe'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
	transform(items: PreRegistrationModel[], args: any[]): any[] {
    	if(!items) return [];
    	//if(!searchText) return items;
		return items.filter(items => items.email.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
   }
}