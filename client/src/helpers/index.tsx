import { formatDistanceToNow } from 'date-fns'

export function formatTimeSince(date: string) {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};