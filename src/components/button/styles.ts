import styled from 'styled-components/native';
import { IStyledButtonProps } from './types';

const StyledButton = styled.TouchableOpacity<IStyledButtonProps>`
  width: 100%;
  background-color: ${({ theme: { colors: sunny }, backgroundColor }) =>
    backgroundColor || sunny};

  height: 55px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export { StyledButton };
