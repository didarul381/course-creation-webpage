<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    public function create()
    {
        return view('course.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'feature_video' => 'nullable|string|max:255',
            'modules' => 'required|array|min:1',
            'modules.*.title' => 'required|string|max:255',
            'modules.*.contents' => 'required|array|min:1',
            'modules.*.contents.*.title' => 'required|string|max:255',
            'modules.*.contents.*.video_type' => 'nullable|string|max:50',
            'modules.*.contents.*.video_url' => 'nullable|url|max:255',
            'modules.*.contents.*.video_length' => ['nullable', 'string'],
        ]);
        // dd($validated);

        DB::transaction(function () use ($validated) {
            $course = Course::create([
                'title' => $validated['title'],
                'feature_video' => $validated['feature_video'] ?? null,
            ]);

            foreach ($validated['modules'] as $moduleData) {  // <=== Use validated data here
                $module = $course->modules()->create([
                    'title' => $moduleData['title'],
                ]);

                foreach ($moduleData['contents'] as $contentData) {
                    $module->contents()->create([
                        'title' => $contentData['title'],
                        'video_type' => $contentData['video_type'] ?? null,
                        'video_url' => $contentData['video_url'] ?? null,
                        'video_length' => $contentData['video_length'] ?? null,
                    ]);
                }
            }
        });

        return redirect()->route('courses.create')->with('success', 'Course saved!');
    }
}
