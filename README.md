# 💻Cadastro-De-Client-API

## 🛠️:cloud: Inicialização

* Para conseguir rodar esta API, é preciso fazer algumas configurações previas.

### :one: Primeira etapa

É preciso criar um banco de dados <strong><i>postgresql</i></strong>, onde todos os dados são amarzenados. Então no exemplo abaixo irei utilizar o <a href="https://dbeaver.io/download/">dbeaver</a>. Após abrir o <a href="https://dbeaver.io/download/">dbeaver</a>, você se deparará com está tela:

<div>
  <img src="https://user-images.githubusercontent.com/101361395/226995412-664a41aa-b1dc-4fb0-b078-f78779523222.png"/>
</div>

<p>Você precisará clicar no canto superio esquerdo, onde é mostrado na imagem abaixo, e selecionar o postgresql e avançar.</p>

<div>
  <img src="https://user-images.githubusercontent.com/101361395/227004042-b71d3686-3e26-4625-981c-da0f0cc2467b.png"/>
</div>

<p>Abrirá um outro model de configuração do banco. você precisará prencher o campo <strong>password</strong> com a senha criada na instalção do programa, clicar no botão <strong>Test Connection</strong> e se der tudo certo, pode clicar em <strong>concluir</strong>.</p>

<div>
  <img src="https://user-images.githubusercontent.com/101361395/227006529-8fb5d2fd-442f-4eb2-a45b-2f15be5dbc04.png"/>
</div>

Para criar uma base de dados, você precisará selecionar a opção <strong>SQL</strong> na barra de opções a cima e precisará utilisar um comando SQL demostrado na imagem abaixo.

<div>
  <img src="https://user-images.githubusercontent.com/101361395/227008368-c54b5b76-8cda-42b4-a912-f358b7c2b225.png"/>
</div>

### :two: Segunda etapa

1. **Fazer o clone do repositório neste link:** https://github.com/Leo-neves20/cadastro-de-clientes-express-M6-.git <br>
2. **Abra o terminal e dê o comando "yarn" ou "npm i"** <br>
3. **faça uma copia do arquivo <i>.env.example</i> e preencha com os dados do seu banco postgres.** <br>
<div>
  <img src="https://user-images.githubusercontent.com/101361395/227014435-3076fc0e-6e9f-45c5-a8cd-7288a7aca487.png"/>
</div>

**O banco, se você não alterou, irá rodar na porta 5432 e no host localhost. Você irá preencher os demais campos com os dados da seu banco**


