export function convertTo12HourFormat(timeString) {
    // Split the time string into hours and minutes
    let [hours, minutes] = timeString.split(':');
  
    // Convert hours to 12-hour format
    let period = 'AM';
    if (parseInt(hours) >= 12) {
      period = 'PM';
      if (parseInt(hours) > 12) {
        hours = parseInt(hours) - 12;
      }
    }
  
    hours = hours.toString().padStart(2, '0');
  
    return `${hours}:${minutes} ${period}`;
  }