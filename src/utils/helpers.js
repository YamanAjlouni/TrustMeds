// utils/helpers.js

// Function to get initials for avatar placeholder
export const getInitials = (name) => {
    if (!name) return "?";
    return name.split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase();
};

// Function to get color based on patient name (for consistent avatar colors)
export const getAvatarColor = (name) => {
    if (!name) return "#cccccc";

    // Generate a hash from the name 
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert to RGB color
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).slice(-2);
    }

    return color;
};

// Get the status color class
export const getStatusColorClass = (status) => {
    switch (status) {
        case 'urgent': return 'status-urgent';
        case 'follow-up': return 'status-follow-up';
        case 'stable': return 'status-stable';
        case 'med-adjust': return 'status-med-adjust';
        default: return '';
    }
};