interface IServerSideProps<T> {
  data: IBaseResp<T>;
}
interface IServerSideContext {
  query?: NonNullable<
    | CommonPage & {
        id: number;
      }
  >;
  resolvedUrl?: string;
}
