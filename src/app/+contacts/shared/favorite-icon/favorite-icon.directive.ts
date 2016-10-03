import { Directive, ElementRef, Input, HostListener, OnInit, Renderer } from '@angular/core';

import { starClasses } from '../';

@Directive({
  selector: '[appFavoriteIcon]'
})
export class FavoriteIconDirective implements OnInit {
  private element: HTMLElement;
  private renderer: Renderer;

  @Input('appFavoriteIcon') isFavorite: boolean;

  constructor(element: ElementRef, renderer: Renderer) {
    this.element = element.nativeElement;
    this.renderer = renderer;
  }

  public ngOnInit(): void {
    if (this.isFavorite) {
      this.setStarColor('gold');
    } else {
      this.setStarColor('white');
    }
  }

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    if (!this.isFavorite) {
      this.setStarColor('outline');
    }
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    if (!this.isFavorite) {
      this.setStarColor('white');
    }
  }

  @HostListener('click')
  public onClick(): void {
    this.isFavorite = !this.isFavorite;

    if (this.isFavorite) {
      this.setStarColor('gold');
    } else {
      this.setStarColor('outline');
    }
  }

  private setStarColor(color: string): void {
    let classes = '';

    switch (color) {
      case 'gold':
        classes = starClasses.GOLD_STAR;
        break;
      case 'white':
        classes = starClasses.WHITE_STAR;
        break;
      case 'outline':
        classes = starClasses.OUTLINE_STAR;
        break;
      default:
        classes = starClasses.OUTLINE_STAR;
    }

    this.renderer.setElementAttribute(this.element, 'class', classes);
  }
}
