import { Component, Inject, Injectable, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Timer } from '../UI/Timer';
import { Action } from '../UI/Action/Action';

@Component({
    'directives': [Timer, Action],
    'selector': 'state-template',
    'templateUrl': '/templates/FirstComponent.main'
})
export class FirstComponent {

    public score: Number = 0;

    applyScore(score) {
        this.score += score;
    }
}