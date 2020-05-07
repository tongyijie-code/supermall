import dayjs from "dayjs";

/**
 *
 * @param time
 * @param format
 * @returns {string}
 */
export function timeFormatter(time, format='YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format);
}
