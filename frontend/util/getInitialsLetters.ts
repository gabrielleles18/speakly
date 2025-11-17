// Função para extrair as iniciais do nome
export default function getInitialsLetters(name: string | undefined): string {
    if (!name) return '';

    const words = name
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);

    if (words.length === 0) return '';
    if (words.length === 1) return words[0].charAt(0).toUpperCase();

    // Retorna primeira letra do primeiro nome e primeira letra do último sobrenome
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}