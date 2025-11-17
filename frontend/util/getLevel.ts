export default function getLevel(sentences: number) {
    if (sentences <= 0) {
        return 'Beginner';
    } else if (sentences < 100) {
        return 'Beginner +';
    } else if (sentences < 200) {
        return 'Beginner ++';
    } else if (sentences < 500) {
        return 'Intermediate';
    } else if (sentences < 1000) {
        return 'Intermediate +';
    } else if (sentences < 1500) {
        return 'Intermediate ++';
    } else if (sentences < 2000) {
        return 'Advanced';
    } else if (sentences < 2500) {
        return 'Advanced +';
    } else if (sentences < 3000) {
        return 'Advanced ++';
    } else if (sentences < 3500) {
        return 'Expert';
    } else if (sentences < 4000) {
        return 'Expert +';
    } else if (sentences < 5000) {
        return 'Expert ++';
    } else {
        return 'Master';
    }
};