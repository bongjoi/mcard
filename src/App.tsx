import { css } from '@emotion/react';
import styled from '@emotion/styled';
import logo from './logo.svg';
import './App.css';

import Text from '@shared/Text';

function App() {
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
    </div>
  );
}

export default App;
