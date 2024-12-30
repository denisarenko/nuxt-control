<template>
  <div class="relative">
    <ControlFormInput
      v-model="formatDateRange"
      v-bind="$attrs"
      autocomplete="off"
      @click="showDatepicker = true"
      readonly
    />

    <Transition
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showDatepicker"
        class="absolute z-[1] mt-2 rounded-lg bg-white ring-1 ring-slate-200 shadow-lg duration-200"
        @mouseleave="showDatepicker = false"
      >
        <div class="space-y-2 p-2 text-center">
          <div class="flex justify-between gap-2">
            <button type="button" @click="prevMonth" class="px-2 py-1">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="size-5 text-slate-400 duration-200">
                <path fill="none" stroke-width="3" stroke="currentColor" d="m20 6-10 10 10 10" />
              </svg>
            </button>

            <div class="flex w-full justify-center gap-2 font-medium">
              <select
                v-model="currentMonth"
                @change="updateDate"
                class="cursor-pointer appearance-none bg-transparent text-center outline-none"
              >
                <option v-for="(month, index) in months" :key="index" :value="index">
                  {{ month }}
                </option>
              </select>

              <select
                v-model="currentYear"
                @change="updateDate"
                class="cursor-pointer appearance-none bg-transparent text-center outline-none"
              >
                <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>

            <button type="button" @click="nextMonth" class="px-2 py-1">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="size-5 text-slate-400 duration-200">
                <path fill="none" stroke-width="3" stroke="currentColor" d="m12 26 10-10-10-10" />
              </svg>
            </button>
          </div>

          <div class="grid min-w-max grid-cols-7 overflow-hidden rounded-md ring-1 ring-slate-200">
            <div v-for="day in days" :key="day" class="p-1 text-xs font-medium uppercase text-slate-400">
              {{ day }}
            </div>

            <button
              v-for="(date, index) in dates"
              :key="index"
              type="button"
              class="bg-white p-1 ring-1 ring-slate-200 disabled:cursor-not-allowed disabled:text-slate-400"
              :disabled="isDisabled(date)"
              @click="selectDate(date)"
            >
              <span
                :class="[
                  'mx-auto grid size-8 place-items-center rounded-full duration-200',
                  { 'text-slate-400': isOutside(date) },
                  { 'bg-blue-50 text-blue-600': inRange(date) },
                  isSelected(date) ? 'bg-blue-500 text-white hover:bg-blue-400' : 'hover:bg-blue-50 hover:text-blue-500'
                ]"
              >
                {{ date.getDate() }}
              </span>
            </button>
          </div>

          <div v-if="range" class="grid grid-cols-2 gap-2 rounded-md">
            <button type="button" class="btn btn-sm btn-default" @click="setPreset('today')">Today</button>
            <button type="button" class="btn btn-sm btn-default" @click="setPreset('this-month')">This Month</button>

            <button type="button" class="btn btn-sm btn-default" @click="setPreset('last-week')">Last Week</button>
            <button type="button" class="btn btn-sm btn-default" @click="setPreset('last-month')">Last Month</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    range?: boolean;
    disabledDates?: Date[];
  }>(),
  {
    range: false,
    disabledDates: () => []
  }
);

defineOptions({ inheritAttrs: false });
const showDatepicker = ref(false);

const model = defineModel<string | Date | Date[]>();

const selectedDates = ref<Date[]>(props.range ? (model.value as Date[]) : [model.value as Date]);

const days: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const currentDate = ref(new Date());
const currentMonth = ref(currentDate.value.getMonth());
const currentYear = ref(currentDate.value.getFullYear());

const years = computed(() => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
});

const dates = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  const days: Date[] = [];

  let startDay = firstDay.getDay() - 1;
  if (startDay === -1) startDay = 6;

  const totalCells = Math.ceil((lastDay.getDate() + startDay) / 7) * 7;

  for (let i = 1; i <= totalCells; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i - startDay);
    days.push(date);
  }

  return days;
});

const formatDateRange = computed(() => {
  if (props.range) {
    return selectedDates.value.map((date) => formatDate({ date })).join(' - ');
  }

  if (selectedDates.value[0]) {
    return formatDate({ date: selectedDates.value[0] as Date });
  }

  return '';
});

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const updateDate = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value, 1);
};

const selectDate = (date: Date) => {
  if (isDisabled(date)) return;

  if (props.range) {
    if (selectedDates.value.length === 2) {
      selectedDates.value = [date];
    } else {
      selectedDates.value.push(date);
      selectedDates.value.sort((a, b) => a.getTime() - b.getTime());
    }
  } else {
    selectedDates.value = [date];
  }

  currentMonth.value = date.getMonth();
  currentYear.value = date.getFullYear();

  model.value = props.range ? selectedDates.value : selectedDates.value[0];
};

const isSelected = (date: Date): boolean => {
  if (selectedDates.value[0]) {
    return selectedDates.value.some((d) => {
      return formatDate({ date: d }) === formatDate({ date });
    });
  }

  return false;
};

const inRange = (date: Date): boolean => {
  if (props.range && selectedDates.value.length === 2 && selectedDates.value[0] && selectedDates.value[1]) {
    return date > selectedDates.value[0] && date < selectedDates.value[1];
  }

  return false;
};

const isOutside = (date: Date): boolean => date.getMonth() !== currentMonth.value;

const isDisabled = (date: Date): boolean => {
  return props.disabledDates?.some((d) => new Date(d).toDateString() === date.toDateString());
};

const setPreset = (type: 'today' | 'yesterday' | 'last-week' | 'this-month' | 'last-month') => {
  const today = new Date();

  switch (type) {
    case 'today':
      selectDate(today);
      selectDate(today);
      break;
    case 'yesterday':
      selectDate(new Date(today.setDate(today.getDate() - 1)));
      selectDate(new Date(today.setDate(today.getDate() - 1)));
      break;
    case 'last-week':
      selectDate(new Date(today.setDate(today.getDate() - 7)));
      selectDate(new Date());
      break;
    case 'this-month':
      selectDate(new Date(today.getFullYear(), today.getMonth(), 1));
      selectDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
      break;
    case 'last-month':
      selectDate(new Date(today.getFullYear(), today.getMonth() - 1, 1));
      selectDate(new Date(today.getFullYear(), today.getMonth(), 0));
      break;
  }
};
</script>
