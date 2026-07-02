import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { Autoplay, Navigation, EffectFade, Pagination } from 'swiper/modules';
import { FtcoAnimateDirective } from '../../../shared/directive/ftco-animate.directive'
register();
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FtcoAnimateDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  @ViewChild('swiper') swiper!: ElementRef;
  @ViewChild('counterSection') counterSection!: ElementRef;

  teachers = 0;
  students = 0;
  books = 0;
  certificates = 0;

  private animationStarted = false;

  slides = [
    {
      image: 'images/bg_1.jpg',
      title: 'Kids Are The Best',
      subtitle: 'Explorers In The World',
    },
    {
      image: 'images/bg_2.jpg',
      title: 'Perfect Learned',
      subtitle: 'For Your Child',
    },
    {
      image: 'images/bg_3.jpg',
      title: 'Perfect Learned',
      subtitle: 'For Your Child',
    },
    {
      image: 'images/bg_3.jpg',
      title: 'Perfect Learned',
      subtitle: 'For Your Child',
    },
    {
      image: 'images/bg_3.jpg',
      title: 'Perfect Learned',
      subtitle: 'For Your Child',
    },
  ];
  ngAfterViewInit(): void {
    Object.assign(this.swiper.nativeElement, {
      modules: [Autoplay, Navigation, Pagination, EffectFade], // ← Navigation, no Navigator
      slidesPerView: 1,
      slidesPerGroup: 1,
      loop: true,
      navigation: true,
      pagination: { clickable: true },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: 'fade',
    });
    this.swiper.nativeElement.initialize();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animationStarted) {
            this.animationStarted = true;
            this.animateCounter(18, (value) => (this.teachers = value));
            this.animateCounter(351, (value) => (this.students = value));
            this.animateCounter(564, (value) => (this.books = value));
            this.animateCounter(300, (value) => (this.certificates = value));
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(this.counterSection.nativeElement);
  }

  private animateCounter(
    target: number,
    callback: (value: number) => void,
    duration = 1000, // duración en ms; subí este valor si querés que el conteo sea más lento
  ): void {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      callback(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}
