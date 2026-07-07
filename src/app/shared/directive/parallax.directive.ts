import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, OnInit, OnDestroy, Input, inject, PLATFORM_ID } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  @Input() parallaxSpeed = 0.4; // 0 = sin movimiento, 1 = se mueve igual que el scroll

  private ticking = false;

  ngOnInit(): void {
     if (!this.isBrowser) return;
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.updatePosition(); // posición inicial
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  private onScroll = (): void => {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.updatePosition();
        this.ticking = false;
      });
      this.ticking = true;
    }
  };

  private updatePosition(): void {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    const scrolled = window.scrollY;
    const elementTop = scrolled + rect.top;
    const offset = (scrolled - elementTop) * this.parallaxSpeed;

    element.style.backgroundPositionY = `${offset}px`;
  }
}
