export interface IGameFeedItem {
    _id: string;
    /**
     * Any detail in the presence that is useful in differntitating different states in a single game.
     */
    gameDetail: string;
    /**
     * The name of the game.
     */
    gameName: string;
    /**
     * The state of the game, useful in differentiating various states of the game.
     */
    gameState: string;
    /**
     * The amount of time spent playing in hours.
     */
    time: number;
    /**
     * A string representation of a Python datetime. Will need to be converted to be utilized properly.
     */
    sessionEnd: string;
}