import * as React from 'react';
import { render } from 'react-dom';

import GameGraphTimes from './graph-times';

const el = document.getElementById("stats-entry");

render(<GameGraphTimes gameName={el.getAttribute("data-game-name")} />, el)