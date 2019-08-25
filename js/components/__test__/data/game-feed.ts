import { IGameFeedItem } from "../../../models/feed";

export const gameFeedOne: IGameFeedItem = {
    _id: '1',
    gameDetail: '',
    gameName: 'League of Legends',
    gameState: '',
    sessionEnd: (new Date(2010, 10, 10)).toISOString(),
    time: 600
};