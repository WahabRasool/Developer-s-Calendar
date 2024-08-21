document.addEventListener("DOMContentLoaded", () => {
  const calendarGrid = document.querySelector(".calendar-grid");
  const noteModal = document.getElementById("noteModal");
  const closeModal = document.querySelector(".close");
  const selectedDateEl = document.getElementById("selectedDate");
  const timeInput = document.getElementById("time");
  const noteInput = document.getElementById("note");
  const saveNoteBtn = document.getElementById("saveNote");
  const resetBtn = document.getElementById("resetCalendar");
  const monthSelect = document.getElementById("monthSelect");
  let currentMonth = 0;
  const notes = {}; 

  function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  function renderCalendar(month) {
    calendarGrid.innerHTML = ""; 
    const days = daysInMonth(month, 2025);

    for (let i = 1; i <= days; i++) {
      const day = document.createElement("div");
      day.classList.add("day");
      day.textContent = i;
      day.setAttribute("data-day", i);

      const noteDisplay = document.createElement("div");
      noteDisplay.classList.add("note");
      day.appendChild(noteDisplay);

      day.addEventListener("click", () => openModal(month, i));
      calendarGrid.appendChild(day);

      if (notes[`${month}-${i}`]) {
        updateNotesDisplay(month, i);
      }
    }
  }

  function openModal(month, day) {
    selectedDateEl.textContent = `Day: ${day}, ${monthSelect.options[month].text}`;
    timeInput.value = "";
    noteInput.value = "";

    noteModal.style.display = "flex";
    saveNoteBtn.onclick = () => saveNote(month, day);
  }

  function closeModalFunc() {
    noteModal.style.display = "none";
  }

  function saveNote(month, day) {
    const time = timeInput.value;
    const noteText = noteInput.value;
    const key = `${month}-${day}`;

    if (time && noteText) {
      if (!notes[key]) notes[key] = [];
      notes[key].push({ time, text: noteText });

      updateNotesDisplay(month, day);
      closeModalFunc();
    } else {
      alert("Please fill out both time and note.");
    }
  }

  function updateNotesDisplay(month, day) {
    const key = `${month}-${day}`;
    const dayCell = document.querySelector(`.day[data-day='${day}'] .note`);
    dayCell.innerHTML = "";

    notes[key].forEach((note, index) => {
      const noteEntry = document.createElement("div");
      noteEntry.classList.add("note-entry");
      noteEntry.textContent = `🕒 ${note.time} - ${note.text}`;
      if (index > 0) noteEntry.style.borderTop = "1px solid #ddd";
      dayCell.appendChild(noteEntry);
    });
  }

  function resetCalendar() {
    for (let key in notes) delete notes[key];
    renderCalendar(currentMonth);
  }

  // Add event listeners for the reset button and month selection
  resetBtn.addEventListener("click", resetCalendar);
  monthSelect.addEventListener("change", (e) => {
    currentMonth = parseInt(e.target.value);
    renderCalendar(currentMonth);
  });

  // Close modal when clicking the close button or outside the modal
  closeModal.addEventListener("click", closeModalFunc);
  window.addEventListener("click", (event) => {
    if (event.target == noteModal) closeModalFunc();
  });

  // Initial calendar rendering
  renderCalendar(currentMonth);
});
