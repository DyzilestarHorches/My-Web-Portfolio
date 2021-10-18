// setup variable

let container;
let camera;
let renderer;
let scene;
let earth;

function init() {
    container = document.querySelector('.scene');

    //make a scene
    scene = new THREE.Scene();

    //camera set up
    const fieldofview = 75;
    const aspect = container.clientWidth / container.clientWidth;
    const near = 0.1;
    const far = 500;
    camera = new THREE.PerspectiveCamera(fieldofview, aspect, near, far);
    camera.position.set(0, 1, 3);

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //light
    const ambient = new THREE.AmbientLight('0x404040', 10);
    scene.add(ambient);
    const light = new THREE.DirectionalLight('0xffff', 0.5);
    light.position.set(5, 5, -5);
    //scene.add(light);

    //load model
    let loader = new THREE.GLTFLoader();
    loader.load('./3d_objects/scene.gltf', function(gltf) {
        scene.add(gltf.scene);
        earth = gltf.scene.children[0];
        animate();
        //renderer.render(scene, camera);
    });


}

function animate() {
    requestAnimationFrame(animate);
    earth.rotation.z += 0.005;
    renderer.render(scene, camera);
}
init();