import { JQ_TOKEN } from './jQuery.service';
import { Directive, ElementRef, Inject, Input, OnInit } from "@angular/core";

@Directive({
  selector: '[modal-trigger]'
})

export class ModalTriggerDirective implements OnInit {

  private el: HTMLElement;  // getting reference to the element the modal-trigger attribue it on
  /*
    we have this <button class="btn btn-default" modal-trigger="searchResults">
    modal-trigger is our directive, since it's an attribute we did selector: '[modal-trigger]', with [] around it
    then we needed to pass in searchResults as the param to it.  We use @Input but we need to alias it
    as there is a - in the name which is not allowed, so below is how to alias it
  */
  @Input('modal-trigger') modalId: string;

  constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    this.el = ref.nativeElement;
  }

  ngOnInit(): void {
    // add an event listener to the element which has the directive on it
    this.el.addEventListener('click', e => {
      this.$(`#${this.modalId}`).modal({});
    });
  }
}


