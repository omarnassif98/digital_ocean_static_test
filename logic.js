function loadHTML(fileName) {
    return new Promise((resolve, reject) => {
        fetch(fileName)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${fileName}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const content = document.querySelector("#content");
                if (content) {
                    content.innerHTML = html;
                    resolve();
                } else {
                    reject(new Error("#content element not found"));
                }
            })
            .catch(reject);
    });
}

const pageLoaded = new Promise((resolve) => {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        resolve();
    } else {
        document.addEventListener("DOMContentLoaded", resolve, { once: true });
    }
});

pageLoaded.then(() => loadHTML('home.html'));