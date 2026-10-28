
(() => {
    "use strict";

    const KEY = "atende_solicitacoes";
    const $ = (id) => document.getElementById(id);

    function ler() {
        try {
            const dados = JSON.parse(localStorage.getItem(KEY) || "[]");
            return Array.isArray(dados) ? dados : [];
        } catch (erro) {
            console.error("Erro ao ler solicitações:", erro);
            return [];
        }
    }

    function salvar(items) {
        localStorage.setItem(KEY, JSON.stringify(items));
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
            aberta: "Aberto",
            andamento: "Em Atendimento",
            resolvida: "Resolvido",
            cancelada: "Cancelado"
        }[tipo];
    }

    function formatarData(valor) {
        if (!valor) return "—";

        const match = String(valor).match(/^(\d{4})-(\d{2})-(\d{2})/);
        return match
            ? `${match[3]}/${match[2]}/${match[1]}`
            : String(valor);
    }

    function hoje() {
        const data = new Date();

        return [
            data.getFullYear(),
            String(data.getMonth() + 1).padStart(2, "0"),
            String(data.getDate()).padStart(2, "0")
        ].join("-");
    }

    function gerarProtocolo(items) {
        let maior = 100;

        items.forEach((item) => {
            const encontrado = String(item.id || item.protocolo || "").match(/(\d+)/);

            if (encontrado) {
                maior = Math.max(maior, Number(encontrado[1]));
            }
        });

        return `CH-${maior + 1}`;
    }

    function valor(item, ...chaves) {
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

    function criar(tag, texto, classe) {
        const elemento = document.createElement(tag);
        elemento.textContent = texto;

        if (classe) elemento.className = classe;

        return elemento;
    }

    function criarBadge(tipo) {
        const classes = {
            aberta: "open",
            andamento: "progress",
            resolvida: "done",
            cancelada: "cancel"
        };

        return criar(
            "span",
            statusLabel(tipo),
            `app-badge ${classes[tipo]}`
        );
    }

    function atualizar() {
        const items = ler();

        const contagens = {
            aberta: 0,
            andamento: 0,
            resolvida: 0,
            cancelada: 0
        };

        items.forEach((item) => {
            contagens[statusTipo(item.status)]++;
        });

        $("statTotal").textContent = items.length;
        $("statAbertas").textContent = contagens.aberta;
        $("statResolvidas").textContent = contagens.resolvida;

        renderizar(items);
    }

    function renderizar(origem) {
        const busca = $("buscaSolicitacao").value
            .trim()
            .toLocaleLowerCase("pt-BR");

        const filtroStatus = $("filtroSolicitacao").value;

        const items = origem.filter((item) => {
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
                (!filtroStatus || statusTipo(item.status) === filtroStatus)
            );
        });

        $("contadorSolicitacoes").textContent =
            `${items.length} registro(s)`;

        const tbody = $("tabelaCorpo");
        tbody.replaceChildren();

        if (items.length === 0) {
            const linha = document.createElement("tr");
            const celula = criar(
                "td",
                "Nenhuma solicitação encontrada.",
                "empty-state"
            );

            celula.colSpan = 6;
            linha.appendChild(celula);
            tbody.appendChild(linha);
            return;
        }

        items.forEach((item) => {
            const linha = document.createElement("tr");
            const id = valor(item, "id", "protocolo");
            const tipo = statusTipo(item.status);

            const titulo =
                valor(item, "titulo", "assunto", "title") ||
                valor(item, "descricao").split("\n")[0] ||
                "Sem título";

            const solicitante =
                valor(item, "solicitante", "responsavel", "userEmail", "email") ||
                "Não informado";

            const data = formatarData(valor(item, "data", "criadoEm"));

            linha.append(
                criar("td", id || "—"),
                criar("td", titulo),
                criar("td", solicitante),
                criar("td", data)
            );

            const celulaStatus = document.createElement("td");
            celulaStatus.appendChild(criarBadge(tipo));
            linha.appendChild(celulaStatus);

            const acoes = document.createElement("td");
            const seletor = document.createElement("select");

            seletor.setAttribute("aria-label", `Alterar status de ${id}`);
            seletor.style.minWidth = "130px";
            seletor.style.padding = "7px";
            seletor.style.borderRadius = "7px";
            seletor.style.border = "1px solid #dfe5ef";

            const opcoes = [
                ["aberta", "Aberto"],
                ["andamento", "Em Atendimento"],
                ["resolvida", "Resolvido"],
                ["cancelada", "Cancelado"]
            ];

            opcoes.forEach(([valorOpcao, rotulo]) => {
                const opcao = document.createElement("option");
                opcao.value = valorOpcao;
                opcao.textContent = rotulo;
                opcao.selected = valorOpcao === tipo;
                seletor.appendChild(opcao);
            });

            seletor.addEventListener("change", () => {
                const atuais = ler();

                const indice = atuais.findIndex(
                    (registro) =>
                        String(registro.id || registro.protocolo) === String(id)
                );

                if (indice < 0) return;

                atuais[indice].status = statusLabel(seletor.value);
                salvar(atuais);
                atualizar();

                $("mensagemSolicitacao").textContent =
                    `Status de ${id} atualizado.`;
            });

            const excluir = criar("button", "Excluir", "app-delete");
            excluir.type = "button";
            excluir.style.marginLeft = "7px";

            excluir.addEventListener("click", () => {
                if (!confirm(`Deseja excluir a solicitação ${id}?`)) return;

                const atuais = ler().filter(
                    (registro) =>
                        String(registro.id || registro.protocolo) !== String(id)
                );

                salvar(atuais);
                atualizar();

                $("mensagemSolicitacao").textContent =
                    `Solicitação ${id} excluída.`;
            });

            acoes.append(seletor, excluir);
            linha.appendChild(acoes);
            tbody.appendChild(linha);
        });
    }

    $("data").value = hoje();

    $("formSolicitacao").addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!evento.currentTarget.reportValidity()) return;

        const solicitante = $("solicitante").value.trim();
        const setor = $("setor").value.trim();
        const titulo = $("titulo").value.trim();
        const data = $("data").value;
        const descricao = $("descricao").value.trim();

        if (!solicitante || !titulo || !data || descricao.length < 5) {
            $("mensagemSolicitacao").textContent =
                "Confira os campos obrigatórios.";
            return;
        }

        try {
            const items = ler();
            const id = gerarProtocolo(items);

            items.push({
                id,
                protocolo: id,
                titulo,
                solicitante,
                setor,
                descricao,
                data,
                status: "Aberto",
                origem: "solicitacoes",
                criadoEm: new Date().toISOString()
            });

            salvar(items);
            atualizar();

            evento.currentTarget.reset();
            $("data").value = hoje();

            $("mensagemSolicitacao").textContent =
                `Solicitação ${id} registrada com sucesso.`;
        } catch (erro) {
            console.error("Erro ao salvar solicitação:", erro);

            $("mensagemSolicitacao").textContent =
                "Não foi possível salvar. Verifique o espaço disponível no navegador.";
        }
    });

    $("buscaSolicitacao").addEventListener("input", () => {
        renderizar(ler());
    });

    $("filtroSolicitacao").addEventListener("change", () => {
        renderizar(ler());
    });

    $("btnSair").addEventListener("click", () => {
        if (!confirm("Deseja sair do sistema?")) return;

        localStorage.removeItem("atende_session");
        localStorage.removeItem("usuarioLogado");
        sessionStorage.removeItem("usuarioLogado");

        location.href = "login.html";
    });

    window.addEventListener("storage", (evento) => {
        if (!evento.key || evento.key === KEY) atualizar();
    });

    atualizar();
})();
