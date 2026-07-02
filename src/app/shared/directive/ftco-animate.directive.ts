import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  inject,
} from '@angular/core';

/**
 * Reemplazo sin jQuery de la vieja librería de scroll-reveal del template.
 *
 * Cualquier elemento con la clase `ftco-animate` arranca oculto
 * (ver `.ftco-animate { opacity: 0; visibility: hidden; }` en styles.css).
 * Esta directiva observa el elemento y, apenas entra en pantalla,
 * le agrega la clase `ftco-animate-visible`, que revierte ese estado
 * con una transición suave.
 *
 * Uso: agregar `ftcoAnimate` como atributo en cualquier elemento
 * que ya tenga la clase `ftco-animate` en el HTML.
 */
@Directive({
  selector: '[ftcoAnimate]',
  standalone: true,
})
export class FtcoAnimateDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.el.nativeElement.classList.add('ftco-animate-visible');
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.15 },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
