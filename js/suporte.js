
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

    function criar(tag, texto, classe) {
        const elemento = document.createElement(tag);
        elemento.textContent = texto;

        if (classe) elemento.className = classe;

        return elemento;
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

    function hoje() {
        const data = new Date();

        return [
            data.getFullYear(),
            String(data.getMonth() + 1).padStart(2, "0"),
            String(data.getDate()).padStart(2, "0")
        ].join("-");
    }

    function formatarData(valor) {
        const match = String(valor || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
        return match ? `${match[3]}/${match[2]}/${match[1]}` : (valor || "—");
    }

    function tipoStatus(status) {
        const valor = String(status || "aberto")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        if (valor.includes("cancel")) return "cancel";
        if (
            valor.includes("resolvid") ||
            valor.includes("conclu") ||
            valor.includes("finaliz")
        ) {
            return "done";
        }

        if (
            valor.includes("andamento") ||
            valor.includes("atendimento") ||
            valor.includes("processo")
        ) {
            return "progress";
        }

        return "open";
    }

    function atualizarRecentes() {
        const tbody = $("tabelaSuporteRecentes");
        tbody.replaceChildren();

        const items = ler()
            .filter((item) => item.origem === "suporte")
            .slice(-5)
            .reverse();

        if (items.length === 0) {
            const linha = document.createElement("tr");
            const celula = criar(
                "td",
                "Nenhum chamado de suporte registrado ainda.",
                "empty-state"
            );

            celula.colSpan = 4;
            linha.appendChild(celula);
            tbody.appendChild(linha);
            return;
        }

        items.forEach((item) => {
            const linha = document.createElement("tr");

            const protocolo = String(item.id || item.protocolo || "—");
            const assunto = String(item.titulo || item.assunto || "Sem assunto");
            const data = formatarData(item.data);
            const status = String(item.status || "Aberto");

            linha.append(
                criar("td", protocolo),
                criar("td", assunto),
                criar("td", data)
            );

            const celulaStatus = document.createElement("td");
            celulaStatus.appendChild(
                criar("span", status, `app-badge ${tipoStatus(status)}`)
            );

            linha.appendChild(celulaStatus);
            tbody.appendChild(linha);
        });
    }

    $("formSuporte").addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!evento.currentTarget.reportValidity()) return;

        const nome = $("nomeSuporte").value.trim();
        const email = $("emailSuporte").value.trim();
        const assunto = $("assuntoSuporte").value;
        const mensagem = $("mensagemSuporte").value.trim();

        if (!nome || !email || !assunto || mensagem.length < 5) {
            $("mensagemSuporteStatus").textContent =
                "Confira os campos obrigatórios antes de enviar.";
            return;
        }

        try {
            const items = ler();
            const id = gerarProtocolo(items);

            items.push({
                id,
                protocolo: id,
                titulo: assunto,
                assunto,
                solicitante: nome,
                email,
                setor: "Suporte",
                descricao: `E-mail para contato: ${email}\n\nDescrição do problema:\n${mensagem}`,
                data: hoje(),
                status: "Aberto",
                origem: "suporte",
                criadoEm: new Date().toISOString()
            });

            salvar(items);
            evento.currentTarget.reset();

            $("mensagemSuporteStatus").textContent =
                `Chamado ${id} registrado! Ele também aparece em Solicitações e no Dashboard.`;

            atualizarRecentes();
        } catch (erro) {
            console.error("Erro ao salvar o chamado:", erro);

            $("mensagemSuporteStatus").textContent =
                "Não foi possível salvar. Verifique o armazenamento do navegador.";
        }
    });

    $("btnSair").addEventListener("click", () => {
        if (!confirm("Deseja sair do sistema?")) return;

        localStorage.removeItem("atende_session");
        localStorage.removeItem("usuarioLogado");
        sessionStorage.removeItem("usuarioLogado");

        location.href = "login.html";
    });

    window.addEventListener("storage", (evento) => {
        if (!evento.key || evento.key === KEY) {
            atualizarRecentes();
        }
    });

    atualizarRecentes();
})();
