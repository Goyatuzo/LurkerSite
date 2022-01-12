import * as React from 'react';
import { render } from 'react-dom';
import {QueryClient, QueryClientProvider} from "react-query";
import {GameDetailPie} from "../components/stats/game-detail-pie";

const queryClient = new QueryClient()

declare const userId: string;
declare const gameName: string;

render(<QueryClientProvider client={queryClient}>
        <div className="ui four column stackable grid">
                <div className="column">
                        <GameDetailPie detail={'gameDetail'} userId={userId} gameName={gameName} />
                </div>
                <div className="column">
                        <GameDetailPie detail={'gameState'} userId={userId} gameName={gameName} />
                </div>
                <div className="column">
                        <GameDetailPie detail={'smallAssetText'} userId={userId} gameName={gameName} />\
                </div>
                <div className="column">
                        <GameDetailPie detail={'largeAssetText'} userId={userId} gameName={gameName} />
                </div>
        </div>
    </QueryClientProvider>,
    document.getElementById("game-summary-graphs"))