import { seedDatabase } from '@/utils/db/seed';

console.log('background script loaded');

chrome.runtime.onInstalled.addListener(() => seedDatabase());
