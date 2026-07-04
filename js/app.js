window.KancilApp = (() => {
  const STORAGE_KEY = "kancil-uangku-demo-data";
  const SESSION_STORAGE_KEY = "kancil-uangku-session";
  const DATA_VERSION = "2026-07-05-monthly-badges-v4";
  const DEFAULT_SAVE_PERCENT = 30;
  const DEFAULT_SPEND_PERCENT = 70;
  const defaultData = cloneData(window.KancilData);
  defaultData.dataVersion = DATA_VERSION;
  const data = normalizeData(loadData());

  function cloneData(value) {
    if (typeof structuredClone === "function") {
      return structuredClone(value);
    }

    return JSON.parse(JSON.stringify(value));
  }

  function getMonthLabel(dateString = "") {
    const source = dateString ? new Date(dateString) : new Date();
    return new Intl.DateTimeFormat("id-ID", {
      month: "long",
      year: "numeric",
    }).format(source).replace(/^./, (char) => char.toUpperCase());
  }

  function hasValidCollections(value) {
    return Boolean(
      value &&
        Array.isArray(value.children) &&
        Array.isArray(value.tasks) &&
        Array.isArray(value.goals) &&
        Array.isArray(value.pockets) &&
        Array.isArray(value.badges) &&
        Array.isArray(value.streaks) &&
        Array.isArray(value.monthlyRecaps)
    );
  }

  function isMoneyRewardTask(task) {
    return (
      (task.rewardType === "uang" || task.rewardType === "badge+uang") &&
      Number(task.rewardAmount) > 0 &&
      task.status === "selesai"
    );
  }

  function calculateRewardAllocation(totalReward) {
    const normalizedReward = Number(totalReward) || 0;
    const saveAmount = Math.round(normalizedReward * (DEFAULT_SAVE_PERCENT / 100));
    const spendAmount = Math.max(0, normalizedReward - saveAmount);

    return {
      saveAmount,
      spendAmount,
      savePercent: DEFAULT_SAVE_PERCENT,
      spendPercent: DEFAULT_SPEND_PERCENT,
    };
  }

  function normalizeData(nextData) {
    if (!hasValidCollections(nextData)) {
      return cloneData(defaultData);
    }

    const rewardByChild = {};
    const completedTasksByChild = {};
    const taskCountByChild = {};

    nextData.tasks.forEach((task) => {
      taskCountByChild[task.childId] = (taskCountByChild[task.childId] || 0) + 1;
      if (task.status === "selesai") {
        completedTasksByChild[task.childId] = (completedTasksByChild[task.childId] || 0) + 1;
      }
      if (isMoneyRewardTask(task)) {
        rewardByChild[task.childId] = (rewardByChild[task.childId] || 0) + Number(task.rewardAmount || 0);
      }
    });

    const goalMap = new Map(nextData.goals.map((goal) => [goal.childId, goal]));
    const pocketMap = new Map(nextData.pockets.map((pocket) => [pocket.childId, pocket]));
    const recapMap = new Map(nextData.monthlyRecaps.map((recap) => [recap.childId, recap]));

    nextData.children.forEach((child) => {
      const rewardTotal = rewardByChild[child.id] || 0;
      const allocation = calculateRewardAllocation(rewardTotal);
      const goal = goalMap.get(child.id);
      const pocket = pocketMap.get(child.id);
      const recap = recapMap.get(child.id);
      const currentSpendReference = pocket
        ? Number(pocket.spendAmount || 0) + Number(pocket.shareAmount || 0)
        : 0;

      if (goal && pocket) {
        goal.baseCurrentAmount =
          typeof pocket.baseSpendAmount === "number"
            ? Number(pocket.baseSpendAmount)
            : Math.max(0, currentSpendReference - allocation.spendAmount);
      } else if (goal) {
        goal.baseCurrentAmount =
          typeof goal.baseCurrentAmount === "number"
            ? goal.baseCurrentAmount
            : Math.max(0, Number(goal.currentAmount || 0) - allocation.spendAmount);
      }

      if (pocket) {
        const currentSaveReference =
          typeof goal?.currentAmount === "number"
            ? Number(goal.currentAmount)
            : Number(pocket.saveAmount || 0);

        pocket.baseSaveAmount =
          typeof pocket.baseSaveAmount === "number"
            ? pocket.baseSaveAmount
            : Math.max(0, currentSaveReference - allocation.saveAmount);
        pocket.baseSpendAmount =
          typeof pocket.baseSpendAmount === "number"
            ? pocket.baseSpendAmount
            : Math.max(0, currentSpendReference - allocation.spendAmount);
        delete pocket.shareAmount;
        delete pocket.allocationSharePercent;
      }

      if (recap) {
        recap.baseTotalReward =
          typeof recap.baseTotalReward === "number"
            ? recap.baseTotalReward
            : Math.max(0, Number(recap.totalReward || 0) - rewardTotal);
        recap.baseTotalSaved =
          typeof recap.baseTotalSaved === "number"
            ? recap.baseTotalSaved
            : Math.max(0, Number(recap.totalSaved || 0) - allocation.saveAmount);
        recap.baseTotalSpent =
          typeof recap.baseTotalSpent === "number"
            ? recap.baseTotalSpent
            : Math.max(
                0,
                Number(recap.totalSpent || 0) + Number(recap.totalShared || 0) - allocation.spendAmount
              );
        recap.baseTotalTasks =
          typeof recap.baseTotalTasks === "number"
            ? recap.baseTotalTasks
            : Math.max(0, Number(recap.totalTasks || 0) - (taskCountByChild[child.id] || 0));
        recap.baseCompletedTasks =
          typeof recap.baseCompletedTasks === "number"
            ? recap.baseCompletedTasks
            : Math.max(
                0,
                Number(recap.completedTasks || 0) - (completedTasksByChild[child.id] || 0)
              );
        delete recap.totalShared;
      }
    });

    nextData.pockets = nextData.pockets.map((pocket) => ({
      childId: pocket.childId,
      saveAmount: Number(pocket.saveAmount || 0),
      spendAmount: Number(pocket.spendAmount || 0),
      allocationSavePercent: DEFAULT_SAVE_PERCENT,
      allocationSpendPercent: DEFAULT_SPEND_PERCENT,
      baseSaveAmount: Number(pocket.baseSaveAmount || 0),
      baseSpendAmount: Number(pocket.baseSpendAmount || 0),
    }));

    nextData.goals = nextData.goals.map((goal) => ({
      ...goal,
      baseCurrentAmount: Number(goal.baseCurrentAmount || 0),
    }));

    nextData.monthlyRecaps = nextData.monthlyRecaps.map((recap) => ({
      ...recap,
      baseTotalReward: Number(recap.baseTotalReward || 0),
      baseTotalSaved: Number(recap.baseTotalSaved || 0),
      baseTotalSpent: Number(recap.baseTotalSpent || 0),
      baseTotalTasks: Number(recap.baseTotalTasks || 0),
      baseCompletedTasks: Number(recap.baseCompletedTasks || 0),
    }));

    nextData.badges = nextData.badges.map((badge) => ({
      ...badge,
      month:
        badge.month ||
        recapMap.get(badge.childId)?.month ||
        getMonthLabel(badge.unlockedAt || ""),
    }));

    nextData.children.forEach((child) => {
      recalculateChildFinance(nextData, child.id);
    });

    nextData.dataVersion = DATA_VERSION;

    return nextData;
  }

  function loadData() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return cloneData(defaultData);
      }

      const parsed = JSON.parse(raw);
      if (parsed?.dataVersion !== DATA_VERSION) {
        return cloneData(defaultData);
      }

      if (hasValidCollections(parsed)) {
        return parsed;
      }
    } catch (error) {
      console.warn("Kancil Uangku gagal membaca data lokal, kembali ke data demo awal.", error);
    }

    return cloneData(defaultData);
  }

  function saveData() {
    data.dataVersion = DATA_VERSION;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function replaceData(nextData) {
    const snapshot = normalizeData(cloneData(nextData));

    Object.keys(data).forEach((key) => {
      delete data[key];
    });

    Object.assign(data, snapshot);
    saveData();
  }

  function createSlug(name) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 24);
  }

  function createUniqueChildId(name) {
    const baseSlug = createSlug(name) || "anak-baru";
    let nextId = baseSlug;
    let counter = 2;

    while (data.children.some((child) => child.id === nextId)) {
      nextId = `${baseSlug}-${counter}`;
      counter += 1;
    }

    return nextId;
  }

  function createUniqueTaskId(childId) {
    const baseId = `t-${childId}`;
    let counter = 1;
    let nextId = `${baseId}-${counter}`;

    while (data.tasks.some((task) => task.id === nextId)) {
      counter += 1;
      nextId = `${baseId}-${counter}`;
    }

    return nextId;
  }

  function setActiveChild(childId) {
    data.children.forEach((child) => {
      child.activeStatus = child.id === childId;
    });
    saveData();
  }

  function addChild({ name, focusText, avatarColor }) {
    const childId = createUniqueChildId(name);
    const createdAt = new Date().toISOString().slice(0, 10);
    const monthLabel = getMonthLabel(createdAt);
    const safeName = name.trim();
    const safeFocus = focusText.trim() || "Mulai kebiasaan mengatur uang pelan-pelan";

    data.children.forEach((child) => {
      child.activeStatus = false;
    });

    data.children.push({
      id: childId,
      name: safeName,
      avatarColor: avatarColor || "#5ECFC1",
      activeStatus: true,
      createdAt,
      focusText: safeFocus,
      childIntro:
        "Kancil siap menemani langkah kecilmu. Yuk mulai dari misi sederhana dan tabungan yang bertambah pelan-pelan.",
      heroPraise: "Kancil senang belajar bareng kamu!",
      childMessage:
        "Hari pertamamu sudah dimulai. Sedikit masuk tabungan, sisanya untuk belanja terencana. Pelan-pelan juga bagus.",
      weekLabel: "Minggu 2",
      monthlyTasks: [0, 0, 0, 0],
      savingsTrend: [
        { label: "April", amount: 0 },
        { label: "Mei", amount: 0 },
        { label: "Juni", amount: 0 },
        { label: "Juli", amount: 0 },
      ],
    });

    data.goals.push({
      id: `g-${childId}`,
      childId,
      goalName: "Goal Pertama",
      targetAmount: 150000,
      currentAmount: 0,
      startDate: createdAt,
      targetDate: "2026-12-31",
      icon: "bintang",
      status: "aktif",
    });

    data.pockets.push({
      childId,
      saveAmount: 0,
      spendAmount: 0,
      allocationSavePercent: DEFAULT_SAVE_PERCENT,
      allocationSpendPercent: DEFAULT_SPEND_PERCENT,
      baseSaveAmount: 0,
      baseSpendAmount: 0,
    });

    data.badges.push(
      {
        id: `b-${childId}-1`,
        childId,
        badgeName: "Penabung Pemula",
        badgeType: "saving",
        description: "Siap terbuka saat tabungan pertama mulai terisi.",
        unlockedAt: null,
        status: "locked",
        month: monthLabel,
      },
      {
        id: `b-${childId}-2`,
        childId,
        badgeName: "Belanja Bijak",
        badgeType: "spending",
        description: "Menunggu dana belanja pertamamu dipakai dengan rencana.",
        unlockedAt: null,
        status: "locked",
        month: monthLabel,
      }
    );

    data.streaks.push({
      childId,
      currentStreak: 0,
      bestStreak: 0,
      lastActivityDate: createdAt,
    });

    data.monthlyRecaps.push({
      childId,
      month: monthLabel,
      totalTasks: 0,
      completedTasks: 0,
      totalReward: 0,
      totalSaved: 0,
      totalSpent: 0,
      badgesUnlocked: 0,
      bestStreak: 0,
      baseTotalReward: 0,
      baseTotalSaved: 0,
      baseTotalSpent: 0,
      baseTotalTasks: 0,
      baseCompletedTasks: 0,
    });

    saveData();
    return childId;
  }

  function updateChildProfile(childId, updates) {
    const child = data.children.find((item) => item.id === childId);
    if (!child) {
      return false;
    }

    child.name = updates.name.trim();
    child.focusText =
      updates.focusText.trim() || "Mulai kebiasaan mengatur uang pelan-pelan";
    if (updates.avatarColor) {
      child.avatarColor = updates.avatarColor;
    }

    saveData();
    return true;
  }

  function removeChild(childId) {
    const childIndex = data.children.findIndex((item) => item.id === childId);
    if (childIndex === -1) {
      return { ok: false, reason: "not-found", nextChildId: null };
    }

    if (data.children.length <= 1) {
      return { ok: false, reason: "last-child", nextChildId: childId };
    }

    data.children.splice(childIndex, 1);
    data.tasks = data.tasks.filter((item) => item.childId !== childId);
    data.goals = data.goals.filter((item) => item.childId !== childId);
    data.pockets = data.pockets.filter((item) => item.childId !== childId);
    data.badges = data.badges.filter((item) => item.childId !== childId);
    data.streaks = data.streaks.filter((item) => item.childId !== childId);
    data.monthlyRecaps = data.monthlyRecaps.filter((item) => item.childId !== childId);

    if (!data.children.some((child) => child.activeStatus)) {
      data.children[0].activeStatus = true;
    }

    const nextActiveChild =
      data.children.find((child) => child.activeStatus) || data.children[0];

    saveData();
    return {
      ok: true,
      reason: null,
      nextChildId: nextActiveChild?.id || null,
    };
  }

  function buildRewardLabel(rewardType, rewardAmount, rewardLabel) {
    if (rewardLabel && rewardLabel.trim()) {
      return rewardLabel.trim();
    }

    if (rewardType === "uang") {
      return formatCurrency(rewardAmount || 0);
    }
    if (rewardType === "badge+uang") {
      return `Badge + ${formatCurrency(rewardAmount || 0)}`;
    }
    if (rewardType === "badge") {
      return "Badge apresiasi";
    }

    return "Reward spesial";
  }

  function recalculateChildFinance(targetData, childId) {
    const tasks = targetData.tasks.filter((task) => task.childId === childId);
    const pocket = targetData.pockets.find((item) => item.childId === childId);
    const goal = targetData.goals.find((item) => item.childId === childId);
    const recap = targetData.monthlyRecaps.find((item) => item.childId === childId);

    const rewardTotal = tasks.reduce((total, task) => {
      return total + (isMoneyRewardTask(task) ? Number(task.rewardAmount || 0) : 0);
    }, 0);
    const completedTasks = tasks.filter((task) => task.status === "selesai").length;
    const allocation = calculateRewardAllocation(rewardTotal);

    if (pocket) {
      pocket.allocationSavePercent = DEFAULT_SAVE_PERCENT;
      pocket.allocationSpendPercent = DEFAULT_SPEND_PERCENT;
      pocket.saveAmount = Number(pocket.baseSaveAmount || 0) + allocation.saveAmount;
      pocket.spendAmount = Number(pocket.baseSpendAmount || 0) + allocation.spendAmount;
    }

    if (goal) {
      goal.currentAmount = Number(goal.baseCurrentAmount || 0) + allocation.spendAmount;
    }

    if (recap) {
      recap.totalTasks = Number(recap.baseTotalTasks || 0) + tasks.length;
      recap.completedTasks = Number(recap.baseCompletedTasks || 0) + completedTasks;
      recap.totalReward = Number(recap.baseTotalReward || 0) + rewardTotal;
      recap.totalSaved = Number(recap.baseTotalSaved || 0) + allocation.saveAmount;
      recap.totalSpent = Number(recap.baseTotalSpent || 0) + allocation.spendAmount;
    }
  }

  function upsertTask(taskInput) {
    const sanitized = {
      id: taskInput.id || createUniqueTaskId(taskInput.childId),
      childId: taskInput.childId,
      weekNumber: Number(taskInput.weekNumber) || 1,
      title: taskInput.title.trim(),
      description: taskInput.description.trim(),
      rewardType: taskInput.rewardType,
      rewardAmount: Number(taskInput.rewardAmount) || 0,
      rewardLabel: buildRewardLabel(
        taskInput.rewardType,
        Number(taskInput.rewardAmount) || 0,
        taskInput.rewardLabel
      ),
      note: taskInput.note.trim() || "Masih ada kesempatan",
      status: taskInput.status,
      completedAt:
        taskInput.status === "selesai"
          ? new Date().toISOString().slice(0, 10)
          : null,
    };

    const existingIndex = data.tasks.findIndex((task) => task.id === sanitized.id);
    if (existingIndex >= 0) {
      data.tasks[existingIndex] = sanitized;
    } else {
      data.tasks.push(sanitized);
    }

    recalculateChildFinance(data, sanitized.childId);
    saveData();
    return sanitized.id;
  }

  function removeTask(taskId) {
    const existingIndex = data.tasks.findIndex((task) => task.id === taskId);
    if (existingIndex === -1) {
      return false;
    }

    const childId = data.tasks[existingIndex].childId;
    data.tasks.splice(existingIndex, 1);
    recalculateChildFinance(data, childId);
    saveData();
    return true;
  }

  function resetDemoData() {
    replaceData(defaultData);
  }

  function getSession() {
    try {
      const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || !parsed.email) {
        return null;
      }

      return parsed;
    } catch (error) {
      return null;
    }
  }

  function clearSession() {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }

  function requireSession() {
    const session = getSession();
    if (!session) {
      window.location.href = "login.html";
      return null;
    }

    return session;
  }

  function getSelectedChildId() {
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("child");
    const fallbackChild = data.children.find((child) => child.activeStatus) || data.children[0];
    const selectedChild = data.children.find((child) => child.id === requestedId);
    return (selectedChild || fallbackChild)?.id || "";
  }

  function buildChildHref(page, childId) {
    return `${page}?child=${encodeURIComponent(childId)}`;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function getChildBundle(childId) {
    return {
      child: data.children.find((item) => item.id === childId),
      tasks: data.tasks.filter((item) => item.childId === childId),
      goal: data.goals.find((item) => item.childId === childId),
      pocket: data.pockets.find((item) => item.childId === childId),
      badges: data.badges.filter((item) => item.childId === childId),
      streak: data.streaks.find((item) => item.childId === childId),
      monthlyRecap: data.monthlyRecaps.find((item) => item.childId === childId),
    };
  }

  function getWeekTasks(tasks, weekNumber) {
    return tasks.filter((task) => task.weekNumber === weekNumber);
  }

  function getCompletionStats(tasks) {
    const completed = tasks.filter((task) => task.status === "selesai").length;
    const inProgress = tasks.filter((task) => task.status === "berjalan").length;
    const total = tasks.length;
    const percentage = total ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      inProgress,
      remaining: total - completed - inProgress,
      percentage,
    };
  }

  function getLatestUnlockedBadge(badges) {
    return badges
      .filter((badge) => badge.status === "unlocked")
      .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))[0];
  }

  function getRewardSummary(tasks) {
    return tasks.reduce(
      (summary, task) => {
        if (task.rewardType === "uang" || task.rewardType === "badge+uang") {
          summary.money += task.rewardAmount;
        }
        if (task.rewardType === "non-uang") {
          summary.nonMoney += 1;
        }
        if (task.rewardType === "badge" || task.rewardType === "badge+uang") {
          summary.badge += 1;
        }
        return summary;
      },
      { money: 0, nonMoney: 0, badge: 0 }
    );
  }

  function getStatusMeta(status) {
    if (status === "selesai") {
      return {
        label: "Selesai",
        className: "bg-[#EAFBF8] text-[#2E4374]",
      };
    }
    if (status === "berjalan") {
      return {
        label: "Berjalan",
        className: "bg-[#FFF0EA] text-[#FF8C61]",
      };
    }
    return {
      label: "Belum selesai",
      className: "bg-[#F2ECFA] text-[#7E66B7]",
    };
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = value;
    }
  }

  function setHTML(id, value) {
    const node = document.getElementById(id);
    if (node) {
      node.innerHTML = value;
    }
  }

  function setClassName(id, value) {
    const node = document.getElementById(id);
    if (node) {
      node.className = value;
    }
  }

  function createExportPayload(selectedChildId, weekNumber) {
    return {
      exportedAt: new Date().toISOString(),
      selectedChildId,
      selectedWeek: weekNumber,
      data,
    };
  }

  function validateImportPayload(payload) {
    if (!payload || typeof payload !== "object") {
      return { valid: false, message: "File tidak berisi objek JSON yang valid." };
    }

    if (!hasValidCollections(payload.data)) {
      return {
        valid: false,
        message: "Struktur file belum cocok dengan format demo data Kancil Uangku.",
      };
    }

    return {
      valid: true,
      message: `File berisi ${payload.data.children.length} profil anak dan ${payload.data.tasks.length} tugas.`,
    };
  }

  function applyImportPayload(payload) {
    replaceData(payload.data);
  }

  function animatePercent(node, property, value) {
    if (!node) return;

    node.style[property] = "0%";
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        node.style[property] = `${value}%`;
      });
    });
  }

  return {
    addChild,
    animatePercent,
    applyImportPayload,
    createExportPayload,
    data,
    buildChildHref,
    clearSession,
    formatCurrency,
    getChildBundle,
    resetDemoData,
    getSession,
    removeChild,
    removeTask,
    saveData,
    setActiveChild,
    getCompletionStats,
    getLatestUnlockedBadge,
    getRewardSummary,
    getSelectedChildId,
    getStatusMeta,
    getWeekTasks,
    setClassName,
    setHTML,
    setText,
    upsertTask,
    updateChildProfile,
    validateImportPayload,
    requireSession,
  };
})();
