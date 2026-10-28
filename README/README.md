Atende+ — Sistema de Controle de Atendimento Interno
O Atende+ é uma aplicação web de front-end para organizar solicitações e chamados internos de uma empresa. O projeto foi desenvolvido com HTML, CSS e JavaScript, com foco em uma interface moderna, responsiva e simples de usar.
Estado atual do projeto: versão front-end, com persistência local usando localStorage. Os registros ficam no navegador e na origem em que o site é aberto. Para compartilhar os chamados entre diferentes computadores ou usuários, será necessário adicionar um backend e um banco de dados.

Índice
- Objetivo
- Funcionalidades
- Tecnologias utilizadas
- Estrutura do projeto
- Como executar
- Como funciona a navegação
- Como funciona o registro de solicitações
- Tema e preferências
- Armazenamento local
- Principais arquivos
- Testes manuais
- Problemas comuns
- Segurança e limitações
- Próximas melhorias sugeridas
Objetivo
Centralizar o acompanhamento dos atendimentos internos, oferecendo páginas para consultar indicadores, cadastrar solicitações, registrar problemas e encontrar orientações. A navegação lateral mantém as áreas principais acessíveis em todas as telas integradas.
Funcionalidades
Início — menu.html
- Apresenta a visão geral do sistema.
- Mostra contadores de solicitações, pendências, atendimentos em andamento e concluídos.
- Exibe uma lista de solicitações recentes.
- Oferece atalhos para Dashboard, Solicitações, Suporte, Configurações e FAQ.
Dashboard — dashboard-atendimento-unificado.html
- Resume as solicitações cadastradas.
- Apresenta indicadores por status e taxa de conclusão.
- Permite pesquisar registros e filtrar por status.
- Usa a mesma coleção local de solicitações que as páginas de Solicitações e Suporte.
Solicitações — solicitacoes.html
- Permite registrar uma solicitação com solicitante, setor, título, data e descrição.
- Exibe os registros existentes.
- Permite pesquisar e filtrar chamados.
- Permite atualizar o status e excluir registros locais.
- Atualiza os indicadores conforme os dados salvos.
Suporte — suporte.html
- Oferece um formulário para dúvidas e problemas técnicos.
- Registra o chamado na mesma lista usada pela página Solicitações.
- Exibe os chamados recentes enviados pelo formulário de suporte.
- Fornece atalhos para a FAQ e Configurações.
Configurações — configuracoes.html
- Permite definir um nome de exibição.
- Permite alternar entre tema claro e escuro.
- Permite ativar o modo compacto.
- Guarda preferências no navegador.
- Não altera a senha nem os dados originais de cadastro da conta.
FAQ / Ajuda — faq.html
- Reúne respostas para dúvidas sobre acesso, solicitações, suporte e armazenamento.
- Permite pesquisar perguntas por palavra-chave.
- Permite filtrar as perguntas por categoria.
- Oferece um link direto para a página Suporte.
Login e cadastro
O projeto também pode conter as páginas index.html, login.html e cadastro.html, além dos arquivos js/db.js, js/login.js e js/cadastro.js. Esses arquivos fazem parte do fluxo de entrada e cadastro da versão existente do repositório. Confira os nomes dos arquivos usados nos links antes de publicar o projeto.
Tecnologias utilizadas
- HTML5 — estrutura e conteúdo das páginas.
- CSS3 — layout responsivo, cartões, tabelas, formulários, cores e temas.
- JavaScript — interações, filtros, validação dos formulários e atualização das telas.
- localStorage — persistência local de preferências e solicitações no navegador.
- Visual Studio Code — ambiente recomendado para editar o projeto.
- Live Server — extensão recomendada para servir as páginas localmente durante o desenvolvimento.
Não há, nesta versão, API, banco de dados remoto ou servidor de aplicação. A fonte do Google Fonts é usada pelo CSS para carregar as famílias DM Sans e Manrope; se não houver conexão, o navegador utilizará fontes alternativas.
Estrutura do projeto
A organização esperada para as páginas integradas é semelhante a esta:
Controle-de-Atendimento-Interno/
├── index.html                         # Entrada/login, se adotado no projeto
├── login.html                         # Login, se mantido separadamente
├── cadastro.html                      # Cadastro de usuário
├── menu.html                          # Página inicial
├── dashboard-atendimento-unificado.html
├── solicitacoes.html
├── suporte.html
├── configuracoes.html
├── faq.html
├── css/
│   ├── style.css                      # Estilos da tela de login/cadastro
│   ├── menu.css                       # Menu lateral e estilos base compartilhados
│   ├── app-pages.css                  # Componentes compartilhados das páginas integradas
│   ├── dash.css                       # Estilo antigo do dashboard; pode não ser usado pela versão integrada
│   └── Solicitacoes.css               # Estilo antigo das solicitações; pode não ser usado pela versão integrada
└── js/
    ├── db.js                          # Lógica local de usuários/sessão da versão original
    ├── login.js                       # Lógica da tela de login
    ├── cadastro.js                    # Lógica da tela de cadastro
    ├── menu.js                        # Indicadores e tabela do menu
    ├── dashboard.js                   # Indicadores, filtros e tabela do dashboard
    ├── solicitacoes.js                # Registro e gestão dos chamados
    ├── suporte.js                     # Registro de chamados pelo suporte
    ├── configuracoes.js               # Preferências do usuário
    ├── faq.js                         # Pesquisa e filtros de FAQ
    └── tema-compartilhado.js           # Aplica tema e preferências nas páginas integradas
Importante: a estrutura pode variar conforme as versões de HTML que já existem no repositório. Os nomes e caminhos em href e src devem corresponder exatamente aos arquivos presentes no projeto, inclusive maiúsculas e minúsculas quando o ambiente as diferencia.
Como executar
Opção recomendada — Visual Studio Code e Live Server
1. Abra o repositório Controle-de-Atendimento-Interno no Visual Studio Code.
2. Confira se as pastas css/ e js/ estão no mesmo nível dos arquivos HTML.
3. Instale a extensão Live Server, caso ainda não esteja instalada.
4. Clique com o botão direito no arquivo de entrada do projeto — geralmente index.html ou login.html, dependendo da versão — e selecione Open with Live Server.
5. Acesse o endereço local aberto pelo Live Server.
6. Comece pela tela de login ou abra menu.html diretamente para testar a interface, caso não esteja testando autenticação.
Não misture origens diferentes. Por exemplo, evite abrir algumas páginas com file:// e outras pelo Live Server. O localStorage é separado por origem; por isso, páginas abertas de maneiras diferentes podem parecer não compartilhar os mesmos registros.
Testar sem autenticação
Durante o desenvolvimento visual, abra menu.html pelo mesmo servidor local. Isso testa a navegação e o dashboard sem depender do fluxo de login. Esse acesso direto não representa controle de acesso seguro: a proteção de páginas precisa ser implementada no servidor em uma futura versão.
Como funciona a navegação
As páginas integradas utilizam uma barra lateral com estas opções:
1. Início — menu.html
2. Dashboard — dashboard-atendimento-unificado.html
3. Solicitações — solicitacoes.html
4. Suporte — suporte.html
5. Configurações — configuracoes.html
6. FAQ / Ajuda — faq.html
Os links são definidos no HTML. Ao criar ou renomear uma página, atualize os links correspondentes em todas as páginas para que a navegação continue funcionando.
Como funciona o registro de solicitações
O registro é feito no navegador usando a chave atende_solicitacoes do localStorage.
- O formulário da página Solicitações cria um chamado.
- O formulário da página Suporte também cria um chamado na mesma coleção, identificando sua origem.
- O Dashboard lê a coleção para montar os indicadores e a tabela.
- A página Início usa a coleção para mostrar os totais e os registros recentes.
- Alterar o status em Solicitações muda o mesmo registro que o Dashboard consulta.
Os chamados podem conter campos como id, protocolo, titulo, solicitante, setor, descricao, data, status, origem e criadoEm. Alguns campos podem variar em registros antigos.

Os estados são interpretados por categorias equivalentes a:
Categoria	Exemplos de status	Significado
Aberta / pendente	Aberto, Pendente	Aguarda atendimento
Em andamento	Em Atendimento, Em andamento	Está em processamento
Resolvida	Resolvido, Concluída	Atendimento finalizado
Cancelada	Cancelado	Solicitação cancelada


As telas normalizam variações comuns para somar os indicadores. Para evitar divergência, prefira usar esses status de maneira consistente.
Tema e preferências
A tela Configurações guarda opções em localStorage na chave atende_preferencias. As outras páginas integradas leem essa mesma chave.

Exemplo da estrutura de preferências:
{
  "nomeExibicao": "Usuário",
  "departamento": "Tecnologia da Informação",
  "tema": "escuro",
  "modoCompacto": false,
  "notificacoes": false
}
- tema: use claro ou escuro.
- modoCompacto: true reduz espaçamentos; false usa o espaçamento normal.
- nomeExibicao: nome mostrado no cabeçalho das páginas, quando o script da página o suporta.
- departamento: informação de preferência; não substitui os dados do usuário no servidor.
- notificacoes: guarda a preferência do usuário, mas não envia notificações reais nesta versão.
O arquivo js/tema-compartilhado.js é incluído nas páginas integradas por meio de script com defer. Para que o tema seja aplicado corretamente, preserve a inclusão do arquivo e o nome da chave atende_preferencias.
Armazenamento local
As chaves mais importantes atualmente usadas pelo projeto são:
Chave	Uso
atende_solicitacoes	Lista de solicitações e chamados
atende_preferencias	Tema, modo compacto e outras preferências de interface
atende_session	Dados básicos da sessão na versão de login existente
atende_users	Contas criadas pela lógica local original, se esse fluxo estiver habilitado


O navegador mantém os dados localmente. Eles não sincronizam por padrão entre dispositivos, perfis de navegador ou origens diferentes. Limpar os dados do site pode apagar registros e preferências.

Para inspecionar os dados durante o desenvolvimento, abra as ferramentas do navegador (F12) e procure Application (ou Armazenamento) → Local Storage → origem do projeto. Não altere os valores manualmente sem antes fazer uma cópia se os dados forem importantes.
Principais arquivos
Arquivo	Responsabilidade
menu.html	Estrutura da página inicial
css/menu.css	Menu lateral, cabeçalho, cartões e estilos base
js/menu.js	Indicadores e tabela de solicitações recentes da página inicial
dashboard-atendimento-unificado.html	Estrutura dos indicadores e da tabela do dashboard
css/app-pages.css	Estilos compartilhados do Dashboard, Solicitações e Suporte
js/dashboard.js	Filtros, indicadores e tabela de dados do dashboard
solicitacoes.html	Formulário e tabela de solicitações
js/solicitacoes.js	Gravação, pesquisa, filtros, alteração de status e exclusão local
suporte.html	Formulário e orientações de suporte
js/suporte.js	Gravação de chamados de suporte e lista de recentes
configuracoes.html	Interface de preferências
js/configuracoes.js	Carregamento e persistência das preferências
faq.html	Página de perguntas frequentes
js/faq.js	Pesquisa, filtros e abrir/fechar respostas
js/tema-compartilhado.js	Aplica tema e modo compacto nas telas integradas
js/db.js	Módulo local de usuários/sessão da versão original; não é um banco de dados de servidor


Testes manuais
Após executar o projeto pelo Live Server, faça estes testes:
Navegação
- Abra cada uma das seis páginas pelo menu lateral.
- Confirme que o item da página atual aparece destacado.
- Abra FAQ e Configurações a partir de Dashboard, Solicitações e Suporte.
- Teste os links de retorno e os botões de sair.
Preferências visuais
- Acesse Configurações e altere o tema para escuro.
- Salve e abra Início, Dashboard, Solicitações e Suporte.
- Confirme que o tema continua aplicado.
- Ative o modo compacto e verifique o espaçamento das telas.
- Restaure o tema claro e salve novamente.
Solicitações
- Registre um chamado pela página Solicitações.
- Confirme que aparece na tabela e nos indicadores do Dashboard e Início.
- Registre outro chamado pelo Suporte.
- Confirme que aparece em Solicitações e Dashboard.
- Altere o status de um chamado e confira os indicadores após abrir ou atualizar o Dashboard.
- Teste pesquisa, filtro e exclusão.
FAQ
- Pesquise termos como senha, chamado ou suporte.
- Selecione diferentes categorias.
- Abra e feche as perguntas.
- Limpe a pesquisa e confira se todas as perguntas voltam a aparecer.
Problemas comuns
A página abre sem estilo
- Verifique se o arquivo CSS realmente existe na pasta css/.
- Confirme se o HTML referencia o nome correto, por exemplo css/app-pages.css.
- Verifique erros de caminho e o painel Console nas ferramentas do navegador.
Os links não funcionam
- Confira se os arquivos HTML têm exatamente os nomes indicados nos links.
- Veja se o login do projeto se chama index.html ou login.html e ajuste o redirecionamento de saída conforme o nome real.
- Confira a grafia dos nomes em ambientes que diferenciam maiúsculas e minúsculas.
O tema não muda em uma página
- Confirme que a página inclui css/menu.css, css/app-pages.css quando necessário e js/tema-compartilhado.js.
- Confira se Configurações está salvando atende_preferencias com tema: "escuro" ou tema: "claro".
- Recarregue a página e verifique se o CSS contém as regras de .theme-dark.
Os chamados não aparecem em todas as telas
- Confirme que as páginas usam a mesma chave atende_solicitacoes.
- Abra todas as páginas na mesma origem do Live Server.
- Verifique erros no Console e confirme que o armazenamento local não está bloqueado ou cheio.
- Registros antigos podem ter nomes de campos ou status diferentes; compare-os com os campos listados acima.
O login não redireciona corretamente
A versão existente pode ter mais de um arquivo de entrada (index.html e login.html). Verifique qual deles contém o formulário de login e ajuste os links de entrada, cadastro e saída para apontarem para o arquivo que realmente existe.
Segurança e limitações
- Front-end apenas: os dados e a lógica estão no navegador. Não há API ou banco de dados remoto nesta versão.
- Dados locais: as solicitações e preferências não sincronizam entre computadores ou usuários.
- Login de demonstração: se as contas e senhas forem armazenadas no localStorage, esse mecanismo não é adequado para produção. Não armazene senhas reais em texto puro no navegador.
- Sem autorização no servidor: ocultar páginas ou botões com JavaScript não protege dados. Um sistema real precisa validar autenticação e permissões no servidor.
- E-mail e notificações: não são enviados automaticamente. É necessária uma integração de servidor para enviar mensagens ou alertas reais.
- Privacidade: use dados fictícios durante testes e evite registrar informações pessoais sensíveis.
- Backups: o localStorage pode ser apagado pelo navegador; não o utilize como única cópia de dados importantes.
Próximas melhorias sugeridas
1. Criar um backend (por exemplo, Django, Node.js ou outra tecnologia adotada pela equipe).
2. Usar um banco de dados central para solicitações, contas e histórico de alterações.
3. Implementar autenticação segura no servidor, armazenamento de senhas com hash e controle de permissões.
4. Adicionar envio de e-mails e notificações reais.
5. Criar histórico de atendimento, atribuição de responsáveis, prioridade, prazos e auditoria de mudanças.
6. Adicionar testes automatizados e validação de acessibilidade.
7. Publicar a aplicação em um ambiente de hospedagem com HTTPS.
Autoria e contexto
Atende+ — Controle de Atendimento Interno
Projeto desenvolvido como aplicação front-end, com foco em organização, usabilidade e integração visual entre as páginas.
Para começar rapidamente: abra o projeto no VS Code, execute index.html ou login.html usando Live Server, entre na página inicial e teste primeiro a navegação, depois as preferências de tema e o registro de chamados.