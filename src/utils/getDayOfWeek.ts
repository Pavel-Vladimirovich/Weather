export const getDayOfWeek = (dateString: string) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateString);
    const dayIndex = date.getDay(); // Возвращает индекс дня недели (0 - воскресенье, 1 - понедельник, и так далее)
    return daysOfWeek[dayIndex];
}