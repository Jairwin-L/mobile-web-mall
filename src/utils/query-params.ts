export function getQueryParams(params: any) {
  const search: any = {};
  const searchArray: any = [];
  console.log('status----->：', status);
  for (const [key, value] of new URLSearchParams(params)) {
    searchArray.push({
      label: key,
      value,
    });
    for (const item in searchArray) {
      search[searchArray[item].label] = searchArray[item].value;
    }
  }
  return search;
}
