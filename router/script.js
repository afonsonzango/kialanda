function loadCSS(filePath) {
    // Remove the existing style element
    var existingStyle = document.getElementById("page-styles");

    if (existingStyle) {
        existingStyle.parentNode.removeChild(existingStyle);
    }

    // Create a new style element
    var styleElement = document.createElement("style");
    styleElement.id = "page-styles";

    // Set the content of the style element to the contents of the CSS file
    fetch(filePath)
        .then(response => response.text())
        .then(cssContent => {
            styleElement.textContent = cssContent;

            // Append the style element to the head of the document
            document.head.appendChild(styleElement);
        })
        .catch(error => console.error("Error loading CSS file:", error));
}

function loadPage(page, css) {
    addProgress();
    const contentDiv = document.getElementById('content');

    fetch(`${page}.html`)
        .then(response => response.text())
        .then(data => {
            contentDiv.innerHTML = data;
            loadCSS(css);
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

window.addEventListener('load', function () {
    // Event listener for navigation links
    document.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const page = event.target.getAttribute('href').substring(1);
            const css = event.target.getAttribute('data-css');
            loadPage(page, css);
        }
    });
});
