<?php

namespace App\Http\Controllers\ExampleControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AngularTemplatesController extends Controller
{
    private $actions = array(
        0 => array(
            'id' => 145,
            'title' => 'Test 1',
            'rest_time' => 0,
            'recovery_time' => 63,
            'points' => 10,
        ),
        1 => array(
            'id' => 146,
            'title' => 'Test 2',
            'rest_time' => 15,
            'recovery_time' => 660,
            'points' => 20,
        ),
        2 => array(
            'id' => 147,
            'title' => 'Test 3',
            'rest_time' => 0,
            'recovery_time' => 480,
            'points' => 30,
        ),
    );

    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Default action for all Angular 2 templates
     *
     * @param $template
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index($template)
    {
        $templatePath = 'frontend.' . $template;

        if (!view()->exists($templatePath)) {
            throw new NotFoundHttpException();
        }

        return view($templatePath, [
            'actions' => $this->actions,
            'current_points' => 123
        ]);
    }
}
