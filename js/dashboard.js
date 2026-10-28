
(() => {
    "use strict";

    const KEY = "atende_solicitacoes";
    const $ = (id) => document.getElementById(id);
    let todos = [];

    function ler() {
        try {
            const dados = JSON.parse(localStorage.getItem(KEY) || "[]");
            return Array.isArray(dados) ? dados : [];
        } catch (erro) {
            console.error("Erro ao ler solicitações:", erro);
            return [];
        }
    }

    function texto(item, ...chaves) {
        for (const chave of chaves) {
            if (
                item[chave] !== undefined &&
                item[chave] !== null &&
                String(item[chave]).trim()
            ) {
                return String(item[chave]).trim();
            }
        }
        return "";
    }

    function statusTipo(status) {
        const valor = String(status || "aberto")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        if (valor.includes("cancel")) return "cancelada";

        if (
            valor.includes("resolvid") ||
            valor.includes("conclu") ||
            valor.includes("finaliz")
        ) {
            return "resolvida";
        }

        if (
            valor.includes("andamento") ||
            valor.includes("atendimento") ||
            valor.includes("processo") ||
            valor.includes("curso")
        ) {
            return "andamento";
        }

        return "aberta";
    }

    function statusLabel(tipo) {
        return {
            aberta: "Aberta / Pendente",
            andamento: "Em atendimento",
            resolvida: "Resolvida",
            cancelada: "Cancelada"
        }[tipo];
    }

    function formatarData(valor) {
        if (!valor) return "—";

        const match = String(valor).match(/^(\d{4})-(\d{2})-(\d{2})/);
        return match
            ? `${match[3]}/${match[2]}/${match[1]}`
            : String(valor);
    }

    function criar(tag, valor, classe) {
        const elemento = document.createElement(tag);
        elemento.textContent = valor;

        if (classe) elemento.className = classe;

        return elemento;
    }

    function atualizarIndicadores(items) {
        const contagens = {
            aberta: 0,
            andamento: 0,
            resolvida: 0,
            cancelada: 0
        };

        items.forEach((item) => {
            contagens[statusTipo(item.status)]++;
        });

        $("totalSolicitacoes").textContent = items.length;
        $("totalAbertas").textContent = contagens.aberta;
        $("totalAndamento").textContent = contagens.andamento;
        $("totalResolvidas").textContent = contagens.resolvida;

        const taxa = items.length
            ? Math.round(contagens.resolvida / items.length * 100)
            : 0;

        $("taxaConclusao").textContent = `${taxa}%`;
        $("barraConclusao").style.width = `${taxa}%`;

        $("textoConclusao").textContent = items.length
            ? `${contagens.resolvida} de ${items.length} solicitações resolvidas.`
            : "Nenhuma solicitação registrada.";

        $("notaDashboard").textContent = items.length
            ? "Indicadores calculados com os registros salvos."
            : "Nenhuma solicitação registrada. Abra uma solicitação pela página Solicitações ou Suporte.";

        const barras = {
            aberta: "Aberta",
            andamento: "Andamento",
            resolvida: "Resolvida",
            cancelada: "Cancelada"
        };

        Object.keys(barras).forEach((tipo) => {
            const percentual = items.length
                ? Math.round(contagens[tipo] / items.length * 100)
                : 0;

            $(`barra${barras[tipo]}`).style.width = `${percentual}%`;
            $(`qtd${barras[tipo]}`).textContent = contagens[tipo];
        });
    }

    function filtrar() {
        const busca = $("buscaDashboard").value
            .trim()
            .toLocaleLowerCase("pt-BR");

        const statusSelecionado = $("filtroStatus").value;

        const filtrados = todos.filter((item) => {
            const conteudo = [
                item.id,
                item.protocolo,
                item.titulo,
                item.assunto,
                item.descricao,
                item.solicitante,
                item.email,
                item.status,
                item.setor
            ].join(" ").toLocaleLowerCase("pt-BR");

            return (
                (!busca || conteudo.includes(busca)) &&
                (!statusSelecionado ||
                    statusTipo(item.status) === statusSelecionado)
            );
        });

        renderizarTabela(filtrados);
        $("contadorResultados").textContent =
            `${filtrados.length} registro(s)`;

        atualizarIndicadores(todos);
    }

    function renderizarTabela(items) {
        const tbody = $("tabelaDashboard");
        tbody.replaceChildren();

        if (items.length === 0) {
            const linha = document.createElement("tr");
            const celula = criar(
                "td",
                "Nenhuma solicitação corresponde aos filtros.",
                "empty-state"
            );

            celula.colSpan = 5;
            linha.appendChild(celula);
            tbody.appendChild(linha);
            return;
        }

        [...items].reverse().forEach((item) => {
            const linha = document.createElement("tr");
            const tipo = statusTipo(item.status);

            const id = texto(item, "id", "protocolo") || "—";
            const titulo =
                texto(item, "titulo", "assunto", "title") ||
                texto(item, "descricao").split("\n")[0] ||
                "Sem título";

            const solicitante =
                texto(item, "solicitante", "responsavel", "userEmail", "email") ||
                "Não informado";

            const data = formatarData(texto(item, "data", "criadoEm"));

            const classes = {
                aberta: "open",
                andamento: "progress",
                resolvida: "done",
                cancelada: "cancel"
            };

            const status = criar(
                "span",
                statusLabel(tipo),
                `app-badge ${classes[tipo]}`
            );

            linha.append(
                criar("td", id),
                criar("td", titulo),
                criar("td", solicitante),
                criar("td", data)
            );

            const celulaStatus = document.createElement("td");
            celulaStatus.appendChild(status);
            linha.appendChild(celulaStatus);

            tbody.appendChild(linha);
        });
    }

    function atualizar() {
        todos = ler();
        filtrar();
    }

    $("buscaDashboard").addEventListener("input", filtrar);
    $("filtroStatus").addEventListener("change", filtrar);

    $("btnSair").addEventListener("click", () => {
        if (!confirm("Deseja sair do sistema?")) return;

        localStorage.removeItem("atende_session");
        localStorage.removeItem("usuarioLogado");
        sessionStorage.removeItem("usuarioLogado");

        location.href = "login.html";
    });

    window.addEventListener("storage", (evento) => {
        if (
            !evento.key ||
            evento.key === KEY ||
            evento.key === "atende_preferencias" ||
            evento.key === "atende_session"
        ) {
            atualizar();
        }
    });

    atualizar();
})();
