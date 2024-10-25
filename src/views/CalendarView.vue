<template>
  <div class="calendar">
    <div class="calendar-header">
      <b-button variant="outline-primary" @click="previousMonth">< Previous</b-button>
      <span>{{ monthName }} {{ currentYear }}</span>
      <b-button variant="outline-primary" @click="nextMonth">Next ></b-button>
    </div>
    <div class="calendar-body">
      <div class="calendar-weekdays mb-3">
        <span v-for="(day, index) in weekdays" :key="index">{{ day }}</span>
      </div>
      <div class="calendar-days">
        <span
            v-for="(day, i) in blankDays"
            :key="'blank_' + i"
            class="calendar-day blank"
        ></span>
        <span
            v-for="day in daysInMonth"
            :key="'blank' + day"
            class="calendar-day"
            :class="{ today: isToday(day) }"
        >
          {{ day }}
        </span>
      </div>
      <hr>
      <i>
        For this task, you need to create a Full Screen Calendar by implementing Create, Read, Delete, a design of the
        candidate's choice. The event itself contains a title, description, start date, and end date. When creating, the
        name and dates of the event are required to be filled in.
      </i>
      <p></p>
      <img
          class="w-100"
          src="https://madewithnetworkfra.fra1.digitaloceanspaces.com/spatie-space-production/30694/schedule-x-vue.jpg"
          alt="Actually object for tasking calendar">
      <p><strong>P.S</strong> Bu taskni so'ralganidek qilishga ko'p vaqt ketadi, nima ish qilinishi <b>Technical
        Interview</b> da so'ralsa aytib beraman, savollarga javob beraman !</p>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    };
  },
  computed: {
    daysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },
    blankDays() {
      const firstDayOfMonth = new Date(
          this.currentYear,
          this.currentMonth,
          0
      ).getDay();
      return Array.from({length: firstDayOfMonth});
    },
    monthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString(
          "default",
          {month: "long"}
      );
    },
  },
  methods: {
    previousMonth() {
      this.currentMonth--;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      }
    },
    nextMonth() {
      this.currentMonth++;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
    },
    isToday(day) {
      const today = new Date();
      return (
          day === today.getDate() &&
          this.currentMonth === today.getMonth() &&
          this.currentYear === today.getFullYear()
      );
    },
  },
};
</script>
<style scoped>
.calendar {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
}

.calendar-weekdays,
.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.calendar-day.today {
  border: none;
  background-color: #0C6DFD;
  color: white;
}

.calendar-day.blank {
  visibility: hidden;
}
</style>

