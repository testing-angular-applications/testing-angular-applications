import { ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export function getStarElement(fixture: ComponentFixture<ComponentRef<any>>, defaultElementIndex: number): DebugElement {
  const el: DebugElement = fixture.nativeElement as DebugElement;
  return el.children[defaultElementIndex];
}

export function doClassesMatch(resultClasses: DOMTokenList, expectedClasses: string[]): boolean {
  let doClassesMatch = true;
  let currentClass: string = null;

  for (let i = 0; i < expectedClasses.length; i++) {
    currentClass = expectedClasses[i];
    doClassesMatch = resultClasses.contains(currentClass);

    if (!doClassesMatch) {
      break;
    }
  }

  return doClassesMatch;
}

export function getElement(fixture: ComponentFixture<ComponentRef<any>>): DebugElement {
  const el: DebugElement = fixture.nativeElement as DebugElement;
  return el;
}
