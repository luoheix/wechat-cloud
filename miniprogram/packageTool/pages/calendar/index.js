//index.js
const app = getApp();
const nowDate = new Date();
const [nowYear, nowMonth, nowDay] = [
  nowDate.getFullYear(),
  nowDate.getMonth(),
  nowDate.getDate(),
];
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

// 获取初始列表，6 横 7 列
// date 格式 Date 对象 或 '2020-9'
const getInitList = (date = nowDate) => {
  const targetDate = switchDateObject(date);
  targetDate.setDate(1); // 设置为当月第一天的星期数
  const targetWeekNumber = targetDate.getDay() || 7; // 目标月第一天

  const initList = [];
  for (let i = 0; i < 6; i += 1) {
    const listItem = weekMapList.map((item, index) => {
      let dayNumber = i * 7 + index - targetWeekNumber + 2; // 0
      const dateObj = switchDateObject(date);
      dateObj.setDate(dayNumber);
      const [itYear, itMonth, itDay] = [
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate(),
      ];

      // 目标月
      const [targetYear, targetMonth] = [
        targetDate.getFullYear(),
        targetDate.getMonth(),
      ];
      return {
        ...item,
        dateObj,
        isTargetMonth: itYear === targetYear && itMonth === targetMonth,
        isCurDay: itYear === nowYear && itMonth === nowMonth && itDay === nowDay,
        dayNumber: itDay,
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
    weekMapList,
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