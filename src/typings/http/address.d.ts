declare namespace IQueryAddress {
  type List = ListItem[];
  interface ListItem {
    id: number;
    username?: string;
    mobile?: string;
    code?: string[];
  }
  interface QueryParam extends CommonPage {
    name?: string;
  }
  interface Param {
    name: string;
  }
  interface DetailParam {
    id: number;
  }
  interface EditParam extends Param {
    id: number;
  }
  interface DelParam {
    id: number;
  }
  interface Model {
    id?: string;
    formModel?: ListItem;
  }
  type Resp = List;
}
