'use client';

import { HTTPError } from '~/lib/fetcher';

export default function Error({ error }: { error: Error }) {
  return (
    <>
      <title>Error</title>
      <div className=" mt-40 max-w-xl mx-auto">
        <h2 className="font-bold text-2xl text-blue-300 mb-2">
          嘟嘟噜
          <br />
          冈伦，网页坏掉啦!
        </h2>
        <div className="opacity-75">
          报错信息在这里哦：<p className="font-mono break-words break-all">{error instanceof HTTPError ? error.data.description : error.message}</p>
        </div>
      </div>
    </>
  );
}
