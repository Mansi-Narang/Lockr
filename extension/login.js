const submit = document.getElementById("submit");
const email = document.getElementById("email").value;
const password = document.getElementById("masterPassword").value;
const error = document.getElementById('errorMsg');

submit.addEventListener("click", async (e)=>{
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/login', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body : JSON.stringify({
            email, password
        })
    });
    const data = await res.json();
    if(!res.ok) {
        error.classList.remove('hidden');
    }
    else{
        chrome.cookies.set({
            name: "user",
            url : "http://localhost:5173",
            value : JSON.stringify(data.user),
            httpOnly : true,
            expirationDate :  Date.now() + (7*24*60*60*1000)
        }, function(cookie){
            console.log(cookie);
        })
    }
})