
(() => {
    "use strict";

    const CHAVE_SESSAO = "atende_session";

    function encerrarSessao() {
        localStorage.removeItem(CHAVE_SESSAO);
        localStorage.removeItem("usuarioLogado");
        sessionStorage.removeItem("usuarioLogado");
    }

    function sairDaConta() {
        const confirmar = window.confirm(
            "Deseja sair da sua conta e voltar para a tela de login?"
        );

        if (!confirmar) return;

        encerrarSessao();
        window.location.href = "index.html";
    }

    function sairDoSite() {
        const confirmar = window.confirm(
            "Deseja sair do Atende+ e fechar esta aba?"
        );

        if (!confirmar) return;

        encerrarSessao();
        window.close();

        if (!window.closed) {
            window.alert(
                "O navegador bloqueou o fechamento automático. " +
                "Feche esta guia manualmente."
            );
        }
    }

    function inicializarLogout() {
        const botaoConta = document.getElementById("btnSairConta");
        const botaoSite = document.getElementById("btnSairSite");

        if (botaoConta) {
            botaoConta.addEventListener("click", sairDaConta);
        }

        if (botaoSite) {
            botaoSite.addEventListener("click", sairDoSite);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", inicializarLogout);
    } else {
        inicializarLogout();
    }
})();
