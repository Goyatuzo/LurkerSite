export interface IStatsReponse {
    game_names: string[];
    most_played: IMostPlayedItem[];
    played_hours: IPlayedSpan;
}

export interface IMostPlayedItem {
    /**
     * The name of the game.
     */
    gameName: string;
    time: number;
}

export type IPlayedSpan = { [isoDate: string]: { y: number } };