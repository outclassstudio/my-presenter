export function formatToMin(date) {
  const dayInms = 1000 * 60 * 60 * 24;
  const hourInms = 1000 * 60 * 60;
  const MinInms = 1000 * 60;
  const time = new Date(Number(date)).getTime();

  if (time / MinInms < 1) {
    const answer = time / 1000;
    return `${answer}초`;
  } else {
    const answer = time / MinInms;
    return `${answer}분`;
  }
}
