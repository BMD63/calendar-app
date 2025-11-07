<script setup>
import { ref } from 'vue'
import Calendar from './components/Calendar.vue'

const selected = ref('') 
</script>

<template>
  <main class="page">
    <h1>Календарь</h1>
    <p class="muted">Здесь сам блок календаря</p>

    <section class="panel">
      <div class="row">
        <label>Выбранная дата:</label>
        <code>{{ selected || '—' }}</code>
      </div>
      <Calendar />
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
</style>
