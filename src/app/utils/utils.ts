

export function getDataDiff(startDate: Date, endDate: Date) {
  var diff = endDate.getTime() - startDate.getTime();
  var days = Math.floor(diff / (60 * 60 * 24 * 1000));
  var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
  var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
  var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
  return { day: days, hour: hours, minute: minutes, second: seconds };
}
