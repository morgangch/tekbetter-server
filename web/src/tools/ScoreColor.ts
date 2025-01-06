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
        return "red";
    } else if (score < 70) {
        return "yellow";
    } else {
        return "green";
    }
}
