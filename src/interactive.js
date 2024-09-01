import Globe from 'globe.gl';
// import custom_geo from "./custom_geo.geojson"

// fetch('https://vasturiano.github.io/three-globe/example/country-polygons/ne_110m_admin_0_countries.geojson').then(res => res.json()).then(countries =>
fetch('https://raw.githubusercontent.com/CasFre4/testRepo/main/custom_geo.geojson').then(res => res.json()).then(countries =>
    {
      const world = Globe()
        
        .globeImageUrl(
          "https://static6.depositphotos.com/1137194/623/i/450/depositphotos_6233022-stock-illustration-earth-map-as-brush-illustration.jpg"
        )
        .polygonsData(
          countries.features
        )
        .polygonCapColor(() => "rgba(0, 0, 0, 0)")
        .polygonSideColor(() => "rgba(0, 0, 0, 0)")
        .polygonStrokeColor(() => "#111")
        .polygonAltitude(0)
        .hexAltitude(.1)
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(-.0001)
        .hexPolygonUseDots(true)
        .hexPolygonColor(() => "rgba(0, 0, 0, 0)")
        // .hexPolygonColor(() => "rgba(0, 60, 0, 1)")
        .hexPolygonLabel(({ properties: d }) => `
          <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
          Starvation Deaths: <i>${d.size}</i>
        `)
        // .labelsData(starve_json)
        // .hexPolygonLabel(d => `${.country} Deaths: ${d.size}`)
        (document.getElementById('globeViz'))
    });
