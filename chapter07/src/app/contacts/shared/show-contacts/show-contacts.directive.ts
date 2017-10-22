import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * ShowContactsDirective
 * =====================
 * The ShowContactsDirective takes in a boolean and will remove or add
 * an element to the DOM whether the boolean is true or false. The
 * implementation of the ShowContactsDirective is almost exactly what ngIf
 * does. This directive is only to demonstrate how a structural directive
 * works. It should not be used in production.
 *
 * Usage:
 * <element *appFavoriteIcon="boolean expression"></element>
 *
 * Example:
 * <div *appShowContacts="contacts.length"></div>
 */

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
