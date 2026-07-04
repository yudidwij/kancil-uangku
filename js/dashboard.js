const DashboardPage = (() => {
  const {
    addChild,
    animatePercent,
    applyImportPayload,
    clearSession,
    createExportPayload,
    data,
    buildChildHref,
    formatCurrency,
    getChildBundle,
    getSession,
    removeChild,
    removeTask,
    resetDemoData,
    requireSession,
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
  } = window.KancilApp;

  function renderHeader(bundle, weekNumber, session) {
    setText("active-child-name", bundle.child.name);
    setText("active-period", `${bundle.monthlyRecap.month} - Minggu ${weekNumber}`);
    setText("parent-session-name", session?.parentName || session?.email || "Orang Tua");
    const childViewLink = document.getElementById("child-view-link");
    if (childViewLink) {
      childViewLink.href = buildChildHref("child-view.html", bundle.child.id);
    }
  }

  function bindSessionUI() {
    const logoutButton = document.getElementById("logout-button");
    if (!logoutButton) return;

    logoutButton.addEventListener("click", () => {
      clearSession();
      window.location.href = "login.html";
    });
  }

  function renderQuickStats(bundle, weekTasks) {
    const completion = getCompletionStats(weekTasks);
    const latestBadge = getLatestUnlockedBadge(bundle.badges);

    setText("stat-weekly-tasks", String(completion.total));
    setText(
      "stat-weekly-tasks-note",
      `${completion.completed} selesai, ${completion.inProgress} berjalan`
    );
    setText("stat-completion-rate", `${completion.percentage}%`);
    setText("stat-completion-note", `Progress minggu ini untuk ${bundle.child.name}`);
    setText("stat-total-savings", formatCurrency(bundle.pocket.saveAmount));
    setText(
      "stat-total-savings-note",
      `${bundle.pocket.allocationSavePercent}% reward masuk ke tabungan aman`
    );
    setText("stat-latest-badge", latestBadge ? latestBadge.badgeName : "Belum ada badge");
    setText(
      "stat-latest-badge-note",
      latestBadge?.unlockedAt ? `Didapat ${latestBadge.unlockedAt}` : "Badge pertama masih menunggu"
    );
    setText("stat-current-streak", `${bundle.streak.currentStreak} hari`);
    setText("stat-current-streak-note", `Best streak ${bundle.streak.bestStreak} hari`);
    setText("stat-active-children", String(data.children.length));
    setText("stat-active-children-note", "Maksimal 10 anak");
  }

  function renderChildSelector(selectedChildId) {
    const selector = document.getElementById("child-selector-list");
    const emptyState = document.getElementById("child-selector-empty-state");
    if (!selector) return;

    if (emptyState) {
      emptyState.classList.toggle("hidden", data.children.length > 0);
    }

    selector.innerHTML = data.children
      .map((child) => {
        const bundle = getChildBundle(child.id);
        const childTasks = getWeekTasks(bundle.tasks, 2);
        const completion = getCompletionStats(childTasks);
        const goalPercent = Math.round((bundle.goal.currentAmount / bundle.goal.targetAmount) * 100);
        const isActive = child.id === selectedChildId;

        return `
          <a
            href="${buildChildHref("parent-dashboard.html", child.id)}"
            class="rounded-2xl bg-white p-5 shadow-sm shadow-[#2E4374]/8 ${
              isActive ? "ring-2 ring-[#2E4374]" : "ring-1 ring-[#2E4374]/8"
            }"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <span
                  class="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-semibold text-[#2E4374]"
                  style="background-color:${child.avatarColor}22"
                >
                  ${child.name.charAt(0)}
                </span>
                <div>
                  <h3 class="font-heading text-lg font-semibold">${child.name}</h3>
                  <p class="text-sm text-[#2E4374]/65">${child.focusText}</p>
                </div>
              </div>
              <span class="rounded-full bg-[#EAF0FB] px-3 py-1 text-xs font-semibold text-[#2E4374]">
                ${isActive ? "Aktif" : "Lihat"}
              </span>
            </div>
            <dl class="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div>
                <dt class="text-[#2E4374]/60">Tugas</dt>
                <dd class="mt-1 font-semibold">${completion.completed}/${completion.total}</dd>
              </div>
              <div>
                <dt class="text-[#2E4374]/60">Goal</dt>
                <dd class="mt-1 font-semibold text-[#FF8C61]">${goalPercent}%</dd>
              </div>
              <div>
                <dt class="text-[#2E4374]/60">Streak</dt>
                <dd class="mt-1 font-semibold text-[#FFC94A]">${bundle.streak.currentStreak} hari</dd>
              </div>
            </dl>
          </a>
        `;
      })
      .join("");
  }

  function renderWeekTabs(weekNumber, childId) {
    const tabs = document.getElementById("week-tabs");
    if (!tabs) return;

    tabs.innerHTML = [1, 2, 3, 4]
      .map((week) => {
        const activeClass =
          week === weekNumber
            ? "bg-[#2E4374] text-white"
            : "bg-[#EAF0FB] text-[#2E4374]";
        return `
          <a
            href="${buildChildHref("parent-dashboard.html", childId)}&week=${week}"
            class="min-h-[44px] rounded-full px-4 py-2 text-sm font-semibold ${activeClass}"
          >
            Minggu ${week}
          </a>
        `;
      })
      .join("");
  }

  function getSelectedWeekNumber() {
    const params = new URLSearchParams(window.location.search);
    const week = Number(params.get("week"));
    return week >= 1 && week <= 4 ? week : 2;
  }

  function renderWeeklyTracking(bundle, weekTasks) {
    const completion = getCompletionStats(weekTasks);
    const emptyState = document.getElementById("weekly-empty-state");
    setText("weekly-progress-title", `${completion.completed} dari ${completion.total} tugas selesai`);
    setText("weekly-progress-percent", `${completion.percentage}%`);
    const weeklyBar = document.getElementById("weekly-progress-bar");
    if (weeklyBar) {
      animatePercent(weeklyBar, "width", completion.percentage);
    }

    setHTML(
      "weekly-task-list",
      weekTasks
        .map((task) => {
          const statusMeta = getStatusMeta(task.status);
          return `
            <div class="grid gap-3 px-4 py-4 md:grid-cols-[1.8fr_1.3fr_1fr_1fr] md:items-center">
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <p class="font-semibold">${task.title}</p>
                  <button
                    type="button"
                    data-task-edit="${task.id}"
                    class="inline-flex min-h-[32px] items-center rounded-full bg-[#EAF0FB] px-3 py-1 text-xs font-semibold text-[#2E4374]"
                  >
                    Edit
                  </button>
                </div>
                <p class="mt-1 text-sm text-[#2E4374]/65">${task.description}</p>
              </div>
              <div class="text-sm">
                <p class="font-medium">${task.rewardLabel}</p>
                <p class="text-[#2E4374]/60">${task.rewardType}</p>
              </div>
              <div>
                <span class="inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusMeta.className}">
                  ${statusMeta.label}
                </span>
              </div>
              <div class="text-sm text-[#2E4374]/70">${task.note}</div>
            </div>
          `;
        })
        .join("")
    );

    if (emptyState) {
      emptyState.classList.toggle("hidden", weekTasks.length > 0);
    }
  }

  function renderRewardSummary(bundle, weekTasks) {
    const rewards = getRewardSummary(weekTasks);
    const rewardSave = Math.round(rewards.money * (bundle.pocket.allocationSavePercent / 100));
    const rewardGoal = Math.max(0, rewards.money - rewardSave);
    setText("reward-money", formatCurrency(rewards.money));
    setText("reward-non-money", `${rewards.nonMoney} aktivitas spesial`);
    setText("reward-badge", `${rewards.badge} badge siap terbuka`);
    setText("reward-save-split", formatCurrency(rewardSave));
    setText("reward-goal-split", formatCurrency(rewardGoal));
    setText(
      "reward-note",
      `Total reward uang ${bundle.child.name} dibagi otomatis: 30% ke tabungan aman dan 70% ke dana belanja untuk mengejar goal ${bundle.goal.goalName.toLowerCase()}.`
    );
  }

  function renderGoalAndPockets(bundle) {
    const goalEmptyState = document.getElementById("goal-empty-state");
    const goalPercent = Math.round((bundle.goal.currentAmount / bundle.goal.targetAmount) * 100);
    setText("finance-total-reward", formatCurrency(bundle.monthlyRecap.totalReward));
    setText("finance-total-percent", "100%");
    setText(
      "finance-total-note",
      "Seluruh reward uang yang sudah terkumpul lalu dibagi otomatis ke tabungan aman dan dana belanja goal."
    );
    setText("goal-name", bundle.goal.goalName);
    setText("goal-target-date", `Dana belanja ini mengejar target sebelum ${bundle.goal.targetDate}`);
    setText("goal-current-amount", formatCurrency(bundle.goal.currentAmount));
    setText("goal-percent-summary", `${goalPercent}% dari target ${formatCurrency(bundle.goal.targetAmount)}`);
    setText(
      "goal-remaining",
      `Sisa ${formatCurrency(bundle.goal.targetAmount - bundle.goal.currentAmount)}`
    );
    const goalBar = document.getElementById("goal-progress-bar");
    if (goalBar) {
      animatePercent(goalBar, "width", goalPercent);
    }

    setText("pocket-save-amount", formatCurrency(bundle.pocket.saveAmount));
    setText(
      "pocket-save-note",
      `${bundle.pocket.allocationSavePercent}% dari total reward disimpan sebagai tabungan aman.`
    );
    setText("pocket-spend-amount", formatCurrency(bundle.pocket.spendAmount));
    setText(
      "pocket-spend-note",
      `${bundle.pocket.allocationSpendPercent}% dari total reward menjadi dana belanja untuk goal anak.`
    );
    setText("pocket-save-percent", `${bundle.pocket.allocationSavePercent}%`);
    setText("pocket-spend-percent", `${bundle.pocket.allocationSpendPercent}%`);

    if (goalEmptyState) {
      goalEmptyState.classList.toggle("hidden", Boolean(bundle.goal));
    }
  }

  function renderBadgesAndStreak(bundle) {
    const latestBadge = getLatestUnlockedBadge(bundle.badges);
    const unlockedBadges = bundle.badges.filter((badge) => badge.status === "unlocked");
    const lockedBadges = bundle.badges.filter((badge) => badge.status === "locked");

    setText("latest-badge-name", latestBadge ? latestBadge.badgeName : "Belum ada badge");
    setText(
      "latest-badge-description",
      latestBadge ? latestBadge.description : "Badge akan muncul saat progress mulai berjalan."
    );
    setText("current-streak-large", String(bundle.streak.currentStreak));
    setText("best-streak-text", `Best streak: ${bundle.streak.bestStreak} hari`);
    setText("badge-unlocked-count", `${unlockedBadges.length} terbuka`);
    setText("badge-locked-count", `${lockedBadges.length} menunggu`);
    const goalBadge = unlockedBadges.find((badge) => badge.badgeType === "saving");
    setText("badge-goal-count", goalBadge ? "1 badge tabungan" : "Belum ada badge tabungan");
  }

  function renderMonthlyRecap(bundle) {
    setText("monthly-recap-title", `Rekap Bulanan ${bundle.monthlyRecap.month}`);
    setText("monthly-completed-tasks", `${bundle.monthlyRecap.completedTasks} / ${bundle.monthlyRecap.totalTasks}`);
    setText("monthly-total-reward", formatCurrency(bundle.monthlyRecap.totalReward));
    setText("monthly-total-saved", formatCurrency(bundle.monthlyRecap.totalSaved));
    setText("monthly-total-spent", formatCurrency(bundle.monthlyRecap.totalSpent));
    setText("monthly-best-streak", `${bundle.monthlyRecap.bestStreak} hari`);
  }

  function renderCharts(bundle) {
    const highestTask = Math.max(...bundle.child.monthlyTasks, 1);
    setHTML(
      "weekly-chart-bars",
      bundle.child.monthlyTasks
        .map((value, index) => {
          const height = Math.max(24, Math.round((value / highestTask) * 100));
          return `
            <div class="flex h-full flex-1 flex-col items-center justify-end gap-3">
              <span class="text-xs font-semibold text-[#2E4374]/70">${value}</span>
              <div class="flex h-32 w-full items-end">
                <div class="chart-animate w-full rounded-t-2xl bg-gradient-to-t from-[#FF8C61] to-[#ffb197]" style="height:${height}%"></div>
              </div>
              <span class="text-xs font-medium text-[#2E4374]/70">M${index + 1}</span>
            </div>
          `;
        })
        .join("")
    );

    setHTML(
      "savings-trend-list",
      bundle.child.savingsTrend
        .map((item) => {
          const max = bundle.goal.targetAmount;
          const width = Math.max(8, Math.round((item.amount / max) * 100));
          return `
            <div>
              <div class="mb-2 flex items-center justify-between text-sm text-[#2E4374]/70">
                <span>${item.label}</span>
                <span>${formatCurrency(item.amount)}</span>
              </div>
              <div class="h-3 rounded-full bg-white">
                <div class="progress-animate h-3 rounded-full bg-[#5ECFC1]" style="width:${width}%"></div>
              </div>
            </div>
          `;
        })
        .join("")
    );

    setText("chart-pocket-save", `${bundle.pocket.allocationSavePercent}%`);
    setText("chart-pocket-spend", `${bundle.pocket.allocationSpendPercent}%`);
    const chartSave = document.getElementById("chart-pocket-save-bar");
    const chartSpend = document.getElementById("chart-pocket-spend-bar");
    animatePercent(chartSave, "width", bundle.pocket.allocationSavePercent);
    animatePercent(chartSpend, "width", bundle.pocket.allocationSpendPercent);

    setText(
      "chart-badge-summary",
      `${bundle.badges.filter((badge) => badge.status === "unlocked").length} badge`
    );

    const unlockedBadges = bundle.badges.filter((badge) => badge.status === "unlocked").length;
    const totalBadges = bundle.badges.length;
    const badgePercent = totalBadges ? Math.round((unlockedBadges / totalBadges) * 100) : 0;
    setText("chart-badge-percent", `${badgePercent}%`);
    setText("chart-badge-ratio", `${unlockedBadges} dari ${totalBadges} badge terbuka`);
    setText(
      "chart-badge-next",
      bundle.badges.find((badge) => badge.status === "locked")?.badgeName || "Semua badge sudah terbuka"
    );
    const badgeBar = document.getElementById("chart-badge-bar");
    animatePercent(badgeBar, "width", badgePercent);
  }

  function renderCertificate(bundle, session) {
    const latestBadge = getLatestUnlockedBadge(bundle.badges);
    setText("certificate-month", `${bundle.monthlyRecap.month} Achievement`);
    setText("certificate-period", `Periode apresiasi: ${bundle.monthlyRecap.month}`);
    setText("certificate-child-name", bundle.child.name);
    setText("certificate-summary", `atas konsistensi menyelesaikan misi mingguan dan menjaga tabungan menuju target.`);
    setText("certificate-main-badge", latestBadge ? latestBadge.badgeName : "Belum ada badge utama");
    setText("certificate-completed", `${bundle.monthlyRecap.completedTasks} tugas`);
    setText("certificate-streak", `${bundle.monthlyRecap.bestStreak} hari`);
    setText("certificate-savings", formatCurrency(bundle.monthlyRecap.totalSaved));
    setText("certificate-badges", `${bundle.monthlyRecap.badgesUnlocked} badge`);
    setText("certificate-parent-name", session?.parentName || session?.email || "Orang Tua");
    setText(
      "certificate-message",
      `${bundle.child.name}, Kancil bangga karena kamu terus belajar mengatur uang dengan sabar, rapi, dan penuh semangat.`
    );
  }

  function updateDataStatus(mode, title, note, savedNote) {
    const baseClass =
      "mt-5 rounded-2xl p-4 text-sm";
    const variants = {
      neutral: `${baseClass} bg-[#EAF0FB] text-[#2E4374]/75`,
      success: `${baseClass} bg-[#EAFBF8] text-[#2E4374]/80`,
      warning: `${baseClass} bg-[#FFF0EA] text-[#2E4374]/80`,
      error: `${baseClass} bg-[#FFF0EA] text-[#2E4374]/80`,
    };

    setClassName("data-status-card", variants[mode] || variants.neutral);
    setText("data-status-text", `${title} ${note}`);
    if (savedNote) {
      setText("saved-status-text", savedNote);
    }
  }

  function getAvatarColorSelection() {
    return document.querySelector('input[name="avatar-color"]:checked')?.value || "#5ECFC1";
  }

  function openTaskManagementPanel(config) {
    const panel = document.getElementById("task-management-panel");
    const modeInput = document.getElementById("task-management-mode");
    const taskIdInput = document.getElementById("task-management-task-id");
    const title = document.getElementById("task-management-title");
    const description = document.getElementById("task-management-description");
    const saveButton = document.getElementById("save-task-button");
    const deleteButton = document.getElementById("delete-task-button");
    const panelStatus = document.getElementById("task-panel-status");

    const titleInput = document.getElementById("task-title-input");
    const weekSelect = document.getElementById("task-week-select");
    const descriptionInput = document.getElementById("task-description-input");
    const rewardTypeSelect = document.getElementById("task-reward-type-select");
    const rewardAmountInput = document.getElementById("task-reward-amount-input");
    const rewardLabelInput = document.getElementById("task-reward-label-input");
    const statusSelect = document.getElementById("task-status-select");
    const noteInput = document.getElementById("task-note-input");

    if (
      !panel ||
      !modeInput ||
      !taskIdInput ||
      !titleInput ||
      !weekSelect ||
      !descriptionInput ||
      !rewardTypeSelect ||
      !rewardAmountInput ||
      !rewardLabelInput ||
      !statusSelect ||
      !noteInput
    ) {
      return;
    }

    panel.classList.remove("hidden");
    panel.scrollIntoView({ behavior: "smooth", block: "start" });

    if (config.mode === "edit" && config.task) {
      modeInput.value = "edit";
      taskIdInput.value = config.task.id;
      title.textContent = `Edit Tugas ${config.task.title}`;
      description.textContent =
        "Perbarui judul, reward, status progress, atau catatan pendampingan untuk tugas ini.";
      saveButton.textContent = "Simpan Update Tugas";
      titleInput.value = config.task.title;
      weekSelect.value = String(config.task.weekNumber);
      descriptionInput.value = config.task.description;
      rewardTypeSelect.value = config.task.rewardType;
      rewardAmountInput.value = String(config.task.rewardAmount || 0);
      rewardLabelInput.value = config.task.rewardLabel;
      statusSelect.value = config.task.status;
      noteInput.value = config.task.note;
      if (deleteButton) {
        deleteButton.classList.remove("hidden");
      }
      if (panelStatus) {
        panelStatus.textContent =
          "Ubah reward, status, atau catatan lalu simpan. Perubahan langsung dipakai di dashboard.";
      }
      return;
    }

    modeInput.value = "add";
    taskIdInput.value = "";
    title.textContent = "Tambah Tugas Mingguan";
    description.textContent =
      "Atur judul tugas, reward, status progress, dan catatan pendampingan orang tua.";
    saveButton.textContent = "Simpan Tugas";
    titleInput.value = "";
    weekSelect.value = String(config.weekNumber || 2);
    descriptionInput.value = "";
    rewardTypeSelect.value = "non-uang";
    rewardAmountInput.value = "0";
    rewardLabelInput.value = "";
    statusSelect.value = "belum selesai";
    noteInput.value = "";
    if (deleteButton) {
      deleteButton.classList.add("hidden");
    }
    if (panelStatus) {
      panelStatus.textContent =
        "Gunakan panel ini untuk menambah tugas baru, mengubah reward, memperbarui status, dan menulis catatan pendampingan.";
    }
  }

  function closeTaskManagementPanel() {
    const panel = document.getElementById("task-management-panel");
    if (panel) {
      panel.classList.add("hidden");
    }
  }

  function bindTaskManagementUI(selectedChildId, weekNumber) {
    const openButton = document.getElementById("open-task-management-button");
    const cancelButton = document.getElementById("cancel-task-management-button");
    const deleteButton = document.getElementById("delete-task-button");
    const form = document.getElementById("task-management-form");
    const taskList = document.getElementById("weekly-task-list");
    const modeInput = document.getElementById("task-management-mode");
    const taskIdInput = document.getElementById("task-management-task-id");
    const titleInput = document.getElementById("task-title-input");
    const weekSelect = document.getElementById("task-week-select");
    const descriptionInput = document.getElementById("task-description-input");
    const rewardTypeSelect = document.getElementById("task-reward-type-select");
    const rewardAmountInput = document.getElementById("task-reward-amount-input");
    const rewardLabelInput = document.getElementById("task-reward-label-input");
    const statusSelect = document.getElementById("task-status-select");
    const noteInput = document.getElementById("task-note-input");
    const panelStatus = document.getElementById("task-panel-status");

    if (openButton) {
      openButton.addEventListener("click", () => {
        openTaskManagementPanel({ mode: "add", weekNumber });
      });
    }

    if (cancelButton) {
      cancelButton.addEventListener("click", closeTaskManagementPanel);
    }

    if (taskList) {
      taskList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-task-edit]");
        if (!button) return;

        const taskId = button.dataset.taskEdit;
        const task = data.tasks.find((item) => item.id === taskId && item.childId === selectedChildId);
        if (!task) return;

        openTaskManagementPanel({ mode: "edit", task });
      });
    }

    if (
      form &&
      modeInput &&
      taskIdInput &&
      titleInput &&
      weekSelect &&
      descriptionInput &&
      rewardTypeSelect &&
      rewardAmountInput &&
      rewardLabelInput &&
      statusSelect &&
      noteInput
    ) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = titleInput.value.trim();
        if (!title) {
          if (panelStatus) {
            panelStatus.textContent = "Judul tugas masih kosong. Isi dulu sebelum menyimpan.";
          }
          titleInput.focus();
          return;
        }

        const targetWeek = Number(weekSelect.value) || weekNumber;

        upsertTask({
          id: modeInput.value === "edit" ? taskIdInput.value : "",
          childId: selectedChildId,
          weekNumber: targetWeek,
          title,
          description: descriptionInput.value.trim(),
          rewardType: rewardTypeSelect.value,
          rewardAmount: Number(rewardAmountInput.value) || 0,
          rewardLabel: rewardLabelInput.value.trim(),
          status: statusSelect.value,
          note: noteInput.value.trim(),
        });

        window.location.href = `${buildChildHref("parent-dashboard.html", selectedChildId)}&week=${targetWeek}`;
      });
    }

    if (deleteButton && taskIdInput) {
      deleteButton.addEventListener("click", () => {
        const taskId = taskIdInput.value;
        if (!taskId) return;

        const task = data.tasks.find((item) => item.id === taskId && item.childId === selectedChildId);
        if (!task) {
          if (panelStatus) {
            panelStatus.textContent = "Tugas tidak ditemukan. Coba buka ulang panel edit tugas.";
          }
          return;
        }

        const confirmed = window.confirm(
          `Hapus tugas "${task.title}"? Reward, status, dan catatan tugas ini juga akan ikut hilang.`
        );
        if (!confirmed) return;

        const removed = removeTask(taskId);
        if (!removed) {
          if (panelStatus) {
            panelStatus.textContent = "Tugas belum berhasil dihapus. Coba lagi sebentar.";
          }
          return;
        }

        window.location.href = `${buildChildHref("parent-dashboard.html", selectedChildId)}&week=${task.weekNumber}`;
      });
    }
  }

  function openChildManagementPanel(config) {
    const panel = document.getElementById("child-management-panel");
    const modeInput = document.getElementById("child-management-mode");
    const childIdInput = document.getElementById("child-management-child-id");
    const title = document.getElementById("child-management-title");
    const description = document.getElementById("child-management-description");
    const nameInput = document.getElementById("child-name-input");
    const focusInput = document.getElementById("child-focus-input");
    const saveButton = document.getElementById("save-child-button");
    const activateButton = document.getElementById("activate-child-button");
    const deleteButton = document.getElementById("delete-child-button");
    const panelStatus = document.getElementById("child-panel-status");

    if (!panel || !modeInput || !childIdInput || !nameInput || !focusInput) return;

    panel.classList.remove("hidden");
    panel.scrollIntoView({ behavior: "smooth", block: "start" });

    if (config.mode === "edit" && config.child) {
      modeInput.value = "edit";
      childIdInput.value = config.child.id;
      title.textContent = `Kelola Profil ${config.child.name}`;
      description.textContent =
        "Perbarui nama tampilan, fokus belajar, atau pilih lagi anak aktif untuk dashboard ini.";
      nameInput.value = config.child.name;
      focusInput.value = config.child.focusText;
      saveButton.textContent = "Simpan Perubahan";
      panelStatus.textContent =
        "Perubahan profil akan langsung dipakai di Parent Dashboard dan Child View pada browser ini.";

      document
        .querySelectorAll('input[name="avatar-color"]')
        .forEach((input) => {
          input.checked = input.value === config.child.avatarColor;
        });

      if (activateButton) {
        activateButton.classList.toggle("hidden", config.child.activeStatus);
      }
      if (deleteButton) {
        deleteButton.classList.remove("hidden");
      }
      return;
    }

    modeInput.value = "add";
    childIdInput.value = "";
    title.textContent = "Tambah Profil Anak";
    description.textContent =
      "Tambahkan profil baru untuk mulai memantau misi, goal anak, tabungan aman, dan 2 kantong.";
    nameInput.value = "";
    focusInput.value = "";
    saveButton.textContent = "Simpan Profil Anak";
    panelStatus.textContent =
      "Profil baru akan otomatis mendapat goal awal, ringkasan 2 kantong, dan empty state tugas mingguan.";

    document
      .querySelectorAll('input[name="avatar-color"]')
      .forEach((input, index) => {
        input.checked = index === 0;
      });

    if (activateButton) {
      activateButton.classList.add("hidden");
    }
    if (deleteButton) {
      deleteButton.classList.add("hidden");
    }
  }

  function closeChildManagementPanel() {
    const panel = document.getElementById("child-management-panel");
    if (panel) {
      panel.classList.add("hidden");
    }
  }

  function bindChildManagementUI(selectedChildId) {
    const addButtons = [
      document.getElementById("open-add-child-button"),
      document.getElementById("empty-add-child-button"),
    ].filter(Boolean);
    const manageButton = document.getElementById("manage-profile-button");
    const cancelButton = document.getElementById("cancel-child-management-button");
    const activateButton = document.getElementById("activate-child-button");
    const deleteButton = document.getElementById("delete-child-button");
    const form = document.getElementById("child-management-form");
    const modeInput = document.getElementById("child-management-mode");
    const childIdInput = document.getElementById("child-management-child-id");
    const nameInput = document.getElementById("child-name-input");
    const focusInput = document.getElementById("child-focus-input");
    const panelStatus = document.getElementById("child-panel-status");

    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        openChildManagementPanel({ mode: "add" });
      });
    });

    if (manageButton) {
      manageButton.addEventListener("click", () => {
        const activeChild = data.children.find((child) => child.id === selectedChildId);
        if (!activeChild) return;
        openChildManagementPanel({ mode: "edit", child: activeChild });
      });
    }

    if (cancelButton) {
      cancelButton.addEventListener("click", closeChildManagementPanel);
    }

    if (activateButton) {
      activateButton.addEventListener("click", () => {
        const childId = childIdInput?.value;
        if (!childId) return;

        setActiveChild(childId);
        window.location.href = buildChildHref("parent-dashboard.html", childId);
      });
    }

    if (deleteButton && childIdInput) {
      deleteButton.addEventListener("click", () => {
        const childId = childIdInput.value;
        if (!childId) return;

        const child = data.children.find((item) => item.id === childId);
        if (!child) {
          if (panelStatus) {
            panelStatus.textContent = "Profil anak tidak ditemukan. Coba buka ulang panel ini.";
          }
          return;
        }

        if (data.children.length <= 1) {
          if (panelStatus) {
            panelStatus.textContent =
              "Minimal harus ada satu profil anak di dashboard. Tambah anak baru dulu sebelum menghapus profil terakhir.";
          }
          return;
        }

        const confirmed = window.confirm(
          `Hapus profil ${child.name}? Semua tugas, target, badge, streak, dan rekap demo anak ini juga akan ikut terhapus.`
        );
        if (!confirmed) {
          return;
        }

        const result = removeChild(childId);
        if (!result.ok) {
          if (panelStatus) {
            panelStatus.textContent =
              result.reason === "last-child"
                ? "Profil terakhir belum bisa dihapus agar dashboard tetap punya minimal satu anak."
                : "Profil anak belum berhasil dihapus. Coba lagi sebentar.";
          }
          return;
        }

        window.location.href = buildChildHref(
          "parent-dashboard.html",
          result.nextChildId || getSelectedChildId()
        );
      });
    }

    if (form && modeInput && childIdInput && nameInput && focusInput) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const focusText = focusInput.value.trim();
        const avatarColor = getAvatarColorSelection();

        if (!name) {
          if (panelStatus) {
            panelStatus.textContent = "Nama anak masih kosong. Tambahkan nama singkat dulu, lalu simpan lagi.";
          }
          nameInput.focus();
          return;
        }

        if (modeInput.value === "edit") {
          const updated = updateChildProfile(childIdInput.value, {
            name,
            focusText,
            avatarColor,
          });

          if (!updated) {
            if (panelStatus) {
              panelStatus.textContent = "Profil belum berhasil diperbarui. Coba buka panel lagi dan ulangi.";
            }
            return;
          }

          window.location.href = buildChildHref("parent-dashboard.html", childIdInput.value);
          return;
        }

        if (data.children.length >= 10) {
          if (panelStatus) {
            panelStatus.textContent =
              "Batas demo saat ini adalah 10 profil anak agar dashboard tetap rapi dan mudah ditinjau.";
          }
          return;
        }

        const nextChildId = addChild({ name, focusText, avatarColor });
        window.location.href = buildChildHref("parent-dashboard.html", nextChildId);
      });
    }
  }

  function showImportFeedback(mode, title, note) {
    const feedback = document.getElementById("import-feedback");
    if (!feedback) return;

    feedback.classList.remove("hidden");
    feedback.className =
      `mt-4 rounded-2xl border p-4 text-sm ${
        mode === "success"
          ? "border-[#5ECFC1]/35 bg-[#EAFBF8]"
          : "border-[#FF8C61]/35 bg-[#FFF0EA]"
      }`;
    setText("import-feedback-title", title);
    setText("import-feedback-note", note);
  }

  function bindExportImportUI(selectedChildId, weekNumber) {
    const exportButton = document.getElementById("export-data-button");
    const importButton = document.getElementById("import-data-button");
    const resetButton = document.getElementById("reset-data-button");
    const confirmResetButton = document.getElementById("confirm-reset-button");
    const cancelResetButton = document.getElementById("cancel-reset-button");
    const fileInput = document.getElementById("import-file-input");
    const resetConfirmation = document.getElementById("reset-confirmation");

    if (exportButton) {
      exportButton.addEventListener("click", () => {
        const payload = createExportPayload(selectedChildId, weekNumber);
        const blob = new Blob([JSON.stringify(payload, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `kancil-uangku-demo-${selectedChildId}.json`;
        link.click();
        URL.revokeObjectURL(url);

        updateDataStatus(
          "success",
          "Export selesai.",
          "File demo data berhasil disiapkan untuk diunduh.",
          `Terakhir diexport: ${new Date().toLocaleString("id-ID")}`
        );
        showImportFeedback(
          "success",
          "File export berhasil dibuat",
          "Data yang diunduh adalah snapshot demo data saat ini. Tidak ada backend yang terlibat."
        );
      });
    }

    if (importButton && fileInput) {
      importButton.addEventListener("click", () => fileInput.click());

      fileInput.addEventListener("change", async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
          const content = await file.text();
          const parsed = JSON.parse(content);
          const validation = validateImportPayload(parsed);

          if (!validation.valid) {
            updateDataStatus(
              "error",
              "Import gagal.",
              validation.message,
              "Status tersimpan belum berubah."
            );
            showImportFeedback("error", "Format file belum cocok", validation.message);
            return;
          }

          applyImportPayload(parsed);
          updateDataStatus(
            "success",
            "Import berhasil diterapkan.",
            "Snapshot data baru sudah dipakai di browser ini.",
            `Terakhir divalidasi: ${new Date().toLocaleString("id-ID")}`
          );
          showImportFeedback(
            "success",
            "File import valid",
            `${validation.message} Halaman akan memuat ulang untuk menampilkan data terbaru.`
          );
          window.setTimeout(() => {
            const nextChildId = parsed.selectedChildId || selectedChildId;
            window.location.href = buildChildHref("parent-dashboard.html", nextChildId);
          }, 700);
        } catch (error) {
          updateDataStatus(
            "error",
            "Import gagal.",
            "File belum bisa dibaca sebagai JSON yang valid.",
            "Status tersimpan belum berubah."
          );
          showImportFeedback(
            "error",
            "File tidak valid",
            "Pastikan file berformat JSON dan berasal dari export data Kancil Uangku."
          );
        } finally {
          fileInput.value = "";
        }
      });
    }

    if (resetButton && resetConfirmation) {
      resetButton.addEventListener("click", () => {
        resetConfirmation.classList.remove("hidden");
        updateDataStatus(
          "warning",
          "Konfirmasi dibutuhkan.",
          "Periksa kembali sebelum reset simulasi dijalankan.",
          "Status tersimpan belum berubah."
        );
      });
    }

    if (cancelResetButton && resetConfirmation) {
      cancelResetButton.addEventListener("click", () => {
        resetConfirmation.classList.add("hidden");
        updateDataStatus(
          "neutral",
          "Reset dibatalkan.",
          "Data demo tetap seperti sebelumnya.",
          "Terakhir ditinjau: 4 Juli 2026, 14:20 WIB"
        );
      });
    }

    if (confirmResetButton && resetConfirmation) {
      confirmResetButton.addEventListener("click", () => {
        resetConfirmation.classList.add("hidden");
        resetDemoData();
        updateDataStatus(
          "success",
          "Reset data selesai.",
          "Semua perubahan lokal sudah kembali ke demo awal.",
          `Terakhir direset simulasi: ${new Date().toLocaleString("id-ID")}`
        );
        showImportFeedback(
          "success",
          "Reset data berhasil",
          "Dashboard akan dimuat ulang dengan data demo awal."
        );
        window.setTimeout(() => {
          window.location.href = buildChildHref("parent-dashboard.html", getSelectedChildId());
        }, 700);
      });
    }
  }

  function bindInformationalButtons() {
    const monthlySwitchButton = document.getElementById("monthly-switch-button");

    if (monthlySwitchButton) {
      monthlySwitchButton.addEventListener("click", () => {
        updateDataStatus(
          "neutral",
          "Mode demo aktif.",
          "Rekap saat ini baru menampilkan Juli 2026 sesuai data contoh yang tersedia.",
          "Tidak ada perubahan data yang disimpan."
        );
      });
    }
  }

  function bindCertificatePreviewUI() {
    const previewButton = document.getElementById("certificate-preview-button");
    const printButton = document.getElementById("certificate-print-button");
    const previewCard = document.getElementById("certificate-preview-card");

    if (previewButton && previewCard) {
      previewButton.addEventListener("click", () => {
        previewCard.scrollIntoView({ behavior: "smooth", block: "center" });
        previewCard.classList.add("ring-4", "ring-[#FFC94A]/35");
        window.setTimeout(() => {
          previewCard.classList.remove("ring-4", "ring-[#FFC94A]/35");
        }, 1800);
      });
    }

    if (printButton) {
      printButton.addEventListener("click", () => {
        document.body.classList.add("certificate-print");
        window.print();
        const cleanup = () => {
          document.body.classList.remove("certificate-print");
          window.removeEventListener("afterprint", cleanup);
        };
        window.addEventListener("afterprint", cleanup);
        window.setTimeout(cleanup, 1000);
      });
    }
  }

  function init() {
    const session = requireSession();
    if (!session) return;

    const childId = getSelectedChildId();
    if (!childId) return;
    const weekNumber = getSelectedWeekNumber();
    const bundle = getChildBundle(childId);
    const weekTasks = getWeekTasks(bundle.tasks, weekNumber);

    renderHeader(bundle, weekNumber, session);
    renderQuickStats(bundle, weekTasks);
    renderChildSelector(childId);
    renderWeekTabs(weekNumber, childId);
    renderWeeklyTracking(bundle, weekTasks);
    renderRewardSummary(bundle, weekTasks);
    renderGoalAndPockets(bundle);
    renderBadgesAndStreak(bundle);
    renderMonthlyRecap(bundle);
    renderCharts(bundle);
    renderCertificate(bundle, session);
    bindSessionUI();
    bindChildManagementUI(childId);
    bindTaskManagementUI(childId, weekNumber);
    bindExportImportUI(childId, weekNumber);
    bindInformationalButtons();
    bindCertificatePreviewUI();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", DashboardPage.init);
