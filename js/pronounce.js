const audioCache = {};

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.pronounce-btn');
  if (!btn) return;

  const src = btn.dataset.audio;

  // Stop whatever's currently playing, if anything
  for (const key in audioCache) {
    if (key !== src) {
      audioCache[key].pause();
      audioCache[key].currentTime = 0;
    }
  }

  // Reuse cached audio if we've played this one before, else create it
  if (!audioCache[src]) {
    audioCache[src] = new Audio(src);
  }

  const audio = audioCache[src];
  audio.currentTime = 0; // restart from beginning even if it was mid-play
  audio.play();
});
