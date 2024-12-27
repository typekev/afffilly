import { Suspense } from 'react';

import { Loader2 } from 'lucide-react';
import { createRoot } from 'react-dom/client';

import '@assets/styles/tailwind.css';
import Popup from '@pages/popup/Popup';
import '@pages/popup/index.css';

function init() {
  const rootContainer = document.querySelector('#__root');
  if (!rootContainer) throw new Error("Can't find Popup root element");
  const root = createRoot(rootContainer);
  root.render(
    <Suspense fallback={<Loading />}>
      <Popup />
    </Suspense>,
  );
}

function Loading() {
  return (
    <div className="text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
      <strong className="mt-6 text-sm text-gray-600">Loading Afffilly...</strong>
    </div>
  );
}

init();
