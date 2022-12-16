import moment from "moment";

var getTimeIntervals = function (time1: any, time2: any) {
  var arr = [];
  while (time1 <= time2) {
    arr.push(time1.toTimeString().substring(0, 5));
    time1.setMinutes(time1.getMinutes() + 15);
  }
  return arr;
};

var parseIn = function (date_time: any) {
  var d = new Date();
  d.setHours(date_time.substring(11, 13));
  d.setMinutes(date_time.substring(14, 16));
  return d;
};

export const formatData = (data: any) => {
  const newData: any = [];
  let timeIntervals: any = [];

  data?.availabilities
    ?.map((availability: any) => {
      return {
        days: availability?.days?.map((day: any) =>
          moment.unix(day?.unix).format("MM/DD/YYYY")
        ),
        startTime: parseIn(
          moment(availability?.startTime).format("YYYY-MM-DD HH:mm:ss")
        ),
        endTime: parseIn(
          moment(availability?.endTime).format("YYYY-MM-DD HH:mm:ss")
        ),
      };
    })
    .forEach((item: any) => {
      timeIntervals = getTimeIntervals(item.startTime, item.endTime);
      item.days.map((day: any) => {
        var d1 = new Date(day);

        for (var i = 0; i < 90; i += 7) {
          d1.setDate(d1.getDate() + 7);

          newData.push({
            day: moment(d1).format("dddd"),
            date: moment(d1).format("DD/MM/YYYY"),
          });
        }
      });
    });

  const dataWithTimeIntervals: any = [];

  newData.forEach((item: any, i: any) => {
    timeIntervals.forEach((timeInterval: any, i: any) => {
      if (timeIntervals[i + 1])
        dataWithTimeIntervals.push({
          ...item,
          startTime: timeIntervals[i],
          endTime: timeIntervals[i + 1],
        });
    });
  });

  return dataWithTimeIntervals;
};
