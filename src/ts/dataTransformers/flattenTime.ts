
/**
 * Convert a time to minutes from midnight
 * Example: flattenTime(0800) === 480
 * @export
 * @param {number} time
 * @returns {number}
 */
export function flattenTime(time: number): number {
    const hours = parseInt((time / 100).toString(), 10);
    const minutes = time % 100;
    return hours * 60 + minutes;
}
