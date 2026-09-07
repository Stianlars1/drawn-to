(() => {
  const m = window.DrawnToMotion;
  const knob = (label, key, value = 50) =>
    `<label class="mi-knob-label"><span>${label}</span><div class="mi-knob" style="--value:${value}"><i></i></div><input type="range" min="0" max="100" value="${value}" data-knob="${key}" aria-label="${label}"><output>${value}</output></label>`;
  const plot = (name) =>
    `<svg class="mi-plot" viewBox="0 0 320 140" fill="none" aria-hidden="true"><g stroke="currentColor" opacity=".12"><path d="M12 18H308M12 50H308M12 82H308M12 114H308M36 12V126M100 12V126M164 12V126M228 12V126M292 12V126"/></g><path data-plot="${name}" d="M12 112C83 112 112 26 200 26S259 79 308 32" stroke="currentColor" stroke-width="1.8"/><circle cx="200" cy="26" r="3" fill="currentColor"/></svg>`;
  function bindKnobs(root, signal, onChange) {
    root.querySelectorAll("[data-knob]").forEach((input) =>
      input.addEventListener(
        "input",
        () => {
          const value = +input.value;
          input
            .closest("label")
            .querySelector(".mi-knob")
            .style.setProperty("--value", value);
          input.closest("label").querySelector("output").value = value;
          onChange(input.dataset.knob, value);
        },
        { signal },
      ),
    );
  }
  const pages = [
    {
      id: "chamber-control",
      order: 65,
      series: "motion",
      name: "a precise kind of feeling",
      reference: "SebCornelius-2092618652994744578",
      theme: {
        background: "#292e2d",
        ink: "#e2e1d5",
        muted: "#afb3a8",
        accent: "#ed8a4a",
      },
      render() {
        return `<header class="mi-console-heading"><div><span class="mo-eyebrow">THE MATERIAL LABORATORY</span><h1>A precise<br> kind of <em>feeling.</em></h1></div><p>Turn a control.<br>See a thought become a state.</p></header><section class="mi-console"><div class="mi-console-bar"><span><i></i> FIELD INSTRUMENT / 02</span><span>INTERACTIVE STUDY</span></div><div class="mi-console-grid"><section class="mi-console-nav"><span>EXPERIMENT</span><b>Surface response</b><div><i></i> Excitation <output data-excitation>62</output></div><div><i></i> Damping <output data-damping>35</output></div><div><i></i> Light angle <output data-angle>46</output></div><small>LOCAL MODEL<br>NO CONNECTED EQUIPMENT</small></section><section class="mi-console-response"><span>Response curve</span>${plot("response")}<div><b data-response>0.62</b><small>RELATIVE RESPONSE</small></div></section><section class="mi-console-dial">${knob("Excitation", "excitation", 62)}</section><section class="mi-console-switch"><span>Illumination</span><button type="button" data-illumination aria-pressed="true"><i></i><span>ON</span></button><small>A LIGHT WITH A PURPOSE</small></section><section class="mi-console-mode"><span>Surface character</span><div role="group" aria-label="Surface character"><button type="button" data-character="0" aria-pressed="true">STABLE</button><button type="button" data-character="1" aria-pressed="false">RESPONSIVE</button><button type="button" data-character="2" aria-pressed="false">EXPRESSIVE</button></div></section><section class="mi-console-dial">${knob("Damping", "damping", 35)}</section><section class="mi-console-dial">${knob("Light angle", "angle", 46)}</section><section class="mi-console-meter"><span>Energy distribution</span><div class="mi-meter-bars">${Array.from({ length: 23 }, (_, i) => `<i style="--bar:${20 + Math.sin(i * 0.35) * 35 + i}"></i>`).join("")}</div><small><b data-distribution>62</b> / 100 · RELATIVE LEVEL</small></section></div></section>`;
      },
      mount(root, { signal }) {
        let excitation = 62,
          damping = 35,
          angle = 46;
        function update() {
          root.querySelector("[data-excitation]").value = excitation;
          root.querySelector("[data-damping]").value = damping;
          root.querySelector("[data-angle]").value = angle;
          root.querySelector("[data-response]").textContent = (
            excitation / 100
          ).toFixed(2);
          root.querySelector("[data-distribution]").textContent = excitation;
          root
            .querySelector("[data-plot=response]")
            .setAttribute(
              "d",
              `M12 112C83 112 ${80 + damping} ${110 - excitation} 200 ${110 - excitation}S259 ${110 - angle} 308 ${110 - excitation * 0.8}`,
            );
          root
            .querySelectorAll(".mi-meter-bars i")
            .forEach((bar, i) =>
              bar.style.setProperty(
                "--bar",
                Math.max(
                  4,
                  (0.45 + 0.55 * Math.sin(i * 0.17 + angle * 0.03) ** 2) *
                    excitation,
                ),
              ),
            );
        }
        bindKnobs(root, signal, (key, v) => {
          if (key === "excitation") excitation = v;
          if (key === "damping") damping = v;
          if (key === "angle") angle = v;
          update();
        });
        root.querySelector("[data-illumination]").addEventListener(
          "click",
          (e) => {
            const b = e.currentTarget,
              on = b.getAttribute("aria-pressed") !== "true";
            b.setAttribute("aria-pressed", on);
            b.querySelector("span").textContent = on ? "ON" : "OFF";
            root.dataset.light = on;
          },
          { signal },
        );
        root.querySelectorAll("[data-character]").forEach((b) =>
          b.addEventListener(
            "click",
            () => {
              root.dataset.character = b.dataset.character;
              [excitation, damping, angle] = [
                [45, 65, 35],
                [62, 35, 46],
                [90, 20, 68],
              ][+b.dataset.character];
              for (const [key, v] of Object.entries({
                excitation,
                damping,
                angle,
              })) {
                const input = root.querySelector(`[data-knob="${key}"]`);
                input.value = v;
                input.closest("label").querySelector("output").value = v;
                input
                  .closest("label")
                  .querySelector(".mi-knob")
                  .style.setProperty("--value", v);
              }
              update();
              root
                .querySelectorAll("[data-character]")
                .forEach((x) =>
                  x.setAttribute("aria-pressed", String(x === b)),
                );
            },
            { signal },
          ),
        );
        update();
      },
    },
    {
      id: "quiet-frequency",
      order: 66,
      series: "motion",
      name: "a frequency of your own",
      reference: "emilwidlund-2093066923693011027",
      theme: {
        background: "#131616",
        ink: "#e6e6dd",
        muted: "#929f99",
        accent: "#d6b08a",
      },
      render() {
        return `<header class="mi-sound-heading"><div><span class="mo-eyebrow">A SMALL INSTRUMENT FOR A QUIET MOMENT</span><h1>A frequency<br>of your <em>own.</em></h1></div><button type="button" data-audio-toggle aria-pressed="false">Start listening <span>▶</span></button></header><div class="mi-sound-rack"><section class="mi-sound-master"><div><span>THE SHAPE OF A SOUND</span><b data-audio-status>Sound is off</b></div><canvas data-audio-scope aria-hidden="true"></canvas><div class="mi-sound-time"><span>01 / AMBIENT STUDY</span><output data-audio-time>00:00</output></div></section><section class="mi-sound-module"><span>Fundamental</span>${knob("Frequency", "frequency", 32)}<small>SINE / TRIANGLE</small></section><section class="mi-sound-module"><span>Filter</span>${knob("Openness", "filter", 48)}<small>LOW-PASS / WARM</small></section><section class="mi-sound-module mi-sound-space"><span>Space</span><div class="mi-delay-diagram" aria-hidden="true"><i></i><i></i><i></i><b>·</b></div>${knob("Echo", "echo", 35)}<small>A LITTLE ROOM AROUND THE NOTE</small></section><section class="mi-sound-module mi-sound-level"><span>Output</span><div class="mi-sound-level-bars" aria-hidden="true">${Array.from({ length: 28 }, () => "<i></i>").join("")}</div><label>Level <input type="range" min="0" max="100" value="22" data-audio-level aria-label="Listening level"><output>22</output></label><small>STARTS ONLY WHEN YOU ASK</small></section></div><p class="mi-sound-caption">A soft tone, made here. Adjust it until it feels right.</p>`;
      },
      async mount(root, { signal, reducedMotion }) {
        let audio = null,
          osc = null,
          harmonic = null,
          filter = null,
          delay = null,
          feedback = null,
          gain = null,
          analyser = null,
          raf = 0,
          playing = false,
          elapsed = 0,
          started = 0;
        const canvas = root.querySelector("canvas"),
          ctx = canvas.getContext("2d"),
          button = root.querySelector("[data-audio-toggle]");
        const values = { frequency: 32, filter: 48, echo: 35, level: 22 };
        const media = matchMedia("(prefers-reduced-motion:reduce)");
        function update() {
          if (!audio) return;
          const now = audio.currentTime;
          osc.frequency.setTargetAtTime(60 + values.frequency * 2.2, now, 0.06);
          harmonic.frequency.setTargetAtTime(
            (60 + values.frequency * 2.2) * 1.502,
            now,
            0.08,
          );
          filter.frequency.setTargetAtTime(
            220 + values.filter ** 2 * 1.3,
            now,
            0.07,
          );
          feedback.gain.setTargetAtTime(values.echo / 220, now, 0.08);
          gain.gain.setTargetAtTime((values.level / 100) * 0.075, now, 0.06);
        }
        function draw() {
          const w = canvas.width,
            h = canvas.height;
          ctx.clearRect(0, 0, w, h);
          ctx.strokeStyle = "#d6c1a4";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          const data = new Uint8Array(256);
          if (analyser && playing) analyser.getByteTimeDomainData(data);
          for (let i = 0; i < 256; i++) {
            const y = playing
              ? ((data[i] - 128) / 128) * h * 0.44 + h * 0.5
              : h * 0.5 + Math.sin(i * 0.064) * h * 0.015;
            const x = (i / 255) * w;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          if (playing) {
            const secs = Math.floor(
              elapsed + (performance.now() - started) / 1000,
            );
            root.querySelector("[data-audio-time]").value =
              `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
            root
              .querySelectorAll(".mi-sound-level-bars i")
              .forEach(
                (bar, i) =>
                  (bar.style.opacity = String(
                    0.18 +
                      (Math.max(0, Math.sin(i * 0.35 + secs * 0.5)) *
                        values.level) /
                        100,
                  )),
              );
          }
          if (playing && !media.matches && !document.hidden)
            raf = requestAnimationFrame(draw);
        }
        function resize() {
          const r = canvas.getBoundingClientRect();
          canvas.width = Math.max(1, r.width * 1.5);
          canvas.height = Math.max(1, r.height * 1.5);
          if (!playing) draw();
        }
        const observer = new ResizeObserver(resize);
        observer.observe(canvas);
        resize();
        button.addEventListener(
          "click",
          async () => {
            if (playing) {
              playing = false;
              elapsed += (performance.now() - started) / 1000;
              await audio.suspend();
              cancelAnimationFrame(raf);
              button.innerHTML = "Start listening <span>▶</span>";
              button.setAttribute("aria-pressed", "false");
              root.querySelector("[data-audio-status]").textContent =
                "Sound is off";
              draw();
              return;
            }
            try {
              if (!audio) {
                audio = new AudioContext();
                osc = audio.createOscillator();
                harmonic = audio.createOscillator();
                harmonic.type = "triangle";
                filter = audio.createBiquadFilter();
                filter.type = "lowpass";
                delay = audio.createDelay(1);
                delay.delayTime.value = 0.34;
                feedback = audio.createGain();
                gain = audio.createGain();
                gain.gain.value = 0;
                analyser = audio.createAnalyser();
                analyser.fftSize = 512;
                const harmonicGain = audio.createGain();
                harmonicGain.gain.value = 0.15;
                osc.connect(filter);
                harmonic.connect(harmonicGain).connect(filter);
                filter.connect(gain);
                filter.connect(delay).connect(feedback).connect(delay);
                delay.connect(gain);
                gain.connect(analyser).connect(audio.destination);
                osc.start();
                harmonic.start();
                update();
              }
              await audio.resume();
              if (signal.aborted) {
                await audio.close();
                return;
              }
              playing = true;
              started = performance.now();
              button.innerHTML = "Stop listening <span>Ⅱ</span>";
              button.setAttribute("aria-pressed", "true");
              root.querySelector("[data-audio-status]").textContent =
                "A live, generated tone";
              draw();
            } catch {
              root.querySelector("[data-audio-status]").textContent =
                "Audio unavailable in this browser.";
            }
          },
          { signal },
        );
        bindKnobs(root, signal, (key, v) => {
          values[key] = v;
          update();
          if (!playing) draw();
        });
        root.querySelector("[data-audio-level]").addEventListener(
          "input",
          (e) => {
            values.level = +e.target.value;
            e.target.parentElement.querySelector("output").value =
              e.target.value;
            update();
          },
          { signal },
        );
        const suspend = () => {
          if (document.hidden && playing) {
            playing = false;
            elapsed += (performance.now() - started) / 1000;
            audio?.suspend();
            cancelAnimationFrame(raf);
            button.innerHTML = "Start listening <span>▶</span>";
            button.setAttribute("aria-pressed", "false");
            root.querySelector("[data-audio-status]").textContent =
              "Paused while away";
          }
        };
        document.addEventListener("visibilitychange", suspend, { signal });
        media.addEventListener(
          "change",
          () => {
            cancelAnimationFrame(raf);
            draw();
          },
          { signal },
        );
        root.__audioState = () => ({
          playing,
          state: audio?.state || "uninitialized",
        });
        return () => {
          playing = false;
          cancelAnimationFrame(raf);
          observer.disconnect();
          audio?.close();
        };
      },
    },
    {
      id: "common-clock",
      order: 67,
      series: "motion",
      name: "one shared rhythm",
      reference: "jeetnirnejak-2092611495448445101",
      theme: {
        background: "#f0f1e9",
        ink: "#283c3d",
        muted: "#738381",
        accent: "#aa6a42",
      },
      render() {
        return `<div class="mi-clock-copy"><span class="mo-eyebrow">THE RELATIONSHIP BETWEEN THE PARTS</span><h1>Many paths.<br>One <em>rhythm.</em></h1><p>A thought goes out.<br>A more considered one comes back.</p><button type="button" data-run-sequence>Watch the sequence <span>↗</span></button><span data-clock-status role="status">A complete idea, ready to explore.</span></div><div class="mi-clock-sheet"><div class="mi-sheet-top"><span>FIELD / COLLECTIVE STUDY</span><span>FIG. 04</span></div><svg viewBox="0 0 640 510" aria-label="A central idea connected to four parts that return to one shared result"><defs><linearGradient id="mi-node" x2="1" y2="1"><stop stop-color="#fafcf2"/><stop offset="1" stop-color="#d3e0d7"/></linearGradient></defs><g fill="none" stroke="#627c771e">${Array.from({ length: 13 }, (_, i) => `<path d="M${32 + i * 48} 35V475"/>`).join("")}${Array.from({ length: 10 }, (_, i) => `<path d="M25 ${45 + i * 46}H615"/>`).join("")}</g><g fill="none" stroke="#69867b" stroke-width="1.2">${["M320 120C320 182 108 166 108 250", "M320 120C320 178 250 190 250 250", "M320 120C320 178 394 190 394 250", "M320 120C320 182 536 166 536 250"].map((d, i) => `<path id="mi-route-${i}" d="${d}"/>`).join("")}</g><g transform="translate(270 45)"><path d="M0 33 50 7 100 33 50 59Z" fill="#f7f8ef" stroke="#80948a"/><path d="M0 33v26l50 27 50-27V33L50 59Z" fill="#ccd9d0" stroke="#80948a"/><path d="M50 59v27" stroke="#80948a"/><path d="M26 33 50 20 74 33 50 46Z" fill="#304c45"/><text x="50" y="105" text-anchor="middle" fill="#426054" font-size="10">THE INITIAL IDEA</text></g>${["Observe", "Explore", "Make", "Refine"].map((name, i) => `<g class="mi-process-node" data-node="${i}" transform="translate(${66 + i * 143} 258)"><rect width="84" height="83" rx="4" fill="url(#mi-node)" stroke="#839c912b"/><path d="M12 16h60M12 67h60" stroke="#9bb1a34d"/><g stroke="#557465" fill="none">${i === 0 ? '<circle cx="42" cy="41" r="15"/><circle cx="42" cy="41" r="7"/><path d="M42 21v9m0 23v9M22 41h9m22 0h9"/>' : i === 1 ? '<path d="M22 50 33 31 45 44 58 27 65 50Z"/><path d="M26 56h35"/>' : i === 2 ? '<path d="m23 38 19-11 19 11-19 11Z"/><path d="m23 38v12l19 11 19-11V38m-19 11v12"/>' : '<path d="M23 28h38v27H23z"/><path d="m31 42 8 7 17-16"/>'}</g><text x="42" y="105" text-anchor="middle" fill="#365146" font-size="12">${name}</text><circle data-packet="${i}" cx="42" cy="-8" r="4" fill="${["#3e6d94", "#7e5b9b", "#bd7b42", "#497b60"][i]}"/></g>`).join("")}<path d="M106 388v40H537v-40M320 428v28" fill="none" stroke="#799084"/><rect x="247" y="455" width="146" height="29" rx="3" fill="#304c45"/><text x="320" y="474" text-anchor="middle" fill="#f4f7ee" font-size="10">ONE SHARED DIRECTION</text></svg><div class="mi-clock-progress"><div><i data-clock-progress></i></div><span data-clock-time>COMPLETE</span></div></div>`;
      },
      mount(root, { signal, reducedMotion, still }) {
        const button = root.querySelector("[data-run-sequence]"),
          paths = [...root.querySelectorAll("path[id^=mi-route]")],
          nodes = [...root.querySelectorAll("[data-node]")],
          packets = [...root.querySelectorAll("[data-packet]")];
        let raf = 0,
          start = 0,
          running = false;
        function draw(t) {
          const sec = t / 1000;
          nodes.forEach((node, i) => {
            const p = Math.max(0, Math.min(1, (sec - i * 0.28) / 1.6));
            const returning = Math.max(
              0,
              Math.min(1, (sec - 3.1 - i * 0.28) / 1.4),
            );
            const point = paths[i].getPointAtLength(
              paths[i].getTotalLength() * (returning ? 1 - returning : p),
            );
            packets[i].setAttribute("cx", point.x - (66 + i * 143));
            packets[i].setAttribute("cy", point.y - 258);
            node.dataset.done = String(sec > 3.1 + i * 0.28);
            packets[i].style.opacity = sec > 5.9 ? "0" : "1";
          });
          root.querySelector("[data-clock-progress]").style.width =
            Math.min(100, (sec / 6) * 100) + "%";
          root.querySelector("[data-clock-time]").textContent =
            sec >= 6 ? "COMPLETE" : sec.toFixed(1) + " s";
          root.querySelector("[data-clock-status]").textContent =
            sec < 1.8
              ? "The question reaches each part."
              : sec < 3.2
                ? "Four ways to consider it."
                : sec < 5.9
                  ? "Each part returns something useful."
                  : "One shared direction.";
        }
        function stop() {
          running = false;
          cancelAnimationFrame(raf);
          button.innerHTML = "Watch the sequence <span>↗</span>";
        }
        function tick(now) {
          const t = now - start;
          draw(t);
          if (t < 6000 && running && !document.hidden)
            raf = requestAnimationFrame(tick);
          else stop();
        }
        button.addEventListener(
          "click",
          () => {
            if (running) {
              stop();
              return;
            }
            if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
              draw(6000);
              return;
            }
            running = true;
            start = performance.now();
            button.innerHTML = "Stop the sequence <span>Ⅱ</span>";
            raf = requestAnimationFrame(tick);
          },
          { signal },
        );
        document.addEventListener(
          "visibilitychange",
          () => {
            if (document.hidden) stop();
          },
          { signal },
        );
        draw(6000);
        return stop;
      },
    },
    {
      id: "vector-foundry",
      order: 68,
      series: "motion",
      name: "a line can hold a world",
      reference: "kairevicius-2090424600886759913",
      theme: {
        background: "#f4f0e5",
        ink: "#2c4860",
        muted: "#82919b",
        accent: "#446d7f",
      },
      render() {
        return `<header class="mi-vector-heading"><span class="mo-eyebrow">AN EXERCISE IN SIMPLE GEOMETRY</span><h1>A line can<br>hold a <em>world.</em></h1><p>A surface, a rhythm,<br>and the space between them.</p></header><div class="mi-vector-sheet"><span class="mi-vector-index">STUDY 03 / CONTINUOUS SURFACE</span><svg viewBox="0 0 800 530" aria-label="An isometric wave sheet drawn with continuous vector lines"><g data-vector-grid stroke="#6e8a9324" fill="none"></g><g data-vector-surface fill="none"></g><path d="M98 424H202m-104-5v10m104-10v10" stroke="#647f88"/><text x="150" y="448" text-anchor="middle" fill="#728b93" font-size="9">ONE CONTINUOUS FIELD</text></svg><span class="mi-vector-seal" aria-hidden="true">F<br>03</span></div><div class="mi-vector-bottom">${m.controls("Surface state", ["Flat", "Ripple", "Surge"])}${m.range("Wave height", 50)}<span data-vector-note>Follow the contour.<br>Everything else follows it.</span></div>`;
      },
      mount(root, { signal, reducedMotion, still }) {
        const target = root.querySelector("[data-vector-surface]"),
          grid = root.querySelector("[data-vector-grid]"),
          input = root.querySelector("[data-mo-range]");
        let value = 0.5,
          mode = 1,
          time = 0,
          raf = 0,
          last = 0,
          lastPaint = 0;
        const media = matchMedia("(prefers-reduced-motion:reduce)");
        const project = (x, y, z = 0) => [
          400 + (x - y) * 48,
          120 + (x + y) * 22 - z * 80,
        ];
        function line(points) {
          return points
            .map(
              (p, i) => (i ? "L" : "M") + p.map((v) => v.toFixed(2)).join(" "),
            )
            .join("");
        }
        const ground = [];
        for (let i = -1; i <= 7; i++) {
          ground.push(
            `<path d="${line([project(i, -1), project(i, 7)])}"/><path d="${line([project(-1, i), project(7, i)])}"/>`,
          );
        }
        grid.innerHTML = ground.join("");
        const surfacePaths = Array.from({ length: 38 }, (_, i) => {
          const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
          );
          path.setAttribute(
            "stroke",
            i < 25 ? (i % 4 === 0 ? "#466e7b" : "#90a5a9") : "#728f98",
          );
          path.setAttribute(
            "stroke-width",
            i < 25 && i % 4 === 0 ? "1.15" : ".55",
          );
          target.append(path);
          return path;
        });
        function paint() {
          const wave = (x, y) =>
            mode === 0
              ? 0
              : (Math.sin(x * 1.3 + time * 0.65) +
                  Math.cos(y * 1.15 - time * 0.48)) *
                0.42 *
                value *
                (mode === 2 ? 1.65 : 1);
          const lines = [];
          for (let r = 0; r <= 24; r++) {
            const y = r / 4;
            const points = [];
            for (let c = 0; c <= 90; c++) {
              const x = c / 15;
              points.push(project(x, y, wave(x, y)));
            }
            lines.push(
              `<path d="${line(points)}" stroke="${r % 4 === 0 ? "#466e7b" : "#90a5a9"}" stroke-width="${r % 4 === 0 ? "1.15" : ".55"}"/>`,
            );
          }
          for (let c = 0; c <= 12; c++) {
            const x = c / 2,
              points = [];
            for (let r = 0; r <= 60; r++) {
              const y = r / 10;
              points.push(project(x, y, wave(x, y)));
            }
            lines.push(
              `<path d="${line(points)}" stroke="#728f98" stroke-width=".55"/>`,
            );
          }
          lines.forEach((markup, i) =>
            surfacePaths[i].setAttribute("d", markup.match(/d="([^"]+)"/)[1]),
          );
        }
        function tick(now) {
          time += last ? Math.min((now - last) / 1000, 0.08) : 0;
          last = now;
          if (now - lastPaint > 32) {
            paint();
            lastPaint = now;
          }
          if (!media.matches && !document.hidden && !still)
            raf = requestAnimationFrame(tick);
        }
        input.addEventListener(
          "input",
          () => {
            value = +input.value / 100;
            input.parentElement.querySelector("output").value = input.value;
            paint();
          },
          { signal },
        );
        root.querySelectorAll("[data-mo-mode]").forEach((b) => {
          b.setAttribute("aria-pressed", String(+b.dataset.moMode === mode));
          b.addEventListener(
            "click",
            () => {
              mode = +b.dataset.moMode;
              root
                .querySelectorAll("[data-mo-mode]")
                .forEach((x) =>
                  x.setAttribute("aria-pressed", String(x === b)),
                );
              paint();
            },
            { signal },
          );
        });
        const reconcile = () => {
          cancelAnimationFrame(raf);
          last = 0;
          paint();
          if (!media.matches && !document.hidden && !still)
            raf = requestAnimationFrame(tick);
        };
        media.addEventListener("change", reconcile, { signal });
        document.addEventListener("visibilitychange", reconcile, { signal });
        reconcile();
        return () => cancelAnimationFrame(raf);
      },
    },
  ];
  window.DrawnToPages = [...(window.DrawnToPages || []), ...pages];
})();
