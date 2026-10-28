
Atende+ — Guia dos códigos e arquivos
Este documento explica a função de cada página, folha de estilo e script JavaScript do projeto Atende+ — Controle de Atendimento Interno. Use-o como referência quando precisar corrigir um erro, mudar o visual, adicionar um recurso ou entender onde uma funcionalidade está implementada.

Contexto da versão documentada: projeto de front-end feito com HTML, CSS e JavaScript. As páginas integradas usam localStorage para guardar solicitações e preferências no navegador. Ainda não existe, nesta versão, um banco de dados remoto ou um backend que sincronize dados entre computadores.

Índice
Visão geral: como os arquivos trabalham juntos
Páginas HTML
Arquivos CSS
Arquivos JavaScript
Dados salvos no navegador
Caminho de um chamado
Como escolher o arquivo correto para editar
Cuidados ao fazer alterações
Estrutura de pastas sugerida
Lista rápida de verificação
1. Visão geral: como os arquivos trabalham juntos
O projeto é dividido em três partes principais:

HTML: define a estrutura de cada tela, como menu lateral, formulários, tabelas, cartões e campos.
CSS: define a aparência, como cores, fontes, espaçamentos, alinhamento, cartões, responsividade e tema claro/escuro.
JavaScript: faz os formulários funcionarem, salva e lê dados, filtra tabelas, calcula indicadores e responde aos cliques.
Por exemplo, em solicitacoes.html, o HTML contém o formulário e a tabela. O arquivo css/app-pages.css define como esses elementos aparecem. O arquivo js/solicitacoes.js recebe o envio, guarda o chamado no navegador e monta a tabela.

As páginas integradas partilham a mesma navegação lateral e usam os mesmos nomes de armazenamento. Isso permite que um chamado enviado pelo Suporte apareça também na página Solicitações e nos indicadores do Dashboard, quando todas as páginas são abertas na mesma origem do navegador.

2. Páginas HTML
index.html
É uma página de entrada do projeto na versão original compartilhada. O HTML fornecido para esse arquivo corresponde a uma tela de login com apresentação do Atende+, campo de e-mail, senha, opção para mostrar a senha e link para cadastro.

Normalmente contém:

o formulário de acesso;
o campo de e-mail;
o campo de senha;
o botão para mostrar ou esconder a senha;
links para recuperação de senha e cadastro;
referências aos arquivos css/style.css, js/db.js e js/login.js.
Confira se index.html e login.html são páginas diferentes no seu repositório. Se as duas forem telas de login, mantenha os links consistentes para que o usuário não fique alternando entre páginas duplicadas.

login.html
É a tela de login quando ela é mantida como página separada. O layout e os campos ficam no HTML; a validação e a tentativa de login ficam em js/login.js; a aparência fica principalmente em css/style.css.

cadastro.html
Apresenta o formulário de criação de conta. Na versão original fornecida, contém campos para nome, e-mail, senha e confirmação de senha. Carrega js/db.js e js/cadastro.js.

O script de cadastro deve verificar se os campos estão preenchidos, se as senhas coincidem e se o e-mail já está cadastrado antes de mostrar o resultado. Como o projeto é front-end, esse cadastro local não equivale a um sistema de autenticação seguro para produção.

menu.html
É a página inicial após o login. Apresenta:

a barra lateral com Início, Dashboard, Solicitações, Suporte, Configurações e FAQ/Ajuda;
os indicadores gerais de atendimento;
a tabela de solicitações recentes;
o resumo de conclusão;
atalhos para as demais áreas.
Os elementos HTML possuem identificadores, como totalSolicitacoes, totalPendentes e listaRecentes, que são usados por js/menu.js. O HTML e o JavaScript precisam manter esses identificadores iguais.

dashboard-atendimento-unificado.html
É a página de análise dos chamados. Contém cartões com totais, gráficos em barras, taxa de conclusão, pesquisa e filtro por status, além de uma tabela de registros.

Carrega css/menu.css, css/app-pages.css, js/tema-compartilhado.js e js/dashboard.js na versão integrada. O JavaScript calcula os números com base em atende_solicitacoes.

solicitacoes.html
Permite criar, consultar, filtrar, atualizar o status e excluir solicitações. O formulário recebe dados como solicitante, setor, título, data e descrição. A tabela lista os chamados guardados no navegador.

Na versão integrada, a lógica é implementada em js/solicitacoes.js e o visual usa css/menu.css e css/app-pages.css.

suporte.html
É a central de ajuda para registrar dúvidas e problemas técnicos. O formulário solicita nome, e-mail, assunto e descrição. Os chamados enviados são adicionados à mesma coleção local usada por Solicitações.

Na versão integrada, usa js/suporte.js, além de css/menu.css e css/app-pages.css. Também contém atalhos para FAQ e Configurações.

configuracoes.html
Permite ajustar preferências da interface, como nome de exibição, departamento, tema claro/escuro, modo compacto e uma preferência de notificações.

As preferências são gravadas em localStorage sob a chave atende_preferencias. O nome de exibição, o tema e o modo compacto são lidos pelos scripts das páginas integradas.

Limite importante: a opção de notificações apenas guarda a preferência nesta versão. Ela não envia e-mails nem cria notificações reais.

faq.html
Reúne respostas para perguntas frequentes sobre acesso, chamados, suporte, dados e preferências. Inclui campo de pesquisa, botões de categoria e perguntas expansíveis.

O conteúdo das perguntas fica no HTML; js/faq.js faz os filtros, pesquisa e abertura/fechamento das respostas.

3. Arquivos CSS
css/style.css
É a folha de estilos original das telas de login e cadastro. Controla o layout de login, painel lateral, marca do produto, formulários, campos de senha, botões, mensagens de erro e regras responsivas.

Edite este arquivo quando: quiser mudar o visual do login ou do cadastro que ainda o utilizam.

css/menu.css
Define o estilo base das páginas integradas. Inclui a barra lateral, links de navegação, cabeçalho superior, perfil do usuário, cartões, indicadores, atalhos, rodapé, alguns elementos de Configurações/FAQ e as classes do tema escuro e modo compacto.

Edite este arquivo quando: quiser alterar o visual compartilhado do menu ou as regras gerais que as páginas integradas reaproveitam.

css/app-pages.css
Complementa menu.css nas páginas Dashboard, Solicitações e Suporte. Define elementos como:

cartões de indicadores;
formulários e campos;
tabelas e badges de status;
filtros de pesquisa;
barras de progresso;
gráficos em barras;
colunas de conteúdo;
estilos de tema escuro e modo compacto para os componentes dessas páginas.
É o arquivo principal para ajustar o visual interno dessas três páginas sem duplicar o CSS em cada HTML.

css/dash.css
É a folha de estilos anterior do Dashboard. Ela foi escrita para a estrutura antiga, incluindo classes como .dashboard-page, .topo e outras classes específicas daquela versão.

Se dashboard-atendimento-unificado.html estiver carregando menu.css e app-pages.css, dash.css pode não estar sendo usado pela página integrada. Não apague arquivos antigos sem verificar se algum HTML ainda referencia css/dash.css.

css/Solicitacoes.css
É a folha de estilos anterior da página Solicitações. Foi feita para classes como .solicitacoes-body, .solicitacoes-header, .solicitacoes-card e .tabela-solicitacoes.

Na página integrada que usa menu.css e app-pages.css, esse CSS antigo pode não ser necessário. Verifique o link rel="stylesheet" no HTML antes de removê-lo.

css/suporte.css
É a folha de estilos anterior da página Suporte, originalmente baseada em classes como .topbar, .hero, .help-card e .support-form. Se a página estiver usando a versão integrada com app-pages.css, o arquivo antigo poderá deixar de ser referenciado.

Como o tema escuro funciona no CSS
Os scripts aplicam a classe theme-dark ao elemento body quando a preferência salva tem tema: "escuro". As regras CSS que começam com .theme-dark alteram o fundo, os cartões, os campos e as cores do texto.

O modo compacto funciona de forma semelhante com a classe compact-mode. Para uma nova seção receber o tema escuro, adicione as regras correspondentes em menu.css ou app-pages.css.

4. Arquivos JavaScript
js/db.js
É o objeto de utilidades da versão original para operações locais com usuários, sessão e solicitações. No código apresentado, possui métodos como:

getUsers() — lê a lista de contas cadastradas em atende_users;
saveUsers(users) — grava a lista de usuários;
createUser(user) — verifica e adiciona uma conta local;
login(email, password) — compara as credenciais com os registros locais e cria uma sessão;
getSession() — recupera a sessão;
logout() — remove a sessão;
getRequests() e saveRequests(requests) — leem e gravam a coleção legada atende_requests;
addRequest(request) — adiciona um registro à coleção legada atende_requests.
Atenção à compatibilidade: as páginas integradas de Solicitações, Suporte e Dashboard usam a chave atende_solicitacoes, enquanto o método addRequest() mostrado na versão original de db.js usa atende_requests. São chaves diferentes e não sincronizam automaticamente. Para manter um único conjunto de chamados, use a chave adotada pelas páginas integradas ou atualize o db.js para usar a mesma chave.

js/login.js
Controla o envio do formulário de login e o botão de mostrar/esconder senha. Impede o recarregamento do formulário, lê e-mail e senha, chama DB.login() e exibe uma mensagem de sucesso ou erro. Quando o acesso é aceito, encaminha o usuário para menu.html.

O script depende dos IDs login-form, email, password, show-password e form-message existentes na página de login.

js/cadastro.js
Deve controlar o formulário de cadastro da página cadastro.html. Em conjunto com DB.createUser(), deve validar os dados, verificar a confirmação da senha, tentar cadastrar o usuário e mostrar uma mensagem para o resultado.

O script depende dos IDs register-form, name, email, password, confirm-password e register-message. Se esses IDs forem alterados no HTML, o JavaScript precisa ser atualizado também.

js/menu.js
Atualiza os indicadores e a tabela da página inicial. Lê atende_solicitacoes, interpreta os status, calcula totais, monta os registros recentes e utiliza atende_preferencias para o tema e modo compacto. Também atualiza o nome do cabeçalho a partir da sessão e das preferências.

O script depende dos IDs presentes em menu.html, como totalSolicitacoes, listaRecentes, taxaConclusao e barraConclusao.

js/dashboard.js
Lê os chamados de atende_solicitacoes, calcula totais por status, taxa de conclusão, barras de distribuição e linhas da tabela. Implementa a busca por palavras-chave e o filtro por status. Reage ao evento storage para atualizar a tela quando outra página da mesma origem alterar a coleção.

js/solicitacoes.js
É responsável pelo formulário e pela tabela de Solicitações. No código integrado, ele:

lê os registros existentes em atende_solicitacoes;
gera um protocolo para o novo chamado;
adiciona o chamado com status inicial Aberto;
atualiza os totais e a tabela;
permite filtrar, alterar status e excluir registros;
reage a alterações feitas em outra página da mesma origem.
js/suporte.js
Valida o formulário do Suporte, cria um protocolo, grava o chamado em atende_solicitacoes com origem: "suporte" e mostra os registros recentes enviados pelo formulário de suporte.

O uso da mesma chave é o que permite que esses chamados apareçam também na página Solicitações e nos indicadores do Dashboard.

js/configuracoes.js
Carrega as preferências atuais, preenche os campos e salva nome de exibição, departamento, tema, modo compacto e preferência por notificações em atende_preferencias. Também aplica o tema na própria página e permite restaurar as preferências padrão.

js/tema-compartilhado.js
É carregado nas páginas integradas que precisam refletir as preferências do usuário. Lê atende_preferencias, aplica as classes theme-dark e compact-mode, atualiza nome, e-mail e avatar quando há sessão e escuta alterações da chave atende_preferencias.

Ele não substitui o CSS: o JavaScript ativa as classes e o CSS define como elas ficam visualmente.

js/faq.js
Controla a pesquisa e a filtragem por categoria na FAQ, abre e fecha as respostas, atualiza as informações do usuário, aplica o tema salvo e implementa o botão de saída.

js/script.js
Se esse arquivo estiver vazio e nenhum HTML tiver uma linha como <script src="js/script.js" defer></script>, ele não participa do funcionamento atual. Não é necessário colocar código nele só por existir. Antes de apagá-lo, procure referências a esse caminho no projeto.

5. Dados salvos no navegador
O projeto usa diferentes chaves de localStorage. Cada chave é um nome independente: duas chaves com nomes diferentes não compartilham dados automaticamente.

Chave	Conteúdo usado	Onde aparece
atende_solicitacoes	Lista de chamados da versão integrada	Menu, Dashboard, Solicitações e Suporte
atende_preferencias	Nome de exibição, departamento, tema e outras preferências	Configurações e páginas integradas
atende_session	Dados básicos da sessão atual, como nome e e-mail	Cabeçalhos e fluxo de login original
atende_users	Lista local de usuários da versão original	db.js, login e cadastro
atende_requests	Lista de solicitações da versão original do db.js	Métodos legados de db.js, se ainda utilizados
usuarioLogado	Chave de compatibilidade com versões anteriores	Pode ser lida ou removida em código legado
O formato de cada chamado pode conter campos como:

{
  "id": "CH-101",
  "protocolo": "CH-101",
  "titulo": "Problema técnico",
  "solicitante": "Nome da pessoa",
  "email": "pessoa@exemplo.com",
  "setor": "Suporte",
  "descricao": "Descrição do problema",
  "data": "2026-10-28",
  "status": "Aberto",
  "origem": "suporte",
  "criadoEm": "2026-10-28T12:00:00.000Z"
}
Este objeto é apenas um exemplo de estrutura, não um chamado real. Os valores de data, protocolo e texto serão preenchidos no momento do envio do formulário.

Limites do localStorage
Os dados pertencem à origem do site e ao navegador em que foram gravados.
Abrir as páginas por caminhos diferentes, como file:// e Live Server, pode separar os dados.
Os registros não são compartilhados automaticamente com outros computadores ou usuários.
Limpar os dados do navegador pode apagar as informações.
O localStorage não deve ser usado como proteção de dados ou como autenticação segura.
6. Caminho de um chamado
Chamado enviado por Solicitações
O usuário preenche solicitacoes.html.
js/solicitacoes.js valida os campos e cria um protocolo.
O registro é salvo em atende_solicitacoes.
A tabela de Solicitações e seus indicadores são atualizados.
O Dashboard e o menu leem essa mesma coleção ao carregar ou quando recebem a alteração entre páginas da mesma origem.
Chamado enviado por Suporte
O usuário preenche o formulário em suporte.html.
js/suporte.js valida os campos e cria o protocolo.
O chamado é salvo em atende_solicitacoes com origem: "suporte".
Ele aparece na lista recente do Suporte, na tabela de Solicitações e no Dashboard.
Mudança de tema
O usuário abre configuracoes.html.
js/configuracoes.js salva as opções em atende_preferencias.
As páginas integradas leem a mesma chave ao abrir.
js/tema-compartilhado.js aplica theme-dark ou compact-mode ao body.
As regras de menu.css e app-pages.css mudam a aparência dos componentes.
7. Como escolher o arquivo correto para editar
Quero mudar...	Arquivo que normalmente devo editar
Texto, título, campo ou link de uma página	O HTML daquela página
Itens da barra lateral	HTML das páginas que exibem a barra lateral
Cor, espaçamento, fonte ou visual de cartões nas páginas integradas	css/menu.css e/ou css/app-pages.css
Layout do login ou do cadastro	css/style.css
Como é criado um chamado	js/solicitacoes.js ou js/suporte.js
Indicadores ou filtros do Dashboard	js/dashboard.js
Nome, tema ou modo compacto	js/configuracoes.js e js/tema-compartilhado.js
Pesquisa ou categorias da FAQ	faq.html e js/faq.js
Cadastro e login da versão original	js/db.js, js/login.js e js/cadastro.js
Nome da chave de armazenamento	Todos os scripts que leem ou gravam essa coleção
8. Cuidados ao fazer alterações
Preserve os IDs
Se um JavaScript procura document.getElementById("formSuporte"), o HTML precisa ter exatamente id="formSuporte". Se você renomear um ID, atualize todos os scripts que usam esse identificador.

Preserve os caminhos
Se o HTML contém src="js/dashboard.js", o arquivo precisa existir nesse local. Confirme maiúsculas e minúsculas nos nomes dos arquivos, especialmente quando o projeto é executado num ambiente Linux ou publicado num servidor.

Evite duplicar estilos
As páginas integradas já compartilham menu.css e app-pages.css. Se acrescentar outro CSS com regras muito genéricas, como body, header, input ou button, uma folha pode sobrescrever a aparência de outra. Prefira classes específicas, como .app-card ou .app-field.

Mantenha a chave dos chamados consistente
As páginas integradas usam atende_solicitacoes. A versão original de db.js usa atende_requests nos métodos antigos. Antes de criar mais uma funcionalidade de chamados em db.js, decida qual formato será usado e atualize todos os scripts envolvidos para não manter duas listas desconectadas.

Atualização entre páginas
O evento storage avisa outras páginas da mesma origem quando uma chave de localStorage muda. Ele não é disparado na própria página que realizou a gravação; por isso, o script que salva também deve atualizar a própria tabela ou seus indicadores.

Segurança
O db.js original guarda senhas em texto simples no localStorage. Isso é adequado apenas para demonstração de front-end. Um sistema real deve validar credenciais e permissões no servidor, armazenar senhas com hash seguro e não confiar apenas em JavaScript no navegador para proteger páginas ou dados.

9. Estrutura de pastas sugerida
Controle-de-Atendimento-Interno/
├── README.md
├── GUIA-CODIGOS-E-ARQUIVOS.md
├── index.html
├── login.html
├── cadastro.html
├── menu.html
├── dashboard-atendimento-unificado.html
├── solicitacoes.html
├── suporte.html
├── configuracoes.html
├── faq.html
├── css/
│   ├── style.css
│   ├── menu.css
│   ├── app-pages.css
│   ├── dash.css
│   ├── Solicitacoes.css
│   └── suporte.css
└── js/
    ├── db.js
    ├── login.js
    ├── cadastro.js
    ├── menu.js
    ├── dashboard.js
    ├── solicitacoes.js
    ├── suporte.js
    ├── configuracoes.js
    ├── faq.js
    ├── tema-compartilhado.js
    └── script.js
Essa é uma estrutura sugerida. Alguns arquivos antigos podem não estar sendo utilizados pela versão integrada atual. Antes de apagá-los, procure se algum HTML faz referência a eles.

10. Lista rápida de verificação
Quando algo parar de funcionar, confira nesta ordem:

O arquivo HTML está na pasta esperada?
Os caminhos dos estilos e scripts (href e src) estão corretos?
Os IDs do HTML correspondem aos usados pelo JavaScript?
O script está incluído com defer ou é executado depois que os elementos existem?
As páginas estão usando a mesma chave de localStorage?
O navegador está usando a mesma origem/servidor em todas as páginas?
Há algum erro na ferramenta de desenvolvedor do navegador (F12 → Console)?
O HTML carrega um CSS antigo que sobrescreve o novo estilo?
Se o problema envolver dados, faça primeiro o teste com um chamado de exemplo e confira a chave atende_solicitacoes no painel de armazenamento do navegador. Evite apagar o armazenamento se houver informações que você precisa preservar.

Documento de referência do projeto Atende+. Atualize este guia sempre que renomear arquivos, mudar a estrutura de dados ou adicionar uma nova página.

