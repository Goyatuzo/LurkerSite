import * as React from 'react';
import { render } from 'react-dom';
import {QueryClient, QueryClientProvider} from "react-query";
import {GameDetailPie} from "../components/stats/game-detail-pie";

const queryClient = new QueryClient()

render(<QueryClientProvider client={queryClient}>
        <GameDetailPie detail={'gameDetail'} userId='111703434985529344' gameName='FINAL FANTASY XIV' />
    </QueryClientProvider>,
    document.getElementById("game-summary-graphs"))