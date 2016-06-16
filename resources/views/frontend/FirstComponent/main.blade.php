<div class="scores">
    <div class="star"></div>
    <div class="count" [innerHTML]="score + {{$current_points}}">{{$current_points}}</div>
</div>
<div class="actions">
    @foreach ($actions as $action)
        <action class="action"
             title="{{ $action['title'] }}"
             (score)="applyScore($event)"
             [restTime]="{{$action['rest_time']}}"
             [recoveryTime]="{{$action['recovery_time']}}"
             [points]="{{$action['points']}}"
        ><div>
            <div class="action-image action-{{ $action['id'] }}"></div>
            <timer class="action-timer">{{ date('i:s', $action['rest_time']) }}</timer>@{{timer}}
        </div>
        </action>
    @endforeach
</div>