import { Component, ElementRef, HostListener, ContentChild, Output, Input, EventEmitter} from '@angular/core';
import { Timer } from '../Timer';

@Component({
    selector: 'action',
    template: "<ng-content></ng-content>"
})
export class Action {

    @Input() restTime: number;
    @Input() recoveryTime: number;
    @Input() points: number;
    @Output() score = new EventEmitter();
    @ContentChild(Timer) timer:Timer;

    private disabled: boolean = false;

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        this.disabled = this.restTime !== 0;
        if (this.disabled) {
            let self = this;
            setTimeout(()=>{    // bugfix https://github.com/angular/angular/issues/6005
                self.disable(self.restTime, true);
            })
        }
    }

    @HostListener('click') disable(duration: number = this.recoveryTime, force: boolean = false): void {
        if (!this.disabled || force) {
            if (!force) {
                this.score.next(this.points);
            }
            this.disabled = true;
            this.timer.start(duration, () => { this.enable() });
            this.addClass(this.el.nativeElement, 'disabled');
        }
    }

    private enable(): void {
        this.disabled = false;
        this.removeClass(this.el.nativeElement, 'disabled');
    }

    private addClass(o: HTMLElement, c: String): void {
        var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
        if (!re.test(o.className)) {
            o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
        }
    }

    private removeClass(o: HTMLElement, c: String): void {
        var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
        o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "")
    }


}