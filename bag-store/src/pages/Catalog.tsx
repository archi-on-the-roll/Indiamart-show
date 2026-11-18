import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BAGS, COLORS } from "../data/bags";
import type { Gender } from "../data/bags";
import { getUser, logout } from "../auth";

type GenderFilter = Gender | "All";
type SortOrder = "high-to-low" | "low-to-high";

export default function Catalog() {
  const navigate = useNavigate();
  const [gender, setGender] = useState<GenderFilter>("All");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("high-to-low");

  const filteredBags = useMemo(() => {
    let result = BAGS.filter((bag) => gender === "All" || bag.gender === gender);

    if (selectedColors.length > 0) {
      result = result.filter((bag) => selectedColors.includes(bag.color.name));
    }

    result = [...result].sort((a, b) =>
      sortOrder === "high-to-low" ? b.price - a.price : a.price - b.price,
    );

    return result;
  }, [gender, selectedColors, sortOrder]);

  function toggleColor(colorName: string) {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName],
    );
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
        <h1 className="text-xl font-semibold text-neutral-900">Bag Store</h1>
        <div className="flex items-center gap-4">
          <span data-testid="welcome-user" className="text-sm text-neutral-500">
            Hi, {getUser()}
          </span>
          <button
            type="button"
            data-testid="logout-button"
            onClick={handleLogout}
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-6">
        {/* Gender tabs */}
        <div data-testid="gender-filter" className="mb-5 flex gap-2">
          {(["All", "Women", "Men", "Unisex"] as GenderFilter[]).map((g) => (
            <button
              key={g}
              type="button"
              data-testid={`gender-tab-${g.toLowerCase()}`}
              onClick={() => setGender(g)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                gender === g
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-neutral-600 border border-neutral-300 hover:bg-neutral-100"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Sidebar filters */}
          <aside className="w-full shrink-0 md:w-56">
            <div className="mb-6">
              <h2 className="mb-2 text-sm font-semibold text-neutral-900">Sort by price</h2>
              <select
                data-testid="price-sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"
              >
                <option value="high-to-low">High to Low</option>
                <option value="low-to-high">Low to High</option>
              </select>
            </div>

            <div>
              <h2 className="mb-2 text-sm font-semibold text-neutral-900">Color</h2>
              <div data-testid="color-filter" className="flex flex-wrap gap-2">
                {COLORS.map((color) => {
                  const active = selectedColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      type="button"
                      data-testid={`color-swatch-${color.name.toLowerCase()}`}
                      title={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={`h-7 w-7 rounded-full border-2 transition ${
                        active ? "border-neutral-900 scale-110" : "border-neutral-200"
                      }`}
                      style={{ backgroundColor: `#${color.hex}` }}
                      aria-label={color.name}
                      aria-pressed={active}
                    />
                  );
                })}
              </div>
              {selectedColors.length > 0 && (
                <button
                  type="button"
                  data-testid="clear-colors"
                  onClick={() => setSelectedColors([])}
                  className="mt-2 text-xs text-neutral-500 underline hover:text-neutral-900"
                >
                  Clear colors
                </button>
              )}
            </div>
          </aside>

          {/* Product grid */}
          <section className="flex-1">
            <p data-testid="results-count" className="mb-4 text-sm text-neutral-500">
              {filteredBags.length} {filteredBags.length === 1 ? "bag" : "bags"}
            </p>
            <div
              data-testid="bag-grid"
              className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
            >
              {filteredBags.map((bag) => (
                <div
                  key={bag.id}
                  data-testid={`bag-card-${bag.id}`}
                  className="overflow-hidden rounded-lg border border-neutral-200 bg-white"
                >
                  <img src={bag.imageUrl} alt={bag.name} className="aspect-square w-full object-cover" />
                  <div className="p-3">
                    <p className="text-sm font-medium text-neutral-900">{bag.name}</p>
                    <p className="text-xs text-neutral-500">
                      {bag.gender} · {bag.color.name}
                    </p>
                    <p data-testid={`bag-price-${bag.id}`} className="mt-1 text-sm font-semibold text-neutral-900">
                      ${bag.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {filteredBags.length === 0 && (
              <p data-testid="no-results" className="py-12 text-center text-neutral-500">
                No bags match these filters.
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
