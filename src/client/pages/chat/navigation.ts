import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export function useChatNavigation() {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      toChat: () => {
        console.log('navigate to chat');
        return navigate('/chat');
      },
    }),
    [navigate],
  );
}
