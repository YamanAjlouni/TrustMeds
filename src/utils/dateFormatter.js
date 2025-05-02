/**
 * Format date based on the current language
 * @param {string} dateString - The date string in format YYYY-MM-DD
 * @param {string} language - The language code (en, ar)
 * @returns {string} - The formatted date string
 */
export const formatDate = (dateString, language) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return dateString; // Return original string if invalid date
    }

    if (language === 'ar') {
        // Arabic date format
        // Note: we're using Arabic numerals and month names
        const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        const arabicMonths = [
            'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
            'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
        ];

        const day = date.getDate().toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
        const month = arabicMonths[date.getMonth()];
        const year = date.getFullYear().toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');

        return `${day} ${month} ${year}`;
    } else {
        // English date format (default)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
};

/**
 * Format time based on the current language
 * @param {string} timeString - The time string in format HH:MM or HH:MM:SS
 * @param {string} language - The language code (en, ar)
 * @returns {string} - The formatted time string
 */
export const formatTime = (timeString, language) => {
    if (!timeString) return '';

    // Parse the time string
    const [hours, minutes] = timeString.split(':').map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
        return timeString; // Return original string if invalid format
    }

    if (language === 'ar') {
        // Arabic time format with Arabic numerals
        const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        const period = hours >= 12 ? 'م' : 'ص';
        const hour12 = hours % 12 || 12;

        const formattedHour = hour12.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
        const formattedMinutes = minutes.toString().padStart(2, '0').split('').map(d => arabicNumerals[parseInt(d)]).join('');

        return `${formattedHour}:${formattedMinutes} ${period}`;
    } else {
        // English time format (default)
        const period = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12;

        return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
};

/**
 * Format date and time together based on the current language
 * @param {string} dateTimeString - The date-time string in format YYYY-MM-DD HH:MM:SS
 * @param {string} language - The language code (en, ar)
 * @returns {string} - The formatted date and time string
 */
export const formatDateTime = (dateTimeString, language) => {
    if (!dateTimeString) return '';

    // Split into date and time parts
    const [datePart, timePart] = dateTimeString.split(' ');

    if (!datePart || !timePart) {
        return dateTimeString; // Return original if format doesn't match expected
    }

    const formattedDate = formatDate(datePart, language);
    const formattedTime = formatTime(timePart, language);

    if (language === 'ar') {
        // Arabic format: Time followed by Date
        return `${formattedTime} - ${formattedDate}`;
    } else {
        // English format: Date followed by Time
        return `${formattedDate} at ${formattedTime}`;
    }
};

export default {
    formatDate,
    formatTime,
    formatDateTime
};