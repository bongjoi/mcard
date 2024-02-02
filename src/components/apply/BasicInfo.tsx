import { ChangeEvent, useCallback, useState } from 'react';

import Select from '@shared/Select';
import FixedBottomButton from '@shared/FixedBottomButton';

import { ApplyValues } from '@models/apply';

import {
  salaryOptions,
  creditScoreOptions,
  payDateOptions
} from '@constants/apply';

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>;

function BasicInfo({ onNext }: { onNext: (infoValues: InfoValues) => void }) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: ''
  });

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  }, []);

  const isAllSelected = Object.values(infoValues).every((value) => value);

  return (
    <div>
      <Select
        name="salary"
        label="연소득"
        options={salaryOptions}
        placeholder={salaryOptions[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={creditScoreOptions}
        placeholder={creditScoreOptions[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={payDateOptions}
        placeholder={payDateOptions[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />

      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(infoValues);
        }}
        disabled={isAllSelected === false}
      />
    </div>
  );
}

export default BasicInfo;
