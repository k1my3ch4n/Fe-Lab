import { COOKIE_ATTRIBUTES } from "../../model/constants";
import { SectionHeader } from "@shared/ui";

export function CookieAttributesList() {
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader>쿠키 보안 속성</SectionHeader>
      {COOKIE_ATTRIBUTES.map((attr) => (
        <div
          key={attr.name}
          className="rounded-lg border border-border-subtle bg-bg-deep p-3 flex items-center gap-3"
        >
          <span
            className="font-[family-name:var(--font-mono)] text-[11px] font-semibold shrink-0"
            style={{ color: attr.color }}
          >
            {attr.name}
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
            {attr.description}
          </span>
        </div>
      ))}

      {/* Cookie in request diagram */}
      <div className="rounded-lg border border-border-subtle bg-bg-deep p-4 mt-2">
        <SectionHeader>요청마다 쿠키 자동 전송</SectionHeader>
        <pre className="font-[family-name:var(--font-mono)] text-[11px] text-accent-cyan leading-[1.8]">
          {`GET /api/user HTTP/1.1
Host: example.com
Cookie: sid=abc123; theme=dark
       ↑ 브라우저가 자동으로 포함`}
        </pre>
      </div>
    </div>
  );
}
