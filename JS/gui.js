//console.log(THREE);
//instance and the add
// add method for parameters 

function init(){
	//container for 3d world
	var scene = new THREE.Scene();
	//instance gui
	var gui = new dat.GUI();
    

	var enableFog = false ;

	if(enableFog){
	scene.fog = new THREE.FogExp2(0xffffff,0.2);

	}



	var box = getBox(1,1,1);
	var plane = getPlane(20);
	var pointLight = getPointLight(1);
	var sphere = getSphere(0.05);
	//assigning a name by object
	plane.name = 'plane-1';



	  scene.add(box);
	  scene.add(plane);
	  scene.add(pointLight);
	  pointLight.add(sphere);


	 box.position.y = box.geometry.parameters.height/2;
	 //box.position.y =0.5;
	 plane.rotation.x = Math.PI/2;
	 // plane.position.y=1;
	 // must set the light position
	 pointLight.position.y =2;
	 pointLight.position.x = 1;
	 //control for dat gui
	 pointLight.intensity = 2;

	 //control. add method to control  the light intensity 
	 gui.add(pointLight,'intensity', 0,10);
	 gui.add(pointLight.position, 'y',0,5 );
	 gui.add(pointLight.position, 'x',-10,5 );




	//also needed a camera eyes of the world  field of view/ascept ratio/ clipping planes 
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight , 1 , 1000);
	//adjust the position of the camera
	//inital the Webgl renderer /  wbggl suse the gpu not the cpu
	var renderer = new THREE.WebGLRenderer();
	//diciated the size of  the render
	renderer.setSize( window.innerWidth,window.innerHeight);
	//renderer.setClearColor(0xffffff);
	//renderer.setClearColor('ffffff');
	renderer.setClearColor('rgb(120,120,120)');	
	//what this do
	// attachting the dom element to the reneder
	document.getElementById('webgl').appendChild(renderer.domElement);
	camera.position.z=5;
	camera.position.y=2;
	camera.position.x=1;
		//obrit instance
 	
 	camera.lookAt(new THREE.Vector3(0,0,0));
	// call the method and add the arguments
	//renderer.render( scene,camera);
	// using the update function  call  the paramter
	update(renderer,scene,camera);

	return scene

}


var scene  = init();



function getPointLight(intensity){

	 var light = new THREE.PointLight(0xffffff,intensity);

	 return light;
}


function update(renderer,scene,camera){
  renderer.render(scene,camera);

 /* var plane = scene.getObjectByName('plane-1');
  plane.rotation.y += 0.001;
  plane.rotation.z += 0.001;

  scene.traverse(function(child){ 
  	 child.scale.x+= 0.001;
  })*/



  requestAnimationFrame(function(){
  	update(renderer,scene,camera);
  })


}

// populate  the scene need a 3d object  two parts geomerty and surface material which which makes a mes

function getBox(w,h,d){

    var geometry =new THREE.BoxGeometry(w,h,d);
    var material =new THREE.MeshPhongMaterial({
    	color: 'rgb(120,120,120)',
    	side:THREE.DoubleSide
    });

    //create the mesh
    var mesh = new THREE.Mesh(geometry,material);
  
    return mesh
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

    return mesh
}



function getSphere(size){

    var geometry =new THREE.SphereGeometry(size,24,24);
    var material =new THREE.MeshBasicMaterial({
    	color: 'rgb(255,255,255)',
    	side:THREE.DoubleSide
    });

    //create the mesh
    var mesh = new THREE.Mesh(geometry,material);
  
    return mesh
}





	// var scene = new THREE.Scene();
	// var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
	
	// var renderer = new THREE.WebGLRenderer();
	// renderer.setSize( window.innerWidth, window.innerHeight );
	// document.body.appendChild( renderer.domElement );

	// var geometry = new THREE.BoxGeometry();
	// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	// var cube = new THREE.Mesh( geometry, material );
	// scene.add( cube );
 
 //    camera.position.z = 5;

	// renderer.render( scene, camera );
