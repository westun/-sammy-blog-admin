import _ from "lodash";

export function paginate(items: any[], pageSize: number, pageNumber :number) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
