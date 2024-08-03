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

    const submitButton = document.getElementById('submitButton');
    const buttonText = document.getElementById('buttonText');
    buttonText.innerHTML = '<div class="loader"></div>';
    
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

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 202) {
                buttonText.innerHTML = '<span class="status-icon">✔️</span>';
                submitButton.style.color = 'green';
                responseMessage.textContent = "Subscription successful!";
                responseMessage.style.color = "green";
            } else {
                const jsonResponse = JSON.parse(xhr.responseText);
                buttonText.innerHTML = '<span class="status-icon">❌</span>'; // Cross
                submitButton.style.color = 'red';
                responseMessage.textContent = jsonResponse.message;
                responseMessage.style.color = "red";
            }
        }
    };

    var data = "email=" + encodeURIComponent(email);
    xhr.send(data);
});