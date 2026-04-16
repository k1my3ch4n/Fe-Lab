"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { getCategories } from "@entities/topic";
import { useKeyboardNav } from "@shared/hooks";

export function useSidebarSearch() {
  const categories = getCategories();
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const clearSearch = useCallback(() => setSearch(""), []);

  useKeyboardNav(searchInputRef, clearSearch);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) {
      return categories;
    }

    const query = search.toLowerCase();

    return categories
      .map((category) => ({
        ...category,
        topics: category.topics.filter(
          (topic) =>
            topic.name.toLowerCase().includes(query) ||
            topic.id.toLowerCase().includes(query) ||
            category.name.toLowerCase().includes(query),
        ),
      }))
      .filter((category) => category.topics.length > 0);
  }, [categories, search]);

  return { search, setSearch, searchInputRef, filteredCategories };
}
