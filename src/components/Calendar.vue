<script setup>
import { ref, computed, watch } from 'vue'
import {
  normalizeDate,
  monthLabel,
  getWeekdayLabels,
  getGridStart,
  startOfMonth,
  addDays,
  sameDay,
  formatYmd,
} from '../utils/date.js'

const props = defineProps({
  modelValue: { type: [String, Date], default: '' },
  locale: { type: String, default: '' },
  startWeekOn: { type: Number, default: 1 }, // понедельник по умолчанию
  weekdayFormat: { type: String, default: 'short' }, // 'narrow' | 'short' | 'long'
  minDate: { type: [String, Date], default: '' },
  maxDate: { type: [String, Date], default: '' },
  initialMonth: { type: [String, Date], default: '' },
})

const emit = defineEmits([
  'update:modelValue', 
  'select',            
  'month-change',      
])

const initial =
  normalizeDate(props.modelValue) ??
  normalizeDate(props.initialMonth) ??
  new Date()

const viewAnchor = ref(initial)
watch(
  () => props.modelValue,
  (nv) => {
    const d = normalizeDate(nv)
    if (d) {
      viewAnchor.value = new Date(d.getFullYear(), d.getMonth(), 1)
    }
  }
)

const selected = computed(() => normalizeDate(props.modelValue))

const headerLabel = computed(() => monthLabel(viewAnchor.value, props.locale))

const weekdayLabels = computed(() =>
  getWeekdayLabels(props.locale, props.startWeekOn, props.weekdayFormat)
)

// сетка 6×7 
const today = new Date()
const monthStart = computed(() => startOfMonth(viewAnchor.value))
const gridStart = computed(() => getGridStart(viewAnchor.value, props.startWeekOn))

const cells = computed(() => {
  const start = gridStart.value
  const curMonth = monthStart.value.getMonth()
  return Array.from({ length: 42 }, (_, i) => {
    const date = addDays(start, i)
    return {
      date,
      isToday: sameDay(date, today),
      inCurrentMonth: date.getMonth() === curMonth,
    }
  })
})

function selectDate(date) {
    const curMonth = monthStart.value.getMonth()
    if (date.getMonth() !== curMonth) {
        viewAnchor.value = new Date(date.getFullYear(), date.getMonth(), 1)
        emit('month-change', { year: date.getFullYear(), month: date.getMonth() + 1 })
    }
    const ymd = formatYmd(date)
    emit('update:modelValue', ymd)
    emit('select', date)
}

function changeMonth(delta) {
    const y = viewAnchor.value.getFullYear()
    const m = viewAnchor.value.getMonth()
    const next = new Date(y, m + delta, 1) // всегда на 1-е число, чтобы даты не перетекали
    viewAnchor.value = next
    emit('month-change', { year: next.getFullYear(), month: next.getMonth() + 1 }) 
}
</script>

<template>
  <div class="cal" role="application" aria-label="Calendar">
    <div class="cal__header">
      <button 
        class="cal__nav" 
        aria-label="Previous month" 
        type="button"
        @click="changeMonth(-1)"
        >&lt;</button>
      <div class="cal__label">{{ headerLabel }}</div>
      <button 
        class="cal__nav" 
        aria-label="Next month" 
        type="button"
        @click="changeMonth(+1)"
      >&gt;</button>
    </div>

    <div class="cal__weekdays" role="row">
      <span
        v-for="(w, i) in weekdayLabels"
        :key="i"
        class="cal__weekday"
        aria-hidden="true"
      >
        {{ w }}
      </span>
    </div>

    <div class="cal__grid" role="grid" aria-readonly="true">
      <button
        v-for="(cell, i) in cells"
        :key="i"
        class="cal__day"
        type="button"
        :class="{
          '--outside': !cell.inCurrentMonth,
          '--today': cell.isToday,
          '--selected': selected && sameDay(cell.date, selected),
        }"
        :aria-label="cell.date.toDateString()"
        @click="selectDate(cell.date)"
      >
        <span class="cal__day-num">{{ cell.date.getDate() }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.cal {
  --c-text:#111;
  --c-muted:#666;
  --c-border:#e6e6e6;
  --c-accent:#2563eb;
  --c-hover:#f3f4f6;
  --radii:12px;

  width: 320px;
  border: 1px solid var(--c-border);
  border-radius: var(--radii);
  background: #fff;
  overflow: hidden;
}

.cal__header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:8px 8px;
  border-bottom:1px solid var(--c-border);
}

.cal__label{
  font-weight:600;
}

.cal__nav{
  border:1px solid var(--c-border);
  background:#fff;
  border-radius:8px;
  width: 28px;
  height: 28px;
  display: grid;
  place-items:center;
  transition: background .15s ease, border-color .15s ease, transform .5s ease;
  padding:4px 8px;
}

.cal__nav:hover{ background: var(--c-hover); }
.cal__nav:active{ transform: translateY(1px); }

.cal__nav:focus-visible{
    outline: 2px solid var(--c-accent);
    outline-offset: 2px;
}

.cal__weekdays{
  display:grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0;
  padding:8px;
  color:var(--c-muted);
  font-size:11px;
  letter-spacing: .02em;
  border-bottom:1px solid var(--c-border);
  text-align:center;
}

.cal__weekday{ padding:4px 0; text-transform: uppercase;}

.cal__grid{
  display:grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  padding:8px;
}

.cal__day{
  position: relative;
  height: 38px;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  background:#fff;
  display: grid;
  place-items: center;
  color: var(--c-text);
  transition: background .15s ease, border-color .15s ease, color .15s ease, box-shadow .15s ease;
}

.cal__day.--outside{
  color:#9aa1a7;
  background:transparent;
}
.cal__day.--today{
  box-shadow: inset 0 0 0 1px var(--c-accent);
}

cal__day:focus-visible{
    outline: 2px solid var(--c-accent);
    outline-offset: 2px;
}

.cal__day:not(.--disabled):not(.--selected):hover{
    background: var(--c-hover);
}

.cal__day-num{
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.cal__day.--selected {
  background: var(--c-accent);
  color: #fff;
  border-color: var(--c-accent);
  box-shadow: 0 0 0 2px rgba(37,99,235,.15) inset;
}

.cal__placeholder{
  height: 200px;
  display:grid;
  place-items:center;
  color: var(--c-muted);
  border: 1px dashed var(--c-border);
  border-radius: 8px;
}
</style>
