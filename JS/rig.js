    function init() {
	var scene = new THREE.Scene();
	var gui = new dat.GUI();
	var clock =  new  THREE.Clock();


	var enableFog = false;

	if (enableFog) {
		scene.fog = new THREE.FogExp2(0xffffff, 0.2);
	}

	//use the  boxgrid function 	
// var box = getBox(1, 1, 1);
	var plane = getPlane(100);
	//calling the the directionallight
	var directionalLight = getDirectionalLight(1);
	var ambientLight = getAmbientLight(5);
	var sphere = getSphere(0.05);
	var boxGrid = getBoxGrid(20,2.5);
	var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    boxGrid.name = 'boxGrid';
	plane.name = 'plane-1';
	

	//box.position.y = box.geometry.parameters.height/2;
	plane.rotation.x = Math.PI/2;
	directionalLight.position.x= 13;
	directionalLight.position.y = 10;
	directionalLight.position.z = 10;
	directionalLight.intensity = 2;

//  add the boxgrid to scene 
//	scene.add(box);
	scene.add(plane);
	directionalLight.add(sphere);
	scene.add(directionalLight);
	scene.add(boxGrid);
	scene.add(helper);
	scene.add(ambientLight);

	// gui.add(directionalLight,'intensity', 0, 10);
	// gui.add(directionalLight.position, 'y', 0, 5);
	// gui.add(directionalLight.position, 'x', -10,10);
	// gui.add(directionalLight.position, 'z', -10,10)

	 var camera = new THREE.PerspectiveCamera(
	 	45,
	 	window.innerWidth/window.innerHeight,
	 	1,
	 	1000
	 );



	var cameraYPosition = new THREE.Group();
 	var cameraZPosition = new THREE.Group();
 	var cameraYRotation = new THREE.Group();
 	var cameraXRotation = new THREE.Group();
 	var cameraZRotation = new THREE.Group();


 	 cameraYPosition.name = 'cameraYPosition';
 	 cameraZPosition.name = 'cameraZPosition';
 	 cameraYRotation.name = 'cameraYRotation';
 	 cameraXRotation.name = 'cameraXRotation';
 	 cameraZRotation.name = 'cameraZRotation';

 	cameraZRotation.add(camera) 
 	cameraYPosition.add(cameraZRotation);
 	cameraZPosition.add(cameraYPosition);
 	cameraXRotation.add(cameraZPosition);
 	cameraYRotation.add(cameraXRotation);
 	scene.add(cameraYRotation);

 	cameraXRotation.rotation.x = -Math.PI/2;
 	cameraZPosition.position.z  = 100;
 	cameraYPosition.position.y = 1;

 	gui.add(cameraZPosition.position, 'z', 0, 100);
 	gui.add(cameraYRotation.rotation, 'y', -Math.PI , Math.PI);
 	gui.add(cameraXRotation.rotation, 'x', -Math.PI , Math.PI);
 	gui.add(cameraZRotation.rotation,  'z', -Math.PI , Math.PI);




	var renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled =true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('rgb(120, 120, 120)');
	document.getElementById('webgl').appendChild(renderer.domElement);
	var controls = new THREE.OrbitControls(camera, renderer.domElement);

	update(renderer, scene, camera, controls,clock);

	return scene;
}

function getBox(w, h, d) {
	var geometry = new THREE.BoxGeometry(w, h, d);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)'
	});

	var mesh = new THREE.Mesh(
		geometry,
		material 

	);
		mesh.castShadow = true;

	return mesh;
}

function getBoxGrid(amount,separationMultiplier){
	
	//group like div or element 
	var group = new THREE.Group();

	for (var i=0;i<amount;i++){
		var obj = getBox(3,3,3);
		obj.position.x = i*separationMultiplier;
		obj.position.y = obj.geometry.parameters.height/2;
		group.add(obj);
		for(var j=1;j<amount; j++){
			var obj =getBox(1,1,1);
			obj.position.x = i *separationMultiplier;
			obj.position.y = obj.geometry.parameters.height/2;
			obj.position.z = j*separationMultiplier;
			group.add(obj);

		}
	}

	group.position.x =-(separationMultiplier * (amount-1))/2;
	group.position.z =-(separationMultiplier * (amount-1))/2;

	return group;

}


function getPlane(size) {
	var geometry = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)',
		side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material 
	);
     mesh.receiveShadow =true;
     

	return mesh; 
}


function getSphere(size) {
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	var material = new THREE.MeshBasicMaterial({
		color: 'rgb(255, 255, 255)'
	});
	var mesh = new THREE.Mesh(
		geometry,
		material 
	);

	return mesh;
}


function getPointLight(intensity) {
	var light = new THREE.directionalLight(0xffffff, intensity);
	light.castShadow =true;
	return light;
}

function getSpotlLight(intensity) {
	var light = new THREE.directionalLight(0xffffff, intensity);
	light.castShadow =true;
	light.shadow.bias = 0.001;
	light.shadow.mapSize.width= 2048;
	light.shadow.mapSize.height= 2048;
	return light;
}


function getDirectionalLight(intensity) {
	var light = new THREE.DirectionalLight(0xffffff, intensity);
	light.castShadow =true;

	light.shadow.camera.left = - 40;
	light.shadow.camera.bottom= - 40;
	light.shadow.camera.right = 40;
	light.shadow.camera.top = 40;

	light.shadow.mapSize.width=4096;
	light.shadow.mapSize.height=4096;



	return light;
}


function getAmbientLight(intensity) {
	var light = new THREE.AmbientLight('rgb(0,0,0)', intensity);
	return light;
}


function update(renderer, scene, camera, controls,clock) {
	renderer.render(
		scene,
		camera
	);

	controls.update();

	var timeElapsed = clock.getElapsedTime();

	 var cameraZPosition = scene.getObjectByName('cameraZPosition');
	 cameraZPosition.position.z -= 0.25;

 var cameraZRotation= scene.getObjectByName('cameraZRotation');
  cameraZRotation.rotation.z = noise.simplex2(timeElapsed*1.5, timeElapsed* 1.5)*.02;


   var cameraXRotation = scene.getObjectByName('cameraXRotation');
    if(cameraXRotation.rotation.x < 0 ){

    cameraXRotation.rotation.x += 0.01;

    }






	  var boxGrid = scene.getObjectByName('boxGrid');
	   boxGrid.children.forEach(function(child, index){
	   	 var x = (timeElapsed+index);
	  child.scale.y = (noise.simplex2(x,x)+1)/2+0.001;
	  child.position.y =child.scale.y/2;
	  });

	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls,clock);
	})
}

var scene = init();