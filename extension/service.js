chrome.runtime.onInstalled.addListener(() => {
    chrome.cookies.get({
        name : "user",
        url : "http://localhost:5173"
    },
    function(cookie){
        if(!cookie){
            chrome.tabs.create({url : "login.html"});
        }
    }
)
})

chrome.runtime.onStartup.addListener(() => {
    chrome.cookies.get({
        name : "user",
        url : "http://localhost:5173"
    },
    function(cookie){
        if(!cookie){
            chrome.tabs.create({url : "login.html"})
        }
    } 
)
})