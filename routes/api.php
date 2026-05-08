<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "api" middleware group.
|
*/

Route::middleware(['api'])->group(function () {
    require __DIR__.'/api_v1.php';
});
