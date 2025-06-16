// Add Module
$('#addModule').on('click', function () {
    // Append new module with temporary index - will rename inputs after
    let moduleHTML = `
        <div class="module border p-3 my-2 position-relative bg-dark text-white rounded">
            <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 removeModule" style="top:11px !important; right:-29px !important;" aria-label="Remove Module" title="Remove Module">
                <i class="fas fa-trash-alt"></i>
            </button>
            <input type="text" name="modules[0][title]" placeholder="Module Title" class="form-control mb-2 module-title" />
            <div class="contents-wrapper"></div>
            <button type="button" class="btn btn-sm btn-outline-light addContent">➕ Add Content</button>
        </div>
    `;
    $('#modules-wrapper').append(moduleHTML);
    updateModuleIndexes();
});

// Remove Module
$(document).on('click', '.removeModule', function () {
    if (confirm('Are you sure you want to remove this module?')) {
        $(this).closest('.module').remove();
        updateModuleIndexes();
    }
});

// Add Content
$(document).on('click', '.addContent', function () {
    let moduleEl = $(this).closest('.module');
    let moduleIndex = $('#modules-wrapper .module').index(moduleEl);
    let contentCount = moduleEl.find('.contents-wrapper .content').length;

    const moduleTitle = moduleEl.find('.module-title').val().trim();
    if (!moduleTitle) {
        alert('Please enter the module title before adding content.');
        return;
    }

    let contentHTML = `
        <div class="content border p-2 mb-2 bg-secondary text-white rounded position-relative">
            <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 removeContent" style="top:11px !important; right:-29px !important;" aria-label="Remove Content" title="Remove Content">
                <i class="fas fa-trash-alt"></i>
            </button>
            <input type="text" name="modules[${moduleIndex}][contents][${contentCount}][title]" placeholder="Content Title" class="form-control mb-1 content-title" />
            <select name="modules[${moduleIndex}][contents][${contentCount}][video_type]" class="form-control mb-1 content-type">
                <option value="">Choose Type</option>
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
            </select>
            <input type="text" name="modules[${moduleIndex}][contents][${contentCount}][video_url]" placeholder="Video URL" class="form-control mb-1 content-url" />
            <input type="text" name="modules[${moduleIndex}][contents][${contentCount}][video_length]" placeholder="HH:MM:SS" class="form-control mb-1 content-length" />
        </div>
    `;
    moduleEl.find('.contents-wrapper').append(contentHTML);
});

// Remove Content
$(document).on('click', '.removeContent', function () {
    if (confirm('Are you sure you want to remove this content?')) {
        $(this).closest('.content').remove();
    }
});

// Update module indexes and all input names after adding/removing modules
function updateModuleIndexes() {
    $('#modules-wrapper .module').each(function (index) {
        $(this).find('.module-title').attr('name', `modules[${index}][title]`);

        // Update content input names within this module
        $(this).find('.contents-wrapper .content').each(function (contentIndex) {
            $(this).find('.content-title').attr('name', `modules[${index}][contents][${contentIndex}][title]`);
            $(this).find('.content-type').attr('name', `modules[${index}][contents][${contentIndex}][video_type]`);
            $(this).find('.content-url').attr('name', `modules[${index}][contents][${contentIndex}][video_url]`);
            $(this).find('.content-length').attr('name', `modules[${index}][contents][${contentIndex}][video_length]`);
        });
    });
}
