export const useDateFormat = ({ date = new Date().toJSON(), format, hasTime = false, hasYear = true }) => {
  const newDate = new Date(date);

  const years = newDate.getFullYear();
  const months = String(newDate.getMonth() + 1).padStart(2, '0');
  const days = String(newDate.getDate()).padStart(2, '0');
  const hours = String(newDate.getHours()).padStart(2, '0');
  const minutes = String(newDate.getMinutes()).padStart(2, '0');

  let formatedDate = `${years}-${months}-${days}`;

  if (format) {
    formatedDate = `${newDate.toLocaleDateString('en-EN', { month: format })} ${days}`;

    if (hasYear) formatedDate += `, ${years}`;
    if (hasTime) formatedDate += `, ${hours}:${minutes}`;
  }

  return formatedDate;
};
