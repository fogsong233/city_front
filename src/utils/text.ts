export function ellipsis(text: string, limitedLength: number = 20, endStr: string = "...") {
  if (text.length <= limitedLength) return text;
  return text.slice(0, limitedLength) + endStr;
}
