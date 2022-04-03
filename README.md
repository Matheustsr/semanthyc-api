# SEMANTHYC (ecommerce API) 

1. Baixar o projeto: `git clone git@github.com:Matheustsr/semanthyc-api.git`
2. Rodar `nvm install 16`
3. Rodar `nvm use` na raiz do projeto
4. Rodar `yarn add nodemon`
5. Renomear o arquivo `.env.example` para `.env`<br>
	5.1 toda a conexão com o banco deve ser colocada neste arquivo e também em src/config/database.js<br>
	5.2 Utilizei uma instancia do postgres no Heroku para o desenvolvimento. Caso precisem das credenciais para evitar este esforço basta me procurar, esta base de dados ja possui algumas informações populadas por mim durante o periodo de desenvolvimento<br>
6. Rodar o comando `yarn install` na raiz do projeto para pegar todas as dependencias
7. Rodar o comando `yarn start:dev` na raiz do projeto
8. Rode todas as migrations.

Este é o link para a documentação da API:https://documenter.getpostman.com/view/15986286/UVsJvS3Z <br>
Este é o link para a collection no postman:https://www.getpostman.com/collections/0f877402b2c015f0e32c<br>
