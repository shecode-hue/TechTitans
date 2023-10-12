export const createCalendarActivity = (activity) => {
  return {
    date: new Date(activity.dateOfActivity),
    type: "warning",
    content: activity.nameOfActivity,
  };
};
