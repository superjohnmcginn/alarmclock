document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById('audio');
    const status = document.getElementById('status');
    const currentTimeElement = document.getElementById('current-time');
    const currentDateElement = document.getElementById('current-date');
    const countdownElement = document.getElementById('countdown');

    function updateTime() {
        const now = new Date();
        currentTimeElement.textContent = now.toTimeString().split(' ')[0];
        currentDateElement.textContent = now.toDateString();
        
        // Update the countdown to 8 AM on the next weekday
        let target = new Date(now);
        target.setHours(8, 0, 0, 0);
        if (now >= target) {
            // If it's already past 8 AM, set the target to 8 AM on the next weekday
            target.setDate(target.getDate() + 1);
            while (target.getDay() === 0 || target.getDay() === 6) {
                target.setDate(target.getDate() + 1);
            }
        }

        const diff = target - now;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`;

        setTimeout(updateTime, 1000);
    }

    function checkTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const day = now.getDay();

        // Check if it's a weekday (Monday to Friday) and 8:00 AM
        if (day >= 1 && day <= 5 && hours === 8 && minutes === 0) {
            status.textContent = "Playing NTS Channel 1";
            audio.volume = 0.5;
            audio.play();
            
            // Increase volume after 30 seconds to 60%
            setTimeout(() => {
                audio.volume = 0.6;
            }, 30000);
            
            // Increase volume after another 30 seconds to 70%
            setTimeout(() => {
                audio.volume = 0.7;
            }, 60000);
        } else {
            status.textContent = `Waiting for 8 AM on a weekday... (Current time: ${now.toLocaleTimeString('en-GB')})`;
            setTimeout(checkTime, 60000); // Check again in one minute
        }
    }

    updateTime();
    checkTime();
});
