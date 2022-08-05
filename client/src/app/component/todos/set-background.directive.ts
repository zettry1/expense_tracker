import { Directive, DoCheck, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[setBackground]'
})
export class SetBackgroundDirective implements DoCheck {
  @Input() setBackground: any = 'white';
  constructor(private host: ElementRef, private renderer: Renderer2) { }
  // ngOnInit(): void {
  //   this.renderer.setStyle(this.host.nativeElement, 'background-color', this.setBackground);
  // }
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.renderer.setStyle(this.host.nativeElement, 'background-color', this.setBackground);
  // }

  ngDoCheck(): void {
    this.renderer.setStyle(this.host.nativeElement, 'background-color', this.setBackground);
  }

}
