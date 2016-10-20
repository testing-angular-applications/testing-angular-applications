import { ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export function getStarElement(fixture: ComponentFixture<ComponentRef<any>>, defaultElementIndex: number): DebugElement {
  const el = fixture.nativeElement as DebugElement;
  return el.children[defaultElementIndex];
}

export function doClassesMatch(resultClasses: DOMTokenList, expectedClasses: string[]): boolean {
  let doClassesMatch = true;
  let currentClass = null;

  for (let i = 0; i < expectedClasses.length; i++) {
    currentClass = expectedClasses[i];
    doClassesMatch = resultClasses.contains(currentClass);

    if (!doClassesMatch) {
      break;
    }
  }

  return doClassesMatch;
}