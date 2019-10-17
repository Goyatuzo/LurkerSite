export interface IStatsReponse {
    game_names: string[];
    most_played: IMostPlayedItem[];
    played_hours: IPlayedSpan;
}

export interface IGameStatsResponse {
    past_year: IPastGameHeatmapEntry[];
}

export interface IPastGameHeatmapEntry {
    date: string;
    time: number;
}

export interface IMostPlayedItem {
    /**
     * The name of the game.
     */
    gameName: string;
    time: number;
}

export type IPlayedSpan = { t: string, y: number }[];