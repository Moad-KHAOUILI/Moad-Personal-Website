// ---------------------------------------------------------------------------
// Big slanted title at the top of each inner screen, with a cyan subtitle strip.
// ---------------------------------------------------------------------------

export default function ScreenTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="screen-title-wrap">
      <h1 className="screen-title">{title}</h1>
      <div className="strip -mt-1 ml-2">{subtitle}</div>
    </div>
  );
}
