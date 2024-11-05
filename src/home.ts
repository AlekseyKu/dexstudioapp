// import * as THREE from 'three';

// export function initHome(container: HTMLElement): void {
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     container.appendChild(renderer.domElement);

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 5;

//     // Простая анимация для Home
//     const geometry = new THREE.PlaneGeometry(2, 2);
//     const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
//     const plane = new THREE.Mesh(geometry, material);
//     scene.add(plane);

//     function animate() {
//         requestAnimationFrame(animate);
//         renderer.render(scene, camera);
//     }

//     animate();

//     window.addEventListener('resize', () => {
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//     });
// }
