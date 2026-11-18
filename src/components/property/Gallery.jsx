import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { imgSrc } from '../../utils/image'

export default function Gallery({ images, title }) {
  const [i, setI] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const n = images.length
  const go = useCallback((d) => setI((x) => (x + d + n) % n), [n])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, go])

  return (
    <div>
      <div className="group relative aspect-[16/10] overflow-hidden bg-stone">
        <img src={imgSrc(images[i], 1400, 875)} alt={`${title} – photo ${i + 1}`} className="h-full w-full cursor-zoom-in object-cover" onClick={() => setLightbox(true)} fetchPriority="high" />
        {n > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-white/90 text-forest opacity-100 shadow transition hover:bg-white md:opacity-0 md:group-hover:opacity-100"><ChevronLeft size={20} /></button>
            <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-white/90 text-forest opacity-100 shadow transition hover:bg-white md:opacity-0 md:group-hover:opacity-100"><ChevronRight size={20} /></button>
          </>
        )}
        <button onClick={() => setLightbox(true)} className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-forest/85 px-3 py-1.5 text-xs font-semibold text-ivory"><Expand size={13} /> {i + 1} / {n}</button>
      </div>
      {n > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={`Show photo ${idx + 1}`} className={`img-zoom aspect-[4/3] border-2 transition ${idx === i ? 'border-gold' : 'border-transparent opacity-70 hover:opacity-100'}`}>
              <img src={imgSrc(img, 300, 225)} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      {lightbox && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/92 p-4" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setLightbox(false)}>
          <button className="absolute right-4 top-4 p-2 text-white" aria-label="Close" onClick={() => setLightbox(false)}><X size={26} /></button>
          {n > 1 && <button className="absolute left-3 p-3 text-white" aria-label="Previous" onClick={(e) => { e.stopPropagation(); go(-1) }}><ChevronLeft size={34} /></button>}
          <img src={imgSrc(images[i], 1800)} alt={`${title} – photo ${i + 1}`} className="max-h-[88vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
          {n > 1 && <button className="absolute right-3 p-3 text-white" aria-label="Next" onClick={(e) => { e.stopPropagation(); go(1) }}><ChevronRight size={34} /></button>}
        </div>
      )}
    </div>
  )
}
