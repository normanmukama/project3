<?php

// app/Http/Controllers/ContactController.php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:contacts,email',
            'contact' => 'required|string|max:15',
        ]);

        $contact = Contact::create($validatedData);

        return response()->json(['message' => 'Contact saved successfully', 'contact' => $contact], 201);
    }

    // public function index()
    // {
    //     Fetch data using the singleton registered in DataServiceProvider
    //     $contacts = app('app.data')['contacts'];
    //     return response()->json($contacts);
    // }

    public function index()
    {
        $contacts = Contact::all(); // Fetch all contacts from the database
        return response()->json($contacts); // Return data as JSON
    }

    public function Test()
    {
        return view('test');
    }
}

