//index.js
const app = getApp()
const weekMapList = [
  {
    weekNumber: 1,
    weekName: '一',
  },
  {
    weekNumber: 2,
    weekName: '二',
  },
  {
    weekNumber: 3,
    weekName: '三',
  },
  {
    weekNumber: 4,
    weekName: '四',
  },
  {
    weekNumber: 5,
    weekName: '五',
  },
  {
    weekNumber: 6,
    weekName: '六',
  },
  {
    weekNumber: 0,
    weekName: '日',
  },
];

// 如果 date 为 Date 对象直接克隆，否则转化为 Date
const switchDateObject = date => {
  return Object.prototype.toString.call(date) === '[object Date]'
    ? new Date(date.valueOf())
    : new Date(date.replace(/-/g, '/'));
};

// 获取某月天数
// date 格式 ‘Date 对象’ 或 ‘2020-9’
const getMonthDays = (date = new Date()) => {
  const targetDate = switchDateObject(date);
  // 获取当前月份
  const curMonth = targetDate.getMonth();
  // 设置当前月1日，防止下一个月没有29-31日
  targetDate.setDate(1);
  // 将 targetDate 设置为下一个月
  targetDate.setMonth(curMonth + 1);
  // setDate(0) 会让 targetDate 日期变成前一个月的最后一天，也就是当前月的最后一天
  targetDate.setDate(0);
  // 获取 targetDate 的日期，也就是当前月的最后一天的日期，即当前月天数
  return targetDate.getDate();
};

// 是否是当年当月当日
const isCurYearMonthDay = (date, dayNumber) => {
  const targetDate = switchDateObject(date);
  const nowDate = new Date();
  const curDay = nowDate.getDate(); // 当天日期
  return (
    targetDate.getFullYear() === nowDate.getFullYear() &&
    targetDate.getMonth() === nowDate.getMonth() &&
    dayNumber === curDay
  ); // 是否为当年当月
};

// 获取初始列表，6 横 7 列
// date 格式 Date 对象 或 '2020-9'
const getInitList = (date = new Date()) => {
  const targetDate = switchDateObject(date);
  targetDate.setDate(1); // 设置为当月第一天的星期数
  const targetWeekNumber = targetDate.getDay() || 7; // 目标月第一天
  const targetMonthDays = getMonthDays(targetDate); // 目标月天数
  targetDate.setDate(0); // 设置为上一月最后一天
  const lastMonthDays = getMonthDays(targetDate); // 上个月天数

  const initList = [];
  for (let i = 0; i < 6; i += 1) {
    const listItem = weekMapList.map((item, index) => {
      let dayNumber = i * 7 + index - targetWeekNumber + 2; // 0
      let isTargetMonth = false;
      let isCurDay = false;
      switch (true) {
        case dayNumber < 1:
          dayNumber += lastMonthDays;
          break;
        case dayNumber > targetMonthDays:
          dayNumber -= targetMonthDays;
          break;
        default:
          isTargetMonth = true;
          isCurDay = isCurYearMonthDay(date, dayNumber);
          break;
      }

      return {
        ...item,
        dayNumber,
        isTargetMonth,
        isCurDay,
      };
    });
    initList.push({
      key: `other_${i}`,
      children: listItem,
    });
  }

  return initList;
};

// 获取当前时间
const getYearMonth = date => {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  return date ? year + ' 年' + month + ' 月' : '';
};
Page({
  data: {
    targetDate: undefined,
    dateTitle: '',
    calendarList: [],
  },

  changeDate: function (e) {
    const { value } = e.currentTarget.dataset;
    const { targetDate } = this.data;
    const newTargetDate = new Date(targetDate.valueOf());
    switch (value) {
      case 'preYear':
        newTargetDate.setFullYear(newTargetDate.getFullYear() - 1);
        break;
      case 'nextYear':
        newTargetDate.setFullYear(newTargetDate.getFullYear() + 1);
        break;
      case 'preMonth':
        newTargetDate.setMonth(newTargetDate.getMonth() - 1);
        break;
      case 'nextMonth':
        newTargetDate.setMonth(newTargetDate.getMonth() + 1);
        break;
      default:
    }
    this.setData({
      targetDate: newTargetDate,
      dateTitle: getYearMonth(newTargetDate),
      calendarList: getInitList(newTargetDate),
    });
  },

  onLoad: function () {
    const now = new Date();
    this.setData({
      targetDate: now,
      dateTitle: getYearMonth(now),
      calendarList: getInitList(now),
    });
  },
  onShow: function () {
  }
})