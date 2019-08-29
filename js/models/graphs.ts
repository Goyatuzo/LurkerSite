export interface IStatsReponse {
    game_names: string[];
    most_played: IMostPlayedItem[];
    played_hours: IPlayedSpanItem;
}

export interface IMostPlayedItem {
    /**
     * The name of the game.
     */
    gameName: string;
    time: number;
}

export type IPlayedSpanItem = { [isoDate: string]: { y: number } };