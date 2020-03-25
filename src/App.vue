<template>
  <div id="app">
    <shi-calendar></shi-calendar>
  </div>
</template>

<script>
import shiCalendar from 'shi-calendar'

export default {
  name: 'app',
  components: {
    shiCalendar
  },
  data () {
    return {
    }
  }
}
</script>

<style>
#app {
  padding: 60px;
  width: 50%;
}
</style>
