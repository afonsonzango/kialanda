function loadPage(page) {
    addProgress();
    const contentDiv = document.getElementById('content');

    fetch(`${page}.html`)
        .then(response => response.text())
        .then(data => {
            contentDiv.innerHTML = data;
            removeProgress();
        })
        .catch(error => {
            console.error(`Error loading ${page}.html:`, error);
            contentDiv.innerHTML = `<p>Error loading ${page}.html: ${error.message}</p>`;
            removeProgress();
        });
}

function addProgress() {
    if (!document.querySelector('#progress')) {
        const progressDiv = document.createElement('div');
        progressDiv.id = 'progress';
        document.body.appendChild(progressDiv);

        setTimeout(() => {
            progressDiv.style.width = '70%';
        }, 100);
    }
}

function removeProgress() {
    setTimeout(() => {
        const progressDiv = document.querySelector('#progress');
        if (progressDiv) {
            progressDiv.style.transition = '.2s';
            progressDiv.style.width = '100%';

            setTimeout(() => {
                progressDiv.remove();
            }, 600);
        }
    }, 100);
}

document.addEventListener('DOMContentLoaded', function () {
    // Initial data load for the Home page
    loadPage('/pages/introducao');

    // Event listener for navigation links
    document.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const page = event.target.getAttribute('href').substring(1);
            loadPage(page);
        }
    });
});