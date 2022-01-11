import * as React from 'react';
import { render } from 'react-dom';

import StatsComponent from '../components/stats';
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

render(
    <QueryClientProvider client={queryClient}>
        <StatsComponent />
    </QueryClientProvider>,
    document.getElementById("stats-entry"));