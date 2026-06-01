document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('verify-form');
    const input = document.getElementById('cert-id');
    const verifyBtn = document.getElementById('verify-btn');
    const searchSection = document.getElementById('search-section');
    const resultSection = document.getElementById('result-section');
    const errorMessage = document.getElementById('error-message');
    const backBtn = document.getElementById('back-btn');

    // Result fields
    const resId = document.getElementById('res-id');
    const resName = document.getElementById('res-name');
    const resFather = document.getElementById('res-father');
    const resCourse = document.getElementById('res-course');
    const resCollege = document.getElementById('res-college');
    const resRole = document.getElementById('res-role');
    const resDuration = document.getElementById('res-duration');
    const resRoll = document.getElementById('res-roll');
    const resEnrollment = document.getElementById('res-enrollment');
    const resIssue = document.getElementById('res-issue');
    const resPhotoLink = document.getElementById('res-photo-link');
    const resPhotoImg = document.getElementById('res-photo-img');
    const resDownloadBtn = document.getElementById('res-download-btn');

    // Mock Database
    const mockDatabase = {
        'KCS-INT-2026-069': {
            name: 'Yaswant Sharma',
            fatherName: 'Ramkaran Sharma',
            course: 'BSC Maths part 3 semester 6th',
            college: 'Government College Jaipur',
            role: 'Wordpress Developer',
            duration: '12 March 2026 - 25 April 2026',
            rollNo: '135237',
            enrollmentNo: '23/181671',
            issueDate: '30 May 2026',
            photoUrl: 'https://drive.google.com/file/d/1fiU3NxJqII3l8XxlE3aeuQiDx_xDPfFR/view?usp=sharing',
            photoImgUrl: 'https://drive.google.com/thumbnail?id=1fiU3NxJqII3l8XxlE3aeuQiDx_xDPfFR&sz=w400',
            certUrl: 'https://drive.google.com/file/d/1Pl6HnHflO_ZW3CRhdtI9JPtOAARbSqRO/view?usp=sharing'
        }
    };

    input.addEventListener('input', () => {
        errorMessage.classList.add('hidden');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const certId = input.value.trim().toUpperCase();
        
        if (!certId) return;

        // Reset error
        errorMessage.classList.add('hidden');
        
        // Set loading state
        verifyBtn.classList.add('loading');
        input.disabled = true;

        // Simulate network request
        setTimeout(() => {
            verifyBtn.classList.remove('loading');
            input.disabled = false;

            if (mockDatabase[certId]) {
                // Success
                showResult(certId, mockDatabase[certId]);
            } else {
                // Error
                showError();
            }
        }, 1200); // 1.2s artificial delay for effect
    });

    backBtn.addEventListener('click', () => {
        // Reset form
        input.value = '';
        errorMessage.classList.add('hidden');
        
        // Transition back to search
        resultSection.classList.add('hidden');
        setTimeout(() => {
            resultSection.style.display = 'none';
            searchSection.style.display = 'block';
            
            // Force reflow
            void searchSection.offsetWidth;
            
            searchSection.classList.remove('hidden');
        }, 400); // Wait for transition
    });

    function showResult(id, data) {
        // Populate data
        resId.textContent = id;
        resName.textContent = data.name;
        resFather.textContent = data.fatherName;
        resCourse.textContent = data.course;
        resCollege.textContent = data.college;
        resRole.textContent = data.role;
        resDuration.textContent = data.duration;
        resRoll.textContent = data.rollNo;
        resEnrollment.textContent = data.enrollmentNo;
        resIssue.textContent = data.issueDate;

        const photoContainer = document.getElementById('photo-container');
        if (data.photoUrl && data.photoImgUrl) {
            resPhotoLink.href = data.photoUrl;
            resPhotoImg.src = data.photoImgUrl;
            resPhotoImg.alt = `${data.name} photo`;
            photoContainer.classList.remove('hidden');
        } else {
            resPhotoImg.removeAttribute('src');
            photoContainer.classList.add('hidden');
        }

        if (data.certUrl) {
            resDownloadBtn.href = data.certUrl;
            resDownloadBtn.style.display = 'flex';
        } else {
            resDownloadBtn.style.display = 'none';
        }

        // Transition to result
        searchSection.classList.add('hidden');
        
        setTimeout(() => {
            searchSection.style.display = 'none';
            resultSection.style.display = 'block';
            
            // Force reflow
            void resultSection.offsetWidth;
            
            resultSection.classList.remove('hidden');
        }, 400); // Wait for transition
    }

    let errorTimeout;

    function showError() {
        errorMessage.classList.remove('hidden');
        // Re-trigger animation
        errorMessage.style.animation = 'none';
        void errorMessage.offsetWidth; // trigger reflow
        errorMessage.style.animation = null;

        // Auto-hide error after 3 seconds
        if (errorTimeout) clearTimeout(errorTimeout);
        errorTimeout = setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 3000);
    }
});
