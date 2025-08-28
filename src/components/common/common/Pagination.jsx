
import React from 'react';
export default function Pagination({ page, totalPages, onPage }){
  return (
    <div className="flex gap-2 items-center">
      <button disabled={page<=1} onClick={()=>onPage(page-1)} className="px-2 py-1 border rounded disabled:opacity-50">Prev</button>
      <span className="text-sm">Page {page} of {totalPages}</span>
      <button disabled={page>=totalPages} onClick={()=>onPage(page+1)} className="px-2 py-1 border rounded disabled:opacity-50">Next</button>
    </div>
  );
}
