import sCalendar from './myCalendar.vue';
//.name就是开始说的vue文件暴露出来的name名，sCalendar整个组件
sCalendar.install = Vue => Vue.component(sCalendar.name, sCalendar);
export default sCalendar;