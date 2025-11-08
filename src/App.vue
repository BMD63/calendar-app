<script setup>
import { ref, computed } from 'vue'
import Calendar from './components/Calendar.vue'

const selected = ref('') 
const locale = ref('ru-RU')
const startWeekOn = ref(1) // 1 = понедельник, 0 = воскресенье
const showSettings = ref(false)

const selectedPretty = computed(() => {
  if (!selected.value) return ''
  const [y, m, d] = selected.value.split('-').map(Number)
  const dt = new Date(y, (m || 1) - 1, d || 1)
  return new Intl.DateTimeFormat(locale.value || undefined, { dateStyle: 'full' }).format(dt)
  })

</script>

<template>
  <main class="page">
    <h1>Календарь</h1>
    <button
      class="gear-btn"
      type="button"
      aria-label="Открыть настройки"
      :aria-expanded="showSettings ? 'true' : 'false'"
      @click="showSettings = !showSettings"
      title="Настройки"
    >
      ⚙️
    </button>
    <div 
      class="controls" 
      v-if="showSettings"
    >
      <label class="row">
        <span>Локаль:</span>
        <select v-model="locale">
          <option value="ru-RU">Русский (Россия)</option>
          <option value="en-US">English (United States)</option>
          <option value="fr-FR">Français (France)</option>
          <option value="de-DE">Deutsch (Deutschland)</option>
        </select>
      </label>
      <label class="row">
        <span>Первый день недели:</span>
        <select v-model.number="startWeekOn">
          <option :value="0">Воскресенье</option>
          <option :value="1">Понедельник</option>
        </select>
      </label>
    </div>

    <section class="panel panel--grid">
      <div class="panel__left">
        <Calendar 
        v-model="selected" 
        :locale="locale"
        :startWeekOn="startWeekOn"
        />
      </div>
      <div class="panel__right">
        <div
          v-if="selected"
          class="date-badge"
          :title="selected"
          >
          {{ selectedPretty }}
        </div>
      </div>
      
    </section>
  </main>
</template>

<style>
.page {
  max-width: 840px;
  margin: 32px auto;
  padding: 0 16px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial, "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  color: #111;
}
h1 { margin: 0 0 16px; font-size: 24px; }
.muted { color: #666; margin: 0 0 16px; }
.controls { margin: 0 0 16px; }
.panel {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
  background: #fff;
}
.panel--grid{
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  min-height: 360px;
}
.panel__left{
  display: flex;
  align-items: flex-start;
}
.panel__right{
  display: grid;
  place-items: center;
}
.date-badge{
  max-width: 520px;
  padding: 28px 32px;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 6px 24px rgba(0,0,0,.06);
  font-size: 28px;
  line-height: 1.25;
  text-align: center;
  word-break: break-word;
}
@media (max-width: 800px){
  .panel--grid{
    grid-template-columns: 1fr;
    min-height: unset;
    justify-items: center; 
  }
  .panel__right{
    place-items: center;
  }
  .date-badge{ width: 100%; }
}

.row {
  display: flex;
  gap: 8px;
  align-items: center;
}
code {
  padding: 2px 6px;
  border-radius: 6px;
  background: #f6f6f6;
  border: 1px solid #eee;
}
.gear-btn{
   border: none;
   background: transparent;
   padding: 4px;
   line-height: 0;
   margin-bottom: 8px;
   cursor: pointer;
   opacity: .5;
   transition: opacity .15s ease, transform .15s ease;
}
.gear-btn:hover{ 
  opacity: 1; 
  transform: scale(1.1); 
}
.gear-btn:active{ transform: scale(.96); }
.gear-btn:focus-visible{ outline: 2px solid #2563eb; outline-offset: 2px; }
</style>
