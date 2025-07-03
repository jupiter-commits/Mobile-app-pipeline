import {TextStyle, ViewStyle} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '../../utils';

export const $container: ViewStyle = {
  marginBottom: verticalScale(10),
};
export const $labelHeading: TextStyle = {
  fontSize: moderateScale(42),
};
export const $labelSummary: TextStyle = {
  fontSize: moderateScale(13),
  lineHeight: moderateScale(22),
};
export const $labelContainer: ViewStyle = {
  paddingTop: verticalScale(20),
};
export const $card: ViewStyle = {
  marginHorizontal: horizontalScale(50),
  borderRadius: moderateScale(20),
  shadowColor: '#D8E8CD',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};
