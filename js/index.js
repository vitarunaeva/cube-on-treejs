  'use strict';


function main() {
  const canvas = document.querySelector('#cube');
  const renderer = new THREE.WebGLRenderer({canvas});

  // renderer.vr.enabled = true;
  // document.body.appendChild(WEBVR.createButton(renderer));

  const fov = 80;
  const aspect = 2;  // the canvas default
  const near = 1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  {
    const color = 0xFFFFF;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-3, 3, 3);
    scene.add(light);
  }

  const boxWidth = 2;
  const boxHeight = 2;
  const boxDepth = 2;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    
     
cube.position.x = x;
cube.position.y = 0.5;
cube.position.z = -2;

    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88,  0)
  ];

  function render(time) {
    time *= 0.001;

   if (!renderer.vr.isPresenting() && resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
    
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    
  }
  
renderer.setAnimationLoop(render);

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height);
  }
  return needResize;
}
}

main();