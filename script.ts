/* =============================================
   LUMIÈRE — SCRIPT.TS
   Loja de Sapatos Premium (TypeScript)
   ============================================= */

// ==== INTERFACES DE DADOS ====
interface Produto {
  id: number;
  nome: string;
  categoria: string;
  genero: string;
  preco: number;
  precoOld: number | null;
  tag?: string | null;
  tagLabel?: string | null;
  destaque: boolean;
  promo: boolean;
  desc?: string;
  tamanhos: string[];
  cores: string[];
  material?: string;
  garantia?: string;
  peso?: string;
  imgs: string[];
  sales?: number;
}

interface CarrinhoItem {
  key: string;
  produtoId: number;
  nome: string;
  tamanho: string;
  cor: string;
  preco: number;
  img: string;
  qty: number;
}

interface InfoContentItem {
  eyebrow: string;
  title: string;
  body: string;
}

interface InfoContent {
  [key: string]: InfoContentItem;
}

// Declare window types for admin overrides
declare global {
  interface Window {
    isAdminMode?: boolean;
    toggleTheme?: () => void;
    openInfoModal?: (tipo: string) => void;
    closeInfoModal?: () => void;
    abrirModalEdit?: (id: number) => void;
    deletarProduto?: (id: number) => void;
  }
}

// ==== DADOS DOS PRODUTOS PADRÃO ====
const PRODUTOS_PADRAO: Produto[] = [
  {
    id: 1,
    nome: "Air Pulse Elite",
    categoria: "Tênis",
    genero: "Unissex",
    preco: 289.90,
    precoOld: 359.90,
    tag: "mais-vendido",
    tagLabel: "Mais vendido",
    destaque: true,
    promo: true,
    desc: "Amortecimento responsivo com cabedal em malha técnica respirável. Ideal para corrida e lifestyle urbano.",
    tamanhos: ["37","38","39","40","41","42","43","44"],
    cores: ["Branco","Preto","Cinza"],
    material: "Malha técnica",
    garantia: "1 ano",
    peso: "350g",
    imgs: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=600&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    ]
  },
  {
    id: 2,
    nome: "Lumière Classic Oxford",
    categoria: "Social",
    genero: "Masculino",
    preco: 319.90,
    precoOld: null,
    tag: "novo",
    tagLabel: "Novo",
    destaque: true,
    promo: false,
    desc: "Couro legítimo envernizado com sola em couro. Elegância e conforto para todas as ocasiões formais.",
    tamanhos: ["38","39","40","41","42","43","44"],
    cores: ["Preto","Marrom"],
    material: "Couro legítimo",
    garantia: "1 ano",
    peso: "520g",
    imgs: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=80",
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=600&q=80",
      "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=600&q=80",
    ]
  },
  {
    id: 3,
    nome: "Summer Sand Flat",
    categoria: "Sandálias",
    genero: "Feminino",
    preco: 159.90,
    precoOld: 199.90,
    tag: "promo",
    tagLabel: "−20%",
    destaque: true,
    promo: true,
    desc: "Sandália plana em couro sintético com detalhes dourados. Perfeita para dias quentes e noites a beira-mar.",
    tamanhos: ["34","35","36","37","38","39","40"],
    cores: ["Areia","Dourado","Branco"],
    material: "Couro sintético",
    garantia: "6 meses",
    peso: "180g",
    imgs: [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80",
      "https://images.unsplash.com/photo-1583496661160-fb5218e5f5b8?w=600&q=80",
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
      "https://images.unsplash.com/photo-1612392062631-94d8f0621ba5?w=600&q=80",
    ]
  },
  {
    id: 4,
    nome: "Urban Hiker Boot",
    categoria: "Botas",
    genero: "Unissex",
    preco: 389.90,
    precoOld: 479.90,
    tag: "promo",
    tagLabel: "−19%",
    destaque: false,
    promo: true,
    desc: "Bota de couro com palmilha memory foam e sola de borracha para agarre em qualquer superfície.",
    tamanhos: ["37","38","39","40","41","42","43","44"],
    cores: ["Marrom","Preto","Caqui"],
    material: "Couro bovino",
    garantia: "1 ano",
    peso: "680g",
    imgs: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80",
      "https://images.unsplash.com/photo-1542558788-a82b7a58c1cd?w=600&q=80",
      "https://images.unsplash.com/photo-1578774296842-c45e472b3028?w=600&q=80",
      "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=600&q=80",
    ]
  },
  {
    id: 5,
    nome: "Cloud Slide",
    categoria: "Chinelos",
    genero: "Unissex",
    preco: 89.90,
    precoOld: null,
    tag: "novo",
    tagLabel: "Novo",
    destaque: false,
    promo: false,
    desc: "Chinelo slide com palmilha ergonômica extra-confortável. A leveza que você não vai querer tirar do pé.",
    tamanhos: ["34","35","36","37","38","39","40","41","42","43","44"],
    cores: ["Preto","Cinza","Verde"],
    material: "EVA + borracha",
    garantia: "6 meses",
    peso: "200g",
    imgs: [
      "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80",
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80",
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80",
    ]
  },
  {
    id: 6,
    nome: "Derby Canvas Co.",
    categoria: "Tênis",
    genero: "Masculino",
    preco: 219.90,
    precoOld: 269.90,
    tag: "promo",
    tagLabel: "−18%",
    destaque: true,
    promo: true,
    desc: "Tênis em canvas resistente com cadarço encerado. Visual retrô com conforto moderno para o dia a dia.",
    tamanhos: ["38","39","40","41","42","43","44"],
    cores: ["Off-white","Azul","Vermelho"],
    material: "Canvas + borracha",
    garantia: "6 meses",
    peso: "310g",
    imgs: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    ]
  },
  {
    id: 7,
    nome: "Scarpin Royale",
    categoria: "Social",
    genero: "Feminino",
    preco: 249.90,
    precoOld: null,
    tag: "novo",
    tagLabel: "Novo",
    destaque: false,
    promo: false,
    desc: "Scarpin em verniz com salto 8cm. Elegância intemporal que eleva qualquer look.",
    tamanhos: ["34","35","36","37","38","39","40"],
    cores: ["Preto","Nude","Vermelho"],
    material: "Verniz sintético",
    garantia: "6 meses",
    peso: "350g",
    imgs: [
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&q=80",
      "https://images.unsplash.com/photo-1583496661160-fb5218e5f5b8?w=600&q=80",
      "https://images.unsplash.com/photo-1612392062631-94d8f0621ba5?w=600&q=80",
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    ]
  },
  {
    id: 8,
    nome: "Street Mule Suede",
    categoria: "Social",
    genero: "Feminino",
    preco: 199.90,
    precoOld: 249.90,
    tag: "promo",
    tagLabel: "−20%",
    destaque: false,
    promo: true,
    desc: "Mule em suede macio com bico quadrado e salto bloco 5cm. Tendência e conforto juntos.",
    tamanhos: ["34","35","36","37","38","39","40"],
    cores: ["Caramelo","Preto","Cinza"],
    material: "Suede sintético",
    garantia: "6 meses",
    peso: "290g",
    imgs: [
      "https://images.unsplash.com/photo-1583496661160-fb5218e5f5b8?w=600&q=80",
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&q=80",
      "https://images.unsplash.com/photo-1612392062631-94d8f0621ba5?w=600&q=80",
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80",
    ]
  },
];

// Carregar catálogo de produtos do LocalStorage ou usar padrão
let PRODUTOS: Produto[] = [];
try {
  const localData = localStorage.getItem("lumiere_produtos");
  PRODUTOS = localData ? JSON.parse(localData) : [];
} catch (e) {
  PRODUTOS = [];
}

if (!PRODUTOS || !PRODUTOS.length) {
  PRODUTOS = [...PRODUTOS_PADRAO];
  localStorage.setItem("lumiere_produtos", JSON.stringify(PRODUTOS));
}

let WHATSAPP_NUMBER = localStorage.getItem("lumiere_whatsapp") || "556899408384";

// ==== ESTADO GLOBAL DA APLICACAO ====
let carrinho: CarrinhoItem[] = [];
try {
  const localCart = localStorage.getItem("lumiere_cart");
  carrinho = localCart ? JSON.parse(localCart) : [];
} catch (e) {
  carrinho = [];
}

let paginaAtual = "home";
let produtoAtual: Produto | null = null;
let catSelecionada: string | null = null;
let qtdDetalhe = 1;
let tamSelecionado: string | null = null;
let corSelecionada: string | null = null;
let imgAtual = 0;
let paginaHistorico: string[] = [];

// ==== NAVEGACAO ====
function navigate(pagina: string, catFiltro?: string | null): void {
  if (paginaAtual && paginaAtual !== pagina) {
    paginaHistorico.push(paginaAtual);
    if (paginaHistorico.length > 20) paginaHistorico.shift();
  }

  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const targetPage = document.getElementById("page-" + pagina);
  if (targetPage) targetPage.classList.add("active");
  paginaAtual = pagina;
  window.scrollTo({ top: 0, behavior: "smooth" });

  document.querySelectorAll(".nav a").forEach(a => {
    const clickAttr = a.getAttribute("onclick") || "";
    const isCurrent = clickAttr.includes(`navigate('${pagina}')`);
    a.classList.toggle("active", isCurrent);
  });

  const navElement = document.getElementById("nav");
  if (navElement) navElement.classList.remove("open");
  const hamburger = document.getElementById("hamburger");
  if (hamburger) hamburger.classList.remove("open");

  if (pagina === "home") {
    renderHome();
    setTimeout(runStatCounters, 300);
  }
  if (pagina === "produtos") { 
    catSelecionada = catFiltro || null; 
    renderProdutos(); 
  }
  if (pagina === "carrinho") renderCarrinho();

  window.dispatchEvent(new Event("contentChanged"));
  updateAnimatedTabs();
}

function navigateBack(): void {
  if (paginaHistorico.length === 0) return;
  const anterior = paginaHistorico.pop();
  if (!anterior) return;

  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const targetPage = document.getElementById("page-" + anterior);
  if (targetPage) targetPage.classList.add("active");
  paginaAtual = anterior;
  window.scrollTo({ top: 0, behavior: "smooth" });

  document.querySelectorAll(".nav a").forEach(a => {
    const clickAttr = a.getAttribute("onclick") || "";
    a.classList.toggle("active", clickAttr.includes(`navigate('${anterior}')`));
  });

  if (anterior === "home") {
    renderHome();
    setTimeout(runStatCounters, 300);
  }
  if (anterior === "produtos") { renderProdutos(); }
  if (anterior === "carrinho") renderCarrinho();

  window.dispatchEvent(new Event("contentChanged"));
  updateAnimatedTabs();
}

// ==== CONTROLES DO LOADER ====
function showLoader(): void {
  const loader = document.getElementById("lumiere-loader");
  if (loader) loader.classList.add("active");
}

function hideLoader(): void {
  const loader = document.getElementById("lumiere-loader");
  if (loader) loader.classList.remove("active");
}

// ==== ANIMATED TABS (SLIDING PILL) ====
function updateAnimatedTabs(): void {
  const overlay = document.getElementById("activeTabsOverlay");
  const nav = document.getElementById("nav");
  if (!overlay || !nav) return;

  let activeLink = nav.querySelector("a.active") as HTMLElement | null;
  if (!activeLink) {
    activeLink = (document.getElementById("nav-home") || nav.querySelector("a")) as HTMLElement | null;
  }

  if (activeLink) {
    const offsetLeft = activeLink.offsetLeft;
    const offsetWidth = activeLink.offsetWidth;
    const containerWidth = overlay.offsetWidth;

    if (containerWidth > 0) {
      const clipLeft = offsetLeft;
      const clipRight = offsetLeft + offsetWidth;

      const pctLeft = ((clipLeft / containerWidth) * 100).toFixed(2);
      const pctRight = (100 - (clipRight / containerWidth) * 100).toFixed(2);

      overlay.style.clipPath = `inset(0px ${pctRight}% 0px ${pctLeft}% round 9999px)`;
    }
  }
}

window.addEventListener("resize", updateAnimatedTabs);

// ==== UTILS DE VÍDEO & APARÊNCIA ====
function isVideoUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('data:video/')) return true;
  const cleanUrl = url.split(/[?#]/)[0];
  return /\.(mp4|webm|ogg|mov|m4v)$/i.test(cleanUrl);
}

function renderMediaHtml(url: string, alt: string = "", classes: string = "", extraAttrs: string = "", isThumb: boolean = false): string {
  if (isVideoUrl(url)) {
    if (isThumb) {
      return `<video src="${url}" class="${classes}" muted playsinline ${extraAttrs}></video>`;
    }
    return `<video src="${url}" class="${classes}" autoplay loop muted playsinline ${extraAttrs}></video>`;
  }
  return `<img src="${url}" alt="${alt}" class="${classes}" ${extraAttrs} onerror="this.src='https://via.placeholder.com/300'" />`;
}

function aplicarEstilosCustomizados(): void {
  const customGold = localStorage.getItem("lumiere_color_gold") || "#c9a84c";
  const customGold2 = localStorage.getItem("lumiere_color_gold2") || "#e8c96b";
  const customLogoSize = localStorage.getItem("lumiere_logo_size") || "1.8";
  const customHeroTitleSize = localStorage.getItem("lumiere_hero_title_size") || "5.5";

  let styleEl = document.getElementById("lumiere-custom-theme");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "lumiere-custom-theme";
    document.head.appendChild(styleEl);
  }

  styleEl.innerHTML = `
    :root {
      --gold: ${customGold} !important;
      --gold2: ${customGold2} !important;
    }
    .light {
      --gold: ${customGold} !important;
      --gold2: ${customGold2} !important;
    }
    .logo-name, .footer-logo {
      font-size: ${customLogoSize}rem !important;
    }
    .hero-h1 {
      font-size: clamp(3rem, 8vw, ${customHeroTitleSize}rem) !important;
    }
  `;
}

function toggleMenu(): void {
  const nav = document.getElementById("nav");
  if (nav) nav.classList.toggle("open");
  const hamburger = document.getElementById("hamburger");
  if (hamburger) hamburger.classList.toggle("open");
}

// ==== CARRINHO ====
function salvarCarrinho(): void {
  localStorage.setItem("lumiere_cart", JSON.stringify(carrinho));
  atualizarContador();
}

function atualizarContador(): void {
  const total = carrinho.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = total.toString();
}

function adicionarAoCarrinho(produtoId: number, tam: string, cor: string, qty: number): void {
  const p = PRODUTOS.find(x => x.id === produtoId);
  if (!p) return;
  const key = produtoId + "|" + (tam || "") + "|" + (cor || "");
  const existente = carrinho.find(i => i.key === key);
  if (existente) {
    existente.qty += qty || 1;
  } else {
    carrinho.push({ 
      key, 
      produtoId, 
      nome: p.nome, 
      tamanho: tam, 
      cor: cor, 
      preco: p.preco, 
      img: p.imgs[0], 
      qty: qty || 1 
    });
  }
  salvarCarrinho();
  renderDrawerItems();
  abrirCarrinho();
}

function removerDoCarrinho(key: string): void {
  carrinho = carrinho.filter(i => i.key !== key);
  salvarCarrinho();
  renderDrawerItems();
  if (paginaAtual === "carrinho") renderCarrinho();
}

function alterarQtd(key: string, delta: number): void {
  const item = carrinho.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  salvarCarrinho();
  renderDrawerItems();
  if (paginaAtual === "carrinho") renderCarrinho();
}

function limparCarrinho(): void {
  carrinho = [];
  salvarCarrinho();
  renderDrawerItems();
  if (paginaAtual === "carrinho") renderCarrinho();
}

function toggleCarrinho(): void {
  const drawer = document.getElementById("drawer");
  if (drawer) drawer.classList.toggle("open");
  const overlay = document.getElementById("drawerOverlay");
  if (overlay) overlay.classList.toggle("open");
  renderDrawerItems();
}

function abrirCarrinho(): void {
  const drawer = document.getElementById("drawer");
  if (drawer) drawer.classList.add("open");
  const overlay = document.getElementById("drawerOverlay");
  if (overlay) overlay.classList.add("open");
}

function totalCarrinho(): number {
  return carrinho.reduce((s, i) => s + i.preco * i.qty, 0);
}

function renderDrawerItems(): void {
  const el = document.getElementById("drawerItems");
  const ft = document.getElementById("drawerFooter");
  if (!el || !ft) return;

  if (!carrinho.length) {
    el.innerHTML = `<div class="drawer-empty"><span>🛍️</span><p>Seu carrinho está vazio.</p></div>`;
    ft.innerHTML = "";
    window.dispatchEvent(new Event("contentChanged"));
    return;
  }

  el.innerHTML = carrinho.map(i => `
    <div class="drawer-item">
      <img src="${i.img}" alt="${i.nome}" onerror="this.src='https://via.placeholder.com/80'" />
      <div class="drawer-item-info">
        <p class="drawer-item-name">${i.nome}</p>
        <p class="drawer-item-sub">${[i.tamanho ? "Nº " + i.tamanho : "", i.cor].filter(Boolean).join(" · ")}</p>
        <p class="drawer-item-price">R$ ${(i.preco * i.qty).toFixed(2).replace(".", ",")}</p>
        <div style="display:flex;align-items:center;gap:0.6rem;">
          <div class="qty-sm">
            <button onclick="alterarQtd('${i.key}', -1)">−</button>
            <span>${i.qty}</span>
            <button onclick="alterarQtd('${i.key}', 1)">+</button>
          </div>
          <button class="drawer-item-remove" onclick="removerDoCarrinho('${i.key}')">🗑 Remover</button>
        </div>
      </div>
    </div>`).join("");

  const total = totalCarrinho();
  ft.innerHTML = `
    <div class="drawer-total"><span>Total</span><span>R$ ${total.toFixed(2).replace(".", ",")}</span></div>
    <input class="drawer-nome" type="text" id="drawerNome" placeholder="Seu nome para o pedido" />
    <p class="drawer-err" id="drawerErr"></p>
    <button class="btn-whatsapp" style="width:100%;justify-content:center;" onclick="enviarWhatsApp('drawer')">
      💬 Finalizar pelo WhatsApp
    </button>
    <div class="drawer-actions">
      <button class="drawer-continue" onclick="toggleCarrinho()">Continuar comprando</button>
      <button class="drawer-clear" onclick="limparCarrinho()">Esvaziar</button>
    </div>
    <a class="drawer-see-cart" href="#" onclick="toggleCarrinho(); navigate('carrinho')">Ver carrinho completo →</a>`;

  window.dispatchEvent(new Event("contentChanged"));
}

// ==== WHATSAPP ====
function enviarWhatsApp(origem: string): void {
  const nomeEl = document.getElementById(origem === "drawer" ? "drawerNome" : "nomeCliente") as HTMLInputElement | null;
  const errEl = document.getElementById(origem === "drawer" ? "drawerErr" : "carrinhoErr");
  const nome = nomeEl ? nomeEl.value.trim() : "";
  
  if (!nome) {
    if (errEl) errEl.textContent = "Por favor, informe seu nome antes de continuar.";
    if (nomeEl) nomeEl.focus();
    return;
  }
  if (errEl) errEl.textContent = "";

  // Cliques WhatsApp
  let clicks = parseInt(localStorage.getItem("lumiere_clicks_wa") || "0");
  localStorage.setItem("lumiere_clicks_wa", (clicks + 1).toString());

  // Vendas sapatos
  let vendas: Record<number, number> = {};
  try {
    const localSales = localStorage.getItem("lumiere_vendas");
    vendas = localSales ? JSON.parse(localSales) : {};
  } catch (e) {
    vendas = {};
  }

  carrinho.forEach(item => {
    vendas[item.produtoId] = (vendas[item.produtoId] || 0) + item.qty;
  });
  localStorage.setItem("lumiere_vendas", JSON.stringify(vendas));

  showLoader();

  let msg = `Olá, meu nome é *${nome}* e gostaria de fazer um pedido:\n\n`;
  carrinho.forEach((i, idx) => {
    msg += `${idx + 1}. *${i.nome}*\n`;
    if (i.tamanho) msg += `   Tamanho: ${i.tamanho}\n`;
    if (i.cor) msg += `   Cor: ${i.cor}\n`;
    msg += `   Qtd: ${i.qty}x | R$ ${(i.preco * i.qty).toFixed(2).replace(".", ",")}\n\n`;
  });
  msg += `*Total: R$ ${totalCarrinho().toFixed(2).replace(".", ",")}*`;

  setTimeout(() => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    hideLoader();
  }, 1500);
}

// ==== HOME ====
function renderHome(): void {
  const destaques = PRODUTOS.filter(p => p.destaque).slice(0, 4);
  const destEl = document.getElementById("destaquesGrid");
  if (destEl) destEl.innerHTML = destaques.map(renderCardPequeno).join("");

  const promos = PRODUTOS.filter(p => p.promo).slice(0, 4);
  const promoEl = document.getElementById("promosGrid");
  if (promoEl) promoEl.innerHTML = promos.map(renderCardPequeno).join("");

  window.dispatchEvent(new Event("contentChanged"));
}

// ==== PRODUTOS ====
function renderProdutos(): void {
  const cats = [...new Set(PRODUTOS.map(p => p.categoria))];
  const catEl = document.getElementById("catChips");
  if (catEl) {
    catEl.innerHTML = cats.map(c => `
      <button class="chip ${catSelecionada === c ? "active" : ""}" onclick="selecionarCat('${c}')">${c}</button>
    `).join("") + `<button class="chip ${catSelecionada === null ? "active" : ""}" onclick="selecionarCat(null)">Todos</button>`;
  }
  filtrarProdutos();
}

function selecionarCat(cat: string | null): void {
  catSelecionada = cat;
  document.querySelectorAll("#catChips .chip").forEach(c => c.classList.remove("active"));
  if (event && event.target) {
    (event.target as HTMLElement).classList.add("active");
  }
  filtrarProdutos();
}

function filtrarProdutos(): void {
  const busca = ((document.getElementById("searchInput") as HTMLInputElement | null)?.value || "").toLowerCase();
  const precoMax = parseFloat((document.getElementById("precoRange") as HTMLInputElement | null)?.value || "500");
  const soPromo = (document.getElementById("soPromo") as HTMLInputElement | null)?.checked;

  let filtrados = PRODUTOS.filter(p => {
    if (catSelecionada && p.categoria !== catSelecionada) return false;
    if (p.preco > precoMax) return false;
    if (soPromo && !p.promo) return false;
    if (busca && !p.nome.toLowerCase().includes(busca) && !p.categoria.toLowerCase().includes(busca)) return false;
    return true;
  });

  const countEl = document.getElementById("produtosCount");
  if (countEl) {
    countEl.textContent = `${filtrados.length} modelo${filtrados.length !== 1 ? "s" : ""} encontrado${filtrados.length !== 1 ? "s" : ""}`;
  }

  const gridEl = document.getElementById("produtosGrid");
  if (gridEl) {
    gridEl.innerHTML = filtrados.length
      ? filtrados.map(renderCardGrande).join("")
      : `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--muted);">Nenhum produto encontrado com esses filtros 😕</div>`;
  }

  window.dispatchEvent(new Event("contentChanged"));
}

function toggleFiltros(): void {
  const p = document.getElementById("filtrosPanel");
  if (p) {
    p.style.display = p.style.display === "none" ? "flex" : "none";
  }
}

// ==== CARDS ====
function renderCardPequeno(p: Produto): string {
  const adminControls = window.isAdminMode ? `
    <div class="admin-card-controls" onclick="event.stopPropagation();">
      <button class="btn-admin-card-edit" onclick="abrirModalEdit(${p.id})">✏️ Editar</button>
      <button class="btn-admin-card-delete" onclick="deletarProduto(${p.id})">🗑/button>
    </div>
  ` : "";

  return `
    <div class="product-card" onclick="abrirDetalhe(${p.id})">
      <div class="product-img-wrap">
        ${renderMediaHtml(p.imgs && p.imgs.length > 0 ? p.imgs[0] : "", p.nome, "", "loading='lazy'")}
        ${p.tag ? `<span class="product-tag tag-${p.tag}">${p.tagLabel}</span>` : ""}
        ${adminControls}
      </div>
      <div class="product-info">
        <p class="product-cat">${p.categoria}</p>
        <p class="product-name">${p.nome}</p>
        <div class="product-prices">
          ${p.precoOld ? `<span class="product-old">R$ ${p.precoOld.toFixed(2).replace(".", ",")}</span>` : ""}
          <span class="product-price">R$ ${p.preco.toFixed(2).replace(".", ",")}</span>
        </div>
        <div class="product-actions">
          <button class="btn-detail" onclick="event.stopPropagation(); abrirDetalhe(${p.id})">Ver detalhes</button>
          <button class="btn-add-cart" onclick="event.stopPropagation(); adicionarRapido(${p.id})" title="Adicionar ao carrinho">＋</button>
        </div>
      </div>
    </div>`;
}

function renderCardGrande(p: Produto): string {
  return renderCardPequeno(p);
}

function adicionarRapido(produtoId: number): void {
  const p = PRODUTOS.find(x => x.id === produtoId);
  if (!p) return;
  const tam = p.tamanhos && p.tamanhos.length > 0 ? p.tamanhos[Math.floor(p.tamanhos.length / 2)] : "";
  const cor = p.cores && p.cores.length > 0 ? p.cores[0] : "";
  adicionarAoCarrinho(produtoId, tam, cor, 1);
}

// ==== DETALHE ====
function abrirDetalhe(produtoId: number): void {
  produtoAtual = PRODUTOS.find(p => p.id === produtoId) || null;
  if (!produtoAtual) return;
  qtdDetalhe = 1;
  tamSelecionado = null;
  corSelecionada = null;
  imgAtual = 0;
  navigate("detalhe");
  renderDetalhe();
}

function renderDetalhe(): void {
  const p = produtoAtual;
  if (!p) return;
  const desconto = p.precoOld ? Math.round((1 - p.preco / p.precoOld) * 100) : 0;
  const preco = p.preco.toFixed(2).replace(".", ",");
  const parcela = (p.preco / 3).toFixed(2).replace(".", ",");

  const detailConteudo = document.getElementById("detalheConteudo");
  if (!detailConteudo) return;

  detailConteudo.innerHTML = `
    <div class="detalhe-galeria">
      <div class="detalhe-main-img" id="mainImgWrap">
        ${renderMediaHtml(p.imgs && p.imgs.length > imgAtual ? p.imgs[imgAtual] : "", p.nome, "", "id='mainImg'")}
      </div>
      <div class="detalhe-thumbs">
        ${(p.imgs || []).map((img, i) => `
          <div class="detalhe-thumb ${i === imgAtual ? "active" : ""}" onclick="mudarImg(${i})">
            ${renderMediaHtml(img, `Foto ${i+1}`, "", "loading='lazy'", true)}
          </div>
        `).join("")}
      </div>
    </div>

    <div class="detalhe-info">
      <p class="detalhe-cat">${p.categoria} · ${p.genero}</p>
      <h1 class="detalhe-nome">${p.nome}</h1>
      <div class="detalhe-stars">★★★★★ <span>(4.9 · 128 avaliações)</span></div>

      <div class="detalhe-precos">
        ${p.precoOld ? `<span class="detalhe-old">R$ ${p.precoOld.toFixed(2).replace(".", ",")}</span>` : ""}
        <span class="detalhe-price">R$ ${preco}</span>
        ${desconto ? `<span class="detalhe-desconto">−${desconto}%</span>` : ""}
      </div>
      <p class="detalhe-parcela">ou 3× de R$ ${parcela} sem juros</p>

      ${p.desc ? `<p class="detalhe-desc">${p.desc}</p>` : ""}

      ${p.tamanhos && p.tamanhos.length > 0 ? `
        <p class="opcoes-label">Tamanho</p>
        <div class="opcoes-chips" id="tamChips">
          ${p.tamanhos.map(t => `<button class="opcao-chip" onclick="selecionarTam('${t}')">${t}</button>`).join("")}
        </div>
      ` : ""}

      ${p.cores && p.cores.length > 0 ? `
        <p class="opcoes-label">Cor</p>
        <div class="opcoes-chips" id="corChips">
          ${p.cores.map(c => `<button class="opcao-chip" onclick="selecionarCor('${c}')">${c}</button>`).join("")}
        </div>
      ` : ""}

      <p class="opcoes-label">Quantidade</p>
      <div class="qty-control">
        <button class="qty-btn" onclick="mudarQtd(-1)">−</button>
        <span class="qty-val" id="qtdDetalheEl">${qtdDetalhe}</span>
        <button class="qty-btn" onclick="mudarQtd(1)">+</button>
      </div>

      <div class="detalhe-cta">
        <button class="btn-primary" onclick="addDetalhe()">🛍 Adicionar ao carrinho</button>
      </div>
      <div class="detalhe-specs">
        ${p.material ? `<div class="spec-card"><p>Material</p><p>${p.material}</p></div>` : ""}
        ${p.peso ? `<div class="spec-card"><p>Peso</p><p>${p.peso}</p></div>` : ""}
        ${p.garantia ? `<div class="spec-card"><p>Garantia</p><p>${p.garantia}</p></div>` : ""}
        <div class="spec-card"><p>Entrega</p><p>Em até 5 dias úteis</p></div>
      </div>
    </div>`;

  window.dispatchEvent(new Event("contentChanged"));
}

function mudarImg(idx: number): void {
  imgAtual = idx;
  const mainImg = document.getElementById("mainImg");
  const mainImgWrap = document.getElementById("mainImgWrap");
  if (mainImg && mainImgWrap && produtoAtual) {
    mainImg.classList.add("fade-out");
    setTimeout(() => {
      if (produtoAtual) {
        mainImgWrap.innerHTML = renderMediaHtml(produtoAtual.imgs[idx], produtoAtual.nome, "", "id='mainImg'");
      }
      const newEl = document.getElementById("mainImg");
      if (newEl) {
        newEl.classList.add("fade-out");
        void newEl.offsetWidth;
        newEl.classList.remove("fade-out");
      }
    }, 150);
  }
  document.querySelectorAll(".detalhe-thumb").forEach((t, i) => {
    t.classList.toggle("active", i === idx);
  });
}

function selecionarTam(t: string): void {
  tamSelecionado = t;
  document.querySelectorAll("#tamChips .opcao-chip").forEach(c => c.classList.toggle("active", c.textContent === t));
}

function selecionarCor(c: string): void {
  corSelecionada = c;
  document.querySelectorAll("#corChips .opcao-chip").forEach(el => el.classList.toggle("active", el.textContent === c));
}

function mudarQtd(delta: number): void {
  qtdDetalhe = Math.max(1, qtdDetalhe + delta);
  const el = document.getElementById("qtdDetalheEl");
  if (el) {
    el.textContent = qtdDetalhe.toString();
    el.classList.remove("pop-anim");
    void el.offsetWidth;
    el.classList.add("pop-anim");
  }
}

function addDetalhe(): void {
  const p = produtoAtual;
  if (!p) return;
  if (p.tamanhos && p.tamanhos.length > 0 && !tamSelecionado) { alert("Por favor, selecione um tamanho."); return; }
  if (p.cores && p.cores.length > 0 && !corSelecionada) { alert("Por favor, selecione uma cor."); return; }
  adicionarAoCarrinho(p.id, tamSelecionado || "", corSelecionada || "", qtdDetalhe);
}

// ==== CARRINHO PÁGINA ====
function renderCarrinho(): void {
  const el = document.getElementById("carrinhoLayout");
  if (!el) return;

  if (!carrinho.length) {
    el.innerHTML = `
      <div class="carrinho-empty" style="grid-column:1/-1">
        <span style="font-size:3rem">🛍️</span>
        <p>Seu carrinho está vazio.</p>
        <button class="btn-primary" onclick="navigate('produtos')">Explorar produtos</button>
      </div>`;
    window.dispatchEvent(new Event("contentChanged"));
    return;
  }

  const total = totalCarrinho();
  const frete = total > 200 ? 0 : 19.90;
  const grand = total + frete;

  const itensHtml = carrinho.map(i => `
    <div class="carrinho-item">
      ${renderMediaHtml(i.img, i.nome, "", "", true)}
      <div class="carrinho-item-info">
        <p class="carrinho-item-name">${i.nome}</p>
        <p class="carrinho-item-sub">${[i.tamanho ? "Nº " + i.tamanho : "", i.cor].filter(Boolean).join(" · ")}</p>
        <p class="carrinho-item-price">R$ ${i.preco.toFixed(2).replace(".", ",")} cada</p>
        <div class="carrinho-item-controls">
          <div class="qty-control" style="height:auto">
            <button class="qty-btn" onclick="alterarQtd('${i.key}', -1)">−</button>
            <span class="qty-val">${i.qty}</span>
            <button class="qty-btn" onclick="alterarQtd('${i.key}', 1)">+</button>
          </div>
          <button style="font-size:0.8rem;color:var(--muted)" onclick="removerDoCarrinho('${i.key}')">🗑 Remover</button>
        </div>
      </div>
      <p class="carrinho-item-total">R$ ${(i.preco * i.qty).toFixed(2).replace(".", ",")}</p>
    </div>`).join("");

  el.innerHTML = `
    <div class="carrinho-lista">${itensHtml}</div>
    <div class="carrinho-resumo">
      <h2>Resumo do pedido</h2>
      <div class="resumo-line"><span>Subtotal</span><span>R$ ${total.toFixed(2).replace(".", ",")}</span></div>
      <div class="resumo-line"><span>Frete</span><span>${frete ? "R$ " + frete.toFixed(2).replace(".", ",") : "🎉 Grátis"}</span></div>
      ${total < 200 ? `<p style="font-size:0.75rem;color:var(--muted)">Frete grátis acima de R$ 200,00</p>` : ""}
      <div class="resumo-total"><span>Total</span><span>R$ ${grand.toFixed(2).replace(".", ",")}</span></div>
      <input class="nome-input" type="text" id="nomeCliente" placeholder="Seu nome para o pedido" />
      <p class="drawer-err" id="carrinhoErr"></p>
      <button class="btn-whatsapp" style="width:100%;justify-content:center;" onclick="enviarWhatsApp('carrinho')">
        💬 Finalizar pelo WhatsApp
      </button>
      <button class="drawer-clear" style="display:block;width:100%;margin-top:0.75rem;" onclick="limparCarrinho()">Esvaziar carrinho</button>
    </div>`;

  window.dispatchEvent(new Event("contentChanged"));
}

// ==== CONFIGURAÇÕES E ANALYTICS DA LOJA ====
function aplicarConfiguracoesLoja(): void {
  aplicarEstilosCustomizados();
  const nomeLoja = localStorage.getItem("lumiere_nome") || "Lumière";

  document.title = `${nomeLoja} — Sapatos de Luxo`;

  document.querySelectorAll(".logo").forEach(el => {
    el.innerHTML = `${nomeLoja} <span class="logo-dot">✦</span>`;
  });

  document.querySelectorAll(".footer-logo").forEach(el => {
    el.textContent = nomeLoja;
  });

  document.querySelectorAll(".footer-copyright").forEach(el => {
    el.innerHTML = `© <span id="year">${new Date().getFullYear()}</span> ${nomeLoja}. Todos os direitos reservados.`;
  });

  const contatoCtaTitle = document.querySelector(".contato-cta-box h2");
  if (contatoCtaTitle) {
    contatoCtaTitle.innerHTML = `${nomeLoja} ✦`;
  }

  const whatsappNum = localStorage.getItem("lumiere_whatsapp") || "556899408384";
  document.querySelectorAll("a[href*='wa.me']").forEach(link => {
    try {
      const a = link as HTMLAnchorElement;
      const url = new URL(a.href);
      const text = url.searchParams.get("text") || "";
      a.href = `https://wa.me/${whatsappNum}${text ? '?text=' + encodeURIComponent(text) : ''}`;
    } catch(e) {
      (link as HTMLAnchorElement).href = `https://wa.me/${whatsappNum}`;
    }
  });

  const formattedPhone = ((num: string) => {
    if (!num) return "";
    num = num.replace(/\D/g, "");
    if (num.startsWith("55") && num.length >= 11) {
      const ddd = num.substring(2, 4);
      const part1 = num.length === 13 ? num.substring(4, 9) : num.substring(4, 8);
      const part2 = num.length === 13 ? num.substring(9) : num.substring(8);
      return `+55 (${ddd}) ${part1}-${part2}`;
    }
    return num;
  })(whatsappNum);
  
  const waTextEl = document.getElementById("contactWhatsappText");
  if (waTextEl) waTextEl.textContent = formattedPhone || whatsappNum;

  const instagramUser = localStorage.getItem("lumiere_instagram") || "@lumiere.shoes";
  const instaEl = document.getElementById("contactInstagram") as HTMLAnchorElement | null;
  if (instaEl) {
    instaEl.textContent = instagramUser;
    instaEl.href = `https://instagram.com/${instagramUser.replace("@", "")}`;
  }

  const emailLoja = localStorage.getItem("lumiere_email") || "kaelvorastudios2026@gmail.com";
  const emailEl = document.getElementById("contactEmail") as HTMLAnchorElement | null;
  if (emailEl) {
    emailEl.textContent = emailLoja;
    emailEl.href = `mailto:${emailLoja}`;
  }
  const footerEmailEl = document.getElementById("footerEmail");
  if (footerEmailEl) footerEmailEl.textContent = emailLoja;
  const footerEmailLink = document.getElementById("footerEmailLink") as HTMLAnchorElement | null;
  if (footerEmailLink) footerEmailLink.href = `mailto:${emailLoja}`;

  // Capa / Hero
  const heroT1 = localStorage.getItem("lumiere_hero_title1") || "O Sapato";
  const heroT2 = localStorage.getItem("lumiere_hero_title2") || "Perfeito";
  const heroT3 = localStorage.getItem("lumiere_hero_title3") || "Para Você";
  const heroSub = localStorage.getItem("lumiere_hero_sub") || "Conforto e elegância em cada passo.";
  const heroImgUrl = localStorage.getItem("lumiere_hero_img") || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=90";

  const t1El = document.getElementById("heroTitleLine1");
  const t2El = document.getElementById("heroTitleLine2");
  const t3El = document.getElementById("heroTitleLine3");
  const subEl = document.getElementById("heroSubtitle");
  const imgEl = document.getElementById("heroImg");

  if (t1El) t1El.textContent = heroT1;
  if (t2El) t2El.textContent = heroT2;
  if (t3El) t3El.textContent = heroT3;
  if (subEl) subEl.textContent = heroSub;
  if (imgEl) {
    const parent = imgEl.parentElement;
    if (parent) {
      if (isVideoUrl(heroImgUrl)) {
        if (imgEl.tagName !== 'VIDEO') {
          parent.innerHTML = `<video src="${heroImgUrl}" autoplay loop muted playsinline class="hero-img" id="heroImg"></video>`;
        } else if ((imgEl as HTMLVideoElement).src !== heroImgUrl) {
          (imgEl as HTMLVideoElement).src = heroImgUrl;
        }
      } else {
        if (imgEl.tagName !== 'IMG') {
          parent.innerHTML = `<img src="${heroImgUrl}" alt="Tênis em destaque" class="hero-img" id="heroImg" />`;
        } else if ((imgEl as HTMLImageElement).src !== heroImgUrl) {
          (imgEl as HTMLImageElement).src = heroImgUrl;
        }
      }
    }
  }

  const statClientes = localStorage.getItem("lumiere_stat_clientes") || "2400";
  const statSatisfacao = localStorage.getItem("lumiere_stat_satisfacao") || "98";
  const statModelos = localStorage.getItem("lumiere_stat_modelos") || "80";

  const stats = document.querySelectorAll(".stat-n");
  if (stats.length >= 3) {
    stats[0].setAttribute("data-target", statClientes);
    stats[1].setAttribute("data-target", statSatisfacao);
    stats[2].setAttribute("data-target", statModelos);
  }
}

// Rastrear cliques no WhatsApp
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  const link = target.closest("a");
  if (link && link.href && link.href.includes("wa.me")) {
    let clicks = parseInt(localStorage.getItem("lumiere_clicks_wa") || "0");
    localStorage.setItem("lumiere_clicks_wa", (clicks + 1).toString());
  }
});

// ==== INICIALIZACAO ====
function init(): void {
  aplicarConfiguracoesLoja();

  if (!sessionStorage.getItem("lumiere_session_active")) {
    sessionStorage.setItem("lumiere_session_active", "true");
    let visitas = parseInt(localStorage.getItem("lumiere_visitas") || "0");
    localStorage.setItem("lumiere_visitas", (visitas + 1).toString());
  }

  initTheme();
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear().toString();

  document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
    try {
      const anchor = a as HTMLAnchorElement;
      const url = new URL(anchor.href);
      anchor.href = `https://wa.me/${WHATSAPP_NUMBER}${url.search}`;
    } catch(e) {}
  });

  atualizarContador();
  renderHome();

  initScrollReveal();
  initHeroCanvas();
  initStatCounters();
  initSwipeBack();

  setTimeout(updateAnimatedTabs, 100);
}

// ==== GESTO DE DESLIZAR PARA VOLTAR NO CELULAR ====
function initSwipeBack(): void {
  const indicator = document.createElement('div');
  indicator.id = 'swipe-back-indicator';
  indicator.innerHTML = `
    <div class="swipe-back-pill">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    </div>`;
  document.body.appendChild(indicator);

  const EDGE_ZONE = 40;
  const TRIGGER_DIST = 90;
  const SHOW_THRESHOLD = 10;

  let touchStartX = 0;
  let touchStartY = 0;
  let isEdgeSwipe = false;
  let isDragging = false;

  document.addEventListener('touchstart', (e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    isEdgeSwipe = touchStartX <= EDGE_ZONE && paginaHistorico.length > 0;
    isDragging = false;
  }, { passive: true });

  document.addEventListener('touchmove', (e: TouchEvent) => {
    if (!isEdgeSwipe) return;

    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = Math.abs(touch.clientY - touchStartY);

    if (!isDragging && dy > 30) {
      isEdgeSwipe = false;
      return;
    }

    if (dx > SHOW_THRESHOLD) {
      isDragging = true;
      const progress = Math.min(dx / TRIGGER_DIST, 1);
      const translateX = Math.min(dx * 0.65, TRIGGER_DIST * 0.65);

      const centerY = window.innerHeight / 2;
      indicator.style.top = `${centerY}px`;
      indicator.style.transform = `translateY(-50%) translateX(${translateX}px)`;
      indicator.style.opacity = Math.min(progress * 1.4, 1).toString();

      const pill = indicator.querySelector('.swipe-back-pill');
      if (pill) {
        if (progress >= 1) {
          pill.classList.add('ready');
        } else {
          pill.classList.remove('ready');
        }
      }
    }
  }, { passive: true });

  document.addEventListener('touchend', (e: TouchEvent) => {
    if (!isEdgeSwipe || !isDragging) {
      resetIndicator();
      return;
    }

    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartX;

    if (dx >= TRIGGER_DIST) {
      const pill = indicator.querySelector('.swipe-back-pill');
      if (pill) pill.classList.add('confirmed');
      setTimeout(() => {
        resetIndicator();
        navigateBack();
      }, 200);
    } else {
      resetIndicator();
    }

    isEdgeSwipe = false;
    isDragging = false;
  }, { passive: true });

  function resetIndicator() {
    indicator.style.opacity = '0';
    indicator.style.transform = 'translateY(-50%) translateX(-30px)';
    const pill = indicator.querySelector('.swipe-back-pill');
    if (pill) {
      pill.classList.remove('ready', 'confirmed');
    }
  }
}

function initScrollReveal(): void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.05
  });

  const updateReveals = () => {
    document.querySelectorAll(".reveal").forEach(el => {
      observer.observe(el);
    });
  };

  updateReveals();
  window.addEventListener("contentChanged", updateReveals);
}

function initHeroCanvas(): void {
  const canvas = document.getElementById("heroCanvas") as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;

  window.addEventListener("resize", () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  interface Particle {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    alpha: number;
  }

  const particles: Particle[] = [];
  const numParticles = 40;

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1
    });
  }

  function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

function runStatCounters(): void {
  const counters = document.querySelectorAll(".stat-n");
  if (!counters.length) return;

  counters.forEach(el => {
    const htmlEl = el as HTMLElement & { animFrameId?: number };
    if (htmlEl.animFrameId) {
      cancelAnimationFrame(htmlEl.animFrameId);
      htmlEl.animFrameId = undefined;
    }

    htmlEl.textContent = "0";

    const target = parseInt(htmlEl.getAttribute("data-target") || "0", 10);
    const duration = 2000;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = progress * (2 - progress); // ease-out
      const current = Math.floor(easedProgress * target);

      htmlEl.textContent = current.toString();

      if (progress < 1) {
        htmlEl.animFrameId = requestAnimationFrame(update);
      } else {
        htmlEl.textContent = target.toString();
        htmlEl.animFrameId = undefined;
      }
    };

    htmlEl.animFrameId = requestAnimationFrame(update);
  });
}

function initStatCounters(): void {
  setTimeout(runStatCounters, 600);
}

// ==== THEME TOGGLE (Modo Claro / Escuro) ====
function initTheme(): void {
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "light") {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }
  updateToggleIcons(savedTheme);
}

function toggleTheme(): void {
  const isLight = document.documentElement.classList.contains("light");
  const nextTheme = isLight ? "dark" : "light";

  document.body.classList.add("theme-transitioning");
  document.body.getBoundingClientRect();

  if (nextTheme === "light") {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }

  localStorage.setItem("theme", nextTheme);
  updateToggleIcons(nextTheme);

  setTimeout(() => {
    document.body.classList.remove("theme-transitioning");
  }, 520);
}

function updateToggleIcons(theme: string): void {
  const moonIcon = document.querySelector(".toggle-moon-icon") as HTMLElement | null;
  const sunIcon = document.querySelector(".toggle-sun-icon") as HTMLElement | null;
  const trackMoonIcon = document.querySelector(".track-moon-icon") as HTMLElement | null;
  const trackSunIcon = document.querySelector(".track-sun-icon") as HTMLElement | null;
  
  if (!moonIcon || !sunIcon) return;
  
  if (theme === "light") {
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
    if (trackMoonIcon) trackMoonIcon.style.display = "block";
    if (trackSunIcon) trackSunIcon.style.display = "none";
  } else {
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
    if (trackMoonIcon) trackMoonIcon.style.display = "none";
    if (trackSunIcon) trackSunIcon.style.display = "block";
  }
}

window.toggleTheme = toggleTheme;

document.addEventListener("DOMContentLoaded", init);

// ==== MODAIS INSTITUCIONAIS ====
const INFO_CONTENT: InfoContent = {
  sobre: {
    eyebrow: 'Institucional',
    title: 'Sobre Nós',
    body: `
      <p>A <strong>Lumière</strong> nasceu da paixão por moda e da crença de que cada pessoa merece calçar com elegância e conforto.</p>
      <p>Somos uma loja de sapatos premium com foco em atendimento personalizado. Nossa curadoria é feita com cuidado, selecionando apenas peças que unem design contemporâneo, materiais de qualidade e conforto real.</p>
      <p>Do tênis esportivo ao social clássico, da sandália de verão à bota robusta — acreditamos que o calçado certo é aquele que combina com quem você é.</p>
      <p>Nossos pedidos são finalizados diretamente pelo WhatsApp, garantindo um atendimento rápido, humano e sem complicações.</p>
      <p class="info-modal-quote">"Cada passo é uma escolha. Escolha bem."</p>
    `
  },
  privacidade: {
    eyebrow: 'Institucional',
    title: 'Política de Privacidade',
    body: `
      <p>Sua privacidade é importante para nós. Esta política descreve como a <strong>Lumière</strong> coleta, usa e protege suas informações.</p>
      <h3>Dados Coletados</h3>
      <p>Coletamos apenas os dados necessários para processar seu pedido: nome e preferências de compra informados voluntariamente no momento do contato via WhatsApp.</p>
      <h3>Uso das Informações</h3>
      <p>Suas informações são utilizadas exclusivamente para:</p>
      <ul>
        <li>Processar e confirmar seu pedido</li>
        <li>Comunicar atualizações sobre sua compra</li>
        <li>Oferecer suporte pós-venda</li>
      </ul>
      <h3>Compartilhamento</h3>
      <p>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros.</p>
      <h3>Segurança</h3>
      <p>Adotamos práticas seguras de armazenamento e comunicação. Nosso atendimento é feito por canais confiáveis como o WhatsApp Business.</p>
      <h3>Contato</h3>
      <p>Dúvidas sobre sua privacidade? Entre em contato: <a href="mailto:kaelvorastudios2026@gmail.com">kaelvorastudios2026@gmail.com</a></p>
    `
  },
  termos: {
    eyebrow: 'Institucional',
    title: 'Termos de Uso',
    body: `
      <p>Ao navegar e realizar compras na <strong>Lumière</strong>, você concorda com os termos abaixo.</p>
      <h3>1. Pedidos</h3>
      <p>Os pedidos são realizados via WhatsApp. Após o envio do carrinho, nossa equipe entrará em contato para confirmar disponibilidade, forma de pagamento e entrega.</p>
      <h3>2. Preços</h3>
      <p>Os preços exibidos no site são em reais (R$) e podem ser atualizados sem aviso prévio. O preço vigente é o confirmado no momento do atendimento.</p>
      <h3>3. Pagamento</h3>
      <p>As formas de pagamento aceitas serão informadas durante o atendimento via WhatsApp.</p>
      <h3>4. Entrega</h3>
      <p>O prazo de entrega varia conforme a região e modalidade escolhida. As informações serão detalhadas no momento da compra.</p>
      <h3>5. Trocas e Devoluções</h3>
      <p>Seguimos o Código de Defesa do Consumidor. Em caso de produtos com defeito ou troca de tamanho, entre em contato em até 7 dias corridos após o recebimento.</p>
      <h3>6. Propriedade Intelectual</h3>
      <p>Todo o conteúdo deste site (textos, imagens, layout) é propriedade da Lumière e protegido por direitos autorais.</p>
    `
  }
};

function openInfoModal(tipo: string): void {
  const data = INFO_CONTENT[tipo];
  if (!data) return;
  const eyebrowEl = document.getElementById('infoModalEyebrow');
  if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;
  const titleEl = document.getElementById('infoModalTitle');
  if (titleEl) titleEl.textContent = data.title;
  const bodyEl = document.getElementById('infoModalBody');
  if (bodyEl) bodyEl.innerHTML = data.body;

  const overlay = document.getElementById('infoModalOverlay');
  if (overlay) overlay.classList.add('open');
  const modal = document.getElementById('infoModal');
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeInfoModal(): void {
  const overlay = document.getElementById('infoModalOverlay');
  if (overlay) overlay.classList.remove('open');
  const modal = document.getElementById('infoModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeInfoModal();
});

window.openInfoModal = openInfoModal;
window.closeInfoModal = closeInfoModal;
