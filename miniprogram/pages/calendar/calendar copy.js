// <!--calendar.wxml-->
// <view class="calendar">
//   <view class="operat">
//     <view class="pre">
//       <button bindtap="{{() => changeDate('preYear')}}">
//         上一年
//       </button>
//       <button bindtap="{{() => changeDate('preMonth')}}">
//         上一月
//       </button>
//     </view>
//     <view class="center">{{targetDate.getFullYear() + ' 年 + （targetDate.getMonth() + 1） + ' 月'}}</view>
//     <view class="next">
//       <button bindtap="{{() => changeDate('nextMonth')}}">
//         下一月
//       </button>
//       <button bindtap="{{() => changeDate('nextYear')}}">
//         下一年
//       </button>
//     </view>
//   </view>
//   <view class="table">
//     <view class="header">
//       <view>一</view>
//       <view>二</view>
//       <view>三</view>
//       <view>四</view>
//       <view>五</view>
//       <view>六</view>
//       <view>日</view>
//     </view>
//     <view class="body">
//       {calendarList.map(item => (
//       <view key={item.key}>
//         {item.children.map(it => (
//         <view style={it.isTargetMonth ? { color: 'rgba(0,0,0,.85)' , backgroundColor: '#fafafa' } : {}}
//           key={it.weekNumber}>
//           <view class="day-number" style={ it.isCurDay ? { color: '#fff' , background: 'rgb(0, 150, 250)' } : {} }>
//             {it.dayNumber}
//           </view>
//         </view>
//         ))}
//       </view>
//       ))}
//     </view>
//   </view>
// </view>