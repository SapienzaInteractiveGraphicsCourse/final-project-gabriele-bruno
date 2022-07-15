import * as THREE from './three.js-r127/build/three.module.js'
import * as MODELS from './mscript.js';
//import * as FLOOR  from './script1.js';
import {GLTFLoader} from './three.js-r127/examples/jsm/loaders/GLTFLoader.js'
//import * as FUNCTIONS from './models.js';
import { TrackballControls } from './three.js-r127/examples/jsm/controls/TrackballControls.js'
import { OrbitControls } from './three.js-r127/examples/jsm/controls/OrbitControls.js'
import { Water } from './three.js-r127/examples/jsm/objects/Water.js';



//import * as CONTROLS from './inputHandler.js'
const sizes = {width: window.innerWidth, height: window.innerHeight}

  var myObj
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});


  
  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  //const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  //camera.position.set(0,0,7);
  //camera.position.z = 3;
  //camera.position.z = 6;
  function makeCamera(fov = 40) {
    const aspect = 2;  // the canvas default
    const zNear = 0.1;
    const zFar = 1000;
    return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
  }
  const camera = makeCamera();
  camera.position.set(0, 140, -30)
  camera.lookAt(0, 0, 0);



  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x92FFF8);

  renderer.setSize(sizes.width, sizes.height)
  //renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
 // renderer.shadowMap.enabled = true
  renderer.gammaOuput = true
  renderer.render(scene, camera)

  const controls = new TrackballControls(camera, renderer.domElement );
  controls.rotateSpeed = 2.0;
  controls.zoomSpeed = 1.5;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-20, 20,20);
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const boxWidth1 = 0.5;
  const boxHeight1 = 1;
  const boxDepth1 = 0.3;
  const geometry1 = new THREE.BoxGeometry(boxWidth1, boxHeight1, boxDepth1);

  //const material = new THREE.MeshBasicMaterial({color: 0x44aa88});  // greenish blue
  const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // greenish blue

  const cube = new THREE.Mesh(geometry, material);
  function makeInstance(geometry, color, x, y, z) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    return cube;
  }

  const cubes = [
    //makeInstance(geometry, 0x44aa88,  0, -1, -2),
    //makeInstance(geometry1, 0x8844aa, -4, 0, -2),
    //makeInstance(geometry, 0xaa8844,  2, 1.5, -1 ),
  ];

//Background
//const geometryc = new THREE.CylinderGeometry( 2.5, 2.5, canvas.width*1/100, 32 );


  const loader = new GLTFLoader()
  loader.load( 'assets/island.glb', function ( glb ) {
      console.log(glb)
      //const root = glb.scene
      myObj = glb.scene
  
      scene.add(myObj);
    })
  
  
  
    var waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

var water = new Water(
  waterGeometry,
  {
    //textureWidth: 512,
    //textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load( 'assets/waternormals.jpg', function ( texture ) {

      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    } ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: scene.fog !== undefined
  }
);
water.rotation.x = - Math.PI / 2;
scene.add(water)

const geometryc = new THREE.CylinderGeometry( 25, 25, 100, 32 );
const materialc = new THREE.MeshPhongMaterial( {color: 0x1da2d8} );
const cylinder = new THREE.Mesh( geometryc, materialc );
//scene.add( cylinder );
cylinder.position.set(0, 0, 0);
cylinder.rotation.z=Math.PI/2;

const geometrycubeA = new THREE.BoxGeometry( 0.05, 0.05, 0.05 );
const geometrycubeB = new THREE.BoxGeometry( 0.5, 0.5, 0.05 );
const materialcube = new THREE.MeshBasicMaterial( {color: 0xC2B280} );

const cubeA = new THREE.Mesh( geometrycubeA, materialcube );
cubeA.position.set( 0, 0, 2.5 );

const cubeB = new THREE.Mesh( geometrycubeB, materialcube );
cubeB.position.set( 1, 0, 2.5 );

const group = new THREE.Group();
group.add(cylinder);
group.add(cubeA);
group.add(cubeB)

//scene.add(group);
/*
const plane=PLANE.createPlane1();
plane.position.set(0,0,0);
plane.scale.set(0.5,0.5,0.5);
*/

var enemies=[];
var enemy;
var enemies_number=2;
var enemies_positions=[];

//enemies positions
var p1=new MODELS.Position(40,0,40);
var p2=new MODELS.Position(20,0,40);
var p3=new MODELS.Position(-20,0,40);
var p4=new MODELS.Position(-40,0,40);
var p5=new MODELS.Position(40,0,15);
var p6=new MODELS.Position(20,0,15);
var p7=new MODELS.Position(-20,0,15);
var p8=new MODELS.Position(-40,0,15);
enemies_positions.push(p1);
enemies_positions.push(p2);
enemies_positions.push(p3);
enemies_positions.push(p4);
enemies_positions.push(p5);
enemies_positions.push(p6);
enemies_positions.push(p7);
enemies_positions.push(p8);



var plane=new MODELS.Plane2();
plane.mesh.scale.set(0.5, 0.5, 0.5);
plane.mesh.position.set(0, 0, -30);
scene.add(plane.mesh);

var plane1=new MODELS.Plane();
plane1.mesh.scale.set(0.5, 0.5, 0.5);
scene.add(plane1.mesh);

var plane2=new MODELS.Plane();
plane2.mesh.scale.set(0.5, 0.5, 0.5);
scene.add(plane2.mesh);

var plane3=new MODELS.Plane2();
plane3.mesh.scale.set(0.5, 0.5, 0.5);
scene.add(plane3.mesh);







plane1.mesh.position.set(-20,0,40);
plane2.mesh.position.set(20,0,15);

plane3.mesh.position.x=p1.x;
plane3.mesh.position.y=p1.y;
plane3.mesh.position.z=p1.z;




plane1.mesh.rotation.y=Math.PI;
plane2.mesh.rotation.y=Math.PI;
plane3.mesh.rotation.y=Math.PI;




//generatePlane();


enemies.push(plane1);
enemies.push(plane2);
enemies.push(plane3);





/*function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
*/


//Mouse control
/*
  document.addEventListener("mousemove", mouseMoveHandler);
  function mouseMoveHandler(e) {
    plane.mesh.position.x = -(e.pageX - canvas.offsetLeft);
    plane.mesh.position.z = -(e.pageY - canvas.offsetTop);
  }
*/



//Keyboard arrows controlling
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacebarPressed=false;
var R1bullets=[];
var L1bullets=[];
var flag=true;



function keyDownHandler(event) {
  
  if(event.keyCode == 39) {
      rightPressed = true;
  }
  else if(event.keyCode == 37) {
      leftPressed = true;
  }
  if(event.keyCode == 40) {
    downPressed = true;
  }
  else if(event.keyCode == 38) {
    upPressed = true;
  }
  if(event.keyCode==32){
    spacebarPressed = true;
    generateBullet();
    
  }


  //spawn plane key s
  if(event.keyCode==83){
    generatePlane()
    console.log(enemies)
  }
}




function keyUpHandler(event) {
  if(event.keyCode == 39) {
      rightPressed = false;
  }
  else if(event.keyCode == 37) {
      leftPressed = false;
  }
  if(event.keyCode == 40) {
    downPressed = false;
  }
  else if(event.keyCode == 38) {
    upPressed = false;
  }
  if(event.keyCode==32){
    //spacebarPressed = false;
    
  }
}

var bulletr1, bulletl1;
function generateBullet(){
  bulletr1=new MODELS.Bullet();
  bulletr1.mesh.position.x=plane.mesh.position.x + plane.bulletr1_position_x
  bulletr1.mesh.position.y=plane.mesh.position.y + plane.bulletr1_position_y
  bulletr1.mesh.position.z=plane.mesh.position.z + plane.bulletr1_position_z
  scene.add( bulletr1.mesh );
  R1bullets.push(bulletr1);

  bulletl1=new MODELS.Bullet();
  bulletl1.mesh.position.x=plane.mesh.position.x + plane.bulletl1_position_x;
  bulletl1.mesh.position.y=plane.mesh.position.y + plane.bulletl1_position_y;
  bulletl1.mesh.position.z=plane.mesh.position.z + plane.bulletl1_position_z;
  scene.add( bulletl1.mesh );
  L1bullets.push(bulletl1);
}

var maxpointnumber=7;
function generatePlane(){
  enemy=new MODELS.Plane2();
  //enemy.mesh.position.set(randomPosition(-40,40) , 0, randomPosition(0, 60));
  var p = enemies_positions[ randomPosition(0, maxpointnumber)];
  if(!p.taken){
    enemy.mesh.position.x=p.x;
    enemy.mesh.position.y=p.y;
    enemy.mesh.position.z=p.z;
    p.taken=true;
  enemy.positionPoint=p;
  enemies_positions.pop(p);
  maxpointnumber-=1;
  enemy.mesh.scale.set(0.5, 0.5, 0.5)
  enemy.mesh.rotation.y=Math.PI;
  scene.add( enemy.mesh );
  enemies.push(enemy);
  console.log(enemies);
  enemies_number+=1;
  console.log(enemy.positionPoint);
  console.log(enemies_positions);
  }
}


function movePlane(enemy){
  if(enemy.mesh.position.x < 50.0 && flag==true){
    enemy.mesh.position.x+=0.5;
    if(enemy.mesh.position.x>=50.0){ flag=false;}
  }else if(enemy.mesh.position.x > -50 && flag==false){
    enemy.mesh.position.x-=0.5;
    if(enemy.mesh.position.x<=-50){flag=true;}
  }
}

var flag1=true;
function PlaneMovement(pl,angle){
  if(pl.mesh.rotation.z < angle && flag1==true){
    pl.mesh.rotation.z+=0.02;
    /*
    if(pl.mesh.rotation.z>=angle){ flag1=false;}
  }else if(pl.mesh.rotation.z > -angle && flag1==false){
    pl.mesh.rotation.z-=0.02;
    if(pl.mesh.rotation.z<=-angle){flag1=true;}*/
  }
}



function collision(bullet, plane){
  var c=(bullet.mesh.position.x<=plane.mesh.position.x+10 && bullet.mesh.position.x>=plane.mesh.position.x-10) &&
        (bullet.mesh.position.z<=plane.mesh.position.z+10 && bullet.mesh.position.z>=plane.mesh.position.z-10) &&
        (bullet.mesh.position.y<=plane.mesh.position.y+10 && bullet.mesh.position.y>=plane.mesh.position.y-10);
  if(c){
    //console.log(c,"Collision");
    plane.hit=true;
    enemies_positions.push(plane.positionPoint);
    maxpointnumber+=1;
    //plane.positionPoint.taken=false;
    if(plane.hit=true){
      enemies_number-=1;
    }
    
    bullet.mesh.position.set(0,0,0);
    scene.remove(bullet.mesh);
  }else{
    if(bullet.mesh.position.z>=100){
      scene.remove(bullet.mesh);
    }
    //console.log(c,"NO collision");
  }
}

//spawn an enemy plane each second
//setInterval(function() {generatePlane()}, 1000);
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
onWindowResize()


//const angle=Math.PI/6;
  
  //requestAnimationFrame(render);



const angle=Math.PI/6;

function render() {
  //time *= 0.001;  // convert time to seconds
 /* if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
*/

  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });

  //cylinder.rotation.x = time;
  //plane.rotation.z=2*time;
  
  const vel=1.0;
  if(rightPressed&& plane.mesh.position.x>-90) {
    plane.mesh.position.x -= vel;
    if(plane.mesh.rotation.z < angle){
      plane.mesh.rotation.z+=0.05;
    }

   }
  else if(leftPressed && plane.mesh.position.x<90) {
    plane.mesh.position.x += vel;
    if(plane.mesh.rotation.z > -angle){
      plane.mesh.rotation.z-=0.05;
    }

  }
  if(downPressed && plane.mesh.position.z>-40) {
    plane.mesh.position.z -= vel;
    if(plane.mesh.rotation.x > -angle/2){
      plane.mesh.rotation.x-=0.05;
    }
  }
  else if(upPressed && plane.mesh.position.z<40) {
    plane.mesh.position.z += vel;
    if(plane.mesh.rotation.x < angle){
      plane.mesh.rotation.x+=0.05;
    }
  }

  if(!rightPressed) {
    if(plane.mesh.rotation.z > 0){
      plane.mesh.rotation.z-=0.1;
    }
  }
  if(!leftPressed) {
    if(plane.mesh.rotation.z < 0){
      plane.mesh.rotation.z+=0.1;
    }
  }
  if(!upPressed) {
    if(plane.mesh.rotation.x > 0){
      plane.mesh.rotation.x-=0.1;
    }
  }
  if(!downPressed) {
    if(plane.mesh.rotation.x < 0){
      plane.mesh.rotation.x+=0.1;
    }
  }

  var bullet_velocity=2;
  if (spacebarPressed){
    //bullet.shoot(5);
    R1bullets.forEach(b => {
      b.mesh.position.z+=bullet_velocity;
      enemies.forEach(p => {
        collision(b,p);
      });

    });
    L1bullets.forEach(b => {
      b.mesh.position.z+=bullet_velocity;
      enemies.forEach(p => {
        collision(b,p);
      });
    });
  }
  
  //movePlane(plane1);
  //movePlane(plane2);
  //plane.mesh.rotation.x=Math.PI/6;

 
  console.log(enemies_number);

  controls.update();

 /* enemies.forEach(p => {
    p.propeller.rotation.z=20*time;
    p.destroy();
    if(p.mesh.position.y<=-100){
      scene.remove(p.mesh);
    }
    //movePlane(p);
  });
  */
  water.material.uniforms[ 'time' ].value += 0.5 / 60.0;
  //plane.propeller.rotation.z=20*time;
  

  //renderer.render(scene, camera);

  //requestAnimationFrame(render);
}

function animate(){
  

    requestAnimationFrame(animate)
    renderer.render(scene,camera)
    const time = performance.now() * 0.001;
    plane.propeller.rotation.z=20*time;

    enemies.forEach(p => {
      p.propeller.rotation.z=20*time;
      p.destroy();
      if(p.mesh.position.y<=-100){
        scene.remove(p.mesh);
      } 
    });
    
    myObj.position.z += 1;
  
    render()
    
   
    
}

//main()
animate()
