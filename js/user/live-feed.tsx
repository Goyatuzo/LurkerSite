import * as React from 'react';
import { render } from 'react-dom';

import Component from '../components/live-feed'

const element = document.getElementById('live-feed-entry');

render(<Component userId={element.getAttribute('data-user-id')} />, element)