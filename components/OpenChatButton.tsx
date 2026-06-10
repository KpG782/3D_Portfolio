"use client";

export default function OpenChatButton({
  className = "btn btn-ghost",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("kb:open-chat"))}
    >
      Ask my portfolio
    </button>
  );
}
