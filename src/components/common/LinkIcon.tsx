export const LinkIcon = ({ src, alt, href, text, desktop = false }: { src: string; alt: string; href: string, text: string, desktop?: boolean}) => (
  <a
    className={`flex flex-col justify-center items-center ${desktop ? ' w-full' : ''}`}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img className="max-w-12 max-h-12" src={src} alt={alt} />
    <span className="text-xs text-slate-200 italic underline">{text}</span>
  </a>
)