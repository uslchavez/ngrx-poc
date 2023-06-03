import { Directive, ElementRef, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Directive({})
export abstract class AuthDisplayBase implements OnInit {
  constructor(private el: ElementRef, private router: Router) {}

  ngOnInit(): void {
    this.handleVisibility();
    this.router.events.subscribe(() => {
      this.handleVisibility();
    });
  }

  abstract handleVisibility(): void;

  protected hide(): void {
    this.el.nativeElement.style.display = 'none';
  }

  protected show(): void {
    this.el.nativeElement.style.display = 'block';
  }
}
