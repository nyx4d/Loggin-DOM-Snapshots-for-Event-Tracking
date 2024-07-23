function logDomSnapshot(eventType, additionalData = {}, file = null) {
    let domSnapshot = getNodeInfo(document.body);
    let logData = {
        eventType: eventType,
        domSnapshot: JSON.stringify(domSnapshot),
        timestamp: new Date().toISOString(),
        ...additionalData
    };

    let formData = new FormData();
    formData.append('logData', JSON.stringify(logData));
    
    if (file) {
        formData.append('file', file);
    }

    fetch('eventLogs/log_event.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}

// Example usage
document.addEventListener('click', (event) => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    logDomSnapshot('click', { x: event.clientX, y: event.clientY }, file);
});