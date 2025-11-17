<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\AuthResource;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Cria token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' =>  new AuthResource($user),
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Gera token para o app
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => new AuthResource($user),
            'token' => $token,
            'isAuthenticated' => true,
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json([
            'message' => 'Logout successfully'
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'currentPassword' => 'string|min:6|nullable',
            'newPassword' => 'string|min:6|different:currentPassword|nullable',
        ]);

        if (!empty($validated['currentPassword']) && !empty($validated['newPassword']) && ! Hash::check($validated['currentPassword'], $user->password)) {
            return response()->json([
                'message' => 'Invalid current password'
            ], 401);
        }

        $user->update([
            'name' => $validated['name'],
            'password' => !empty($validated['newPassword']) ? Hash::make($validated['newPassword']) : $user->password,
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => new AuthResource($user),
            'token' => $token,
            'isAuthenticated' => true,
        ]);
    }
}
