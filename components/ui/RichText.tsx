import { Fragment } from "react";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Renders plain text with "[label](url)" segments turned into real,
 * clickable links — built as actual React elements (never
 * dangerouslySetInnerHTML), so there's no HTML-injection surface even
 * though this text ultimately comes from admin-entered content.
 *
 * Only use this where nesting an <a> is safe — i.e. not inside something
 * that's already a Link/anchor (see stripMarkdownLinks for that case).
 */
export function RichText({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");

  return (
    <>
      {paragraphs.map((paragraph, pIndex) => (
        <p key={pIndex}>{renderLineWithLinks(paragraph)}</p>
      ))}
    </>
  );
}

function renderLineWithLinks(line: string) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <Fragment key={key++}>{line.slice(lastIndex, match.index)}</Fragment>
      );
    }

    parts.push(
      <a
        key={key++}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-brand-magenta underline decoration-brand-magenta/30 underline-offset-2 transition-colors hover:text-brand-orange"
      >
        {match[1]}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    parts.push(<Fragment key={key++}>{line.slice(lastIndex)}</Fragment>);
  }

  return parts;
}
