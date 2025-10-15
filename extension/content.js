
document.querySelectorAll("form").forEach(form => {
    const inputs = Array.from(form.querySelectorAll("input[type=text], input:not([type])"));

    if (inputs.length >= 2) {
        // Try to identify email/username field
        const emailInput = inputs.find(input => {
            const attrs = (input.name + " " + input.id + " " + input.placeholder).toLowerCase();
            return attrs.includes("email") || attrs.includes("user") || attrs.includes("login");
        }) || inputs[0]; // fallback to first text input

        // Try to identify password field
        const passwordInput = inputs.find(input => {
            const attrs = (input.name + " " + input.id + " " + input.placeholder).toLowerCase();
            return attrs.includes("pass") || attrs.includes("pwd") || attrs.includes("key") || attrs.includes("password");
        }) || inputs[1]; // fallback to second text input

        if (emailInput && passwordInput && emailInput !== passwordInput) {
            form.addEventListener("submit", function(e) {
                const email = emailInput.value;
                const password = passwordInput.value;

                if (email && password) {
                    

                    if (confirm(`Do you want to save credentials for ${window.location.hostname}?`)) {
                        fetch("https://lockr-1ftl.onrender.com//api/save", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                site: window.location.hostname,
                                email,
                                password
                            })
                        });
                    }
                }
            });
        }
    }
});