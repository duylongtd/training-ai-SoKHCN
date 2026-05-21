import { useState, useEffect, useCallback } from "react";

const KEY = "ai_taphuan_progress_v1";

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

// Global pub-sub để các component cùng update khi 1 component đổi
const listeners = new Set();
function notifyAll() {
  listeners.forEach((fn) => fn());
}

export default function useProgress() {
  const [state, setState] = useState(load);

  useEffect(() => {
    const handler = () => setState(load());
    listeners.add(handler);
    return () => listeners.delete(handler);
  }, []);

  const markTheoryRead = useCallback((sectionId) => {
    const cur = load();
    if (!cur[sectionId]) cur[sectionId] = {};
    cur[sectionId].theory = true;
    save(cur);
    notifyAll();
  }, []);

  const markMissionDone = useCallback((sectionId, missionId) => {
    const cur = load();
    if (!cur[sectionId]) cur[sectionId] = {};
    if (!cur[sectionId].missions) cur[sectionId].missions = {};
    const wasDone = cur[sectionId].missions[missionId];
    cur[sectionId].missions[missionId] = true;
    save(cur);
    notifyAll();
    return !wasDone; // true nếu vừa mới hoàn thành
  }, []);

  const isTheoryRead = useCallback(
    (sectionId) => !!state[sectionId]?.theory,
    [state]
  );

  const isMissionDone = useCallback(
    (sectionId, missionId) => !!state[sectionId]?.missions?.[missionId],
    [state]
  );

  const missionsCompleted = useCallback(
    (sectionId, totalMissions) => {
      const missions = state[sectionId]?.missions || {};
      const done = Object.values(missions).filter(Boolean).length;
      return { done, total: totalMissions, complete: done >= totalMissions };
    },
    [state]
  );

  const isSectionComplete = useCallback(
    (sectionId, totalMissions) => {
      const s = state[sectionId];
      if (!s) return false;
      const missions = s.missions || {};
      const done = Object.values(missions).filter(Boolean).length;
      return !!s.theory && done >= totalMissions;
    },
    [state]
  );

  const resetAll = useCallback(() => {
    save({});
    notifyAll();
  }, []);

  return {
    state,
    markTheoryRead,
    markMissionDone,
    isTheoryRead,
    isMissionDone,
    missionsCompleted,
    isSectionComplete,
    resetAll,
  };
}
