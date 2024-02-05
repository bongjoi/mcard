import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import FullPageLoader from '@shared/FullPageLoader';

import Apply from '@components/apply';
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation';
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus';
import { updateApplyCard } from '@remote/apply';
import { APPLY_STATUS } from '@models/apply';
import useUser from '@hooks/auth/useUser';
import useAppliedCard from '@components/apply/hooks/useAppliedCard';
import { useAlertContext } from '@contexts/AlertContext';

function ApplyPage() {
  const navigate = useNavigate();

  const { open } = useAlertContext();

  const [readyToPoll, setReadyToPoll] = useState(false);

  const user = useUser();
  const { id } = useParams() as { id: string };

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied === null || applied === undefined) {
          return;
        }

        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              window.history.back();
            }
          });

          return;
        }

        setReadyToPoll(true);
      },
      onError: () => {},
      suspense: true
    }
  });

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE
        }
      });

      navigate('/apply/done?success=true', {
        replace: true
      });
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT
        }
      });

      navigate('/apply/done?success=false', {
        replace: true
      });
    },
    enabled: readyToPoll
  });

  const { mutate, isLoading } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true);
    },
    onError: () => {
      window.history.back();
    }
  });

  if (
    data !== null &&
    data !== undefined &&
    data.status === APPLY_STATUS.COMPLETE
  ) {
    return null;
  }

  if (readyToPoll || isLoading) {
    return <FullPageLoader message="카드를 신청중입니다" />;
  }

  return <Apply onSubmit={mutate} />;
}

export default ApplyPage;
