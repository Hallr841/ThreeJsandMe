//console.log(THREE);


function init(){
	//container for 3d world
	var scene = new THREE.Scene();

	var box = getBox(1,1,1);
	var plane = getPlane(4);


	  scene.add(box);
	  scene.add(plane);

	  // box.position.y = box.geometry.parameters.Height*2;
	   box.position.y =0.5;
	  plane.rotation.x = Math.PI/2;


	//also needed a camera eyes of the world  field of view/ascept ratio/ clipping planes 
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight , 1 , 1000);
	//adjust the position of the camera
	//inital the Webgl renderer /  wbggl suse the gpu not the cpu
	var renderer = new THREE.WebGLRenderer();
	//diciated the size of  the render
	renderer.setSize( window.innerWidth,window.innerHeight);
	//what this do
	// attachting the dom element to the reneder
	document.getElementById('webgl').appendChild(renderer.domElement);
	camera.position.z=5;
	camera.position.y=2;
	camera.position.x=1;
 	
 	camera.lookAt(new THREE.Vector3(0,0,0));
	// call the method and add the arguments
	//renderer.render( scene,camera);
	// using the update function  call  the paramter
	update(renderer,scene,camera);

	return scene

}
var scene  = init();

function update(renderer,scene,camera){
  renderer.render(scene,camera);

  requestAnimationFrame(function(){
  	update(renderer,scene,camera);
  })


}

// populate  the scene need a 3d object  two parts geomerty and surface material which which makes a mes

function getBox(w,h,d){

    var geometry =new THREE.BoxGeometry(w,h,d);
    var material =new THREE.MeshBasicMaterial({
    	color: 0xFFA500,
    	side:THREE.DoubleSide
    });

    //create the mesh
    var mesh = new THREE.Mesh(geometry,material);
  
    return mesh
}


//plane function
function getPlane(size){
    var geometry = new THREE.PlaneGeometry(size,size);
    var material = new THREE.MeshBasicMaterial({
    	color: 0x00ff00,
    	side: THREE.DoubleSide

    });

    //create the mesh
    var mesh = new THREE.Mesh(
    	geometry,
    	material
    	);

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
