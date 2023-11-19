export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const keyword = searchParams.get('keyword') ?? '';
  const max_results = searchParams.get('max_results') ?? '';
  const start = searchParams.get('start') ?? '';
  const type = searchParams.get('type') ?? '';

  try {
    const res = await fetch(`https://api.bgm.tv/search/subject/${keyword}?max_results=${max_results}&start=${start}&type=${type}`);
    return Response.json(await res.json(), { status: 200 });
  } catch {
    return new Response('Legacy API 请求失败', { status: 500 });
  }
}
