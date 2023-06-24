import styled from 'styled-components/native';

const StyledLoader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({
    theme: {
      colors: { transparency },
    },
  }) => transparency};
`;

export { StyledLoader };
