import * as React from 'react';
import { render } from 'react-dom';
import {QueryClient, QueryClientProvider} from "react-query";
import {GameDetailPie} from "../components/stats/game-detail-pie";

const queryClient = new QueryClient()

declare const userId: string;
declare const gameName: string;

render(<QueryClientProvider client={queryClient}>
        <GameDetailPie detail={'gameDetail'} userId={userId} gameName={gameName} />
        <GameDetailPie detail={'gameState'} userId={userId} gameName={gameName} />
        <GameDetailPie detail={'smallAssetText'} userId={userId} gameName={gameName} />
        <GameDetailPie detail={'largeAssetText'} userId={userId} gameName={gameName} />
    </QueryClientProvider>,
    document.getElementById("game-summary-graphs"))