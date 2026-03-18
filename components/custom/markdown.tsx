import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkBreaks from "remark-breaks"
import rehypeRaw from "rehype-raw"
import rehypeKatex from "rehype-katex"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

interface MarkdownRendererProps {
  content: string
  className?: string
}

// Amber theme colors (matching the church app style)
const colors = {
  text: "text-white/50 text-base leading-relaxed",
  textMuted: "text-gray-600",
  textLight: "text-gray-500",
  heading: "text-white",
  link: "text-[#c9a55a] hover:font-medium text-[#c9a55a]-900",
  codeBg: "bg-[#c9a55a]-50",
  codeText: "text-[#c9a55a]-700",
  blockquoteBorder: "border-[#c9a55a]",
  blockquoteBg: "bg-gray-800",
  blockquoteText: "text-gray-700",
  tableBorder: "border-[#c9a55a]-200",
  tableHeaderBg: "bg-[#c9a55a]-50",
  tableHover: "hover:bg-[#c9a55a]-50/50",
  hrColor: "border-[#c9a55a]-200",
  markBg: "bg-[#c9a55a]-200",
  detailsBg: "bg-[#c9a55a]-50",
  detailsBorder: "border-[#c9a55a]-200",
}


export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
        rehypePlugins={[
          rehypeRaw, 
          rehypeKatex, 
          rehypeHighlight,
          rehypeSlug
        ]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className={`mb-6 mt-10 text-3xl font-bold tracking-tight first:mt-0 sm:text-4xl ${colors.heading}`}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className={`mb-4 mt-10 text-2xl font-bold tracking-tight sm:text-3xl ${colors.heading}`}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className={`mb-3 mt-8 text-xl font-bold tracking-tight sm:text-2xl ${colors.heading}`}>
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className={`mb-2 mt-6 text-lg font-bold sm:text-xl ${colors.heading}`}>
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className={`mb-2 mt-4 text-base font-bold sm:text-lg ${colors.heading}`}>
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className={`mb-2 mt-4 text-sm font-bold sm:text-base ${colors.heading}`}>
              {children}
            </h6>
          ),

          // Paragraph
          p: ({ children }) => (
            <p className={`mb-5 text-base leading-7 ${colors.text}`}>
              {children}
            </p>
          ),

          // Strong/Bold
          strong: ({ children }) => (
            <strong className={`font-semibold ${colors.heading}`}>{children}</strong>
          ),

          // Emphasis/Italic
          em: ({ children }) => (
            <em className={`italic ${colors.text}`}>{children}</em>
          ),

          // Strikethrough (del)
          del: ({ children }) => (
            <del className={`line-through ${colors.textLight}`}>{children}</del>
          ),

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("#") ? undefined : "_blank"}
              rel={href?.startsWith("#") ? undefined : "noopener noreferrer"}
              className={`transition-colors duration-200 ${colors.link}`}
            >
              {children}
            </a>
          ),

          // Images
          img: ({ src, alt, title }) => (
            <figure className="my-8">
              <img
                src={src}
                alt={alt || ""}
                title={title}
                className="mx-auto max-w-full rounded-xl shadow-md"
                loading="lazy"
              />
              {alt && (
                <figcaption className={`mt-3 text-center text-sm ${colors.textLight}`}>
                  {alt}
                </figcaption>
              )}
            </figure>
          ),

          // Unordered List
          ul: ({ children, className }) => {
            const isTaskList = className?.includes("contains-task-list")
            return (
              <ul className={`my-5 ${colors.text} ${isTaskList ? "list-none ml-0" : "list-disc ml-6"}`}>
                {children}
              </ul>
            )
          },

          // Ordered List
          ol: ({ children, start }) => (
            <ol start={start} className={`my-5 ml-6 list-decimal ${colors.text}`}>
              {children}
            </ol>
          ),

          // List Item
          li: ({ children, className }) => {
            const isTaskListItem = className?.includes("task-list-item")
            return (
              <li className={`leading-7 ${isTaskListItem ? "flex items-start gap-2" : ""}`}>
                {children}
              </li>
            )
          },

          // Checkbox input for task lists
          input: ({ type, checked, disabled }) => {
            if (type === "checkbox") {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  readOnly
                  className="mt-1.5 h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                />
              )
            }
            return <input type={type} />
          },

          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className={`my-6 border-l-4 py-3 pl-6 pr-4 ${colors.blockquoteBorder} ${colors.blockquoteBg} ${colors.blockquoteText}`}>
              {children}
            </blockquote>
          ),

          // Horizontal Rule
          hr: () => (
            <hr className={`my-10 border-t ${colors.hrColor}`} />
          ),

          // Code (inline and block)
          code: ({ children, className, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            const isInline = !match && !className
            
            if (isInline) {
              return (
                <code className={`rounded px-1.5 py-0.5 text-sm font-mono ${colors.codeBg} ${colors.codeText}`}>
                  {children}
                </code>
              )
            }
            
            return (
              <code className={`${className || ""} block font-mono text-sm`} {...props}>
                {children}
              </code>
            )
          },

          // Pre (code block wrapper)
          pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm text-gray-100">
              {children}
            </pre>
          ),

          // Table
          table: ({ children }) => (
            <div className={`my-6 overflow-x-auto rounded-xl border ${colors.tableBorder}`}>
              <table className="min-w-full border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className={colors.tableHeaderBg}>{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className={`divide-y ${colors.tableBorder}`}>{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className={`transition-colors ${colors.tableHover}`}>{children}</tr>
          ),
          th: ({ children, style }) => (
            <th className={`px-4 py-3 text-left text-sm font-semibold ${colors.heading}`} style={style}>
              {children}
            </th>
          ),
          td: ({ children, style }) => (
            <td className={`px-4 py-3 text-sm ${colors.text}`} style={style}>
              {children}
            </td>
          ),

          // Superscript
          sup: ({ children }) => (
            <sup className={`text-xs ${colors.textMuted}`}>{children}</sup>
          ),

          // Subscript
          sub: ({ children }) => (
            <sub className={`text-xs ${colors.textMuted}`}>{children}</sub>
          ),

          // Abbreviation
          abbr: ({ children, title }) => (
            <abbr
              title={title}
              className={`cursor-help border-b border-dotted ${colors.tableBorder} ${colors.text}`}
            >
              {children}
            </abbr>
          ),

          // Definition list
          dl: ({ children }) => (
            <dl className="my-5 space-y-4">{children}</dl>
          ),
          dt: ({ children }) => (
            <dt className={`font-semibold ${colors.heading}`}>{children}</dt>
          ),
          dd: ({ children }) => (
            <dd className={`ml-4 ${colors.text}`}>{children}</dd>
          ),

          // Details/Summary (collapsible)
          details: ({ children }) => (
            <details className={`my-5 rounded-xl border p-4 ${colors.detailsBg} ${colors.detailsBorder}`}>
              {children}
            </details>
          ),
          summary: ({ children }) => (
            <summary className={`cursor-pointer font-medium ${colors.heading}`}>
              {children}
            </summary>
          ),

          // Keyboard input
          kbd: ({ children }) => (
            <kbd className={`rounded border px-1.5 py-0.5 font-mono text-xs ${colors.tableBorder} ${colors.codeBg} ${colors.text}`}>
              {children}
            </kbd>
          ),

          // Mark (highlight)
          mark: ({ children }) => (
            <mark className={`rounded px-1 ${colors.markBg} ${colors.text}`}>
              {children}
            </mark>
          ),

          // Video
          video: (props) => (
            <video
              {...props}
              className="my-6 mx-auto max-w-full rounded-xl shadow-md"
              controls
            />
          ),

          // Audio
          audio: (props) => (
            <audio {...props} className="my-6 w-full" controls />
          ),

          // Iframe (for embeds)
          iframe: (props) => (
            <div className="my-6 aspect-video overflow-hidden rounded-xl shadow-md">
              <iframe {...props} className="h-full w-full" />
            </div>
          ),

          // Footnote section
          section: ({ children, className, ...props }) => {
            if (className?.includes("footnotes")) {
              return (
                <section className={`mt-12 border-t pt-8 ${colors.hrColor}`} {...props}>
                  <h2 className={`mb-4 text-lg font-semibold ${colors.heading}`}>Notas al pie</h2>
                  {children}
                </section>
              )
            }
            return <section className={className} {...props}>{children}</section>
          },

          // Break
          br: () => <br className="my-2" />,

          // Div (for alerts/admonitions and other containers)
          div: ({ children, className, ...props }) => {
            if (className?.includes("markdown-alert")) {
              const alertType = className.includes("note") ? "note" 
                : className.includes("tip") ? "tip"
                : className.includes("important") ? "important"
                : className.includes("warning") ? "warning"
                : className.includes("caution") ? "caution"
                : "note"
              
              const alertStyles: Record<string, { bg: string; border: string }> = {
                note: { bg: "bg-amber-50", border: "border-amber-500" },
                tip: { bg: "bg-green-50", border: "border-green-600" },
                important: { bg: "bg-amber-100", border: "border-amber-600" },
                warning: { bg: "bg-yellow-50", border: "border-yellow-600" },
                caution: { bg: "bg-red-50", border: "border-red-600" },
              }
              
              const style = alertStyles[alertType]
              
              return (
                <div className={`my-5 rounded-xl border-l-4 p-4 ${style.bg} ${style.border}`} {...props}>
                  {children}
                </div>
              )
            }
            return <div className={className} {...props}>{children}</div>
          },

          // Span (for various inline elements)
          span: ({ children, className, ...props }) => (
            <span className={className} {...props}>{children}</span>
          ),

          // Small text
          small: ({ children }) => (
            <small className={`text-sm ${colors.textLight}`}>{children}</small>
          ),

          // Inserted text
          ins: ({ children }) => (
            <ins className={`bg-green-100 no-underline ${colors.text}`}>{children}</ins>
          ),

          // Sample output
          samp: ({ children }) => (
            <samp className={`rounded px-1 font-mono text-sm ${colors.codeBg} ${colors.textMuted}`}>{children}</samp>
          ),

          // Variable
          var: ({ children }) => (
            <var className={`font-mono italic ${colors.codeText}`}>{children}</var>
          ),

          // Cite
          cite: ({ children }) => (
            <cite className={`italic ${colors.textMuted}`}>{children}</cite>
          ),

          // Quote (inline)
          q: ({ children }) => (
            <q className={colors.text}>{children}</q>
          ),

          // Time
          time: ({ children, dateTime }) => (
            <time dateTime={dateTime} className={colors.textMuted}>{children}</time>
          ),

          // Address
          address: ({ children }) => (
            <address className={`my-5 not-italic ${colors.textMuted}`}>{children}</address>
          ),

          // Figure
          figure: ({ children }) => (
            <figure className="my-8">{children}</figure>
          ),

          // Figcaption
          figcaption: ({ children }) => (
            <figcaption className={`mt-3 text-center text-sm ${colors.textLight}`}>{children}</figcaption>
          ),

          // Caption (for tables)
          caption: ({ children }) => (
            <caption className={`mb-2 text-sm font-medium ${colors.textMuted}`}>{children}</caption>
          ),

          // Column group
          colgroup: ({ children }) => <colgroup>{children}</colgroup>,
          col: (props) => <col {...props} />,

          // Table sections
          tfoot: ({ children }) => (
            <tfoot className={`border-t-2 ${colors.tableBorder} ${colors.tableHeaderBg}`}>{children}</tfoot>
          ),

          // Data
          data: ({ children, value }) => (
            <data value={value} className={colors.text}>{children}</data>
          ),

          // Progress bar
          progress: ({ value, max }) => (
            <progress 
              value={value} 
              max={max} 
              className="h-2 w-full appearance-none overflow-hidden rounded-full bg-amber-100 [&::-webkit-progress-bar]:bg-amber-100 [&::-webkit-progress-value]:bg-amber-600 [&::-moz-progress-bar]:bg-amber-600"
            />
          ),

          // Meter
          meter: ({ value, min, max, low, high, optimum }) => (
            <meter 
              value={value} 
              min={min} 
              max={max}
              low={low}
              high={high}
              optimum={optimum}
              className="h-2 w-full"
            />
          ),

          // Bidirectional isolation
          bdi: ({ children }) => <bdi>{children}</bdi>,
          bdo: ({ children, dir }) => <bdo dir={dir}>{children}</bdo>,

          // Ruby annotations (for East Asian typography)
          ruby: ({ children }) => <ruby className={colors.text}>{children}</ruby>,
          rt: ({ children }) => <rt className={`text-xs ${colors.textLight}`}>{children}</rt>,
          rp: ({ children }) => <rp className={colors.textLight}>{children}</rp>,

          // Word break opportunity
          wbr: () => <wbr />,

          // Object/embed
          object: (props) => (
            <object {...props} className="my-6 max-w-full" />
          ),
          embed: (props) => (
            <embed {...props} className="my-6 max-w-full" />
          ),

          // Source (for video/audio)
          source: (props) => <source {...props} />,
          track: (props) => <track {...props} />,

          // Picture
          picture: ({ children }) => <picture className="my-6 block">{children}</picture>,

          // Map/area (image maps)
          map: ({ children, name }) => <map name={name}>{children}</map>,
          area: (props) => <area {...props} />,

          // Canvas (placeholder)
          canvas: (props) => (
            <canvas {...props} className={`my-6 rounded-xl border ${colors.tableBorder}`} />
          ),

          // SVG
          svg: (props) => <svg {...props} className="inline-block" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
