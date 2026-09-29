console.log("MediQueue app.js loaded");


// ======================================
// SERVICES
// ======================================

const services = [
    {
        name: "General Consultation",
        icon: "🩺",
        detail: "See a doctor for everyday care",
        prefix: "A"
    },
    {
        name: "Dental Care",
        icon: "🦷",
        detail: "Oral health and dental services",
        prefix: "D"
    },
    {
        name: "Pediatrics",
        icon: "🧸",
        detail: "Care for children and infants",
        prefix: "P"
    },
    {
        name: "Laboratory",
        icon: "🧪",
        detail: "Tests, samples and results",
        prefix: "L"
    },
    {
        name: "Pharmacy",
        icon: "💊",
        detail: "Prescriptions and medications",
        prefix: "R"
    },
    {
        name: "Specialist Clinic",
        icon: "✚",
        detail: "Specialist medical support",
        prefix: "S"
    }
];


// ======================================
// DEFAULT QUEUES
// ======================================

const defaults = {

    "General Consultation": {
        serving: 17,
        last: 24,
        patients: [
            { name: "Patient 18", number: 18 },
            { name: "Patient 19", number: 19 },
            { name: "Patient 20", number: 20 },
            { name: "Patient 21", number: 21 },
            { name: "Patient 22", number: 22 },
            { name: "Patient 23", number: 23 },
            { name: "Patient 24", number: 24 }
        ]
    },

    "Dental Care": {
        serving: 0,
        last: 10,
        patients: [
            { name: "Patient 1", number: 1 },
            { name: "Patient 2", number: 2 },
            { name: "Patient 3", number: 3 },
            { name: "Patient 4", number: 4 },
            { name: "Patient 5", number: 5 },
            { name: "Patient 6", number: 6 },
            { name: "Patient 7", number: 7 },
            { name: "Patient 8", number: 8 },
            { name: "Patient 9", number: 9 },
            { name: "Patient 10", number: 10 }
        ]
    },

    "Pediatrics": {
        serving: 0,
        last: 0,
        patients: []
    },

    "Laboratory": {
        serving: 0,
        last: 0,
        patients: []
    },

    "Pharmacy": {
        serving: 0,
        last: 0,
        patients: []
    },

    "Specialist Clinic": {
        serving: 0,
        last: 0,
        patients: []
    }
};


// ======================================
// LOAD QUEUE STATE
// ======================================

let state;

try {

    const savedState =
        localStorage.getItem("medique-queue-state");

    if (savedState) {

        state = JSON.parse(savedState);

    } else {

        state = structuredClone(defaults);

    }

} catch (error) {

    console.error(
        "Queue state could not be loaded:",
        error
    );

    state = structuredClone(defaults);

    localStorage.removeItem(
        "medique-queue-state"
    );
}


// ======================================
// CURRENT PATIENT
// ======================================

let currentPatient = null;

try {

    const savedPatient =
        localStorage.getItem(
            "medique-current-patient"
        );

    currentPatient =
        savedPatient
            ? JSON.parse(savedPatient)
            : null;

} catch (error) {

    console.error(
        "Current patient could not be loaded:",
        error
    );

    localStorage.removeItem(
        "medique-current-patient"
    );

    currentPatient = null;
}


// ======================================
// HELPER
// ======================================

function byId(id) {

    return document.getElementById(id);

}


// ======================================
// ELEMENTS
// ======================================

const serviceGrid =
    byId("serviceGrid");

const serviceSelect =
    byId("serviceSelect");

const queueForm =
    byId("queueForm");

const joinQueueButton =
    byId("joinQueueButton");


// ======================================
// GET QUEUE
// ======================================

function getQueue(service) {

    if (!state[service]) {

        state[service] = {
            serving: 0,
            last: 0,
            patients: []
        };

    }

    const queue =
        state[service];


    if (!Array.isArray(queue.patients)) {

        queue.patients = [];

    }


    queue.patients =
        queue.patients.map(
            function (patient, index) {

                if (
                    typeof patient === "string"
                ) {

                    return {
                        name: patient,
                        number: index + 1
                    };

                }

                return patient;

            }
        );


    if (
        typeof queue.serving !== "number"
    ) {

        queue.serving = 0;

    }


    if (
        typeof queue.last !== "number"
    ) {

        queue.last = 0;

    }


    return queue;

}


// ======================================
// SAVE QUEUES
// ======================================

function save() {

    try {

        localStorage.setItem(
            "medique-queue-state",
            JSON.stringify(state)
        );

        console.log(
            "Queue state saved successfully."
        );

    } catch (error) {

        console.error(
            "Queue state could not be saved:",
            error
        );

    }

}


// ======================================
// SAVE CURRENT PATIENT
// ======================================

function saveCurrentPatient() {

    try {

        localStorage.setItem(
            "medique-current-patient",
            JSON.stringify(currentPatient)
        );

    } catch (error) {

        console.error(
            "Current patient could not be saved:",
            error
        );

    }

}


// ======================================
// QUEUE NUMBER
// ======================================

function queueNumber(service, number) {

    const serviceInfo =
        services.find(
            function (item) {

                return item.name === service;

            }
        );


    if (!serviceInfo) {

        return String(number);

    }


    return serviceInfo.prefix + number;

}


// ======================================
// OPEN MODAL
// ======================================

function open(id) {

    const modal = byId(id);

    if (!modal) {

        console.warn(
            "Modal not found:",
            id
        );

        return;

    }

    modal.classList.remove("hidden");

}


// ======================================
// CLOSE MODAL
// ======================================

function close(id) {

    const modal = byId(id);

    if (!modal) {

        return;

    }

    modal.classList.add("hidden");

}


// ======================================
// POPULATE SERVICES
// ======================================

function populateServices() {

    // ----------------------------------
    // SERVICE SELECT
    // ----------------------------------

    if (serviceSelect) {

        serviceSelect.innerHTML = "";

        services.forEach(
            function (service) {

                const option =
                    document.createElement("option");

                option.value =
                    service.name;

                option.textContent =
                    service.name;

                serviceSelect.appendChild(
                    option
                );

            }
        );

    }


    // ----------------------------------
    // SERVICE CARDS
    // ----------------------------------

    if (serviceGrid) {

        serviceGrid.innerHTML = "";

        services.forEach(
            function (service) {

                const card =
                    document.createElement("div");

                card.className =
                    "service-card";

                card.innerHTML = `

                    <div class="service-icon">
                        ${service.icon}
                    </div>

                    <h3>
                        ${service.name}
                    </h3>

                    <p>
                        ${service.detail}
                    </p>

                    <button
                        class="service-button"
                        type="button"
                    >
                        Join queue →
                    </button>

                `;


                const button =
                    card.querySelector(
                        ".service-button"
                    );


                button.addEventListener(
                    "click",
                    function () {

                        if (serviceSelect) {

                            serviceSelect.value =
                                service.name;

                        }

                        open("patientModal");

                    }
                );


                serviceGrid.appendChild(card);

            }
        );

    }

}


// ======================================
// UPDATE HERO
// ======================================

function updateHero() {

    const heroNumber =
        byId("heroNumber");

    const heroServing =
        byId("heroServing");

    const heroAhead =
        byId("heroAhead");

    const heroProgress =
        byId("heroProgress");


    if (!serviceSelect) {

        return;

    }


    const service =
        serviceSelect.value;


    if (!service) {

        return;

    }


    const queue =
        getQueue(service);


    // ----------------------------------
    // NEXT PATIENT
    // ----------------------------------

    const nextPatient =
        queue.patients[0];


    if (heroNumber) {

        if (nextPatient) {

            heroNumber.textContent =
                queueNumber(
                    service,
                    nextPatient.number
                );

        } else if (queue.serving) {

            heroNumber.textContent =
                queueNumber(
                    service,
                    queue.serving
                );

        } else {

            heroNumber.textContent =
                "--";

        }

    }


    // ----------------------------------
    // SERVING
    // ----------------------------------

    if (heroServing) {

        heroServing.textContent =
            queue.serving
                ? queueNumber(
                    service,
                    queue.serving
                )
                : "--";

    }


    // ----------------------------------
    // PEOPLE AHEAD
    // ----------------------------------

    if (heroAhead) {

        heroAhead.textContent =
            queue.patients.length;

    }


    // ----------------------------------
    // PROGRESS
    // ----------------------------------

    if (heroProgress) {

        const total =
            queue.last || 1;

        const progress =
            Math.min(
                100,
                Math.round(
                    (
                        queue.serving /
                        total
                    ) * 100
                )
            );

        heroProgress.style.width =
            progress + "%";

    }

}


// ======================================
// SHOW STATUS
// ======================================

function showStatus() {

    const statusDepartment =
        byId("statusDepartment");

    const statusNumber =
        byId("statusNumber");

    const statusServing =
        byId("statusServing");

    const statusAhead =
        byId("statusAhead");

    const statusState =
        byId("statusState");

    const statusMessage =
        byId("statusMessage");


    if (!currentPatient) {

        if (statusMessage) {

            statusMessage.textContent =
                "You have not joined a queue yet.";

        }

        open("statusModal");

        return;

    }


    const service =
        currentPatient.service;


    const queue =
        getQueue(service);


    const number =
        currentPatient.number;


    if (statusDepartment) {

        statusDepartment.textContent =
            service;

    }


    if (statusNumber) {

        statusNumber.textContent =
            queueNumber(
                service,
                number
            );

    }


    if (statusServing) {

        statusServing.textContent =
            queue.serving
                ? queueNumber(
                    service,
                    queue.serving
                )
                : "--";

    }


    // ----------------------------------
    // FIND PATIENT
    // ----------------------------------

    const patientIndex =
        queue.patients.findIndex(
            function (patient) {

                return (
                    patient.number === number
                );

            }
        );


    let ahead = 0;


    if (patientIndex !== -1) {

        ahead = patientIndex;

    }


    if (statusAhead) {

        statusAhead.textContent =
            ahead;

    }


    // ----------------------------------
    // STATUS
    // ----------------------------------

    if (statusState) {

        if (
            queue.serving === number
        ) {

            statusState.textContent =
                "Now serving";

        } else if (
            number < queue.serving
        ) {

            statusState.textContent =
                "Completed";

        } else {

            statusState.textContent =
                "Waiting";

        }

    }


    // ----------------------------------
    // MESSAGE
    // ----------------------------------

    if (statusMessage) {

        if (
            queue.serving === number
        ) {

            statusMessage.textContent =
                "It is your turn. Please proceed to the department.";

        } else if (
            number < queue.serving
        ) {

            statusMessage.textContent =
                "Your queue number has already been served.";

        } else {

            statusMessage.textContent =
                "Please wait for your queue number to be called.";

        }

    }


    open("statusModal");

}


// ======================================
// JOIN QUEUE FUNCTION
// ======================================

function joinQueue() {

    console.log(
        "Join Queue clicked."
    );


    // ----------------------------------
    // CHECK SERVICE
    // ----------------------------------

    if (!serviceSelect) {

        console.error(
            "serviceSelect was not found."
        );

        return;

    }


    const service =
        serviceSelect.value;


    if (!service) {

        console.error(
            "No service selected."
        );

        return;

    }


    // ----------------------------------
    // GET NAME
    // ----------------------------------

    const patientName =
        byId("patientName");


    if (!patientName) {

        console.error(
            "patientName was not found."
        );

        return;

    }


    const name =
        patientName.value.trim();


    if (!name) {

        patientName.focus();

        return;

    }


    // ----------------------------------
    // GET QUEUE
    // ----------------------------------

    const queue =
        getQueue(service);


    // ----------------------------------
    // CREATE NEXT NUMBER
    // ----------------------------------

    queue.last += 1;


    const newNumber =
        queue.last;


    // ----------------------------------
    // CREATE PATIENT
    // ----------------------------------

    const patient = {

        name: name,

        number: newNumber

    };


    // ----------------------------------
    // ADD TO SHARED QUEUE
    // ----------------------------------

    queue.patients.push(
        patient
    );


    // ----------------------------------
    // SAVE CURRENT PATIENT
    // ----------------------------------

    currentPatient = {

        service: service,

        name: name,

        number: newNumber

    };


    // ----------------------------------
    // SAVE TO LOCAL STORAGE
    // ----------------------------------

    save();

    saveCurrentPatient();


    console.log(
        "Patient added:",
        patient
    );

    console.log(
        "Queue now contains:",
        queue.patients
    );


    // ----------------------------------
    // UPDATE PAGE
    // ----------------------------------

    updateHero();


    // ----------------------------------
    // CLOSE JOIN MODAL
    // ----------------------------------

    close("patientModal");


    // ----------------------------------
    // RESET FORM
    // ----------------------------------

    if (queueForm) {

        queueForm.reset();

    }


    // Restore selected service after reset

    if (serviceSelect) {

        serviceSelect.value =
            service;

    }


    // ----------------------------------
    // SHOW STATUS
    // ----------------------------------

    showStatus();

}


// ======================================
// JOIN QUEUE BUTTON
// ======================================

if (joinQueueButton) {

    joinQueueButton.addEventListener(
        "click",
        joinQueue
    );

} else {

    console.error(
        "joinQueueButton was NOT found."
    );

}


// ======================================
// SERVICE SELECT CHANGE
// ======================================

if (serviceSelect) {

    serviceSelect.addEventListener(
        "change",
        function () {

            updateHero();

        }
    );

}


// ======================================
// INITIALIZE
// ======================================

Object.keys(state).forEach(
    function (service) {

        getQueue(service);

    }
);


save();

populateServices();

updateHero();


// ======================================
// GET STARTED
// ======================================

const getStarted =
    byId("getStarted");

if (getStarted) {

    getStarted.addEventListener(
        "click",
        function () {

            open("patientModal");

        }
    );

}


// ======================================
// CTA JOIN
// ======================================

const ctaJoin =
    byId("ctaJoin");

if (ctaJoin) {

    ctaJoin.addEventListener(
        "click",
        function () {

            open("patientModal");

        }
    );

}


// ======================================
// VIEW DEMO
// ======================================

const viewDemo =
    byId("viewDemo");

if (viewDemo) {

    viewDemo.addEventListener(
        "click",
        function () {

            const section =
                byId("how-it-works");

            if (section) {

                section.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}


// ======================================
// TRACK STATUS
// ======================================

const trackStatus =
    byId("trackStatus");

if (trackStatus) {

    trackStatus.addEventListener(
        "click",
        function () {

            showStatus();

        }
    );

}


// ======================================
// CLOSE BUTTONS
// ======================================

document.querySelectorAll(
    "[data-close]"
).forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                close(
                    button.dataset.close
                );

            }
        );

    }
);


// ======================================
// MODAL BACKDROP
// ======================================

document.querySelectorAll(
    ".modal"
).forEach(
    function (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    modal.classList.add(
                        "hidden"
                    );

                }

            }
        );

    }
);


// ======================================
// STORAGE SYNC
// ======================================

window.addEventListener(
    "storage",
    function (event) {


        // ----------------------------------
        // QUEUE STATE CHANGED
        // ----------------------------------

        if (
            event.key ===
            "medique-queue-state"
        ) {

            try {

                if (event.newValue) {

                    state =
                        JSON.parse(
                            event.newValue
                        );

                }

            } catch (error) {

                console.error(
                    "Could not sync queue state:",
                    error
                );

            }


            Object.keys(state).forEach(
                function (service) {

                    getQueue(service);

                }
            );


            updateHero();


            if (currentPatient) {

                showStatus();

            }

        }


        // ----------------------------------
        // CURRENT PATIENT CHANGED
        // ----------------------------------

        if (
            event.key ===
            "medique-current-patient"
        ) {

            try {

                currentPatient =
                    event.newValue
                        ? JSON.parse(
                            event.newValue
                        )
                        : null;

            } catch (error) {

                console.error(
                    "Could not sync current patient:",
                    error
                );

            }


            updateHero();

        }

    }
);