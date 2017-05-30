import { Directive, ElementRef, Input, HostListener, OnInit, Renderer } from '@angular/core';

import { constants } from './favorite-icon.constants';

/**
 * FavoriteIconDirective
 * =====================
 * The FavoriteIconDirective takes in a boolean and applies a star depending
 * to the element depending on whether the boolean is true or false. If the
 * boolean is false, when the element is rolled over a outlined star appears,
 * otherwise a star with the primary color will show up. The default primary
 * color is gold. You can set the primary star color by specifying the second
 * optional color parameter.
 *
 * Usage:
 * <element [appFavoriteIcon]="expression"></element>
 *
 * Example:
 * <i [appFavoriteIcon]="contact.favorite"></i>
 *
 *
 * Color (optional)
 * ---------------------------------
 * The second parameter is the color of the star.
 *
 * Usage:
 * <element [appFavoriteIcon]="expression" [color]="'color'"></element>
 *
 * Example:
 * <i [appFavoriteIcon]="contact.favorite" [color]="'blue'></i>
 */

@Directive({
  selector: '[appFavoriteIcon]'
})
export class FavoriteIconDirective implements OnInit {
  private element: HTMLElement;
  private renderer: Renderer;
  private _primaryColor = 'gold';
  private _starClasses: any = constants.classes;

  @Input('appFavoriteIcon') isFavorite: boolean;

  @Input() set color(primaryColorName: string) {
    if (primaryColorName) {
      this._primaryColor = primaryColorName.toLowerCase();
      this.setSolidColoredStar();
    }
  }

  constructor(element: ElementRef, renderer: Renderer) {
    this.element = element.nativeElement;
    this.renderer = renderer;
  }

  public ngOnInit(): void {
    if (this.isFavorite) {
      this.setSolidColoredStar();
    } else {
      this.setWhiteSolidStar();
    }
  }

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    if (!this.isFavorite) {
      this.setBlackOulineStar();
    }
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    if (!this.isFavorite) {
      this.setWhiteSolidStar();
    }
  }

  @HostListener('click')
  public onClick(): void {
    this.isFavorite = !this.isFavorite;

    if (this.isFavorite) {
      this.setSolidColoredStar();
    } else {
      this.setBlackOulineStar();
    }
  }

  private setBlackOulineStar(): void {
    this.setStarColor('black');
    this.setStarClass('outline');
  }

  private setSolidColoredStar(): void {
    this.setStarColor(this._primaryColor);
    this.setStarClass('solid');
  }

  private setWhiteSolidStar(): void {
    this.setStarColor('white');
    this.setStarClass('solid');
  }

  private setStarClass(starType: string): void {
    const className: string = this.getStarClasses(starType);
    this.renderer.setElementAttribute(this.element, 'class', className);
  }

  private setStarColor(color: string): void {
    this.renderer.setElementStyle(this.element, 'color', color);
  }

  private getStarClasses(starType): string {
    let classNames = '';

    switch (starType) {
      case 'solid':
        classNames = this._starClasses.SOLID_STAR;
        break;
      case 'outline':
        classNames = this._starClasses.OUTLINE_STAR;
        break;
      default:
        classNames = this._starClasses.SOLID_STAR;
    }

    return classNames;
  }
}
