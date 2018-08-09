import { ComponentRef } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export function getElement(fixture: ComponentFixture<ComponentRef<any>>): HTMLElement {
  const el: HTMLElement = fixture.nativeElement as HTMLElement;
  return el;
}
