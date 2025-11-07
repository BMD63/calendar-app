<script setup>
import { ref } from 'vue'
import Calendar from './components/Calendar.vue'

const selected = ref('') 
const locale = ref('ru-RU')
const startWeekOn = ref(1) // 1 = понедельник, 0 = воскресенье
const showSettings = ref(false)

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

    <section class="panel">
      <div class="row">
        <label>Выбранная дата:</label>
        <code>{{ selected || '—' }}</code>
      </div>
      <Calendar 
        v-model="selected" 
        :locale="locale"
        :startWeekOn="startWeekOn"
        />
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
