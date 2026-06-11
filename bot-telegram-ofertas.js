const https = require('https');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const ANUNCIOS_POR_CICLO = parseInt(process.env.ANUNCIOS_POR_CICLO || '2', 10);
const DELAY_ENTRE_MSGS_MS = parseInt(process.env.DELAY_ENTRE_MSGS_MS || '3000', 10);

const PRODUTOS = [
  // Mercado Livre
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
  { titulo: '🚲 Bicicleta Ergométrica Fitness 6kg Inércia', link: 'https://meli.la/2dJ6Uv5', precoAntigo: 'R$ 1.094,99', preco: 'R$ 549,90' },
  { titulo: '🪑 Cadeira Gamer com Apoio de Pés Level Preta Healer', link: 'https://meli.la/1bB3hNV', precoAntigo: 'R$ 670,41', preco: 'R$ 436,41' },
  { titulo: '🖱️ Mouse Gamer Redragon Cobra', link: 'https://meli.la/1ofQ2vM', precoAntigo: 'R$ 143,43', preco: 'R$ 88,19' },
  { titulo: '💪 Creatina Monohidratada 500g Growth Supplements', link: 'https://meli.la/2XitDnp', precoAntigo: 'R$ 104,90', preco: 'R$ 66,90' },
  { titulo: '💪 Creatina Monohidratada 250g Growth Supplements', link: 'https://meli.la/1VuoEc5', precoAntigo: 'R$ 64,90', preco: 'R$ 39,90' },
  { titulo: '💪 Creatina Monohidratada Growth Creapure 250g', link: 'https://meli.la/2WDRrCF', preco: 'R$ 77,99' },
  { titulo: '💪 Creatina Monohidratada Pura 1kg Dark Lab', link: 'https://meli.la/11yyZDJ', precoAntigo: 'R$ 159,90', preco: 'R$ 69,90' },
  { titulo: '💪 Creatina 1kg Soldiers Nutrition 100% Pura', link: 'https://meli.la/1V8VBsy', precoAntigo: 'R$ 239,90', preco: 'R$ 59,90' },
  { titulo: '💪 Creatina Ultra 300g FTW', link: 'https://meli.la/24uYNR1', precoAntigo: 'R$ 45', preco: 'R$ 19,90' },
  { titulo: '💪 Creatina Monohidratada 500g Dark Lab', link: 'https://meli.la/1d8wTcZ', precoAntigo: 'R$ 129,90', preco: 'R$ 44,90' },

  // Notebooks extras
  { titulo: '💻 Notebook Asus Vivobook Go 15 Ryzen 5 7520U 16GB 512GB', link: 'https://meli.la/2vr3Wqa', precoAntigo: 'R$ 3.899', preco: 'R$ 3.185' },
  { titulo: '💻 Notebook ASUS Vivobook Go 15 E1504 Ryzen 5 7520U 8GB 256GB', link: 'https://meli.la/2yrvNhu', precoAntigo: 'R$ 3.220', preco: 'R$ 2.909' },
  { titulo: '💻 Notebook Acer Aspire Go 15 i5-13420H 8GB DDR5 256GB', link: 'https://meli.la/2Pwkdox', precoAntigo: 'R$ 5.717', preco: 'R$ 3.599' },
  { titulo: '💻 Notebook Acer Aspire 5 Ryzen 5 5500U 16GB DDR4 512GB SSD 15,6"', link: 'https://meli.la/2smXvw2', precoAntigo: 'R$ 5.799', preco: 'R$ 3.812' },
  { titulo: '💻 Notebook ASUS Vivobook 15 i5-1334U 8GB 256GB SSD 15,6" FHD', link: 'https://meli.la/2f47mkZ', precoAntigo: 'R$ 5.427', preco: 'R$ 3.508' },
  { titulo: '💻 Notebook Gamer Lenovo LOQ 15irx9 i5-13450HX 16GB 512GB RTX 3050', link: 'https://meli.la/2oTYRu9', precoAntigo: 'R$ 9.509', preco: 'R$ 5.779' },
  { titulo: '💻 Notebook Lenovo Yoga Slim 7i Ultra 5 125H 16GB 512GB Windows 11', link: 'https://meli.la/2HNq32t', precoAntigo: 'R$ 10.000', preco: 'R$ 6.299' },
  { titulo: '💻 Notebook Acer Nitro V15 Ryzen 7 7735HS 16GB RTX 4050 1TB', link: 'https://meli.la/2f4rBSn', precoAntigo: 'R$ 12.499', preco: 'R$ 6.303' },
  { titulo: '💻 Notebook Gamer Lenovo LOQ 15IRX9 i5-13450HX RTX 3050 8GB 512GB', link: 'https://meli.la/1zzotpL', precoAntigo: 'R$ 7.299', preco: 'R$ 5.799' },
  { titulo: '💻 Notebook Gamer ASUS TUF A15 Ryzen 7 RTX 3050 8GB 512GB', link: 'https://meli.la/1A6JYUa', preco: 'R$ 5.999' },
  { titulo: '💻 Notebook Lenovo Ideapad Slim 3 i7-13620H 16GB 512GB SSD', link: 'https://meli.la/2HWd9sB', precoAntigo: 'R$ 5.499', preco: 'R$ 4.399' },

  // AliExpress
  { titulo: '⌨️ Teclado Magnético Akko Tac75 He', link: 'https://s.click.aliexpress.com/e/_c3Werx0v', preco: 'R$ 189' },
  { titulo: '🎮 Controle G6 Multi Platform Esports Gamepad', link: 'https://s.click.aliexpress.com/e/_c4VmmZ8p', precoAntigo: 'R$ 139', preco: 'R$ 50,24' },
  { titulo: '⌨️ Teclado Mecânico Akko AULA-F75 Sem Fio', link: 'https://s.click.aliexpress.com/e/_c44QuRWz', precoAntigo: 'R$ 635,34', preco: 'R$ 286,13' },
  { titulo: '⌨️ Teclado Mecânico 60% Akko K500-B61', link: 'https://s.click.aliexpress.com/e/_c4toGRgh', precoAntigo: 'R$ 318,01', preco: 'R$ 143,30' },
  { titulo: '💾 SSD 2.5" 64GB-512GB Para Notebook', link: 'https://s.click.aliexpress.com/e/_c3jxVvCp', precoAntigo: 'R$ 164,02', preco: 'R$ 68,08' },
  { titulo: '💾 SSD NVMe M.2 2280 PCIe 3.0 250GB-2TB', link: 'https://s.click.aliexpress.com/e/_c4ke6OHf', precoAntigo: 'R$ 839,95', preco: 'R$ 514,12' },
  { titulo: '🎯 Placa-mãe X99 + Xeon E5-2630 V4 Kit', link: 'https://s.click.aliexpress.com/e/_c4F72Wlf', precoAntigo: 'R$ 859', preco: 'R$ 380' },
  { titulo: '🎯 Placa-mãe X99 + Xeon E5-2630 V4 Com TPM 2.0', link: 'https://s.click.aliexpress.com/e/_c3LWGz3R', precoAntigo: 'R$ 812,21', preco: 'R$ 359,69' },
  { titulo: '🎧 Fone TWS A6S Bluetooth', link: 'https://s.click.aliexpress.com/e/_c3fKSgCl', precoAntigo: 'R$ 38,94', preco: 'R$ 6,74' },
  { titulo: '🎧 Fone Bluetooth MCHOSE V9 Pro', link: 'https://s.click.aliexpress.com/e/_c3hYtsHR', precoAntigo: 'R$ 577,58', preco: 'R$ 234,97' },
  { titulo: '🎮 Controle Gamepad G6 Multi Plataforma', link: 'https://s.click.aliexpress.com/e/_c3HklnRJ', precoAntigo: 'R$ 449', preco: 'R$ 341,23' },
  { titulo: '💻 Placa de Vídeo RX 590 8GB GDDR5', link: 'https://s.click.aliexpress.com/e/_c3jls1YD', precoAntigo: 'R$ 1.164,46', preco: 'R$ 884,99' },
  { titulo: '💻 Placa de Vídeo RX 6500 XT 4GB GDDR6', link: 'https://s.click.aliexpress.com/e/_c3TmcR7X', precoAntigo: 'R$ 1.164,05', preco: 'R$ 690,59' },
  { titulo: '💻 Placa de Vídeo RX 580 8GB', link: 'https://s.click.aliexpress.com/e/_c37uGTNL', preco: 'R$ 650,88' },
  { titulo: '💻 Placa de Vídeo RX 5500 XT 8GB', link: 'https://s.click.aliexpress.com/e/_c3MnXmhP', precoAntigo: 'R$ 1.254,71', preco: 'R$ 927,49' },
  { titulo: '💻 Placa de Vídeo RX 5500 XT 8GB Veineda', link: 'https://s.click.aliexpress.com/e/_c4Lh4qWp', precoAntigo: 'R$ 1.251,85', preco: 'R$ 912,88' },
  { titulo: '🔧 Placa-mãe Jieshuo X99-JS12 TPM 2.0 DDR4', link: 'https://s.click.aliexpress.com/e/_c3kWehfr', precoAntigo: 'R$ 1.444,26', preco: 'R$ 966,63' },
  { titulo: '💻 Placa de Vídeo RX 580 8GB MLLSE', link: 'https://s.click.aliexpress.com/e/_c3MtUMmD', precoAntigo: 'R$ 1.397,80', preco: 'R$ 642,99' },
  { titulo: '🔋 Bateria Recarregável Warvank X8 Type-C 500mAh', link: 'https://s.click.aliexpress.com/e/_c4pHl45P', precoAntigo: 'R$ 101,07', preco: 'R$ 30,54' },
  { titulo: '🎮 Console Portátil Retrô Arcos R36S', link: 'https://s.click.aliexpress.com/e/_c3yIwKnj', precoAntigo: 'R$ 343,10', preco: 'R$ 133,75' },
  { titulo: '⌨️ Teclado Mecânico Yindiao K500', link: 'https://s.click.aliexpress.com/e/_c3M1qyyH', precoAntigo: 'R$ 181,66', preco: 'R$ 73,70' },
  { titulo: '🎮 Controle GameSir G7 Pro para Xbox Series X', link: 'https://s.click.aliexpress.com/e/_c4KdWhch', precoAntigo: 'R$ 446,05', preco: 'R$ 341,23' },
  { titulo: '💻 Processador Intel Xeon E3-1230 V2 3.3GHz', link: 'https://s.click.aliexpress.com/e/_c3nOeKvB', precoAntigo: 'R$ 234,33', preco: 'R$ 96,21' },
  { titulo: '💻 Processador Xeon E5-2680V4', link: 'https://s.click.aliexpress.com/e/_c4qy52QZ', precoAntigo: 'R$ 76,65', preco: 'R$ 62,72' },
  { titulo: '💻 Processador Xeon E5-2667V3', link: 'https://s.click.aliexpress.com/e/_c3zj6M7j', precoAntigo: 'R$ 125,84', preco: 'R$ 124,84' },
  { titulo: '🎯 Placa-mãe MACHINIST X79 S7 + Xeon E5-2630 V2 + DDR3 16G + NVME', link: 'https://s.click.aliexpress.com/e/_c3Yo53Jr', precoAntigo: 'R$ 726,31', preco: 'R$ 471,12' },
  { titulo: '💻 AMD Ryzen 5 3400G 4 Núcleos 8 Threads', link: 'https://s.click.aliexpress.com/e/_c3izZkdP', precoAntigo: 'R$ 579,52', preco: 'R$ 381,48' },
  { titulo: '🎯 Kit Placa-mãe Jieshuo A520M + Ryzen', link: 'https://s.click.aliexpress.com/e/_c43HVseh', precoAntigo: 'R$ 610,99', preco: 'R$ 426,71' },
  { titulo: '💻 AMD Ryzen 7 5700X', link: 'https://s.click.aliexpress.com/e/_c3pv2Osd', precoAntigo: 'R$ 2.865,16', preco: 'R$ 1.431,58' },
  { titulo: '💻 Processador Xeon E5-2697V3 14 Núcleos', link: 'https://s.click.aliexpress.com/e/_c4FmOGlX', precoAntigo: 'R$ 89,90', preco: 'R$ 75,54' },
  { titulo: '💧 Cooler de Água CPU 360mm/240mm LCD 5.5"', link: 'https://s.click.aliexpress.com/e/_c3zjxZ2H', precoAntigo: 'R$ 722,97', preco: 'R$ 709,04' },
  { titulo: '💧 Water Cooler Thermalright TROFEO VISION 360 ARGB LCD 6.86"', link: 'https://s.click.aliexpress.com/e/_c45J6f0h', precoAntigo: 'R$ 1.626,17', preco: 'R$ 682,99' },
  { titulo: '💧 Water Cooler Shadow Laranja 360 Lite ARGB', link: 'https://s.click.aliexpress.com/e/_c3hyQlk1', precoAntigo: 'R$ 1.001,41', preco: 'R$ 700,99' },
  { titulo: '💧 Water Cooler Thermalright PEERLESS VISION UB360 ARGB', link: 'https://s.click.aliexpress.com/e/_c3lnmHzj', precoAntigo: 'R$ 1.876,62', preco: 'R$ 824,71' },
  { titulo: '💧 Water Cooler Jonsbo TF3-360SC com Tela Integrada ARGB', link: 'https://s.click.aliexpress.com/e/_c4CCPcvB', precoAntigo: 'R$ 838,03', preco: 'R$ 568,86' },
  { titulo: '💧 Water Cooler FREEZEMOD Industrial 240mm Dupla Camada', link: 'https://s.click.aliexpress.com/e/_c4UCzWxj', precoAntigo: 'R$ 661,80', preco: 'R$ 628,71' },
  { titulo: '💧 Water Cooler ROG RYUJIN 3ª Geração 360 ARGB Extreme', link: 'https://s.click.aliexpress.com/e/_c4NVWk4V', precoAntigo: 'R$ 3.187,13', preco: 'R$ 2.230,99' },
  { titulo: '🖥️ Monitor Gamer AOC B35 22B35HM23 21,5" 120Hz', link: 'https://s.click.aliexpress.com/e/_c4tCpt4t', precoAntigo: 'R$ 599', preco: 'R$ 484' },
  { titulo: '🖥️ Monitor 24" AOC FHD 100Hz', link: 'https://meli.la/2bBsVc7', precoAntigo: 'R$ 980', preco: 'R$ 482' },

  // Grupo 4
  { titulo: '🖥️ Gabinete Gamer Mancer Cv700l Mid Tower', link: 'https://meli.la/2MfXBXv', precoAntigo: 'R$ 663,52', preco: 'R$ 261,36' },
  { titulo: '💻 Placa de Vídeo Veineda RX5500 8GB GDDR6', link: 'https://s.click.aliexpress.com/e/_c3tHaurx', precoAntigo: 'R$ 1.169,07', preco: 'R$ 875,77' },
  { titulo: '💾 Memoria Ram JUHOR DDR4 8GB 3200MHz', link: 'https://s.click.aliexpress.com/e/_c3OgNtHL', precoAntigo: 'R$ 617,10', preco: 'R$ 276,70' },
  { titulo: '💻 Processador MD Ryzen 5 5500X3D 3GHz 6-Core 12-Thread Socket AM4', link: 'https://s.click.aliexpress.com/e/_c3gLD65', precoAntigo: 'R$ 1.847,38', preco: 'R$ 1.144,37' },
  { titulo: '🎮 Controle Sem Fio 8BitDo Ultimate 2 para PC e Android com Joysticks TMR, Gatilhos Comutáveis, Controle de Movimento, 8 Velocidades', link: 'https://s.click.aliexpress.com/e/_c3M8DzYp', precoAntigo: 'R$ 344,65', preco: 'R$ 281,60' },
  { titulo: '🎮 Controle Sem Fio GameSir Cyclone 2 Analógicos TMR Magnéticos Gatilhos Hall Effect 1000Hz + Dock de carregamento', link: 'https://s.click.aliexpress.com/e/_c2vYkaiD', precoAntigo: 'R$ 323,23', preco: 'R$ 249,70' },
  { titulo: '🎮 Controle Sem Fio 8BitDo Ultimate 2 para PC e Android Evernight', link: 'https://s.click.aliexpress.com/e/_c3M6IoIZ', preco: 'R$ 245' },
  { titulo: '⌚ Relógio Casio G-shock Masculino Digital DW-5600UHR-1DR', link: 'https://meli.la/212xYjj', preco: 'R$ 236' },
  { titulo: '🎮 Machenike Controlador Gamepad Sem Fio, Hall Gatilho, Joystick, Botões Mecha-Táteis para Switch, PC, Android, IOS, G5 Pro, Elite', link: 'https://s.click.aliexpress.com/e/_c3ywJYkz', preco: 'R$ 197' },
  { titulo: '💻 Ryzen 5 3500X (Usado)', link: 'https://s.click.aliexpress.com/e/_c37RsczX', preco: 'R$ 309' },
  { titulo: '🎮 GameSir Nova 2 Lite Controlador de interruptor sem fio Bluetooth Gamepad com efeito Hall para Nintendo Switch, iPhone, Android, PC', link: 'https://s.click.aliexpress.com/e/_c3AJ3dzL', preco: 'R$ 101' },
  { titulo: '🖱️ Mouse Attack Shark X11 com Dock Sem Fio 22000 DPI Bluetooth USB PAW3311', link: 'https://s.click.aliexpress.com/e/_c3h9sjbr', preco: 'R$ 86' },
  { titulo: '🖱️ Mouse Delux M900 Pro, PAW3395, 8000hz, Com dock de carregamento', link: 'https://s.click.aliexpress.com/e/_c4d0PxZF', preco: 'R$ 172' },
  { titulo: '🧴 Perfume Ralph Lauren Polo Sport EDT 100ml', link: 'https://meli.la/2p4QTTo', precoAntigo: 'R$ 399', preco: 'R$ 199' },
  { titulo: '🪑 Cadeira de Escritório Giratória Columbus Presidente', link: 'https://meli.la/2g1P2Lp', precoAntigo: 'R$ 589', preco: 'R$ 279' },
  { titulo: '🎙️ Microfone Fifine Ampligame A2', link: 'https://s.click.aliexpress.com/e/_c43C7UJT', preco: 'R$ 75' },
  { titulo: '🧴 Perfume Masculino Carolina Herrera 212 VIP Black Eau de Parfum 200ml', link: 'https://meli.la/1dowBKD', preco: 'R$ 478' },
  { titulo: '💾 Memória GUDGA DDR4 3200MHz/3600MHz/2666MHz 8GB/16GB/32G', link: 'https://s.click.aliexpress.com/e/_c3ds6mbF', preco: 'R$ 250,88' },
  { titulo: '💾 Memória RAM GUDGA DDR4 8GB/16GB/32GB 2666 3200 3600 4000mhz', link: 'https://s.click.aliexpress.com/e/_c3gt3k5n', preco: 'R$ 229,98' },
  { titulo: '💾 Memoria RAM JUHOR DDR4 8GB 3200MHz CL16', link: 'https://s.click.aliexpress.com/e/_c4rHoMZR', precoAntigo: 'R$ 617,10', preco: 'R$ 276,70' },
  { titulo: '💾 Memória RAM JAZER DDR4 8GB 3200MHz', link: 'https://s.click.aliexpress.com/e/_c3uOHtQl', precoAntigo: 'R$ 634,26', preco: 'R$ 265,39' },
  { titulo: '💾 Kllisre Memória DDR4 RAM 8GB 4GB 16GB 2400 2666 3200mhz', link: 'https://s.click.aliexpress.com/e/_c3cT9Cqh', precoAntigo: 'R$ 661,05', preco: 'R$ 270,04' },
  { titulo: '💻 Processador CPU E5 2680V4 Xeon E5-2680V4 CPU 2,40 GHz 14 núcleos 35M 14NM E5-2680 V4 FCLGA2011-3 TPD 120W', link: 'https://s.click.aliexpress.com/e/_c3Cgt91b', precoAntigo: 'R$ 77,12', preco: 'R$ 63,11' },
  { titulo: '🔊 Caixa de som para jogos FIFINE com som surround estéreo, alto-falante USB RGB', link: 'https://s.click.aliexpress.com/e/_c37stZdx', precoAntigo: 'R$ 350,59', preco: 'R$ 198,81' },
  { titulo: '🔊 Tronsmart caixa de som, Mirtune S100 à prova dágua', link: 'https://s.click.aliexpress.com/e/_c3x5ydnX', precoAntigo: 'R$ 562,92', preco: 'R$ 339,44' },
  { titulo: '🎙️ Microfone Fifine', link: 'https://s.click.aliexpress.com/e/_c4P7vQ2h', preco: 'R$ 237,45' },
  { titulo: '💾 Bestoss M.2 Sata 3.0 2280 NGFF 530 MB/s 120 GB 128 GB 240 GB 256 GB 480 GB 512 GB 960 GB 1 TB SSD', link: 'https://s.click.aliexpress.com/e/_c3SVO8dB', preco: 'R$ 175,05' },
  { titulo: '💾 KOOTION X15Lite PCIe M2 SSD NVME M.2 SSD Drive 1TB 512GB 256GB', link: 'https://s.click.aliexpress.com/e/_c3yCX5Q9', precoAntigo: 'R$ 632,29', preco: 'R$ 479,17' },
  { titulo: '💾 Netac SSD NVME M2 1TB 2TB SSD 250GB 500GB M2', link: 'https://s.click.aliexpress.com/e/_c4ed3OTT', precoAntigo: 'R$ 1.707,42', preco: 'R$ 1.164,08' },
  { titulo: '💾 KOOTION SSD SATA Disco Rígido 128GB 240GB 480GB 512GB 1TB', link: 'https://s.click.aliexpress.com/e/_c3hf84ap', precoAntigo: 'R$ 126,66', preco: 'R$ 54,74' },
  { titulo: '🖱️ 45x40cm antiderrapante mousepad máscara menina', link: 'https://s.click.aliexpress.com/e/_c3VP3XE9', precoAntigo: 'R$ 16,85', preco: 'R$ 6,78' },
  { titulo: '🛋️ Mesa Escrivaninha 120cm Industrial Estudo Escritório Pés Aço', link: 'https://meli.la/2y4x98D', preco: 'R$ 179,28' },
  { titulo: '🛋️ Escrivaninha Industrial Mesa Estudo Aparador Office Aço Mdf', link: 'https://meli.la/2dnpUdb', preco: 'R$ 140,22' },
  { titulo: '🛋️ Mesa de canto Madesa Lisboa para computador Bm Gamer marrom/branca', link: 'https://meli.la/2D4Wf5d', precoAntigo: 'R$ 729,40', preco: 'R$ 557,99' },
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

async function enviarMensagem(produto, replyToMessageId = null) {
  const frase = sorteiaFrase();
  const titulo = produto.titulo.replace(/[<>&]/g, '').trim();
  const link = produto.link;

  const linhas = [titulo];

  if (produto.precoAntigo || produto.preco) {
    const antigo = produto.precoAntigo ? String(produto.precoAntigo) : '';
    const novo = produto.preco || '';
    const desconto = calcularDesconto(produto.precoAntigo, produto.preco);

    if (antigo && novo) {
      linhas.push(`De ${antigo} por ${novo}`);
      if (desconto) linhas.push(desconto);
    } else if (novo) {
      linhas.push(`Por ${novo}`);
    }
  }

  linhas.push(link, '', frase);

  const texto = linhas.join('\n');

  const payload = {
    chat_id: CHAT_ID,
    text: texto,
    disable_web_page_preview: false,
  };

  if (replyToMessageId) {
    payload.reply_to_message_id = replyToMessageId;
  }

  const r = await callTelegram('sendMessage', payload);

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

  let ultimoMessageId = null;

  for (const produto of selecionados) {
    try {
      const resposta = await enviarMensagem(produto, ultimoMessageId);
      ultimoMessageId = resposta.result?.message_id || null;
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
