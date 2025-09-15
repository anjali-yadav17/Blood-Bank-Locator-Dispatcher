// Handle donor registration
document.getElementById('donorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const donorData = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/donors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donorData)
        });

        if (response.ok) {
            alert('Thank you for registering as a donor!');
            e.target.reset();
        } else {
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error registering donor:', error);
        alert('Registration failed. Please try again.');
    }
});

// Handle blood requests
document.getElementById('requestForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const requestData = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            alert('Your blood request has been submitted successfully!');
            e.target.reset();
        } else {
            alert('Request submission failed, Please try again.');
        }
    } catch (error) {
        console.error('Error submitting request:', error);
        alert('Request submission failed, Please try again.');
    }
});