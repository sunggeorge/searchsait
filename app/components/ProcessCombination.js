export default function ProcessCombination({combination}) {
    
    // Eliminate duplicate elements based on the "course" property
    const uniqueCombinations = combination.reduce((acc, current) => {
        const x = acc.find(item => item.course === current.course);
        if (!x) {
        return acc.concat([current]);
        } else {
        return acc;
        }
    }, []);        

    // if (uniqueCombinations.length !== combination.length) {
    //     setCombination(uniqueCombinations);
    // }    
    
    return (
        <div>
            <h1>Combination</h1>
            <ul>
                {uniqueCombinations.map((item, index) => (
                    <li key={index}>{item.course}</li>
                ))}
            </ul>
        </div>
    );
}