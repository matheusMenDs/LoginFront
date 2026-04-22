document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita recarregar a página

    const email = document.querySelector(".input-box input[type='email']").value;
    const senha = document.querySelector(".input-box input[type='password']").value;

    if (!email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch("http://localhost:8000/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login bem-sucedido! Bem-vindo(a) " + email);
            // Redirecionar para outra página, se necessário
            // window.location.href = "dashboard.html";
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert("Erro ao conectar ao servidor.");
        console.error(error);
    }
});


