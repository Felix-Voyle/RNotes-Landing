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

    
    var email = document.getElementById("email").value;
    var responseMessage = document.getElementById("responseMessage");
    var xhr = new XMLHttpRequest();
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
                responseMessage.textContent = "Subscription successful!";
                responseMessage.style.color = "green";
            } else {
                var jsonResponse = JSON.parse(xhr.responseText);
                responseMessage.textContent = jsonResponse.message;
                responseMessage.style.color = "red";
            }
        }
    };

    var data = "email=" + encodeURIComponent(email);
    xhr.send(data);
});