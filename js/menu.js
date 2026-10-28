
(() => {
    "use strict";

    const CHAVE_SOLICITACOES = "atende_solicitacoes";
    const CHAVE_SESSAO = "atende_session";
    const CHAVE_PREFERENCIAS = "atende_preferencias";

    const porId = (id) => document.getElementById(id);

    function lerJSON(chave, padrao) {
        try {
            const valor = localStorage.getItem(chave);
            return valor === null ? padrao : JSON.parse(valor);
        } catch (erro) {
            console.error(`Não foi possível ler ${chave}:`, erro);
            return padrao;
        }
    }

    function lerSolicitacoes() {
        const dados = lerJSON(CHAVE_SOLICITACOES, []);
        return Array.isArray(dados) ? dados : [];
    }

    function lerSessao() {
        const sessao = lerJSON(CHAVE_SESSAO, null);

        if (sessao && typeof sessao === "object") {
            return sessao;
        }

        const legado = lerJSON("usuarioLogado", null);

        if (legado && typeof legado === "object") return legado;
        if (typeof legado === "string" && legado.trim()) {
            return { name: legado.trim() };
        }

        return null;
    }

    function lerPreferencias() {
        const preferencias = lerJSON(CHAVE_PREFERENCIAS, {});
        return preferencias && typeof preferencias === "object"
            ? preferencias
            : {};
    }

    function normalizarTexto(valor) {
        return String(valor ?? "")
            .trim()
            .toLocaleLowerCase("pt-BR")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function categorizarStatus(status) {
        const valor = normalizarTexto(status);

        if (valor.includes("cancel")) return "cancelada";

        if (
            valor.includes("resolvid") ||
            valor.includes("conclu") ||
            valor.includes("finaliz") ||
            valor.includes("complet")
        ) {
            return "concluida";
        }

        if (
            valor.includes("andamento") ||
            valor.includes("atendimento") ||
            valor.includes("processo") ||
            valor.includes("em curso")
        ) {
            return "andamento";
        }

        return "pendente";
    }

    function criarNo(tag, texto, classe) {
        const no = document.createElement(tag);
        no.textContent = texto;

        if (classe) no.className = classe;

        return no;
    }

    function atualizarTabela(solicitacoes) {
        const corpo = porId("listaRecentes");
        corpo.replaceChildren();

        if (solicitacoes.length === 0) {
            const linha = document.createElement("tr");
            const celula = criarNo(
                "td",
                "Nenhuma solicitação registrada. Abra uma solicitação para visualizar os dados aqui.",
                "empty-state"
            );

            celula.colSpan = 4;
            linha.appendChild(celula);
            corpo.appendChild(linha);
            return;
        }

        solicitacoes.slice(-5).reverse().forEach((item, indice) => {
            const indiceOriginal = solicitacoes.length - 1 - indice;
            const linha = document.createElement("tr");

            const protocolo = String(
                item.id ??
                item.protocolo ??
                `SOL-${String(indiceOriginal + 1).padStart(3, "0")}`
            );

            const titulo = String(
                item.titulo ||
                item.assunto ||
                item.title ||
                item.nome ||
                item.descricao ||
                "Solicitação sem título"
            ).split("\n")[0].trim();

            const solicitante = String(
                item.solicitante ||
                item.responsavel ||
                item.nomeSolicitante ||
                item.usuario ||
                item.userEmail ||
                item.email ||
                "Não informado"
            );

            const status = String(item.status || "Aberto");
            const categoria = categorizarStatus(status);

            const classes = {
                pendente: "status-pendente",
                andamento: "status-andamento",
                concluida: "status-concluida",
                cancelada: "status-cancelada"
            };

            const celulaStatus = document.createElement("td");
            celulaStatus.appendChild(
                criarNo(
                    "span",
                    status,
                    `status-badge ${classes[categoria]}`
                )
            );

            linha.append(
                criarNo("td", protocolo),
                criarNo("td", titulo || "Solicitação sem título"),
                criarNo("td", solicitante),
                celulaStatus
            );

            corpo.appendChild(linha);
        });
    }

    function atualizarIndicadores(solicitacoes) {
        const total = solicitacoes.length;

        const pendentes = solicitacoes.filter(
            item => categorizarStatus(item.status) === "pendente"
        ).length;

        const andamento = solicitacoes.filter(
            item => categorizarStatus(item.status) === "andamento"
        ).length;

        const concluidas = solicitacoes.filter(
            item => categorizarStatus(item.status) === "concluida"
        ).length;

        const taxa = total
            ? Math.round((concluidas / total) * 100)
            : 0;

        porId("totalSolicitacoes").textContent = total;
        porId("totalPendentes").textContent = pendentes;
        porId("totalAndamento").textContent = andamento;
        porId("totalConcluidas").textContent = concluidas;

        porId("resumoPendentes").textContent = pendentes;
        porId("resumoAndamento").textContent = andamento;
        porId("resumoConcluidas").textContent = concluidas;

        porId("taxaConclusao").textContent = `${taxa}%`;
        porId("barraConclusao").style.width = `${taxa}%`;
        porId("progressoConclusao").setAttribute(
            "aria-valuenow",
            String(taxa)
        );

        porId("textoConclusao").textContent = total
            ? `${concluidas} de ${total} solicitações concluídas.`
            : "Nenhuma solicitação registrada.";

        porId("avisoDados").textContent = total
            ? "Indicadores calculados com os registros salvos em atende_solicitacoes."
            : "Ainda não há solicitações salvas. Os indicadores permanecem zerados.";
    }

    function aplicarPreferencias() {
        const preferencias = lerPreferencias();

        document.body.classList.toggle(
            "theme-dark",
            preferencias.tema === "escuro"
        );

        document.body.classList.toggle(
            "compact-mode",
            preferencias.modoCompacto === true
        );
    }

    function atualizarNomeUsuario() {
        const sessao = lerSessao();
        const preferencias = lerPreferencias();

        const nomeSessao = String(
            sessao?.name || sessao?.nome || sessao?.nameUser || "Usuário"
        ).trim();

        const nomePreferido = String(
            preferencias.nomeExibicao || ""
        ).trim();

        const nome = nomePreferido || nomeSessao || "Usuário";
        const email = String(sessao?.email || "Atendimento interno").trim();
        const avatar = nome.charAt(0).toLocaleUpperCase("pt-BR") || "U";

        porId("nomeUsuario").textContent = nome;
        porId("emailUsuario").textContent = email;
        porId("userAvatar").textContent = avatar;
    }

    function atualizarMenu() {
        aplicarPreferencias();

        const solicitacoes = lerSolicitacoes();

        atualizarIndicadores(solicitacoes);
        atualizarTabela(solicitacoes);
    }

    function sairDoSistema() {
        const confirmar = window.confirm(
            "Deseja sair do sistema e voltar para a tela de login?"
        );

        if (!confirmar) return;

        localStorage.removeItem(CHAVE_SESSAO);
        localStorage.removeItem("usuarioLogado");
        sessionStorage.removeItem("usuarioLogado");

        window.location.href = "login.html";
    }

    function inicializar() {
        atualizarNomeUsuario();
        atualizarMenu();

        porId("btnSair").addEventListener("click", sairDoSistema);

        window.addEventListener("storage", (evento) => {
            if (
                evento.key === CHAVE_SOLICITACOES ||
                evento.key === CHAVE_SESSAO ||
                evento.key === CHAVE_PREFERENCIAS ||
                evento.key === null
            ) {
                atualizarNomeUsuario();
                atualizarMenu();
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", inicializar);
    } else {
        inicializar();
    }
})();
