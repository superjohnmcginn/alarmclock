document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById('audio');
    const status = document.getElementById('status');

    function checkTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const day = now.getDay();

        // Check if it's a weekday (Monday to Friday) and 8:00 AM
        if (day >= 1 && day <= 5 && hours === 8 && minutes === 0) {
            status.textContent = "Playing NTS Channel 1";
            audio.play();
        } else {
            status.textContent = `Waiting for 8 AM on a weekday... (Current time: ${now.toLocaleTimeString()})`;
            setTimeout(checkTime, 60000); // Check again in one minute
        }
    }

    checkTime();
});
