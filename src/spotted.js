import ThreeGlobe from "three-globe";
import * as d3 from "d3";
// import document from "./dog-population-by-country-2024.json" with {type: "json"};
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight
} from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass
} from "postprocessing";
import starve_json from "./updated_starvation.json";




fetch(
  `https://vasturiano.github.io/three-globe/example/country-polygons/ne_110m_admin_0_countries.geojson`
)
  .then((res) => res.json())
  .then((countries) => {
    // console.log(country_json);
    const Globe = new ThreeGlobe()
      .globeImageUrl(
        // "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        "https://static6.depositphotos.com/1137194/623/i/450/depositphotos_6233022-stock-illustration-earth-map-as-brush-illustration.jpg"
      )
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .polygonsData(
        countries.features.filter((d) => d.properties.ISO_A2 !== "AQ")
      )
      .polygonCapColor(() => "rgba(0, 0, 0, 0)")
      .polygonSideColor(() => "rgba(0, 0, 0, 0)")
      .polygonStrokeColor(() => "#111")
      .labelsData(starve_json)
      // .labelText(d => `(${Math.round(d.latitude * 1e2) / 1e2}, ${Math.round(d.longitude * 1e2) / 1e2})`)
      .labelText(d => `${d.country} Deaths: ${d.size}`)
      .labelSize(.5)
      .labelDotRadius(d => d.size / 20)
      .labelColor('color');
    //   console.log(gData);
      console.log(starve_json);
    //    setTimeout(() => Globe.polygonAltitude(() => Math.random()), 0)
    const scene = new Scene();
    scene.add(Globe);
    scene.add(new AmbientLight(0xffffff));
    scene.add(new DirectionalLight(0xffffff, 1));
    // scene.rotation.y += 0.009;

    const renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: false,
      stencil: false,
      depth: false
    });
    renderer.setSize(window.innerWidth*3/4, window.innerHeight*3/4);
    document.getElementById("globeViz").appendChild(renderer.domElement);

    const camera = new PerspectiveCamera();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 300;

    const tbControls = new TrackballControls(camera, renderer.domElement);
    tbControls.minDistance = 101;
    tbControls.rotateSpeed = 5;
    tbControls.zoomSpeed = 0.8;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new BloomEffect();
    composer.addPass(new EffectPass(camera, bloom));

    function animate() {
      tbControls.update();
      composer.render();
      window.requestAnimationFrame(animate);
    }
    d3.timer(function (t) {
      // scene.rotation.x =
      //   (0.8 * (Math.sin(t / 11000) * Math.PI)) / 3 - Math.PI / 2;
      // scene.rotation.y = t / 10000;
      renderer.render(scene, camera);
    });
    animate();
  })
  .catch(console.log);
