class DateUtils {
    public static formatDate(date: Date): string {
        return date.toLocaleDateString('en', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }
}

export default DateUtils;
