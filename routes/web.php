<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('/{vue_capture?}', function () {
    return view('welcome');
})->where('vue_capture', '[\/\w\.-]*');

// Route::get('/contacts', function () {
//     $contacts = app('app.data')['contacts'];
//     return response()->json($contacts);
// });