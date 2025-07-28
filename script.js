const densities = {
  iron_cube: { label: "مكعب حديد", mass: 1500 },
  orange: { label: "برتقالة", mass: 200 },
  wood_cylinder: { label: "أسطوانة خشب", mass: 800 }
};

let totalMassG = 0;
let addedItems = [];

const scaleArea = document.getElementById("scale");
const dropSound = document.getElementById("drop-sound");

function updateDisplay() {
  const totalKg = totalMassG / 1000;
  document.getElementById("kg-value").textContent = totalKg.toFixed(3);
  document.getElementById("g-value").textContent = totalMassG.toFixed(2);
  document.getElementById("item-count").textContent = addedItems.length;

  const list = document.getElementById("material-list");
  list.innerHTML = "";

  addedItems.forEach(item => {
    const li = document.createElement("li");
    let icon = "";
    if (item === "iron_cube") icon = "🟫";
    else if (item === "orange") icon = "🟠";
    else if (item === "wood_cylinder") icon = "🪵";
    li.textContent = `${icon} ${densities[item].label}`;
    li.style.fontWeight = "bold";
    list.appendChild(li);
  });
}

function resetScale() {
  totalMassG = 0;
  addedItems = [];
  updateDisplay();
}

function handleDrop(item) {
  addedItems.push(item);
  totalMassG += densities[item].mass;
  dropSound.currentTime = 0;
  dropSound.play();
  updateDisplay();
}

// دعم السحب بالإصبع (للأجهزة اللمسية)
document.querySelectorAll('.draggable').forEach(elem => {
  elem.addEventListener('click', () => {
    handleDrop(elem.dataset.item);
  });
});