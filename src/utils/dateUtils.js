import { utcToZonedTime, format } from 'date-fns-tz'

export const getCurrentDateInUserTimezone = () => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const dateInUserTz = utcToZonedTime(new Date(), userTimezone);

    const dateString = format(dateInUserTz, 'dd/MM/yyyy', { timeZone: userTimezone });

    return dateString;
};

export const getCurrentDateInUserTimezoneDateFormat = () => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return utcToZonedTime(new Date(), userTimezone);
};