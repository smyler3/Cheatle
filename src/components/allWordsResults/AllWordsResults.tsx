// import { useFetchedData } from "../../hooks/fetchedData/useFetchedData";

export default function AllWordsResults() {
    // const { validWords } = useFetchedData();

    // const sortedWords = new Map();

    // // Memo this as it's quite expensive I think? and can we get it into a single definition + creation?
    // validWords.map((text, value) => {
    //     if (sortedWords.has(value)) {
    //         sortedWords[value].append(text);
    //     }
    //     else {
    //         sortedWords[value] = [text];
    //     }
    // })

    return (
        <div>
            <p>Total words (40 / 100) </p>
            {/* {sortedWords.forEach((value) => {
                return (
                    <section>
                        <p>{value} points (3/6)</p>
                        <ul>
                            <li>Hemler</li>
                            <li>Smither</li>
                            <li>Hemler</li>
                            <li>Smither</li>
                            <li>Hemler</li>
                            <li>Smither</li>
                        </ul>
                    </section>
                )
            })} */}
        </div>
    )
}