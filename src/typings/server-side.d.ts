interface IServerSideProps<T> {
  initData: IBaseResp<T>;
}
interface IServerSideContext {
  query: NonNullable<
    | CommonPage & {
        id: number;
      }
  >;
}
