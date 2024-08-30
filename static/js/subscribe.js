function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

document.getElementById("email").addEventListener("input", function(event) {
    var responseMessage = document.getElementById("responseMessage");
    responseMessage.textContent = '';
});

document.getElementById("subscribeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    const email = document.getElementById("email").value;
    const responseMessage = document.getElementById("responseMessage");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/subscribe", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    if (!validateEmail(email)) {
        responseMessage.textContent = "Email not valid";
        responseMessage.style.color = "red";
        return; 
    }

    const submitButton = document.getElementById('submitButton');
    const buttonText = document.getElementById('buttonText');
    buttonText.innerHTML = '<div class="loader"></div>';

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 202) {
                buttonText.innerHTML = `
    <span class="status-icon success">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    </span>`;
                responseMessage.textContent = "Subscription successful!";
                responseMessage.classList.add("success");
                submitButton.disabled = true;
                
            } else if (xhr.status === 400) {
                buttonText.innerHTML = `
    <span class="status-icon error">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    </span>`;
                responseMessage.textContent = "Already signed up!";
                responseMessage.classList.add("error");
                submitButton.disabled = true;
                
            } else {
                const jsonResponse = JSON.parse(xhr.responseText);
                buttonText.innerHTML = `
    <span class="status-icon error">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    </span>`;
                responseMessage.textContent = "Error during sign up, please try again later.";
                responseMessage.classList.add("error");
                submitButton.disabled = true;
            }
        }
    };

    var data = "email=" + encodeURIComponent(email);
    xhr.send(data);
});