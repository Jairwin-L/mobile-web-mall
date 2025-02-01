interface IBaseResp<D> {
  data: D;
  msg: string;
  success?: boolean;
  loading?: boolean;
}
interface CommonPage {
  pageIndex: number;
  pageSize?: number;
  totalCount?: number;
}
