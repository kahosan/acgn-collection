import { Avatar, Card, CardBody, CardFooter, Divider, Link } from '@nextui-org/react';
import Loading from '~/components/loading';
import type { Timeline, TimelineScope } from '~/types/bangumi/timeline';
import type { UserInfo } from '~/types/bangumi/user';

interface Props {
  data: Timeline | undefined
  user: UserInfo | undefined
  scope: TimelineScope
  isLoading: boolean
}

export default function TimelinePosts({ data, user, scope, isLoading }: Props) {
  if (!data || !user || isLoading) return <Loading />;
  let avatar = '';

  return (
    <div className="mt-4">
      {data.map(post => (
        <div key={post.date} className=" mb-4">
          <div className="font-bold min-w-[6.5rem] text-xl">
            {post.date}
          </div>
          <div className="">
            <Divider orientation="horizontal" className="my-4 max-w-[50rem]" />
            <div>
              {post.items.map((item, index) => {
                const showAvatar = avatar !== (scope === 'me' ? user.avatar.small : item.user.avatar)
                  || avatar.includes('user/l/icon.jpg'); // default avatar

                if (showAvatar || index === 0) avatar = scope === 'me' ? user.avatar.small : item.user.avatar;

                const userHref = scope === 'me' ? item.user.href.replace(/user\/d+/, user.username) : item.user.href;
                const username = scope === 'me' ? user.username : item.user.name;
                return (
                  <div key={item.time} className="flex mb-2">
                    {
                      showAvatar || index === 0
                        ? <Avatar radius="sm" className="min-w-max" src={avatar} />
                        : <div className="min-w-[40px]" />
                    }
                    <Card
                      shadow="none"
                      className="bg-transparent relative mb-4"
                    >
                      <CardBody className="inline-flex flex-row flex-wrap items-center gap-2 py-1 px-3">
                        <Link isExternal className="min-w-max" href={userHref}>{username}</Link>
                        {item.reply.content}
                        {item.action.type}
                        {item.contents.map(content => (
                          <Link isExternal key={content.name} href={content.url}>{content.name}</Link>
                        ))}
                        {item.action.desc}
                      </CardBody>
                      <CardFooter>
                        <small className="opacity-60">{item.time}</small>
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
