// script.js

// Data array to store chemical information
let chemicals = [
    {id: 1, name: "Hydrogen", vendor: "GasCo", density: 0.0899, viscosity: 8.76e-6, packaging: "Cylinder", packSize: "50L", unit: "kg", quantity: 100},
    {id: 2, name: "Helium", vendor: "BalloonMart", density: 0.1785, viscosity: 19.9e-6, packaging: "Balloons", packSize: "100pc", unit: "kg", quantity: 50},
    {id: 3, name: "Lithium", vendor: "BatteryPro", density: 534, viscosity: null, packaging: "Bottles", packSize: "1L", unit: "kg", quantity: 20},
    {id: 4, name: "Beryllium", vendor: "MetalWorks", density: 1848, viscosity: null, packaging: "Bars", packSize: "1kg", unit: "kg", quantity: 15},
    {id: 5, name: "Boron", vendor: "CeramicCo", density: 2340, viscosity: null, packaging: "Powder", packSize: "5kg", unit: "kg", quantity: 30},
    {id: 6, name: "Carbon", vendor: "GraphiteInc", density: 2268, viscosity: null, packaging: "Blocks", packSize: "10kg", unit: "kg", quantity: 40},
    {id: 7, name: "Nitrogen", vendor: "GasCo", density: 1.165, viscosity: 15.89e-6, packaging: "Cylinder", packSize: "50L", unit: "kg", quantity: 80},
    {id: 8, name: "Oxygen", vendor: "MedicalGases", density: 1.141, viscosity: 19.97e-6, packaging: "Cylinder", packSize: "50L", unit: "kg", quantity: 120},
    {id: 9, name: "Fluorine", vendor: "ChemicalReagents", density: 1.696, viscosity: 16.46e-6, packaging: "Cylinder", packSize: "20L", unit: "kg", quantity: 25},
    {id: 10, name: "Neon", vendor: "SignCo", density: 0.9002, viscosity: 31.83e-6, packaging: "Tubes", packSize: "10pc", unit: "kg", quantity: 35},
    {id: 11, name: "Sodium", vendor: "BatteryPro", density: 968, viscosity: null, packaging: "Bottles", packSize: "1L", unit: "kg", quantity: 45},
    {id: 12, name: "Magnesium", vendor: "FireworksInc", density: 1738, viscosity: null, packaging: "Powder", packSize: "5kg", unit: "kg", quantity: 60},
    {id: 13, name: "Aluminum", vendor: "MetalWorks", density: 2699, viscosity: null, packaging: "Bars", packSize: "10kg", unit: "kg", quantity: 90},
    {id: 14, name: "Silicon", vendor: "SemiconductorCo", density: 2330, viscosity: null, packaging: "Wafers", packSize: "100pc", unit: "kg", quantity: 75},
    {id: 15, name: "Phosphorus", vendor: "FertilizerCorp", density: 1824, viscosity: null, packaging: "Powder", packSize: "20kg", unit: "kg", quantity: 110}
];

// Function to update the table display
function updateTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    chemicals.forEach((chemical) => {
        const row = document.createElement('tr');
        row.addEventListener('click', () => editChemical(chemical.id));

        Object.keys(chemical).forEach(key => {
            const cell = document.createElement('td');
            cell.textContent = chemical[key] !== null ? chemical[key] : '-';
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });
}

// Function to sort the table based on column index
function sortTable(colIndex, ascending = true) {
    chemicals.sort((a, b) => {
        let valueA = a[colIndex];
        let valueB = b[colIndex];

        // Handle numeric values
        if (!isNaN(valueA) && !isNaN(valueB)) {
            valueA = parseFloat(valueA);
            valueB = parseFloat(valueB);
        }

        if (valueA < valueB) return ascending ? -1 : 1;
        if (valueA > valueB) return ascending ? 1 : -1;
        return 0;
    });

    updateTable();
}

// Function to add a new chemical
function addChemical() {
    const newId = Math.max(...chemicals.map(c => c.id)) + 1;
    chemicals.push({
        id: newId,
        name: '',
        vendor: '',
        density: null,
        viscosity: null,
        packaging: '',
        packSize: '',
        unit: 'kg',
        quantity: 0
    });
    updateTable();
}

// Function to edit a chemical
function editChemical(id) {
    const chemical = chemicals.find(c => c.id === id);

    if (!chemical) return;

    const modal = document.getElementById('editModal');
    const form = document.getElementById('editForm');

    // Populate form fields with current data
    form.innerHTML = `
        <label>ID:</label>
        <input type="number" name="id" value="${chemical.id}" readonly><br>
        <label>Name:</label>
        <input type="text" name="name" value="${chemical.name}"><br>
        <label>Vendor:</label>
        <input type="text" name="vendor" value="${chemical.vendor}"><br>
        <label>Density:</label>
        <input type="number" name="density" value="${chemical.density || ''}"><br>
        <label>Viscosity:</label>
        <input type="number" name="viscosity" value="${chemical.viscosity || ''}"><br>
        <label>Packaging:</label>
        <input type="text" name="packaging" value="${chemical.packaging}"><br>
        <label>Pack Size:</label>
        <input type="text" name="packSize" value="${chemical.packSize}"><br>
        <label>Unit:</label>
        <input type="text" name="unit" value="${chemical.unit}"><br>
        <label>Quantity:</label>
        <input type="number" name="quantity" value="${chemical.quantity}"><br>
        <button type="submit">Save Changes</button>
    `;

    modal.style.display = 'block';

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        chemical.name = formData.get('name');
        chemical.vendor = formData.get('vendor');
        chemical.density = parseFloat(formData.get('density')) || null;
        chemical.viscosity = parseFloat(formData.get('viscosity')) || null;
        chemical.packaging = formData.get('packaging');
        chemical.packSize = formData.get('packSize');
        chemical.unit = formData.get('unit');
        chemical.quantity = parseInt(formData.get('quantity'));

        updateTable();
        modal.style.display = 'none';
    });
}

// Function to move a row up
function moveRowUp(id) {
    const index = chemicals.findIndex(c => c.id === id);
    if (index > 0) {
        [chemicals[index], chemicals[index - 1]] = [chemicals[index - 1], chemicals[index]];
        updateTable();
    }
}

// Function to move a row down
function moveRowDown(id) {
    const index = chemicals.findIndex(c => c.id === id);
    if (index < chemicals.length - 1) {
        [chemicals[index], chemicals[index + 1]] = [chemicals[index + 1], chemicals[index]];
        updateTable();
    }
}

// Function to delete a row
function deleteRow(id) {
    const index = chemicals.findIndex(c => c.id === id);
    if (index !== -1) {
        chemicals.splice(index, 1);
        updateTable();
    }
}

// Event listeners for toolbar buttons
document.getElementById('addRowBtn').addEventListener('click', addChemical);
document.getElementById('moveUpBtn').addEventListener('click', () => {
    const selectedRow = document.querySelector('.selected-row');
    if (selectedRow) {
        moveRowUp(parseInt(selectedRow.cells[0].textContent));
    }
});
document.getElementById('moveDownBtn').addEventListener('click', () => {
    const selectedRow = document.querySelector('.selected-row');
    if (selectedRow) {
        moveRowDown(parseInt(selectedRow.cells[0].textContent));
    }
});
document.getElementById('deleteRowBtn').addEventListener('click', () => {
    const selectedRow = document.querySelector('.selected-row');
    if (selectedRow) {
        deleteRow(parseInt(selectedRow.cells[0].textContent));
    }
});
document.getElementById('refreshBtn').addEventListener('click', updateTable);

// Event listener for table sorting
document.querySelectorAll('th').forEach((header, index) => {
    header.addEventListener('click', () => sortTable(index));
});

// Modal close button event listener
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('editModal').style.display = 'none';
});

// Window click event listener to close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('editModal')) {
        document.getElementById('editModal').style.display = 'none';
    }
});

// Load saved data from localStorage
if (localStorage.getItem('chemicals')) {
    chemicals = JSON.parse(localStorage.getItem('chemicals'));
}
updateTable();

// Save data to localStorage when closing the page
window.onbeforeunload = () => {
    localStorage.setItem('chemicals', JSON.stringify(chemicals));
};
