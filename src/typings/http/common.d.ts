interface IBaseResp<D> {
  data?: D;
  msg?: string;
  success?: boolean;
}
interface CommonPage extends CommonRespPage {
  totalCount?: number;
}

interface CommonRespPage {
  pageIndex: number;
  pageSize: number;
}
