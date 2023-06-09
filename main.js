import './style.css';

import * as THREE from 'three';
import gsap from "gsap";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const sizes = {
  width: 800,
  height: 600,
}

const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height/*, 0.1, 1000 */);
camera.position.z = 5;
scene.add( camera );

const canvas = document.querySelector('.webgl');
// console.log(canvas)
const renderer = new THREE.WebGLRenderer({
  canvas
});
renderer.setSize( sizes.width, sizes.height );

// function animate() {
// 	requestAnimationFrame( animate );

// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;

// 	renderer.render( scene, camera );
// }

// animate();

// Вспомогательные оси
const axesHelper = new THREE.AxesHelper();
scene.add( axesHelper );


//-----------------------------------------------------------------------------//
//       Трансформация и перемещение объекта: position, scale, rotation        //
//-----------------------------------------------------------------------------//


// // position (относительные единицы)
// cube.position.x = 1;
// cube.position.y = 1;
// cube.position.z = 1;

// // задаем сразу все три координаты с помощью Vector3
// cube.position.set(1, 1, 1);
// // Расстояние от объекта до центра сцены
// console.log(cube.position.length());
// // Расстояние от объекта до другого объекта (например, камеры)
// console.log(cube.position.distanceTo(camera.position));
// // Меняет длину вектора на 1
// cube.position.normalize();

// // scale
// cube.scale.x = 2;
// cube.scale.y = 2;
// cube.scale.z = 2;
// cube.scale.set(2, 2, 2);

// Повороты объекта
// Для этого есть два метода: rotation и quaternion
// При задании одного - второй тоже меняется.

// rotation (в радианах)
// cube.rotation.x = Math.PI / 4;
// cube.rotation.y = Math.PI / 4;
// cube.rotation.z = Math.PI / 4;
// cube.rotation.set(Math.PI / 4, Math.PI / 4, Math.PI / 4, 'XYZ');
// Rotation наследует от Euler, который создан для выполнения вращения.
// Последовательность осей имеет значение.
// Если нужно поменять порядок осей (например, в видеоигре):
// cube.rotation.reorder('YXZ');
// cube.rotation.x = Math.PI / 4;
// cube.rotation.y = Math.PI / 4;

// Чтобы направить камеру на нужный нам объект
// На центр сцены (она и так по-умолчанию туда направлена):
// camera.lookAt(new THREE.Vector3(0, 0, 0));
// На объект:
// camera.lookAt(cube.position);

// Группируем множество объектов:
// const group = new THREE.Group();
// scene.add(group);

// const cube2 = new THREE.Mesh(
// 	new THREE.BoxGeometry(1, 1, 1),
// 	new THREE.MeshBasicMaterial({ color: 0x0000ff })
// );
// cube2.position.x = -1.5;
// group.add(cube2);

// renderer.render( scene, camera );


//-----------------------------------------------------------------------------//
//                                  Animation                                  //
//-----------------------------------------------------------------------------//

// // Делаем привязку ко времени,
// // чтобы не зависеть от скорости компьютера пользователя
// const clock = new THREE.Clock();

// function animate() {
// 	// Запускаем следующий кадр
// 	requestAnimationFrame( animate );

// 	const elapsedTime = clock.getElapsedTime();

// 	// Вращиение с частотой 1 Гц (1 оборот в секунду)
// 	// cube.rotation.y = elapsedTime * 2 * Math.PI;

// 	// Перемещение по синусоиде
// 	// cube.position.y = Math.sin(elapsedTime);

// 	// Перемещение по кругу
// 	cube.position.x = Math.cos(elapsedTime);
// 	cube.position.y = Math.sin(elapsedTime);

// 	renderer.render( scene, camera );
// }

// animate();



// // С помощью библиотеки GSAP
// gsap.to(cube.position, { x: 2, duration: 1, delay: 1 });

// function animate() {
// 	renderer.render( scene, camera );
// 	requestAnimationFrame( animate );
// }

// animate();



//-----------------------------------------------------------------------------//
//                                   Camera                                    //
//-----------------------------------------------------------------------------//

// // Пример 1. 
// // При перемещении курсора мыши от центра,
// // куб смещается в противоположную сторону
// const cursor = {
//   x: 0,
//   y: 0
// };

// window.addEventListener('mousemove', (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = - (event.clientY / sizes.height - 0.5);
// });

// function tick() {
//   const amplifier = 5;
//   camera.position.x = cursor.x * amplifier;
//   camera.position.y = cursor.y * amplifier;

// 	renderer.render( scene, camera );

// 	requestAnimationFrame( tick );
// }

// tick();


// // Пример 2. 
// // Куб следит за камерой
// const cursor = {
//   x: 0,
//   y: 0
// };

// window.addEventListener('mousemove', (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = - (event.clientY / sizes.height - 0.5);
// });

// function tick() {
//   const amplifier = 5;
//   camera.position.x = - cursor.x * amplifier;
//   camera.position.y = - cursor.y * amplifier;
//   // Чтобы куб оставался на месте и поворачивался к камере
//   // (при этом надо сделать две координаты выше отрицательными)
//   camera.lookAt(cube.position);

// 	renderer.render( scene, camera );

// 	requestAnimationFrame( tick );
// }

// tick();


// // Пример 3. 
// // Можно рассмотреть куб со всех сторон
// const cursor = {
//   x: 0,
//   y: 0
// };

// window.addEventListener('mousemove', (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = - (event.clientY / sizes.height - 0.5);
// });

// function tick() {
//   const amplifier = 5;
//   const distanceToCamera = 3;
//   // Умножаем на 2пи, чтобы куб сделал полный оборот при перемещении
//   // курсора мыши от левого края сцены до правого
//   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * distanceToCamera;
//   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * distanceToCamera;
//   camera.position.y = cursor.y * amplifier;
//   camera.lookAt(cube.position);

// 	renderer.render( scene, camera );

// 	requestAnimationFrame( tick );
// }

// tick();


// Пример 4. 
// Используем готовый control для камеры: OrbitControls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

function tick() {
  // При использовании дэмпинга, надо обновлять,
  // чтобы движение прололжилось даже после того,
  // как мы отпустили мышку
  controls.update();

	renderer.render( scene, camera );

	requestAnimationFrame( tick );
}

tick();