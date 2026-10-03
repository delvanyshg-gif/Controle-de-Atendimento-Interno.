const form = document.getElementById("register-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const message = document.getElementById("register-message");


form.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;


    if (!name || !email || !password || !confirmPassword) {

        message.textContent = "Preencha todos os campos.";
        message.style.color = "red";

        return;
    }


    if (password.length < 6) {

        message.textContent =
            "A senha precisa ter pelo menos 6 caracteres.";

        message.style.color = "red";

        return;
    }


    if (password !== confirmPassword) {

        message.textContent =
            "As senhas não são iguais.";

        message.style.color = "red";

        return;
    }


    const result = DB.createUser({
        name,
        email,
        password
    });


    if (!result.success) {

        message.textContent = result.message;
        message.style.color = "red";

        return;
    }


    message.textContent =
        "Conta criada! Redirecionando para o login...";

    message.style.color = "green";


    setTimeout(() => {

        window.location.href = "login.html";

    }, 1000);

});