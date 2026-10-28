
(() => {
    "use strict";

    const porId = (id) => document.getElementById(id);
    const CHAVE_SESSAO = "atende_session";
    const CHAVE_PREFERENCIAS = "atende_preferencias";

    let categoriaAtual = "todas";

    function lerJSON(chave, padrao) {
        try {
            const valor = localStorage.getItem(chave);
            return valor === null ? padrao : JSON.parse(valor);
        } catch (erro) {
            console.error(`Erro ao ler ${chave}:`, erro);
            return padrao;
        }
    }

    function atualizarPerfil() {
        const sessao = lerJSON(CHAVE_SESSAO, {}) || {};
        const preferencias = lerJSON(CHAVE_PREFERENCIAS, {}) || {};

        const nome = String(
            preferencias.nomeExibicao || sessao.name || sessao.nome || "Usuário"
        ).trim();

        porId("nomeUsuario").textContent = nome || "Usuário";
        porId("emailUsuario").textContent =
            sessao.email || "Atendimento interno";

        porId("userAvatar").textContent =
            (nome || "U").charAt(0).toLocaleUpperCase("pt-BR");

        document.body.classList.toggle(
            "theme-dark",
            preferencias.tema === "escuro"
        );

        document.body.classList.toggle(
            "compact-mode",
            preferencias.modoCompacto === true
        );
    }

    function filtrarFaq() {
        const termo = porId("buscaFaq").value
            .trim()
            .toLocaleLowerCase("pt-BR");

        const itens = [...document.querySelectorAll(".faq-item")];
        let visiveis = 0;

        itens.forEach((item) => {
            const texto = (
                item.textContent + " " + (item.dataset.texto || "")
            ).toLocaleLowerCase("pt-BR");

            const correspondeCategoria =
                categoriaAtual === "todas" ||
                item.dataset.categoria === categoriaAtual;

            const correspondeTexto = !termo || texto.includes(termo);
            const mostrar = correspondeCategoria && correspondeTexto;

            item.hidden = !mostrar;

            if (mostrar) visiveis++;
        });

        porId("semResultadosFaq").hidden = visiveis !== 0;
    }

    // Abre e fecha as respostas das perguntas.
    document.querySelectorAll(".faq-question").forEach((botao) => {
        botao.addEventListener("click", () => {
            const item = botao.closest(".faq-item");
            const abrir = !item.classList.contains("open");

            item.classList.toggle("open", abrir);
            botao.setAttribute("aria-expanded", String(abrir));
        });
    });

    // Filtros de categorias.
    document.querySelectorAll(".faq-filter").forEach((botao) => {
        botao.addEventListener("click", () => {
            categoriaAtual = botao.dataset.categoria || "todas";

            document.querySelectorAll(".faq-filter").forEach((outro) => {
                outro.classList.toggle("active", outro === botao);
            });

            filtrarFaq();
        });
    });

    // Pesquisa por palavras.
    porId("buscaFaq").addEventListener("input", filtrarFaq);

    porId("limparBusca").addEventListener("click", () => {
        porId("buscaFaq").value = "";
        categoriaAtual = "todas";

        document.querySelectorAll(".faq-filter").forEach((botao) => {
            botao.classList.toggle(
                "active",
                botao.dataset.categoria === "todas"
            );
        });

        filtrarFaq();
        porId("buscaFaq").focus();
    });

    // Botão de sair.
    porId("btnSair").addEventListener("click", () => {
        if (!window.confirm("Deseja sair do sistema?")) return;

        localStorage.removeItem(CHAVE_SESSAO);
        localStorage.removeItem("usuarioLogado");
        sessionStorage.removeItem("usuarioLogado");

        window.location.href = "login.html";
    });

    atualizarPerfil();
    filtrarFaq();
})();
