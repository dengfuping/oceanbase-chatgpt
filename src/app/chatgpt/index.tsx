'use client';
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';
import { useEffect, useState } from 'react';

export default function Home() {
  const theme = useTheme();
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => setShowComponent(true), []);

  return (
    <div
      style={{
        backgroundColor: theme.colorBgLayout,
      }}
    >
      {showComponent && (
        <ProChat
          style={{
            height: '100vh',
            width: '100vw',
          }}
          request={async (messages) => {
            // OpenAI
            // const response = await fetch('/api/openai', {
            //   method: 'POST',
            //   body: JSON.stringify({ messages: messages }),
            // });
            // return response;
            // qwen
            // const response = await fetch('/api/qwen', {
            //   method: 'POST',
            //   body: JSON.stringify({ messages: messages }),
            // });
            // const data = await response.json();
            // return new Response(data.output?.text);
            // 自定义 API
            const response = await fetch(`/api/openai`, {
              method: 'POST',
              body: JSON.stringify({ messages: messages }),
            });
            return response;
          }}
        />
      )}
    </div>
  );
}
