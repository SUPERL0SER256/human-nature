const WORD_HOLD = 3000;
const FADE = 1000;

const stage = document.getElementById('stage');
let scanning = true;
let videoStream = null;

function renderIdle() {
  stage.innerHTML = `
    <div class="idle-screen">
      <h1 class="idle-title">Human Nature</h1>
      <div class="scan-frame">
        <video id="scanner-video" autoplay playsinline muted></video>
        <div class="corner tl"></div>
        <div class="corner tr"></div>
        <div class="corner bl"></div>
        <div class="corner br"></div>
      </div>
      <p class="idle-subtext">scan your card</p>
    </div>
    <a href="gallery.html" class="gallery-btn">▦</a>
  `;
  startScanner();
}

function renderWord(slide) {
  const delayPerLetter = 0.15;
  const letters = slide.word.split('').map((char, i) => {
    if (char === ' ') return '&nbsp;';
    return `<span style="animation-delay: ${i * delayPerLetter}s">${char}</span>`;
  }).join('');

  const totalRevealTime = slide.word.length * delayPerLetter + 1.5;
  const holdTime = 2.0;
  const fadeOutTime = 1.0;
  const totalAnimTime = totalRevealTime + holdTime + fadeOutTime;

  stage.innerHTML = `
    <div class="word-beat">
      <h1 style="animation: wordContainer ${totalAnimTime}s cubic-bezier(0.16, 1, 0.3, 1) forwards;">
        ${letters}
      </h1>
    </div>
  `;
  
  setTimeout(() => renderSlide(slide), totalAnimTime * 1000 + 200);
}

function renderSlide(slide) {
  stage.innerHTML = `
    <div class="slide-beat">
      <div class="slide-bg" style="background-image: url('${slide.image}');"></div>
      <img src="${slide.image}" alt="${slide.word}" class="slide-img">
      <button class="arrow-btn" id="next-btn">→</button>
    </div>
  `;
  document.getElementById('next-btn').onclick = () => renderPrompt(slide);
}

function renderPrompt(slide) {
  stage.innerHTML = `
    <div class="prompt-beat">
      <p>${slide.prompt}</p>
      <button class="arrow-btn" id="reset-btn">→</button>
    </div>
  `;
  document.getElementById('reset-btn').onclick = () => {
    scanning = true;
    renderIdle();
  };
}

function handleScan(id) {
  const slide = slides.find(s => s.id === id);
  if (!slide) return; // unrecognized code, keep scanning
  scanning = false;
  stopScanner();
  renderWord(slide);
}

async function startScanner() {
  const video = document.getElementById('scanner-video');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  try {
    videoStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = videoStream;
    await video.play();
    requestAnimationFrame(() => scanLoop(video, canvas, ctx));
  } catch (err) {
    console.error('Camera access failed:', err);
  }
}

function stopScanner() {
  if (videoStream) {
    videoStream.getTracks().forEach(t => t.stop());
    videoStream = null;
  }
}

function scanLoop(video, canvas, ctx) {
  if (!scanning) return;
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
      handleScan(code.data.trim());
      return;
    }
  }
  requestAnimationFrame(() => scanLoop(video, canvas, ctx));
}

renderIdle();

// Keybind to reload the page
document.addEventListener('keydown', (e) => {
  if (e.key === 'r' || e.key === 'R') {
    window.location.reload();
  }
});