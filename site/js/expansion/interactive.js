(() => {
  'use strict';
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>';
  const tick = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
  const bind = (element, type, handler, signal) => element.addEventListener(type, handler, { signal });
  const get = (root, name) => root.querySelector(`[data-ui="${name}"]`);
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  function isolateKeys(root, signal) {
    bind(root, 'keydown', event => {
      if (event.target.closest('input,textarea,button,[role="radio"]') && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(event.key)) event.stopPropagation();
    }, signal);
  }

  const tones = {
    quiet: { name: 'Quiet & precise', line: 'Less, with\nintention.', body: 'A clear point of view. Room for the work.', type: 'Sans', palette: 'Graphite + ivory' },
    warm: { name: 'Warm & editorial', line: 'Made with\na point of view.', body: 'Thoughtful work, with a human touch.', type: 'Serif', palette: 'Burgundy + paper' },
    bold: { name: 'Bold & direct', line: 'Good work.\nNo hesitation.', body: 'Say something worth paying attention to.', type: 'Sans', palette: 'Cobalt + white' }
  };
  const actionResult = {
    id: 'action-result', order: 36, name: 'A brief, taking shape', reference: 'disarto_max-2093019047851913475',
    theme: { background: '#101312', ink: '#edf0eb', muted: '#a4ada6', accent: '#bdd1bd' },
    render() {
      return `<div class="xi-brief-layout">
        <section class="xi-brief-form"><span class="xi-eyebrow">01 / START WITH INTENT</span><h1>First, a point<br> of view.</h1><p class="xi-lead">A few useful choices.<br> A direction you can see.</p>
          <form data-ui="brief-form"><label for="xi-project">Project name</label><input id="xi-project" name="project" value="Fieldwork" maxlength="28" required autocomplete="off">
            <fieldset><legend>How should it feel?</legend><div class="xi-tone-options">${Object.keys(tones).map((key, i) => `<button type="button" data-tone="${key}" aria-pressed="${i === 0}">${key[0].toUpperCase() + key.slice(1)}</button>`).join('')}</div></fieldset>
            <button type="submit" class="xi-primary"><span data-ui="keep-label">Keep this direction</span>${arrow}</button><p class="xi-status" data-ui="brief-status" role="status">Change a choice. See what follows.</p>
          </form>
        </section>
        <section class="xi-result-plane" aria-label="Live direction preview"><div class="xi-result-meta"><span>YOUR DIRECTION</span><span data-ui="tone-name">Quiet & precise</span></div>
          <article class="xi-site-preview" data-tone="quiet" data-ui="site-preview"><div class="xi-preview-nav"><span data-ui="project-name">Fieldwork</span><span>Independent studio ↗</span></div><div class="xi-preview-copy"><h2 data-ui="tone-line">Less, with<br> intention.</h2><p data-ui="tone-body">A clear point of view. Room for the work.</p></div><div class="xi-preview-material" aria-hidden="true"><img src="./assets/expansion/interactive/metal-aperture.png" alt=""></div><div class="xi-preview-bottom"><span>Selected work</span><span>01 - 03</span></div></article>
          <div class="xi-result-spec"><span><small>Typography</small><b data-ui="tone-type">Sans</b></span><span><small>Palette</small><b data-ui="tone-palette">Graphite + ivory</b></span><span class="xi-live">Live preview</span></div>
        </section>
      </div>`;
    },
    mount(root, { signal, still, reducedMotion }) {
      isolateKeys(root, signal);
      if (still || reducedMotion) root.classList.add('xi-static');
      let tone = 'quiet';
      const update = () => {
        const selected = tones[tone];
        root.querySelector('#xi-project').setCustomValidity('');
        get(root, 'project-name').textContent = root.querySelector('#xi-project').value.trim() || 'Your project';
        get(root, 'site-preview').dataset.tone = tone;
        ['name', 'line', 'body', 'type', 'palette'].forEach(key => { get(root, `tone-${key}`).textContent = selected[key]; });
        get(root, 'keep-label').textContent = 'Keep this direction';
        get(root, 'brief-status').textContent = 'Change a choice. See what follows.';
      };
      bind(root.querySelector('#xi-project'), 'input', update, signal);
      root.querySelectorAll('[data-tone]').forEach(button => {
        if (button.tagName !== 'BUTTON') return;
        bind(button, 'click', () => {
          tone = button.dataset.tone;
          root.querySelectorAll('button[data-tone]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
          update();
        }, signal);
      });
      bind(get(root, 'brief-form'), 'submit', event => {
        event.preventDefault();
        const project = root.querySelector('#xi-project');
        if (!project.value.trim()) { project.setCustomValidity('Enter a project name.'); project.reportValidity(); return; }
        get(root, 'keep-label').textContent = 'Direction selected';
        get(root, 'brief-status').textContent = `${tones[tone].name} selected for ${root.querySelector('#xi-project').value.trim()}.`;
      }, signal);
    }
  };

  const depthOptions = [
    { title: 'Explore', subtitle: 'Find a direction worth following.', output: 'Distinct visual directions to compare.', detail: 'Compare references, composition and material before committing.' },
    { title: 'Specify', subtitle: 'Make the decisions usable.', output: 'A written design lock.', detail: 'Record type, color, composition and motion so the direction can travel.' },
    { title: 'Build', subtitle: 'Bring an approved direction to life.', output: 'An implementation, with visual checks.', detail: 'Apply the locked decisions, then review the actual browser output.' }
  ];
  const pixelPlan = {
    id: 'pixel-plan', order: 37, name: 'Choose the depth', reference: 'PostiauxCharles-2095509261908382083',
    theme: { background: '#edf0ec', ink: '#173c31', muted: '#567064', accent: '#257259' },
    render() {
      return `<div class="xi-depth-layout"><section class="xi-depth-intro"><span class="xi-eyebrow">THE NEXT USEFUL STEP</span><h1>Make room<br> for detail.</h1><p>From an open question to a clear direction.<br> Choose how far to take it.</p><div class="xi-paper-stack" aria-hidden="true"><div></div><div></div><div><span>DRAWN TO</span><i></i><i></i><i></i><b>Point of view,<br> put to paper.</b></div></div></section>
        <section class="xi-depth-card" aria-labelledby="xi-depth-title"><div class="xi-mint-field" aria-hidden="true"><img class="xi-jade-object" src="./assets/expansion/interactive/jade-aperture.png" alt=""></div><div class="xi-depth-body"><h2 id="xi-depth-title">Choose your next step</h2><p>Different needs. The same care.</p><div class="xi-depth-options" role="radiogroup" aria-label="Output depth">${depthOptions.map((item, i) => `<button type="button" role="radio" tabindex="${i === 1 ? 0 : -1}" aria-checked="${i === 1}" data-depth="${i}"><span class="xi-radio-dot"></span><span><b>${item.title}</b><small>${item.subtitle}</small></span></button>`).join('')}</div><div class="xi-depth-outcome"><small>You leave with</small><b data-ui="depth-output">A written design lock.</b></div><button type="button" class="xi-depth-cta" data-ui="depth-apply">Use this approach ${arrow}</button><p class="xi-depth-status" data-ui="depth-status" role="status">A choice for this preview. No account needed.</p></div></section>
      </div>`;
    },
    mount(root, { signal, still, reducedMotion }) {
      isolateKeys(root, signal);
      if (still || reducedMotion) root.classList.add('xi-static');
      let selected = 1;
      const buttons = [...root.querySelectorAll('[data-depth]')];
      const select = index => {
        selected = index;
        buttons.forEach((button, i) => { button.setAttribute('aria-checked', String(index === i)); button.tabIndex = index === i ? 0 : -1; });
        get(root, 'depth-output').textContent = depthOptions[index].output;
        get(root, 'depth-status').textContent = 'A choice for this preview. No account needed.';
      };
      buttons.forEach((button, index) => {
        bind(button, 'click', () => select(index), signal);
        bind(button, 'keydown', event => {
          if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) {
            event.preventDefault();
            const next = (index + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : 2)) % 3;
            select(next); buttons[next].focus();
          }
        }, signal);
      });
      bind(get(root, 'depth-apply'), 'click', () => {
        get(root, 'depth-status').textContent = `${depthOptions[selected].title} selected. ${depthOptions[selected].detail}`;
      }, signal);
    }
  };

  function wheels(value) {
    return `<span class="xi-odometer" aria-hidden="true">${String(value).padStart(3, ' ').split('').map(char => `<span class="xi-wheel"><span style="--position:${char === ' ' ? 10 : Number(char)}">${'0123456789 '.split('').map(digit => `<i>${digit === ' ' ? '&nbsp;' : digit}</i>`).join('')}</span></span>`).join('')}</span>`;
  }
  const rollingDecisions = {
    id: 'rolling-decisions', order: 38, name: 'A measured point of view', reference: 'kitlangton-2096041674073874765',
    theme: { background: '#0c1010', ink: '#e9efeb', muted: '#98aaa0', accent: '#b9d4c0' },
    render() {
      return `<div class="xi-blend-layout"><header class="xi-blend-heading"><div><span class="xi-eyebrow">DIRECTION IS A MIX</span><h1>A little of this.<br> A little of that.</h1></div><p>Adjust one weight.<br> The others make room.<br> <span>Always a whole point of view.</span></p></header>
        <div class="xi-blend-values">${['Editorial', 'Atmosphere', 'Structure'].map((label, i) => `<section class="xi-blend-part" data-part="${i}"><div class="xi-blend-number" data-number="${i}">${wheels([70,20,10][i])}<span class="xi-percent">%</span><output class="xi-sr" for="xi-weight-${i}">${[70,20,10][i]}%</output></div><label for="xi-weight-${i}"><span class="xi-part-dot"></span>${label}</label><input type="range" id="xi-weight-${i}" min="0" max="100" value="${[70,20,10][i]}" style="--weight-fill:${[70,20,10][i]}%" aria-label="${label} weight" data-weight="${i}"><p>${['Type and space carry the message.', 'Material sets a particular mood.', 'Details reveal how things work.'][i]}</p></section>`).join('')}</div>
        <div class="xi-blend-bottom"><div class="xi-blend-bar" aria-label="Direction blend"><span style="width:70%"></span><span style="width:20%"></span><span style="width:10%"></span></div><div class="xi-blend-legend"><div class="xi-presets" aria-label="Blend presets"><button type="button" data-preset="70,20,10" aria-pressed="true">Quiet</button><button type="button" data-preset="25,60,15" aria-pressed="false">Spatial</button><button type="button" data-preset="30,10,60" aria-pressed="false">Structured</button></div><p><span data-ui="blend-total">100</span><span class="xi-total-unit"> / 100</span> <span class="xi-total-label">Whole by design</span></p></div></div>
        <p class="xi-sr" data-ui="blend-status" role="status"></p>
      </div>`;
    },
    mount(root, { reducedMotion, still, signal }) {
      isolateKeys(root, signal);
      let weights = [70, 20, 10];
      if (reducedMotion || still) root.classList.add('xi-static');
      const update = () => {
        weights.forEach((value, index) => {
          root.querySelector(`[data-weight="${index}"]`).value = value;
          root.querySelector(`[data-weight="${index}"]`).style.setProperty('--weight-fill', `${value}%`);
          root.querySelector(`[data-number="${index}"] output`).textContent = `${value}%`;
          const digits = String(value).padStart(3, ' ').split('');
          root.querySelectorAll(`[data-number="${index}"] .xi-wheel > span`).forEach((wheel, i) => wheel.style.setProperty('--position', digits[i] === ' ' ? 10 : Number(digits[i])));
          root.querySelectorAll('.xi-blend-bar > span')[index].style.width = `${value}%`;
        });
        get(root, 'blend-total').textContent = weights.reduce((total, value) => total + value, 0);
        root.querySelectorAll('[data-preset]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.preset === weights.join(','))));
      };
      root.querySelectorAll('[data-weight]').forEach(input => {
        bind(input, 'input', () => {
          const index = Number(input.dataset.weight);
          const next = Number(input.value);
          const others = [0, 1, 2].filter(i => i !== index);
          const previous = weights[others[0]] + weights[others[1]];
          const first = Math.round((100 - next) * (previous ? weights[others[0]] / previous : .5));
          weights[index] = next;
          weights[others[0]] = first;
          weights[others[1]] = 100 - next - first;
          update();
        }, signal);
        bind(input, 'change', () => { get(root, 'blend-status').textContent = `Editorial ${weights[0]} percent, atmosphere ${weights[1]} percent, structure ${weights[2]} percent. Total 100 percent.`; }, signal);
      });
      root.querySelectorAll('[data-preset]').forEach(button => bind(button, 'click', () => { weights = button.dataset.preset.split(',').map(Number); update(); get(root, 'blend-status').textContent = `${button.textContent} blend: ${weights.join(', ')} percent. Total 100 percent.`; }, signal));
    }
  };

  const surfaces = [
    { title: 'Hero composition', subtitle: 'Make the first impression clear.', caption: 'One promise. One next step.', detail: 'Balance the reading space with one piece of visual evidence.', kind: 'hero' },
    { title: 'Feature set', subtitle: 'Give each claim its own evidence.', caption: 'Different claims. A common language.', detail: 'Keep a coherent visual system while each scene explains something distinct.', kind: 'features' },
    { title: 'Onboarding flow', subtitle: 'Keep the action and result together.', caption: 'A choice, and what it changes.', detail: 'Preserve one stable preview as the user moves through related steps.', kind: 'onboarding' }
  ];
  function surfaceSketch(kind) {
    if (kind === 'hero') return '<div class="xi-sketch-hero"><div><i></i><b>Good ideas.<br> Clearly seen.</b><span></span><em></em></div><figure><i></i><i></i><i></i></figure></div>';
    if (kind === 'features') return '<div class="xi-sketch-features"><b>Three things. Well explained.</b><div><article><i class="xi-mini-ring"></i><span></span><small></small></article><article><i class="xi-mini-layers"></i><span></span><small></small></article><article><i class="xi-mini-bars"></i><span></span><small></small></article></div></div>';
    return '<div class="xi-sketch-onboarding"><div><b>Make it yours.</b><i></i><span></span><span></span><em></em></div><figure><i></i><b>Your direction</b><span></span><span></span></figure></div>';
  }
  const menuPreview = {
    id: 'menu-preview', order: 39, name: 'See what a choice means', reference: 'pqoqubbw-2093012429240431093',
    theme: { background: '#f8f7f2', ink: '#29382f', muted: '#69726b', accent: '#466e50' },
    render() {
      return `<div class="xi-menu-layout"><header><span class="xi-eyebrow">CLARITY BEFORE COMMITMENT</span><h1>Know what<br> you're choosing.</h1><p>A name is a start.<br> A small preview makes it useful.</p></header><div class="xi-menu-demo"><div class="xi-menu-source"><span>BUILD A DIRECTION</span><button type="button" data-ui="menu-trigger" aria-expanded="true" aria-controls="xi-surface-options">Choose a surface <span>+</span></button><small>Start with the part that matters.</small></div><div class="xi-menu-pair"><div class="xi-surface-menu" data-ui="surface-menu" id="xi-surface-options" role="radiogroup" aria-label="Surface type">${surfaces.map((item, i) => `<button type="button" role="radio" tabindex="${i === 0 ? 0 : -1}" aria-checked="${i === 0}" data-surface="${i}"><span class="xi-menu-icon xi-menu-icon-${item.kind}" aria-hidden="true"></span><span><b>${item.title}</b><small>${item.subtitle}</small></span><i>→</i></button>`).join('')}</div><section class="xi-menu-preview" aria-label="Selected surface preview"><div class="xi-mini-browser"><span></span><span></span><span></span><i>drawn.to / composition</i></div><div class="xi-surface-sketch" data-ui="surface-sketch">${surfaceSketch('hero')}</div><div class="xi-menu-description"><h2 data-ui="surface-caption">One promise. One next step.</h2><p data-ui="surface-description">Balance the reading space with one piece of visual evidence.</p></div></section></div><p class="xi-menu-footnote" data-ui="surface-status" role="status">Hero composition selected. Point, focus or tap to explore.</p></div></div>`;
    },
    mount(root, { signal, still, reducedMotion }) {
      isolateKeys(root, signal);
      if (still || reducedMotion) root.classList.add('xi-static');
      let selected = 0;
      const buttons = [...root.querySelectorAll('[data-surface]')];
      const preview = index => {
        get(root, 'surface-sketch').innerHTML = surfaceSketch(surfaces[index].kind);
        get(root, 'surface-caption').textContent = surfaces[index].caption;
        get(root, 'surface-description').textContent = surfaces[index].detail;
      };
      const choose = index => {
        selected = index;
        buttons.forEach((button, i) => { button.setAttribute('aria-checked', String(i === index)); button.tabIndex = i === index ? 0 : -1; });
        preview(index);
        get(root, 'surface-status').textContent = `${surfaces[index].title} selected. Point, focus or tap to explore.`;
      };
      buttons.forEach((button, index) => {
        bind(button, 'pointerenter', () => preview(index), signal);
        bind(button, 'focus', () => preview(index), signal);
        bind(button, 'click', () => choose(index), signal);
        bind(button, 'keydown', event => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const next = (index + (event.key === 'ArrowDown' ? 1 : 2)) % 3;
            choose(next); buttons[next].focus();
          }
        }, signal);
      });
      bind(get(root, 'surface-menu'), 'pointerleave', () => preview(selected), signal);
      const toggle = open => {
        get(root, 'surface-menu').hidden = !open;
        get(root, 'menu-trigger').setAttribute('aria-expanded', String(open));
      };
      bind(get(root, 'menu-trigger'), 'click', () => toggle(get(root, 'surface-menu').hidden), signal);
      bind(root, 'keydown', event => { if (event.key === 'Escape') { event.stopPropagation(); toggle(false); get(root, 'menu-trigger').focus(); } }, signal);
    }
  };

  function contrast(foreground, background) {
    const luminance = hex => {
      const rgb = hex.match(/[0-9a-f]{2}/gi).map(channel => parseInt(channel, 16) / 255).map(channel => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4);
      return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
    };
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    return (values[0] + .05) / (values[1] + .05);
  }
  let keptNote = 'Leave a little room\nfor the unexpected.';
  const workingWidgets = {
    id: 'working-widgets', order: 40, name: 'Small tools, useful decisions', reference: 'MSchwaibold-2096059496812716307',
    theme: { background: '#f8f9f7', ink: '#29322c', muted: '#69736b', accent: '#376c51' },
    render() {
      return `<div class="xi-workbench-layout"><header><div><span class="xi-eyebrow">A LITTLE HELP, AT THE RIGHT MOMENT</span><h1>Small tools.<br> Better decisions.</h1></div><p>Keep a thought. Test a detail.<br> Build the direction one choice at a time.</p></header><div class="xi-widget-grid">
        <section class="xi-widget xi-note-widget"><div class="xi-widget-label"><label for="xi-note">Direction note</label><span>01</span></div><textarea id="xi-note" spellcheck="false" aria-label="Direction note" maxlength="200">${escape(keptNote)}</textarea><div class="xi-note-footer"><span data-ui="note-status" role="status">Draft in this session</span><button type="button" data-ui="note-save">Keep note ${arrow}</button></div></section>
        <section class="xi-widget xi-contrast-widget"><div class="xi-widget-label"><span>Ink & ground</span><button type="button" data-ui="contrast-swap" aria-label="Swap contrast colors">⇄</button></div><div class="xi-contrast-sample" data-ui="contrast-sample"><span class="xi-type-specimen">Aa</span><span data-ui="contrast-ratio">${contrast('#19352b','#e2eec9').toFixed(2)}<small>:1</small></span></div><p data-ui="contrast-description">${escape('#19352B')} on ${escape('#E2EEC9')}</p></section>
        <section class="xi-widget xi-radius-widget"><div class="xi-widget-label"><label for="xi-radius">Shape study</label><output for="xi-radius" data-ui="radius-value">24 px</output></div><div class="xi-radius-stage"><span class="xi-ruler-horizontal" aria-hidden="true"></span><span class="xi-ruler-vertical" aria-hidden="true"></span><div data-ui="radius-shape"><span></span><i></i><i></i></div></div><input type="range" id="xi-radius" min="0" max="40" value="24" style="--weight-fill:60%" aria-label="Corner radius"></section>
        <section class="xi-widget xi-review-widget"><div class="xi-review-top"><div><span class="xi-widget-label">Review notes</span><h2><span data-ui="review-count">0</span><small> / 3 considered</small></h2></div><span class="xi-review-mark" data-ui="review-mark" aria-hidden="true">${tick}</span></div><div class="xi-review-checks">${['Content is truthful', 'The direction holds', 'The action is clear'].map((item, i) => `<label><input type="checkbox" data-check="${i}"><span>${item}</span></label>`).join('')}</div><p class="xi-sr" data-ui="review-status" role="status"></p></section>
      </div></div>`;
    },
    mount(root, { signal, still, reducedMotion }) {
      isolateKeys(root, signal);
      if (still || reducedMotion) root.classList.add('xi-static');
      const note = root.querySelector('#xi-note');
      bind(note, 'input', () => { get(root, 'note-status').textContent = 'Draft in this session'; }, signal);
      bind(get(root, 'note-save'), 'click', () => { if (note.value.trim()) { keptNote = note.value; get(root, 'note-status').textContent = 'Kept for this session'; } else get(root, 'note-status').textContent = 'Add a thought first'; }, signal);
      let reversed = false;
      bind(get(root, 'contrast-swap'), 'click', () => {
        reversed = !reversed;
        const foreground = reversed ? '#e2eec9' : '#19352b';
        const background = reversed ? '#19352b' : '#e2eec9';
        get(root, 'contrast-sample').style.color = foreground;
        get(root, 'contrast-sample').style.background = background;
        get(root, 'contrast-ratio').innerHTML = `${contrast(foreground, background).toFixed(2)}<small>:1</small>`;
        get(root, 'contrast-description').textContent = `${foreground.toUpperCase()} on ${background.toUpperCase()}`;
      }, signal);
      bind(root.querySelector('#xi-radius'), 'input', event => {
        const value = Number(event.target.value);
        get(root, 'radius-shape').style.borderRadius = `${value}px`;
        event.target.style.setProperty('--weight-fill', `${value * 2.5}%`);
        get(root, 'radius-value').textContent = `${value} px`;
      }, signal);
      root.querySelectorAll('[data-check]').forEach(input => bind(input, 'change', () => {
        const count = root.querySelectorAll('[data-check]:checked').length;
        get(root, 'review-count').textContent = count;
        get(root, 'review-mark').classList.toggle('is-complete', count === 3);
        get(root, 'review-mark').style.setProperty('--review-progress', `${count / 3 * 100}%`);
        get(root, 'review-status').textContent = `${count} of 3 review points considered.`;
      }, signal));
    }
  };

  window.DrawnToPages = [...(window.DrawnToPages || []), actionResult, pixelPlan, rollingDecisions, menuPreview, workingWidgets];
})();
