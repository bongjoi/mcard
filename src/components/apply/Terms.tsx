import { MouseEvent, useCallback, useState } from 'react';

import Agreement from '@shared/Agreement';
import FixedBottomButton from '@shared/FixedBottomButton';

import { termList } from '@constants/apply';
import { ApplyValues } from '@models/apply';

function Terms({ onNext }: { onNext: (terms: ApplyValues['terms']) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return termList.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false
      }),
      {}
    );
  });

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked
          }),
          {}
        );
      });
    },
    []
  );

  const isAllAgreements = Object.values(termsAgreements).every(
    (agreement) => agreement
  );

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={isAllAgreements}
          onChange={handleAllAgreement}
        >
          약관에 모두 동의
        </Agreement.Title>
        {termList.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prevTerms) => ({
                ...prevTerms,
                [id]: checked
              }));
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>

      <FixedBottomButton
        label="약관동의"
        disabled={isAllAgreements === false}
        onClick={() => {
          onNext(Object.keys(termsAgreements));
        }}
      />
    </div>
  );
}

export default Terms;
