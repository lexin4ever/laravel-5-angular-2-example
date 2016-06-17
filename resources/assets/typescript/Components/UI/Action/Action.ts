import { Component, ElementRef, HostListener, ContentChild, Output, Input, Inject, EventEmitter} from '@angular/core';
import { Timer } from '../Timer';
import { ScoreService } from '../../../Services/ScoreService';
import * as responses from '../../../Services/Responses';

@Component({
    selector: 'action',
    template: "<ng-content></ng-content>",
    providers: [ScoreService]
})
export class Action {

    @Input() restTime: number;
    @Input() recoveryTime: number;
    @Input() points: number;
    @Input() id: number;
    @Output() score = new EventEmitter();
    @ContentChild(Timer) timer:Timer;

    private scoreService: ScoreService;

    private disabled: boolean = false;

    constructor(private el: ElementRef,
                @Inject(ScoreService) scoreService: ScoreService) {
        this.scoreService = scoreService;
    }

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
            this.disabled = true;
            let onSaveCb = () => {
                this.timer.start(duration, () => { this.enable() });
                this.addClass(this.el.nativeElement, 'disabled');
            };
            let onError = (e) => {
                alert('Error occurred');
                console.error(e);
                this.disabled = false;
            };
            if (!force) {
                this.saveAndAddScore().then(
                    ()  => onSaveCb(),
                    (e) => onError(e)
                )
            } else {
                onSaveCb()
            }
        }
    }

    private saveAndAddScore(): Promise<any> {
        var self = this;
        return new Promise((resolve, reject) => {
            self.scoreService
                .add(self.id)
                .subscribe(
                    (answer: responses.APIResponse) => {
                        if (answer instanceof responses.OkResponse) {
                            self.score.next(self.points);
                            resolve(answer)
                        } else if (answer instanceof responses.FailResponse) {
                            reject(answer)
                        } else {
                            reject(answer)
                        }
                    },
                    error  => { reject(error) });
        });
    }

    private enable(): void {
        this.disabled = false;
        this.removeClass(this.el.nativeElement, 'disabled');
    }

    /**
     * I don't use `[ngClass]` because there it doesn't work with transcluded element
     * Actually the code is simple and I hope angular makes the same.
     */
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