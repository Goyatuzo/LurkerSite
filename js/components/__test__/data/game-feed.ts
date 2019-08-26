import { IGameFeedItem } from "../../../models/feed";

export const gameFeedOne: IGameFeedItem = {
    _id: '1',
    gameDetail: '',
    gameName: 'League of Legends',
    gameState: '',
    sessionEnd: (new Date(2010, 10, 10)).toISOString(),
    time: 6.1234567890
};

export const gameFeedTwo: IGameFeedItem = {
    _id: '2',
    gameDetail: 'Summoner\'s Rift',
    gameName: 'League of Legends',
    gameState: 'In Game',
    sessionEnd: (new Date(2010, 11, 10)).toISOString(),
    time: 5.987654321
}

export const gameFeed: IGameFeedItem[] = [gameFeedOne, gameFeedTwo];