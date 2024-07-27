import { formatDistanceToNow, parseISO } from 'date-fns';

export const dateDifference = (timestamp) => {
  const date = parseISO(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
};
