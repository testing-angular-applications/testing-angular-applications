import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

import { styles } from '../';

@Directive({
  selector: '[appFavoriteIcon]'
})
export class FavoriteIconDirective implements OnInit {
  private element: HTMLElement;

  @Input('appFavoriteIcon') isFavorite: boolean;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  public ngOnInit() {
    if (this.isFavorite) {
      this.element.setAttribute('class', styles.GOLD_STAR);
    } else {
      this.element.setAttribute('class', styles.WHITE_STAR);
    }
  }

  @HostListener('mouseenter')
  public onMouseEnter() {
    if (!this.isFavorite) {
      this.element.setAttribute('class', styles.OUTLINE_STAR);
    }
  }

  @HostListener('mouseleave')
  public onMouseLeave() {
    if (!this.isFavorite) {
      this.element.setAttribute('class', styles.WHITE_STAR);
    }
  }

  @HostListener('click')
  public onClick() {
    this.isFavorite = !this.isFavorite;

    if (this.isFavorite) {
      this.element.setAttribute('class', styles.GOLD_STAR);
    } else {
      this.element.setAttribute('class', styles.OUTLINE_STAR);
    }
  }
}
