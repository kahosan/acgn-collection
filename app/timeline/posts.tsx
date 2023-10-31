import { motion } from 'framer-motion';
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
  let _username = '';

  return (
    <motion.div
      key={Math.random()}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
          }
        }
      }}
    >
      <div className="mt-4">
        {
          data.map(post => (
            <div key={post.date} className="mb-4">
              <div className="font-bold min-w-[6.5rem] text-xl">
                {post.date}
              </div>
              <div>
                <Divider orientation="horizontal" className="my-4 max-w-[50rem]" />
                {
                  post.items.map((item, index) => {
                    const userhref = scope === 'me' ? `https://bgm.tv/user/${user.username}` : item.user.href;
                    const username = scope === 'me' ? user.username : item.user.name;

                    // 当某个用户有多条时间线时，只显示第一条的头像
                    const showAvatar = _username !== username;
                    if (index === 0 || showAvatar)
                      _username = username;

                    return (
                      <div key={index} className="flex mb-2">
                        {
                          showAvatar || index === 0
                            ? <Avatar radius="sm" className="min-w-max" src={scope === 'me' ? user.avatar.small : item.user.avatar} />
                            : <div className="min-w-[40px]" />
                        }
                        <Card
                          shadow="none"
                          className="bg-transparent relative mb-4"
                        >
                          <CardBody className="inline-flex flex-row flex-wrap items-center gap-2 py-1 px-3">
                            <Link isExternal className="min-w-max" href={userhref}>{username}</Link>
                            {item.reply.content}
                            {item.action.type}
                            {item.contents.map((content, index) => (
                              <div key={content.name}>
                                <Link isExternal href={content.url}>{content.name}</Link>
                                {item.contents.length - 1 === index ? '' : '、'}
                              </div>
                            ))}
                            {item.action.desc}
                          </CardBody>
                          <CardFooter>
                            <small className="opacity-60">{item.time}</small>
                          </CardFooter>
                        </Card>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          ))
        }
      </div>
    </motion.div>
  );
}
