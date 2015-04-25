import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'angular2'
})

@View({
  templateUrl: 'angular2.html'
})

export class Angular2 {

  constructor() {
    console.info('Angular2 Component Mounted Successfully');
  }

}
