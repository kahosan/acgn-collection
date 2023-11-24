import { Link } from '@nextui-org/react';

export default function LoginError() {
  return (
    <div className=" mt-40 max-w-xl mx-auto">
      <h2 className="font-bold text-2xl text-blue-300 mb-2">
        嘟嘟噜
        <br />
        冈伦，登入失败啦!
      </h2>
      <Link color="foreground" href="/login" showAnchorIcon>返回登入页面</Link>
    </div>
  );
}
