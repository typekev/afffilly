import { createRoot } from 'react-dom/client';

import '@assets/styles/tailwind.css';
import Panel from '@pages/panel/Panel';
import '@pages/panel/index.css';

function init() {
  const rootContainer = document.querySelector('#__root');
  if (!rootContainer) throw new Error("Can't find Panel root element");
  const root = createRoot(rootContainer);
  root.render(<Panel />);
}

init();
