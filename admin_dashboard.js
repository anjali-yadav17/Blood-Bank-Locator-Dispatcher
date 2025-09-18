// Check Authentication
const token = localStorage.getItem('adminToken');
if (!token) {
    window.location.href = 'admin_login.html';
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    window.location.href = 'admin_login.html';
});

// Fetch and display blood request
async function fetchRequests() {
    try {
        const response = await fetch('/api/requests', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const requests = await response.json();
        const tbody = document.getElementById('requestsTableBody');
        tbody.innerHTML = requests.map(request => `
            <tr>
                <td>${request.patientName}</td>
                <td>${request.bloodGroup}</td>
                <td>${request.units}</td>
                <td>${request.urgency}</td>
                <td>${request.status}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="updateRequestStatus('${request.id}', 'approved')">Approve</button>
                    <button class="btn btn-sm btn-danger" onclick="updateRequestStatus('${request.id}', 'rejected')">Reject</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching requests:', error);
    }
}

// Fetch and display donors
async function fetchDonors() {
    try {
        const response = await fetch('/api/donors', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const donors = await response.json();
        const tbody = document.getElementById('donorsTableBody');
        tbody.innerHTML = donors.map(donor => `
            <tr>
                <td>${donor.name}</td>
                <td>${donor.bloodGroup}</td>
                <td>${donor.contact}</td>
                <td>${donor.lastDonation || 'N/A'}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editDonor('${donor.id}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteDonor('${donor.id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching donors:', error);
    }
}

// Update request status
async function updateRequestStatus(requestId, status) {
    try {
        const response = await fetch(`/api/requests/${requestId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });
        if (response.ok) {
            fetchRequests();
        }
    } catch (error) {
        console.error('Error updating request:', error);
    }
}

// Add new donor
document.getElementById('addDonorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const donorData = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/donors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(donorData)
        });
        if (response.ok) {
            $('#addDonorModal').modal('hide');
            fetchDonors();
            e.target.reset();
        }
    } catch (error) {
        console.error('Error adding donor:', error);
    }
});

// Initial load
fetchRequests();
fetchDonors();