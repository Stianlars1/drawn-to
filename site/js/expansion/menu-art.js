/* One miniature scene with a shared projection, edge thickness and light direction. */
(() => {
  window.DrawnToMenuArt =
    () => `<svg class="xi-composed-art" viewBox="0 0 240 180" role="img" aria-label="A carefully folded paper sculpture, framed by a sage green architectural arch.">
  <defs>
    <linearGradient id="mp-wall" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d0d9c2"/><stop offset=".55" stop-color="#a4b495"/><stop offset="1" stop-color="#738b70"/></linearGradient>
    <linearGradient id="mp-side"><stop stop-color="#4b6250"/><stop offset="1" stop-color="#71866a"/></linearGradient>
    <linearGradient id="mp-paper" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#fffdf1"/><stop offset=".68" stop-color="#e9e7d7"/><stop offset="1" stop-color="#bec5b0"/></linearGradient>
    <linearGradient id="mp-fold"><stop stop-color="#f6f4e6"/><stop offset=".5" stop-color="#d6dcc7"/><stop offset="1" stop-color="#8a9d80"/></linearGradient>
    <radialGradient id="mp-ground"><stop stop-color="#334a31" stop-opacity=".23"/><stop offset="1" stop-color="#334a31" stop-opacity="0"/></radialGradient>
  </defs>
  <ellipse cx="139" cy="156" rx="94" ry="19" fill="url(#mp-ground)"/>
  <path d="M70 141V65C70 28 105 13 137 19L193 30V144L130 166Z" fill="url(#mp-side)"/>
  <path d="M58 133V63C58 25 94 9 126 15L180 26V136L120 158Z" fill="url(#mp-wall)" stroke="#d9dfcc" stroke-width=".7"/>
  <path d="M83 134V70C83 43 103 30 125 35L155 41V139L120 152Z" fill="#6b8268"/>
  <path d="M88 135V72C88 47 104 36 125 40L150 46V140L120 151Z" fill="#e1e5d2"/>
  <path d="M88 135L115 106L179 124L151 154Z" fill="#758a6e" opacity=".35"/>
  <path d="M96 137L112 64L146 78L131 148Z" fill="url(#mp-paper)" stroke="#fbfbef" stroke-width=".8"/>
  <path d="M112 64L145 78L169 136L132 148Z" fill="url(#mp-fold)" stroke="#e2e6d6" stroke-width=".7"/>
  <path d="M145 78L184 64L170 137L132 148Z" fill="url(#mp-paper)" stroke="#f7f8ee" stroke-width=".8"/>
  <path d="M96 137L131 150L171 139L170 136L132 146Z" fill="#7f9178"/>
  <path d="M106 123L113 87M116 126L123 91M126 128L133 96" stroke="#bcc8b0" stroke-width=".6"/>
  <path d="M157 89L174 83M155 100L172 94M153 111L169 105" stroke="#acbca0" stroke-width=".6"/>
  <path d="M112 64L145 78L184 64" fill="none" stroke="#fffef5" stroke-width="1.2"/>
  <path d="M58 132L120 158L180 136" fill="none" stroke="#536e54" stroke-opacity=".45" stroke-width=".8"/>
  <circle cx="65" cy="145" r="8" fill="#cb8048"/><path d="M60 142C64 138 68 140 69 144" fill="none" stroke="#edc293" stroke-width="1.2"/>
  </svg>`;
})();
