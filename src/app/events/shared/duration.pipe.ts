import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  //  duration pipe is used when display duration in details page, we pick from dropdown so are getting 1,2,3...returns to details, but want to show the corresponding text not the number
  // takes in the input value and returns a value
  transform(value: number) : string {
    switch(value) {
      case 1: return 'Half Hour'
      case 2: return 'One Hour'
      case 3: return 'Half Day'
      case 4: return 'Full Hour'
      default: return value.toString()
    }
  }

}
