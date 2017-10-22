import { ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export function getStarElement(fixture: ComponentFixture<ComponentRef<any>>, defaultElementIndex: number): DebugElement {
  const el: DebugElement = fixture.nativeElement as DebugElement;
  return el.children[defaultElementIndex];
}

export function doClassesMatch(resultClasses: DOMTokenList, expectedClasses: string[]): boolean {
  let classesMatch = true;
  let currentClass: string = null;

  for (let i = 0; i < expectedClasses.length; i++) {
    currentClass = expectedClasses[i];
    classesMatch = resultClasses.contains(currentClass);

    if (!classesMatch) {
      break;
    }
  }

  return classesMatch;
}

export function getElement(fixture: ComponentFixture<ComponentRef<any>>): DebugElement {
  const el: DebugElement = fixture.nativeElement as DebugElement;
  return el;
}
