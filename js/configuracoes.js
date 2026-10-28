
(() => {
    "use strict";

    const CHAVE_SESSAO = "atende_session";
    const CHAVE_PREFERENCIAS = "atende_preferencias";
    const porId = (id) => document.getElementById(id);

    function lerJSON(chave, padrao) {
        try {
            const valor = localStorage.getItem(chave);
            return valor === null ? padrao : JSON.parse(valor);
        } catch (erro) {
            console.error(`Erro ao ler ${chave}:`, erro);
            return padrao;
        }
    }

    function obterPreferencias() {
        const dados = lerJSON(CHAVE_PREFERENCIAS, {});
        return dados && typeof dados === "object" ? dados : {};
    }

    function atualizarCabecalho() {
        const sessao = lerJSON(CHAVE_SESSAO, {}) || {};
        const preferencias = obterPreferencias();

        const nome = String(
            preferencias.nomeExibicao || sessao.name || sessao.nome || "Usuário"
        ).trim();

        porId("nomeUsuario").textContent = nome || "Usuário";
        porId("emailUsuario").textContent = sessao.email || "Atendimento interno";
        porId("userAvatar").textContent =
            (nome || "U").charAt(0).toLocaleUpperCase("pt-BR");
    }

    function aplicarPreferencias() {
        const preferencias = obterPreferencias();

        document.body.classList.toggle(
            "theme-dark",
            preferencias.tema === "escuro"
        );

        document.body.classList.toggle(
            "compact-mode",
            preferencias.modoCompacto === true
        );
    }

    function carregarFormulario() {
        const sessao = lerJSON(CHAVE_SESSAO, {}) || {};
        const preferencias = obterPreferencias();

        porId("nomeExibicao").value =
            preferencias.nomeExibicao || sessao.name || sessao.nome || "";

        porId("emailConta").value =
            sessao.email || "Não disponível na sessão";

        porId("departamento").value = preferencias.departamento || "";
        porId("tema").value = preferencias.tema === "escuro" ? "escuro" : "claro";
        porId("modoCompacto").checked = preferencias.modoCompacto === true;
        porId("notificacoes").checked = preferencias.notificacoes === true;
    }

    porId("formConfiguracoes").addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = porId("nomeExibicao").value.trim();

        const preferencias = {
            nomeExibicao: nome,
            departamento: porId("departamento").value.trim(),
            tema: porId("tema").value === "escuro" ? "escuro" : "claro",
            modoCompacto: porId("modoCompacto").checked,
            notificacoes: porId("notificacoes").checked
        };

        try {
            localStorage.setItem(
                CHAVE_PREFERENCIAS,
                JSON.stringify(preferencias)
            );

            aplicarPreferencias();
            atualizarCabecalho();

            porId("mensagemConfiguracoes").textContent =
                "Preferências salvas neste navegador.";
        } catch (erro) {
            console.error("Erro ao salvar preferências:", erro);

            porId("mensagemConfiguracoes").textContent =
                "Não foi possível salvar. Verifique o armazenamento do navegador.";
        }
    });

    porId("restaurarPadrao").addEventListener("click", () => {
        const confirmar = window.confirm(
            "Deseja remover suas preferências personalizadas neste navegador?"
        );

        if (!confirmar) return;

        localStorage.removeItem(CHAVE_PREFERENCIAS);

        carregarFormulario();
        aplicarPreferencias();
        atualizarCabecalho();

        porId("mensagemConfiguracoes").textContent =
            "Preferências padrão restauradas.";
    });

    porId("btnSair").addEventListener("click", () => {
        if (!window.confirm("Deseja sair do sistema?")) return;

        localStorage.removeItem(CHAVE_SESSAO);
        localStorage.removeItem("usuarioLogado");
        sessionStorage.removeItem("usuarioLogado");

        window.location.href = "login.html";
    });

    carregarFormulario();
    aplicarPreferencias();
    atualizarCabecalho();
})();
