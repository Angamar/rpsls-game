export async function fetchRandomNumber() {
    const response = await fetch('https://codechallenge.boohma.com/random');
    if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.random_number;
}