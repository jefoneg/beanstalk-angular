import { Component } from '@angular/core';
import { GetStartedConstant } from '../../../constants/get-started.constant';

@Component({
  selector: 'app-getstarted-component',
  imports: [],
  templateUrl: './getstarted-component.html',
  styleUrl: './getstarted-component.less',
})
export class GetstartedComponent {
  protected readonly GetStartedConstant = GetStartedConstant;
}
