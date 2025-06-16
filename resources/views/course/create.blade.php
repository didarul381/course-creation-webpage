@extends('layouts.app')

@section('content')
@if ($errors->any())
    <div class="alert alert-danger">
        <ul class="mb-0">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
@if(session('success'))
<div class="alert alert-success">{{ session('success') }}</div>
@endif

<div class="container mt-5">
    <div class="card bg-dark text-white shadow-lg">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h4 class="mb-0">🎓 Create a Course</h4>
            <a href="{{ url('/courses') }}" class="btn btn-sm btn-outline-light">← Back to Course Page</a>
        </div>

        <div class="card-body">
            <form action="{{ url('/courses') }}" method="POST" id="courseForm">
                @csrf

                <div class="row mb-4">
                    <div class="col-md-6">
                        <label class="form-label">Course Title</label>
                        <input type="text" name="title" class="form-control bg-secondary text-white" placeholder="Enter course title">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Feature Video</label>
                        <input type="text" name="feature_video" class="form-control bg-secondary text-white" placeholder="e.g. YouTube or Vimeo link">
                    </div>
                </div>

                <div id="modules-wrapper"></div>

                <button type="button" id="addModule" class="btn btn-primary mb-3">
                    ➕ Add Module
                </button>

                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-success px-4">💾 Save</button>
                    <a href="{{ url('/courses') }}" class="btn btn-danger px-4">❌ Cancel</a>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Course form JS -->
<script src="{{ asset('assets/js/course.js') }}"></script>
@endsection
