const correctGuessAnimation = (tileOrder: number[]) => {
    tileOrder.map((tilePosition: number) => {
        const tile = document.getElementById(`tile-${tilePosition}`);
        tile?.classList.add(styles.correctGuessAnimation);

        setTimeout(() => {

        })

        
    })
};