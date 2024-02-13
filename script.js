let employees = [];

function addEmp() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const designation = document.getElementById("designation").value;

  // Validate input fields
  if (!id || !name || !address || !designation) {
    alert("Please fill all the fields.");
    return;
  }

  // Check if employee ID already exists
  if (employees.some((emp) => emp.id === id)) {
    alert("Employee ID already exists.");
    return;
  }

  // Add employee to the list
  employees.push({ id, name, address, designation });

  // Refresh employee table
  displayEmp();

  // Clear input fields
  clearFields();
}

function displayEmp() {
  const employeeList = document.getElementById("employeeList");
  employeeList.innerHTML = "";
  employees.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.address}</td>
            <td>${employee.designation}</td>
            <td>
                <button onclick="openEditModal('${employee.id}')">Edit</button>
                <button onclick="deleteEmployeeRow('${employee.id}')">Delete</button>
            </td>
        `;
    employeeList.appendChild(row);
  });
}

function openEditModal(id) {
  const employee = employees.find((emp) => emp.id === id);
  if (employee) {
    document.getElementById("editId").value = employee.id;
    document.getElementById("editName").value = employee.name;
    document.getElementById("editAddress").value = employee.address;
    document.getElementById("editDesignation").value = employee.designation;
    document.getElementById("editModal").style.display = "block";
  }
}

function updateEmp() {
  const editId = document.getElementById("editId").value;
  const editName = document.getElementById("editName").value;
  const editAddress = document.getElementById("editAddress").value;
  const editDesignation = document.getElementById("editDesignation").value;

  // Find the employee by ID and update the details
  const index = employees.findIndex((emp) => emp.id === editId);
  if (index !== -1) {
    employees[index].name = editName;
    employees[index].address = editAddress;
    employees[index].designation = editDesignation;
    displayEmp();
    clearFields();
    closeEditModal();
  }
}

function deleteEmployeeRow(id) {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
    displayEmp();
  }
}

function clearFields() {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("address").value = "";
  document.getElementById("designation").value = "";
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

// Close the modal when the user clicks anywhere outside of it
window.onclick = function (event) {
  const modal = document.getElementById("editModal");
  if (event.target == modal) {
    closeEditModal();
  }
};

displayEmp();
