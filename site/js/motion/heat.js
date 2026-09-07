const vertex = `#version 300 es
in vec2 position;out vec2 uv;void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
const fragment = `#version 300 es
precision highp float;
uniform sampler2D artwork;uniform vec2 resolution,origin,destination;uniform float time,strength;
in vec2 uv;out vec4 color;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
void main(){
 vec2 pixel=vec2(uv.x,1.-uv.y)*resolution,delta=destination-origin;
 float lengthToType=max(length(delta),1.);vec2 axis=delta/lengthToType,side=vec2(-axis.y,axis.x),q=pixel-origin;
 float along=dot(q,axis),across=dot(q,side),travel=max(along,0.);
 float width=32.+travel*.19;
 float bend=(noise(vec2(travel*.007-time*.32,2.7))-.5)*width*.45;
 float envelope=exp(-pow((across-bend)/width,2.))*smoothstep(-55.,35.,along)*(1.-smoothstep(lengthToType+150.,lengthToType+520.,along));
 vec2 flow=vec2(along-time*83.,across);
 float broad=noise(flow*vec2(.012,.023))-.5;
 float detail=noise(flow*vec2(.034,.052)+vec2(-time*.38,3.))-.5;
 float shimmer=noise(flow*vec2(.065,.085)+vec2(time*.62,9.))-.5;
 float amplitude=mix(12.,7.,clamp(travel/lengthToType,0.,1.));
 vec2 displacement=(side*(broad*1.15+detail*.62+shimmer*.2)+axis*detail*.24)*amplitude*envelope*strength;
 vec2 sampleAt=uv+vec2(displacement.x,-displacement.y)/resolution;
 vec3 base=texture(artwork,clamp(sampleAt,vec2(.001),vec2(.999))).rgb;
 float haze=envelope*strength*(.006+.008*noise(flow*.009));
 color=vec4(mix(base,vec3(.86,.79,.66),haze),1.);
}`;

/** One cached composition, one advected refraction field, no per-frame DOM or texture uploads. */
export async function mountHeat(root, { signal, still = false }) {
  const host = root.querySelector("[data-heat-host]"),
    heading = root.querySelector("h1"),
    photo = root.querySelector(".mo-editorial-art img"),
    toggle = root.querySelector("[data-heat]");
  if (
    new URLSearchParams(location.search).get("gpu") === "off" ||
    navigator.connection?.saveData
  ) {
    toggle.hidden = true;
    return () => {};
  }
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  host.append(canvas);
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    powerPreference: "low-power",
  });
  if (!gl) {
    canvas.remove();
    toggle.hidden = true;
    return () => {};
  }
  const events=new AbortController();
  let source;
  let program,
    buffer,
    texture,
    observer,
    intersection,
    disposed = false,
    ready = false,
    frame = 0,
    last = 0,
    time = 0,
    paused = still,
    hover = false,
    visible = true;
  const media = matchMedia("(prefers-reduced-motion:reduce)"),
    connection = navigator.connection;
  const state = {
    backend: "webgl2",
    frames: 0,
    uploads: 0,
    time: 0,
    disposed: false,
    paused,
    origin: [],
    destination: [],
  };
  host.__heatState = state;
  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw Error(message);
    }
    return shader;
  }
  try {
    const vs = compile(gl.VERTEX_SHADER, vertex),
      fs = compile(gl.FRAGMENT_SHADER, fragment);
    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  } catch (error) {
    host.dataset.renderError = String(error);
    toggle.hidden = true;
    cleanup();
    return () => {};
  }
  const uniforms = Object.fromEntries(
    ["artwork", "resolution", "origin", "destination", "time", "strength"].map(
      (name) => [name, gl.getUniformLocation(program, name)],
    ),
  );
  source=document.createElement('canvas');
  const ctx=source.getContext('2d');
  function blocked() {
    return (
      disposed ||
      !ready ||
      document.hidden ||
      !visible ||
      media.matches ||
      connection?.saveData
    );
  }
  function paint() {
    if (disposed || !ready) return;
    gl.useProgram(program);
    gl.uniform1f(uniforms.time, time);
    gl.uniform1f(
      uniforms.strength,
      media.matches || connection?.saveData ? 0 : hover ? 1.25 : 1,
    );
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    state.frames++;
    state.time = time;
    state.paused = paused;
  }
  function tick(now) {
    frame = 0;
    if (blocked() || paused) return;
    if (!last || now - last >= 32) {
      time += last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      paint();
    }
    frame = requestAnimationFrame(tick);
  }
  function reconcile() {
    if (disposed) return;
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
    if (!document.hidden) paint();
    if (!blocked() && !paused) frame = requestAnimationFrame(tick);
    toggle.textContent = paused ? "Resume heat" : "Pause heat";
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.hidden = media.matches || connection?.saveData;
  }
  function compose() {
    if (disposed || !photo.complete || !photo.naturalWidth) return;
    const box = host.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.ceil(box.width * ratio);
    canvas.height = Math.ceil(box.height * ratio);
    source.width = canvas.width;
    source.height = canvas.height;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.fillStyle =
      getComputedStyle(root).getPropertyValue("--xp-bg") || "#d2d3ce";
    ctx.fillRect(0, 0, box.width, box.height);
    const imageBox = photo.getBoundingClientRect(),
      style = getComputedStyle(photo),
      cover = Math.max(
        imageBox.width / photo.naturalWidth,
        imageBox.height / photo.naturalHeight,
      ),
      w = photo.naturalWidth * cover,
      h = photo.naturalHeight * cover;
    const positions = style.objectPosition
      .split(" ")
      .map((v) => (v === "center" ? 0.5 : parseFloat(v) / 100));
    const x =
        imageBox.left - box.left + (imageBox.width - w) * (positions[0] ?? 0.5),
      y =
        imageBox.top - box.top + (imageBox.height - h) * (positions[1] ?? 0.5);
    ctx.save();
    ctx.beginPath();
    ctx.rect(
      imageBox.left - box.left,
      imageBox.top - box.top,
      imageBox.width,
      imageBox.height,
    );
    ctx.clip();
    ctx.drawImage(photo, x, y, w, h);
    ctx.restore();
    if (innerWidth <= 720) {
      const top = imageBox.top - box.top,
        fade = ctx.createLinearGradient(0, top, 0, top + 85);
      fade.addColorStop(
        0,
        getComputedStyle(root).getPropertyValue("--xp-bg").trim(),
      );
      fade.addColorStop(1, "rgba(210,211,206,0)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, top, box.width, 85);
    }

    const type = getComputedStyle(heading),
      bounds = heading.getBoundingClientRect(),
      size = parseFloat(type.fontSize),
      lineHeight = parseFloat(type.lineHeight) || size;
    ctx.fillStyle = type.color;
    ctx.font = type.font;
    ctx.letterSpacing = type.letterSpacing;
    ctx.textBaseline = "alphabetic";
    const metrics = ctx.measureText("Hg"),
      ascent = metrics.fontBoundingBoxAscent ?? size * 0.8,
      descent = metrics.fontBoundingBoxDescent ?? size * 0.2,
      baseline = (lineHeight - ascent - descent) / 2 + ascent;
    const lines = heading.innerText.split("\n").filter(Boolean);
    lines.forEach((line, i) =>
      ctx.fillText(
        type.textTransform === "uppercase" ? line.toUpperCase() : line,
        bounds.left - box.left,
        bounds.top - box.top + baseline + i * lineHeight,
      ),
    );
    const origin = [x + w * 0.735, y + h * 0.53],
      destination = [
        bounds.left - box.left + bounds.width * 0.7,
        bounds.top - box.top + bounds.height * 0.68,
      ];
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    gl.useProgram(program);
    gl.uniform1i(uniforms.artwork, 0);
    gl.uniform2f(uniforms.resolution, box.width, box.height);
    gl.uniform2fv(uniforms.origin, origin);
    gl.uniform2fv(uniforms.destination, destination);
    state.uploads++;
    state.origin = origin;
    state.destination = destination;
    ready = true;
    root.classList.add("mo-heat-ready");
    host.dataset.ready = "true";
    reconcile();
  }
  function cleanup() {
    if (disposed) return;
    disposed = true;
    state.disposed = true;
    events.abort();signal.removeEventListener("abort",cleanup);
    if(source){source.width=source.height=1;}
    cancelAnimationFrame(frame);
    observer?.disconnect();
    intersection?.disconnect();
    root.classList.remove("mo-heat-ready");
    toggle.hidden = true;
    if (texture) gl.deleteTexture(texture);
    if (buffer) gl.deleteBuffer(buffer);
    if (program) gl.deleteProgram(program);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    canvas.remove();
    delete host.__heat;
  }
  signal.addEventListener("abort", cleanup, { once: true });
  canvas.addEventListener(
    "webglcontextlost",
    (event) => {
      event.preventDefault();
      cleanup();
    },
    { signal:events.signal },
  );
  toggle.addEventListener(
    "click",
    () => {
      paused = !paused;
      reconcile();
    },
    { signal:events.signal },
  );
  root.querySelector(".mo-thermal-copy").addEventListener(
    "pointerenter",
    () => {
      hover = true;
      reconcile();
    },
    { signal:events.signal },
  );
  root.querySelector(".mo-thermal-copy").addEventListener(
    "pointerleave",
    () => {
      hover = false;
      reconcile();
    },
    { signal:events.signal },
  );
  media.addEventListener("change", reconcile, { signal:events.signal });
  connection?.addEventListener("change", reconcile, { signal:events.signal });
  document.addEventListener("visibilitychange", reconcile, { signal:events.signal });
  host.__heat = {
    setTime(value) {
      paused = true;
      time = value;
      reconcile();
    },
    play() {
      paused = false;
      reconcile();
    },
    pause() {
      paused = true;
      reconcile();
    },
    snapshot() {
      paint();
      return canvas.toDataURL("image/png");
    },
  };
  observer = new ResizeObserver(compose);
  observer.observe(host);
  intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    reconcile();
  });
  intersection.observe(host);
  await Promise.all([document.fonts.ready, photo.decode().catch(() => {})]);
  if (signal.aborted) {
    cleanup();
    return cleanup;
  }
  compose();
  return cleanup;
}
