// 创建场景
var scene = new THREE.Scene();

// 创建相机
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 150;

// 创建渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建太阳
var sunGeometry = new THREE.SphereGeometry(10, 32, 32);
var sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffddaa });
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// 创建地球
var earthOrbit = new THREE.Object3D(); // 地球公转轨道
scene.add(earthOrbit);

var earthGeometry = new THREE.SphereGeometry(5, 32, 32);
var earthMaterial = new THREE.MeshPhongMaterial({ color: 0x0077ff });
var earth = new THREE.Mesh(earthGeometry, earthMaterial);
earthOrbit.add(earth);
earth.position.x = 25; // 初始位置设置为地球轨道半径

// 创建月球
var moonOrbit = new THREE.Object3D(); // 月球公转轨道
earth.add(moonOrbit);

var moonGeometry = new THREE.SphereGeometry(2, 32, 32);
var moonMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
var moon = new THREE.Mesh(moonGeometry, moonMaterial);
moonOrbit.add(moon); // 将月球添加到月球公转轨道上
moon.position.x = 10; // 初始位置设置为月球轨道半径

// 添加光源
var light = new THREE.PointLight(0xffddaa, 1);
light.position.set(0, 0, 0);
scene.add(light);

// 更新函数
function animate() {
    requestAnimationFrame(animate);

    // 地球绕太阳公转
    earthOrbit.rotation.y += 0.01;

    // 月球绕地球转
    moonOrbit.rotation.y += 0.02;

    // 渲染场景
    renderer.render(scene, camera);
}

// 监听鼠标移动
document.addEventListener('mousemove', function(event) {
    var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    var mouseY = - (event.clientY / window.innerHeight) * 2 + 1;

    camera.position.x = mouseX * 50;
    camera.position.y = mouseY * 50;

    camera.lookAt(scene.position);
});

// 监听滚轮事件
document.addEventListener('wheel', function(event) {
    camera.position.z += event.deltaY * 0.1;
});

// 开始动画
animate();
