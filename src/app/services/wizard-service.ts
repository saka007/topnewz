import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NewsWizardService {

    constructor(public http: HttpClient) { }

    //* Data Set for page 1
    getNewsWizardData = (): any => {
        // return {
        // "btnPrev": "Previous",
        // "btnNext": "Next",
        // "btnFinish": "Finish",
        // "items": this.getNewsCategory(),
        // }
        return this.getNewsCategory();

        
    }

    getNewsCategory () {
        return new Observable(observer => {               
            this.http.get('https://njbiz.com/wp-json/wp/v2/categories/').subscribe(item => {   
                //item['btnNext'] = 'Next';
               // console.log(item);
                //item =  Object.assign({item},'hi');  
                              
            observer.next(item)
            observer.complete()
        }, err => {
            observer.error(err)
            observer.complete()
            })
        })
        return this.http.get('https://njbiz.com/wp-json/wp/v2/categories/');
    }
}
