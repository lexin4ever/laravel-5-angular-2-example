<div class="scores">
    <div class="star"></div>
    <div class="star" @starAnimation="score"></div>
    <score class="count" [score]="score">{{$current_points}}</score>
</div>
<div class="actions">
    @foreach ($actions as $action)
        <action class="action"
             title="{{ $action['title'] }}"
             (score)="applyScore($event)"
             [restTime]="{{$action['rest_time']}}"
             [recoveryTime]="{{$action['recovery_time']}}"
             [points]="{{$action['points']}}"
             [id]="{{$action['id']}}"
        ><div>
            <div class="action-image action-{{ $action['id'] }}"></div>
            <timer class="action-timer">{{ date('i:s', $action['rest_time']) }}</timer>@{{timer}}
        </div>
        </action>
    @endforeach
</div>