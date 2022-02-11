import React from 'react';
import ReactDOM from 'react-dom';
import ContextWrapper from './context/ContextWrapper';

import './index.css';
import App from './App';

ReactDOM.render(<ContextWrapper><App /></ContextWrapper>, document.getElementById('root'));
