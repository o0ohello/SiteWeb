import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js";

export function homeBG() {
  const canvas = document.querySelector(".homeBG");

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 1.5;

  // Shader Material
  const noiseMaterial = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_lightPosition: { value: new THREE.Vector2(0.5, 0.5) },
    },
    vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_lightPosition;
      
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        vec2 lightDir = st - u_lightPosition;
        float dist = length(lightDir) * 1.8;
        float intensity = exp(-dist * 3.0);
        
        float n = noise(st * 8.0 + u_time * 0.1);
        float mask = smoothstep(0.1, 0.9, n);

        vec3 color = mix(vec3(0.0), vec3(0.1, 0.3, 1.0), intensity) * mask;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });

  // Fullscreen Plane
  const planeGeometry = new THREE.PlaneGeometry(2.5, 1.5);
  const plane = new THREE.Mesh(planeGeometry, noiseMaterial);
  scene.add(plane);

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    noiseMaterial.uniforms.u_time.value += 0.02;
    renderer.render(scene, camera);
  }
  animate();

  // Resize Handling
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    noiseMaterial.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}
