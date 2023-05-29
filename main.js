import './style.css';

import * as THREE from 'three';
import gsap from "gsap";
// console.log(gsap);

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



// С помощью библиотеки GSAP
gsap.to(cube.position, { x: 2, duration: 1, delay: 1 });

function animate() {
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}

animate();



