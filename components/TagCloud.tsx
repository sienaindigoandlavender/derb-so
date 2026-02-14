"use client";

import Link from "next/link";
import { useMemo } from "react";

interface TagData {
  tag: string;
  count: number;
  isCity: boolean;
}

interface TagCloudProps {
  tags: TagData[];
}

const citySet = new Set([
  "marrakech",
  "casablanca",
  "rabat",
  "agadir",
  "taghazout",
  "tangier",
  "fes",
  "essaouira",
  "chefchaouen",
]);

const tagDisplay: Record<string, string> = {
  marrakech: "Marrakech",
  casablanca: "Casablanca",
  rabat: "Rabat",
  agadir: "Agadir",
  taghazout: "Taghazout",
  tangier: "Tangier",
  fes: "Fes",
  medina: "Medina",
  riads: "Riads",
  architecture: "Architecture",
  navigation: "Navigation",
  food: "Food",
  etiquette: "Etiquette",
  heat: "Heat",
  sound: "Sound",
  wildlife: "Wildlife",
  safety: "Safety",
  ramadan: "Ramadan",
  surfing: "Surfing",
  shopping: "Shopping",
  hammam: "Hammam",
  vegan: "Vegan",
  transport: "Transport",
};

export default function TagCloud({ tags }: TagCloudProps) {
  const { cities, topics } = useMemo(() => {
    const cities = tags
      .filter((t) => t.isCity)
      .sort((a, b) => b.count - a.count);
    const topics = tags
      .filter((t) => !t.isCity)
      .sort((a, b) => b.count - a.count);
    return { cities, topics };
  }, [tags]);

  // Scale font size: min 0.8rem, max 1.5rem for topics; cities are larger
  const maxCount = Math.max(...tags.map((t) => t.count), 1);

  const getTopicSize = (count: number) => {
    const min = 0.78;
    const max = 1.2;
    const scale = count / maxCount;
    return min + scale * (max - min);
  };

  const getCitySize = (count: number) => {
    const min = 1.0;
    const max = 1.65;
    const scale = count / maxCount;
    return min + scale * (max - min);
  };

  const getOpacity = (count: number) => {
    const min = 0.45;
    const max = 0.95;
    const scale = count / maxCount;
    return min + scale * (max - min);
  };

  return (
    <div className="tag-cloud">
      {/* Cities row */}
      <div className="tag-cloud-cities">
        {cities.map((t) => (
          <Link
            key={t.tag}
            href={`/questions?tag=${t.tag}`}
            className="tag-cloud-city"
            style={{
              fontSize: `${getCitySize(t.count)}rem`,
              opacity: getOpacity(t.count),
            }}
          >
            {tagDisplay[t.tag] || t.tag}
          </Link>
        ))}
      </div>

      {/* Thin divider */}
      <div className="tag-cloud-divider" />

      {/* Topics flow */}
      <div className="tag-cloud-topics">
        {topics.map((t, i) => (
          <div key={t.tag} className="tag-cloud-topic-item">
            <Link
              href={`/questions?tag=${t.tag}`}
              className="tag-cloud-topic"
              style={{
                fontSize: `${getTopicSize(t.count)}rem`,
                opacity: getOpacity(t.count),
              }}
            >
              {tagDisplay[t.tag] || t.tag}
            </Link>
            {i < topics.length - 1 && (
              <span className="tag-cloud-separator">●</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
