import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = 'de';
const initialValue = browser ? window.localStorage.getItem('langIsAumeisterOpen') ?? defaultValue : defaultValue;
 
const langStore = writable<string>(initialValue);
 
langStore.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('langIsAumeisterOpen', value);
  }
});
 
export default langStore;
