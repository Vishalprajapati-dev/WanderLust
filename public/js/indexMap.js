const mapDiv = document.getElementById("allListingsMap");

if (mapDiv) {

  const map = L.map("allListingsMap").setView(
    [20.5937, 78.9629],
    4
  );

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "&copy; OpenStreetMap contributors",
    }
  ).addTo(map);

  listings.forEach((listing) => {

    if (
      listing.geometry &&
      listing.geometry.coordinates &&
      listing.geometry.coordinates.length === 2
    ) {

      const lng = listing.geometry.coordinates[0];
      const lat = listing.geometry.coordinates[1];

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          `<b>${listing.title}</b><br>${listing.location}`
        );
    }

  });

}