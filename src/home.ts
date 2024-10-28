import * as THREE from 'three';

export function initHome(container: HTMLElement): void {
    let renderer: THREE.WebGLRenderer;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let mouseX: number = 0;
    let mouseY: number = 0;
    let fluidMesh: THREE.Mesh;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const fluidMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 1.0 },
            mouse: { value: new THREE.Vector2(0.5, 0.5) },
            resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform vec2 resolution;
            uniform vec2 mouse;
            varying vec2 vUv;
            
            void main() {
                vec2 st = gl_FragCoord.xy / resolution.xy;
                vec3 color = vec3(0.0);
                float d = distance(st, mouse);
                color = mix(vec3(0.0, 0.4, 0.6), vec3(0.2, 0.7, 1.0), smoothstep(0.1, 0.2, d));
                color += 0.1 * sin(time + d * 10.0);
                gl_FragColor = vec4(color, 1.0);
            }
        `
    });

    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    fluidMesh = new THREE.Mesh(planeGeometry, fluidMaterial);
    scene.add(fluidMesh);

    function animate(): void {
        requestAnimationFrame(animate);
        const material = fluidMesh.material as THREE.ShaderMaterial;
        material.uniforms.time.value += 0.05;
        renderer.render(scene, camera);
    }

    function onWindowResize(): void {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        const material = fluidMesh.material as THREE.ShaderMaterial;
        material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    }

    function onMouseMove(event: MouseEvent): void {
        const material = fluidMesh.material as THREE.ShaderMaterial;
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        material.uniforms.mouse.value.set(mouseX, mouseY);
    }

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);

    animate();
}
