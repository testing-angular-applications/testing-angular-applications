import { Directive, ElementRef, Input, HostListener, OnInit, Renderer } from '@angular/core';

import { constants } from './favorite-icon.constants';

/**
 * FavoriteIconDirective
 * =====================
 * The FavoriteIconDirective takes in a boolean and applies a star depending
 * on whether the boolean is true or false. If the boolean is false, when
 * the element is rolled over a outlined star appears, otherwise a star
 * with the primary color will show up. The default primary color is gold.
 * You can set the primary star color by specifying the second optional
 * color parameter.
 *
 * Usage:
 * <element [appFavoriteIcon]="boolean expression"></element>
 *
 * Example:
 * <i [appFavoriteIcon]="contact.favorite"></i>
 *
 *
 * Color (optional)
 * ---------------------------------
 * The second parameter is the color of the star. Currently, the only
 * valid colors are gold, black, and white.
 *
 * Usage:
 * <element [appFavoriteIcon]="boolean expression" [color]="'color'"></element>
 *
 * Example:
 * <i [appFavoriteIcon]="contact.favorite" [color]="'gold':></i>
 */

@Directive({
  selector: '[appFavoriteIcon]'
})
export class FavoriteIconDirective implements OnInit {
  private element: HTMLElement;
  private renderer: Renderer;
  private _primaryColor: string = 'gold';
  private _favoriteIconClasses: any = constants.classes;

  @Input('appFavoriteIcon') isFavorite: boolean;

  @Input() set color(primaryColorName: string) {
    if (primaryColorName) {
      this._primaryColor = primaryColorName.toLowerCase();
      this.setStarColor(this._primaryColor);
    }
  }

  constructor(element: ElementRef, renderer: Renderer) {
    this.element = element.nativeElement;
    this.renderer = renderer;
  }

  public ngOnInit(): void {
    if (this.isFavorite) {
      this.setStarColor(this._primaryColor);
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
      this.setStarColor(this._primaryColor);
    } else {
      this.setStarColor('outline');
    }
  }

  private setStarColor(color: string): void {
    let classes = '';

    switch (color) {
      case 'gold':
        classes = this._favoriteIconClasses.GOLD_STAR;
        break;
      case 'black':
        classes = this._favoriteIconClasses.BLACK_STAR;
        break;
      case 'white':
        classes = this._favoriteIconClasses.WHITE_STAR;
        break;
      case 'outline':
        classes = this._favoriteIconClasses.OUTLINE_STAR;
        break;
      default:
        console.warn(constants.warnings.UNRECOGNIZED_COLOR);
        classes = constants.classes.OUTLINE_STAR;
    }

    this.renderer.setElementAttribute(this.element, 'class', classes);
  }
}
