/* 3D soap bubbles floating over the home hero (Three.js) */
import * as THREE from "three";

const host = document.querySelector("[data-hero3d]");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (host && !reduce) {
  const canvas = document.createElement("canvas");
  canvas.className = "bubbles";
  host.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.z = 12;

  // Soap-film shader: clear centre, iridescent rim, a soft highlight
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.NormalBlending,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      varying vec3 vN; varying vec3 vV; varying vec3 vP;
      void main(){
        vec4 wp = modelMatrix * vec4(position,1.0);
        vN = normalize(mat3(modelMatrix) * normal);
        vV = normalize(cameraPosition - wp.xyz);
        vP = position;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: `
      uniform float uTime; varying vec3 vN; varying vec3 vV; varying vec3 vP;
      vec3 film(float t){ return 0.55 + 0.45*cos(6.2831*(t + vec3(0.0,0.33,0.67))); }
      void main(){
        float f = 1.0 - max(dot(normalize(vN), normalize(vV)), 0.0);
        float rim = pow(f, 2.2);
        float swirl = vP.y*1.4 + sin(vP.x*3.0 + uTime*0.6)*0.25 + uTime*0.05;
        vec3 col = film(f*1.3 + swirl);
        vec3 L = normalize(vec3(-0.5,0.7,0.6));
        vec3 H = normalize(L + normalize(vV));
        float spec = pow(max(dot(normalize(vN), H), 0.0), 90.0);
        float alpha = rim*0.75 + 0.03 + spec*0.9;
        gl_FragColor = vec4(mix(col, vec3(1.0), spec), alpha);
      }`
  });
  const geo = new THREE.SphereGeometry(1, 48, 48);
  const COUNT = innerWidth < 700 ? 16 : 30;
  const bubbles = [];
  for (let i = 0; i < COUNT; i++) {
    const m = new THREE.Mesh(geo, mat);
    const s = 0.15 + Math.random() ** 2 * 1.05;
    m.scale.setScalar(s);
    m.position.set((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 11, (Math.random() - 0.5) * 6);
    m.userData = { s, speed: 0.25 + Math.random() * 0.55, phase: Math.random() * Math.PI * 2, wob: 0.4 + Math.random() * 0.8 };
    scene.add(m); bubbles.push(m);
  }

  let mx = 0, my = 0, tx = 0, ty = 0, visible = true;
  addEventListener("pointermove", e => { tx = (e.clientX / innerWidth - 0.5) * 2; ty = (e.clientY / innerHeight - 0.5) * 2; }, { passive: true });
  new IntersectionObserver(es => visible = es[0].isIntersecting).observe(host);

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  addEventListener("resize", resize); resize();

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    if (!visible) return;
    const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
    mat.uniforms.uTime.value = t;
    mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
    camera.position.x = mx * 1.2; camera.position.y = -my * 0.8; camera.lookAt(0, 0, 0);
    for (const b of bubbles) {
      const u = b.userData;
      b.position.y += u.speed * dt;
      b.position.x += Math.sin(t * u.wob + u.phase) * 0.004;
      const k = 1 + Math.sin(t * 2 + u.phase) * 0.04;
      b.scale.set(u.s * k, u.s / k, u.s * k);
      if (b.position.y > 7) { b.position.y = -7; b.position.x = (Math.random() - 0.5) * 18; }
    }
    renderer.render(scene, camera);
  });
}
