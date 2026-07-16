import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
  signal,
  HostListener,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { Autoplay, Navigation, EffectFade, Pagination } from 'swiper/modules';
import { FtcoAnimateDirective } from '../../../shared/directive/ftco-animate.directive';
import { ParallaxDirective } from '../../../shared/directive/parallax.directive';
import { HttpServices } from '../../../services/http-services';

register();
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FtcoAnimateDirective, ParallaxDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnInit {
  @ViewChild('swiper') swiper!: ElementRef;
  @ViewChild('counterSection') counterSection!: ElementRef;
  @HostListener('window:scroll')
  onScroll() {
    const swiper = this.swiper?.nativeElement?.swiper;

    if (!swiper) return;

    swiper.update();
    swiper.updateSlides();
    swiper.updateProgress();
  }
  teachers = signal(0);
  students = signal(0);
  books = signal(0);
  certificates = signal(0);
  constructor(private service: HttpServices) {}
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
            this.animateCounter(18, (value) => this.teachers.set(value));
            this.animateCounter(351, (value) => this.students.set(value));
            this.animateCounter(564, (value) => this.books.set(value));
            this.animateCounter(300, (value) => this.certificates.set(value));
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
  ngOnInit(): void {
    this.bienvenido();
    this.docente();
    this.slider();
    this.admin();
    this.ofrecemos();
    this.cursos();
  }
  bienvenido() {
    this.service.get(`bienvenido`).subscribe(res=>{
      console.log(res,'<=== resultado')
    });
  }
  docente() {
    this.service.get(`docente/docenteImagen`).subscribe(res=>{
      console.log(res,'<=== resultado')
    });
  }
  slider() {}
  admin() {}
  ofrecemos() {}
  cursos() {}

  private animateCounter(target: number, callback: (value: number) => void, duration = 2000): void {
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
