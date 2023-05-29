const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
const port = 443;


app.get('/', (req, res) => res.redirect('/api'));

app.get('/api', (req, res) => {
  res.send(`
    <h1>API vagas imd</h1>
    <p>Rotas:</p>
    <ul>
        <li><a href="/api/edital/:id">/api/edital/:id</a></li>
        <li><a href="/api/editais">/api/editais</a></li>
    </ul>
    `);
});

app.get('/api/editais', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto('https://metropoledigital.ufrn.br/portal/editais');

    const data = await page.evaluate(() => {
      const rawData = document.querySelectorAll('.box-editais-andamentos > .card > .card-body > a');

      const data = Array.from(rawData).map((d) => ({
        id: d.getAttribute('href').match(/(\d+)/g)[0],
        titulo: d.querySelector('span.text-white').innerText,
        tituloExtendido: d.querySelector('.card-title ').innerText,
        link: 'https://metropoledigital.ufrn.br' + d.getAttribute('href'),
        prazoInscricao: d.querySelector('.card-text').innerText.match(/(\d{2}\/\d{2}\/\d{4})/g)[0],
        tipo: d.querySelector('small').innerText
      }));
      return data;
    });

    await browser.close();

    res.send(data);
  } catch (error) {
    res.status(500).send('Erro ao obter dados dos editais');
  }
});



app.get('/api/edital/:id', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(`https://metropoledigital.ufrn.br/portal/visualizar/${req.params.id}`);

    const data = await page.evaluate(() => {
      const rawData = document.querySelector('.mt-4');

      const data = {
        titulo: rawData.querySelector('.titulo-noticia').innerText,
        descricao: rawData.querySelector('.conteudo-noticia').innerText,
        periodoProcesso: rawData.querySelectorAll('div.col-12.col-lg-8.px-4.pt-4 > p:nth-child(4)').innerText,
        editalSelecao: [{
          titulo: rawData.querySelector('.tb_noticias td:nth-child(2)').innerText,
          link: rawData.querySelector('.tb_noticias .text-left:nth-child(3) a').getAttribute('href'),
        }],
        editais: Array.from(rawData.querySelectorAll('.tb_noticias tr')).map((d) => ({
          titulo: d.querySelector('td:nth-child(2)').innerText,
          link: d.querySelector('.text-left:nth-child(3) a').getAttribute('href'),
        }))

      };
      return data;
    });


    await browser.close();

    res.send(data);
  } catch (error) {
    res.status(500).send('Erro ao obter dados do edital');
  }
});



app.listen(port, () => console.log(`App listening on port ${port}!`));
