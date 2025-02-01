declare namespace IQueryData {
  type Banner = Array<{
    id: number;
    imgUrl: string;
  }>;
  type CategoryNav = Array<{
    icon: string;
    label: string;
  }>;
  interface Resp {
    banners: Banner;
    categoryNav?: CategoryNav;
  }
}
