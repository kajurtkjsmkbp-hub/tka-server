const fs = require('fs');

let content = fs.readFileSync('src/app/dashboard/siswa/materi/[id]/page.tsx', 'utf8');

const labHtml = `
            {/* VIRTUAL LAB */}
            <div className="mt-12 bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl">
              <div className="bg-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-700">
                <h4 className="font-bold text-white flex items-center gap-2">
                  <span className="text-xl">💻</span> Virtual Lab Python
                </h4>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              <div className="p-4 bg-slate-900">
                <p className="text-sm text-slate-400 mb-4">Salin kode dari proyek di atas, tempel (Paste) ke dalam editor di bawah ini, lalu klik tombol ▶️ (Run) untuk melihat hasilnya!</p>
                <iframe src="https://trinket.io/embed/python3" width="100%" height="400" frameBorder="0" className="rounded-xl border border-slate-700"></iframe>
              </div>
            </div>
`;

// Insert for S2P1 (before s2-p2)
content = content.replace(
  '          </div>\\n      )\\n    },\\n    "s2-p2": {', 
  labHtml + '\\n          </div>\\n      )\\n    },\\n    "s2-p2": {'
);

// Insert for S2P2 (before default)
content = content.replace(
  '          </div>\\n      )\\n    },\\n    "default": {', 
  labHtml + '\\n          </div>\\n      )\\n    },\\n    "default": {'
);

fs.writeFileSync('src/app/dashboard/siswa/materi/[id]/page.tsx', content);
console.log('Virtual Lab injected!');
