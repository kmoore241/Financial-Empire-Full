
/**
 * Placeholder news service. Replace with real API calls.
 * Returns a promise that resolves to a list of items.
 */
export default {
  async search(query=''){
    await new Promise(r => setTimeout(r, 200));
    const items = [
      { id:1, title:'Markets steady ahead of CPI', source:'Wire', time:'Today' },
      { id:2, title:'Tech leads broad gains', source:'Wire', time:'Yesterday' },
      { id:3, title:'Fed minutes eyed by traders', source:'Wire', time:'This week' },
    ];
    return items.filter(i => i.title.toLowerCase().includes(query.toLowerCase()));
  }
}
