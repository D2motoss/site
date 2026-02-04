document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CONFIGURAÇÃO DA MOTO (SEO + GALERIA)
  =============================== */

  const moto = {
    nome: "Kawasaki Z400 ABS 2021",
    preco: "R$ 27.990",
    descricao: "Kawasaki Z400 ABS 2021 à venda na D2 Motos em Itajaí. Moto esportiva, ABS, excelente estado e procedência.",
    imagens: [
      "fotos_detalhes/Kawasaki Z400 ABS 2021.jpeg",
      "fotos_detalhes/Fazer 250 ABS 2024.jpeg",
      "fotos_detalhes/CB Twister 250 2022.jpeg"
    ]
  };

  /* ===============================
     SEO AUTOMÁTICO
  =============================== */

  document.title = `${moto.nome} | D2 Motos`;

  let metaDesc = document.querySelector("meta[name='description']");
  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = moto.descricao;

  /* ===============================
     GALERIA BASE
  =============================== */

  let atual = 0;

  const imagemPrincipal = document.getElementById("imagemPrincipal");
  const thumbs = document.querySelectorAll(".thumb");
  const container = document.getElementById("zoomContainer");
  const lupa = document.getElementById("lupa");

  function atualizarImagem() {
    imagemPrincipal.style.opacity = 0;

    setTimeout(() => {
      imagemPrincipal.src = moto.imagens[atual];
      imagemPrincipal.style.opacity = 1;
    }, 200);

    thumbs.forEach((t, i) => {
      t.classList.toggle("ativa", i === atual);
    });
  }

  window.proxima = function () {
    atual = (atual + 1) % moto.imagens.length;
    atualizarImagem();
  };

  window.anterior = function () {
    atual = (atual - 1 + moto.imagens.length) % moto.imagens.length;
    atualizarImagem();
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      atual = index;
      atualizarImagem();
    });
  });

  atualizarImagem();

  /* ===============================
     ZOOM LUPA (DESKTOP)
  =============================== */

if (container && lupa && window.innerWidth > 768) {

  container.addEventListener("mousemove", (e) => {

    const imgRect = imagemPrincipal.getBoundingClientRect();

    // posição do mouse relativa à imagem REAL
    const x = e.clientX - imgRect.left;
    const y = e.clientY - imgRect.top;

    // impede erro fora da imagem
    if (x < 0 || y < 0 || x > imgRect.width || y > imgRect.height) {
      lupa.style.display = "none";
      return;
    }

    const xPercent = (x / imgRect.width) * 100;
    const yPercent = (y / imgRect.height) * 100;

    lupa.style.backgroundImage = `url('${imagemPrincipal.src}')`;
    lupa.style.backgroundSize = "220%"; // zoom realista
    lupa.style.backgroundPosition = `${xPercent}% ${yPercent}%`;

    lupa.style.left = `${x - 70}px`;
    lupa.style.top = `${y - 70}px`;
    lupa.style.display = "block";
  });

  container.addEventListener("mouseleave", () => {
    lupa.style.display = "none";
  });
}

  /* ===============================
     SWIPE MOBILE (ARRASTAR)
  =============================== */

  let startX = 0;
  let endX = 0;

  imagemPrincipal.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  imagemPrincipal.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        proxima();
      } else {
        anterior();
      }
    }
  }

  /* ===============================
     ZOOM FULLSCREEN MOBILE
  =============================== */

  imagemPrincipal.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      abrirFullscreen();
    }
  });

  function abrirFullscreen() {
    const overlay = document.createElement("div");
    overlay.className = "fullscreen-overlay";

    overlay.innerHTML = `
      <span class="fechar">×</span>
      <img src="${imagemPrincipal.src}">
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".fechar").onclick = () => {
      overlay.remove();
    };
  }

});
