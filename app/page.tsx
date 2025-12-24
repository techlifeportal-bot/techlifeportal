import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type WeekendSpot = {
  id?: number;
  Name: string;
  description?: string;
  ai_summary?: string;
  hub?: string;
  category?: string;
};

/* ----------------------------------------
   Highlighting (Phase 3A)
----------------------------------------- */
const HIGHLIGHT_REGEX =
  /\b(sunrise|trek|nature|hill|mall|food court|movies?|hangout|weekend|getaway|it employees?|crowd|scenic|ride)\b/gi;

function highlightText(text: string) {
  return text.split(HIGHLIGHT_REGEX).map((part, index) =>
    HIGHLIGHT_REGEX.test(part) ? (
      <span key={index} className="bg-yellow-100 px-1 rounded">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

/* ----------------------------------------
   Phase 3B — Task 3: AI draft generator
----------------------------------------- */
function generateDraftSpots(existing: WeekendSpot[]): WeekendSpot[] {
  const hubs = existing.map((s) => s.hub?.toLowerCase());
  const drafts: WeekendSpot[] = [];

  if (!hubs.includes('whitefield')) {
    drafts.push({
      Name: 'Whitefield Tech Park Food Street',
      hub: 'Whitefield',
      category: 'Food / Hangout',
      description:
        'Popular evening food street near tech parks in Whitefield, ideal for weekend outings with colleagues and friends.',
      ai_summary:
        'A lively food street near Whitefield IT hubs offering diverse street food, casual dining, and a relaxed weekend vibe for tech employees.'
    });
  }

  if (!hubs.includes('jp nagar')) {
    drafts.push({
      Name: 'JP Nagar Mini Forest Walk',
      hub: 'JP Nagar',
      category: 'Nature / Walk',
      description:
        'A peaceful walking trail surrounded by greenery, suitable for calm weekend mornings.',
      ai_summary:
        'A quiet nature escape within the city, ideal for slow weekend walks, fresh air, and short breaks from urban noise.'
    });
  }

  if (!existing.some((s) => /lake/i.test(s.category || ''))) {
    drafts.push({
      Name: 'Agara Lake Evening Walk',
      hub: 'HSR / Bellandur',
      category: 'Leisure / Walk',
      description:
        'Well-maintained lake with walking paths, popular for sunset views and relaxed weekends.',
      ai_summary:
        'Agara Lake offers calm walking trails and scenic sunsets, making it a perfect low-effort weekend destination near IT corridors.'
    });
  }

  return drafts;
}

export default async function HomePage() {
  const { data: weekendSpots, error } = await supabase
    .from('weekend_spots')
    .select('*');

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Error loading weekend spots
        </p>
      </main>
    );
  }

  const spots = weekendSpots as WeekendSpot[];
  const draftSpots = generateDraftSpots(spots);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Weekend Spots
      </h1>

      {/* =======================
          AI Draft Suggestions
         ======================= */}
      <div className="max-w-4xl mx-auto mb-12 bg-green-50 border border-green-200 rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-3">
          🤖 AI-Suggested New Weekend Spots (Draft)
        </h2>

        {draftSpots.length === 0 ? (
          <p className="text-sm text-green-900">
            No new suggestions right now. Coverage looks good.
          </p>
        ) : (
          <div className="space-y-4">
            {draftSpots.map((spot, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg p-4"
              >
                <p className="font-semibold">{spot.Name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  📍 {spot.hub} · 🏷️ {spot.category}
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  {highlightText(spot.description || '')}
                </p>
                <p className="text-xs text-green-700 mt-2">
                  🤖 AI draft — not published
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =======================
          Existing Weekend Spots
         ======================= */}
      <div className="max-w-4xl mx-auto space-y-6">
        {spots.map((spot) => (
          <div
            key={spot.id}
            className="bg-white border rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-2">
              {spot.Name}
            </h2>

            {spot.description && (
              <p className="text-gray-700 mb-3">
                {highlightText(spot.description)}
              </p>
            )}

            {spot.ai_summary && (
              <details className="mt-3">
                <summary className="cursor-pointer text-sm text-blue-600 font-medium">
                  🤖 View AI summary
                </summary>
                <div className="mt-2 text-sm text-gray-600 whitespace-pre-line">
                  {highlightText(spot.ai_summary)}
                </div>
              </details>
            )}

            <div className="mt-3 text-sm text-gray-500">
              {spot.hub && <>📍 {spot.hub}</>}
              {spot.category && <> · 🏷️ {spot.category}</>}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
