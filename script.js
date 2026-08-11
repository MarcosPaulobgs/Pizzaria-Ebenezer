document.addEventListener('DOMContentLoaded', function(){

  // ---------- CARROSSEL ----------
  const TEMPO_AUTOPLAY = 2000;

  const slides = document.querySelector('.slides');
  const imagens = document.querySelectorAll('.slides img');
  const carrossel = document.querySelector('.carrossel');
  const indicadoresContainer = document.querySelector('.indicadores');
  let indice = 0;

  // Cria um ponto para cada imagem
  imagens.forEach((img, i) => {
    const ponto = document.createElement('div');
    ponto.classList.add('ponto');
    if(i === 0) ponto.classList.add('ativo');
    ponto.addEventListener('click', () => {
      indice = i;
      atualizarSlide();
    });
    indicadoresContainer.appendChild(ponto);
  });

  const pontos = document.querySelectorAll('.ponto');

  function atualizarSlide(){
    slides.style.transform = `translateX(-${indice * 100}%)`;
    pontos.forEach(p => p.classList.remove('ativo'));
    pontos[indice].classList.add('ativo');
  }

  document.getElementById('right').addEventListener('click', () => {
    indice = (indice + 1) % imagens.length;
    atualizarSlide();
  });

  document.getElementById('left').addEventListener('click', () => {
    indice = (indice - 1 + imagens.length) % imagens.length;
    atualizarSlide();
  });

  function passarAutomatico(){
    indice = (indice + 1) % imagens.length;
    atualizarSlide();
  }

  let autoPlay = setInterval(passarAutomatico, TEMPO_AUTOPLAY);

  carrossel.addEventListener('mouseenter', () => clearInterval(autoPlay));
  carrossel.addEventListener('mouseleave', () => autoPlay = setInterval(passarAutomatico, TEMPO_AUTOPLAY));


  // ---------- LIGHTBOX (ampliar foto do carrossel) ----------

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxFechar = document.getElementById('lightbox-fechar');
  const lightboxAnterior = document.getElementById('lightbox-anterior');
  const lightboxProxima = document.getElementById('lightbox-proxima');
  let indiceLightbox = 0;

  function mostrarNoLightbox(i){
    indiceLightbox = i;
    lightboxImg.src = imagens[indiceLightbox].src;
    lightboxImg.alt = imagens[indiceLightbox].alt;
  }

  imagens.forEach((img, i) => {
    img.addEventListener('click', () => {
      mostrarNoLightbox(i);
      lightbox.classList.add('aberto');
    });
  });

  function fecharLightbox(){
    lightbox.classList.remove('aberto');
  }

  lightboxProxima.addEventListener('click', () => {
    mostrarNoLightbox((indiceLightbox + 1) % imagens.length);
  });

  lightboxAnterior.addEventListener('click', () => {
    mostrarNoLightbox((indiceLightbox - 1 + imagens.length) % imagens.length);
  });

  lightboxFechar.addEventListener('click', fecharLightbox);
  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) fecharLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if(!lightbox.classList.contains('aberto')) return;
    if(e.key === 'Escape') fecharLightbox();
    if(e.key === 'ArrowRight') mostrarNoLightbox((indiceLightbox + 1) % imagens.length);
    if(e.key === 'ArrowLeft') mostrarNoLightbox((indiceLightbox - 1 + imagens.length) % imagens.length);
  });


  // ---------- TEMA CLARO / ESCURO ----------
  const interruptorTema = document.getElementById('interruptor-tema');
  const raiz = document.documentElement;

  function aplicarTema(tema){
    raiz.setAttribute('data-tema', tema);
    interruptorTema.setAttribute('aria-pressed', tema === 'escuro');
    localStorage.setItem('tema-ebenezer', tema);
  }

  const temaSalvo = localStorage.getItem('tema-ebenezer');
  const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  aplicarTema(temaSalvo || (prefereEscuro ? 'escuro' : 'claro'));

  interruptorTema.addEventListener('click', () => {
    const atual = raiz.getAttribute('data-tema');
    aplicarTema(atual === 'escuro' ? 'claro' : 'escuro');
  });


  // ---------- ACORDEÃO DO FAQ ----------
  document.querySelectorAll('.faq-pergunta').forEach(function(botao){
    botao.addEventListener('click', function(){
      var item = botao.closest('.faq-item');
      var resposta = item.querySelector('.faq-resposta');
      var aberto = item.classList.contains('aberto');

      document.querySelectorAll('.faq-item.aberto').forEach(function(outro){
        if(outro !== item){
          outro.classList.remove('aberto');
          outro.querySelector('.faq-pergunta').setAttribute('aria-expanded','false');
          outro.querySelector('.faq-resposta').style.maxHeight = null;
        }
      });

      if(aberto){
        item.classList.remove('aberto');
        botao.setAttribute('aria-expanded','false');
        resposta.style.maxHeight = null;
      } else {
        item.classList.add('aberto');
        botao.setAttribute('aria-expanded','true');
        resposta.style.maxHeight = resposta.scrollHeight + 'px';
      }
    });
  });

});
