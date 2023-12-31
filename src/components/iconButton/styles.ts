import styled from 'styled-components/native';

const StyledIconButton = styled.TouchableOpacity`
  border-radius: 50px;
  width: 47px;
  height: 47px;
  border: ${({
    theme: {
      colors: { white },
    },
  }) => `1px solid ${white}`};
  background: ${({
    theme: {
      colors: { transparency },
    },
  }) => transparency};
  margin-left: 10px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const StyledFavoritesIcon = styled.Image`
  width: 25px;
  height: 25px;
`;

const StyledCounterWrapper = styled.View`
  background: ${({
    theme: {
      colors: { error },
    },
  }) => error};
  padding: 5px;
  position: absolute;
  right: -10px;
  top: -10px;
  border-radius: 25px;
`;

export { StyledCounterWrapper, StyledIconButton, StyledFavoritesIcon };
