// Fetch people data
async function getPeople() {
  try {
    const response = await fetch("https://randomuser.me/api/?results=25&nat=us");
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Could not get people: ${error}`);
  }
}

// Build the table dynamically
async function buildTable() {
  const people = await getPeople();

  // Transform data into a structured format
  const rows = people.map(person => ({
    name: `${person.name.title} ${person.name.first} ${person.name.last}`,
    address: `${person.location.street.number} ${person.location.street.name}`,
    city: person.location.city,
    state: person.location.state,
    zip: person.location.postcode,
    lat: person.location.coordinates.latitude,
    long: person.location.coordinates.longitude,
    phone: person.phone
  }));

  // Sort alphabetically by last name
  rows.sort((a, b) => a.name.split(" ").pop().localeCompare(b.name.split(" ").pop()));

  // Build table rows
  const tableBody = $("#people tbody");
  tableBody.empty();

  rows.forEach(p => {
    const row = $(`
      <tr title="Phone: ${p.phone}">
        <td>${p.name}</td>
        <td>${p.address}</td>
        <td>${p.city}</td>
        <td>${p.state}</td>
        <td>${p.zip}</td>
        <td>${p.lat}</td>
        <td>${p.long}</td>
      </tr>
    `);
    tableBody.append(row);
  });
}

$(document).ready(() => {
  buildTable();
});
