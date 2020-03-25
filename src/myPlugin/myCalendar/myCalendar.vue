<template>
  <div class="calendar-containier" onselectstart="return false">
    <div class="calendar-tips">
      <div>{{currectYear}}年{{currectMonth}}月</div>
      <div>
        <span :class="{'actived': currentBtn == 1}" @click.stop="handlePrevMouth">上个月</span>
        <span :class="{'actived': !currentBtn}" @click.stop="initCalendar(null)">今天</span>
        <span :class="{'actived': currentBtn == 2}" @click.stop="handleNextMouth">下个月</span>
      </div>
    </div>
    <div class="calendar-content">
      <div class="calendar-weeks">
        <span v-for="(item, i) in weeks" :key="i">{{item}}</span>
      </div>
      <div class="calendar-days">
        <span v-for="(d, idx) in daysList" :key="idx" :style="isCurrentYear(d.time)">{{d.date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 's-calendar',
  data () {
    return {
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      // 总计统计35天（7 * 6）
      totalDays: 42,
      // 存储所有的日期
      daysList: [],
      // 当前年
      currectYear: null,
      // 当前月
      currectMonth: null,
      // 当前日
      currectDate: null,
      currentBtn: null
    }
  },
  computed: {
    isCurrentYear () {
      return function (e) {
        return {
          color: ((new Date(e).getMonth() + 1) == this.currectMonth) ? (new Date(e).getDate() == this.currectDate) ? '#1E8BFA' : 'inherit' : '#c2c6ce',
          backgroundColor: ((new Date(e).getMonth() + 1) == this.currectMonth) ? (new Date(e).getDate() == this.currectDate) ? '#f2f8fe' : 'transparent' : 'transparent'
        }
      }
    }
  },
  mounted () {
    this.initCalendar()
  },
  methods: {
    // 初始化
    initCalendar (y, m, d) {
      if (typeof y === 'object') {
        this.currentBtn = null
      }
      this.daysList.length = 0
      // 确定当前的时间
      let currentNow = y ? new Date(y, m, d) : new Date()
      // 当前年
      this.currectYear = currentNow.getFullYear()
      // 当前月
      this.currectMonth = currentNow.getMonth() + 1
      // 当前日
      this.currectDate = currentNow.getDate()
      // 获取当月的第一天
      let currectMonthFirstDay = new Date(this.currectYear, this.currectMonth - 1, 1)
      // 获取当月的第一天是星期几（1,2，3，4，5，6，0）
      let currentWeek = currectMonthFirstDay.getDay()
      // console.log(currentWeek)
      let week = currentWeek ? currentWeek : 7
      // console.log(week)
      for (let i = week - 1; i > 0; i--) {
        let d = new Date(currectMonthFirstDay) // new Date不影响currectMonthFirstDay
        d.setDate(d.getDate() - i)
        this.daysList.push(this.formatterDate(d))
      }
      for (let j = 0; j <= (this.totalDays - week); j++) {
        let d = new Date(currectMonthFirstDay)
        d.setDate(d.getDate() + j)
        this.daysList.push(this.formatterDate(d))
      }
      // console.dir(this.daysList)
    },
    // 上一个月
    handlePrevMouth () {
      this.currentBtn = 1
      let newYear = Number.parseInt(this.currectYear)
      let newMonth = Number.parseInt(this.currectMonth) - 1
      this.initCalendar(newYear, newMonth - 1, 1)
    },
    // 下一个月
    handleNextMouth () {
      this.currentBtn = 2
      let newYear = Number.parseInt(this.currectYear)
      let newMonth = Number.parseInt(this.currectMonth) + 1
      this.initCalendar(newYear, newMonth - 1, 1)
    },
    formatterDate (time) {
      let y = time.getFullYear()
      let m = this.getHandledValue(time.getMonth() + 1)
      let d = this.getHandledValue(time.getDate())
      return {
        date: Number.parseFloat(d),
        time: `${y}-${m}-${d}`
      }
    },
    getHandledValue (num) {
      return num < 10 ? '0' + num : num
    }
  }
}
</script>

<style>
.calendar-containier {
  padding: 10px;
  color: #2c3e50;
  font-size: 14px;
  border: 1px solid #ebebeb;
}
.calendar-tips {
  padding: 5px 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
}
.calendar-tips div:nth-of-type(1) {
  font-size: 20px;
  font-weight: 500;
}
.calendar-tips div:nth-of-type(2) {
  display: flex;
}
.calendar-tips div:nth-of-type(2) span {
  display: inline-block;
  padding: 5px 20px;
  cursor: pointer;
  border: 1px solid #e2e4ea;
}
.calendar-tips div:nth-of-type(2) span.actived {
  background-color: #1e8bfa;
  color: #fff;
}
.calendar-tips div:nth-of-type(2) span:nth-of-type(1) {
  border-right: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.calendar-tips div:nth-of-type(2) span:nth-of-type(2) {
  border: 1px solid #e2e4ea;
}
.calendar-tips div:nth-of-type(2) span:nth-of-type(3) {
  border-left: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.calendar-weeks {
  display: flex;
}
.calendar-weeks span {
  padding: 15px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.calendar-days {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ebebeb;
}
.calendar-days span {
  padding: 10px 0 50px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: calc((100% - 76px) / 7);
  font-size: 16px;
  border-bottom: 1px solid #ebebeb;
  border-right: 1px solid #ebebeb;
  cursor: pointer;
}
.calendar-days span.current-date {
  background: #f2f8fe;
}
.calendar-days span:nth-last-of-type(8) ~ span {
  border-bottom: 0;
}
.calendar-days span:nth-of-type(7n) {
  border-right: 0;
}
</style>
