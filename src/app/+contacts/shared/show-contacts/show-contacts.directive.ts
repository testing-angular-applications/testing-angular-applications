import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShowContacts]'
})
export class ShowContactsDirective {
  private templateRef: TemplateRef<any>;
  private viewContainer: ViewContainerRef;

  constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef) {
    this.templateRef = templateRef;
    this.viewContainer = viewContainer;
  }

  @Input() set appShowContacts(shouldShow: boolean) {
    if (shouldShow) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
