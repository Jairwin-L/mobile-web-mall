interface IBaseResp<D> {
  data?: D;
  meta?: CommonPage;
  msg?: string;
  success?: boolean;
  loading?: boolean;
}
interface CommonPage {
  pageIndex: number;
  pageSize?: number;
  totalCount?: number;
}
