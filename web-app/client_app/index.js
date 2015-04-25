import {Component, View, bootstrap} from 'angular2/angular2';
import {Angular2} from 'angular2';

@Component({
  selector: 'main'
})

@View({
  directives: [Angular2],
  template: `
    <angular2></angular2>
  `
})

class Main {

}

bootstrap(Main);
