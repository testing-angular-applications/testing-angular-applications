import { ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export function getStarElement(fixture: ComponentFixture<ComponentRef<any>>, defaultElementIndex: number): DebugElement {
  const el: DebugElement = fixture.nativeElement as DebugElement;
  return el.children[defaultElementIndex];
}
