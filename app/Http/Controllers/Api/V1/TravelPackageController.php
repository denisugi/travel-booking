<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\TravelPackage;
use App\Http\Resources\TravelPackageResource;
use App\Http\Resources\TravelPackageCollection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TravelPackageController extends Controller
{
    /**
     * Display a listing of travel packages.
     */
    public function index(Request $request): JsonResponse
    {
        $query = TravelPackage::with(['galleries']);

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('destination', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->has('featured')) {
            $query->featured();
        }

        if ($request->has('destination')) {
            $query->where('destination', 'like', '%' . $request->destination . '%');
        }

        if ($request->has('min_price') && $request->has('max_price')) {
            $query->whereBetween('price', [$request->min_price, $request->max_price]);
        }

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        if ($request->has('sort_by') && $request->has('sort_order')) {
            $sortBy = $request->sort_by;
            $sortOrder = $request->sort_order === 'asc' ? 'asc' : 'desc';
            $query->orderBy($sortBy, $sortOrder);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $packages = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => new TravelPackageCollection($packages),
        ]);
    }

    /**
     * Store a newly created travel package.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:travel_packages',
            'description' => 'required|string',
            'short_description' => 'nullable|string|max:500',
            'destination' => 'required|string|max:255',
            'duration_days' => 'required|integer|min:1',
            'duration_nights' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'max_participants' => 'required|integer|min:1',
            'departure_date' => 'required|date',
            'return_date' => 'required|date|after:departure_date',
            'featured' => 'boolean',
            'is_active' => 'boolean',
            'includes' => 'nullable|array',
            'excludes' => 'nullable|array',
            'itinerary' => 'nullable|array',
            'highlights' => 'nullable|array',
            'terms_conditions' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $package = TravelPackage::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Travel package created successfully',
            'data' => new TravelPackageResource($package->load(['galleries'])),
        ], 201);
    }

    /**
     * Display the specified travel package.
     */
    public function show(int $id): JsonResponse
    {
        $package = TravelPackage::with(['galleries', 'bookings.user'])->find($id);

        if (!$package) {
            return response()->json([
                'success' => false,
                'message' => 'Travel package not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new TravelPackageResource($package),
        ]);
    }

    /**
     * Update the specified travel package.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $package = TravelPackage::find($id);

        if (!$package) {
            return response()->json([
                'success' => false,
                'message' => 'Travel package not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:travel_packages,slug,' . $id,
            'description' => 'sometimes|required|string',
            'short_description' => 'nullable|string|max:500',
            'destination' => 'sometimes|required|string|max:255',
            'duration_days' => 'sometimes|required|integer|min:1',
            'duration_nights' => 'sometimes|required|integer|min:0',
            'price' => 'sometimes|required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'max_participants' => 'sometimes|required|integer|min:1',
            'departure_date' => 'sometimes|required|date',
            'return_date' => 'sometimes|required|date|after:departure_date',
            'featured' => 'boolean',
            'is_active' => 'boolean',
            'includes' => 'nullable|array',
            'excludes' => 'nullable|array',
            'itinerary' => 'nullable|array',
            'highlights' => 'nullable|array',
            'terms_conditions' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $package->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Travel package updated successfully',
            'data' => new TravelPackageResource($package->load(['galleries'])),
        ]);
    }

    /**
     * Remove the specified travel package.
     */
    public function destroy(int $id): JsonResponse
    {
        $package = TravelPackage::find($id);

        if (!$package) {
            return response()->json([
                'success' => false,
                'message' => 'Travel package not found',
            ], 404);
        }

        $package->delete();

        return response()->json([
            'success' => true,
            'message' => 'Travel package deleted successfully',
        ]);
    }

    /**
     * Get featured travel packages.
     */
    public function featured(): JsonResponse
    {
        $packages = TravelPackage::featured()->with(['galleries'])->limit(10)->get();

        return response()->json([
            'success' => true,
            'data' => TravelPackageResource::collection($packages),
        ]);
    }
}
