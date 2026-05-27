import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PublishState {
  publishedIds: Record<number, boolean>;
  togglePublish: (id: number) => void;
  initialize: (ids: number[]) => void;
}

export const usePublishStore = create<PublishState>()(
  persist(
    (set) => ({
      publishedIds: {},
      togglePublish: (id) =>
        set((state) => ({
          publishedIds: {
            ...state.publishedIds,
            [id]: !state.publishedIds[id],
          },
        })),
      initialize: (ids) =>
        set((state) => {
          const newPublishedIds = { ...state.publishedIds };
          let changed = false;
          ids.forEach((id) => {
            if (newPublishedIds[id] === undefined) {
              // Randomly initialize to true or false
              newPublishedIds[id] = Math.random() > 0.5;
              changed = true;
            }
          });
          return changed ? { publishedIds: newPublishedIds } : state;
        }),
    }),
    {
      name: "product-publish-storage",
    }
  )
);
