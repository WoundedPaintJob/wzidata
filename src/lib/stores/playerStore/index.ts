import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import * as levelData from "@static/data/Levels.json";
import * as artifactData from "@static/data/Artifacts.json";
import * as advancementData from "@static/data/Advancements.json";
import { loadLevel } from "@lib/services/levelService";
import { AdvancementState } from "@features/advancement/lib/types";
import { produce } from "immer";
import { ArtifactState } from "@features/artifact/lib/types";
import { ArtifactRarity } from "@features/artifact/lib/enums";
import { PlayerState } from "./types";
import useLevelStore from "../levelStore";
import { LevelInfo } from "@features/level/lib/types";

const usePlayerStore = create<PlayerState>()(
  devtools(
    persist(
      (set) => ({
        Levels: levelData as LevelInfo[],
        Level: {
          Name: "Huruey's Castle",
          Id: -1,
          ImageWidth: 100,
          ImageHeight: 100,
        },
        Advancements: advancementData as AdvancementState[],
        AdvancementLevels: [],
        Artifacts: artifactData as ArtifactState[],
        ArtifactsOwned: [],
        ArtifactRarity: [],
        WideMap: false,
        ChangeLevel: async (to, freeTechs) => {
          const level = Levels.find((m) => m.Id == to);
          if (level == null) return;
          const state = await loadLevel(level);
          const levelStore = useLevelStore.getState();
          set({ Level: level });
          levelStore.SetLevel(state, freeTechs);
        },
        LevelUpAdvancement: (advancement) =>
          set(
            produce((state: PlayerState) => {
              state.Advancements.find(
                (a) => a.Type == advancement.Type
              ).Level += 1;
            })
          ),
        LevelDownAdvancement: (advancement) =>
          set(
            produce((state: PlayerState) => {
              state.Advancements.find(
                (a) => a.Type == advancement.Type
              ).Level -= 1;
            })
          ),
        SetArtifactRarity: (artifact, rarity) =>
          set(
            produce((state: PlayerState) => {
              state.Artifacts.find((a) => a.Type == artifact.Type).Rarity =
                rarity;
            })
          ),
        ToggleArtifactOwned: (artifact) =>
          set(
            produce((state: PlayerState) => {
              const arti = state.Artifacts.find((a) => a.Type == artifact.Type);
              arti.Owned = !arti.Owned;
            })
          ),
        ResetAdvancements: () =>
          set(
            produce((state: PlayerState) => {
              state.Advancements.forEach(
                (advancement) => (advancement.Level = -1)
              );
            })
          ),
        ToggleWideMap: () =>
          set(
            produce((state: PlayerState) => {
              state.WideMap = !state.WideMap;
            })
          ),
      }),
      {
        name: "player-storage",
        storage: {
          getItem: (name) => {
            const str = localStorage.getItem(name);
            const baseState = str
              ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              (JSON.parse(str).state as PlayerState)
              : ({
                Levels: [],
                Level: {
                  Name: "Huruey's Castle",
                  Id: -1,
                  ImageWidth: 100,
                  ImageHeight: 100,
                },
                Advancements: [],
                AdvancementLevels: [],
                Artifacts: [],
                ArtifactsOwned: [],
                ArtifactRarity: [],
              } as PlayerState);
            baseState.Levels = levelData as LevelInfo[];
            baseState.Advancements = advancementData as AdvancementState[];
            baseState.Artifacts = artifactData as ArtifactState[];
            baseState.Advancements.forEach((a, k) => {
              if (baseState.AdvancementLevels[k])
                a.Level = baseState.AdvancementLevels[k];
              else a.Level = -1;
            });
            baseState.Artifacts.forEach((a, k) => {
              if (baseState.ArtifactRarity[k])
                a.Rarity = baseState.ArtifactRarity[k];
              else a.Rarity = ArtifactRarity.Common;
              if (baseState.ArtifactsOwned[k])
                a.Owned = baseState.ArtifactsOwned[k];
              else a.Owned = false;
            });
            return {
              state: {
                ...baseState,
              } as PlayerState,
            };
          },
          setItem: (name, newValue) => {
            const str = JSON.stringify({
              state: {
                ...newValue.state,
                AdvancementLevels: newValue.state.AdvancementLevels,
                ArtifactsOwned: newValue.state.ArtifactsOwned,
                ArtifactRarity: newValue.state.ArtifactRarity,
              },
            });
            return localStorage.setItem(name, str);
          },
          removeItem: (name) => localStorage.removeItem(name),
        },
        partialize: (state: PlayerState) => ({
          Level: state.Level,
          AdvancementLevels: state.Advancements.map((a) => {
            return a.Level;
          }),
          ArtifactRarity: state.Artifacts.map((a) => {
            return a.Rarity;
          }),
          ArtifactsOwned: state.Artifacts.map((a) => {
            return a.Owned;
          }),
        }),
      }
    )
  )
);
export default usePlayerStore;
export const Levels = levelData as LevelInfo[];
