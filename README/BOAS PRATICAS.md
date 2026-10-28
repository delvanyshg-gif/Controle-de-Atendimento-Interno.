Boas práticas de desenvolvimento — Atende+
Este documento reúne recomendações para manter o Atende+ organizado, compreensível, consistente e mais seguro durante o desenvolvimento. O projeto utiliza HTML, CSS e JavaScript no front-end e, nesta versão, armazena parte dos dados no localStorage do navegador.
Importante: estas práticas ajudam na organização e na qualidade do código, mas não transformam o protótipo atual em um sistema seguro para produção. Para uso real por várias pessoas, será necessário implementar um backend, autenticação e armazenamento adequados.

1. Organização dos arquivos
Mantenha cada responsabilidade no lugar correto e evite criar cópias desnecessárias de páginas ou scripts.
Controle-de-Atendimento-Interno/
├── README.md
├── GUIA-CODIGOS-E-ARQUIVOS.md
├── BOAS-PRATICAS-DESENVOLVIMENTO.md
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
│   └── app-pages.css
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
    └── tema-compartilhado.js
A estrutura acima é uma referência. Se algum arquivo não existir ainda, não é necessário criá-lo apenas para preencher a árvore. Antes de renomear ou mover um arquivo, atualize também todos os caminhos que o referenciam nos HTMLs.
Regras de organização
- HTML define a estrutura e o conteúdo da página.
- CSS define aparência, espaçamento, cores e adaptação a diferentes tamanhos de tela.
- JavaScript controla interações, validações e atualização dos dados.
- Evite colocar grandes blocos de CSS ou JavaScript diretamente dentro do HTML, exceto em testes rápidos.
- Use nomes claros e consistentes, por exemplo, tema-compartilhado.js para a lógica de tema usada em várias páginas.
- Remova arquivos vazios ou obsoletos somente depois de confirmar que nenhum HTML ou script ainda os utiliza.
2. HTML semântico e acessível
Um HTML bem estruturado é mais fácil de entender, testar e manter.
- Declare <!DOCTYPE html> e o idioma da página (<html lang="pt-BR">).
- Inclua a codificação UTF-8 e a configuração de viewport para dispositivos móveis.
- Use elementos semânticos quando fizer sentido: <header>, <nav>, <main>, <section>, <article> e <footer>.
- Cada campo de formulário deve possuir um <label> associado ao seu id.
- Use o tipo de campo apropriado, como email, date e password.
- Botões que executam ações devem usar <button type="button"> ou <button type="submit">, conforme sua finalidade.
- Use aria-live="polite" em áreas que exibem mensagens de sucesso ou erro dinamicamente.
- Não utilize apenas cor para comunicar o status; inclua também texto, como “Aberto” ou “Resolvido”.
- Garanta que os elementos possam ser utilizados pelo teclado e que o foco seja visível.
Exemplo de campo corretamente associado ao rótulo:
<div class="app-field">
    <label for="titulo">Título da solicitação *</label>
    <input
        id="titulo"
        name="titulo"
        type="text"
        maxlength="140"
        required
    >
</div>
3. CSS consistente e responsivo
O Atende+ possui várias páginas que devem compartilhar o mesmo padrão visual.
- Reutilize variáveis CSS para cores e valores compartilhados.
- Deixe estilos compartilhados em arquivos como menu.css e app-pages.css, e estilos muito específicos em arquivos próprios quando necessário.
- Evite repetir regras iguais em várias folhas de estilo.
- Prefira classes claras, como .app-card, .app-button e .nav-item, a seletores excessivamente complexos.
- Evite usar estilos inline em muitos elementos; prefira classes reutilizáveis.
- Teste a página em desktop, tablet e celular. Use media queries para ajustar colunas, menus e tabelas.
- Para tabelas com muitas colunas, permita rolagem horizontal em telas pequenas.
- Verifique contraste entre texto e fundo nos temas claro e escuro.
- Não altere uma variável de cor global sem testar todas as páginas que dependem dela.
Exemplo de variáveis compartilhadas:
:root {
    --primary: #3569e8;
    --primary-dark: #2455cc;
    --background: #f5f7fb;
    --surface: #ffffff;
    --text: #26334d;
    --muted: #7b879d;
    --border: #e6ebf3;
}
Boas práticas para o tema compartilhado
- Utilize uma única chave para preferências, como atende_preferencias.
- Guarde o tema em uma propriedade consistente, por exemplo tema: "claro" ou tema: "escuro".
- Todas as páginas devem ler a mesma preferência e aplicar as mesmas classes CSS.
- Evite criar chaves independentes como tema_dashboard, tema_suporte e tema_solicitacoes; isso faria as páginas divergirem.
- Depois de mudar o tema em Configurações, teste Início, Dashboard, Solicitações, Suporte e FAQ.
4. JavaScript organizado e previsível
- Dê nomes claros a funções e variáveis, por exemplo atualizarIndicadores() ou lerSolicitacoes().
- Evite duplicar a mesma função em arquivos diferentes quando ela puder ser reutilizada com segurança.
- Use const por padrão e let apenas quando o valor precisar ser reatribuído.
- Separe a leitura dos dados, a validação, o salvamento e a renderização em funções distintas.
- Use addEventListener() para eventos, em vez de misturar lógica de negócio com HTML inline.
- Verifique se os elementos existem antes de tentar manipulá-los, especialmente em scripts usados por mais de uma página.
- Trate erros de leitura e gravação de dados; o navegador pode bloquear ou não conseguir gravar no armazenamento.
- Evite eval() e não execute código recebido do usuário.
- Não utilize innerHTML para inserir nomes, descrições ou outros textos fornecidos pelo usuário. Prefira textContent para evitar interpretar o texto como HTML.
Exemplo de renderização segura de um título:
const tituloElemento = document.createElement("td");
tituloElemento.textContent = solicitacao.titulo || "Sem título";
linha.appendChild(tituloElemento);
5. Dados compartilhados entre as páginas
No protótipo, as páginas compartilham solicitações pela chave atende_solicitacoes do localStorage.

Para evitar inconsistências:
- Use a mesma chave em Solicitações, Suporte e Dashboard.
- Padronize os campos de cada registro. Um formato de referência é:
{
    id: "CH-101",
    titulo: "Problema de acesso",
    solicitante: "Nome da pessoa",
    email: "pessoa@exemplo.com",
    setor: "Suporte",
    descricao: "Descrição do problema",
    data: "2026-10-28",
    status: "Aberto",
    origem: "suporte",
    criadoEm: new Date().toISOString()
}
- Preserve o mesmo tipo de identificador em todas as operações. Se a tabela usa id, a atualização e a exclusão também devem localizar o registro pelo id.
- Gere identificadores sem depender apenas da quantidade de registros, porque excluir itens pode causar duplicações. Verifique os IDs já existentes ou adote um identificador único.
- Não salve um chamado antes de validar os campos obrigatórios.
- Atualize os indicadores após criar, alterar ou excluir um chamado.
- Teste registros criados tanto em Solicitações quanto em Suporte.
- Se duas páginas estiverem abertas em abas diferentes, o evento storage pode ajudar a avisar a outra aba sobre alterações. Na mesma aba, atualize a interface explicitamente após salvar.
Limitações do localStorage
O localStorage é adequado para protótipos e demonstrações simples, mas tem limitações importantes:
- Os dados ficam no navegador e na origem utilizada; não são automaticamente sincronizados entre computadores ou usuários.
- Limpar os dados do site pode apagar os registros.
- Não oferece controle de acesso por registro nem substitui uma base de dados no servidor.
- Não é apropriado para armazenar senhas, tokens sensíveis ou informações pessoais que exijam proteção.
- Não garante, por si só, integridade, auditoria ou cópias de segurança.
Para usar o Atende+ em uma empresa de verdade, planeje uma API/backend com autenticação, autorização por perfil, banco de dados e rotinas de backup.
6. Segurança de login e cadastro
Ponto importante do estado atual do projeto: se db.js grava senhas diretamente no localStorage, isso serve apenas como demonstração didática e não deve ser considerado autenticação segura. Qualquer pessoa com acesso ao navegador pode inspecionar os dados locais.

Para uma versão de produção:
- Nunca armazene senhas em texto puro no navegador ou em uma base de dados.
- Faça autenticação no servidor usando mecanismos estabelecidos e armazenamento de senhas com hash apropriado.
- Valide no servidor os dados enviados pelos usuários; validação no JavaScript pode ser contornada.
- Implemente autorização no backend para garantir que usuários só vejam e alterem o que têm permissão para acessar.
- Use HTTPS em produção.
- Não confie em dados de sessão modificáveis pelo cliente para autorizar operações.
- Evite exibir informações internas ou detalhes técnicos desnecessários em mensagens de erro.
- Não envie senhas, chaves de API ou dados sensíveis para o GitHub.
A opção “Lembrar de mim” só deve ser implementada quando houver um fluxo de sessão apropriado. Não se deve manter uma senha em armazenamento local para simular uma sessão persistente.
7. Formulários e validação
- Marque campos essenciais com required e escolha limites adequados com maxlength.
- Para textos de descrição, defina limites de tamanho e mostre mensagens claras ao usuário.
- Use trim() para remover espaços no início e no fim de valores textuais antes de salvar.
- Não dependa somente da validação do navegador; ao implementar backend, repita a validação no servidor.
- Após um envio bem-sucedido, informe o protocolo gerado e limpe o formulário.
- Em caso de erro, mantenha os dados digitados sempre que possível e explique como corrigir.
- Não afirme que um chamado foi enviado por e-mail se o código apenas o salvou no localStorage.
8. Navegação e consistência entre páginas
- Mantenha o menu lateral com as mesmas opções em todas as páginas internas: Início, Dashboard, Solicitações, Suporte, Configurações e FAQ/Ajuda.
- Marque a página atual com uma classe, como active, e, quando adequado, aria-current="page".
- Confira os caminhos dos links depois de mover ou renomear arquivos.
- Use links de navegação para mudar de página e botões para executar ações.
- O botão Sair deve limpar apenas a sessão, não apagar todas as contas, preferências ou solicitações.
- Ao adicionar uma nova página, atualize a navegação das páginas internas e a documentação.
9. Git e GitHub
Faça alterações pequenas e frequentes, com mensagens que expliquem o que foi modificado.
Fluxo recomendado
git status
git add menu.html css/menu.css js/menu.js
git commit -m "Padroniza navegação do Atende+"
git push origin main
Antes do git add, confira a saída de git status para saber quais arquivos serão incluídos. Se outras pessoas trabalham no repositório, sincronize com as alterações remotas antes de iniciar um trabalho que possa entrar em conflito.
Boas mensagens de commit
Exemplos:
- Adiciona página de FAQ
- Compartilha tema entre as páginas
- Corrige atualização do status de chamados
- Melhora responsividade do dashboard
- Documenta estrutura e boas práticas
Evite mensagens vagas como alterações, arruma tudo ou versão final.
Antes de fazer push
- Confirme que os arquivos corretos foram salvos.
- Rode os testes manuais principais.
- Verifique se não incluiu senhas, tokens, dados reais de usuários ou arquivos temporários.
- Confira git diff para revisar o que realmente mudou.
10. Testes manuais recomendados
Execute estes testes sempre que alterar o menu, os estilos compartilhados ou os scripts de solicitações.
Navegação
- [ ] Início abre o menu.
- [ ] Todos os links do menu lateral levam à página correta.
- [ ] Configurações e FAQ estão disponíveis no Dashboard, em Solicitações e no Suporte.
- [ ] A página atual está destacada no menu.
- [ ] Sair retorna ao login e não apaga os chamados.
Tema e preferências
- [ ] O tema claro aparece corretamente em todas as páginas.
- [ ] O tema escuro altera fundo, cartões, campos, tabelas e texto.
- [ ] Atualizar a página mantém a preferência salva.
- [ ] O modo compacto não quebra formulários nem tabelas.
- [ ] O nome de exibição não sobrepõe o e-mail em telas pequenas.
Solicitações e suporte
- [ ] O formulário bloqueia campos obrigatórios vazios.
- [ ] Um chamado enviado pelo Suporte aparece em Solicitações.
- [ ] Um chamado registrado em Solicitações aparece no Dashboard.
- [ ] Alterar status atualiza os indicadores.
- [ ] Busca e filtro funcionam juntos.
- [ ] Excluir solicitações pede confirmação.
- [ ] A tabela mostra uma mensagem compreensível quando está vazia.
Layout e acessibilidade
- [ ] Teste a tela em largura de desktop e celular.
- [ ] Não há rolagem horizontal indesejada na página inteira.
- [ ] Campos possuem rótulos e botões são utilizáveis pelo teclado.
- [ ] O foco do teclado é visível.
- [ ] Mensagens de sucesso e erro ficam visíveis.
- [ ] O contraste continua legível no tema claro e no escuro.
11. Depuração de problemas
Quando algo parar de funcionar, siga esta ordem:
1. Salve os arquivos com Ctrl + S e recarregue a página.
2. Abra as ferramentas do navegador (F12) e consulte Console para localizar erros de JavaScript.
3. Na aba Network/Rede, verifique se CSS e JavaScript foram carregados e se os caminhos retornam sucesso.
4. Confira se o HTML referencia o nome correto do arquivo, incluindo letras maiúsculas/minúsculas e extensão.
5. Verifique se os IDs usados pelo JavaScript existem no HTML e não estão duplicados.
6. Confira se todas as páginas utilizam as mesmas chaves de armazenamento.
7. Teste em dados de demonstração antes de mexer em dados que você queira preservar.
Não apague todo o localStorage como primeira tentativa: isso pode remover contas de demonstração, preferências e solicitações. Se precisar limpar dados, faça primeiro uma cópia dos registros que deseja manter.
12. Acordos para manter o projeto sustentável
Antes de aceitar uma alteração, confira:
- A mudança resolve um problema ou requisito concreto?
- Ela reutiliza componentes e estilos existentes quando apropriado?
- Os nomes e formatos de dados continuam consistentes?
- Dashboard, Solicitações e Suporte continuam conectados?
- O tema e a navegação ainda funcionam em todas as páginas?
- A mudança foi testada em desktop e celular?
- A documentação foi atualizada se a estrutura ou o comportamento mudou?
13. Melhorias recomendadas para a próxima versão
Quando o protótipo estiver estável, as próximas etapas podem ser:
1. Criar uma API/backend e banco de dados centralizado para compartilhar chamados entre usuários.
2. Implementar autenticação segura e permissões, por exemplo usuário comum e administrador.
3. Criar histórico de alterações, responsável pelo atendimento e prioridade do chamado.
4. Implementar notificações e envio de e-mail por um serviço de backend.
5. Adicionar testes automatizados e um processo de validação antes de publicar alterações.
6. Planejar backups, logs e políticas de tratamento de dados pessoais.
Resumo
O principal objetivo das boas práticas é garantir que o Atende+ permaneça consistente, fácil de manter, testável e transparente sobre suas limitações. No estágio atual, mantenha HTML, CSS e JavaScript organizados, centralize as preferências e as solicitações e teste os fluxos principais após cada modificação. Antes de utilizar dados reais ou disponibilizar o sistema para uma empresa, implemente a infraestrutura de segurança e persistência necessária.