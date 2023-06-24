import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { IStyledHeaderProps } from './types';

const StyledModal = styled(Modal)`
  flex: 1;
`;

const StyledModalHeader = styled.View<IStyledHeaderProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 20px;
  align-items: center;
`;

const StyledModalBody = styled.View`
  padding: 20px;
  flex: 1;
`;

const StyledModalFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

const StyledModalWrapper = styled.View`
  flex: 1;
  background-color: ${({
    theme: {
      colors: { transparency },
    },
  }) => transparency};
  align-items: center;
  justify-content: center;
`;

const StyledModalInner = styled.View`
  min-height: 30%;
  background-color: ${({
    theme: {
      colors: { white },
    },
  }) => white};
  width: ${({
    theme: {
      dimensions: { screenWidth },
    },
  }) => screenWidth - 40}px;
  border-radius: 10px;
  overflow: hidden;
`;

const StyledAction = styled.View`
  width: 47%;
`;

export {
  StyledAction,
  StyledModal,
  StyledModalBody,
  StyledModalFooter,
  StyledModalHeader,
  StyledModalInner,
  StyledModalWrapper,
};
