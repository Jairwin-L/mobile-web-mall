'use client';
import { Button } from 'antd-mobile';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p>{JSON.stringify(error)}</p>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}
