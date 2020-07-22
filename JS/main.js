//console.log(THREE);




// populate  the scene need a 3d object  two parts geomerty and surface material which which makes a mes

	//container for 3d world
	var scene = new THREE.Scene();



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

 	
 	
	// call the method and add the arguments
	renderer.render( scene,camera);





// populate  the scene need a 3d object  two parts geomerty and surface material which which makes a mes


