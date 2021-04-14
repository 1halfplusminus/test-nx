import React from 'react';

import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface TestProps {}

const StyledTest = styled.div`
  color: pink;
`;

export function Test(props: TestProps) {
  return (
    <StyledTest>
      <h1>Welcome to test!</h1>
    </StyledTest>
  );
}

export default Test;
