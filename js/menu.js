
document.addEventListener("DOMContentLoaded", () => {
    const CHAVE_SOLICITACOES = "atende_solicitacoes";

    // Dados demonstrativos usados apenas quando não existem
    // solicitações salvas na chave esperada.
    const dadosDemonstrativos = [
        {
            id: "SOL-001",
            titulo: "Problema de acesso",
            responsavel: "Ana Silva",
            prioridade: "Alta",
            status: "Pendente"
        },
        {
            id: "SOL-002",
            titulo: "Atualização cadastral",
            responsavel: "Carlos Souza",
            prioridade: "Média",
            status: "Em andamento"
        },
        {
            id: "SOL-003",
            titulo: "Erro no relatório",
            responsavel: "Maria Oliveira",
            prioridade: "Alta",
            status: "Em andamento"
        },
        {
            id: "SOL-004",
            titulo: "Solicitação de acesso",
            responsavel: "João Santos",
            prioridade: "Baixa",
            status: "Concluída"
        },
        {
            id: "SOL-005",
            titulo: "Dúvida sobre o sistema",
            responsavel: "Pedro Lima",
            prioridade: "Média",
            status: "Pendente"
        }
    ];

    const elemento = (id) => document.getElementById(id);

    function lerSolicitacoes() {
        try {
            const dadosSalvos = localStorage.getItem(CHAVE_SOLICITACOES);

            if (dadosSalvos !== null) {
                const dados = JSON.parse(dadosSalvos);

                if (Array.isArray(dados)) {
                    return {
                        dados,
                        demonstracao: false
                    };
                }
            }
        } catch (erro) {
            console.error("Erro ao ler solicitações:", erro);
        }

        return {
            dados: dadosDemonstrativos,
            demonstracao: true
        };
    }

    function normalizarStatus(status) {
        const valor = String(status || "")
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        if (
            valor.includes("conclu") ||
            valor.includes("finaliz") ||
            valor.includes("resolvid")
        ) {
            return "concluida";
        }

        if (
            valor.includes("andamento") ||
            valor.includes("processo") ||
            valor.includes("em curso")
        ) {
            return "andamento";
        }

        return "pendente";
    }

    function obterTitulo(item) {
        return item.titulo ||
            item.assunto ||
            item.nome ||
            item.descricao ||
            "Solicitação sem título";
    }

    function obterResponsavel(item) {
        return item.responsavel ||
            item.solicitante ||
            item.nomeSolicitante ||
            item.usuario ||
            "Não informado";
    }

    function obterPrioridade(item) {
        const prioridade = String(
            item.prioridade || item.priority || "Média"
        ).trim().toLowerCase();

        if (prioridade.includes("alta") || prioridade === "high") {
            return "Alta";
        }

        if (prioridade.includes("baixa") || prioridade === "low") {
            return "Baixa";
        }

        return "Média";
    }

    function criarElemento(tag, texto, classe) {
        const node = document.createElement(tag);
        node.textContent = texto;

        if (classe) {
            node.className = classe;
        }

        return node;
    }

    function atualizarIndicadores(solicitacoes) {
        const total = solicitacoes.length;

        const pendentes = solicitacoes.filter(
            item => normalizarStatus(item.status) === "pendente"
        ).length;

        const andamento = solicitacoes.filter(
            item => normalizarStatus(item.status) === "andamento"
        ).length;

        const concluidas = solicitacoes.filter(
            item => normalizarStatus(item.status) === "concluida"
        ).length;

        elemento("totalSolicitacoes").textContent = total;
        elemento("totalPendentes").textContent = pendentes;
        elemento("totalAndamento").textContent = andamento;
        elemento("totalConcluidas").textContent = concluidas;

        elemento("resumoPendentes").textContent = pendentes;
        elemento("resumoAndamento").textContent = andamento;
        elemento("resumoConcluidas").textContent = concluidas;

        const taxa = total > 0
            ? Math.round((concluidas / total) * 100)
            : 0;

        elemento("taxaConclusao").textContent = `${taxa}%`;
        elemento("barraConclusao").style.width = `${taxa}%`;

        elemento("textoConclusao").textContent = total > 0
            ? `${concluidas} de ${total} solicitações concluídas.`
            : "Nenhuma solicitação registrada.";
    }

    function criarBadgeStatus(status) {
        const tipo = normalizarStatus(status);

        const classes = {
            pendente: "status-pendente",
            andamento: "status-andamento",
            concluida: "status-concluida"
        };

        const nomes = {
            pendente: "Pendente",
            andamento: "Em andamento",
            concluida: "Concluída"
        };

        return criarElemento(
            "span",
            nomes[tipo],
            `status-badge ${classes[tipo]}`
        );
    }

    function criarBadgePrioridade(prioridade) {
        const classes = {
            Alta: "priority-alta",
            Média: "priority-media",
            Baixa: "priority-baixa"
        };

        return criarElemento(
            "span",
            prioridade,
            `priority-badge ${classes[prioridade]}`
        );
    }

    function atualizarTabela(solicitacoes) {
        const tabela = elemento("listaRecentes");
        tabela.replaceChildren();

        if (solicitacoes.length === 0) {
            const linha = document.createElement("tr");
            const celula = criarElemento(
                "td",
                "Nenhuma solicitação encontrada.",
                "empty-state"
            );

            celula.colSpan = 4;
            linha.appendChild(celula);
            tabela.appendChild(linha);
            return;
        }

        solicitacoes.slice(-5).reverse().forEach(item => {
            const linha = document.createElement("tr");

            const titulo = criarElemento("td", obterTitulo(item));
            const responsavel = criarElemento(
                "td",
                obterResponsavel(item)
            );

            const prioridade = document.createElement("td");
            prioridade.appendChild(
                criarBadgePrioridade(obterPrioridade(item))
            );

            const status = document.createElement("td");
            status.appendChild(criarBadgeStatus(item.status));

            linha.append(titulo, responsavel, prioridade, status);
            tabela.appendChild(linha);
        });
    }

    function atualizarMenu() {
        const resultado = lerSolicitacoes();

        atualizarIndicadores(resultado.dados);
        atualizarTabela(resultado.dados);

        elemento("avisoDados").textContent = resultado.demonstracao
            ? "Exibindo dados demonstrativos. Conecte a página de Solicitações à chave atende_solicitacoes para compartilhar os registros reais."
            : "Indicadores calculados com base nos registros encontrados no navegador.";
    }

    // Personalização opcional: utiliza um nome já salvo no navegador.
    const nomeSalvo =
        localStorage.getItem("nomeUsuario") ||
        localStorage.getItem("usuarioNome");

    if (nomeSalvo) {
        elemento("nomeUsuario").textContent = nomeSalvo;
        elemento("userAvatar");

        const avatar = document.querySelector(".user-avatar");

        if (avatar) {
            avatar.textContent = nomeSalvo.trim().charAt(0).toUpperCase();
        }
    }

    // O botão volta para o login, mas não substitui uma autenticação real.
    elemento("btnSair").addEventListener("click", () => {
        const confirmar = window.confirm(
            "Deseja sair do sistema e voltar para a tela de login?"
        );

        if (confirmar) {
            window.location.href = "login.html";
        }
    });

    atualizarMenu();

    // Atualiza os indicadores se outra página modificar a chave compartilhada.
    window.addEventListener("storage", (evento) => {
        if (
            evento.key === CHAVE_SOLICITACOES ||
            evento.key === null
        ) {
            atualizarMenu();
        }
    });
});
