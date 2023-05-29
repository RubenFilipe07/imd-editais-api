# imd-editais-api

<h3>Sobre:</h3>
<p>Uma api que retorna dados dos editais de vagas do IMD/UFRN.</p>

<h3>Como executar?</h3>
<ol>
  <li>Instale o node.js: <a href="https://nodejs.org/">nodejs.org</a> </li>
  <li>Na raiz do projeto execute<code>npm i</code> para instalar as dependências</li>
  <li>Execute <code>node index.js</code> para iniciar a aplicação</li>
  <li>O projeto rodará em: <code>https://localhost:443/</code></li>
</ol>

    
<h3>Endpoints</h3>
<code>GET localhost:443/api/ </code>retorna informações das rotas. <br/> 

<code>GET localhost:443/api/editais </code> retorna informações dos editais em andamento. Exemplo: <br/> 

```json
[
  {
    "id": "1000",
    "titulo": "003/2023 - Projeto Exemplo",
    "tituloExtendido": "EDITAL 003/2023 - Projeto Exemplo - IMD/UFRN",
    "link": "https://metropoledigital.ufrn.br/portal/visualizar/1000",
    "prazoInscricao": "17/05/2023",
    "tipo": "Bolsas de Pesquisa"
  }
]
```
<code>GET localhost:443/api/edital:id </code> retorna informações de um edital baseado em seu id. Exemplo: <br/> 

```json
{
  "titulo": "003/2023 - Projeto Exemplo",
  "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacinia enim. Mauris hendrerit nunc at bibendum tempus. Nullam a odio sit amet turpis facilisis interdum ac vitae neque.",
  "editalSelecao": [
    {
      "titulo": "Edital de Seleção",
      "link": "https://metropoledigital.ufrn.br/portal/processoSeletivo/downloadPorNome?nome=1234"
    }
  ],
  "editais": [
    {
      "titulo": "Edital de Seleção",
      "link": "https://metropoledigital.ufrn.br/portal/processoSeletivo/downloadPorNome?nome=1234"
    },
    {
      "titulo": "Resultado de seleção",
      "link": "https://metropoledigital.ufrn.br/portal/processoSeletivo/downloadPorNome?nome=5678"
    }
  ]
}
```



<h3>Tecnologias utilizadas</h3>

<a href="https://nodejs.org/">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
</a> <br/>

<a href="https://expressjs.com/">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
</a> <br/>

<a href="https://pptr.dev/">
  <img src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=Puppeteer&logoColor=white"/>
</a> <br/>

<a href="https://www.npmjs.com/package/cors">
  <img src="https://img.shields.io/badge/Cors-000000?style=for-the-badge"/>
</a>  
