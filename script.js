document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       DOM HELPERS
    ========================================================= */

    const $ = (id) => document.getElementById(id);

    const inputName = $("input-name");
    const inputEmail = $("input-email");
    const inputPhone = $("input-phone");
    const inputLocation = $("input-location");
    const inputWebsite = $("input-website");
    const inputSummary = $("input-summary");
    const inputSkills = $("input-skills");

    const selectTheme = $("select-theme");
    const selectFont = $("select-font");
    const selectSpacing = $("select-spacing");

    const resumeCanvas = $("resume-preview-canvas");

    const previewName = $("preview-name");
    const prevEmail = $("prev-email");
    const prevPhone = $("prev-phone");
    const prevLocation = $("prev-location");
    const prevWebsite = $("prev-website");
    const previewSummary = $("preview-summary");

    const previewExpList = $("preview-experience-list");
    const previewProjectList = $("preview-project-list");
    const previewEduList = $("preview-education-list");
    const previewSkillsContainer = $("preview-skills-container");

    const saveJsonBtn = $("saveJsonBtn");
    const jsonFileInput = $("jsonFileInput");
    const newFileBtn = $("newFileBtn");
    const exportHtmlBtn = $("exportHtmlBtn");

    const runAtsBtn = $("runAtsBtn");
    const atsScoreText = $("ats-score-text");
    const atsProgress = $("ats-progress");

    const addExperienceBtn = $("addExperienceBtn");
    const addProjectBtn = $("addProjectBtn");
    const addEducationBtn = $("addEducationBtn");


    /* =========================================================
       APPLICATION STATE
    ========================================================= */

    let experiences = [
        {
            title: "Senior Software Engineer",
            company: "TechCorp Solutions",
            period: "2022 - Present",
            desc: "Led development of scalable web systems serving 2M+ active users. Improved application performance and reduced database latency by 45%."
        }
    ];

    let projects = [
        {
            name: "CloudPulse Monitoring",
            tech: "React, Node.js, Docker",
            link: "github.com/alex/cloudpulse",
            desc: "Real-time infrastructure monitoring dashboard with WebSocket alerts and responsive analytics."
        }
    ];

    let educations = [
        {
            degree: "B.S. Computer Science",
            school: "University of California, Berkeley",
            year: "2018 - 2022"
        }
    ];


    /* =========================================================
       DEFAULT VALUES
    ========================================================= */

    const defaultState = {
        name: "Alex Morgan",
        email: "alex@example.com",
        phone: "+91 98765 43210",
        location: "Pune, India",
        website: "linkedin.com/in/alex",
        summary:
            "Senior software engineer specializing in scalable web applications, distributed systems and modern responsive interfaces.",
        skills:
            "JavaScript, React, Node.js, Python, SQL, Docker, AWS, Git"
    };


    function loadDefaults() {

        inputName.value = defaultState.name;
        inputEmail.value = defaultState.email;
        inputPhone.value = defaultState.phone;
        inputLocation.value = defaultState.location;
        inputWebsite.value = defaultState.website;
        inputSummary.value = defaultState.summary;
        inputSkills.value = defaultState.skills;

    }


    /* =========================================================
       HTML ESCAPE
       Prevents user-entered text from becoming HTML.
    ========================================================= */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =========================================================
       EXPERIENCE FORM
    ========================================================= */

    function renderExperienceForm() {

        const container = $("experience-fields-container");

        container.innerHTML = "";

        experiences.forEach((experience, index) => {

            const card = document.createElement("div");

            card.className = "item-card space-y-2";

            card.innerHTML = `

                <div class="flex items-center justify-between mb-2">

                    <span class="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                        Experience ${index + 1}
                    </span>

                    <button
                        type="button"
                        class="remove-exp text-[10px] text-red-400 hover:text-red-300"
                        data-index="${index}">
                        Remove
                    </button>

                </div>

                <input
                    class="form-input exp-input"
                    data-field="title"
                    data-index="${index}"
                    value="${escapeHTML(experience.title)}"
                    placeholder="Job title">

                <div class="grid grid-cols-2 gap-2">

                    <input
                        class="form-input exp-input"
                        data-field="company"
                        data-index="${index}"
                        value="${escapeHTML(experience.company)}"
                        placeholder="Company">

                    <input
                        class="form-input exp-input"
                        data-field="period"
                        data-index="${index}"
                        value="${escapeHTML(experience.period)}"
                        placeholder="2022 - Present">

                </div>

                <textarea
                    class="form-input exp-input resize-none"
                    data-field="desc"
                    data-index="${index}"
                    rows="3"
                    placeholder="Describe your achievements...">${escapeHTML(experience.desc)}</textarea>

            `;

            container.appendChild(card);

        });


        container.querySelectorAll(".exp-input").forEach(input => {

            input.addEventListener("input", event => {

                const index = Number(event.target.dataset.index);
                const field = event.target.dataset.field;

                experiences[index][field] = event.target.value;

                updatePreview();
                saveLocal();

            });

        });


        container.querySelectorAll(".remove-exp").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);

                experiences.splice(index, 1);

                renderExperienceForm();
                updatePreview();
                saveLocal();

            });

        });

    }


    /* =========================================================
       PROJECT FORM
    ========================================================= */

    function renderProjectForm() {

        const container = $("project-fields-container");

        container.innerHTML = "";

        projects.forEach((project, index) => {

            const card = document.createElement("div");

            card.className = "item-card space-y-2";

            card.innerHTML = `

                <div class="flex items-center justify-between mb-2">

                    <span class="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                        Project ${index + 1}
                    </span>

                    <button
                        type="button"
                        class="remove-project text-[10px] text-red-400 hover:text-red-300"
                        data-index="${index}">
                        Remove
                    </button>

                </div>

                <input
                    class="form-input project-input"
                    data-field="name"
                    data-index="${index}"
                    value="${escapeHTML(project.name)}"
                    placeholder="Project name">

                <div class="grid grid-cols-2 gap-2">

                    <input
                        class="form-input project-input"
                        data-field="tech"
                        data-index="${index}"
                        value="${escapeHTML(project.tech)}"
                        placeholder="Technology">

                    <input
                        class="form-input project-input"
                        data-field="link"
                        data-index="${index}"
                        value="${escapeHTML(project.link)}"
                        placeholder="GitHub / URL">

                </div>

                <textarea
                    class="form-input project-input resize-none"
                    data-field="desc"
                    data-index="${index}"
                    rows="3"
                    placeholder="Describe the project...">${escapeHTML(project.desc)}</textarea>

            `;

            container.appendChild(card);

        });


        container.querySelectorAll(".project-input").forEach(input => {

            input.addEventListener("input", event => {

                const index = Number(event.target.dataset.index);
                const field = event.target.dataset.field;

                projects[index][field] = event.target.value;

                updatePreview();
                saveLocal();

            });

        });


        container.querySelectorAll(".remove-project").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);

                projects.splice(index, 1);

                renderProjectForm();
                updatePreview();
                saveLocal();

            });

        });

    }


    /* =========================================================
       EDUCATION FORM
    ========================================================= */

    function renderEducationForm() {

        const container = $("education-fields-container");

        container.innerHTML = "";

        educations.forEach((education, index) => {

            const card = document.createElement("div");

            card.className = "item-card space-y-2";

            card.innerHTML = `

                <div class="flex items-center justify-between mb-2">

                    <span class="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                        Education ${index + 1}
                    </span>

                    <button
                        type="button"
                        class="remove-education text-[10px] text-red-400 hover:text-red-300"
                        data-index="${index}">
                        Remove
                    </button>

                </div>

                <input
                    class="form-input education-input"
                    data-field="degree"
                    data-index="${index}"
                    value="${escapeHTML(education.degree)}"
                    placeholder="Degree">

                <div class="grid grid-cols-2 gap-2">

                    <input
                        class="form-input education-input"
                        data-field="school"
                        data-index="${index}"
                        value="${escapeHTML(education.school)}"
                        placeholder="Institution">

                    <input
                        class="form-input education-input"
                        data-field="year"
                        data-index="${index}"
                        value="${escapeHTML(education.year)}"
                        placeholder="Year">

                </div>

            `;

            container.appendChild(card);

        });


        container.querySelectorAll(".education-input").forEach(input => {

            input.addEventListener("input", event => {

                const index = Number(event.target.dataset.index);
                const field = event.target.dataset.field;

                educations[index][field] = event.target.value;

                updatePreview();
                saveLocal();

            });

        });


        container.querySelectorAll(".remove-education").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);

                educations.splice(index, 1);

                renderEducationForm();
                updatePreview();
                saveLocal();

            });

        });

    }


    /* =========================================================
       RESUME PREVIEW
    ========================================================= */

    function updatePreview() {

        previewName.textContent =
            inputName.value || "Your Name";

        prevEmail.textContent =
            inputEmail.value || "email@example.com";

        prevPhone.textContent =
            inputPhone.value || "Phone";

        prevLocation.textContent =
            inputLocation.value || "Location";

        prevWebsite.textContent =
            inputWebsite.value || "website.com";

        previewSummary.textContent =
            inputSummary.value || "Professional summary";


        /* EXPERIENCE */

        previewExpList.innerHTML = "";

        experiences.forEach(experience => {

            const item = document.createElement("div");

            item.innerHTML = `

                <div class="flex justify-between gap-5">

                    <div>

                        <div class="resume-item-title">
                            ${escapeHTML(experience.title)}
                        </div>

                        <div class="resume-item-meta">
                            ${escapeHTML(experience.company)}
                        </div>

                    </div>

                    <div class="resume-item-meta whitespace-nowrap">
                        ${escapeHTML(experience.period)}
                    </div>

                </div>

                <p class="resume-item-description">
                    ${escapeHTML(experience.desc)}
                </p>

            `;

            previewExpList.appendChild(item);

        });


        /* PROJECTS */

        previewProjectList.innerHTML = "";

        projects.forEach(project => {

            const item = document.createElement("div");

            item.innerHTML = `

                <div class="flex justify-between gap-5">

                    <div>

                        <div class="resume-item-title">
                            ${escapeHTML(project.name)}
                        </div>

                        <div class="resume-item-meta">
                            ${escapeHTML(project.tech)}
                        </div>

                    </div>

                    <div class="resume-item-meta text-blue-600">
                        ${escapeHTML(project.link)}
                    </div>

                </div>

                <p class="resume-item-description">
                    ${escapeHTML(project.desc)}
                </p>

            `;

            previewProjectList.appendChild(item);

        });


        /* EDUCATION */

        previewEduList.innerHTML = "";

        educations.forEach(education => {

            const item = document.createElement("div");

            item.innerHTML = `

                <div class="flex justify-between gap-5">

                    <div>

                        <div class="resume-item-title">
                            ${escapeHTML(education.degree)}
                        </div>

                        <div class="resume-item-meta">
                            ${escapeHTML(education.school)}
                        </div>

                    </div>

                    <div class="resume-item-meta">
                        ${escapeHTML(education.year)}
                    </div>

                </div>

            `;

            previewEduList.appendChild(item);

        });


        /* SKILLS */

        previewSkillsContainer.innerHTML = "";

        const skills = inputSkills.value
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean);

        skills.forEach(skill => {

            const badge = document.createElement("span");

            badge.className = "resume-skill";

            badge.textContent = skill;

            previewSkillsContainer.appendChild(badge);

        });

    }


    /* =========================================================
       GENERAL INPUT EVENTS
    ========================================================= */

    [
        inputName,
        inputEmail,
        inputPhone,
        inputLocation,
        inputWebsite,
        inputSummary,
        inputSkills
    ].forEach(input => {

        input.addEventListener("input", () => {

            updatePreview();
            saveLocal();

        });

    });


    /* =========================================================
       ADD BUTTONS
    ========================================================= */

    addExperienceBtn.addEventListener("click", () => {

        experiences.push({
            title: "New Position",
            company: "Company Name",
            period: "2025 - Present",
            desc: "Describe your responsibilities and measurable achievements."
        });

        renderExperienceForm();
        updatePreview();
        saveLocal();

    });


    addProjectBtn.addEventListener("click", () => {

        projects.push({
            name: "New Project",
            tech: "Technology Stack",
            link: "github.com/username/project",
            desc: "Describe what you built, the technology used and the result."
        });

        renderProjectForm();
        updatePreview();
        saveLocal();

    });


    addEducationBtn.addEventListener("click", () => {

        educations.push({
            degree: "Degree Name",
            school: "University Name",
            year: "2024"
        });

        renderEducationForm();
        updatePreview();
        saveLocal();

    });


    /* =========================================================
       THEMES
    ========================================================= */

    const themeColors = {

        navy: "#1e3a8a",

        slate: "#334155",

        sapphire: "#2563eb",

        forest: "#047857"

    };


    function applyTheme() {

        const color =
            themeColors[selectTheme.value] || themeColors.navy;

        resumeCanvas.style.borderTop =
            `5px solid ${color}`;

        document
            .querySelectorAll(".resume-heading-live")
            .forEach(heading => {

                heading.style.color = color;

            });

    }


    selectTheme.addEventListener("change", () => {

        applyTheme();

        saveLocal();

    });


    /* =========================================================
       FONT
    ========================================================= */

    selectFont.addEventListener("change", () => {

        resumeCanvas.style.fontFamily = "";

        if (selectFont.value === "sans") {

            resumeCanvas.style.fontFamily =
                "Inter, sans-serif";

        }

        if (selectFont.value === "serif") {

            resumeCanvas.style.fontFamily =
                "Playfair Display, serif";

        }

        if (selectFont.value === "mono") {

            resumeCanvas.style.fontFamily =
                "JetBrains Mono, monospace";

        }

        saveLocal();

    });


    /* =========================================================
       SPACING
    ========================================================= */

    selectSpacing.addEventListener("change", () => {

        if (selectSpacing.value === "compact") {

            resumeCanvas.classList.remove("p-12");

            resumeCanvas.classList.add("p-8");

        } else {

            resumeCanvas.classList.remove("p-8");

            resumeCanvas.classList.add("p-12");

        }

        saveLocal();

    });


    /* =========================================================
       ATS SIMULATION
    ========================================================= */

    runAtsBtn.addEventListener("click", () => {

        runAtsBtn.textContent = "Scanning...";

        setTimeout(() => {

            let score = 70;

            if (inputName.value.trim()) score += 4;
            if (inputEmail.value.trim()) score += 4;
            if (inputSummary.value.length > 80) score += 5;

            if (experiences.length > 0) score += 5;
            if (projects.length > 0) score += 4;
            if (educations.length > 0) score += 3;

            const skillCount =
                inputSkills.value
                    .split(",")
                    .filter(skill => skill.trim()).length;

            score += Math.min(skillCount, 5);

            score = Math.min(score, 100);

            atsScoreText.textContent =
                `${score} / 100`;

            atsProgress.style.width =
                `${score}%`;

            runAtsBtn.textContent = "Analyze";

        }, 700);

    });


    /* =========================================================
       STATE COLLECTION
    ========================================================= */

    function getState() {

        return {

            name: inputName.value,

            email: inputEmail.value,

            phone: inputPhone.value,

            location: inputLocation.value,

            website: inputWebsite.value,

            summary: inputSummary.value,

            skills: inputSkills.value,

            experiences: experiences,

            projects: projects,

            educations: educations,

            theme: selectTheme.value,

            font: selectFont.value,

            spacing: selectSpacing.value

        };

    }


    /* =========================================================
       LOCAL STORAGE
    ========================================================= */

    function saveLocal() {

        try {

            localStorage.setItem(
                "resumeforge-data",
                JSON.stringify(getState())
            );

        } catch (error) {

            console.warn(
                "Local save failed:",
                error
            );

        }

    }


    function loadLocal() {

        try {

            const raw =
                localStorage.getItem("resumeforge-data");

            if (!raw) return false;

            const data =
                JSON.parse(raw);

            applyState(data);

            return true;

        } catch (error) {

            console.warn(
                "Local resume data could not be loaded.",
                error
            );

            return false;

        }

    }


    /* =========================================================
       APPLY STATE
    ========================================================= */

    function applyState(data) {

        inputName.value = data.name || "";
        inputEmail.value = data.email || "";
        inputPhone.value = data.phone || "";
        inputLocation.value = data.location || "";
        inputWebsite.value = data.website || "";
        inputSummary.value = data.summary || "";
        inputSkills.value = data.skills || "";

        experiences =
            Array.isArray(data.experiences)
                ? data.experiences
                : [];

        projects =
            Array.isArray(data.projects)
                ? data.projects
                : [];

        educations =
            Array.isArray(data.educations)
                ? data.educations
                : [];


        if (data.theme) {

            selectTheme.value =
                data.theme;

        }

        if (data.font) {

            selectFont.value =
                data.font;

        }

        if (data.spacing) {

            selectSpacing.value =
                data.spacing;

        }


        renderExperienceForm();

        renderProjectForm();

        renderEducationForm();

        updatePreview();

        applyTheme();


        if (selectFont.value === "sans") {

            resumeCanvas.style.fontFamily =
                "Inter, sans-serif";

        }

        if (selectFont.value === "serif") {

            resumeCanvas.style.fontFamily =
                "Playfair Display, serif";

        }

        if (selectFont.value === "mono") {

            resumeCanvas.style.fontFamily =
                "JetBrains Mono, monospace";

        }


        if (selectSpacing.value === "compact") {

            resumeCanvas.classList.remove("p-12");

            resumeCanvas.classList.add("p-8");

        }

    }


    /* =========================================================
       JSON EXPORT
    ========================================================= */

    saveJsonBtn.addEventListener("click", () => {

        const data = getState();

        const blob = new Blob(
            [JSON.stringify(data, null, 2)],
            {
                type: "application/json"
            }
        );

        downloadBlob(
            blob,
            "resume-forge.json"
        );

    });


    /* =========================================================
       JSON IMPORT
    ========================================================= */

    jsonFileInput.addEventListener("change", event => {

        const file =
            event.target.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onload = event => {

            try {

                const data =
                    JSON.parse(event.target.result);

                applyState(data);

                saveLocal();

            } catch (error) {

                alert(
                    "This JSON file is not valid."
                );

            }

        };

        reader.readAsText(file);

    });


    /* =========================================================
       HTML EXPORT
    ========================================================= */

    exportHtmlBtn.addEventListener("click", () => {

        const resumeHTML =
            resumeCanvas.outerHTML;

        const exportedHTML = `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1.0">

<title>${escapeHTML(inputName.value || "Resume")}</title>

<style>

body {
    margin: 0;
    padding: 40px;
    background: #f1f5f9;
    font-family: Inter, Arial, sans-serif;
}

.resume-paper-live {
    width: 794px;
    min-height: 1123px;
    margin: auto;
    background: white;
    padding: 48px;
    color: #0f172a;
}

@media print {

    body {
        padding: 0;
        background: white;
    }

    .resume-paper-live {
        box-shadow: none;
    }

}

</style>

</head>

<body>

${resumeHTML}

</body>

</html>

`;

        const blob =
            new Blob(
                [exportedHTML],
                {
                    type: "text/html"
                }
            );

        downloadBlob(
            blob,
            `${sanitizeFileName(inputName.value || "resume")}.html`
        );

    });


    /* =========================================================
       NEW RESUME
    ========================================================= */

    newFileBtn.addEventListener("click", () => {

        const confirmed =
            confirm(
                "Create a new resume? Current unsaved data will be cleared."
            );

        if (!confirmed) return;

        inputName.value = "";
        inputEmail.value = "";
        inputPhone.value = "";
        inputLocation.value = "";
        inputWebsite.value = "";
        inputSummary.value = "";
        inputSkills.value = "";

        experiences = [];
        projects = [];
        educations = [];

        selectTheme.value = "navy";
        selectFont.value = "sans";
        selectSpacing.value = "comfortable";

        localStorage.removeItem(
            "resumeforge-data"
        );

        renderExperienceForm();
        renderProjectForm();
        renderEducationForm();

        updatePreview();
        applyTheme();

        resumeCanvas.style.fontFamily =
            "Inter, sans-serif";

        resumeCanvas.classList.remove("p-8");
        resumeCanvas.classList.add("p-12");

        atsScoreText.textContent =
            "70 / 100";

        atsProgress.style.width =
            "70%";

    });


    /* =========================================================
       DOWNLOAD HELPER
    ========================================================= */

    function downloadBlob(blob, filename) {

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download = filename;

        document.body.appendChild(link);

        link.click();

        link.remove();

        setTimeout(() => {

            URL.revokeObjectURL(url);

        }, 1000);

    }


    function sanitizeFileName(name) {

        return name
            .trim()
            .replace(/[^a-z0-9]+/gi, "_")
            .replace(/^_+|_+$/g, "")
            || "resume";

    }


    /* =========================================================
       INITIALIZATION
    ========================================================= */

    const restored =
        loadLocal();

    if (!restored) {

        loadDefaults();

    }

    renderExperienceForm();

    renderProjectForm();

    renderEducationForm();

    updatePreview();

    applyTheme();

});
