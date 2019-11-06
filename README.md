<h1 align="center">
    ☁ Salesforce MarketCloud Custom Activity
</h1>

<h4 align="center">
    ☕ Code and coffee
</h4>

## 💻 Projeto

[Salesforce MarketCloud](https://www.salesforce.com/br/products/marketing-cloud/platform/) Custom Activity

### 🚀 Funcionalidades

* 📬 [Disparo de WhatsApp HSM](https://github.com/lennonalvesdias/journey-builder-custom-activity/tree/whatsapp-hsm)

## 👨‍🏫 Como usar

### Configure seu web service

- Faça um fork desse repositório
- Realize login no [Heroku](https://heroku.com/)
- Clique em `New` > `Create new app`
- Nomeie a aplicação e clique em `Create App`
- Escolha o seu método preferido de *deployment* (Github, Heroku Cli)
- Clique em `Deploy branch`
- Assim que finalizar o `deploy`, clique no botão `View` e verifique se você vê a mensagem de boas-vindas

### Configura seu pacote no Marketing Cloud

- Entre no `Marketing Cloud` e navegue para `Administration` > `Account` > `Installed Packages`
- Clique em `New` e insira o nome e a descrição do seu pacote
- Copie o valor do `JWT Secret` da `Summary page` e salve para utilizar mais tarde
- Clique em `Add Component`, selecione `Journey Builder Activity` e clique em `next`
- Insira a informação sobre a `activity`, insira o *endpoint* da sua aplicação
- Clique em salve
- Copie a `Unique Key` do `Journey Builder Activity` e salve para utilizar mais tarde

### Configurar a Activity

- No `/public/config.json`
    - Atualizar a chave `applicationExtensionKey` com o valor da `Unique Key`
    - Substituir os valores das chaves de `url` com o *endpoint* da sua aplicação

### Configurar o Heroku

- Entre na sua *dashboard* do Heroku
- Clique em `Settings`
- Clique em `Reveal config vars`
- Adicione uma nova variavel chamada `jwtSecret` e copie o valor do seu `JWT Secret` obtido no `Marketing Cloud`.

### Teste a sua atividade

- Realize login no `Marketing Cloud` e navegue em `Journey Builder`
- Você poderá visualizar a sua `Custom Activity` e arraste para a tela

## 🤔 Como contribuir

- Faça um fork desse repositório
- Cria uma branch com a sua feature: `git checkout -b minha-feature`
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`
- Faça push para a sua branch: `git push origin minha-feature`

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

[lennonalves.com.br](https://lennonalves.com.br/)