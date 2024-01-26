import { css } from '@emotion/react';
import styled from '@emotion/styled';
import logo from './logo.svg';
import './App.css';

import Text from '@shared/Text';
import Button from '@shared/Button';
import Input from '@shared/Input';
import TextField from '@shared/TextField';
import Alert from '@shared/Alert';

import { useAlertContext } from '@contexts/AlertContext';

function App() {
  const { open } = useAlertContext();

  return (
    <div>
      <Text typography="t1" display="block" color="red">
        t1
      </Text>
      <Text typography="t2" color="blue">
        t2
      </Text>
      <Text typography="t3">t3</Text>
      <Text typography="t4">t4</Text>
      <Text typography="t5">t5</Text>
      <Text typography="t6">t6</Text>
      <Text typography="t7">t7</Text>

      <div style={{ height: 10, width: '100%', backgroundColor: '#efefef' }} />

      <Button>클릭해주세요</Button>
      <Button color="success">클릭해주세요</Button>
      <Button color="error">클릭해주세요</Button>
      <Button color="success" weak={true}>
        클릭해주세요
      </Button>
      <Button color="error" weak={true}>
        클릭해주세요
      </Button>
      <Button full={true}>클릭해주세요</Button>
      <Button full={true} disabled={true}>
        클릭해주세요
      </Button>

      <div style={{ height: 10, width: '100%', backgroundColor: '#efefef' }} />

      <Input placeholder="로그인" aria-invalid={false} />
      <Input aria-invalid={true} />

      <TextField label="아이디" />
      <TextField
        label="패스워드"
        hasError={true}
        helpMessage="패스워드를 입력해 주세요."
      />

      <div style={{ height: 10, width: '100%', backgroundColor: '#efefef' }} />

      {/* <Alert
        open={true}
        title="얼럿이 떳습니다."
        description="안녕하세요"
        onButtonClick={() => {}}
      /> */}

      <Button
        onClick={() => {
          open({
            title: '카드신청완료',
            description: '내역페이지에서 확인해주세요',
            onButtonClick: () => {}
          });
        }}
      >
        Alert오픈
      </Button>
    </div>
  );
}

export default App;
