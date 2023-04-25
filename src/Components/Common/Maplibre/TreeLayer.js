/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable  */

import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// import GLTFLoader from './GLTFLoader';

function TreeLayer({ map, latlng, maploaded, id = "tree0" }) {
  useEffect(() => {
    // map.on('load', function () {

    if (!map || !maploaded) return;
    // parameters to ensure the model is georeferenced correctly on the map
    const modelOrigin = latlng;
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];

    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );

    // transformation parameters to position, rotate and scale the 3D model onto the map
    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      /* Since our 3D model is in real world meters, a scale transform needs to be
       * applied since the CustomLayerInterface expects units in MercatorCoordinates.
       */
      //   scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
      scale: 0.00000002846390879906901,
    };

    // const THREE = window.THREE;

    // configuration of the custom layer for a 3D model per the CustomLayerInterface
    const customLayer = {
      id: id,
      type: "custom",
      renderingMode: "3d",
      onAdd(map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        // create two three.js lights to illuminate the model
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        var directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        // use the three.js GLTF loader to add the 3D model to the three.js scene
        var loader = new GLTFLoader();
        loader.load(
          // 'https://maplibre.org/maplibre-gl-js-docs/assets/34M_17/34M_17.gltf',
          "https://raw.githubusercontent.com/kaditya97/resources/main/bipad.gltf",
          // 'https://rohitgautam.com.np/media/misc/scene.gltf',

          function (gltf) {
            this.scene.add(gltf.scene);
          }.bind(this)
        );

        this.map = map;

        // use the MapLibre GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });

        this.renderer.autoClear = false;
      },
      render: function (gl, matrix) {
        var rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        var rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        var rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        var m = new THREE.Matrix4().fromArray(matrix);
        var l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.state.reset();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      },
    };
    map?.addLayer(customLayer);

    // map.getLayers();

    // });
  }, [map, maploaded]);
  return null;
}

export default TreeLayer;

// // parameters to ensure the model is georeferenced correctly on the map
// var modelOrigin = [148.9819, -35.39847];
// var modelAltitude = 0;
// var modelRotate = [Math.PI / 2, 0, 0];

// var modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
//     modelOrigin,
//     modelAltitude
// );

// // transformation parameters to position, rotate and scale the 3D model onto the map
// var modelTransform = {
//     translateX: modelAsMercatorCoordinate.x,
//     translateY: modelAsMercatorCoordinate.y,
//     translateZ: modelAsMercatorCoordinate.z,
//     rotateX: modelRotate[0],
//     rotateY: modelRotate[1],
//     rotateZ: modelRotate[2],
//     /* Since our 3D model is in real world meters, a scale transform needs to be
//      * applied since the CustomLayerInterface expects units in MercatorCoordinates.
//      */
//     scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
// };

// var THREE = window.THREE;

// // configuration of the custom layer for a 3D model per the CustomLayerInterface
// var customLayer = {
//     id: '3d-model',
//     type: 'custom',
//     renderingMode: '3d',
//     onAdd: function (map, gl) {
//         this.camera = new THREE.Camera();
//         this.scene = new THREE.Scene();

//         // create two three.js lights to illuminate the model
//         var directionalLight = new THREE.DirectionalLight(0xffffff);
//         directionalLight.position.set(0, -70, 100).normalize();
//         this.scene.add(directionalLight);

//         var directionalLight2 = new THREE.DirectionalLight(0xffffff);
//         directionalLight2.position.set(0, 70, 100).normalize();
//         this.scene.add(directionalLight2);

//         // use the three.js GLTF loader to add the 3D model to the three.js scene
//         var loader = new THREE.GLTFLoader();
//         loader.load(
//             // 'https://maplibre.org/maplibre-gl-js-docs/assets/34M_17/34M_17.gltf',
//             'http://localhost:5500/3ds/scene.gltf',

//             function (gltf) {
//                 this.scene.add(gltf.scene);
//             }.bind(this)
//         );
//         this.map = map;

//         // use the MapLibre GL JS map canvas for three.js
//         this.renderer = new THREE.WebGLRenderer({
//             canvas: map.getCanvas(),
//             context: gl,
//             antialias: true
//         });

//         this.renderer.autoClear = false;
//     },
//     render: function (gl, matrix) {
//         var rotationX = new THREE.Matrix4().makeRotationAxis(
//             new THREE.Vector3(1, 0, 0),
//             modelTransform.rotateX
//         );
//         var rotationY = new THREE.Matrix4().makeRotationAxis(
//             new THREE.Vector3(0, 1, 0),
//             modelTransform.rotateY
//         );
//         var rotationZ = new THREE.Matrix4().makeRotationAxis(
//             new THREE.Vector3(0, 0, 1),
//             modelTransform.rotateZ
//         );

//         var m = new THREE.Matrix4().fromArray(matrix);
//         var l = new THREE.Matrix4()
//             .makeTranslation(
//                 modelTransform.translateX,
//                 modelTransform.translateY,
//                 modelTransform.translateZ
//             )
//             .scale(
//                 new THREE.Vector3(
//                     modelTransform.scale,
//                     -modelTransform.scale,
//                     modelTransform.scale
//                 )
//             )
//             .multiply(rotationX)
//             .multiply(rotationY)
//             .multiply(rotationZ);

//         this.camera.projectionMatrix = m.multiply(l);
//         this.renderer.state.reset();
//         this.renderer.render(this.scene, this.camera);
//         this.map.triggerRepaint();
//     }
// };
