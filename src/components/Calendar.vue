<script setup>
import { computed } from 'vue'

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

//заглушки для шапки:
const displayLabel = computed(() => 'Month YYYY') 
</script>

<template>
  <div class="cal" role="application" aria-label="Calendar">
    <div class="cal__header">
      <button class="cal__nav" aria-label="Previous month" type="button">&lt;</button>
      <div class="cal__label">{{ displayLabel }}</div>
      <button class="cal__nav" aria-label="Next month" type="button">&gt;</button>
    </div>

    <div class="cal__weekdays" role="row">
      <span class="cal__weekday">Пн</span>
      <span class="cal__weekday">Вт</span>
      <span class="cal__weekday">Ср</span>
      <span class="cal__weekday">Чт</span>
      <span class="cal__weekday">Пт</span>
      <span class="cal__weekday">Сб</span>
      <span class="cal__weekday">Вс</span>
    </div>

    <div class="cal__grid" role="grid" aria-readonly="true">
      <div class="cal__placeholder">[ сетка ]</div>
    </div>
  </div>
</template>

<style scoped>
.cal {
  --c-text:#111;
  --c-muted:#666;
  --c-border:#e6e6e6;
  --c-accent:#2563eb;
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
  padding:4px 8px;
}

.cal__weekdays{
  display:grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0;
  padding:8px;
  color:var(--c-muted);
  font-size:12px;
  border-bottom:1px solid var(--c-border);
  text-align:center;
}

.cal__weekday{ padding:4px 0; }

.cal__grid{
  min-height: 220px;
  padding:8px;
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
