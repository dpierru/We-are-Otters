export default class Utils {
    static angleBetween(dx, dy) {
        return Math.atan2(dy, dx);
    }


    static clampAngle(angle, targetAngle, maxDelta) {
        let diff = targetAngle - angle;

        // normalisation [-PI, PI]
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));

        if (diff > maxDelta) diff = maxDelta;
        if (diff < -maxDelta) diff = -maxDelta;

        return angle + diff;
    }

    static limit(x, y, max) {
        const mag = Math.sqrt(x * x + y * y);
        if (mag > max) {
            x = (x / mag) * max;
            y = (y / mag) * max;
        }
        return { x, y };
    }
}