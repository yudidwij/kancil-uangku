window.KancilApp = (() => {
  const STORAGE_KEY = "kancil-uangku-demo-data";
  const defaultData = cloneData(window.KancilData);
  const data = loadData();

  function cloneData(value) {
    if (typeof structuredClone === "function") {
      return structuredClone(value);
    }

    return JSON.parse(JSON.stringify(value));
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

  function loadData() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return cloneData(defaultData);
      }

      const parsed = JSON.parse(raw);
      if (hasValidCollections(parsed)) {
        return parsed;
      }
    } catch (error) {
      console.warn("Kancil Uangku gagal membaca data lokal, kembali ke data demo awal.", error);
    }

    return cloneData(defaultData);
  }

  function saveData() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function replaceData(nextData) {
    const snapshot = cloneData(nextData);

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

  function setActiveChild(childId) {
    data.children.forEach((child) => {
      child.activeStatus = child.id === childId;
    });
    saveData();
  }

  function addChild({ name, focusText, avatarColor }) {
    const childId = createUniqueChildId(name);
    const createdAt = new Date().toISOString().slice(0, 10);
    const safeName = name.trim();
    const safeFocus = focusText.trim() || "Mulai kebiasaan menabung pelan-pelan";

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
        "Hari pertamamu sudah dimulai. Pelan-pelan juga bagus, yang penting terus mencoba bersama Kancil.",
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
      goalName: "Target Tabungan Pertama",
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
      shareAmount: 0,
      allocationSavePercent: 50,
      allocationSpendPercent: 30,
      allocationSharePercent: 20,
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
      },
      {
        id: `b-${childId}-2`,
        childId,
        badgeName: "Sahabat Berbagi",
        badgeType: "sharing",
        description: "Menunggu kantong berbagi pertamamu terisi.",
        unlockedAt: null,
        status: "locked",
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
      month: "Juli 2026",
      totalTasks: 0,
      completedTasks: 0,
      totalReward: 0,
      totalSaved: 0,
      totalSpent: 0,
      totalShared: 0,
      badgesUnlocked: 0,
      bestStreak: 0,
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
      updates.focusText.trim() || "Mulai kebiasaan menabung pelan-pelan";
    if (updates.avatarColor) {
      child.avatarColor = updates.avatarColor;
    }

    saveData();
    return true;
  }

  function resetDemoData() {
    replaceData(defaultData);
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
    formatCurrency,
    getChildBundle,
    resetDemoData,
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
    updateChildProfile,
    validateImportPayload,
  };
})();
