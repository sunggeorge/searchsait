// utils/getTimeAgo.js
export function getTimeAgo(dateTime) {
    // Parse the date-time string
    const updateTime = new Date(dateTime);
    const now = new Date();

    // Calculate the time difference in milliseconds
    const timeDiff = now - updateTime;

    // Convert milliseconds to seconds, minutes, hours, days, and weeks
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    // Determine the appropriate time ago string
    if (weeks > 0) {
        return `Class data updated: ${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `Class data updated: ${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `Class data updated: ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `Class data updated: ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `Class data updated just now`;
    }
}