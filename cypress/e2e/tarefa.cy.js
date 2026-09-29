describe('Gerenciador de Lista de Tarefas', () => {

  beforeEach(() => {
    // Limpa o localStorage antes de cada teste para garantir isolamento
    cy.clearLocalStorage()
    
    // Visita a página HTML local (ajuste o caminho de acordo com o seu servidor local)
    cy.visit('index2.html')
  })

  it('Deve exibir o estado inicial com a lista vazia', () => {
    // Verifica se a mensagem de lista vazia está visível
    cy.get('[data-cy="empty-message"]').should('be.visible').and('have.text', 'Nenhuma tarefa cadastrada.')
    
    // Verifica o contador
    cy.get('[data-cy="task-count"]').should('have.text', '0 tarefas')
  })

  it('Deve validar mensagem de erro ao tentar enviar o formulário incompleto', () => {
    // Clica no botão de adicionar sem preencher nada
    cy.get('[data-cy="add-button"]').click()

    // Verifica se a mensagem de erro foi exibida
    cy.get('[data-cy="error-message"]')
      .should('be.visible')
      .and('contain', 'Preencha todos os campos antes de adicionar a tarefa.')
  })

  it('Deve cadastrar uma nova tarefa com sucesso', () => {
    // Preenche os campos do formulário
    cy.get('[data-cy="task-title"]').type('Estudar Cypress para a Atividade')
    cy.get('[data-cy="task-responsible"]').type('Fulano de Tal')
    cy.get('[data-cy="task-priority"]').select('Alta')
    cy.get('[data-cy="status-completed"]').check() // Marca o status como Concluída
    cy.get('[data-cy="task-description"]').type('Criar suíte de testes ponta a ponta.')

    // Submete o formulário
    cy.get('[data-cy="add-button"]').click()

    // Valida se o card foi renderizado
    cy.get('[data-cy="task-card"]').should('have.length', 1)
    
    // Valida os dados exibidos no card
    cy.get('[data-cy="card-title"]').should('have.text', 'Estudar Cypress para a Atividade')
    cy.get('[data-cy="task-card"]').should('contain', 'Responsável: Fulano de Tal')
    cy.get('[data-cy="task-card"]').should('contain', 'Prioridade: Alta')
    cy.get('[data-cy="task-card"]').should('contain', 'Status: Concluída')
    cy.get('[data-cy="task-card"]').should('contain', 'Descrição: Criar suíte de testes ponta a ponta.')

    // Verifica se o contador atualizou
    cy.get('[data-cy="task-count"]').should('have.text', '1 tarefa')
  })

  it('Deve limpar o formulário ao clicar no botão "Limpar formulário"', () => {
    // Preenche alguns campos
    cy.get('[data-cy="task-title"]').type('Tarefa Temporária')
    cy.get('[data-cy="task-responsible"]').type('Ciclano')

    // Clica no botão limpar
    cy.get('[data-cy="clear-button"]').click()

    // Verifica se os campos resetaram
    cy.get('[data-cy="task-title"]').should('have.value', '')
    cy.get('[data-cy="task-responsible"]').should('have.value', '')
    cy.get('[data-cy="status-pending"]').should('be.checked')
  })

})
