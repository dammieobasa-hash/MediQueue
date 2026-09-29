const doctors = {

  "Dental Care": [
    {
      id: "dentist1",
      name: "Dr. Sarah Adeyemi",
      initials: "SA",
      specialty: "Dentistry"
    },

    {
      id: "dentist2",
      name: "Dr. Daniel Okafor",
      initials: "DO",
      specialty: "Dentistry"
    },

    {
      id: "dentist3",
      name: "Dr. Amaka Eze",
      initials: "AE",
      specialty: "Dentistry"
    },

    {
      id: "dentist4",
      name: "Dr. Michael Bello",
      initials: "MB",
      specialty: "Dentistry"
    },

    {
      id: "dentist5",
      name: "Dr. Grace Williams",
      initials: "GW",
      specialty: "Dentistry"
    }
  ],


  "General Consultation": [
    {
      id: "general1",
      name: "Dr. John Adeyemi",
      initials: "JA",
      specialty: "General Consultation"
    },

    {
      id: "general2",
      name: "Dr. Mary Okoro",
      initials: "MO",
      specialty: "General Consultation"
    },

    {
      id: "general3",
      name: "Dr. David Eze",
      initials: "DE",
      specialty: "General Consultation"
    },

    {
      id: "general4",
      name: "Dr. Linda Bello",
      initials: "LB",
      specialty: "General Consultation"
    },

    {
      id: "general5",
      name: "Dr. Peter Williams",
      initials: "PW",
      specialty: "General Consultation"
    }
  ],


  "Pediatrics": [
    {
      id: "pedia1",
      name: "Dr. Jane Ade",
      initials: "JA",
      specialty: "Pediatrics"
    },

    {
      id: "pedia2",
      name: "Dr. Samuel Obi",
      initials: "SO",
      specialty: "Pediatrics"
    },

    {
      id: "pedia3",
      name: "Dr. Esther James",
      initials: "EJ",
      specialty: "Pediatrics"
    },

    {
      id: "pedia4",
      name: "Dr. Victor Musa",
      initials: "VM",
      specialty: "Pediatrics"
    },

    {
      id: "pedia5",
      name: "Dr. Rita Johnson",
      initials: "RJ",
      specialty: "Pediatrics"
    }
  ],


  "Specialist Clinic": [
    {
      id: "specialist1",
      name: "Dr. Chris Adams",
      initials: "CA",
      specialty: "Specialist Clinic"
    },

    {
      id: "specialist2",
      name: "Dr. Helen Cole",
      initials: "HC",
      specialty: "Specialist Clinic"
    },

    {
      id: "specialist3",
      name: "Dr. Paul Eze",
      initials: "PE",
      specialty: "Specialist Clinic"
    },

    {
      id: "specialist4",
      name: "Dr. Faith Obi",
      initials: "FO",
      specialty: "Specialist Clinic"
    },

    {
      id: "specialist5",
      name: "Dr. Mark James",
      initials: "MJ",
      specialty: "Specialist Clinic"
    }
  ]

};



const servicePrefixes = {

  "Dental Care": "D",

  "General Consultation": "A",

  "Pediatrics": "P",

  "Specialist Clinic": "S"

};



let selectedDepartment =
  localStorage.getItem(
    "medique-staff-department"
  ) || "Dental Care";


let selectedDoctor =
  localStorage.getItem(
    "medique-staff-doctor"
  ) || "dentist1";



const departmentSelect =
  document.getElementById(
    "departmentSelect"
  );


const doctorSelect =
  document.getElementById(
    "doctorSelect"
  );


const doctorName =
  document.getElementById(
    "doctorName"
  );


const doctorAvatar =
  document.getElementById(
    "doctorAvatar"
  );


const doctorDepartment =
  document.getElementById(
    "doctorDepartment"
  );


const currentNumber =
  document.getElementById(
    "currentNumber"
  );


const currentPatient =
  document.getElementById(
    "currentPatient"
  );


const queueCount =
  document.getElementById(
    "queueCount"
  );


const queueList =
  document.getElementById(
    "queueList"
  );


const callNextButton =
  document.getElementById(
    "callNext"
  );


const doctorsGrid =
  document.getElementById(
    "doctorsGrid"
  );



function getState() {

  return JSON.parse(
    localStorage.getItem(
      "medique-queue-state"
    ) || "{}"
  );

}



function saveState(state) {

  localStorage.setItem(
    "medique-queue-state",
    JSON.stringify(state)
  );

}



function getQueue() {

  const state = getState();

  if (!state[selectedDepartment]) {

    state[selectedDepartment] = {

      serving: 0,

      last: 0,

      called: null,

      patients: []

    };

    saveState(state);

  }

  return state[selectedDepartment];

}



function getDoctors() {

  return doctors[selectedDepartment] || [];

}



function populateDoctors() {

  const departmentDoctors =
    getDoctors();


  doctorSelect.innerHTML =
    departmentDoctors.map(doctor => `

      <option value="${doctor.id}">
        ${doctor.name}
      </option>

    `).join("");


  const exists =
    departmentDoctors.some(
      doctor =>
        doctor.id === selectedDoctor
    );


  if (!exists) {

    selectedDoctor =
      departmentDoctors[0]?.id;

  }


  doctorSelect.value =
    selectedDoctor;


  renderDoctors();

  updateDoctor();

}



function updateDoctor() {

  const doctor =
    getDoctors().find(
      item =>
        item.id === selectedDoctor
    );


  if (!doctor) return;


  doctorName.textContent =
    doctor.name;


  doctorAvatar.textContent =
    doctor.initials;


  doctorDepartment.textContent =
    doctor.specialty;


  renderQueue();

}



function renderDoctors() {

  const departmentDoctors =
    getDoctors();


  doctorsGrid.innerHTML =
    departmentDoctors.map(doctor => `

      <div
        class="doctor-mini-card
        ${doctor.id === selectedDoctor
          ? "active"
          : ""}"
        data-doctor="${doctor.id}"
      >

        <div class="mini-avatar">
          ${doctor.initials}
        </div>

        <h3>
          ${doctor.name}
        </h3>

        <p>
          ${doctor.specialty}
        </p>

      </div>

    `).join("");


  document
    .querySelectorAll("[data-doctor]")
    .forEach(card => {

      card.addEventListener(
        "click",
        () => {

          selectedDoctor =
            card.dataset.doctor;

          localStorage.setItem(
            "medique-staff-doctor",
            selectedDoctor
          );

          doctorSelect.value =
            selectedDoctor;

          renderDoctors();

          updateDoctor();

        }
      );

    });

}



function renderQueue() {

  const queue =
    getQueue();


  const prefix =
    servicePrefixes[selectedDepartment];


  if (queue.called) {

    currentNumber.textContent =
      `${prefix}${queue.serving}`;

    currentPatient.textContent =
      queue.called.name;

  } else {

    currentNumber.textContent =
      `${prefix}${queue.serving}`;

    currentPatient.textContent =
      "No patient currently being attended to";

  }


  queueCount.textContent =
    queue.patients.length;


  callNextButton.disabled =
    queue.patients.length === 0;


  if (!queue.patients.length) {

    queueList.innerHTML = `

      <div class="patient-row">

        <span class="patient-number">
          —
        </span>

        <span class="patient-name">
          No patients waiting
        </span>

        <span class="patient-position">
          Queue empty
        </span>

      </div>

    `;

    return;

  }


  queueList.innerHTML =
    queue.patients.map(
      (patient, index) => `

        <div class="patient-row">

          <span class="patient-number">
            ${prefix}${patient.number}
          </span>

          <span class="patient-name">
            ${patient.name}
          </span>

          <span class="patient-position">
            #${index + 1} in line
          </span>

        </div>

      `
    ).join("");

}



function callNext() {

  const state =
    getState();


  const queue =
    state[selectedDepartment];


  if (
    !queue ||
    !queue.patients.length
  ) {

    return;

  }


  /*
    Remove the first patient from
    the shared department queue.
  */

  const patient =
    queue.patients.shift();


  /*
    Update the shared queue.
  */

  queue.serving =
    patient.number;


  queue.called =
    patient;


  saveState(state);


  renderQueue();

}



departmentSelect.addEventListener(
  "change",
  event => {

    selectedDepartment =
      event.target.value;


    localStorage.setItem(
      "medique-staff-department",
      selectedDepartment
    );


    const departmentDoctors =
      getDoctors();


    selectedDoctor =
      departmentDoctors[0]?.id;


    localStorage.setItem(
      "medique-staff-doctor",
      selectedDoctor
    );


    populateDoctors();

  }
);



doctorSelect.addEventListener(
  "change",
  event => {

    selectedDoctor =
      event.target.value;


    localStorage.setItem(
      "medique-staff-doctor",
      selectedDoctor
    );


    renderDoctors();

    updateDoctor();

  }
);



callNextButton.addEventListener(
  "click",
  callNext
);



/*
  This is important.

  If another doctor changes the queue
  in another tab/window of the same browser,
  this page updates automatically.
*/

window.addEventListener(
  "storage",
  event => {

    if (
      event.key ===
      "medique-queue-state"
    ) {

      renderQueue();

    }

  }
);



/*
  Automatically refresh the queue
  periodically as a backup.
*/

setInterval(
  renderQueue,
  1000
);



populateDoctors();

renderQueue();