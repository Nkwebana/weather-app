import styled from 'styled-components/native';

const StyledLocations = styled.View`
  background: ${({
    theme: {
      colors: { transparency },
    },
  }) => transparency};
  padding: 20px;
  flex: 1;
`;

const StyledLocationTitle = styled.Text`
  color: ${({
    theme: {
      colors: { white },
    },
  }) => white};
  font-size: 15px;
`;

const StyledLocation = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-color: ${({
    theme: {
      colors: { white50 },
    },
  }) => white50};
  padding: 20px 0;
  flex: 1;
`;

const StyledLocationWrapper = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export {
  StyledLocation,
  StyledLocationTitle,
  StyledLocations,
  StyledLocationWrapper,
};
