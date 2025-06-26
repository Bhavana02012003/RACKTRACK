document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const uploadForm = document.getElementById('uploadForm');
    const uploadBtn = document.getElementById('uploadBtn');
    const progressContainer = document.getElementById('progressContainer');

    // Only run upload functionality if elements exist (i.e., on upload page)
    if (!fileInput || !uploadForm) {
        return;
    }

    // File input change handler
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];

        if (file) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'];
            if (!allowedTypes.includes(file.type)) {
                alert('Please select a valid image file (JPG, JPEG, PNG, or BMP)');
                fileInput.value = '';
                imagePreview.style.display = 'none';
                return;
            }

            // Validate file size (16MB limit)
            const maxSize = 16 * 1024 * 1024; // 16MB in bytes
            if (file.size > maxSize) {
                alert('File size must be less than 16MB');
                fileInput.value = '';
                imagePreview.style.display = 'none';
                return;
            }

            // Show image preview
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                imagePreview.style.display = 'block';

                // Smooth scroll to preview
                imagePreview.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
        }
    });

    // Form submission handler
    uploadForm.addEventListener('submit', function(e) {
        const file = fileInput.files[0];

        if (!file) {
            e.preventDefault();
            alert('Please select an image file first');
            return;
        }

        // Show progress indicator
        uploadBtn.disabled = true;
        uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
        progressContainer.style.display = 'block';

        // Smooth scroll to progress
        progressContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    });

    // Drag and drop functionality
    const dropZone = document.querySelector('.card-body');

    if (dropZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });

        function highlight(e) {
            dropZone.classList.add('border-primary');
        }

        function unhighlight(e) {
            dropZone.classList.remove('border-primary');
        }

        dropZone.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;

            if (files.length > 0) {
                fileInput.files = files;
                // Trigger change event
                const event = new Event('change', { bubbles: true });
                fileInput.dispatchEvent(event);
            }
        }
    }

    // File size formatter
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Add file info display
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const fileInfo = document.querySelector('.form-text');
            const originalText = fileInfo.textContent;
            fileInfo.innerHTML = `
                ${originalText}<br>
                <strong>Selected:</strong> ${file.name} (${formatFileSize(file.size)})
            `;
        }
    });
    // Update progress text
    const progressText = document.getElementById('progressText');
    const progressPercent = document.getElementById('progressPercent');
    if (progressText) progressText.textContent = `Uploading... ${percent}%`;
    if (progressPercent) progressPercent.textContent = `${percent}%`;
});

// Update filter status
function updateFilterStatus(category, count) {
    const filterStatus = document.getElementById('filterStatus');
    const clearFilterBtn = document.getElementById('clearFilter');

    if (filterStatus && clearFilterBtn) {
        filterStatus.textContent = `Showing ${category} (${count})`;
        filterStatus.style.display = 'inline-block';
        clearFilterBtn.style.display = 'inline-block';
    }
}

// Clear filter
function clearFilter() {
    currentFilter = null;
    const catalogItems = document.querySelectorAll('.catalog-item');
    const filterStatus = document.getElementById('filterStatus');
    const clearFilterBtn = document.getElementById('clearFilter');

    catalogItems.forEach(item => {
        item.style.display = 'block';
    });

    if (filterStatus && clearFilterBtn) {
        filterStatus.style.display = 'none';
        clearFilterBtn.style.display = 'none';
    }
}