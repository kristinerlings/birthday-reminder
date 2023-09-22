import { useBirthdayStore } from '../store/useBirthdayStore';


export function useUpcomingBirthdays() {
  const { data } = useBirthdayStore();

  const sortedData = [...data].sort((a, b) => {
    if (a.date && b.date) {
      if (a.date.getMonth() !== b.date.getMonth()) {
        return a.date.getMonth() - b.date.getMonth();
      }
      return a.date.getDate() - b.date.getDate();
    } else if (a.date) {
      return -1; 
    } else if (b.date) {
      return 1; 
    }
    return 0; 
  });

  const today = new Date();
  const upcomingBirthdays = sortedData.filter(
    (birthday) =>
      birthday.date &&
      (birthday.date.getMonth() > today.getMonth() ||
        (birthday.date.getMonth() === today.getMonth() &&
          birthday.date.getDate() > today.getDate()))
  );

  return upcomingBirthdays;
}