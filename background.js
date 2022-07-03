// TODO Github, readme, package
// TODO: app icons, changes when on right page
// TODO: manage when you've exceeded for particular email address

// When user clicks on the extension icon
chrome.action.onClicked.addListener((tab) => {

    // Check we're on the right page
    if (tab.url.includes("halo.lucozade.com")) {

        // Inject app JS
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['app.min.js']
        });
    }
});