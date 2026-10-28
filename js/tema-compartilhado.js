
(() => {
    "use strict";

    const PREFERENCIAS_KEY = "atende_preferencias";
    const SESSAO_KEY = "atende_session";

    function lerJSON(chave, padrao) {
        try {
            const valor = localStorage.getItem(chave);
            return valor === null ? padrao : JSON.parse(valor);
        } catch (erro) {
            console.error(`Não foi possível ler ${chave}:`, erro);
            return padrao;
        }
    }

    function aplicarPreferencias() {
        const preferencias = lerJSON(PREFERENCIAS_KEY, {}) || {};
        const sessao = lerJSON(SESSAO_KEY, {}) || {};

        document.body.classList.toggle(
            "theme-dark",
            preferencias.tema === "escuro"
        );

        document.body.classList.toggle(
            "compact-mode",
            preferencias.modoCompacto === true
        );

        const nome = String(
            preferencias.nomeExibicao ||
            sessao.name ||
            sessao.nome ||
            "Usuário"
        ).trim();

        const nomeElemento = document.getElementById("nomeUsuario");
        const emailElemento = document.getElementById("emailUsuario");
        const avatarElemento = document.getElementById("userAvatar");

        if (nomeElemento) {
            nomeElemento.textContent = nome || "Usuário";
        }

        if (emailElemento) {
            emailElemento.textContent =
                sessao.email ||
                preferencias.departamento ||
                "Atendimento interno";
        }

        if (avatarElemento) {
            avatarElemento.textContent =
                (nome || "U").charAt(0).toLocaleUpperCase("pt-BR");
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", aplicarPreferencias);
    } else {
        aplicarPreferencias();
    }

    window.addEventListener("storage", (evento) => {
        if (
            !evento.key ||
            evento.key === PREFERENCIAS_KEY ||
            evento.key === SESSAO_KEY
        ) {
            aplicarPreferencias();
        }
    });
})();
