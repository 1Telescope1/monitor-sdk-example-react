export function convertToLocalTime(timestamp: number): string {
  const date = new Date(timestamp);
  // 将时区调整为东八区（UTC+8）
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 24小时制
  };

  return date.toLocaleString('zh-CN', options);
}