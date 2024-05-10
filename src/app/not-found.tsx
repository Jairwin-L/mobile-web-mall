import css from './page.module.less';

export default function NotFound() {
  return (
    <div className={css['not-found-container']}>
      NotFound
      {/* <Result
        status="404"
        title="not-found"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link href="/">Go Back</Link>}
      /> */}
    </div>
  );
}
