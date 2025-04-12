var extension_functions = []
const pageLoaded = new Promise((resolve) => {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        resolve();
    } else {
        document.addEventListener("DOMContentLoaded", resolve, { once: true });
    }
});

pageLoaded.then(async () => {
    console.log('page load');
    extension_functions.forEach(func => func());
    document.getElementById('content').classList.remove('hidden')
});
