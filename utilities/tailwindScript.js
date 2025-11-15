
    // Theme toggle button
    document.getElementById('toggleTheme').addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'light' : 'dark');
      // reflect style for arrows (optional)
      document.querySelectorAll('.carousel-arrow').forEach(b => b.classList.toggle('dark', !isDark));
    });

    // Generic carousel helper (auto-scroll with pause on hover + prev/next)
    function createCarousel(containerId, opts) {
      const container = document.getElementById(containerId);
      if (!container) return;
      const track = container.querySelector('.flex');
      const prevBtn = container.previousElementSibling?.querySelector(`.${opts.prevClass}`) ||
                      container.parentElement.querySelector(`.${opts.prevClass}`);
      const nextBtn = container.previousElementSibling?.querySelector(`.${opts.nextClass}`) ||
                      container.parentElement.querySelector(`.${opts.nextClass}`);

      let speed = opts.speed || 2500; // ms
      let pxPerStep = opts.step || (track ? track.children[0].offsetWidth + parseInt(getComputedStyle(track).gap || 16) : 260);
      let running = true;
      let timer;

      function start() {
        timer = setInterval(() => {
          track.scrollBy({ left: pxPerStep, behavior: 'smooth' });
          // loop: if near end, jump to start smoothly by small timeout
          if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
            setTimeout(() => { track.scrollTo({ left: 0 }); }, 400);
          }
        }, speed);
      }
      function stop() { running = false; clearInterval(timer); }

      // start if track exists
      start();

      // pause/resume on hover
      [track, prevBtn, nextBtn].forEach(el => {
        if (!el) return;
        el.addEventListener('mouseenter', stop);
        el.addEventListener('mouseleave', () => { if (!running) { running = true; start(); }});
      });

      // prev/next buttons
      if (prevBtn) prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -pxPerStep, behavior: 'smooth' });
      });
      if (nextBtn) nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: pxPerStep, behavior: 'smooth' });
      });

      // responsive: update pxPerStep when window resizes
      window.addEventListener('resize', () => {
        pxPerStep = track.children[0].offsetWidth + parseInt(getComputedStyle(track).gap || 16);
      });
    }

    // wire up carousels
    // moviesCarousel and placesCarousel exist in DOM as elements with id
    // Our markup wraps the scrolling flex inside a parent; select the parent by id
    createCarousel('moviesCarousel', { prevClass: 'movie-prev', nextClass: 'movie-next', speed: 2500 });
    createCarousel('placesCarousel', { prevClass: 'place-prev', nextClass: 'place-next', speed: 2800 });
  
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = localStorage.getItem('site-theme'); // 'dark'|'light' or null
    if (stored === 'dark' || (!stored && prefersDark)) document.documentElement.classList.add('dark');
    function setTheme(t) { if (t === 'dark') document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); localStorage.setItem('site-theme', t); }
  