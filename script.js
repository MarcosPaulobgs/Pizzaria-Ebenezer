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