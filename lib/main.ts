let scene = spatialDocument.scene as BABYLON.Scene;
const duck = spatialDocument.getNodeById('duckbound');
let sceneTime=0;

function scene1(){
   
    let swingp = 0;
    let swingNum=100;
    let swingFirst=true;
    const originalPosition = duck.position.clone();
    const originalRotation = duck.rotation.clone();
    let sphereNum=10;
    let spheres=[];
    let scaling=[];
    let timer=0;

    function init(){
        function generateSphere(){
            var sphere = BABYLON.Mesh.CreateSphere("sphere", 128, 2, scene);
            var scaling = Math.random() * 0.2+0.05;
            sphere.scaling = new BABYLON.Vector3(scaling,scaling,scaling);
            var pbr = new BABYLON.PBRMaterial("pbr", scene);
            sphere.material = pbr;
            pbr.metallic = Math.random();
            pbr.roughness = Math.random();   
            pbr.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
            pbr.albedoColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
            sphere.position = new BABYLON.Vector3(-0.8*Math.random()-0.6,0.8*Math.random()-0.3,2*Math.random());
            return sphere;
        }
        
        for(let i=0;i<sphereNum;i++){
            spheres.push({
                sphere:generateSphere(),
                speed:Math.random()*0.01+0.002,
            });
        }

        for(let i=0;i<sphereNum;i++){
            scaling.push(spheres[i].sphere.scaling.x);
        }
    }

    function recover(){
        for(let i=0;i<sphereNum;i++){
            spheres[i].sphere.scaling.x=scaling[i];
            spheres[i].sphere.scaling.y=scaling[i];
            spheres[i].sphere.scaling.z=scaling[i];
        }
    }

    function swing() {
        if(swingFirst){
            duck.rotation.x-=0.02*(swingNum/4);
            duck.rotation.z-=0.01*(swingNum/4);
            duck.rotation.z+=0.4;
            duck.rotation.y+=1.4;
            swingFirst=false;
        }
        if(swingp<swingNum/2){
            duck.rotation.x+=0.02
        }else{
            duck.rotation.x-=0.02
        }
        if(swingp<swingNum/4||(swingp>=swingNum/2&&swingp<swingNum*3/4)){
            duck.rotation.z+=0.01
        }else{
            duck.rotation.z-=0.01
        }
        swingp++;
        swingp%=swingNum;
    }
   
   
    
    function updateSphere(sphere){
        var scaling = Math.random() * 0.2+0.05;
        sphere.sphere.scaling = new BABYLON.Vector3(scaling,scaling,scaling);
        sphere.sphere.material.metallic = Math.random();
        sphere.sphere.material.roughness = Math.random();   
        sphere.sphere.material.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        sphere.sphere.material.albedoColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        sphere.sphere.position = new BABYLON.Vector3(-0.8*Math.random()-0.6,0.8*Math.random()-0.3,Math.random());
        sphere.speed=Math.random()*0.01+0.002;
    }
    
    function fly(){
        timer++;
        if(timer==120){
            timer=0;
        }
        for(let i=0;i<sphereNum;i++){
            spheres[i].sphere.position.x+=spheres[i].speed;
            spheres[i].sphere.position.y+=spheres[i].speed;
            spheres[i].sphere.position.z+=spheres[i].speed;
            if(spheres[i].sphere.position.x>0.4
                ||spheres[i].sphere.position.y>1.5
                ||spheres[i].sphere.position.z>10){
                updateSphere(spheres[i]);
            }
        }
        if(audio&&play&&timer%5==0){      
            if(array&&analyser){
                analyser.getByteTimeDomainData(array);
                for(let i=0;i<sphereNum;i++){
                    spheres[i].sphere.scaling.x=(array[i*100]-120)*0.2/255+scaling[i];
                    spheres[i].sphere.scaling.y=(array[i*100]-120)*0.2/255+scaling[i];
                    spheres[i].sphere.scaling.z=(array[i*100]-120)*0.2/255+scaling[i];
                }
            }else{
                for(let i=0;i<sphereNum;i++){
                    let random=Math.random()*60+90;
                    spheres[i].sphere.scaling.x=(random-120)*0.2/255+scaling[i];
                    spheres[i].sphere.scaling.y=(random-120)*0.2/255+scaling[i];
                    spheres[i].sphere.scaling.z=(random-120)*0.2/255+scaling[i];
                }
            } 
           
        }
       
    }

    function animate(){
        swing();
        fly();
        
    }
    function beginAnimation(){
        // init();
        scene.registerAfterRender(animate);
    }
    
    
    function dispose(){
        for(let i=0;i<sphereNum;i++){
            spheres[i].sphere.scaling.x=0;
            spheres[i].sphere.scaling.y=0;
            spheres[i].sphere.scaling.z=0;
        }
        scene.unregisterAfterRender(animate);
        duck.position=originalPosition;
        duck.rotation=originalRotation;
        swingFirst=true;
    }
    return {
        init:init,
        recover:recover,
        beginAnimation:beginAnimation,
        dispose:dispose
    };
}



   


function scene2(){
    let rotatep = 0;
    let rotateFirst=true;
    let rotateNum=200;
    let pbrs=[];
    let capsules=[];
    let timer=0;
    let blinkp = 0;
    const originalPosition = duck.position.clone();
    const originalRotation = duck.rotation.clone();
    function rotate() {
        if(rotateFirst){
            duck.position.y-=0.01*rotateNum/4
            rotateFirst=false; 
        }
        duck.rotation.y+=0.01
        if(rotatep<rotateNum/2){
            duck.position.y+=0.01
        }else{
            duck.position.y-=0.01
        }
        rotatep++;
        rotatep%=rotateNum;
    }
    
    function init(){
        const capsule1 = new BABYLON.Mesh.CreateCapsule("capsule", {radius:0.5, height:12, radiusTop:3});
        capsule1.scaling=new BABYLON.Vector3(0.15,0.15,0.15);
        capsule1.position=new BABYLON.Vector3(0,2,-1);
        var pbr1 = new BABYLON.PBRMaterial("pbr", scene);
        capsule1.material = pbr1;
        pbr1.metallic = Math.random();
        pbr1.roughness = Math.random();   
        pbr1.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbr1.albedoColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbrs.push(pbr1);
        capsules.push(capsule1);
        const capsule6 = new BABYLON.Mesh.CreateCapsule("capsule", {radius:0.5, height:12, radiusTop:3});
        capsule6.scaling=new BABYLON.Vector3(0.15,0.15,0.15);
        capsule6.position=new BABYLON.Vector3(-0.7,1.7,-1);
        var pbr6 = new BABYLON.PBRMaterial("pbr", scene);
        capsule6.material = pbr6;
        pbr6.metallic = Math.random();
        pbr6.roughness = Math.random();   
        pbr6.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbr6.albedoColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbrs.push(pbr6);
        capsule6.rotation.z+=Math.PI/4;
        capsules.push(capsule6);
        const capsule3 = new BABYLON.Mesh.CreateCapsule("capsule", {radius:0.5, height:12, radiusTop:3});
        capsule3.scaling=new BABYLON.Vector3(0.15,0.15,0.15);
        capsule3.position=new BABYLON.Vector3(-1,1,-1);
        var pbr3 = new BABYLON.PBRMaterial("pbr", scene);
        capsule3.material = pbr3;
        pbr3.metallic = Math.random();
        pbr3.roughness = Math.random();   
        pbr3.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbr3.albedoColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbrs.push(pbr3);
        capsule3.rotation.z+=Math.PI/2;
        capsules.push(capsule3);
        const capsule7 = new BABYLON.Mesh.CreateCapsule("capsule", {radius:0.5, height:12, radiusTop:3});
        capsule7.scaling=new BABYLON.Vector3(0.15,0.15,0.15);
        capsule7.position=new BABYLON.Vector3(-0.7,0.3,-1);
        var pbr7 = new BABYLON.PBRMaterial("pbr", scene);
        capsule7.material = pbr7;
        pbr7.metallic = Math.random();
        pbr7.roughness = Math.random();   
        pbr7.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbr7.albedoColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbrs.push(pbr7);
        capsule7.rotation.z+=Math.PI*3/4;
        capsules.push(capsule7);
        const capsule2 = new BABYLON.Mesh.CreateCapsule("capsule", {radius:0.5, height:12, radiusTop:3});
        capsule2.scaling=new BABYLON.Vector3(0.15,0.15,0.15);
        capsule2.position=new BABYLON.Vector3(0,0.15,-1);
        var pbr2 = new BABYLON.PBRMaterial("pbr", scene);
        capsule2.material = pbr2;
        pbr2.metallic = Math.random();
        pbr2.roughness = Math.random();   
        pbr2.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbr2.albedoColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbrs.push(pbr2);
        capsule2.rotation.x+=Math.PI;
        capsules.push(capsule2);
        const capsule8 = new BABYLON.Mesh.CreateCapsule("capsule", {radius:0.5, height:12, radiusTop:3});
        capsule8.scaling=new BABYLON.Vector3(0.15,0.15,0.15);
        capsule8.position=new BABYLON.Vector3(0.7,0.3,-1);
        var pbr8 = new BABYLON.PBRMaterial("pbr", scene);
        capsule8.material = pbr8;
        pbr8.metallic = Math.random();
        pbr8.roughness = Math.random();   
        pbr8.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbr8.albedoColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbrs.push(pbr8);
        capsule8.rotation.z-=Math.PI*3/4;
        capsules.push(capsule8);
        const capsule4 = new BABYLON.Mesh.CreateCapsule("capsule", {radius:0.5, height:12, radiusTop:3});
        capsule4.scaling=new BABYLON.Vector3(0.15,0.15,0.15);
        capsule4.position=new BABYLON.Vector3(1,1,-1);
        var pbr4 = new BABYLON.PBRMaterial("pbr", scene);
        capsule4.material = pbr4;
        pbr4.metallic = Math.random();
        pbr4.roughness = Math.random();   
        pbr4.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbr4.albedoColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbrs.push(pbr4);
        capsules.push(capsule4);
        capsule4.rotation.z-=Math.PI/2;
        const capsule5 = new BABYLON.Mesh.CreateCapsule("capsule", {radius:0.5, height:12, radiusTop:3});
        capsule5.scaling=new BABYLON.Vector3(0.15,0.15,0.15);
        capsule5.position=new BABYLON.Vector3(0.7,1.7,-1);
        var pbr5 = new BABYLON.PBRMaterial("pbr", scene);
        capsule5.material = pbr5;
        pbr5.metallic = Math.random();
        pbr5.roughness = Math.random();   
        pbr5.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbr5.albedoColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        pbrs.push(pbr5);
        capsule5.rotation.z-=Math.PI/4;
        capsules.push(capsule5);
    }


    
    function blink(){
        timer++;
        if(timer==120){
            timer=0;
            for(let i=0;i<8;i++){
                capsules[i].material=pbrs[(i-blinkp+8)%8];
            }
           
            blinkp++;
            blinkp%=8;
        }
     
        if(audio&&play&&timer%8==0){     
            if(array&&analyser){
                analyser.getByteTimeDomainData(array);
                for(let i=0;i<8;i++){
                    capsules[i].scaling.y=(array[i*100]-120)*0.3/255+0.15;
                }    
            }else{
                for(let i=0;i<8;i++){
                    let random=Math.random()*60+90;
                    capsules[i].scaling.y=(random-120)*0.2/255+0.15;
                }   
            } 
           
        }
    }
    function animate(){
        rotate();
        blink();
        sceneTime++;
    }

    function beginAnimation(){
        scene.registerAfterRender(animate);
    }
    function dispose(){
       
        for(let i=0;i<capsules.length;i++){
            capsules[i].scaling.x=0;
            capsules[i].scaling.y=0;
            capsules[i].scaling.z=0;
        }
        scene.unregisterAfterRender(animate);
        duck.position=originalPosition;
        duck.rotation=originalRotation;
    }
    return {
        init:init,
        beginAnimation:beginAnimation,
        dispose:dispose
    };
}


let sceneType = Math.floor(Math.random()*2)+1;
sceneType = 2;
let scenes=[];
scenes.push(scene1);
scenes.push(scene2);
// scene2();
let res1=scene1();
let res2=scene2();
res1.init();
res1.beginAnimation();
// if(sceneType==1){
//     let dispose=scene1();
//     // dispose();
// }else{
//     scene2();
// }
// let dispose=scenes[sceneType-1]();
setTimeout(() => {
   res1.dispose();
   setTimeout(() => {
        res1.recover();
        res1.beginAnimation();
    }, 10000);
//    res.beginAnimation();
    // res1.init();
    // res1.beginAnimation();
}, 10000);
// scene=scene1();
// scene.init();
// scene.beginAnimation();

async function createAudioPlayer(name: string) {
    const arrayBuffer = await import(`../audio/${name}`);
    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    const objectUrl = URL.createObjectURL(blob);
    const audio = new Audio(objectUrl);
    // const audio = new Audio("http://music.163.com/song/media/outer/url?id=5257138.mp3");
    audio.volume = 1.0;
    return audio;
  }

let audio=null;
(async function() {
 audio = await createAudioPlayer('audio1.mp3');
})();

let play=false;
spatialDocument.watchInputEvent();
spaceDocument.addEventListener('mouse', (event) => {
    const { inputData } = event;
    if (inputData.Action === 'up') {
        if (audio&&!play) {
            play=true;
            audio.play();
            if(!analyser){
                createAudioContext();
            }
        }
    } else if(inputData.Action === 'down'){
        if(audio&&play){
            play=false;
            audio.pause();
        }
    }
});

spaceDocument.addEventListener('handtracking', (event) => {
    const { inputData } = event;
    if (inputData.Type===1&&inputData.Orientation===0) {
        if (audio&&!play) {
            play=true;
            audio.play();
            if(!analyser){
                createAudioContext();
            }  
        }
    } else if(inputData.Type===1&&inputData.Gesture===1){
        if(audio&&play){
            play=false;
            audio.pause();
        }
    }
});
let array=null;
let analyser=null;
function createAudioContext(){
    var audioContext = new AudioContext(); 
    analyser = audioContext.createAnalyser(); 
    analyser.fftSize = 2048;
    var audioSrc = audioContext.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    analyser.connect(audioContext.destination); 
    array = new Uint8Array(analyser.frequencyBinCount); 
    analyser.getByteFrequencyData(array);
}









