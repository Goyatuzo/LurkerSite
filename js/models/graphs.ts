export interface IStatsReponse {
    game_names: string[];
    most_played: IMostPlayedItem[];
    played_hours: IPlayedHoursItem[];
}

export interface IMostPlayedItem {
    /**
     * The name of the game.
     */
    gameName: string;
    time: number;
}

export interface IPlayedHoursItem {
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
     * A string representation of a Python datetime. Will need to be converted to be utilized properly.
     */
    sessionEnd: string;
    sessionBegin: string;
    userId: string;
}