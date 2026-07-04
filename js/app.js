window.KancilApp = (() => {
  const data = window.KancilData;

  function getSelectedChildId() {
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("child");
    const fallbackChild = data.children.find((child) => child.activeStatus) || data.children[0];
    const selectedChild = data.children.find((child) => child.id === requestedId);
    return (selectedChild || fallbackChild).id;
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

    if (!payload.data || !Array.isArray(payload.data.children) || !Array.isArray(payload.data.tasks)) {
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
    animatePercent,
    createExportPayload,
    data,
    buildChildHref,
    formatCurrency,
    getChildBundle,
    getCompletionStats,
    getLatestUnlockedBadge,
    getRewardSummary,
    getSelectedChildId,
    getStatusMeta,
    getWeekTasks,
    setClassName,
    setHTML,
    setText,
    validateImportPayload,
  };
})();
