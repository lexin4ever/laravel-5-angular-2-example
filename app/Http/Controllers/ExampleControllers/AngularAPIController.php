<?php

namespace App\Http\Controllers\ExampleControllers;

use App\Http\Controllers\Controller;
use BannersCreator\Services\PSDParser;
use Illuminate\Http\Request;
use File;
use Session;

class AngularAPIController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function index($id)
    {
        return json_encode([
            'status' => $id === "146" ? 'error' : 'ok'
        ]);
    }
}
