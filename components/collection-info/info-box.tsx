import { Divider } from '@nextui-org/react';

import clsx from 'clsx';

interface Props {
  infos: Array<{
    key: string
    value: string | Array<Record<'v', string>>
  }>
  className?: string
}
export default function InfoBox({ infos, className }: Props) {
  return infos.map(info => (
    <div key={info.key} className={clsx('', className)}>
      <div className="opacity-60 text-sm">{info.key}：</div>
      <div className="text-sm">
        {
          Array.isArray(info.value)
            ? info.value.map(item => item.v)
            : info.value
        }
      </div>
      <Divider className="my-2 opacity-20" />
    </div>
  ));
}
