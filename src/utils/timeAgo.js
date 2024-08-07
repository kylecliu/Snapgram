export function timeAgo(seconds) {
    const now = Date.now();
    const diffInSeconds = Math.floor((now  - seconds)/1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count > 0) {

            if (count < 30 && interval.label == 'second') {

                return 'just now'
            }

            return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
        }
    }

    return '';
}
