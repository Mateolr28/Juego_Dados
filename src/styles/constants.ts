export const cardStyles = {
  base: "bg-white border border-stone-200 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col h-full",
  dark: "bg-stone-900 text-white rounded-3xl p-5 md:p-6 shadow-xl flex flex-col h-full border border-stone-800",
  dashed: "border-2 border-dashed border-stone-200 rounded-3xl p-6 flex flex-col items-center justify-center text-stone-400 hover:border-stone-400 hover:text-stone-600 transition-all min-h-[200px] md:min-h-[300px]",
};

export const buttonStyles = {
  primary: "flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-stone-900 text-white rounded-full font-bold shadow-lg hover:bg-stone-800 transition-all disabled:opacity-50 text-sm md:text-base",
  secondary: "flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white border border-stone-200 text-stone-900 rounded-full font-bold shadow-sm hover:bg-stone-50 transition-all disabled:opacity-50 text-sm md:text-base",
  icon: "p-2 rounded-xl transition-colors",
  add: "p-2 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors",
  addLight: "p-2 bg-white text-stone-900 rounded-xl hover:bg-stone-100 transition-colors",
};

export const inputStyles = {
  base: "flex-1 bg-stone-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-stone-200 outline-none",
  dark: "flex-1 bg-stone-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-stone-700 outline-none text-white",
};

export const listStyles = {
  item: "flex justify-between items-center bg-stone-50 px-3 py-2 rounded-xl border border-stone-100 group",
  itemDark: "flex justify-between items-center bg-stone-800 px-3 py-2 rounded-xl border border-stone-700 group",
  deleteBtn: "text-stone-400 hover:text-stone-600 md:opacity-0 md:group-hover:opacity-100 transition-all p-1 touch-manipulation",
  deleteBtnDark: "text-stone-500 hover:text-stone-300 md:opacity-0 md:group-hover:opacity-100 transition-all p-1 touch-manipulation",
};
