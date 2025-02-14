// const menu = document.querySelector('#mobile-menu')
// const menuLinks = document.querySelector('.navbar__menu')

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const mentorMatches = document.getElementById("mentorMatches");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const name = document.getElementById("name").value;
        const role = document.getElementById("role").value;
        const career = document.getElementById("career").value;
        const skills = document.getElementById("skills").value.split(",").map(skill => skill.trim().toLowerCase());
        const goals = document.getElementById("goals").value;
        
        const user = { name, role, career, skills, goals };
        
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        
        alert("Registration successful!");
        form.reset();
        
        if (role === "mentee") {
            displayMentorMatches(user);
        }
    });

    function displayMentorMatches(mentee) {
        mentorMatches.innerHTML = "";
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const mentors = users.filter(user => user.role === "mentor");

        const matchedMentors = mentors.map(mentor => {
            const sharedSkills = mentor.skills.filter(skill => mentee.skills.includes(skill));
            return { mentor, matchScore: sharedSkills.length };
        }).sort((a, b) => b.matchScore - a.matchScore);

        matchedMentors.forEach(({ mentor, matchScore }) => {
            if (matchScore > 0) {
                const mentorCard = document.createElement("div");
                mentorCard.classList.add("mentor-card");
                mentorCard.innerHTML = `
                    <h3>${mentor.name}</h3>
                    <p><strong>Career:</strong> ${mentor.career}</p>
                    <p><strong>Skills:</strong> ${mentor.skills.join(", ")}</p>
                    <p><strong>Match Score:</strong> ${matchScore}</p>
                    <button class="connect-btn">Connect</button>
                `;
                mentorMatches.appendChild(mentorCard);
            }
        });
    }
});
