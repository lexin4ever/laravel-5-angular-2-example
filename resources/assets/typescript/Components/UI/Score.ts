import {Directive, ElementRef, Input, OnChanges, SimpleChange} from '@angular/core';

@Directive({
    'selector': 'score'
})
export class Score implements OnChanges {

    @Input() score: number;
    private initial: number = 0;
    public currentValue: number = this.initial;

    constructor(private el: ElementRef){ }

    ngAfterViewInit() {
        this.initial = +this.el.nativeElement.innerText;
        this.softUpdate();
    }

    ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
        console.log('Change detected:', changes['score'].currentValue);
        this.softUpdate()
    }

    private softUpdate(updateTime: number = 300){
        var now:number = new Date().getTime();
        window.requestAnimationFrame(() => {
            let deltaT = new Date().getTime() - now;
            let totalVal = this.initial + this.score;
            this.currentValue += (totalVal - this.currentValue) * (deltaT / updateTime);
            if (this.currentValue >= totalVal) {
                this.currentValue = totalVal;
                this.el.nativeElement.innerText = this.currentValue;
            } else {
                this.el.nativeElement.innerText = ~~this.currentValue;
                this.softUpdate(updateTime - deltaT);
            }
        })
    }

}