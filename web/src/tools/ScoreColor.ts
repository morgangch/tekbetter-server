export function getTextScoreColor(score: number): string {
    if (score < 50) {
        return "text-red-500";
    } else if (score < 70) {
        return "text-yellow-500";
    } else {
        return "text-green-500";
    }
}

export function getScoreColor(score: number): string {
    if (score < 50) {
        return "rgb(245,0,0)";
    } else if (score < 70) {
        return "yellow";
    } else {
        return "rgba(40,224,0,0.89)";
    }
}
