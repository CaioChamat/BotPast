const https = require('https');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const ANUNCIOS_POR_CICLO = parseInt(process.env.ANUNCIOS_POR_CICLO || '1', 10);
const DELAY_ENTRE_MSGS_MS = parseInt(process.env.DELAY_ENTRE_MSGS_MS || '3000', 10);

const PRODUTOS = [
  { titulo: '🚀 Multiprocessador Philco Turbo 5 EM 1 - 900W!', link: 'https://meli.la/2JompFT', precoAntigo: 'R$ 300', preco: 'R$ 200' },
  { titulo: '🧤 Luva de Látex Descartável 100 unidades', link: 'https://meli.la/1yzJoXc' },
  { titulo: '👧 Vestido Festa Junina Infantil - Arraia Caipira!', link: 'https://meli.la/1waphYV' },
  { titulo: '🎮 Controle DualSense PS5 Branco Sem Fio', link: 'https://meli.la/1rdJduG' },
  { titulo: '🩴 Chinelo Havaianas - Conforto e Estilo!', link: 'https://meli.la/1T1afcS' },
  { titulo: '🚿 Chuveiro Lorenzetti Eletrônico 7500W', link: 'https://meli.la/2wDZci7' },
  { titulo: '📱 Samsung Galaxy A07 128GB 50MP + 4GB RAM', link: 'https://meli.la/1nb2ieq' },
  { titulo: '🔧 Parafusadeira Kit Completo + 2 Baterias + Maleta', link: 'https://meli.la/1SGwYiQ' },
  { titulo: '👟 Tênis Sneeks Feminino - Casual & Academia!', link: 'https://meli.la/1z1KkhD' },
  { titulo: '🧥 Jaqueta Puffer Térmica Bobojaco', link: 'https://meli.la/1VHi3hX' },
  { titulo: '🇧🇷 Camisa Seleção Canarinho 26/27 - Lançamento!', link: 'https://meli.la/2BTqKU1' },
  { titulo: '🔌 Extensão Elétrica 6 Tomadas + Filtro 2m', link: 'https://meli.la/1Z9nk9G' },
  { titulo: '🪞 Espelho Corpo Inteiro Moldura Caramelo/Preto', link: 'https://meli.la/13cWSjy' },
  { titulo: '💇 Wella Smoothening Oil 100ml Profissional', link: 'https://meli.la/1xnUNpY' },
  { titulo: '🧴 Kit Azzaro Pour Homme EDT 100mL + Gel', link: 'https://meli.la/1vjfmaD' },
  { titulo: '🚿 Lavadora Alta Pressão Vonder 1300 Libras', link: 'https://meli.la/2LSzdLj' },
  { titulo: '📚 Kit Livro de Colorir Comfy Cozy - Capa Dura', link: 'https://meli.la/1PrFrVn' },
  { titulo: '🖱️ Mouse Sem Fio Recarregável', link: 'https://meli.la/2eDj57M', precoAntigo: 'R$ 32,90', preco: 'R$ 22,81' },
  { titulo: '🖱️ Mouse Gamer Titorion MG001 Óptico 7200DPI', link: 'https://meli.la/1mrx61N', precoAntigo: 'R$ 121,40', preco: 'R$ 66,41' },
  { titulo: '🖱️ Mouse Gamer Havit Ms1034 4800DPI', link: 'https://meli.la/21XP373', precoAntigo: 'R$ 67,83', preco: 'R$ 56,28' },
  { titulo: '🖱️ Mouse Gamer Sem Fio Logitech G703 LIGHTSPEED', link: 'https://meli.la/2yiYwMR', precoAntigo: 'R$ 589,90', preco: 'R$ 524,98' },
  { titulo: '🎮 Volante Gamer G920 Driving Force', link: 'https://meli.la/24k75aH', precoAntigo: 'R$ 1.999,90', preco: 'R$ 1.776,67' },
  { titulo: '🖥️ Monitor LG UltraGear 24G411A-B 24" FHD 144Hz', link: 'https://meli.la/2bBsVc7', precoAntigo: 'R$ 749', preco: 'R$ 689' },
  { titulo: '🖥️ Monitor 19" LED Widescreen HDMI VGA 75HZ', link: 'https://meli.la/2LgmcUu', preco: 'R$ 236' },
  { titulo: '🖥️ Monitor Viewpro MWV21 LED 21.5" Full HD', link: 'https://meli.la/1XAp1aG', precoAntigo: 'R$ 699', preco: 'R$ 286' },
  { titulo: '🖥️ Monitor PC Gamer LG 24" IPS Full HD 100Hz', link: 'https://meli.la/1ZiPnJ8', precoAntigo: 'R$ 770', preco: 'R$ 549,84' },
  { titulo: '🖥️ Monitor LG UltraGear 27G411A-B 27" FHD 144Hz', link: 'https://meli.la/1P2dXoH', preco: 'R$ 1.098,12' },
  { titulo: '🖥️ Monitor Gamer Samsung Odyssey G5 32" QHD 165Hz', link: 'https://meli.la/14RS8e3', precoAntigo: 'R$ 1.599', preco: 'R$ 1.100' },
  { titulo: '🖥️ Monitor Gamer AOC AGON G42 24" 200Hz', link: 'https://meli.la/1ZHi4mN', precoAntigo: 'R$ 1.284,29', preco: 'R$ 929' },
  { titulo: '🖥️ Monitor Alltek 21.5" Full HD VA 100Hz', link: 'https://meli.la/1AZDznh', preco: 'R$ 378' },
  { titulo: '🖥️ Monitor Gaming LED Curva 23.6" 100Hz', link: 'https://meli.la/2y2rSfN', precoAntigo: 'R$ 886,99', preco: 'R$ 549,99' },
  { titulo: '🖥️ Bicicleta Ergométrica Fitness 6kg Inércia', link: 'https://meli.la/2dJ6Uv5', precoAntigo: 'R$ 1.094,99', preco: 'R$ 549,90' },
  { titulo: '🪑 Cadeira Gamer com Apoio de Pés Level Preta Healer', link: 'https://meli.la/1bB3hNV', precoAntigo: 'R$ 670,41', preco: 'R$ 436,41' },
  { titulo: '🖱️ Mouse Gamer Redragon Cobra', link: 'https://meli.la/1ofQ2vM', precoAntigo: 'R$ 143,43', preco: 'R$ 88,19' },
  { titulo: '💪 Creatina Monohidratada 500g Growth Supplements', link: 'https://meli.la/2XitDnp', precoAntigo: 'R$ 104,90', preco: 'R$ 66,90' },
  { titulo: '💪 Creatina Monohidratada 250g Growth Supplements', link: 'https://meli.la/1VuoEc5', precoAntigo: 'R$ 64,90', preco: 'R$ 39,90' },
  { titulo: '💪 Creatina Monohidratada Growth Creapure 250g', link: 'https://meli.la/2WDRrCF', preco: 'R$ 77,99' },
  { titulo: '💪 Creatina Monohidratada Pura 1kg Dark Lab', link: 'https://meli.la/11yyZDJ', precoAntigo: 'R$ 159,90', preco: 'R$ 69,90' },
  { titulo: '💪 Creatina 1kg Soldiers Nutrition 100% Pura', link: 'https://meli.la/1V8VBsy', precoAntigo: 'R$ 239,90', preco: 'R$ 59,90' },
  { titulo: '💪 Creatina Ultra 300g FTW', link: 'https://meli.la/24uYNR1', precoAntigo: 'R$ 45', preco: 'R$ 19,90' },
  { titulo: '💪 Creatina Monohidratada 500g Dark Lab', link: 'https://meli.la/1d8wTcZ', precoAntigo: 'R$ 129,90', preco: 'R$ 44,90' },
];

const FRASES_CHAMADA = [
  '🔥 Achado imperdível! Corre que o estoque voa!',
  '💸 Desconto assim é raro — garanta o seu!',
  '⚡ Oferta-relâmpago! Não deixa passar!',
  '🎯 Achadinho do dia — confere agora!',
  '🏷️ Preço baixou! É hora de aproveitar!',
  '🚨 Últimas unidades — quem chegar primeiro, leva!',
  '💰 Economia garantida — link na bio!',
  '🛒 Clique e garanta antes que acabe!',
  '🤩 Promoção especial, só por tempo limitado!',
  '👀 Achou que não ia ver? Olha isso aqui!',
];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sorteiaFrase() {
  return FRASES_CHAMADA[Math.floor(Math.random() * FRASES_CHAMADA.length)];
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function callTelegram(method, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const req = https.request({
      hostname: 'api.telegram.org',
      path: `/bot${BOT_TOKEN}/${method}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.ok) {
            resolve(parsed);
          } else {
            reject(new Error(`Telegram API error: ${parsed.description || JSON.stringify(parsed)}`));
          }
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function enviarMensagem(produto) {
  const frase = sorteiaFrase();
  const titulo = produto.titulo.replace(/[<>&]/g, '').trim();
  const link = produto.link;

  const linhas = [titulo];

  if (produto.precoAntigo || produto.preco) {
    const antigo = produto.precoAntigo ? `De ${produto.precoAntigo}` : '';
    const novo = produto.preco || '';
    const desconto = calcularDesconto(produto.precoAntigo, produto.preco);

    let precoTexto = '';
    if (antigo && novo) {
      precoTexto = `De ${antigo} por ${novo}${desconto ? ` (${desconto})` : ''}`;
    } else if (novo) {
      precoTexto = `Por ${novo}`;
    }
    if (precoTexto) linhas.push(precoTexto);
  }

  linhas.push('Link: https://www.mercadolivre.com.br', link, '', frase);

  const texto = linhas.join('\n');

  const r = await callTelegram('sendMessage', {
    chat_id: CHAT_ID,
    text: texto,
    disable_web_page_preview: false,
  });

  console.log(`Enviado: "${titulo.substring(0, 40)}..." — message_id=${r.result?.message_id}`);
  return r;
}

function calcularDesconto(precoAntigo, precoNovo) {
  if (!precoAntigo || !precoNovo) return '';

  const valorAntigo = Number(String(precoAntigo).replace(/[^\d,.-]/g, '').replace(',', '.'));
  const valorNovo = Number(String(precoNovo).replace(/[^\d,.-]/g, '').replace(',', '.'));

  if (Number.isFinite(valorAntigo) && Number.isFinite(valorNovo) && valorAntigo > 0) {
    const pct = Math.round(((valorAntigo - valorNovo) / valorAntigo) * 100);
    return `-${pct}%`;
  }
  return '';
}

async function rodarCiclo() {
  if (!BOT_TOKEN) throw new Error('Variável BOT_TOKEN não definida');
  if (!CHAT_ID) throw new Error('Variável CHAT_ID não definida');

  console.log(`Bot iniciado — ${PRODUTOS.length} produtos, ${ANUNCIOS_POR_CICLO} por ciclo`);

  const selecionados = shuffle(PRODUTOS).slice(0, Math.min(ANUNCIOS_POR_CICLO, PRODUTOS.length));

  for (const produto of selecionados) {
    try {
      await enviarMensagem(produto);
    } catch (e) {
      console.error(`❌ Erro ao enviar "${produto.titulo.substring(0, 40)}":`, e.message);
    }
    await delay(DELAY_ENTRE_MSGS_MS);
  }

  console.log('✅ Ciclo completo.');
}

(async () => {
  try {
    await rodarCiclo();
    console.log('Execucao finalizada com sucesso. Ate a proxima!');
    process.exit(0);
  } catch (err) {
    console.error('FALHA GERAL:', err.message);
    process.exit(1);
  }
})();
