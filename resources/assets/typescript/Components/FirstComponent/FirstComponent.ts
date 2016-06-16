import { Component, Inject, Injectable,
    animate,
    trigger,
    state,
    transition,
    keyframes,
    style } from '@angular/core';
import { Router } from '@angular/router';
import { Timer } from '../UI/Timer';
import { Score } from '../UI/Score';
import { Action } from '../UI/Action/Action';

@Component({
    'directives': [Timer, Action, Score],
    'selector': 'state-template',
    'templateUrl': '/templates/FirstComponent.main',

    animations: [
        trigger("starAnimation", [
            state("0", style({"display": "none", "opacity": 0})),
            transition("* => *", [
                animate(300, keyframes([
                    style({ "opacity": 0,
                            "-webkit-transform-origin": "50% 100%", "-webkit-transform": "scale(.2) translate(200%, 200%)",
                                    "transform-origin": "50% 100%",         "transform": "scale(.2) translate(200%, 200%)"}),
                    style({ "opacity": 1,
                            "-webkit-transform-origin": "50% 100%", "-webkit-transform": "scale(1) translate(0%, 0%)",
                                    "transform-origin": "50% 100%",         "transform": "scale(1) translate(0%, 0%)"}),
                    style({ "opacity": 0,
                            "-webkit-transform-origin": "50% 100%", "-webkit-transform": "scale(.2) translate(200%, 200%)",
                                    "transform-origin": "50% 100%",         "transform": "scale(.2) translate(200%, 200%)"}),
                    style({ "opacity": 1,
                            "-webkit-transform-origin": "50% 100%", "-webkit-transform": "scale(1) translate(0%, 0%)",
                                    "transform-origin": "50% 100%",         "transform": "scale(1) translate(0%, 0%)"}),
                    style({ "opacity": 0,
                            "-webkit-transform-origin": "50% 100%", "-webkit-transform": "scale(.2) translate(200%, 200%)",
                                    "transform-origin": "50% 100%",         "transform": "scale(.2) translate(200%, 200%)"}),
                    style({ "opacity": 1,
                            "-webkit-transform-origin": "50% 100%", "-webkit-transform": "scale(1) translate(0%, 0%)",
                                    "transform-origin": "50% 100%",         "transform": "scale(1) translate(0%, 0%)"}),
                ]))
            ])
        ])
    ]
})
export class FirstComponent {

    public score: Number = 0;

    applyScore(score) {
        this.score += score;
    }
}