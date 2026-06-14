export function formatDate(dateString) {
    const date =new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function truncateText(text, maxLength = 160) {
        if(!text) return '';
        if(text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
}
