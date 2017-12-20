import { ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export function getElement(fixture: ComponentFixture<ComponentRef<any>>): DebugElement {
  const el: DebugElement = fixture.nativeElement as DebugElement;
  return el;
}
