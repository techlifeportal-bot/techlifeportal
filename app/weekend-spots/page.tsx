"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type WeekendSpot = {
  id: number;
  tag: string | null;
  category: string | null;
  location: string | null;
  maps_url: string | null;
};

export default function WeekendSpotsPage() {
  const [spots, setSpots] = useState<WeekendSpot[]>([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpots = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("weekend_spots")
        .select("id, tag, category, location, maps_url")
        .order("priority", { ascending: false });

      if (error) {
        console.error("Error fetching weekend spots:", error);
      } else {
        setSpots(data || []);
      }

      setLoading(false);
    };

    fetchSpots();
  }, []);

  const filteredSpots =
    category === "all"
      ? spots
      : spots.filter(
          (spot) =>
            spot.category &&
            spot.category
              .split(",")
              .map((c) => c.trim().toLowerCase())
              .includes(category)
        );

  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Explore Weekend Spots</h1>
        <p>
          Discover weekend destinations around Bangalore — explore by interest,
          not location.
        </p>

        <div className="filter-box">
          <label>Choose category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="trekking">Trekking</option>
            <option value="nature">Nature</option>
            <option value="waterfalls">Waterfalls</option>
            <option value="heritage">Heritage</option>
          </select>
        </div>
      </section>

      {loading && <p>Loading weekend spots...</p>}

      {!loading && filteredSpots.length === 0 && (
        <p>No weekend spots found.</p>
      )}

      <section className="card-grid">
        {filteredSpots.map((spot) => (
          <div key={spot.id} className="card">
            <h3>{spot.tag || "Unnamed Spot"}</h3>

            {spot.location && (
              <p className="location">{spot.location}</p>
            )}

            {spot.maps_url && (
              <a
                href={spot.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                View on Google Maps →
              </a>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
