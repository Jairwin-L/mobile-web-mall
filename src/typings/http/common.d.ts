interface IBaseResp<D> {
  data?: D;
  meta?: CommonPage;
  msg?: string;
  success?: boolean;
  loading?: boolean;
}
interface CommonPage extends CommonRespPage {
  totalCount?: number;
}

interface CommonRespPage {
  pageIndex: number;
  pageSize: number;
}
