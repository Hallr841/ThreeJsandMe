function init(){
	//container for 3d world
	var scene = new THREE.Scene();
	//instance gui
	var gui = new dat.GUI();
    

	var enableFog = false;

	if(enableFog){
	scene.fog = new THREE.FogExp2(0xffffff,0.2);
	}

	var box = getBox(1,1,1);
	var plane = getPlane(20);
	var pointLight = getPointLight(1);
	var sphere = getSphere(0.05);
	
	//assigning a name by object
	plane.name = 'plane-1';


	 box.position.y = box.geometry.parameters.height/2;
	  
	 //box.position.y =0.5;
	 //or
	 plane.rotation.x = Math.PI/2;
	 
	 // plane.position.y=1;
	 // must set the light position
	 pointLight.position.y= 2;
	 pointLight.position.x= 1;
	 
	 //control for dat gui
	 pointLight.intensity = 2;
	 //pointLight.intensity = 2;


	  scene.add(box);
	  scene.add(plane);
	  pointLight.add(sphere);
	  scene.add(pointLight);




	 //control. add method to control  the light intensity 
	 gui.add(pointLight,'intensity', 0,10);
	 gui.add(pointLight.position, 'y', 0, 5);
	 gui.add(pointLight.position, 'x', -10,5 );




	//also needed a camera eyes of the world  field of view/ascept ratio/ clipping planes 
	var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1 , 1000);

	//adjust the position of the camera
	camera.position.z=5;
	camera.position.y=2;
	camera.position.x=1;

	camera.lookAt(new THREE.Vector3(0,0,0));

	//inital the Webgl renderer /  wbggl suse the gpu not the cpu
	var renderer = new THREE.WebGLRenderer();
	//diciated the size of  the render
	renderer.setSize(window.innerWidth,window.innerHeight);
	
	//renderer.setClearColor(0xffffff);
	//renderer.setClearColor('ffffff');
	renderer.setClearColor('rgb(120,120,120)');	
	
	//what this do
	// attachting the dom element to the reneder
	document.getElementById('webgl').appendChild(renderer.domElement);

	//obrit instance
	var controls = new THREE.OrbitControls(camera, renderer.domElement);
 	
 	
	// call the method and add the arguments
	//renderer.render( scene,camera);
	// using the update function  call  the paramter
	update(renderer,scene,camera,controls);

	return scene;

}




// populate  the scene need a 3d object  two parts geomerty and surface material which which makes a mes

function getBox(w , h , d){
    var geometry = new THREE.BoxGeometry(w,h,d);
    var material = new THREE.MeshPhongMaterial({
    	color: 'rgb(120,120,120)'
    });
    //create the mesh
    var mesh = new THREE.Mesh(
    	geometry,
    	material

    );
  
    return mesh;
}



//plane function
function getPlane(size){
    var geometry = new THREE.PlaneGeometry(size,size);
    var material = new THREE.MeshPhongMaterial({
    	color: 'rgb(120,120,120)',
    	side: THREE.DoubleSide

    });

    //create the mesh
    var mesh = new THREE.Mesh(
    	geometry,
    	material
    	);

    return mesh;
}






function getSphere(size){

    var geometry =new THREE.SphereGeometry(size,24,24);
    var material =new THREE.MeshBasicMaterial({
    	color: 'rgb(255,255,255)'
    });

    //create the mesh
    var mesh = new THREE.Mesh(
    	geometry,
    	material
    	);
  
    return mesh;
}


function getPointLight(intensity){

	 var light = new THREE.PointLight(0xffffff,intensity);

	 return light;
}






function update(renderer,scene,camera,controls){
  renderer.render(
  	scene,
  	camera

);


  controls.update();

  requestAnimationFrame(function(){
  	update(renderer,scene,camera,controls);
  })
}



//call
var Scene= init();