const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const showPasswordButton = document.getElementById("show-password");
const message = document.getElementById("form-message");


// Mostrar / esconder senha
showPasswordButton.addEventListener("click", () => {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showPasswordButton.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        showPasswordButton.textContent = "👁";
    }

});


// Login
form.addEventListener("submit", (event) => {

    // Impede o navegador de recarregar a página
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {

        message.textContent = "Preencha o e-mail e a senha.";
        message.style.color = "red";

        return;
    }

    const result = DB.login(email, password);

    if (!result.success) {

        message.textContent = result.message;
        message.style.color = "red";

        return;
    }

    message.textContent = `Bem-vindo, ${result.user.name}!`;
    message.style.color = "green";

    // Ir para o sistema
    setTimeout(() => {
        window.location.href = "solicitacoes.html";
    }, 700);

});