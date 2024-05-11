<template>
  <div class="relative">
    <ControlFormInput
      v-model="selectedDate"
      v-bind="$attrs"
      autocomplete="off"
      @click="showDatepicker = true"
      @click.once="initDatepicker"
      @focusout="showDatepicker = false"
    />

    <Transition
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="showDatepicker"
        class="absolute z-[1] mt-2 rounded-xl bg-white ring-1 ring-slate-200 shadow-lg duration-200"
        @mouseleave="showDatepicker = false"
      >
        <div class="flex items-center justify-between p-2">
          <button type="button" @click.stop="toggleMonth(1)">
            <svg width="16" height="16" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 1L1 9.5L9 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <span>{{ currentMonth }}</span>

          <button type="button" @click="toggleMonth(-1)">
            <svg width="16" height="16" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1L9 9.5L1 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-7 gap-1 border-b border-t p-2 text-center text-sm font-semibold">
          <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
        </div>

        <div class="p-2">
          <div v-for="week in calendar" :key="week" class="grid grid-cols-7 gap-1 py-1 text-center">
            <button
              v-for="date in week"
              :key="date.id"
              type="button"
              class="size-8 rounded-md hover:bg-slate-100"
              :class="{
                'bg-blue-500 hover:bg-blue-600 text-white': isDateSelected(date),
                'pointer-events-none': !date.date
              }"
              @click="selectDate(date)"
            >
              {{ date.date }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false });

const selectedDate = defineModel({ type: String });
const showDatepicker = ref(false);
const currentMonth = ref('');
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const calendar = ref([]);

const initDatepicker = () => {
  const now = new Date();

  if (selectedDate.value === '') selectedDate.value = now.toISOString().substring(0, 10);

  currentMonth.value = now.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  generateDatepicker(now.getFullYear(), now.getMonth());
};

const generateDatepicker = (year, month) => {
  const firstDayOfMonth = new Date(year, month, 0);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  const calendarValue = [];

  let week = [];

  for (let dayWeek = 0; dayWeek < firstDayOfWeek; dayWeek++) {
    week.push({ id: dayWeek, date: '' });
  }

  for (let dayMonth = 1; dayMonth <= daysInMonth; dayMonth++) {
    week.push({ id: dayMonth, date: dayMonth });

    if ((firstDayOfWeek + dayMonth - 1) % 7 === 6 || dayMonth === daysInMonth) {
      calendarValue.push(week);
      week = [];
    }
  }

  calendar.value = calendarValue;
};

const toggleMonth = (direction) => {
  const currentDate = new Date(selectedDate.value);
  currentDate.setMonth(currentDate.getMonth() - direction);
  selectedDate.value = currentDate.toISOString().substring(0, 10);
  currentMonth.value = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });
  generateDatepicker(currentDate.getFullYear(), currentDate.getMonth());
};

const selectDate = (date) => {
  if (date.date !== '') {
    const selectedDateValue = new Date(selectedDate.value);
    selectedDateValue.setDate(date.date);
    selectedDate.value = selectedDateValue.toISOString().substring(0, 10);
    showDatepicker.value = false;
  }
};

const isDateSelected = (date) => {
  if (!selectedDate.value) return false;
  return new Date(selectedDate.value).getDate() === date.date;
};
</script>
