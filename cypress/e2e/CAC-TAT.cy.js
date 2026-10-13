describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.visit('./src/index.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it.only('Exibe mensagem de erro ao submenter o formulario sem ter preenchido campos obrigatorios', () =>{
    cy.clock()
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('Preenche os campos obrigatorios e envia o formulario', () => {
    cy.clock()
    const longText = Cypress._.repeat('asdsagfds', 10)
    
    cy.get('#firstName').type('João V')  // pega o elemento com id firstName e digita João V
    cy.get('#lastName').type('Takayama')  // pega o elemento com id lastName e digita Takayama
    cy.get('#email').type('joaoht123@gmail.com')  // pega o elemento com id email e digita o email
    cy.get('#open-text-area').type(longText, { delay: 0 })  // pega o elemento com id open-text-area e digita o texto
    cy.contains('button', 'Enviar').click()  // procura o botão com o texto Enviar e clica nele

    cy.tick(3000)  // faz o relógio avançar 3 segundos
  })

/*
  it.only('envia formulario com sucesso usando comando customizado', () => {
    const testar ={
      firstName: 'João V',
      lastName: 'Takayama',
      email: 'joaoht123@gmail.com',
      text: 'Escrevendo dentro do textarea'

    }
    cy.fillMandatoryFieldsAndSubmit(testar)   // se passarmos um valor como data ele vai usar oq esta dentro de data, caso nao passe ele vai usar o valor padrao q esta dentro do comando customizado
    cy.get('.success').should('be.visible')   // se usar o parametro usa oq esta nele se nao vai para default q é oq esta no customizado
  })

  */

  it('Seleciona um produto por seu valor (value)', () => {
    cy.get('#product')    // pq usar o #product? pq é o id do select, se fosse uma class seria .product, se fosse uma tag seria product
      .select('mentoria') //mentoria é uma das opçoes q tem no drop para selecionar, usa o select para selecionar ele
      .should('have.value', 'mentoria')   // usa o should have.value se tiver o valor de, mentoria entao ta ok
  })

  /*
  it('Seleciona um produto por seu indice', () => {
    cy.get('#product')
      .select(1) 
      .should('have.value', 'blog')   // se tiver o valor de blog no indice 1 entao esta certo
  })
      */
     
/*
  it.only('Selecionando uma opçao de checkbox', () => {
    cy.get('input[type="radio"][value ="feedback"]')  // pega o input q seja do tipo radio e q tenha valor de feedback
      .check()              // faz o check do checkbox
      .should('be.checked')  // verifica se o checkbox esta marcado
  })
      */

  /*

  it.only('Selecionando cada tipo de checkbox', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
        .check()
        .should('be.checked')
        
      })
  })
      */

  it('Marcando e desmarcando um checkbox', () => {
    cy.get('input[type="checkbox"]')    // pega todos os checkbox do tip input
      .check()
      .should('be.checked')
      .last()     //pega o ultimo elemento da checkbox
      .uncheck()  // desmarca o ultimo elemento
      .should('not.be.checked')   //se o ultimo elemento estiver desmarcado esta correto

  //  cy.get('#email-checkbox').check()   // aqui ele vai marcar esse checkbox
  //  cy.get('#phone-checkbox').check()   // aqui ele vai marcar esse checkbox
   })

/*
   it.only('Selecionando um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')  // seleciona o arquivo da pasta fixtures
    .should((input) => {
      expect(input[0].files[0].name).to.equal('example.json')  // verifica se o nome do arquivo é igual a example.json
      })          //esta pegando do input e pegando o file na posicao 0 e verificando se o nome é esse to.eqaul
    })

    */

    it('Selecionando um arquivo simulando drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})  // esse é o arquivo q esta fazendo o upload
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')  // verifica se o nome do arquivo é igual a example.json
      })  
    })

    it('Selecionando um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('sampleFile')    // vai olhar em fixtures e pegar o arquivo com o nome passado aqui e .as('novo nome dele como um apelido')
      cy.get('#file-upload')
      .selectFile('@sampleFile', {action: 'drag-drop'})  // em vez de colocar o link onde estaria o arquivo passa o "apelido" q é o alias dele q foi definido logo a cima
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')  // verifica se o nome do arquivo é igual a example.json
      })  
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade')  // procura o link com o texto "Política de Privacidade"
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')  // verifica se o link tem o atributo target com o valor _blank para abrir noca guia
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.contains('a', 'Política de Privacidade')  // procura o link com o texto "Política de Privacidade"
      .invoke('removeAttr', 'target')
      .click()
      
      cy.contains('h1', 'CAC TAT')
      .should('be.visible')  // verifica se o h1 com o texto "CAC TAT - Política de privacidade" está visível
    })

    it.only('Exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')

      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it.only('Faz uma requisição HTTP', () => {
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')  // faz uma requisição HTTP para a URL especificada
        .as('getRequest')  // dá um apelido para a requisição
        .its('status')
        .should('be.equal', 200)
       
      cy.get('@getRequest')  
        .its('statusText')
        .should('be.equal', 'OK')
      cy.get('@getRequest')
        .its('body')
        .should('include', 'CAC TAT')  
         })

    it.only('Encontra gato escondido', () => {
      cy.get('#cat')
        .invoke('show')
        .should('be.visible')

      cy.get('#title')
        .invoke('text', 'CAT TAT')
      
      cy.get('#subtitle')
        .invoke('text', 'eu gosto de gato')
        .should('be.visible')
    })
})
  


//cy.visit('URL do site q vou visitar') - visita uma página
//cy.title().should('be.equal', 'Titulo esperado q seja da pagina') - pega o título da página .should ele vai
//  tentar ate achar o titulo se nao passa 4 segs ele retorna o erro

//fillMandatoryFieldsAndSubmit() - é um comando customizado criado no arquivo commands.js dentro de support

// oq faz o it.only é que ele vai rodar apenas esse teste, ignorando os outros, útil para quando vc quer focar em um teste específico
//oq acontece se tiver 2 it.only? ele vai rodar os 2 testes, ignorando os outros

// oq seria um alias? é um apelido para um elemento, para poder usar ele em outros lugares, como por exemplo no caso do arquivo, ele vai dar um alias para o arquivo e depois vai usar esse alias para fazer o upload do arquivo

//oq seria o drag-drop? é uma ação q simula o arrastar e soltar do arquivo, ou seja, ele vai arrastar o arquivo e soltar no local onde ele vai fazer o upload

//para links em vez de usar cy.get usa cy.contains('link', 'texto do link') - ele vai procurar o link com o texto especificado
//verificar diversos modos de shoul()
//should('be.visible') - verifica se o elemento está visível
//should('not.be.visible') - verifica se o elemento não está visível
//should('be.checked') - verifica se o elemento está marcado
//should('not.be.checked') - verifica se o elemento não está marcado
//should('have.value', 'valor esperado') - verifica se o elemento tem o valor esperado
//should(input) => 