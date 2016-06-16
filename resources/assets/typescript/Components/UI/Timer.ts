import { Component, ElementRef, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
    'selector': 'timer',
    'template': "{{timer|date:'m:ss'}}" // fixme 2.0.0-rc.2 has a bug with pattern 'ss' (2.0.0-rc.1 - ok)
})
export class Timer {

    public timer: Date = new Date(0);

    public start(seconds: number, cb: () => void): void {
        this.timer = new Date( seconds * 1000);

        // use this timer, or `this.startTimer();`
        let timer = Observable.timer(0,1000)
            .take(seconds + 1);
        timer.subscribe(t => {
            this.timer = new Date((seconds-t)*1000);
        }, (err) => {
            console.warn('Error: ' + err);
        }, () => {
            this.timer = new Date(0);
            cb()
        });
    }

    /** @depricated */
    private startTimer(cb: () => void): boolean {
        var self = this;
        // use requestAnimationFrame if required accurate timer
        if (self.timer.getTime() > 0) {
            setTimeout(() => {
                self.timer = new Date(self.timer.getTime() - 1000);
                if (!self.startTimer(cb)) {
                    self.timer = new Date(0);
                    cb()
                }
            }, 1000);
            return true;
        } else {
            return false;
        }
    }

}