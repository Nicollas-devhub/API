
const carros = [
  {
    id: 1, marca: "Toyota", modelo: "Corolla XEI",
    ano: 2024, km: 0, preco: 175000, status: "novo",
    combustivel: "Flex", cambio: "Automático", cor: "Branco Pérola", cv: "177cv", emoji: "🚗",
    desc: "O Corolla é sinônimo de confiabilidade e sofisticação. Com motor 2.0 flex, câmbio CVT e pacote completo de segurança Toyota Safety Sense."
  },
  {
    id: 2, marca: "Honda", modelo: "Civic Touring",
    ano: 2024, km: 0, preco: 215000, status: "novo",
    combustivel: "Flex", cambio: "CVT", cor: "Preto Cristal", cv: "150cv", emoji: "🚙",
    desc: "O Civic de nova geração combina design arrojado com tecnologia avançada. Honda Sensing incluso, teto solar e central multimídia de 9 polegadas."
  },
  {
    id: 3, marca: "BMW", modelo: "320i M Sport",
    ano: 2023, km: 18000, preco: 285000, status: "usado",
    combustivel: "Gasolina", cambio: "Automático 8v", cor: "Azul Mediterrâneo", cv: "184cv", emoji: "🚘",
    desc: "O clássico da BMW com pacote M Sport. Bancos em couro, head-up display, painel digital e performance alemã incomparável."
  },
  {
    id: 4, marca: "Mercedes-Benz", modelo: "GLA 200 AMG",
    ano: 2023, km: 12000, preco: 390000, status: "destaque",
    combustivel: "Flex", cambio: "Automático 7v", cor: "Cinza Selênio", cv: "163cv", emoji: "🚕",
    desc: "SUV premium com acabamento AMG Line. Bancos aquecidos, câmera 360°, MBUX com assistente de voz e pacote iluminação ambiente 64 cores."
  },
  {
    id: 5, marca: "Volkswagen", modelo: "T-Cross Highline",
    ano: 2024, km: 0, preco: 142000, status: "novo",
    combustivel: "Flex", cambio: "Automático 6v", cor: "Vermelho Flash", cv: "128cv", emoji: "🚐",
    desc: "SUV compacto mais vendido do Brasil com conectividade total, frente de impacto dianteiro, sistema de estacionamento automático e muito mais."
  },
  {
    id: 6, marca: "Jeep", modelo: "Compass S",
    ano: 2023, km: 28000, preco: 195000, status: "usado",
    combustivel: "Diesel", cambio: "Automático 9v", cor: "Preto Granito", cv: "200cv", emoji: "🏎️",
    desc: "Versão S com motor turbodiesel 2.0, tração 4x4 ativa e pacote de equipamentos de série mais completo da família Compass."
  },
  {
    id: 7, marca: "Ford", modelo: "Bronco Sport",
    ano: 2024, km: 5000, preco: 265000, status: "destaque",
    combustivel: "Gasolina", cambio: "Automático 8v", cor: "Verde Area 51", cv: "181cv", emoji: "🚙",
    desc: "O retorno de uma lenda. Bronco Sport com modo G.O.A.T (Goes Over Any Type of Terrain), suspensão elevada e estilo aventureiro incomparável."
  },
  {
    id: 8, marca: "Chevrolet", modelo: "Onix Plus LTZ",
    ano: 2024, km: 0, preco: 98000, status: "novo",
    combustivel: "Flex", cambio: "Automático 6v", cor: "Champagne", cv: "116cv", emoji: "🚗",
    desc: "Sedan mais vendido com motor 1.0 turbo flex, central multimídia myLink com CarPlay/Android Auto e assistente de estacionamento traseiro."
  },
  {
    id: 9, marca: "Hyundai", modelo: "Creta N Line",
    ano: 2023, km: 22000, preco: 128000, status: "usado",
    combustivel: "Flex", cambio: "Automático DCT", cor: "Laranja Sunset", cv: "116cv", emoji: "🚕",
    desc: "SUV com design esportivo N Line, rodas exclusivas de 17 polegadas, difusor traseiro e interior com acabamento em contraste vermelho."
  },
  {
    id: 10, marca: "Porsche", modelo: "Cayenne S",
    ano: 2022, km: 35000, preco: 720000, status: "destaque",
    combustivel: "Gasolina", cambio: "PDK 8v", cor: "Branco Carrara", cv: "440cv", emoji: "🏎️",
    desc: "O SUV esportivo definitivo. Motor V8 biturbo, suspensão pneumática adaptativa, modo Sport Chrono e 0-100 km/h em 4,9 segundos."
  },
  {
    id: 11, marca: "Fiat", modelo: "Pulse Impetus",
    ano: 2024, km: 0, preco: 125000, status: "novo",
    combustivel: "Flex", cambio: "CVT", cor: "Azul Intenso", cv: "130cv", emoji: "🚗",
    desc: "SUV com design italiano e motor turbo 1.3 flex, conexão com smartphone, cruise control adaptativo e painel digital 7 polegadas."
  },
  {
    id: 12, marca: "Renault", modelo: "Kardian E-Tech",
    ano: 2024, km: 1200, preco: 152000, status: "novo",
    combustivel: "Híbrido", cambio: "Automático", cor: "Cinza Highland", cv: "143cv", imagem: "",
    desc: "Primeiro SUV híbrido da Renault no Brasil. Motor E-Tech full hybrid, economia de até 40% no consumo urbano e design europeu premium."
  },
];


let favorites    = new Set();
let activeStatus = '';
let toastTimer;


function formatPrice(v) {
  return 'R$ ' + v.toLocaleString('pt-BR');
}

function getFilteredCars() {
  const q     = document.getElementById('searchInput').value.toLowerCase();
  const marca = document.getElementById('marcaFilter').value;
  const preco = document.getElementById('precoFilter').value;
  const ano   = document.getElementById('anoFilter').value;

  return carros.filter(c => {
    const matchQ      = !q     || `${c.marca} ${c.modelo}`.toLowerCase().includes(q);
    const matchMarca  = !marca || c.marca === marca;
    const matchAno    = !ano   || c.ano === parseInt(ano);
    const matchStatus = !activeStatus || c.status === activeStatus;

    let matchPreco = true;
    if (preco) {
      const [min, max] = preco.split('-').map(Number);
      matchPreco = c.preco >= min && c.preco <= max;
    }

    return matchQ && matchMarca && matchAno && matchPreco && matchStatus;
  });
}

function filterStatus(s) {
  activeStatus = s;
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  event.target.classList.add('active');
  renderCars();
}

function clearFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('marcaFilter').value = '';
  document.getElementById('precoFilter').value = '';
  document.getElementById('anoFilter').value   = '';
  activeStatus = '';
  document.querySelectorAll('nav a').forEach((a, i) => a.classList.toggle('active', i === 0));
  renderCars();
}

function renderCars() {
  const grid = document.getElementById('carsGrid');
  const list = getFilteredCars();

  document.getElementById('resultCount').textContent =
    `${list.length} veículo${list.length !== 1 ? 's' : ''} encontrado${list.length !== 1 ? 's' : ''}`;

  if (!list.length) {
    grid.innerHTML = `
      <div class="empty" style="grid-column:1/-1">
        <div class="empty-icon"></div>
        <h3>Nenhum veículo encontrado</h3>
        <p>Tente ajustar os filtros de busca</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(c => `
    <div class="car-card" onclick="openModal(${c.id})">
      <div class="card-thumb-wrap">
        <div class="car-thumb-placeholder">${c.emoji}</div>
        <span class="card-badge badge-${c.status}">
          ${c.status === 'novo' ? '✦ Novo' : c.status === 'usado' ? '◎ Usado' : '★ Destaque'}
        </span>
        <div class="card-fav ${favorites.has(c.id) ? 'active' : ''}"
             onclick="toggleFav(event, ${c.id})">
          ${favorites.has(c.id) ? '❤️' : '🤍'}
        </div>
      </div>
      <div class="card-body">
        <div class="card-brand">${c.marca}</div>
        <div class="card-name">${c.modelo}</div>
        <div class="card-specs">
          <span class="spec"><span class="spec-icon">📅</span>${c.ano}</span>
          <span class="spec"><span class="spec-icon">⚡</span>${c.cv}</span>
          <span class="spec"><span class="spec-icon">⛽</span>${c.combustivel}</span>
          ${c.km > 0
            ? `<span class="spec"><span class="spec-icon">📍</span>${c.km.toLocaleString('pt-BR')} km</span>`
            : `<span class="spec"><span class="spec-icon">✨</span>0 km</span>`}
        </div>
        <div class="card-footer">
          <div class="card-price">
            ${formatPrice(c.preco)}
            <small>ou até 60x no financiamento</small>
          </div>
          <button class="btn-card"
                  onclick="openModal(${c.id}); event.stopPropagation()">
            Ver mais
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleFav(e, id) {
  e.stopPropagation();
  if (favorites.has(id)) {
    favorites.delete(id);
    showToast('Removido dos favoritos');
  } else {
    favorites.add(id);
    showToast('❤️ Adicionado aos favoritos!');
  }
  renderCars();
}


function openModal(id) {
  const c = carros.find(x => x.id === id);
  if (!c) return;

  document.getElementById('mBrand').textContent = c.marca;
  document.getElementById('mName').textContent  = c.modelo;
  document.getElementById('mThumb').textContent = c.emoji;
  document.getElementById('mPrice').textContent = formatPrice(c.preco);
  document.getElementById('mDesc').textContent  = c.desc;

  const specs = [
    { label: 'Ano',           value: c.ano },
    { label: 'Quilometragem', value: c.km === 0 ? '0 km' : c.km.toLocaleString('pt-BR') + ' km' },
    { label: 'Potência',      value: c.cv },
    { label: 'Câmbio',        value: c.cambio },
    { label: 'Combustível',   value: c.combustivel },
    { label: 'Cor',           value: c.cor },
  ];
  document.getElementById('mSpecs').innerHTML = specs.map(s => `
    <div class="modal-spec-item">
      <div class="modal-spec-label">${s.label}</div>
      <div class="modal-spec-value">${s.value}</div>
    </div>
  `).join('');

  const msg = encodeURIComponent(
    `Olá! Tenho interesse no ${c.marca} ${c.modelo} ${c.ano} por ${formatPrice(c.preco)}. Poderia me passar mais informações?`
  );
  document.getElementById('mWhatsBtn').onclick =
    () => window.open(`https://wa.me/5541999990000?text=${msg}`, '_blank');

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

function init() {
  const brands = [...new Set(carros.map(c => c.marca))].sort();
  const sel    = document.getElementById('marcaFilter');
  brands.forEach(b => {
    const o = document.createElement('option');
    o.value       = b;
    o.textContent = b;
    sel.appendChild(o);
  });

  document.getElementById('totalCount').innerHTML = carros.length + '<span>+</span>';
  renderCars();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalDirect();
});

init();
