// Function to show popup before scrolling (only one popup at a time)
function showPopupAndScroll(sectionId, message) {
    // Remove any existing popups before showing a new one
    document.querySelectorAll(".popup").forEach(popup => popup.remove());
    
    let popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `<p>${message}</p>`;
    document.body.appendChild(popup);
}

// Function to toggle dark/light mode
function toggleDarkMode() {
    document.body.classList.toggle("light-mode");
}

//translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en', // Default language (English)
        includedLanguages: 'kn', // Target language (Kannada)
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Fetch Salah times using an API
async function fetchSalahTimes() {
    try {
        const response = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Mecca&country=Saudi%20Arabia&method=2");
        const data = await response.json();
        
        function convertTo12Hour(time) {
            let [hours, minutes] = time.split(':');
            let period = +hours >= 12 ? 'PM' : 'AM';
            hours = +hours % 12 || 12; // Convert 0 to 12 for 12 AM
            return `${hours}:${minutes} ${period}`;
        }

        const salahTimes = `
            <span>Fajr: ${convertTo12Hour(data.data.timings.Fajr)}</span> | 
            <span>Dhuhr: ${convertTo12Hour(data.data.timings.Dhuhr)}</span> | 
            <span>Asr: ${convertTo12Hour(data.data.timings.Asr)}</span> | 
            <span>Maghrib: ${convertTo12Hour(data.data.timings.Maghrib)}</span> | 
            <span>Isha: ${convertTo12Hour(data.data.timings.Isha)}</span>
        `;

        showPopupAndScroll("salah-section", salahTimes);
    } catch (error) {
        showPopupAndScroll("salah-section", "Failed to fetch Salah timings. Please try again.");
    }
}


// Countdown Timer for the Last 10 Nights of Ramadan
function updateCountdown() {
    const targetDate = new Date("2025-04-01T00:00:00"); // Adjust the date as needed
    const now = new Date();
    const timeLeft = targetDate - now;
    
    if (timeLeft > 0) {
        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById("count_down").innerHTML = `<h1>${days}d ${hours}h ${minutes}m ${seconds}s</h1>`;
    } else {
        document.getElementById("count_down").innerHTML = "<h1>Ramadan Last 10 Nights Begin!</h1>";
    }
}
setInterval(updateCountdown, 1000);

// Attach event listeners to buttons
document.getElementById("home").addEventListener("click", () => {
    document.querySelectorAll(".popup").forEach(popup => popup.remove()); // Remove popups
    document.getElementById("header").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("salah").addEventListener("click", fetchSalahTimes);
document.getElementById("duas").addEventListener("click", () => showPopupAndScroll("lailatul-qadr", 

"Make a sincere dua and ask for Allah's blessings!<br><br>(اللهم إنك عفو تحب العفو فاعف عني)<br><br><em> Allahumma innaka ‘afuwwun tuhibbul ‘afwa fa’fu ‘anni</em> (O Allah, You are Most Forgiving, and You love to forgive, so forgive me.)<br><br>(Tirmidhi: 3513, Ibn Majah: 3850)"));
document.getElementById("tasbeeh").addEventListener("click", () => showPopupAndScroll("lailatul-qadr", 

"Recite Tasbeeh and remember Allah! <br> <br> Recite this phrase 300 times throughout the prayer <br><br> (سُبْحَانَ اللهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ) <br><em>(Subḥānallāh, walḥamdulillāh, wa lā ilāha illallāh, wallāhu Akbar) <br><br>(Glory be to Allah, all praise is due to Allah, there is no deity except Allah, and Allah is the Greatest.)"));
document.getElementById("forgiveness").addEventListener("click", () => showPopupAndScroll("lailatul-qadr", 

"Seek forgiveness from Allah with a pure heart. <br><br> (Sayyidul Istighfar)<br><br> (اللَّهُمَّ أَنْتَ رَبِّي، لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.)<br><br> (O Allah, You are my Lord, there is no god but You. You created me, and I am Your servant. I uphold Your covenant as best as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your blessings upon me, and I admit my sins. So forgive me, for none can forgive sins except You.)"));

// Add CSS for popup and light mode
const style = document.createElement("style");
style.innerHTML = `
    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: black;
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 18px;
        text-align: center;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 5px 5px 10px blue;
    }
    .light-mode {
        background: white;
        color: black;
    }
    .popup span {
        display: inline-block;
        margin: 0 10px;
    }
    #countdown {
        text-align: center;
        font-size: 20px;
        margin-top: 20px;
        color: yellow;
    }
`;
document.head.appendChild(style);
