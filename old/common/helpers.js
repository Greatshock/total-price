import { Colors } from './colors';

export function getTotalPriceSeverityColor (price, limit) {
    if (!limit) {
        return Colors.GrassGreen;
    }

    const percentage = Math.round(price / limit * 100);
    if (percentage < 30) {
        return Colors.GrassGreen;
    } else if (percentage < 50) {
        return Colors.YellowDiamond;
    } else if (percentage < 75) {
        return Colors.FlushOrange;
    } else {
        return Colors.Amarant;
    }
}
