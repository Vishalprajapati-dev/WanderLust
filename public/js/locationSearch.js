const locationInput = document.getElementById("location");
const suggestionsBox = document.getElementById("suggestions");
const previewMapDiv = document.getElementById("preview-map");
let timeout;

if (locationInput) {

locationInput.addEventListener("input", () => {

clearTimeout(timeout);

timeout = setTimeout(async () => {

    const query = locationInput.value.trim();

    if (query.length < 3) {
        suggestionsBox.innerHTML = "";
        return;
    }

  try {
   const response = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&accept-language=en&q=${encodeURIComponent(query)}`
);

    const data = await response.json();

    suggestionsBox.innerHTML = "";

    data.forEach((place) => {
      const item = document.createElement("button");

      item.type = "button";
      item.className = "list-group-item list-group-item-action";

      item.textContent = place.display_name;

item.addEventListener("click", () => {

  locationInput.value =
    place.address?.city ||
    place.address?.town ||
    place.address?.village ||
    place.address?.state ||
    place.name;

  suggestionsBox.innerHTML = "";

  if (!previewMapDiv) return;

  const lat = parseFloat(place.lat);
  const lon = parseFloat(place.lon);

  previewMapDiv.style.display = "block";

  if (window.previewMap) {
    window.previewMap.remove();
  }

  window.previewMap = L.map("preview-map").setView(
    [lat, lon],
    13
  );

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "&copy; OpenStreetMap contributors"
    }
  ).addTo(window.previewMap);

  L.marker([lat, lon])
    .addTo(window.previewMap)
    .bindPopup(locationInput.value)
    .openPopup();
});

      suggestionsBox.appendChild(item);
    });

  } catch (err) {
  console.log(err);
  }
}, 500);
})}; 
