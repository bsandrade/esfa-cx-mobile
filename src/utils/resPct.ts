import {RFPercentage} from 'react-native-responsive-fontsize';

/**
 * Responsive Percentage
 */
export const resPct = (value: number) => `${RFPercentage(value / 10)}%`;
